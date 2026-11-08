import { Dimensions, View } from "react-native"
import { Appbar, Card } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore"
import { collectionTopics, defaultCardRadius, defaultViewPadding, nonSubCollectionTopics } from "configs/configs"
import { preferenceTitles } from "lib/Text/text_settings"
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { useRef } from "react"
import { useSharedValue } from "react-native-reanimated";
import { useNavigation, useRoute } from "@react-navigation/native"
import { mainCollectionCategories, MainCollectionCategories } from "lib/textTemplates"
import Statistics_Pie_Count_Generic from "./ChartComponents/Generics/Statistics_Pie_Count_Generic"
import Statistics_Bar_Price_Generic from "./ChartComponents/Generics/Statistics_Bar_Price_Generic"
import Statistics_Sub_Entrypoint from "./ChartComponents/EntryPoints/Statistics_Sub_Entrypoint"
import Statistics_Bar_Caliber_Count from "./ChartComponents/Specifics/Statistics_Bar_Caliber_Count"
import Statistics_Line_Date_Generic from "./ChartComponents/Generics/Statistics_Area_Date_Generic"
import Statistics_Bar_CurrentStock_Count from "./ChartComponents/Specifics/Statistics_Bar_CurrentStock_Count"

interface RouteParams {
  label: MainCollectionCategories  
}


export default function ViewGranularStatistics(){

    const navigation = useNavigation()
    const route = useRoute()
    const params = route.params as RouteParams

    const { language, switchLanguage, theme, switchTheme, generalSettings, setGeneralSettings, caliberDisplayNameList } = usePreferenceStore()

    const ref = useRef<ICarouselInstance>(null)
    const progress = useSharedValue<number>(0)
    const width = Dimensions.get("window").width

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        })
    }

    const carouselData = nonSubCollectionTopics.includes(params.label.split("_")[0]) ? collectionTopics[params.label.split("_")[0]] : ["All"]

    return(
        <View style={{flex: 1, paddingBottom: defaultViewPadding}}>
            <Appbar style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={`${preferenceTitles.statistics[language]} ${mainCollectionCategories[params.label][language]}`}/>
            </Appbar>

            <View style={{height: "100%"}}>
                <Carousel
                    ref={ref}
                    width={width}
                    height={Dimensions.get("window").height-192}
                    data={carouselData}
                    autoFillData={false}
                    loop={false}
                    onProgressChange={progress}
                    enabled={carouselData.length > 1 ? true : false}
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
                                padding: defaultViewPadding
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
{                                nonSubCollectionTopics.includes(params.label) ? 
                                    collectionTopics[params.label][index] === "caliber" ? 
                                        <Statistics_Bar_Caliber_Count collection={params.label} /> : 
                                    collectionTopics[params.label][index] === "paidPrice" ? 
                                        <Statistics_Bar_Price_Generic collection={params.label} topic={collectionTopics[params.label][index]} /> :
                                    collectionTopics[params.label][index] === "acquisitionDate_unix" ? 
                                        <Statistics_Line_Date_Generic collection={params.label} topic={collectionTopics[params.label][index]} /> :
                                    collectionTopics[params.label][index] === "currentStock" ? 
                                        <Statistics_Bar_CurrentStock_Count collection={params.label} topic={collectionTopics[params.label][index]} /> :    
                                     <Statistics_Pie_Count_Generic collection={params.label} topic={collectionTopics[params.label][index]} /> :
                                <Statistics_Sub_Entrypoint collection={params.label} /> }
                        </View>
                        
                        </View>
                    )}
                />
                {carouselData.length > 1 ? <Pagination.Basic
                    progress={progress}
                    data={carouselData}
                    dotStyle={{ backgroundColor: theme.colors.secondary, borderRadius: 50 }}
                    activeDotStyle={{ backgroundColor: theme.colors.primary, borderRadius: 50 }}
                    containerStyle={{ gap: 5, marginTop: 0 }}
                    onPress={onPressPagination}
                /> : null}
</View>
        </View>
    )
}