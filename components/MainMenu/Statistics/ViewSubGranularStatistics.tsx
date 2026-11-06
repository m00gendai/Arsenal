import { Dimensions, View } from "react-native"
import { Appbar, Card } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore"
import { collectionTopics, defaultViewPadding } from "configs/configs"
import { preferenceTitles } from "lib/Text/text_settings"
import Statistics_Count_All from "./ChartComponents/EntryPoints/Statistics_Entrypoint"
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { useRef } from "react"
import { useSharedValue } from "react-native-reanimated";
import { useNavigation, useRoute } from "@react-navigation/native"
import { mainCollectionCategories, MainCollectionCategories } from "lib/textTemplates"
import Statistics_Pie_Count_Generic from "./ChartComponents/Generics/Statistics_Pie_Count_Generic"
import { accessoryCollection, partCollection } from "db/schema"
import Statistics_Bars_Price_Generic from "./ChartComponents/Generics/Statistics_Bars_Price_Generic"
import { CollectionType } from "lib/interfaces"
import { tabBarLabels } from "lib/Text/text_tabBarLabels"
import { determineTabBarLabel } from "functions/determinators"
import Statistics_Bars_Caliber_Count from "./ChartComponents/Specifics/Statistics_Bars_Caliber_Count"

interface RouteParams {
  label: CollectionType  
}


export default function ViewSubGranularStatistics(){

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

    const carouselData = collectionTopics[params.label.split("_")[0]]
    
    return(
        <View style={{flex: 1, paddingBottom: defaultViewPadding}}>
            <Appbar style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={`${preferenceTitles.statistics[language]} ${determineTabBarLabel(params.label)[language]}`}/>
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
                        <Card
                            style={{
                                width: "95%",
                                height: "100%",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                flexDirection: "column",
                                backgroundColor: theme.colors.surfaceVariant,
                                padding: defaultViewPadding,
                            }}
                        >
                            {collectionTopics[params.label.split("_")[0]][index] === "paidPrice" ? 
                                <Statistics_Bars_Price_Generic collection={params.label} topic={collectionTopics[params.label.split("_")[0]][index]} /> :
                            collectionTopics[params.label.split("_")[0]][index] === "caliber" ?
                                <Statistics_Bars_Caliber_Count collection={params.label} topic={collectionTopics[params.label.split("_")[0]][index]} /> :
                            <Statistics_Pie_Count_Generic collection={params.label} topic={collectionTopics[params.label.split("_")[0]][index]} /> 
                               }
                        </Card>
                        
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
                /> :null}
</View>
        </View>
    )
}