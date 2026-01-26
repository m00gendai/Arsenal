import { Dimensions, View } from "react-native";
import { IconButton, Text } from "react-native-paper"
import { hints, hintsTitle } from "./hints_text";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { FlipInEasyX, useSharedValue } from "react-native-reanimated";
import { defaultViewPadding } from "configs/configs";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PREFERENCES } from "configs/configs_DB";
import { generalSettingsLabels } from "lib/textTemplates";

export default function Hints(){

    const { language, theme, generalSettings, setGeneralSettings } = usePreferenceStore()

    async function closeHints(){
        setGeneralSettings({...generalSettings, hintsDisplay: false})
        const newSettings = {...generalSettings, hintsDisplay: false}
        const preferences:string = await AsyncStorage.getItem(PREFERENCES)
        const newPreferences:{[key:string] : string} = preferences == null ? {"generalSettings": newSettings} : {...JSON.parse(preferences), "generalSettings": newSettings} 
        await AsyncStorage.setItem(PREFERENCES, JSON.stringify(newPreferences))
    }

    const ref = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);
      
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

    return(
        <View 
            style={{
                backgroundColor: theme.colors.primaryContainer, 
                width: "100%",
                display: "flex",
                flexDirection: "column",
                padding: defaultViewPadding,
                borderRadius: 15,
                overflow: "hidden"
            }}
        ><View>
            <View 
                style={{
                    width: "100%", 
                    display: "flex", 
                    flexDirection: "row", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    marginBottom: defaultViewPadding
                }}
            >
                <Text variant="titleMedium">{hintsTitle[language]}</Text>
                <IconButton
                    icon="close"
                    size={12} 
                    style={{backgroundColor: theme.colors.primary, padding: 0, margin: 0}}
                    iconColor={theme.colors.onPrimary}
                    onPress={()=> closeHints()}
                />
            </View>
        </View>
            <View style={{marginTop: defaultViewPadding, display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap"}}>
                <Carousel
                    loop={true}
                    width={Dimensions.get("screen").width-(defaultViewPadding*2)}
                    height={Dimensions.get("screen").width/4}
                    snapEnabled={true}
                    pagingEnabled={true}
                    onProgressChange={progress}
                    data={hints}
                    renderItem={({ index }) => 
                        {
                            return(
                                <ScrollView style={{width: "100%", padding: defaultViewPadding}}>
                                    <Text>{hints[index][language]}</Text>
                                </ScrollView>
                            )
                        }
                    }
                />
                <Pagination.Basic
                    progress={progress}
                    data={hints}
                    dotStyle={{ backgroundColor: theme.colors.primary, borderRadius: 50, height: 5, width: 5 }}
                    containerStyle={{ gap: 5, marginTop: defaultViewPadding*2}}
                    onPress={onPressPagination}
                />
            </View>

        </View>
    )
}