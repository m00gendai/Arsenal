import { TouchableOpacity, View } from "react-native";
import { Divider, Icon, Text } from "react-native-paper";
import { defaultViewPadding } from "configs";
import { useViewStore } from "stores/useViewStore";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { mainCollectionCategories, tabBarLabels } from "lib/textTemplates";
import { CollectionType } from "interfaces";
import { useItemStore } from "stores/useItemStore";

interface Props{
    handleNavigation:(target: "itemCollection", params:{ collectionType: CollectionType })=>void
}

export default function BottomBar_AccessoryCollection({handleNavigation}:Props){


    const { language, theme } = usePreferenceStore()
    const { currentCollection } = useItemStore()

    return(
        <View 
            style={{
                width: "100%",
                display: "flex", 
                justifyContent: "center", 
                alignItems: "flex-start", 
                flexWrap: "wrap", 
                flexDirection: "row",
                padding: defaultViewPadding,
                rowGap: 30,
                columnGap: "1%"
            }}
        >
            <Text variant={"headlineSmall"} style={{width: "100%", textAlign: "center"}}>
                {mainCollectionCategories.accessoryCollection[language]}
            </Text>
            
            <Divider style={{height: 2, width: "100%", backgroundColor: theme.colors.primary}} />
            
            <TouchableOpacity 
                onPress={()=>
                    // change collection type value
                    handleNavigation("itemCollection", {collectionType: "accessoryCollection_Silencer"})} 
                style={{
                    width: "30%", 
                    alignItems: 'center'}}
            >
                <Icon 
                    // change icon
                    source="volume-off" 
                    size={48} 
                    color={currentCollection === "accessoryCollection_Silencer" ? theme.colors.primary : theme.colors.secondary} 
                />
                <Text 
                    style={{
                        textAlign: "center", 
                        color: currentCollection === "accessoryCollection_Silencer" ? theme.colors.primary : theme.colors.secondary, 
                        marginTop: 4 }}
                >
                    {`${tabBarLabels.silencerCollection[language]}`}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={()=>
                    // change collection type value
                    handleNavigation("itemCollection", {collectionType: "accessoryCollection_Optic"})} 
                style={{
                    width: "30%", 
                    alignItems: 'center'}}
            >
                <Icon 
                    // change icon
                    source="toslink" 
                    size={48} 
                    // change collection type
                    color={currentCollection === "accessoryCollection_Optic" ? theme.colors.primary : theme.colors.secondary} 
                />
                <Text 
                    style={{
                        textAlign: "center", 
                        // change collection type
                        color: currentCollection === "accessoryCollection_Optic" ? theme.colors.primary : theme.colors.secondary, 
                        marginTop: 4 }}
                >
                    {`${tabBarLabels.opticCollection[language]}`}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={()=>
                    // change collection type value
                    handleNavigation("itemCollection", {collectionType: "accessoryCollection_LightLaser"})} 
                style={{
                    width: "30%", 
                    alignItems: 'center'}}
            >
                <Icon 
                    // change icon
                    source="spotlight-beam" 
                    size={48} 
                    // change collection type
                    color={currentCollection === "accessoryCollection_LightLaser" ? theme.colors.primary : theme.colors.secondary} 
                />
                <Text 
                    style={{
                        textAlign: "center", 
                        // change collection type
                        color: currentCollection === "accessoryCollection_LightLaser" ? theme.colors.primary : theme.colors.secondary, 
                        marginTop: 4 }}
                >
                    {`${tabBarLabels.lightLaserCollection[language]}`}
                </Text>
            </TouchableOpacity>

        </View>
    )
}