import { PaperProvider, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useRef, useState } from "react"
import { AMMO_DATABASE, A_KEY_DATABASE, A_TAGS, GUN_DATABASE, KEY_DATABASE, PREFERENCES, TAGS } from "./configs_DB"
import 'react-native-gesture-handler';
import React from 'react';
import { usePreferenceStore } from './stores/usePreferenceStore';
import { useViewStore } from './stores/useViewStore';
import GunCollection from './components/Collections/GunCollection/GunCollection';
import MainMenu from './components/MainMenu/MainMenu';
import { NavigationContainer } from '@react-navigation/native';
import AmmoCollection from './components/Collections/AmmoCollection/AmmoCollection';
import { StatusBar } from 'expo-status-bar';
import { AmmoType, GunType, StackParamList } from './interfaces';
import * as SecureStore from "expo-secure-store"
import { alarm, getIcon } from './utils';
import { useAmmoStore } from './stores/useAmmoStore';
import { useTagStore } from './stores/useTagStore';
import { useGunStore } from './stores/useGunStore';
import { DefaultTheme } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import NewAmmo from './components/Collections/AmmoCollection/NewAmmo';
import NewGun from './components/Collections/GunCollection/NewGun';
import Gun from './components/Collections/GunCollection/Gun';
import Ammo from './components/Collections/AmmoCollection/Ammo';
import QuickStock from './components/QuickStock';
import { SafeAreaView } from 'react-native-safe-area-context';
import QuickShot from './components/QuickShot';
import EditGun from './components/Collections/GunCollection/EditGun';
import EditAmmo from './components/Collections/AmmoCollection/EditAmmo';
import * as SplashScreen from 'expo-splash-screen';
import * as LocalAuthentication from 'expo-local-authentication';
import { Dimensions } from 'react-native';
import { calibers } from './lib/caliberData';
import { expo, db } from "./db/client"
import * as schema from "./db/schema"
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './drizzle/migrations';
import { checkBoxes } from './lib/gunDataTemplate';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import BottomSheet, { BottomSheetHandleProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomBar from './components/BottomBars/BottomBar';
import { defaultBottomBarHeight, defaultBottomBarTextHeight, defaultViewPadding } from './configs';

SplashScreen.preventAutoHideAsync();

export default function App() {

  // Run migrations and initialize SQLite DB

  const { success, error } = useMigrations(db, migrations);
  
  if(error){
    console.log("Database Migration Error:")
    console.log(error)
    alarm("Database Migration Error", `Error Name: ${error.name} --- Error Cause: ${error.cause} --- Error Message: ${error.message} --- Error Stack: ${error.stack}`)
  }

  useDrizzleStudio(expo)


  // Only on appIsReady is the splash screen deactivated

  const [appIsReady, setAppIsReady] = useState<boolean>(false);


  // This is some React Reanimated stuff

  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false, // Reanimated runs in strict mode by default
  });


  // Zustand Store declarations

  const { 
    switchLanguage, 
    theme, 
    switchTheme, 
    setGeneralSettings, 
    setDisplayAsGrid, 
    setDisplayAmmoAsGrid, 
    setSortBy, 
    setSortAmmoBy, 
    setSortAmmoIcon, 
    setSortGunIcon, 
    setSortGunsAscending, 
    setSortAmmoAscending, 
    setCaliberDisplayNameList,
  } = usePreferenceStore();
  const { mainMenuOpen, hideBottomSheet, currentCollectionScreen } = useViewStore()
  const { ammoCollection, setAmmoCollection } = useAmmoStore()
 const { gunCollection, setGunCollection } = useGunStore()
  const { setAmmoTags, setTags } = useTagStore()
  const [gunsLoaded, setGunsLoaded] = useState(false)
  const bottomSheetRef = useRef<BottomSheet>(null);


  // This checks for legacy DB keys

  async function getKeys(data: "guns" | "ammo"){
    const keys:string = await AsyncStorage.getItem(data === "guns" ? KEY_DATABASE : A_KEY_DATABASE)
    if(keys == null){
      return []
    }
    return JSON.parse(keys)
  }


  // This checks for legacy gun data and migrates it to SQLite DB. Afterwards it emtpies the keys array and removes the legacy gun data from SecureStore
  // This should only trigger once from an update <2.0.0 to a higher version using SQLite. After this ran, the key array should be empty and thus no
  // gun data should be checked

  async function checkLegacyGunData(){
    let keys:string[]
    try{
      keys = await getKeys("guns")
    } catch(e){
      alarm("Legacy Gun Key Error", e)
    }
    console.log("Checked Gun Keys:")
    console.log(keys)
    if(keys.length === 0){
      return
    }
    let guns:GunType[]
    try{
      guns = await Promise.all(keys.map(async key =>{
        const item:string = await SecureStore.getItemAsync(`${GUN_DATABASE}_${key}`)
        return JSON.parse(item)
      }))
    } catch(e){
      alarm("Legacy Gun DB Error", e)
    }
    console.log("Checked Guns:")
    console.log(guns)
    if(guns.length !== 0){
      await Promise.all(guns.map(async gun =>{
        if(gun !== null){
          await Promise.all(checkBoxes.map(checkbox =>{
            gun[checkbox.name] = gun !== undefined && gun !== null && gun.status !== undefined && gun.status !== null ? gun.status[checkbox.name] : false
          }))
          gun.createdAt = gun.createdAt ? (isNaN(gun.createdAt) ? new Date(gun.createdAt).getTime() : gun.createdAt) : Date.now() 
          gun.lastModifiedAt = gun.lastModifiedAt ? (isNaN(gun.lastModifiedAt) ? new Date(gun.lastModifiedAt).getTime() : gun.lastModifiedAt) : Date.now() 
          try{
            await db.insert(schema.gunCollection).values(gun)
          }catch(e){
            throw new Error(`Check Legacy Gun Data: Insert gun ${gun.model} into DB: ${e}`)
          }
          if(gun.tags !== undefined && gun.tags !== null && gun.tags.length !== 0){
            await Promise.all(gun.tags.map(async tag =>{
              try{
                await db.insert(schema.gunTags).values({label: tag}).onConflictDoNothing()
              }catch(e){
                throw new Error(`Check Legacy Gun Data: Insert tag ${tag} into DB: ${e}`)
              }
              
            }))
          }
        }
      }))
      await Promise.all(keys.map(async key =>{
        await SecureStore.deleteItemAsync(`${GUN_DATABASE}_${key}`)
      }))
      await AsyncStorage.removeItem(KEY_DATABASE)
    }
  }


  // This checks for legacy ammo data and migrates it to SQLite DB. Afterwards it emtpies the keys array and removes the legacy ammo data from SecureStore
  // This should only trigger once from an update <2.0.0 to a higher version using SQLite. After this ran, the key array should be empty and thus no
  // ammo data should be checked

  async function checkLegacyAmmoData(){
    let keys:string[]
    try{
      keys = await getKeys("ammo")
    } catch(e){
      alarm("Legacy Ammo Key Error", e)
    }
    console.log("Checked Ammo Keys:")
    console.log(keys)
    if(keys.length === 0){
      return
    }
    let ammunition:AmmoType[]
    try{
      ammunition = await Promise.all(keys.map(async key =>{
        const item:string = await SecureStore.getItemAsync(`${AMMO_DATABASE}_${key}`)
        return JSON.parse(item)
      }))
    } catch(e){
      alarm("Legacy Ammo DB Error", e)
    }
    console.log("Checked Ammo:")
    console.log(ammunition)
    if(ammunition.length !== 0){
      await Promise.all(ammunition.map(async ammo =>{
        if(ammo !== null){
          ammo.createdAt = ammo.createdAt ? (isNaN(ammo.createdAt) ? new Date(ammo.createdAt).getTime() : ammo.createdAt) : Date.now() 
          ammo.lastModifiedAt = ammo.lastModifiedAt ? (isNaN(ammo.lastModifiedAt) ? new Date(ammo.lastModifiedAt).getTime() : ammo.lastModifiedAt) : Date.now() 
          try{
            await db.insert(schema.ammoCollection).values(ammo)
          }catch(e){
            throw new Error(`Check Legacy Ammo Data: Insert ammo ${ammo.designation} into DB: ${e}`)
          }
          if(ammo.tags !== undefined && ammo.tags !== null && ammo.tags.length !== 0){
              await Promise.all(ammo.tags.map(async tag =>{
                try{
                  await db.insert(schema.ammoTags).values({label: tag}).onConflictDoNothing()
                }catch(e){
                  throw new Error(`Check Legacy Ammo Data: Insert tag ${tag} into DB: ${e}`)
                }

              }))
            }
          }
        }))
      await Promise.all(keys.map(async key =>{
        await SecureStore.deleteItemAsync(`${AMMO_DATABASE}_${key}`)
      }))
      await AsyncStorage.removeItem(A_KEY_DATABASE)
    }
  }


  // INIT PREPARE FUNCTION - THIS ESSENTAILLY SETS UP THE APP
  
  useEffect(() => {
    async function prepare() {
      if(!success){
        return
      }

      try{
        let isPreferences 
        try{
          console.log("Get Preferences")
          const preferences:string = await AsyncStorage.getItem(PREFERENCES)
          isPreferences = preferences ? JSON.parse(preferences) : null;
        } catch(e){
          throw new Error(`Init: Get Preferences: ${e}`)
        }

      try{
        console.log("Preferences Nullcheck:")
        if(isPreferences === null){
          console.log("Preferences are Null")

          console.log("Checking for Legacy Gun Data")
          try{
            await checkLegacyGunData()
          }catch(e){
            throw new Error(`Init: Get Preferences: Nullcheck: Legacy Gun Data: ${e}`)
          }

          console.log("Checking for Legacy Ammo Data")
          try{
            await checkLegacyAmmoData()
          }catch(e){
            throw new Error(`Init: Get Preferences: Nullcheck: Legacy Ammo Data: ${e}`)
          }

          console.log("Successfully checked for legacy data")
          console.log("Setting App to Ready")
          setAppIsReady(true)
          return
        }
      }catch(e){
        throw new Error(`Init: Get Preferences: Nullcheck: ${e}`)
      }

      try{
        console.log("Preferences Nullcheck: General Settings:")
        if(!isPreferences?.generalSettings){ 
          console.log("Checking for Legacy Gun Data")
          try{
            await checkLegacyGunData()
          }catch(e){
            throw new Error(`Init: Get Preferences: Nullcheck: General Settings: Legacy Gun Data: ${e}`)
          }

          console.log("Checking for Legacy Ammo Data")
          try{
            await checkLegacyAmmoData()
          }catch(e){
            throw new Error(`Init: Get Preferences: Nullcheck: General Settings: Legacy Ammo Data: ${e}`)
          }

          console.log("Successfully checked for legacy data")
          console.log("Setting App to Ready")
          setAppIsReady(true)
          return
        }
      }catch(e){
        throw new Error(`Init: Get Preferences: General Settings: ${e}`)
      }

      try{
        console.log("Preferences Nullcheck: General Settings: Login Guard (null or false):")
        if(isPreferences?.generalSettings?.loginGuard){

          const authSuccess = await LocalAuthentication.authenticateAsync()

          if(authSuccess.success){
            console.log("Login Guard active")

            console.log("Checking for Legacy Gun Data")
            try{
              await checkLegacyGunData()
            }catch(e){
              throw new Error(`Init: Get Preferences: Nullcheck: General Settings: Login Guard Active: Legacy Gun Data: ${e}`)
            }

            console.log("Checking for Legacy Ammo Data")
            try{
              await checkLegacyAmmoData()
            }catch(e){
              throw new Error(`Init: Get Preferences: Nullcheck: General Settings: Login Guard Active: Legacy Ammo Data: ${e}`)
            }

            console.log("Successfully checked for legacy data")
            console.log("Setting App to Ready")
            setAppIsReady(true)
            return
          } else{
            return
          }  
        } else {
            console.log("Login Guard inactive")
            console.log("Checking for Legacy Gun Data")
            try{
              await checkLegacyGunData()
            }catch(e){
              throw new Error(`Init: Get Preferences: Nullcheck: General Settings: Login Guard Inactive: Legacy Gun Data: ${e}`)
            }

            console.log("Checking for Legacy Ammo Data")
            try{
              await checkLegacyAmmoData()
            }catch(e){
              throw new Error(`Init: Get Preferences: Nullcheck: General Settings: Login Guard Inactive: Legacy Ammo Data: ${e}`)
            }

            console.log("Successfully checked for legacy data")
            console.log("Setting App to Ready")
            setAppIsReady(true)
            return
          }
        } catch(e){
          throw new Error(`Init: Get Preferences: Login Guard: ${e}`)
        }

      }catch(e){
        console.error(e)
        alarm("Initialisation error", e?.message || String(e));
      }
    }

    prepare();

  }, [success]);


  // This turns off the splash screen when appIsReady returns true

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
      
    }
  }, [appIsReady]);


  // This gets the preferences - it runs after the prepare() useEffect  
  
  useEffect(()=>{
    async function getPreferences(){
      let preferences:string
      try{
        preferences = await AsyncStorage.getItem(PREFERENCES)
      } catch(e){
        alarm("Preference DB Error", e)
      }

      let isPreferences
      try{
       isPreferences = preferences === null ? null : JSON.parse(preferences)
      } catch(e){
        alarm("Preference Parse Error", e)
      }
      
      /* GENERAL SETTINGS AND PREFERENCES */
      try{
        switchLanguage(isPreferences?.language ?? "de")
        switchTheme(isPreferences?.theme ?? "default")
        setGeneralSettings(isPreferences?.generalSettings ?? {
          displayImagesInListViewAmmo: true, 
          displayImagesInListViewGun: true,
          resizeImages: true,
        })

        let shortCalibers:{name: string, displayName?: string}[] = []
        if(isPreferences?.generalSettings?.caliberDisplayName){
          calibers.map(variant =>{
            variant.variants.map(caliber =>{
              if(caliber.displayName !== undefined){
                shortCalibers.push(caliber)
              }
            })
          })
        }
        setCaliberDisplayNameList(shortCalibers)
      }catch(e){
        alarm("General Preferences Error", e)
      }

      /* AMMO PREFERENCES */
      try{
        const ammo_tagList: string = await AsyncStorage.getItem(A_TAGS)
        const isAmmoTagList:{label: string, status: boolean}[] = ammo_tagList ? JSON.parse(ammo_tagList) : null
        setDisplayAmmoAsGrid(isPreferences?.displayAmmoAsGrid ?? true)
        setSortAmmoBy(isPreferences?.sortAmmoBy ?? "alphabetical")
        setSortAmmoIcon(getIcon(isPreferences?.sortAmmoBy ?? "alphabetical"))
        setSortAmmoAscending(isPreferences?.sortOrderAmmo ?? true)
        if(isAmmoTagList){
          Object.values(isAmmoTagList).map(tag =>{
            setAmmoTags(tag)
          }) 
        }
      } catch(e){
        alarm("Ammo Preferences Error", e)
      }

      /* GUN PREFERENCE */
      try{
        const gun_tagList: string = await AsyncStorage.getItem(TAGS) 
        const isGunTagList:{label: string, status: boolean}[] = gun_tagList ? JSON.parse(gun_tagList) : null
        setDisplayAsGrid(isPreferences?.displayAsGrid ?? true)
        setSortBy(isPreferences?.sortBy ?? "alphabetical")
        setSortGunIcon(getIcon(isPreferences?.sortBy ?? "alphabetical"))
        setSortGunsAscending(isPreferences?.sortOrderGuns ?? true)
        if(isGunTagList){
          Object.values(isGunTagList).map(tag =>{
            setTags(tag)
          }) 
        }
      } catch(e){
        alarm("Gun Preferences Error", e)
      }
    }

    getPreferences()

  },[])


  // This adds roundness to theme

  const currentTheme = {...theme, roundness : 5}


  // This sets up the navigation stack

  const Stack = createStackNavigator<StackParamList>()


  // This sets up the theme for the NavigationContainer

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.background
    }
  }


  // This repeatedly checks for appIsReady
  
  if (!appIsReady) {
    return null;
  }


  // Actual main structure

  return (
    <GestureHandlerRootView>
    <NavigationContainer theme={navTheme}>
      <PaperProvider theme={currentTheme}>
        <StatusBar backgroundColor={mainMenuOpen ? theme.colors.primary : theme.colors.background} style={theme.name.includes("dark") ? "light" : "dark"} />
          <SafeAreaView 
            onLayout={onLayoutRootView}
            style={{
              width: "100%", 
              height: "100%", 
              flex: 1,
              backgroundColor: theme.colors.background
            }}
          >
            <Stack.Navigator>

              <Stack.Screen
                name="GunCollection"
                component={GunCollection}
                options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter}} 
              />

              <Stack.Screen
                name="AmmoCollection"
                component={AmmoCollection}
                options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter}} 
              />
    
              <Stack.Screen
                name="NewAmmo"
                component={NewAmmo}
                options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}} 
              />

              <Stack.Screen
                name="NewGun"
                component={NewGun}
                options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}} 
              />

              <Stack.Screen
                name="Gun"
                component={Gun}
                options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid}} 
              />

              <Stack.Screen
              name="Ammo"
              component={Ammo}
              options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid}} 
            />

            <Stack.Screen
              name="EditGun"
              component={EditGun}
              options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}} 
            />

            <Stack.Screen
              name="EditAmmo"
              component={EditAmmo}
              options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}} 
            />

            <Stack.Screen
              name="QuickStock"
              component={QuickStock}
              options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, gestureDirection: "vertical-inverted", presentation: "transparentModal"}} 
            />

            <Stack.Screen
              name="QuickShot"
              component={QuickShot}
              options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, gestureDirection: "vertical-inverted", presentation: "transparentModal"}} 
            />

            <Stack.Screen
              name="MainMenu"
              component={MainMenu}
              options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, gestureDirection: "horizontal-inverted", presentation: "transparentModal", cardStyle: { backgroundColor: Dimensions.get("window").width > Dimensions.get("window").height ? "transparent" : theme.colors.background}}} 
            />

          </Stack.Navigator>
          {mainMenuOpen ? null : hideBottomSheet ? null : <BottomSheet
        ref={bottomSheetRef}
        
            snapPoints={[
              defaultBottomBarHeight
            ]}
            handleComponent={null}            
      >
        <BottomSheetView style={{ flex: 1 }}>
          <BottomBar screen={currentCollectionScreen}/>
        </BottomSheetView>
      </BottomSheet>}
        </SafeAreaView>
      </PaperProvider>
    </NavigationContainer>
    </GestureHandlerRootView>
  )
}

