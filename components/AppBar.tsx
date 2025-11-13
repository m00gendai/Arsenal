import { useNavigation } from '@react-navigation/native';
import { Dimensions, View } from 'react-native';
import { Appbar, Menu, Searchbar } from 'react-native-paper';
import FilterMenu from './FilterMenu';
import { useState } from 'react';
import { MenuVisibility, SortingTypes, StackParamList } from 'interfaces';
import { DisplayVariants, usePreferenceStore } from 'stores/usePreferenceStore';
import { getIcon } from 'utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PREFERENCES } from 'configs_DB';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { defaultSearchBarHeight, defaultViewPadding } from 'configs';
import { search, sorting } from 'lib/textTemplates';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { determineSortingOptions } from 'functions/determinators';

interface Props{
  collection: any
  searchQuery: string
  setSearchQuery:React.Dispatch<React.SetStateAction<string>>
}

export default function AppBar({collection, searchQuery, setSearchQuery}){

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()

  const [menuVisibility, setMenuVisibility] = useState<MenuVisibility>({sortBy: false, filterBy: false});
  const [searchBannerVisible, toggleSearchBannerVisible] = useState<boolean>(false)

  const { displaySettings, setDisplaySettings, sortBy, setSortBy, language, filterOn } = usePreferenceStore()

  async function handleSortBy(type: SortingTypes){
    setSortBy(collection, {
      ...sortBy[collection],
      type,
      icon: getIcon(type),
    });

    const preferences: string | null = await AsyncStorage.getItem(PREFERENCES)
    const parsedPreferences = preferences ? JSON.parse(preferences) : {}
    
    const newPreferences = {
      ...parsedPreferences,
      sortBy: {
        ...(parsedPreferences.sortBy || {}),
        [collection]: {
          ...sortBy[collection],
          type,
          icon: getIcon(type),
        }
      }
    }
    
    await AsyncStorage.setItem(PREFERENCES, JSON.stringify(newPreferences))
  }

  function handleMenu(category: string, status: boolean){
    setMenuVisibility({...menuVisibility, [category]: status})
  }

  async function handleSortOrder(){
    const newDirection = sortBy[collection].direction === "asc" ? "desc" : "asc"
    
    setSortBy(collection, {
      ...sortBy[collection],
      direction: newDirection
    });
    
    const preferences: string | null = await AsyncStorage.getItem(PREFERENCES)
    const parsedPreferences = preferences ? JSON.parse(preferences) : {}
    
    const newPreferences = {
      ...parsedPreferences,
      sortBy: {
        ...(parsedPreferences.sortBy || {}),
        [collection]: {
          ...sortBy[collection],
          direction: newDirection
        }
      }
    }
    
    await AsyncStorage.setItem(PREFERENCES, JSON.stringify(newPreferences))
  }
        
  async function handleDisplaySwitch(){
    const nextDisplayVariant:DisplayVariants = displaySettings[collection] === "grid" ? "list" : displaySettings[collection] === "list" ? "compactList" : "grid"
    setDisplaySettings({
      ...displaySettings,
      [collection]: nextDisplayVariant,
    });

    const preferences: string | null = await AsyncStorage.getItem(PREFERENCES)
    const parsedPreferences = preferences ? JSON.parse(preferences) : {}
    
    const newPreferences = {
      ...parsedPreferences,
      displaySettings: {
        ...(parsedPreferences.displaySettings || {}),
        [collection]: nextDisplayVariant,
      }
    }
    
    await AsyncStorage.setItem(PREFERENCES, JSON.stringify(newPreferences))
  } 

  const FABheight = useSharedValue(0);

  const startAnimation = () => {
    FABheight.value = withTiming(defaultSearchBarHeight, { duration: 500 }); // 500 ms duration
  };
  
  const endAnimation = () => {
    FABheight.value = withTiming(0, { duration: 500 }); // 500 ms duration
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: FABheight.value,
    };
  });

  function handleSearch(){
    !searchBannerVisible ? startAnimation() : endAnimation()
    if(searchBannerVisible){
      setSearchQuery("")
    }
    setTimeout(function(){
      toggleSearchBannerVisible(!searchBannerVisible)
    }, searchBannerVisible ? 400 : 50)
  }

    return(
      <View>
        <Appbar style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <View  style={{display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
          <Appbar.Action icon={"menu"} onPress={()=>navigation.navigate("MainMenu")} />
        </View>
        <View  style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
          <Appbar.Action icon="magnify" onPress={()=>handleSearch()}/>
          <Appbar.Action icon="filter" onPress={() =>{handleMenu("filterBy", true)}} />
          <Menu
            visible={menuVisibility.filterBy}
            onDismiss={()=>handleMenu("filterBy", false)}
            anchor={{x:Dimensions.get("window").width/6, y: 75}}
            anchorPosition='bottom'
            style={{width: Dimensions.get("window").width/1.5}}
          >
            <FilterMenu collection={collection}/>
          </Menu>
          <Appbar.Action icon={displaySettings[collection] === "grid" ? "view-grid" : "format-list-bulleted-type"} onPress={handleDisplaySwitch} />
          <Menu
            visible={menuVisibility.sortBy}
            onDismiss={()=>handleMenu("sortBy", false)}
            anchor={<Appbar.Action icon={sortBy[collection].icon} onPress={() => handleMenu("sortBy", true)} />}
            anchorPosition='bottom'
          >
            {determineSortingOptions(collection).map(option =>{
              return <Menu.Item key={`${collection}_${option}`} onPress={() => handleSortBy(option)} title={`${sorting[option][language]}`} leadingIcon={getIcon(option)}/>
            })}
          </Menu>
          <Appbar.Action icon={sortBy[collection].direction === "asc" ? "arrow-up" : "arrow-down"} onPress={() => handleSortOrder()} />
        </View>
      </Appbar>
      <Animated.View style={[{paddingLeft: defaultViewPadding, paddingRight: defaultViewPadding}, animatedStyle]}>{searchBannerVisible ? <Searchbar placeholder={search[language]} onChangeText={setSearchQuery} value={searchQuery} /> : null}</Animated.View>
      </View>
    )
}