import { Dimensions, View } from 'react-native';
import { CollectionType, ItemType } from 'lib/interfaces';
import { Card, IconButton } from 'react-native-paper';
import { usePreferenceStore } from 'stores/usePreferenceStore';
import { defaultGridGap, defaultViewPadding } from 'configs/configs';
import { useViewStore } from 'stores/useViewStore';
import { checkDate } from 'functions/utils';
import * as FileSystem from 'expo-file-system/legacy';
import { useItemStore } from 'stores/useItemStore';
import { useDatabaseStore } from 'stores/useDatabaseStore';
import MountedIconBar from './MountedIconBar';
import { determineCardSubtitle, determineCardTitle } from 'functions/determinators';
import { db } from 'db/client';
import * as schema from "db/schema"
import { eq } from 'drizzle-orm';
import { useEffect, useState } from 'react';

interface Props{
    item: ItemType
    index?: number
}

export default function ItemCard_accessories({ item }:Props){

    const { displaySettings, language, theme, generalSettings, caliberDisplayNameList } = usePreferenceStore()
    const { currentItem, setCurrentItem, currentCollection, setCurrentAccessory } = useItemStore()  
      const { setHideBottomSheet, setCardOptionsMenuVisible_accessories } = useViewStore()
    const { accessoryMount, partMount } = useDatabaseStore()
    const [itemType, setItemtype] = useState<CollectionType>("gunCollection")

    const attachedAccessories = accessoryMount.filter(accessory => accessory.parentGunId === item.id || accessory.parentAccessoryId === item.id || accessory.parentPartId === item.id)
    const attachedParts = partMount.filter(part => part.parentGunId === item.id || part.parentPartId === item.id)

      function setCardWith(){
        const divisor = displaySettings.accessoryView === "grid" ? Dimensions.get("window").width > Dimensions.get("window").height ? 4 : 2 : 1;
        return (Dimensions.get("window").width / divisor) - (defaultGridGap + (displaySettings.accessoryView === "grid" ? defaultViewPadding/2 : defaultViewPadding))
      }

      function meloveyoulongtime(){
        setCurrentAccessory(item)
        setCardOptionsMenuVisible_accessories(true)
        
      }

      

      useEffect(()=>{
        async function getItemType(item: ItemType){
            const findAccessory = await db.select().from(schema.accessoryCollection).where(eq(schema.accessoryCollection.id, item.id))
            const findPart = await db.select().from(schema.partCollection).where(eq(schema.partCollection.id, item.id))
            setItemtype(findAccessory.length !== 0 ? findAccessory[0].type as CollectionType : findPart[0].type as CollectionType)
        }
        getItemType(item)
      },[])

    return(
        <View>
        <Card 
            mode={displaySettings.accessoryView === "compactList" ? "contained" : "elevated"}
            style={displaySettings.accessoryView === "compactList" ? {
                width: setCardWith(),
                borderRadius: 0,
                marginBottom: Number(`-${defaultViewPadding}`),
                borderBottomWidth: 1,
                backgroundColor: theme.colors.background

            } : {
                width: setCardWith(),
                backgroundColor: theme.colors.surfaceVariant,
                paddingBottom: displaySettings.accessoryView === "list" ? 5 : 0
            }}
            
        >
            <Card.Title
                style={displaySettings.accessoryView === "compactList" ? {
                    margin: Number(`-${defaultViewPadding}`)
                } : {

                }}
                titleStyle={{
                    width: displaySettings.accessoryView === "grid" ? "100%" : displaySettings.accessoryView === "list" ? generalSettings.displayImagesInListView ? "60%" : "80%" : "80%",
                    color: checkDate(item) ? theme.colors.error : theme.colors.onSurfaceVariant
                }}
                subtitleStyle={{
                    width: displaySettings.accessoryView === "grid" ? "100%" : displaySettings.accessoryView === "list" ? generalSettings.displayImagesInListView ? "60%" : "80%" : "80%",
                    color: theme.colors.onSurfaceVariant,
                }}
                title={determineCardTitle(itemType, item, language)}
                subtitle={determineCardSubtitle(itemType, item, language, caliberDisplayNameList)} 
                titleVariant={displaySettings.accessoryView === "compactList" ? "bodySmall" : "titleSmall"}
                subtitleVariant={displaySettings.accessoryView === "compactList" ? "labelSmall" : "bodySmall"}
                titleNumberOfLines={displaySettings.accessoryView === "compactList" ? 1 : 2} 
                subtitleNumberOfLines={displaySettings.accessoryView === "compactList" ? 1 : 2}
            />
            {displaySettings.accessoryView === "grid" ? 
            <View>
                <Card.Cover 
                    source={item.images && item.images.length != 0 ? { uri: `${FileSystem.documentDirectory}${item.images[0].split("/").pop()}`} : require(`../../assets//775788_several different realistic rifles and pistols on _xl-1024-v1-0.png`)} 
                    style={{
                        height: 100,
                    }}
                />
                {(attachedAccessories.length || attachedParts.length) ? <MountedIconBar accessories={attachedAccessories} parts={attachedParts} accessoryView={true}/> : null}
                <View style={{
                position: "absolute",
                left: 0,
                marginTop: 0,
                marginBottom: 0,

                width: 40,
                height: "100%",
                display: "flex", 
                flexDirection: "column",
                justifyContent: "flex-start", 
                flexWrap: "wrap",
                alignItems: "center",
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5
            }}>
               
                  </View>
                
                <IconButton 
                    mode="contained" 
                    icon={"dots-vertical"} 
                    onPress={()=>meloveyoulongtime()} 
                    style={{
                        position: "absolute", 
                        bottom: 1, 
                        right: 1,
                        backgroundColor: theme.colors.primary
                    }} 
                    iconColor={theme.colors.onPrimary}
                />
            </View>
            : 
            null}
            {displaySettings.accessoryView === "list" ?
            <View 
                style={{
                    position: "absolute", 
                    top: 0, 
                    left: 0, 
                    bottom: 0, 
                    right: 0, 
                    display: "flex", 
                    justifyContent: "flex-end", 
                    alignItems: "center", 
                    flexDirection: "row"
                }}
            >
                {generalSettings.displayImagesInListView ? <Card.Cover 
                    source={item.images && item.images.length != 0 ? { uri: `${FileSystem.documentDirectory}${item.images[0].split("/").pop()}` } : require(`../../assets//775788_several different realistic rifles and pistols on _xl-1024-v1-0.png`)} 
                    style={{
                        height: "75%",
                        aspectRatio: "4/3"
                    }}
                /> : null}
                {(attachedAccessories.length || attachedParts.length) ? <MountedIconBar accessories={attachedAccessories} parts={attachedParts} accessoryView={true}/> : null}
                
                <IconButton 
                    mode="contained" 
                    icon={"dots-vertical"} 
                    onPress={()=>meloveyoulongtime()} 
                    size={32}
                    style={{
                        backgroundColor: theme.colors.primary,
                        marginLeft: 10,
                        marginRight: 6
                    }}
                    iconColor={theme.colors.onPrimary}
                />
            </View>
            : null}
            {displaySettings.accessoryView === "compactList" ?
            <View 
                style={{
                    position: "absolute", 
                    top: 0, 
                    left: 0, 
                    bottom: 0, 
                    right: 0, 
                    display: "flex", 
                    justifyContent: "flex-end", 
                    alignItems: "center", 
                    flexDirection: "row"
                }}
            >
               
                <IconButton 
                    mode="contained" 
                    icon={"dots-vertical"} 
                    onPress={()=>meloveyoulongtime()} 
                    size={12}
                    style={{
                        backgroundColor: theme.colors.primary,
                        marginLeft: 10,
                        marginRight: 6
                    }}
                    iconColor={theme.colors.onPrimary}
                />
            </View>
            : null}
        </Card>
        </View>
    )
}