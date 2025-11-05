import { TouchableOpacity, View } from "react-native";
import { Divider, Icon, Text } from "react-native-paper";
import { usePreferenceStore } from "../stores/usePreferenceStore";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { tabBarLabels } from "../lib/textTemplates";
import { defaultBottomBarHeight, defaultBottomBarTextHeight, defaultViewPadding, ScreenNames } from "../configs";
import { useViewStore } from "../stores/useViewStore";

type RootStackParamList = {
  GunCollection: undefined;
  AmmoCollection: undefined;
  // Add other routes here if needed
};

type BottomBarNavigationProp = StackNavigationProp<RootStackParamList>;

interface Props{
  screen?: string
}

export default function BottomBar({screen}:Props){

    type RootStackParamList = {
        GunCollection: undefined;
        AmmoCollection: undefined;
        // Add other routes here if needed
      };
      

    const { displayAsGrid, toggleDisplayAsGrid, sortBy, setSortBy, language, setSortGunIcon, sortGunIcon, sortGunsAscending, toggleSortGunsAscending, theme } = usePreferenceStore()
    const navigation = useNavigation<BottomBarNavigationProp>()
    const { currentCollectionScreen, setCurrentCollectionScreen } = useViewStore()

    function handleNavigation(target:ScreenNames){
    console.log(`target: ${target}`)
    setCurrentCollectionScreen(target)
    navigation.navigate(target as any)
  }

    
    return(
      <View style={{width: "100%", backgroundColor: theme.colors.surface, flexDirection: "column", justifyContent: "center", alignItems: "flex-start"}}>
        
        <View style={{width: "100%", height: defaultBottomBarHeight, flexDirection: "row", justifyContent: "space-around", alignItems: "center", borderTopColor: theme.colors.primary, borderTopWidth: 2, paddingTop: 2}}>
          <View style={{width: "100%", position: "absolute", left: 0, top: 0}}>
            <View style={{alignSelf: "center"}}>
              <Icon
                source="chevron-up"
                color={theme.colors.secondary}
                size={30}
              />
            </View>
          </View>

          <TouchableOpacity onPress={()=>handleNavigation("GunCollection")} style={{ alignItems: 'center' }}>
            <Icon source="pistol" size={24} color={screen === "GunCollection" ? theme.colors.primary : theme.colors.secondary} />
            <Text style={{ color: screen === "GunCollection" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{tabBarLabels.gunCollection[language]}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>handleNavigation("AmmoCollection")} style={{ alignItems: 'center' }}>
            <Icon source="bullet" size={24} color={screen === "AmmoCollection" ? theme.colors.primary : theme.colors.secondary} />
            <Text style={{ color: screen === "AmmoCollection" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{tabBarLabels.ammoCollection[language]}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={{paddingBottom: defaultBottomBarTextHeight*2}}>

            <View style={{width: "100%", height: defaultBottomBarTextHeight, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <Divider style={{width: "100%"}}/>
            <Text style={{position: "absolute", backgroundColor: theme.colors.background, paddingLeft: defaultViewPadding, paddingRight: defaultViewPadding}}>{"Label"}</Text>
          </View>

          <View style={{width: "100%", height: defaultBottomBarHeight, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", flexWrap: "wrap", marginTop: defaultViewPadding, marginBottom: defaultViewPadding}}>
      
      <TouchableOpacity onPress={()=>handleNavigation("AccessoryCollection_Optics")} style={{width: "33%", alignItems: 'center', marginBottom: 10}}>
              <Icon source="target" size={24} color={currentCollectionScreen === "AccessoryCollection_Optics" ? theme.colors.primary : theme.colors.secondary} />
              <Text style={{ color: currentCollectionScreen === "AccessoryCollection_Optics" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.scopeCollection[language]}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleNavigation("AccessoryCollection_Optics")} style={{width: "33%", alignItems: 'center', marginBottom: 10}}>
              <Icon source="toslink" size={24} color={currentCollectionScreen === "AccessoryCollection_Optics" ? theme.colors.primary : theme.colors.secondary} />
              <Text style={{ color: currentCollectionScreen === "AccessoryCollection_Optics" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.opticCollection[language]}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleNavigation("AccessoryCollection_Silencers")} style={{width: "33%", alignItems: 'center', marginBottom: 10}}>
              <Icon source="volume-off" size={24} color={currentCollectionScreen === "AccessoryCollection_Silencers" ? theme.colors.primary : theme.colors.secondary} />
              <Text style={{ color: currentCollectionScreen === "AccessoryCollection_Silencers" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.silencerCollection[language]}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleNavigation("AccessoryCollection_Optics")} style={{width: "33%", alignItems: 'center', marginBottom: 10}}>
              <Icon source="flashlight" size={24} color={currentCollectionScreen === "AccessoryCollection_Optics" ? theme.colors.primary : theme.colors.secondary} />
              <Text style={{ color: currentCollectionScreen === "AccessoryCollection_Optics" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.lightLaserCollection[language]}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleNavigation("AccessoryCollection_Optics")} style={{width: "33%", alignItems: 'center', marginBottom: 10}}>
              <Icon source="swap-horizontal" size={24} color={currentCollectionScreen === "AccessoryCollection_Optics" ? theme.colors.primary : theme.colors.secondary} />
              <Text style={{ color: currentCollectionScreen === "AccessoryCollection_Optics" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.conversionCollection[language]}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleNavigation("AccessoryCollection_Magazines")} style={{width: "33%", alignItems: 'center', marginBottom: 10 }}>
                <Icon source="lightbulb-fluorescent-tube-outline" size={24} color={currentCollectionScreen === "AccessoryCollection_Magazines" ? theme.colors.primary : theme.colors.secondary} />
                <Text style={{ color: currentCollectionScreen === "AccessoryCollection_Magazines" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.barrelCollection[language]}`}</Text>
              </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleNavigation("AccessoryCollection_Magazines")} style={{width: "33%", alignItems: 'center', marginBottom: 10 }}>
                <Icon source="magazine-rifle" size={24} color={currentCollectionScreen === "AccessoryCollection_Magazines" ? theme.colors.primary : theme.colors.secondary} />
                <Text style={{ color: currentCollectionScreen === "AccessoryCollection_Magazines" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.magazineCollection[language]}`}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>handleNavigation("AccessoryCollection_Magazines")} style={{width: "33%", alignItems: 'center', marginBottom: 10 }}>
                <Icon source="shape-plus" size={24} color={currentCollectionScreen === "AccessoryCollection_Magazines" ? theme.colors.primary : theme.colors.secondary} />
                <Text style={{ color: currentCollectionScreen === "AccessoryCollection_Magazines" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.miscCollection[language]}`}</Text>
              </TouchableOpacity>
</View>
          </View>
        </View>
      </View>
    )
}