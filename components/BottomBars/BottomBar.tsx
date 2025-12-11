import { Dimensions, TouchableOpacity, View } from "react-native";
import { Card, Icon, Text } from "react-native-paper";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { tabBarLabels } from "lib/textTemplates";
import { defaultBottomBarHeight, defaultBottomBarTextHeight, defaultViewPadding, screenNameParamsMain } from "configs";
import { useViewStore } from "stores/useViewStore";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { useRef } from "react";
import BottomBar_AccessoryCollection from "./BottomBar_AccessoryCollection";
import BottomBar_LiteratureCollection from "./BottomBar_LiteratureCollection";
import BottomBar_ReloadingCollection from "./BottomBar_ReloadingCollection";
import { CollectionType, Screens, StackParamList } from "interfaces";
import { useItemStore } from "stores/useItemStore";
import BottomBar_PartCollection from "./BottomBar_PartCollection";

interface Props{
  screen?: string
}

export default function BottomBar({screen}:Props){

  const navigation = useNavigation<StackNavigationProp<StackParamList>>()
  
  const { setCurrentCollection } = useItemStore()
  const { language, theme } = usePreferenceStore()
  
  const ref = useRef<ICarouselInstance>(null);

  const progress = useSharedValue<number>(0);
  
  const data = ["Accessories", "Parts"] // ["Accessories", "Literature", "Reloading"];
  
  const width = Dimensions.get("window").width;

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  function handleNavigation(
    target: Screens,
    params: { collectionType: CollectionType }
  ){
    setCurrentCollection(params.collectionType)
    navigation.navigate(target, params);
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
          {screenNameParamsMain.map(screenName =>{
            return(
              <TouchableOpacity key={screenName} onPress={()=>handleNavigation("itemCollection", {collectionType: screenName})} style={{ alignItems: 'center' }}>
                <Icon source={screenName === "gunCollection" ? "pistol" : "ammunition"} size={24} color={screen === screenName ? theme.colors.primary : theme.colors.secondary} />
                <Text style={{ color: screen === screenName ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{tabBarLabels[screenName][language]}</Text>
              </TouchableOpacity>
            )
          })}
          </View>

        <View style={{flex: 1, backgroundColor: theme.colors.surface, paddingBottom: defaultBottomBarTextHeight*2}}>
          <Carousel
            ref={ref}
            width={width}
            height={400}
            data={data}
            autoFillData={true}
            onProgressChange={progress}
            mode={"parallax"}
            enabled={true}
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
                index=== 1 ? 
                <BottomBar_PartCollection handleNavigation={handleNavigation} /> : null /*
                index=== 2 ? 
                <BottomBar_ReloadingCollection handleNavigation={handleNavigation} /> :
                null*/}
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