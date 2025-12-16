import { useEffect, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { FAB, Icon, ThemeProvider } from 'react-native-paper';
import { defaultBottomBarHeight, defaultGridGap, defaultViewPadding } from 'configs';
import { AccessoryMount, ItemType, PartMount, Tag } from 'interfaces';
import { useViewStore } from 'stores/useViewStore';
import { usePreferenceStore } from 'stores/usePreferenceStore';
import ItemCard from './ItemCard';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { db } from "db/client"
import * as schema from "db/schema"
import { and, eq } from 'drizzle-orm';
import { useItemStore } from 'stores/useItemStore';
import { determineAccessoryIcons, determineSchema, determineSearchQueryFields, determineSortingFunction } from 'functions/determinators';
import AppBar from 'components/AppBar';
import { useItemTags } from 'hooks/useItemTags';
import CardOptionsMenu from 'components/CardOptionsMenu';
import CardOptionsMenu_accessories from 'components/CardOptionsMenu_accessories';
import { useDatabaseStore } from 'stores/useDatabaseStore';

export default function ItemCollection({navigation, route}){




  
  const [searchQuery, setSearchQuery] = useState<string>("")
  const { currentCollection, setCurrentItem } = useItemStore()
  const { displaySettings, setDisplaySettings, sortBy, setSortBy, language, filterOn, theme } = usePreferenceStore()
  const { mainMenuOpen, setHideBottomSheet } = useViewStore()
  const { setAccessoryMount, setPartMount } = useDatabaseStore()

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

  const { data: accessoryData } = useLiveQuery(
            db.select()
            .from(schema.accessoryMount)
        )

        const { data: partData } = useLiveQuery(
            db.select()
            .from(schema.partMount)
        )

useEffect(() => {
  if (accessoryData) {
    const data = accessoryData as AccessoryMount[]
    setAccessoryMount(data);
  }
  if(partData){
    const data = partData as PartMount[]
    setPartMount(data);
  }
}, [accessoryData, partData]);

  const itemTags = useItemTags(currentCollection) as Tag[]


  const fabWidth = useSharedValue(1);

  fabWidth.value = withRepeat(withTiming(1.2, { duration: 1000 }), -1, true);

  const pulsate = useAnimatedStyle(() => {
    return {
      transform: [{ scale: itemData.length === 0 ? fabWidth.value : 1}]
    };
  });

  function handleFAB(){
    setHideBottomSheet(true)
    setCurrentItem(null)
    navigation.navigate("newItem", {clone: false})
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
      {itemData.length === 0 ? 
        <View style={{position: "absolute", width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
          <Icon source={determineAccessoryIcons(currentCollection)} size={200} color={theme.colors.surfaceVariant}/>
        </View> : 
      null}
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

      <Animated.View style={
        [{
          position: "absolute", 
          bottom: defaultBottomBarHeight+defaultViewPadding, 
          right: 0, 
          margin: 16, 
          width: 56, 
          height: 56, 
          backgroundColor: "transparent", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center"
        }, 
          pulsate]}>
        <FAB
          icon="plus"
          onPress={()=>handleFAB()}
          disabled={mainMenuOpen ? true : false}
          style={{width: 56, height: 56}}
        />
      </Animated.View>
      <CardOptionsMenu />
      <CardOptionsMenu_accessories />
    </View>
  )
}