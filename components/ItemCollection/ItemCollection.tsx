import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { Appbar, FAB, Menu, Searchbar } from 'react-native-paper';
import { defaultBottomBarHeight, defaultGridGap, defaultSearchBarHeight, defaultViewPadding } from 'configs';
import { PREFERENCES } from "configs_DB"
import { GunType, ItemType, MenuVisibility, SortingTypes } from 'interfaces';
import { getIcon } from 'utils';
import { useViewStore } from 'stores/useViewStore';
import { DisplayVariants, usePreferenceStore } from 'stores/usePreferenceStore';
import ItemCard from './ItemCard';
import { search, sorting } from 'lib/textTemplates';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import * as schema from "db/schema"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { db } from "db/client"
import { and, or } from 'drizzle-orm';
import FilterMenu from 'components/FilterMenu';
import { useItemStore } from 'stores/useItemStore';
import { determineSchema, determineSearchQueryFields, determineSortingFunction } from 'functions/determinators';
import AppBar from 'components/AppBar';
import { useItemTags } from 'components/Hooks/useItemTags';
import CardOptionsMenu from 'components/CardOptionsMenu';

export default function ItemCollection({navigation, route}){




  
  const [searchQuery, setSearchQuery] = useState<string>("")
  const { currentCollection, setCurrentItem } = useItemStore()
  const { displaySettings, setDisplaySettings, sortBy, setSortBy, language, filterOn } = usePreferenceStore()
  const { mainMenuOpen, setHideBottomSheet } = useViewStore()

    console.log(`ItemCollection: ${currentCollection}`)

  const { data: itemData } = useLiveQuery(
    db.select()
    .from(determineSchema(currentCollection))
    .where(
      and(
          determineSearchQueryFields(currentCollection, searchQuery)
      )
    )
    .orderBy(determineSortingFunction(currentCollection, sortBy)),
    [searchQuery, sortBy, currentCollection]
  )

  const itemTags = useItemTags(currentCollection)


  const fabWidth = useSharedValue(1);

  fabWidth.value = withRepeat(withTiming(1.2, { duration: 1000 }), -1, true);

  const pulsate = useAnimatedStyle(() => {
    return {
      transform: [{ scale: fabWidth.value }]
    };
  });

  function handleFAB(){
    setHideBottomSheet(true)
    setCurrentItem(null)
    navigation.navigate("newItem")
  }

  const { width, height } = Dimensions.get("window");
const isLandscape = width > height;

const numColumns = isLandscape ? 4 : displaySettings[currentCollection] === "grid" ? 2 : 1;
const listKey = isLandscape
  ? "gunCollectionGrid4"
  : displaySettings[currentCollection] === "grid"
  ? "gunCollectionGrid2"
  : "gunCollectionList";
  

  function filterCollection(){
    const items = itemData.filter(item => {
      if(!filterOn[currentCollection]){
        return true
      }
    
      // Get all active tag labels
      const activeTagLabels = itemTags
        .filter(tag => tag.active && tag.label !== "0")
        .map(tag => tag.label);
      
      // If no tags are active, show all guns
      if(activeTagLabels.length === 0){
        return true
      }
      
      // Show gun if it has at least one active tag
      if(item.tags && Array.isArray(item.tags)){
        return item.tags.some(itemTag => activeTagLabels.includes(itemTag))
      }else {
        return false
      }
    })

    return items
  }

  return(
    <View style={{flex: 1, backgroundColor: "transparent"}}>
      <AppBar collection={currentCollection} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FlatList<ItemType>
    numColumns={numColumns}
    initialNumToRender={10}
    contentContainerStyle={{ gap: defaultGridGap }}
    columnWrapperStyle={numColumns > 1 ? { gap: defaultGridGap } : undefined}
    key={listKey}
    style={{
      height: "100%",
      width: "100%",
      paddingTop: defaultViewPadding,
      paddingLeft: defaultViewPadding,
      paddingRight: defaultViewPadding,
      paddingBottom: 50,
    }}
    data={filterCollection() as ItemType[]}
    renderItem={({ item }: { item: ItemType }) => <ItemCard item={item} />}
    keyExtractor={item => item.id}
    ListFooterComponent={<View style={{ width: "100%", height: 100 + defaultBottomBarHeight }} />}
    ListEmptyComponent={null}
  />

      <Animated.View style={[{position: "absolute", bottom: defaultBottomBarHeight+defaultViewPadding, right: 0, margin: 16, width: 56, height: 56, backgroundColor: "transparent", display: "flex", justifyContent: "center", alignItems: "center"}, itemData.length === 0 ? pulsate : null]}>
        <FAB
          icon="plus"
          onPress={()=>handleFAB()}
          disabled={mainMenuOpen ? true : false}
          style={{width: 56, height: 56}}
        />
      </Animated.View>
      <CardOptionsMenu />
    </View>
  )
}