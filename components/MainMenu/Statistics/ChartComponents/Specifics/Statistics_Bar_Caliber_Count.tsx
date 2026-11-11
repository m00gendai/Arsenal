// Chart Kit example, not super customizable but the best there is...

import { FlatList, LayoutChangeEvent, View } from "react-native"
import { Appbar, Divider, Icon, IconButton, Text, DataTable, ActivityIndicator  } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore"
import * as schema from "db/schema"
import { db } from "db/client"
import { eq, asc, count, ne, and } from 'drizzle-orm';
import { defaultCardRadius, defaultGridGap, defaultViewPadding, screenNameParamsAll } from "configs/configs"
import { ScrollView } from "react-native-gesture-handler"
import { useCallback, useEffect, useMemo, useState } from "react"
import { AmmoType, CollectionType, StackParamList } from "lib/interfaces"
import { Rect } from 'react-native-svg'
import { ColorModel, ColorPaletteGenerator } from '@martinlaxenaire/color-palette-generator'
import { rgbaToHex } from "functions/utils"
import { BarChart } from "react-native-chart-kit/v2";
import { determineItemDesignation, determineTabBarLabel } from "functions/determinators"
import Item from "components/ItemCollection/Item"
import { getDisplayName, getShortCaliberName, getShortCaliberNameFromArray } from "functions/getShortCaliber"
import { dataTemplate_Translations } from "lib/DataTemplates/translations"
import { useItemStore } from "stores/useItemStore"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import ModalContainer from "components/ModalContainer"
import Chart_Bar from "../Charts/Chart_Bar"
import NoDataPlaceHolder from "../NoDataPlaceholder"
import GoToItemDialog from "../../GoToItemDialog"

interface Props{
    collection: CollectionType
}

export default function Statistics_Bar_Caliber_Count({collection}:Props){

    const { language, switchLanguage, theme, switchTheme, generalSettings, setGeneralSettings, caliberDisplayNameList } = usePreferenceStore()

    const [chartContainerSize, setChartContainerSize] = useState({ width: 0, height: 0 })
    
    const colorTheme = theme
    const [uniqueCalibers, setUniqueCalibers] = useState<{[key: string]: number}>({})
    const [totalShots, setTotalShots] = useState<number>(0)
    const [maxSize, setMaxSize] = useState<number>(0)

    const [detailsVisible, setDetailsVisible] = useState<boolean>(false)
    const [modalItems, setModalItems] = useState<[string, string][]>([])
    const [modalTopic, setModalTopic] = useState<string>("")

    function handleDetails(channel: string){
        const entry = channel.slice(0, channel.lastIndexOf(":")).split(", ")
        setModalTopic(entry.join(", "))
        setDetailsVisible(true)

        const detailItems = db.select().from(schema[collection]).where(and(ne(schema[collection].sold_isSold, true), eq(schema[collection].caliber, entry))).all()

        const detailItemArray = detailItems.map(item => {
            return [item.id, determineItemDesignation(collection, item)]
        })
        setModalItems(detailItemArray)
    }

    useEffect(()=>{
        setUniqueCalibers({})
        setMaxSize(0)
        async function getCollectionSize(){
            let localUniqueCalibers:{[key: string]: number} = {}
            let localMaxSize = 0
            let localTotalShots = 0
            for(const screen of screenNameParamsAll){
                if(screen.startsWith(collection)){
                    const collectionSize = await db.select().from(schema[screen]).where(ne(schema[screen].sold_isSold, true))
                    for(const item of collectionSize){
                        const itemCaliber = item.caliber.join(", ") ?? "---"
                        if("currentStock" in item){
                            if(localUniqueCalibers[itemCaliber]){
                                const currentCount = localUniqueCalibers[itemCaliber]
                                const newCount = currentCount + parseInt(item.currentStock)
                                localUniqueCalibers = {...localUniqueCalibers, [itemCaliber]: parseInt(newCount)}
                            } else {
                                localUniqueCalibers = {...localUniqueCalibers, [itemCaliber]: parseInt(item.currentStock)}
                            }
                            if(item.currentStock > localMaxSize){
                                localMaxSize = parseInt(item.currentStock)
                            }
                            localTotalShots += parseInt(item.currentStock)
                        } else {
                            if(localUniqueCalibers[itemCaliber]){
                                const currentCount = localUniqueCalibers[itemCaliber]
                                const newCount = currentCount + 1
                                localUniqueCalibers = {...localUniqueCalibers, [itemCaliber]: parseInt(newCount)}
                            } else {
                                localUniqueCalibers = {...localUniqueCalibers, [itemCaliber]: 1}
                            }
                            if(localUniqueCalibers[itemCaliber] > localMaxSize){
                                localMaxSize = localUniqueCalibers[itemCaliber]
                            }
                            localTotalShots += 1
                        }
                    }
                }
            }
            setUniqueCalibers(localUniqueCalibers)
            setMaxSize(localMaxSize)
            setTotalShots(localTotalShots)
        }
        getCollectionSize()
    },[])

    const palette = useMemo(() => {
        const primaryColor = new ColorModel(rgbaToHex(theme.colors.primary))
        const paletteFromColor = new ColorPaletteGenerator({
            precision: Math.ceil(Object.keys(uniqueCalibers).length/2),
            baseColor: primaryColor,
        })
        return paletteFromColor.getRandomPalette({ length: Object.keys(uniqueCalibers).length, filterPasses: false, })
    }, [theme.colors.primary, uniqueCalibers])

    const pieData = useMemo(() => {
        return Object.entries(uniqueCalibers)
        .map((collection, index) => {
            return {channel: `${collection[0]}: ${collection[1]}`, share: collection[1]}
        })
        .sort((a, b) => {
            const x = a.share
            const y = b.share
            return x < y ? 1 : x > y ? -1 : 0
        }) 
    },[uniqueCalibers])

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

    const chartYDomain = useMemo(() => ({
        min: 0, 
        max: maxSize, 
        nice: false
    }), [maxSize])

    const chartFormatXLabel = useCallback((value, index) => {
        return `${index+1}`
    }, [])

    const chartRenderBar = useCallback(({ bar, radius }) => {
        return <Rect
            x={bar.x} y={bar.y} width={bar.width} height={bar.height} rx={radius}
            fill={palette[bar.dataIndex]?.hex}
            stroke={theme.colors.surfaceVariant} strokeWidth={2}
        />
    }, [palette, theme.colors.surfaceVariant])

    return(
        <View onLayout={onLayout} style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}><Text style={{width: "100%"}} variant="titleMedium">{`${dataTemplate_Translations["caliber"][language]}`}</Text>
            <View style={{flex: 1, borderRadius: defaultCardRadius, overflow: "hidden"}}>
                {chartHeight > 0 ? 
                    Object.entries(uniqueCalibers).length === 0 ? 
                        <NoDataPlaceHolder data={"chart-bar"} /> : <Chart_Bar data={pieData} orientation={"vertical"} width={chartContainerSize.width} height={chartHeight} yDomain={chartYDomain} formatXLabel={chartFormatXLabel} theme={chartTheme} chartRenderBar={chartRenderBar} /> :
                    null}
                {chartHeight > 0 ? Object.entries(uniqueCalibers).length === 0 ? null : <View>
                    <View style={{backgroundColor: theme.colors.background}}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title style={{flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignContent: "center"}} >
                                    <Icon source="pound" color={theme.colors.primary} size={24} />
                                </DataTable.Title>
                                <DataTable.Title style={{flex: 3, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignContent: "center"}} >
                                    <Icon source="tag-text-outline" color={theme.colors.primary} size={24} />
                                </DataTable.Title>
                                <DataTable.Title style={{flex: 2, flexDirection: "row", justifyContent: "flex-end", alignItems: "center", alignContent: "center"}} >
                                    <Text variant="bodyMedium" style={{color: theme.colors.primary}}>
                                        {totalShots}
                                    </Text>
                                </DataTable.Title>
                                <DataTable.Title style={{flex: 2, flexDirection: "row", justifyContent: "flex-end", alignItems: "center", alignContent: "center"}} >
                                    <Text variant="bodyMedium" style={{color: theme.colors.primary}}>
                                        {`${((totalShots/totalShots)*100).toFixed(2)}%`}
                                    </Text>
                                </DataTable.Title>
                                <DataTable.Title style={{flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center", alignContent: "center"}} >
                                    <View></View>
                                </DataTable.Title>
                            </DataTable.Header>
                            <FlatList
                                numColumns={1}
                                initialNumToRender={10}
                                contentContainerStyle={{ gap: defaultGridGap }}
                                columnWrapperStyle={undefined}
                                keyExtractor={(item, index) => `${item.channel.slice(0, item.channel.lastIndexOf(":"))}_${index}`}
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    paddingTop: defaultViewPadding,
                                    paddingLeft: defaultViewPadding,
                                    paddingRight: defaultViewPadding,
                                    paddingBottom: 50,
                                }}
                                data={pieData}
                                renderItem={({ item, index }) => 
                                <DataTable.Row key={`dataTableRow_${index}`} >
                                    <DataTable.Cell style={{flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignContent: "center"}} >
                                        <View style={{position: "relative", flexDirection: "row", justifyContent: "center", alignItems: "center", alignContent: "center", height: 28, aspectRatio: 1/1, backgroundColor: palette[index].hex, borderRadius: "100%", borderColor: theme.colors.surfaceVariant, borderWidth: 1}}>
                                            <View style={{position: "relative", flexDirection: "row", justifyContent: "center", alignItems: "center", alignContent: "center", height: 20, aspectRatio: 1/1, backgroundColor: theme.colors.background, borderRadius: "100%"}}>
                                                <Text variant="labelSmall">{`${index+1}`}</Text>
                                            </View>
                                        </View>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{flex: 3}} >
                                        <Text>{`${getDisplayName(item.channel.slice(0, item.channel.lastIndexOf(":")))}`}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{flex: 2}} numeric>{item.share}</DataTable.Cell>
                                    <DataTable.Cell style={{flex: 2}} numeric>{`${((item.share/totalShots)*100).toFixed(2)}%`}</DataTable.Cell>
                                    <DataTable.Cell style={{flex: 1}}>
                                        <IconButton onPress={()=>handleDetails(item.channel)} icon={"arrow-right"} iconColor={colorTheme.colors.onPrimary} style={{backgroundColor: colorTheme.colors.primary}} size={10} />
                                    </DataTable.Cell>
                                </DataTable.Row>}
                            ListHeaderComponent={null}
                            ListFooterComponent={<View style={{ width: "100%", height: chartHeight*1.5 }} />}
                            ListEmptyComponent={null}
                            />
                        </DataTable>
                    </View>
                </View> : 
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}} >
                    <ActivityIndicator animating={true} color={theme.colors.primary} size="large"/>
                </View>}
            </View>
            <GoToItemDialog collection={collection} topic={"caliber"} modalTopic={modalTopic} items={modalItems} visible={detailsVisible} setVisible={setDetailsVisible} />
        </View>
    )
}