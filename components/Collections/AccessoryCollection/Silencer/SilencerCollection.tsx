import AsyncStorage from '@react-native-async-storage/async-storage';
import {  useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { Appbar, FAB, Menu, Searchbar } from 'react-native-paper';
import { defaultBottomBarHeight, defaultGridGap, defaultSearchBarHeight, defaultViewPadding } from 'configs';
import { PREFERENCES } from "configs_DB"
import { AccessoryType_Silencer, MenuVisibility, SortingTypesAccessory_Silencer, SortingTypesAmmo } from 'interfaces';
import { getIcon } from 'utils';
import { useViewStore } from 'stores/useViewStore';
import { usePreferenceStore } from 'stores/usePreferenceStore';
import { search, sorting } from 'lib/textTemplates';
import AmmoCard from './SilencerCard';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import * as schema from "db/schema"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { db } from "db/client"
import { and, or, like } from 'drizzle-orm';
import FilterMenu from 'components/FilterMenu';
import sortAccessoryCollection_Silencer from 'functions/sortAccessoryCollection_Silencer';
import { useAccessoryStore } from 'stores/useAccessoryStore';
import { access } from 'fs';

export default function AccessoryCollection_Silencer({navigation, route}){


  const [menuVisibility, setMenuVisibility] = useState<MenuVisibility>({sortBy: false, filterBy: false});
  

  const [searchBannerVisible, toggleSearchBannerVisible] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const { displayAccessory_SilencerAsGrid, toggleDisplayAccessory_SilencerAsGrid, sortAccessory_SilencerBy, setSortAccessory_SilencerBy, language, sortAccessory_SilencerIcon, setsortAccessory_SilencerIcon, sortAccessory_SilencerAscending, toggleSortAccessory_SilencerAscending, accessory_SilencerFilterOn } = usePreferenceStore()
  const { mainMenuOpen } = useViewStore()
  const { setCurrentAccessory } = useAccessoryStore()

  const { data: silencerData } = useLiveQuery(
    db.select()
    .from(schema.accessoryCollection_Silencers)
    .where(
      and(
        or(
          like(schema.accessoryCollection_Silencers.model, `%${searchQuery}%`),
          like(schema.accessoryCollection_Silencers.manufacturer, `%${searchQuery}%`)
        ),
      )
    )
    .orderBy(sortAccessoryCollection_Silencer(sortAccessory_SilencerBy, sortAccessory_SilencerAscending)),
    [searchQuery, sortAccessory_SilencerAscending, sortAccessory_SilencerBy]
  )

  const { data: tagData } = useLiveQuery(
    db.select()
    .from(schema.accessory_SilencerTags)
  )
  
  async function handleSortBy(type:SortingTypesAccessory_Silencer){
    setsortAccessory_SilencerIcon(getIcon(type))
    setSortAccessory_SilencerBy(type)
    const preferences:string = await AsyncStorage.getItem(PREFERENCES)
    const newPreferences:{[key:string] : string} = preferences == null ? {"sortAccessory_SilencerBy": type} : {...JSON.parse(preferences), "sortAccessory_SilencerBy":type} 
    await AsyncStorage.setItem(PREFERENCES, JSON.stringify(newPreferences))
  }

  function handleMenu(category: string, status: boolean){
    setMenuVisibility({...menuVisibility, [category]: status})
  }

  async function handleSortOrder(){
    toggleSortAccessory_SilencerAscending()
    const preferences:string = await AsyncStorage.getItem(PREFERENCES)
    const newPreferences:{[key:string] : string} = preferences == null ? {"sortOrderAccessory_Silencer": !sortAccessory_SilencerAscending} : {...JSON.parse(preferences), "sortOrderAccessory_Silencer": !sortAccessory_SilencerAscending} 
    await AsyncStorage.setItem(PREFERENCES, JSON.stringify(newPreferences))
  }
        
  async function handleDisplaySwitch(){
    toggleDisplayAccessory_SilencerAsGrid()
    const preferences:string = await AsyncStorage.getItem(PREFERENCES)
    const newPreferences:{[key:string] : string} = preferences == null ? {"displayAccessory_SilencerAsGrid": !displayAccessory_SilencerAsGrid} : {...JSON.parse(preferences), "displayAccessory_SilencerAsGrid": !displayAccessory_SilencerAsGrid} 
    await AsyncStorage.setItem(PREFERENCES, JSON.stringify(newPreferences))
  } 

  function handleSearch(){
    !searchBannerVisible ? startAnimation() : endAnimation()
    if(searchBannerVisible){
      setSearchQuery("")
    }
    setTimeout(function(){
      toggleSearchBannerVisible(!searchBannerVisible)
    }, searchBannerVisible ? 400 : 50)
  }

  const FABheight = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {

    return {
      height: FABheight.value,
    };
  });

  const startAnimation = () => {
    FABheight.value = withTiming(defaultSearchBarHeight, { duration: 500 }); // 500 ms duration
  };

  const endAnimation = () => {
    FABheight.value = withTiming(0, { duration: 500 }); // 500 ms duration
  };

  const fabWidth = useSharedValue(1);

  fabWidth.value = withRepeat(withTiming(1.2, { duration: 1000 }), -1, true);

  const pulsate = useAnimatedStyle(() => {
    return {
      transform: [{ scale: fabWidth.value }]
    };
  });

  function handleFAB(){
    setCurrentAccessory(null)
    navigation.navigate("NewAccessory_Silencer")
  }

  const { width, height } = Dimensions.get("window");
  const isLandscape = width > height;
  
  const numColumns = isLandscape ? 4 : displayAccessory_SilencerAsGrid ? 2 : 1;
  const listKey = isLandscape
    ? "ammoCollectionGrid4"
    : displayAccessory_SilencerAsGrid
    ? "ammoCollectionGrid2"
    : "ammoCollectionList";

  return(
    <View style={{flex: 1, backgroundColor: "transparent"}}>
      <Appbar style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <View  style={{display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
          <Appbar.Action icon={"menu"} onPress={()=>navigation.navigate("MainMenu")} />
        </View>
        <View  style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
          <Appbar.Action icon="magnify" onPress={()=>handleSearch()}/>
          <Appbar.Action icon="filter" disabled={tagData.length === 0 ? true : false} onPress={() =>{handleMenu("filterBy", true)}} />
          <Menu
            visible={menuVisibility.filterBy}
            onDismiss={()=>handleMenu("filterBy", false)}
            anchor={{x:Dimensions.get("window").width/6, y: 75}}
                        anchorPosition='bottom'
                        style={{width: Dimensions.get("window").width/1.5}}
                      >
                       <FilterMenu collection='ammoCollection'/>
            </Menu>
            <Appbar.Action icon={displayAccessory_SilencerAsGrid ? "view-grid" : "format-list-bulleted-type"} onPress={handleDisplaySwitch} />
            <Menu
              visible={menuVisibility.sortBy}
              onDismiss={()=>handleMenu("sortBy", false)}
              anchor={<Appbar.Action icon={sortAccessory_SilencerIcon} onPress={() => handleMenu("sortBy", true)} />}
              anchorPosition='bottom'
            >
              <Menu.Item onPress={() => handleSortBy("alphabetical")} title={`${sorting.alphabetic[language]}`} leadingIcon={getIcon("alphabetical")}/>
              <Menu.Item onPress={() => handleSortBy("createdAt")} title={`${sorting.lastAdded[language]}`} leadingIcon={getIcon("createdAt")}/>
              <Menu.Item onPress={() => handleSortBy("lastModifiedAt")} title={`${sorting.lastModified[language]}`} leadingIcon={getIcon("lastModifiedAt")}/>
          </Menu>
          <Appbar.Action icon={sortAccessory_SilencerAscending ? "arrow-up" : "arrow-down"} onPress={() => handleSortOrder()} />
        </View>
      </Appbar>
      <Animated.View style={[{paddingLeft: defaultViewPadding, paddingRight: defaultViewPadding}, animatedStyle]}>{searchBannerVisible ? <Searchbar placeholder={search[language]} onChangeText={setSearchQuery} value={searchQuery} /> : null}</Animated.View>
        <FlatList<AccessoryType_Silencer> 
          numColumns={numColumns} 
          initialNumToRender={10} 
          contentContainerStyle={{gap: defaultGridGap}}
          columnWrapperStyle={numColumns > 1 ? { gap: defaultGridGap } : undefined}
          key={listKey} 
          style={{
            height: "100%", 
            width: "100%", 
            paddingTop: defaultViewPadding, 
            paddingLeft: defaultViewPadding, 
            paddingRight: defaultViewPadding, 
            paddingBottom: 50}} 
          /*@ts-expect-error*/
          data={silencerData.filter(silencer => accessory_SilencerFilterOn ? tagData.filter(tag => tag.active).every(tag => silencer.tags?.includes(tag.label)) : silencer)} 
          renderItem={({item}: {item: AccessoryType_Silencer}) => <AmmoCard ammo={item} />}                     
          keyExtractor={ammo=>ammo.id} 
          ListFooterComponent={<View style={{width: "100%", height: 100}} />}
          ListEmptyComponent={null}
        />

      <Animated.View style={[{position: "absolute", bottom: defaultBottomBarHeight+defaultViewPadding, right: 0, margin: 16, width: 56, height: 56, backgroundColor: "transparent", display: "flex", justifyContent: "center", alignItems: "center"}, ammoCollection.length === 0 ? pulsate : null]}>
        <FAB
          icon="plus"
          onPress={()=>handleFAB()}
          disabled={mainMenuOpen ? true : false}
          style={{width: 56, height: 56}}
        />
      </Animated.View>
    </View>
  )
}

