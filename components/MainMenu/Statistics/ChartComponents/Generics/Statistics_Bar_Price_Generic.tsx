// Chart Kit example, not super customizable but the best there is...

import { LayoutChangeEvent, View } from "react-native"
import { Appbar, Divider, Icon, IconButton, Text, DataTable, ActivityIndicator  } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore"
import * as schema from "db/schema"
import { db } from "db/client"
import { eq, asc, count, ne } from 'drizzle-orm';
import { screenNameParamsAll } from "configs/configs"
import { ScrollView } from "react-native-gesture-handler"
import { useCallback, useEffect, useMemo, useState } from "react"
import { AmmoType, CollectionType, ItemType } from "lib/interfaces"
import { Rect } from 'react-native-svg'
import { ColorModel, ColorPaletteGenerator } from '@martinlaxenaire/color-palette-generator'
import { rgbaToHex } from "functions/utils"
import { BarChart } from "react-native-chart-kit/v2";
import { determineItemDesignation, determineTabBarLabel } from "functions/determinators"
import Item from "components/ItemCollection/Item"
import { getDisplayName, getShortCaliberName, getShortCaliberNameFromArray } from "functions/getShortCaliber"
import { dataTemplate_Translations } from "lib/DataTemplates/translations"
import Chart_Bar from "../Charts/Chart_Bar"

interface Props{
    collection: CollectionType
    topic: string
}

export default function Statistics_Bars_Price_Generic({collection, topic}:Props){

    const { language, switchLanguage, theme, switchTheme, generalSettings, setGeneralSettings, caliberDisplayNameList } = usePreferenceStore()
    
    const [chartContainerSize, setChartContainerSize] = useState({ width: 0, height: 0 })

    const colorTheme = theme
    const [entries, setEntries] = useState<{[key: string]: number}>({})
    const [total, setTotal] = useState<number>(0)
    const [maxSize, setMaxSize] = useState<number>(0)

    useEffect(()=>{
        setEntries({})
        setMaxSize(0)
        async function getCollectionSize(){
            let localEntries = {}
            let localMaxSize = 0
            let localTotal = 0
            for(const screen of screenNameParamsAll){
                if(screen.startsWith(`${collection}`)){
                    const collectionSize = await db.select().from(schema[screen]).where(ne(schema[screen].sold_isSold, true)) as ItemType[]
                    for(const item of collectionSize){
                        if(item.paidPrice){
                            const key = determineItemDesignation(collection, item)
                            localEntries = {...localEntries, [key] : parseFloat(item.paidPrice)}
                            if(item.paidPrice > localMaxSize){
                                localMaxSize = parseFloat(item.paidPrice)
                            }
                            localTotal += parseFloat(item.paidPrice)
                        }
                    }
                }
            }
            setEntries(localEntries)
            setMaxSize(localMaxSize)
            setTotal(localTotal)
        }
        getCollectionSize()
    },[])

    const palette = useMemo(() => {
        const primaryColor = new ColorModel(rgbaToHex(theme.colors.primary))
        const paletteFromColor = new ColorPaletteGenerator({
            precision: Math.ceil(Object.keys(entries).length),
            baseColor: primaryColor,
        })
        return paletteFromColor.getRandomPalette({ length: Object.keys(entries).length, filterPasses: false, })
    }, [theme.colors.primary, entries])

    const pieData = useMemo(() => {
        return Object.entries(entries)
        .map((collection, index) => {
            return {channel: `${collection[0]}: ${collection[1]}`, share: collection[1]}
        })
        .sort((a, b) => {
            const x = a.share
            const y = b.share
            return x < y ? 1 : x > y ? -1 : 0
        })
    },[entries])

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
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
        }}>
            <View style={{flex: 1}}>
                <Text variant="titleMedium">{`${dataTemplate_Translations[topic][language]}`}</Text>
                {chartHeight > 0 && <Chart_Bar data={pieData} orientation={"vertical"} width={chartContainerSize.width} height={chartHeight} yDomain={chartYDomain} formatXLabel={chartFormatXLabel} theme={chartTheme} chartRenderBar={chartRenderBar} />}
                {chartHeight > 0 ? <ScrollView>
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
                                        {total.toFixed(2)}
                                    </Text>
                                </DataTable.Title>
                                <DataTable.Title style={{flex: 2, flexDirection: "row", justifyContent: "flex-end", alignItems: "center", alignContent: "center"}} >
                                    <Text variant="bodyMedium" style={{color: theme.colors.primary}}>
                                        {`${((total/total)*100).toFixed(2)}%`}
                                    </Text>
                                </DataTable.Title>
                            </DataTable.Header>
                            {pieData.map((item, index) => (
                                <DataTable.Row key={`dataTableRow_${index}`} >
                                    <DataTable.Cell style={{flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignContent: "center"}} >
                                        <View style={{position: "relative", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: palette[index].hex, width: "80%", aspectRatio: "1/1", borderRadius: "100%", borderColor: theme.colors.surfaceVariant, borderWidth: 1}}>
                                            <View style={{position: "relative", flexDirection: "row", justifyContent: "center", alignItems: "center", alignContent: "center", backgroundColor: theme.colors.background, width: "70%", aspectRatio: "1/1", borderRadius: "100%"}}>
                                                <Text variant="labelSmall">{`${index+1}`}</Text>
                                            </View>
                                        </View>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{flex: 3}} >
                                        <Text numberOfLines={5}>{`${getDisplayName(item.channel.slice(0, item.channel.lastIndexOf(":")))}`}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{flex: 2}} numeric>{item.share.toFixed(2)}</DataTable.Cell>
                                    <DataTable.Cell style={{flex: 2}} numeric>{`${((item.share/total)*100).toFixed(2)}%`}</DataTable.Cell>
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