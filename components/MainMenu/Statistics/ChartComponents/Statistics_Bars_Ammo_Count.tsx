// Chart Kit example, not super customizable but the best there is...

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
import { BarChart } from "react-native-chart-kit/v2";
import { determineTabBarLabel } from "functions/determinators"
import Item from "components/ItemCollection/Item"
import { getDisplayName, getShortCaliberName, getShortCaliberNameFromArray } from "functions/getShortCaliber"

interface Props{
    collection: CollectionType
}

export default function Statistics_Bars_Ammo_Count({collection}:Props){

    const { language, switchLanguage, theme, switchTheme, generalSettings, setGeneralSettings, caliberDisplayNameList } = usePreferenceStore()
    
    const colorTheme = theme
    const [uniqueCalibers, setUniqueCalibers] = useState({})
    const [totalShots, setTotalShots] = useState<number>(0)
    const [maxSize, setMaxSize] = useState<number>(0)

    useEffect(()=>{
        setUniqueCalibers({})
        setMaxSize(0)
        async function getCollectionSize(){
            let localUniqueCalibers = {}
            let localMaxSize = 0
            let localTotalShots = 0
            for(const screen of screenNameParamsAll){
                if(screen.startsWith(collection)){
                    const collectionSize = await db.select().from(schema[screen]).where(ne(schema[screen].sold_isSold, true)) as AmmoType[]
                    for(const item of collectionSize){
                        if(localUniqueCalibers[item.caliber[0]]){
                            const currentCount = localUniqueCalibers[item.caliber[0]]
                            const newCount = currentCount + item.currentStock
                            localUniqueCalibers = {...localUniqueCalibers, [item.caliber[0]]: parseInt(newCount)}
                        } else {
                            localUniqueCalibers = {...localUniqueCalibers, [item.caliber[0]]: parseInt(item.currentStock)}
                        }
                        if(item.currentStock > localMaxSize){
                            localMaxSize = parseInt(item.currentStock)
                        }
                        localTotalShots += parseInt(item.currentStock)
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

    const pieData = Object.entries(uniqueCalibers)
    .map((collection, index) => {
        return {channel: `${collection[0]}: ${collection[1]}`, share: collection[1]}
    })
    .sort((a, b) => {
        const x = a.share
        const y = b.share
        return x < y ? 1 : x > y ? -1 : 0
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
                <BarChart
                    data={pieData}
                    xKey="channel"
                    yKey="share"
                    orientation="vertical"
                    showValuesOnTopOfBars={false}
                    width={width}
                    height={height/2}
                    scrollable
                    visiblePoints={10}
                    initialIndex="start"
                    yDomain={{ min: 0, max: maxSize, nice: false }}
                    formatXLabel={(value, index) => `${index+1}`}
                    theme={{
                        background: theme.colors.background,
                        plotBackground: theme.colors.background,
                        text: theme.colors.onBackground,
                        mutedText: theme.colors.onBackground,
                    }}
                    renderBar={({ bar, radius }) => (
                        <Rect
                            x={bar.x} y={bar.y}
                            width={bar.width} height={bar.height}
                            rx={radius}
                            fill={palette[bar.dataIndex].hex}
                            stroke={theme.colors.background}
                        />
                    )}
                />
                <ScrollView>
                    <View style={{backgroundColor: theme.colors.background}}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title style={{flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignContent: "center"}} ><Icon source="pound" size={24} /></DataTable.Title>
                                <DataTable.Title style={{flex: 3, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignContent: "center"}} ><Icon source="ammunition" size={24} /></DataTable.Title>
                                <DataTable.Title style={{flex: 2}} numeric >{totalShots}</DataTable.Title>
                                <DataTable.Title style={{flex: 2}} numeric>{`${((totalShots/totalShots)*100).toFixed(2)}%`}</DataTable.Title>
                            </DataTable.Header>
                            {pieData.map((item, index) => (
                                <DataTable.Row key={`dataTableRow_${index}`} >
                                    <DataTable.Cell style={{flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignContent: "center"}} >
                                        <View style={{position: "relative", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: palette[index].hex, width: "80%", aspectRatio: "1/1", borderRadius: "100%"}}>
                                            <View style={{position: "relative", flexDirection: "row", justifyContent: "center", alignItems: "center", alignContent: "center", backgroundColor: theme.colors.background, width: "70%", aspectRatio: "1/1", borderRadius: "100%"}}>
                                                <Text>{`${index+1}`}</Text>
                                            </View>
                                        </View>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{flex: 3}} >
                                        <Text>{`${getDisplayName(item.channel.split(":")[0])}`}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{flex: 2}} numeric>{item.share}</DataTable.Cell>
                                    <DataTable.Cell style={{flex: 2}} numeric>{`${((item.share/totalShots)*100).toFixed(2)}%`}</DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </DataTable>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}