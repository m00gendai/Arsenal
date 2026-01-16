import { defaultViewPadding } from "configs/configs";
import { db } from "db/client";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { AccessoryMount, CollectionType, ItemType, PartMount } from "lib/interfaces";
import { View } from "react-native";
import { Icon } from "react-native-paper";
import { usePreferenceStore } from "stores/usePreferenceStore";
import * as schema from "db/schema"
import { eq } from 'drizzle-orm';
import { useDatabaseStore } from "stores/useDatabaseStore";
import { determineAccessoryIcons } from "functions/determinators";
import { useItemStore } from "stores/useItemStore";

interface Props{
    accessories: AccessoryMount[]
    parts: PartMount[]
    accessoryView: boolean
}

export default function MountedIconBar({accessories, parts, accessoryView}:Props){

    const { displaySettings, language, theme, generalSettings } = usePreferenceStore()
    const { currentItem, setCurrentItem, currentCollection } = useItemStore()  

    const accessoryTypes:CollectionType[] = accessories.map(item => item.accessoryType)
    const partTypes:CollectionType[] = parts.map(item => item.partType)
    const accessorySet: CollectionType[] = Array.from(new Set(accessoryTypes))
    const partSet: CollectionType[] = Array.from(new Set(partTypes))
    const mountedStuff: CollectionType[] = [...accessorySet, ...partSet]

    const display = accessoryView ? displaySettings.accessoryView : displaySettings[currentCollection]

    return(
        <View style={{
                position: "absolute",
                left: display === "grid" ? 1 : undefined,
                right: display === "list" ? 1 : undefined,
                bottom: display === "grid" ? 1 : -5,
                margin: display === "grid" ? 6 : 0,
                backgroundColor: display === "list" ? "transparent" : theme.colors.primaryContainer.replace("rgb(", "rgba(").replace(")", ", 0.8)"),
                width: "60%",
                maxHeight: 40,
                display: "flex", 
                flexDirection: display === "list" ? "row" : "column",
                justifyContent: display === "list" ? "flex-end" : "flex-start", 
                flexWrap: "wrap",
                alignItems: "center",
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 0
            }}>
               <View style={{paddingLeft: defaultViewPadding, paddingRight: defaultViewPadding, display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                    {mountedStuff.map((item, index) =>{
                        return <Icon key={`mountedBarIcon_${index}`} size={12} source={determineAccessoryIcons(item)} />
                    })}
                </View>
                  </View>
    )
}