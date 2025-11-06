import { TouchableOpacity, View } from "react-native";
import { Divider, Icon, Text } from "react-native-paper";
import { defaultViewPadding, ScreenNames } from "configs";
import { useViewStore } from "stores/useViewStore";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { mainCollectionCategories, tabBarLabels } from "lib/textTemplates";

interface Props{
    handleNavigation:(target:ScreenNames)=>void
}

export default function BottomBar_AccessoryCollection({handleNavigation}:Props){

    const { currentCollectionScreen, setCurrentCollectionScreen } = useViewStore()
    const { language, theme } = usePreferenceStore()

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
            <Text variant={"headlineSmall"} style={{width: "100%", textAlign: "center"}}>{mainCollectionCategories.accessoryCollection[language]}</Text>
           <Divider style={{height: 2, width: "100%", backgroundColor: theme.colors.primary}} />
            <TouchableOpacity onPress={()=>handleNavigation("AccessoryCollection_Optics")} style={{width: "30%", alignItems: 'center'}}>
              <Icon source="target" size={48} color={currentCollectionScreen === "AccessoryCollection_Optics" ? theme.colors.primary : theme.colors.secondary} />
              <Text style={{textAlign: "center", color: currentCollectionScreen === "AccessoryCollection_Optics" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.opticCollection[language]}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleNavigation("AccessoryCollection_Silencers")} style={{width: "30%", alignItems: 'center'}}>
              <Icon source="volume-off" size={48} color={currentCollectionScreen === "AccessoryCollection_Silencers" ? theme.colors.primary : theme.colors.secondary} />
              <Text style={{textAlign: "center", color: currentCollectionScreen === "AccessoryCollection_Silencers" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.silencerCollection[language]}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleNavigation("AccessoryCollection_LightLaser")} style={{width: "30%", alignItems: 'center'}}>
              <Icon source="flashlight" size={48} color={currentCollectionScreen === "AccessoryCollection_LightLaser" ? theme.colors.primary : theme.colors.secondary} />
              <Text style={{textAlign: "center", color: currentCollectionScreen === "AccessoryCollection_LightLaser" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.lightLaserCollection[language]}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleNavigation("AccessoryCollection_ConversionKits")} style={{width: "30%", alignItems: 'center'}}>
              <Icon source="arrow-split-horizontal" size={48} color={currentCollectionScreen === "AccessoryCollection_ConversionKits" ? theme.colors.primary : theme.colors.secondary} />
              <Text style={{textAlign: "center", color: currentCollectionScreen === "AccessoryCollection_ConversionKits" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.conversionCollection[language]}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleNavigation("AccessoryCollection_Magazines")} style={{width: "30%", alignItems: 'center'}}>
                <Icon source="magazine-rifle" size={48} color={currentCollectionScreen === "AccessoryCollection_Magazines" ? theme.colors.primary : theme.colors.secondary} />
                <Text style={{textAlign: "center", color: currentCollectionScreen === "AccessoryCollection_Magazines" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.gunMagazineCollection[language]}`}</Text>
            </TouchableOpacity>
             <TouchableOpacity onPress={()=>handleNavigation("AccessoryCollection_Misc")} style={{width: "30%", alignItems: 'center'}}>
                <Icon source="shape-plus" size={48} color={currentCollectionScreen === "AccessoryCollection_Misc" ? theme.colors.primary : theme.colors.secondary} />
                <Text style={{textAlign: "center", color: currentCollectionScreen === "AccessoryCollection_Misc" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.accessoriesMiscCollection[language]}`}</Text>
            </TouchableOpacity>
        </View>
    )
}