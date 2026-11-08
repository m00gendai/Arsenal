// Chart Kit example, not super customizable but the best there is...

import { Dimensions, LayoutChangeEvent, View, Image, ViewStyle } from "react-native"
import { ActivityIndicator, Appbar, DataTable, Divider, Icon, IconButton, Text } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore"
import * as schema from "db/schema"
import { db } from "db/client"
import { eq, asc, count, ne } from 'drizzle-orm';
import { defaultCardRadius, defaultViewPadding, screenNameParamsAll } from "configs/configs"
import { ScrollView } from "react-native-gesture-handler"
import { preferenceTitles } from "lib/Text/text_settings"
import { useCallback, useEffect, useMemo, useState } from "react"
import { CollectionType, Screens, StackParamList } from "lib/interfaces"

import { ColorModel, ColorPaletteGenerator } from '@martinlaxenaire/color-palette-generator'
import { rgbaToHex } from "functions/utils"
import { PieChart } from "react-native-chart-kit/v2";
import { mainCollectionCategories, MainCollectionCategories } from "lib/textTemplates"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import Chart_Donut from "../Charts/Chart_Donut"

export default function Statistics_Entrypoint(){

    const { language, switchLanguage, theme, switchTheme, generalSettings, setGeneralSettings, caliberDisplayNameList } = usePreferenceStore()
    const navigation = useNavigation<NavigationProp<StackParamList>>()

    const [chartContainerSize, setChartContainerSize] = useState({ width: 0, height: 0 })
    
    const colorTheme = theme
    const [collectionSizes, setCollectionSizes] = useState<[CollectionType, number][]>([])
    const [totalCollectionSize, setTotalCollectionSize] = useState<number>(0)
    const [collectionMainSizes, setCollectionMainSizes] = useState<[MainCollectionCategories, number][]>([])

    function goToGranular(
        target: string,
        params: { label: MainCollectionCategories }
    ){
        navigation.navigate(target, params)
    }

    useEffect(()=>{
        async function getCollectionSize(){
            let mainCollections = {}
            for(const screen of screenNameParamsAll){
                const collectionSize = await db.select({ count: count() }).from(schema[screen]).where(ne(schema[screen].sold_isSold, true))
                setCollectionSizes(prev => [...prev, [screen, collectionSize[0].count]])
                setTotalCollectionSize(prev => prev + collectionSize[0].count)
                const mainCollection = screen.split("_")[0]
                if(mainCollections[mainCollection]){
                    const currentCount = mainCollections[mainCollection]
                    const newCount = currentCount + collectionSize[0].count
                    mainCollections = {...mainCollections, [mainCollection]: newCount}
                } else {
                    mainCollections = {...mainCollections, [mainCollection]: collectionSize[0].count}
                }
            }
            const parsedMainCollections: [MainCollectionCategories, number][] = Object.entries(mainCollections).map(entry =>{
                return [entry[0] as unknown as MainCollectionCategories, entry[1] as number]
            })
            setCollectionMainSizes(parsedMainCollections)
        }

        getCollectionSize()
    },[])

    
    const palette = useMemo(() => {
        const primaryColor = new ColorModel(rgbaToHex(theme.colors.primary))
        const paletteFromColor = new ColorPaletteGenerator({
            precision: collectionMainSizes.length,
            baseColor: primaryColor,
        })
        return paletteFromColor.getRandomPalette({ length: collectionMainSizes.length, filterPasses: false, })
    }, [theme.colors.primary, collectionMainSizes])

    const pieData = useMemo(() => {
        return collectionMainSizes.map((collection, index) => {
            return {channel: `${collection[0]}: ${collection[1]}`, share: collection[1]}
        })
    },[collectionMainSizes])

    const onLayout = useCallback((e: LayoutChangeEvent) => {
        const w = Math.round(e.nativeEvent.layout.width)
        const h = Math.round(e.nativeEvent.layout.height)
        setChartContainerSize(prev =>
            Math.abs(prev.width - w) >= 2 || Math.abs(prev.height - h) >= 2
                ? { width: w, height: h }
                : prev
        )
    }, [])

    const chartHeight = Math.round(chartContainerSize.height / 2)
    
    const chartTheme = useMemo(() => ({
        background: theme.colors.background,
        plotBackground: theme.colors.background,
        text: theme.colors.onBackground,
        mutedText: theme.colors.onBackground,
    }), [colorTheme])

    const chartColors = useMemo(() => {
        return palette.map(color => color.hex)
    },[palette])

    const chartArcLabels_formatLabel = useCallback(({label, index}) => {
        return `${index+1}`
    }, [mainCollectionCategories])

    const chartArcLabels = useMemo(() => ({
        minPercentage: 0,
        reservedWidth: 20,
        connectorLength: 0,
        formatLabel: chartArcLabels_formatLabel
    }), [chartArcLabels_formatLabel, chartContainerSize.width])

    const chartSliceSeparator = useMemo(() => ({
        width: 2, 
        color: theme.colors.surfaceVariant 
    }), [theme])

    const chartCenterLabel = useCallback(() => {
        return (
            <View style={{ alignItems: "center", borderRadius: "100%", overflow: "hidden", borderWidth: 2, borderColor: theme.colors.surfaceVariant }}>
                <Image
                    source={require(`../../../../../assets/appIcon_512.png`)}
                    style={{ width: chartHeight/2, height: chartHeight/2 }}
                    resizeMode="cover"
                />
            </View>
        )
    }, [theme])

    return(
        <View onLayout={onLayout} style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            borderRadius: defaultCardRadius,
            backgroundColor: theme.colors.background,
            overflow: "hidden",
        }}>
            <View style={{flex: 1}}>
                {chartHeight > 0 && <Chart_Donut data={pieData} width={chartContainerSize.width} height={chartHeight} theme={chartTheme} colors={chartColors} sliceSeparator={chartSliceSeparator} arcLabels={chartArcLabels} centerLabel={chartCenterLabel}/>}
                {chartHeight > 0 ? <ScrollView>
                    <View style={{backgroundColor: theme.colors.background}}>
                        <DataTable>
                            {pieData.map((item, index) => (
                                <DataTable.Row key={`dataTableRow_${index}`} >
                                    <DataTable.Cell style={{flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignContent: "center"}} >
                                        <View style={{position: "relative", flexDirection: "row", justifyContent: "center", alignItems: "center", alignContent: "center", height: 28, aspectRatio: 1/1, backgroundColor: palette[index].hex, borderRadius: "100%", borderColor: theme.colors.surfaceVariant, borderWidth: 1}}>
                                            <View style={{position: "relative", flexDirection: "row", justifyContent: "center", alignItems: "center", alignContent: "center", height: 20, aspectRatio: 1/1, backgroundColor: theme.colors.background, borderRadius: "100%"}}>
                                                <Text variant="labelSmall">{`${index+1}`}</Text>
                                            </View>
                                        </View>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{flex: 3, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignContent: "center"}} >
                                        <Text>{`${mainCollectionCategories[item.channel.slice(0, item.channel.lastIndexOf(":"))][language]}`}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{flex: 2}} numeric>{item.share}</DataTable.Cell>
                                    <DataTable.Cell style={{flex: 2}} numeric>{`${item.share ? ((item.share/totalCollectionSize)*100).toFixed(2) : ""}%`}</DataTable.Cell>
                                    <DataTable.Cell>
                                        <IconButton onPress={()=>goToGranular("ViewGranularStatistics", {label: item.channel.slice(0, item.channel.lastIndexOf(":"))})} icon={"arrow-right"} iconColor={colorTheme.colors.onPrimary} style={{backgroundColor: colorTheme.colors.primary}} size={14} />
                                    </DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </DataTable>
                    </View>
                </ScrollView> : 
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}} >
                    <ActivityIndicator animating={true} color={theme.colors.primary} size="large"/>
                </View>}
            </View>
        </View>
    )
}