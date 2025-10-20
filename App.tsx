import { PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from "react"
import { AMMO_DATABASE, A_KEY_DATABASE, A_TAGS, GUN_DATABASE, KEY_DATABASE, PREFERENCES, TAGS } from "./configs_DB"
import 'react-native-gesture-handler';
import React from 'react';
import { usePreferenceStore } from './stores/usePreferenceStore';
import { useViewStore } from './stores/useViewStore';
import GunCollection from './components/GunCollection';
import MainMenu from './components/MainMenu';
import { NavigationContainer } from '@react-navigation/native';
import AmmoCollection from './components/AmmoCollection';
import { StatusBar } from 'expo-status-bar';
import { AmmoType, GunType, StackParamList } from './interfaces';
import * as SecureStore from "expo-secure-store"
import { alarm, getIcon } from './utils';
import { useAmmoStore } from './stores/useAmmoStore';
import { useTagStore } from './stores/useTagStore';
import { useGunStore } from './stores/useGunStore';
import { DefaultTheme } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import NewAmmo from './components/NewAmmo';
import NewGun from './components/NewGun';
import Gun from './components/Gun';
import Ammo from './components/Ammo';
import QuickStock from './components/QuickStock';
import { SafeAreaView } from 'react-native-safe-area-context';
import QuickShot from './components/QuickShot';
import EditGun from './components/EditGun';
import EditAmmo from './components/EditAmmo';
import * as SplashScreen from 'expo-splash-screen';
import * as LocalAuthentication from 'expo-local-authentication';
import { Alert, Dimensions } from 'react-native';
import { calibers } from './lib/caliberData';
import { expo, db } from "./db/client"
import * as schema from "./db/schema"
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './drizzle/migrations';
import { checkBoxes } from './lib/gunDataTemplate';
import { Dirs, Util, FileSystem as fs } from 'react-native-file-access';
import * as FileSystem from 'expo-file-system';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { success, error } = useMigrations(db, migrations);
  console.log(error)
  useDrizzleStudio(expo)

  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  const { 
    ammoDbImport, 
    dbImport,
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
    caliberDisplayNameList
  } = usePreferenceStore();
  const { mainMenuOpen } = useViewStore()
  const { ammoCollection, setAmmoCollection } = useAmmoStore()
 const { gunCollection, setGunCollection } = useGunStore()
  const { setAmmoTags, setTags } = useTagStore()
  const [gunsLoaded, setGunsLoaded] = useState(false)

  async function handleSaveGunDb(guns){
    console.log("starting backup of gunDB")
          const fileName = `arsenal_legacy_gunDB_${new Date().getTime()}.json`
          const collectionSize = guns.length-1
          const cache = Dirs.CacheDir
          console.log(`found ${collectionSize} guns`)
          try{
              await fs.writeFile(`${cache}/${fileName}`, "[")
          }catch(e){
              alarm("saveGunDb createTempFile", e)
          }
          await Promise.all(guns.map(async (gun, index) =>{
              if(gun.images !== null && gun.images.length !== 0){
                  const base64images:string[] = await Promise.all(gun.images?.map(async image =>{
                      const base64string:string = await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}${image.split("/").pop()}`, { encoding: 'base64' });
                      return base64string
                  }))
                  const exportableGun:GunType = {...gun, images: base64images}
                  try{
                      await fs.appendFile(`${cache}/${fileName}`, JSON.stringify(exportableGun) + (collectionSize !== index ? ", " : ""))
                  }catch(e){
                      alarm("saveGunDB appendExportableGun", e)
                  }
              } else {
                  try{
                      await fs.appendFile(`${cache}/${fileName}`, JSON.stringify(gun) + (collectionSize !== index ? ", " : ""))
                  }catch(e){
                      alarm("saveGunDB appendGun", e)
                  }
              }
          }))
          try{
              await fs.appendFile(`${cache}/${fileName}`, "]")
          } catch(e){
              alarm("saveGunDB finishTempFile", e)
          }
          try{
              await fs.cpExternal(`${cache}/${fileName}`, fileName, "downloads")
              
          } catch(e){
              alarm("saveGunDb moveTempFile", e)
          }
          try{
              await fs.unlink(`${cache}/${fileName}`)
          }catch(e){
              alarm("saveGunDb unlinkTempFile", e)
          }
      }

      async function handleSaveAmmoDb(){
          const fileName = `arsenal_legacy_ammoDB_${new Date().getTime()}.json`
          const collectionSize = ammoCollection.length-1
          const cache = Dirs.CacheDir
          try{
              await fs.writeFile(`${cache}/${fileName}`, "[")
          }catch(e){
              alarm("saveAmmoDb createTempFile", e)
          }
          await Promise.all(ammoCollection.map(async (ammo, index) =>{
              if(ammo.images !== null && ammo.images.length !== 0){
                  const base64images:string[] = await Promise.all(ammo.images?.map(async image =>{
                      const base64string:string = await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}${image.split("/").pop()}`, { encoding: 'base64' });
                      return base64string
                  }))
                  const exportableAmmo:AmmoType = {...ammo, images: base64images}
                  try{
                      await fs.appendFile(`${cache}/${fileName}`, JSON.stringify(exportableAmmo) + (collectionSize !== index ? ", " : ""))
                  }catch(e){
                      alarm("saveAmmoDb appendExportableAmmo", e)
                  }
              } else {
                  try{
                      await fs.appendFile(`${cache}/${fileName}`, JSON.stringify(ammo) + (collectionSize !== index ? ", " : ""))
                  }catch(e){
                      alarm("saveAmmoDb appendAmmo", e)
                  }
              }
          }))
          try{
              await fs.appendFile(`${cache}/${fileName}`, "]")
          } catch(e){
              alarm("saveAmmoDb finishTempFile", e)
          }
          try{
              await fs.cpExternal(`${cache}/${fileName}`, fileName, "downloads")
              
          } catch(e){
              alarm("saveAmmoDb moveTempFile", e)
          }
          try{
              await fs.unlink(`${cache}/${fileName}`)
          }catch(e){
              alarm("saveAmmoDb unlinkTempFile", e)
          }
      }
  

  async function checkLegacyGunData(){
    let keys:string[]
    try{
      keys = await getKeys("guns")
    } catch(e){
      alarm("Legacy Gun Key Error", e)
    }
    console.log(`checked gun keys: ${keys}`)
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
    console.log(`checked guns: ${guns}`)
    if(guns.length !== 0){
      await Promise.all(guns.map(async gun =>{
        if(gun !== null){
          await Promise.all(checkBoxes.map(checkbox =>{
            gun[checkbox.name] = gun !== undefined && gun !== null && gun.status !== undefined && gun.status !== null ? gun.status[checkbox.name] : false
          }))
          gun.createdAt = gun !== undefined && gun !== null && isNaN(gun.createdAt) ? new Date(gun.createdAt).getTime() : gun.createdAt
          gun.lastModifiedAt = gun !== undefined && gun !== null && isNaN(gun.lastModifiedAt) ? new Date(gun.lastModifiedAt).getTime() : gun.lastModifiedAt
          await db.insert(schema.gunCollection).values(gun)
          if(gun.tags !== undefined && gun.tags !== null && gun.tags.length !== 0){
            await Promise.all(gun.tags.map(async tag =>{
              await db.insert(schema.gunTags).values({label: tag}).onConflictDoNothing()
            }))
          }
        }
      }))
            await handleSaveGunDb(guns)
      await Promise.all(keys.map(async key =>{
        await SecureStore.deleteItemAsync(`${GUN_DATABASE}_${key}`)
      }))
      await AsyncStorage.removeItem(KEY_DATABASE)
    }
  }
  async function checkLegacyAmmoData(){
    let keys:string[]
    try{
      keys = await getKeys("ammo")
    } catch(e){
      alarm("Legacy Ammo Key Error", e)
    }
    console.log(`checked ammo keys: ${keys}`)
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
    if(ammunition.length !== 0){
      await Promise.all(ammunition.map(async ammo =>{
        await db.insert(schema.ammoCollection).values(ammo)
      }))
      await Promise.all(keys.map(async key =>{
        await SecureStore.deleteItemAsync(`${AMMO_DATABASE}_${key}`)
      }))
      await handleSaveAmmoDb()
      await AsyncStorage.removeItem(A_KEY_DATABASE)
    }
  }

  
useEffect(() => {
    async function prepare() {
      try {
        console.log("try: so hard")
        const preferences:string = await AsyncStorage.getItem(PREFERENCES)
        const isPreferences = preferences === null ? null : JSON.parse(preferences)
        console.log("isPreferences null")
        if(isPreferences === null){
          console.log("checking legacy gun data")
          await checkLegacyGunData()
          console.log("checking legacy ammo data")
          await checkLegacyAmmoData()
          console.log(success)
          if(success){
            setAppIsReady(true)
          }
          return
        }
        console.log("isPreferences.generalSettings null")
        if(isPreferences.generalSettings === null || isPreferences.generalSettings === undefined){ 
          if(success){
            await checkLegacyGunData()
          await checkLegacyAmmoData()
            setAppIsReady(true)
          }
          return
        }
        console.log("isPreferences.generalsettings.loginGuard null || false")
        if(isPreferences.generalSettings.loginGuard !== null && isPreferences.generalSettings.loginGuard !== undefined && isPreferences.generalSettings.loginGuard === true){
          const authSuccess = await LocalAuthentication.authenticateAsync()
          if(authSuccess.success){
            await checkLegacyGunData()
          await checkLegacyAmmoData()
          if(success){
            setAppIsReady(true)
          }
          } else{
            throw new Error(`Local Authentification failed: ${JSON.stringify(authSuccess)} | ${isPreferences.generalSettings.loginGuard}`);
          }
        } else {
          console.log("false")
          await checkLegacyGunData()
          await checkLegacyAmmoData()
          if(success){
            setAppIsReady(true)
          }
          return
        }
      } catch (e) {
        console.log("catch: got so far")
        console.log(e);
        alarm("Initialisation error", e)
      } 
    }
    prepare();
  }, [success]);


  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
      
    }
  }, [appIsReady]);
  
  
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
      switchLanguage(isPreferences === null ? "de" : isPreferences.language === undefined ? "de" : isPreferences.language)
      switchTheme(isPreferences === null ? "default" : isPreferences.theme === undefined ? "default" : isPreferences.theme)
      setGeneralSettings(isPreferences === null ? {
        displayImagesInListViewAmmo: true, 
        displayImagesInListViewGun: true,
        resizeImages: true,
      } : isPreferences.generalSettings === undefined ? {
        displayImagesInListViewAmmo: true, 
        displayImagesInListViewGun: true,
        resizeImages: true,
      } : isPreferences.generalSettings)
      let shortCalibers:{name: string, displayName?: string}[] = []
      if(isPreferences !== null){
        if(isPreferences.generalSettings !== undefined){
          if(isPreferences.generalSettings.caliberDisplayName !== undefined){
            calibers.map(variant =>{
              variant.variants.map(caliber =>{
                if(caliber.displayName !== undefined){
                  shortCalibers.push(caliber)
                }
              })
            })
          }
        }
      }
      setCaliberDisplayNameList(shortCalibers)
    } catch(e){
      alarm("General Preferences Error", e)
    }

      /* AMMO PREFERENCES */
      try{
      const ammo_tagList: string = await AsyncStorage.getItem(A_TAGS)
      const isAmmoTagList:{label: string, status: boolean}[] = ammo_tagList === null ? null : JSON.parse(ammo_tagList)
      setDisplayAmmoAsGrid(isPreferences === null ? true : isPreferences.displayAmmoAsGrid === null ? true : isPreferences.displayAmmoAsGrid)
      setSortAmmoBy(isPreferences === null ? "alphabetical" : isPreferences.sortAmmoBy === undefined ? "alphabetical" : isPreferences.sortAmmoBy)
      setSortAmmoIcon(getIcon((isPreferences === null ? "alphabetical" : isPreferences.sortAmmoBy === null ? "alphabetical" : isPreferences.sortAmmoBy)))
      setSortAmmoAscending(isPreferences === null ? true : isPreferences.sortOrderAmmo === null ? true : isPreferences.sortOrderAmmo)
      if(isAmmoTagList !== null && isAmmoTagList !== undefined){
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
      const isGunTagList:{label: string, status: boolean}[] = gun_tagList === null ? null : JSON.parse(gun_tagList)
      setDisplayAsGrid(isPreferences === null ? true : isPreferences.displayAsGrid === null ? true : isPreferences.displayAsGrid)
      setSortBy(isPreferences === null ? "alphabetical" : isPreferences.sortBy === undefined ? "alphabetical" : isPreferences.sortBy)
      setSortGunIcon(getIcon((isPreferences === null ? "alphabetical" : isPreferences.sortBy === null ? "alphabetical" : isPreferences.sortBy)))
      setSortGunsAscending(isPreferences === null ? true : isPreferences.sortOrderGuns === null ? true : isPreferences.sortOrderGuns)
      if(isGunTagList !== null && isGunTagList !== undefined){
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

  async function getKeys(data: "guns" | "ammo"){
    const keys:string = await AsyncStorage.getItem(data === "guns" ? KEY_DATABASE : A_KEY_DATABASE)
    if(keys == null){
      return []
    }
    return JSON.parse(keys)
  }

  const currentTheme = {...theme, roundness : 5}

  const Stack = createStackNavigator<StackParamList>()


  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.background
    }
  }
  
  if (!appIsReady) {
    return null;
  }



  return (
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
        </SafeAreaView>
      </PaperProvider>
    </NavigationContainer>
  )
}

