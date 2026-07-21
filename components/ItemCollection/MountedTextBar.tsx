import { defaultViewPadding } from "configs/configs";
import { AccessoryMount, CollectionType, PartMount } from "lib/interfaces";
import { View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { determineAccessoryIcons } from "functions/determinators";
import { useItemStore } from "stores/useItemStore";

interface Props{
    mountedOn: string
}

export default function MountedTextBar({mountedOn}:Props){

    const { displaySettings, language, theme, generalSettings } = usePreferenceStore()
    const { currentItem, setCurrentItem, currentCollection } = useItemStore()  

    const display = displaySettings[currentCollection]

    return(
        <View style={{
                position: "absolute",
                left: display === "grid" ? 1 : undefined,
                right: 1,
                top: display === "grid" ? 1 : undefined,
                bottom: display === "grid" ? undefined : -5,
                margin: display === "grid" ? 6 : 0,
                backgroundColor: display === "list" ? "transparent" : theme.colors.primaryContainer.replace("rgb(", "rgba(").replace(")", ", 0.8)"),
                maxHeight: 40,
                display: "flex", 
                flexDirection: "row",
                justifyContent: display === "list" ? "flex-end" : "flex-start", 
                flexWrap: "wrap",
                alignItems: "center",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0
            }}>
               <View style={{paddingLeft: defaultViewPadding, paddingRight: defaultViewPadding, display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                    <Text style={{fontSize: 10, textAlign: "right", width: "100%"}}><Icon source="wrench" size={10} />{" "}{mountedOn}</Text>
                </View>
                  </View>
    )
}