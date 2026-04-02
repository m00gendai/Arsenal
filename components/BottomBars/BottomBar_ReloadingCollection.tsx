/* import { TouchableOpacity, View } from "react-native";
import { Divider, Icon, Text } from "react-native-paper";
import { defaultViewPadding, ScreenNames } from "configs/configs";
import { useViewStore } from "stores/useViewStore";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { mainCollectionCategories } from "lib/textTemplates";
import { tabBarLabels } from "lib/Text/text_tabBarLabels";

interface Props{
    handleNavigation:(target:ScreenNames)=>void
}

export default function BottomBar_ReloadingCollection({handleNavigation}:Props){

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
          <Text variant={"headlineSmall"} style={{width: "100%", textAlign: "center"}}>{mainCollectionCategories.reloadingCollection[language]}</Text>
           <Divider style={{height: 2, width: "100%", backgroundColor: theme.colors.primary}} />
            <TouchableOpacity onPress={()=>handleNavigation("ReloadingCollection_Dies")} style={{width: "30%", alignItems: 'center'}}>
              <Icon source="bottle-soda-classic" size={48} color={currentCollectionScreen === "ReloadingCollection_Dies" ? theme.colors.primary : theme.colors.secondary} />
              <Text style={{textAlign: "center", color: currentCollectionScreen === "ReloadingCollection_Dies" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.diesCollection[language]}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleNavigation("ReloadingCollection_Bullets")} style={{width: "30%", alignItems: 'center'}}>
              <Icon source="border-color" size={48} color={currentCollectionScreen === "ReloadingCollection_Bullets" ? theme.colors.primary : theme.colors.secondary} />
              <Text style={{textAlign: "center", color: currentCollectionScreen === "ReloadingCollection_Bullets" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.bulletCollection[language]}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleNavigation("ReloadingCollection_Casings")} style={{width: "30%", alignItems: 'center'}}>
              <Icon source="bullet" size={48} color={currentCollectionScreen === "ReloadingCollection_Casings" ? theme.colors.primary : theme.colors.secondary} />
              <Text style={{textAlign: "center", color: currentCollectionScreen === "ReloadingCollection_Casings" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.caseCollection[language]}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleNavigation("ReloadingCollection_Primers")} style={{width: "30%", alignItems: 'center'}}>
              <Icon source="fire-circle" size={48} color={currentCollectionScreen === "ReloadingCollection_Primers" ? theme.colors.primary : theme.colors.secondary} />
              <Text style={{textAlign: "center", color: currentCollectionScreen === "ReloadingCollection_Primers" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.primerCollection[language]}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleNavigation("ReloadingCollection_Powder")} style={{width: "30%", alignItems: 'center'}}>
              <Icon source="sprinkler-fire" size={48} color={currentCollectionScreen === "ReloadingCollection_Powder" ? theme.colors.primary : theme.colors.secondary} />
              <Text style={{textAlign: "center", color: currentCollectionScreen === "ReloadingCollection_Powder" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.powderCollection[language]}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleNavigation("ReloadingCollection_Misc")} style={{width: "30%", alignItems: 'center'}}>
              <Icon source="shape-plus" size={48} color={currentCollectionScreen === "ReloadingCollection_Misc" ? theme.colors.primary : theme.colors.secondary} />
              <Text style={{textAlign: "center", color: currentCollectionScreen === "ReloadingCollection_Misc" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.reloadingMiscCollection[language]}`}</Text>
            </TouchableOpacity>
        </View>
    )
}
    */