import { LayoutChangeEvent, View } from "react-native"
import { Appbar, Divider, Icon, IconButton, Text, DataTable  } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore"
import * as schema from "db/schema"
import { db } from "db/client"
import { eq, asc, count, ne } from 'drizzle-orm';
import { screenNameParamsAll } from "configs/configs"
import { ScrollView } from "react-native-gesture-handler"
import { useEffect, useMemo, useState } from "react"
import { AmmoType, CollectionType } from "lib/interfaces"
import { Rect } from 'react-native-svg'
import { ColorModel, ColorPaletteGenerator } from '@martinlaxenaire/color-palette-generator'
import { rgbaToHex } from "functions/utils"
import { BarChart, PieChart } from "react-native-chart-kit/v2";
import { determineTabBarLabel } from "functions/determinators"
import Item from "components/ItemCollection/Item"
import { getDisplayName, getShortCaliberName, getShortCaliberNameFromArray } from "functions/getShortCaliber"
import { dataTemplate_Translations } from "lib/DataTemplates/translations"

interface Props{
    collection: CollectionType
    topic: string
}

export default function Statistics_Pie_Count_Generic({collection, topic}:Props){

    const { language, switchLanguage, theme, switchTheme, generalSettings, setGeneralSettings, caliberDisplayNameList } = usePreferenceStore()

    const colorTheme = theme
    const [uniqueEntries, setUniqueEntries] = useState<{[key: string]: number}>({})
    const [total, setTotal] = useState<number>(0)
    const [maxSize, setMaxSize] = useState<number>(0)
    const [average, setAverage] = useState<number>(0)

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
                     console.log(`screen: ${screen}`)
                console.log(`collection: ${collection}`)
                    const collectionSize = await db.select().from(schema[screen]).where(ne(schema[screen].sold_isSold, true))
                    for(const item of collectionSize){
                        if(localUniqueEntries[item[topic]]){
                            const currentCount = localUniqueEntries[item[topic]]
                            const newCount = currentCount + 1
                            localUniqueEntries = {...localUniqueEntries, [item[topic]]: parseInt(newCount)}
                        } else {
                            if(item[topic]){
                                localUniqueEntries = {...localUniqueEntries, [item[topic]]: 1}
                            } else {
                                localUniqueEntries = {...localUniqueEntries, "---": 1}
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

    const pieData = Object.entries(uniqueEntries)
    .map((collection, index) => {
        return {channel: `${collection[0]}: ${collection[1]}`, share: collection[1]}
    })
    .sort((a, b) => {
        const x = a.share
        const y = b.share
        return x < y ? 1 : x > y ? -1 : a.channel.localeCompare(b.channel)
    })

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    
    const onLayout = (e: LayoutChangeEvent) => {
        setWidth(e.nativeEvent.layout.width)
        setHeight(e.nativeEvent.layout.height)
    }

    return(
        <View onLayout={onLayout} style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
        }}>
            <View>
                <Text variant="titleMedium">{`${dataTemplate_Translations[topic][language]}`}</Text>
                <PieChart
                    data={pieData}
                    valueKey="share"
                    labelKey="channel"
                    sliceSeparator={{ width: 2 }}
                    width={width}
                    height={height/2}
                    legend={false}
                    theme={{
                        background: theme.colors.background,
                        plotBackground: theme.colors.background,
                        text: theme.colors.onBackground,
                        mutedText: theme.colors.onBackground,
                    }}
                    colors={palette.map(color => color.hex)}
                    arcLabels={{
                        minPercentage: 0,
                        reservedWidth: 20,
                        connectorLength: 0,
                        formatLabel: ({ label, index }) =>
                        index < average ? `${index+1}` : ""
                    }}
                />
                <ScrollView>
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
                            </DataTable.Header>
                            {pieData.map((item, index) => (
                                <DataTable.Row key={`dataTableRow_${index}`} >
                                    <DataTable.Cell style={{flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignContent: "center"}} >
                                        <View style={{position: "relative", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: palette[index].hex, width: "80%", aspectRatio: "1/1", borderRadius: "100%", borderColor: theme.colors.surfaceVariant, borderWidth: 1}}>
                                            <View style={{position: "relative", flexDirection: "row", justifyContent: "center", alignItems: "center", alignContent: "center", backgroundColor: theme.colors.background, width: "70%", aspectRatio: "1/1", borderRadius: "100%"}}>
                                                <Text>{`${index+1}`}</Text>
                                            </View>
                                        </View>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{flex: 3}} >
                                        <Text numberOfLines={5}>{`${getDisplayName(item.channel.split(":")[0])}`}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{flex: 2}} numeric>{item.share}</DataTable.Cell>
                                    <DataTable.Cell style={{flex: 2}} numeric>{`${((item.share/total)*100).toFixed(2)}%`}</DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </DataTable>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}