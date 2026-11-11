import { Dimensions, View } from "react-native"
import { Appbar, Card } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore"
import { defaultCardRadius, defaultViewPadding } from "configs/configs"
import { preferenceTitles } from "lib/Text/text_settings"
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { useRef } from "react"
import { useSharedValue } from "react-native-reanimated";
import Statistics_Entrypoint from "./ChartComponents/EntryPoints/Statistics_Entrypoint"

export default function ViewStatistics({navigation}){

    const { language, switchLanguage, theme, switchTheme, generalSettings, setGeneralSettings, caliberDisplayNameList } = usePreferenceStore()

    const ref = useRef<ICarouselInstance>(null)
    const progress = useSharedValue<number>(0)
    const data = ["All"]
    const width = Dimensions.get("window").width

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        })
    }
    
    return(
        <View style={{flex: 1, paddingBottom: defaultViewPadding}}>
            <Appbar style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={preferenceTitles.statistics[language]}/>
            </Appbar>

            <View style={{height: "100%"}}>
                <Carousel
                    ref={ref}
                    width={width}
                    height={Dimensions.get("window").height-192}
                    data={data}
                    autoFillData={false}
                    loop={false}
                    onProgressChange={progress}
                    enabled={data.length > 1 ? true : false}
                        onConfigurePanGesture={(gesture) => {
                        gesture
                        .activeOffsetX([-10, 10])   // activate only on horizontal swipe
                        .failOffsetY([-10, 10]);    // fail on vertical swipe
                    }}
                    renderItem={({ index }) => (
                        <View
                            style={{
                                width: "100%",
                                backgroundColor: theme.colors.background,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "flex-start",
                                padding: defaultViewPadding,
                            }}    
                        >
                        <View
                            style={{
                                width: "95%",
                                height: "100%",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                flexDirection: "column",
                                backgroundColor: theme.colors.surfaceVariant,
                                padding: defaultViewPadding,
                                borderRadius: defaultCardRadius
                            }}
                        >
                            {index === 0 ? 
                                <Statistics_Entrypoint /> :
                            null}
                        </View>
                        
                        </View>
                    )}
                />
                {data.length > 1 ? <Pagination.Basic
                    progress={progress}
                    data={data}
                    dotStyle={{ backgroundColor: theme.colors.secondary, borderRadius: 50 }}
                    activeDotStyle={{ backgroundColor: theme.colors.primary, borderRadius: 50 }}
                    containerStyle={{ gap: 5, marginTop: 0 }}
                    onPress={onPressPagination}
                /> : null}
</View>
        </View>
    )
}