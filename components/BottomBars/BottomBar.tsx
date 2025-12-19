import { Dimensions, TouchableOpacity, View } from "react-native";
import { Card, Icon, IconButton, Text } from "react-native-paper";
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
import { useRef, useState } from "react";
import BottomBar_AccessoryCollection from "./BottomBar_AccessoryCollection";
import BottomBar_LiteratureCollection from "./BottomBar_LiteratureCollection";
import BottomBar_ReloadingCollection from "./BottomBar_ReloadingCollection";
import { CollectionType, Screens, StackParamList } from "interfaces";
import { useItemStore } from "stores/useItemStore";
import BottomBar_PartCollection from "./BottomBar_PartCollection";
import { State } from "react-native-gesture-handler";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

interface Props{
  screen?: string
  bottomBarRef: React.RefObject<BottomSheetMethods>
  snapStateRef: React.RefObject<Number>
  bottomBarIcon: string
}

export default function BottomBar({screen, bottomBarRef, snapStateRef, bottomBarIcon}:Props){

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

    
  const handleToggleBottomSheet = () => {
    // The ref setting are handled by the onChange event of the bottom sheet itself already
    if (snapStateRef.current === 0) {
      bottomBarRef.current.snapToIndex(1); 
      return
    }
    if (snapStateRef.current === 1) {
      bottomBarRef.current.snapToIndex(0); 
      return
    }
  }

  return(
    <View style={{width: "100%", flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "flex-start"}}>
      
      <View style={{backgroundColor: theme.colors.inverseOnSurface, width: "100%", height: defaultBottomBarHeight, flexDirection: "row", justifyContent: "space-around", alignItems: "center", borderTopColor: theme.colors.primary, borderTopWidth: 2, paddingTop: 2}}>
        
        <View style={{width: "100%", position: "absolute", left: 0, top: -30}}>
          <IconButton
            icon={bottomBarIcon}
            size={30}
            style={{alignSelf: "center"}}
            containerColor={theme.colors.primary}
            iconColor={theme.colors.onPrimary}
            contentStyle={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "flex-end"}}
            onPress={()=> handleToggleBottomSheet()}
            animated
          />
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

      <View style={{flex: 1, backgroundColor: theme.colors.inverseOnSurface, paddingBottom: defaultBottomBarTextHeight*2}}>
        <Carousel
          ref={ref}
          width={width}
          height={400}
          data={data}
          autoFillData={true}
          onProgressChange={progress}
          mode={"parallax"}
          enabled={true}
            onConfigurePanGesture={(gesture) => {
            gesture
              .activeOffsetX([-10, 10])   // activate only on horizontal swipe
              .failOffsetY([-10, 10]);    // fail on vertical swipe
          }}
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