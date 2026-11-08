// Chart Kit example, not super customizable but the best there is...

import { FlatList, LayoutChangeEvent, View } from "react-native"
import { Appbar, Divider, Icon, IconButton, Text, DataTable, ActivityIndicator  } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore"
import * as schema from "db/schema"
import { db } from "db/client"
import { eq, asc, count, ne, and, gte, lt } from 'drizzle-orm';
import { defaultCardRadius, defaultGridGap, defaultViewPadding, screenNameParamsAll } from "configs/configs"
import { ScrollView } from "react-native-gesture-handler"
import { useCallback, useEffect, useMemo, useState } from "react"
import { AmmoType, CollectionType, ItemType, StackParamList } from "lib/interfaces"
import { G, Circle, Text as SvgText } from "react-native-svg";
import { ColorModel, ColorPaletteGenerator } from '@martinlaxenaire/color-palette-generator'
import { rgbaToHex } from "functions/utils"
import { AreaChart, BarChart, LineChart } from "react-native-chart-kit/v2";
import { determineItemDesignation, determineTabBarLabel } from "functions/determinators"
import Item from "components/ItemCollection/Item"
import { getDisplayName, getShortCaliberName, getShortCaliberNameFromArray } from "functions/getShortCaliber"
import { dataTemplate_Translations } from "lib/DataTemplates/translations"
import ModalContainer from "components/ModalContainer"
import { useItemStore } from "stores/useItemStore"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import Chart_Area from "../Charts/Chart_Area"
import NoDataPlaceHolder from "../NoDataPlaceholder"

interface Props{
    collection: CollectionType
    topic: string
}

export default function Statistics_Line_Date_Generic({collection, topic}:Props){

    const { language, switchLanguage, theme, switchTheme, generalSettings, setGeneralSettings, caliberDisplayNameList } = usePreferenceStore()
    const { setCurrentItem } = useItemStore()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()

    const [chartContainerSize, setChartContainerSize] = useState({ width: 0, height: 0 })
    
    const colorTheme = theme
    const [uniqueEntries, setUniqueEntries] = useState<{[key: string]: number}>({})
    const [total, setTotal] = useState<number>(0)

    const [detailsVisible, setDetailsVisible] = useState<boolean>(false)
    const [modalItems, setModalItems] = useState<[string, string][]>([])
    const [modalTopic, setModalTopic] = useState<string>("")

    function handleConfirm(){
        setDetailsVisible(prev => !prev)
    }
    function handleDetails(channel: string){
        const entry = channel.slice(0, channel.lastIndexOf(":"))
        setModalTopic(entry)
        setDetailsVisible(true)

        const col = schema[collection][topic];
        const year = parseInt(entry);
        const start = new Date(year, 0, 1).getTime();
        const end   = new Date(year + 1, 0, 1).getTime();

        const detailItems = db.select().from(schema[collection]).where(and(ne(schema[collection].sold_isSold, true), gte(col, start),lt(col, end),)).all();

        const detailItemArray = detailItems.map(item => {
            return [item.id, determineItemDesignation(collection, item)]
        })
        setModalItems(detailItemArray)
    }

    function navigateToItem(id: string){
        const itemWithId = db.select().from(schema[collection]).where(eq(schema[collection].id, id)).all()
        setCurrentItem(itemWithId[0])
        navigation.navigate("item")
        setDetailsVisible(false)
    }

    function getYearRange(start: number, stop: number, step: number){
        return Array.from(
            { length: Math.ceil((stop - start) / step) },
            (_, i) => start + i * step,
        )}

    useEffect(()=>{
        setUniqueEntries({})
        setTotal(0)
        async function getCollectionSize(){
            let localUniqueEntries: {[key: string]: number } = {}
            let localTotal = 0
            for(const screen of screenNameParamsAll){
                if(screen.startsWith(collection)){
                    const collectionSize = await db.select().from(schema[screen]).where(ne(schema[screen].sold_isSold, true))
                    for(const item of collectionSize){
                        const year = new Date(item[topic]).getFullYear()
                        if(localUniqueEntries[year]){
                            const currentCount = localUniqueEntries[year]
                            const newCount = currentCount + 1
                            localUniqueEntries = {...localUniqueEntries, [year]: newCount}
                        } else {
                            if(item[topic]){
                                localUniqueEntries = {...localUniqueEntries, [year]: 1}
                            }                            
                        }
                        localTotal += 1
                    }
                }
            }

            const start = Math.min(...Object.keys(localUniqueEntries))
            const stop = new Date().getFullYear()
            const step = 1

            const yearRange = getYearRange(start, stop+1, step)
            for(const year of yearRange){
                if(!localUniqueEntries[year]){
                    localUniqueEntries = {...localUniqueEntries, [year]: 0}
                }
            }
            setUniqueEntries(localUniqueEntries)
            setTotal(localTotal)
        }
        getCollectionSize()
    },[])

    const pieData = useMemo(() => {
        return Object.entries(uniqueEntries)
        .map((collection, index) => {
            return {channel: `${collection[0]}: ${collection[1]}`, share: collection[1]}
        })
        .sort((a, b) => {
            const x = a.channel
            const y = b.channel
            return x < y ? 1 : x > y ? -1 : 0
        })
    },[uniqueEntries])

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

    const chartFormatXLabel = useCallback((label, index) => {
        return label.slice(0, label.lastIndexOf(":"))
    }, [])

    const chartSeries = useMemo(() => ([
        { 
            yKey: "share", 
            label: "Revenue", 
            color: theme.colors.primary, 
            strokeWidth: 3, 
            curve: "step",  
            threshold: {
                y: 1,
                aboveColor: theme.colors.primary,
                belowColor: theme.colors.error
            }
        }
    ]), [theme])

    const chartRenderDot = useCallback((props) => {
        const { x, y, value } = props;

        return value > 0 ? (
            <G>
                <Circle cx={x} cy={y} r={12} fill={theme.colors.primary} />
                <Circle cx={x} cy={y} r={10} fill={theme.colors.background} />
                <SvgText
                    x={x}
                    y={y}
                    fill={theme.colors.onBackground}
                    fontSize={10}
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="central"
                >
                    {value}
                </SvgText>
            </G>
        ) 
        : 
            null
    },[theme])

    return(
        <View onLayout={onLayout} style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text style={{width: "100%"}} variant="titleMedium">{`${dataTemplate_Translations[topic][language]}`}</Text>
            <View style={{flex: 1, borderRadius: defaultCardRadius, overflow: "hidden"}}>
                {chartHeight > 0 ? 
                    Object.entries(uniqueEntries).length === 0 ? 
                        <NoDataPlaceHolder data={"chart-areaspline-variant"} /> : 
                        <Chart_Area data={pieData} width={chartContainerSize.width} height={chartHeight} theme={chartTheme} formatXLabel={chartFormatXLabel} series={chartSeries} renderDot={chartRenderDot} /> :
                    null}
                {chartHeight > 0 ? Object.entries(uniqueEntries).length === 0 ? null : <View>
                    <View style={{backgroundColor: theme.colors.background}}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title style={{flex: 3, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignContent: "center"}} >
                                    <Icon source="tag-text-outline" color={theme.colors.primary} size={24} />
                                </DataTable.Title>
                                <DataTable.Title style={{flex: 2, flexDirection: "row", justifyContent: "flex-end", alignItems: "center", alignContent: "center"}} >
                                    <Text variant="bodyMedium" style={{color: theme.colors.primary}}>
                                        {total}
                                    </Text>
                                </DataTable.Title>
                                <DataTable.Title style={{flex: 2, flexDirection: "row", justifyContent: "flex-end", alignItems: "center", alignContent: "center"}} >
                                    <Text variant="bodyMedium" style={{color: theme.colors.primary}}>
                                        {`${((total/total)*100).toFixed(2)}%`}
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
                                    <DataTable.Cell style={{flex: 3}} >
                                        <Text numberOfLines={5}>{`${getDisplayName(item.channel.slice(0, item.channel.lastIndexOf(":")))}`}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{flex: 2}} numeric>{item.share}</DataTable.Cell>
                                    <DataTable.Cell style={{flex: 2}} numeric>{`${((item.share/total)*100).toFixed(2)}%`}</DataTable.Cell>
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
            <ModalContainer
                title={`${dataTemplate_Translations[topic][language]}: ${modalTopic}`}
                subtitle={null}
                visible={detailsVisible}
                setVisible={setDetailsVisible}
                content={
                    <View style={{width: "100%", height: "100%", position: "relative", padding: defaultViewPadding}}>
                        <DataTable>
                            {modalItems.map((modalItem, index) => {
                                return (
                                    <DataTable.Row key={`dataTableRow_${index}`} >
                                        <DataTable.Cell style={{flex: 5}} >
                                            <Text numberOfLines={10}>{modalItem[1]}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{flex: 1}} >
                                            <IconButton icon="arrow-right" size={14} onPress={() => navigateToItem(modalItem[0])} style={{backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                        </DataTable>
                    </View>
                }
                buttonACK={<IconButton icon="check" onPress={() => handleConfirm()} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
                buttonCNL={null}
                buttonDEL={null}
            />
        </View>
    )
}