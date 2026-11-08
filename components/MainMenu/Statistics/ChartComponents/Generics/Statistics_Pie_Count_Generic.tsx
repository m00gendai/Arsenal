import { LayoutChangeEvent, View } from "react-native"
import { Appbar, Divider, Icon, IconButton, Text, DataTable, ActivityIndicator  } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore"
import * as schema from "db/schema"
import { db } from "db/client"
import { eq, asc, count, ne, and } from 'drizzle-orm';
import { defaultViewPadding, screenNameParamsAll } from "configs/configs"
import { ScrollView } from "react-native-gesture-handler"
import { useCallback, useEffect, useMemo, useState } from "react"
import { AmmoType, CollectionType, StackParamList } from "lib/interfaces"
import { Rect } from 'react-native-svg'
import { ColorModel, ColorPaletteGenerator } from '@martinlaxenaire/color-palette-generator'
import { rgbaToHex } from "functions/utils"
import { BarChart, PieChart } from "react-native-chart-kit/v2";
import { determineItemDesignation, determineTabBarLabel } from "functions/determinators"
import Item from "components/ItemCollection/Item"
import { getDisplayName, getShortCaliberName, getShortCaliberNameFromArray } from "functions/getShortCaliber"
import { dataTemplate_Translations } from "lib/DataTemplates/translations"
import ModalContainer from "components/ModalContainer"
import { useItemStore } from "stores/useItemStore"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import Chart_Pie from "../Charts/Chart_Pie"
import NoDataPlaceHolder from "../NoDataPlaceholder"

interface Props{
    collection: CollectionType
    topic: string
}

export default function Statistics_Pie_Count_Generic({collection, topic}:Props){

    const { language, switchLanguage, theme, switchTheme, generalSettings, setGeneralSettings, caliberDisplayNameList } = usePreferenceStore()
    const { setCurrentItem } = useItemStore()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()
    
    const [chartContainerSize, setChartContainerSize] = useState({ width: 0, height: 0 })

    const colorTheme = theme
    const [uniqueEntries, setUniqueEntries] = useState<{[key: string]: number}>({})
    const [total, setTotal] = useState<number>(0)
    const [maxSize, setMaxSize] = useState<number>(0)
    const [average, setAverage] = useState<number>(0)

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

        const detailItems = db.select().from(schema[collection]).where(and(ne(schema[collection].sold_isSold, true), eq(schema[collection][topic], entry))).all()
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

    useEffect(()=>{
        setUniqueEntries({})
        setMaxSize(0)
        setTotal(0)
        setAverage(0)
        async function getCollectionSize(){
            let localUniqueEntries: {[key: string]: number } = {}
            let localTotal = 0
            for(const screen of screenNameParamsAll){
                if(screen.startsWith(collection)){
                    const collectionSize = await db.select().from(schema[screen]).where(ne(schema[screen].sold_isSold, true))
                    for(const item of collectionSize){
                        if(localUniqueEntries[item[topic]]){
                            const currentCount = localUniqueEntries[item[topic]]
                            const newCount = currentCount + 1
                            localUniqueEntries = {...localUniqueEntries, [item[topic]]: parseInt(newCount)}
                        } else {
                            if(item[topic]){
                                localUniqueEntries = {...localUniqueEntries, [item[topic]]: 1}
                            } 
                            
                        }
                        localTotal += 1
                    }
                }
            }
            setUniqueEntries(localUniqueEntries)
            setMaxSize(Math.max(...Object.values(localUniqueEntries)))
            setTotal(localTotal)
            if(Object.entries(localUniqueEntries).length <= 5){
                setAverage(Object.entries(localUniqueEntries).length)
            } else {
                setAverage(5)
            }
        }
        getCollectionSize()
    },[])

    const palette = useMemo(() => {
        const primaryColor = new ColorModel(rgbaToHex(theme.colors.primary))
        const paletteFromColor = new ColorPaletteGenerator({
            baseColor: primaryColor,
            precision: Object.keys(uniqueEntries).length
        })
        return paletteFromColor.getRandomPalette({ length: Object.keys(uniqueEntries).length, filterPasses: false, })
    }, [theme.colors.primary, uniqueEntries, topic])

    const pieData = useMemo(() => {
        return Object.entries(uniqueEntries)
        .map((collection, index) => {
            return {channel: `${collection[0]}: ${collection[1]}`, share: collection[1]}
        })
        .sort((a, b) => {
            const x = a.share
            const y = b.share
            return x < y ? 1 : x > y ? -1 : a.channel.localeCompare(b.channel)
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

    const chartColors = useMemo(() => {
        return palette.map(color => color.hex)
    },[palette])

    const chartArcLabels_formatLabel = useCallback(({label, index}) => {
        return index < average ? `${index+1}` : ""
    }, [average])

    const chartArcLabels = useMemo(() => ({
        minPercentage: 0,
        reservedWidth: 20,
        connectorLength: 0,
        formatLabel: chartArcLabels_formatLabel
    }), [chartArcLabels_formatLabel])

    const chartSliceSeparator = useMemo(() => ({
        width: 2, 
        color: theme.colors.surfaceVariant 
    }), [theme])

    return(
        <View onLayout={onLayout} style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
        }}>
            <View style={{flex: 1}}>
                <Text variant="titleMedium">{`${dataTemplate_Translations[topic][language]}`}</Text>
                {chartHeight > 0 ? 
                    Object.entries(uniqueEntries).length === 0 ? 
                        <NoDataPlaceHolder data={"chart-pie"} /> : 
                        <Chart_Pie data={pieData} width={chartContainerSize.width} height={chartHeight} theme={chartTheme} colors={chartColors} sliceSeparator={chartSliceSeparator} arcLabels={chartArcLabels} /> :
                    null}
                {chartHeight > 0 ? Object.entries(uniqueEntries).length === 0 ? null : <ScrollView>
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
                            {pieData.map((item, index) => (
                                <DataTable.Row key={`dataTableRow_${index}`} >
                                    <DataTable.Cell style={{flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignContent: "center"}} >
                                        <View style={{position: "relative", flexDirection: "row", justifyContent: "center", alignItems: "center", alignContent: "center", backgroundColor: palette[index].hex, width: "80%", aspectRatio: "1/1", borderRadius: "100%", borderColor: theme.colors.surfaceVariant, borderWidth: 1}}>
                                            <View style={{position: "relative", flexDirection: "row", justifyContent: "center", alignItems: "center", alignContent: "center", backgroundColor: theme.colors.background, width: "70%", aspectRatio: "1/1", borderRadius: "100%"}}>
                                                <Text variant="labelSmall">{`${index+1}`}</Text>
                                            </View>
                                        </View>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{flex: 3}} >
                                        <Text numberOfLines={5}>{`${getDisplayName(item.channel.slice(0, item.channel.lastIndexOf(":")))}`}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{flex: 2}} numeric>{item.share}</DataTable.Cell>
                                    <DataTable.Cell style={{flex: 2}} numeric>{`${((item.share/total)*100).toFixed(2)}%`}</DataTable.Cell>
                                    <DataTable.Cell style={{flex: 1}}>
                                        <IconButton onPress={()=>handleDetails(item.channel)} icon={"arrow-right"} iconColor={colorTheme.colors.onPrimary} style={{backgroundColor: colorTheme.colors.primary}} size={10} />
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