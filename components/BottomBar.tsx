import { Dimensions, TouchableOpacity, View } from "react-native";
import { Card, Divider, Icon, Text } from "react-native-paper";
import { usePreferenceStore } from "../stores/usePreferenceStore";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { tabBarLabels } from "../lib/textTemplates";
import { defaultBottomBarHeight, defaultBottomBarTextHeight, defaultViewPadding, ScreenNames } from "../configs";
import { useViewStore } from "../stores/useViewStore";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { useRef } from "react";
import BottomBar_AccessoryCollection from "./BottomBar_AccessoryCollection";
import BottomBar_LiteratureCollection from "./BottomBar_LiteratureCollection";
import BottomBar_ReloadingCollection from "./BottomBar_ReloadingCollection";

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
      const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
    const data = ["Accessories"] // ["Accessories", "Literature", "Reloading"];
const width = Dimensions.get("window").width;

const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
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
      <View style={{width: "100%", flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "flex-start"}}>
        
        <View style={{backgroundColor: theme.colors.surface, width: "100%", height: defaultBottomBarHeight, flexDirection: "row", justifyContent: "space-around", alignItems: "center", borderTopColor: theme.colors.primary, borderTopWidth: 2, paddingTop: 2}}>
          
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
            <Icon source="ammunition" size={24} color={screen === "AmmoCollection" ? theme.colors.primary : theme.colors.secondary} />
            <Text style={{ color: screen === "AmmoCollection" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{tabBarLabels.ammoCollection[language]}</Text>
          </TouchableOpacity>

        </View>

        <View style={{flex: 1, backgroundColor: theme.colors.surface, paddingBottom: defaultBottomBarTextHeight*2}}>
          <Carousel
            ref={ref}
            width={width}
            height={400}
            data={data}
            autoFillData={false}
            onProgressChange={progress}
            mode={"parallax"}
            enabled={false}
            renderItem={({ index }) => (
              <Card
                style={{
                  flex: 1,
                  paddingTop: defaultViewPadding,
                  width: width-defaultViewPadding,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
              {index === 0 ? 
                <BottomBar_AccessoryCollection handleNavigation={handleNavigation} /> : 
                /*index=== 1 ? 
                <BottomBar_LiteratureCollection handleNavigation={handleNavigation} /> :
                index=== 2 ? 
                <BottomBar_ReloadingCollection handleNavigation={handleNavigation} /> : */
                null}
              </Card>
            )}
          />
 
          <Pagination.Basic
            progress={progress}
            data={data}
            dotStyle={{ backgroundColor: theme.colors.secondary, borderRadius: 50 }}
            activeDotStyle={{ backgroundColor: theme.colors.primary, borderRadius: 50 }}
            containerStyle={{ gap: 5, marginTop: 10 }}
            onPress={onPressPagination}
          />
      
        </View>
      </View>
    )
}