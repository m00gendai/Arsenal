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
import { CollectionType, StackParamList } from "lib/interfaces"
import { Rect } from 'react-native-svg'
import { ColorModel, ColorPaletteGenerator } from '@martinlaxenaire/color-palette-generator'
import { rgbaToHex } from "functions/utils"
import { BarChart } from "react-native-chart-kit/v2";
import { determineTabBarLabel } from "functions/determinators"
import { NavigationProp, useNavigation } from "@react-navigation/native"

interface Props{
    collection: CollectionType
}

export default function Statistics_Sub_Entrypoint({collection}:Props){

    const { language, switchLanguage, theme, switchTheme, generalSettings, setGeneralSettings, caliberDisplayNameList } = usePreferenceStore()
    const navigation = useNavigation<NavigationProp<StackParamList>>()

    const colorTheme = theme
    const [collectionSizes, setCollectionSizes] = useState<[CollectionType, number][]>([])
    const [totalCollectionSize, setTotalCollectionSize] = useState<number>(0)
    const [maxSize, setMaxSize] = useState<number>(0)

    function goToSubGranular(
        target: string,
        params: { label: CollectionType }
    ){
        console.log(`target: ${target}`)
        console.log(`params: ${params.label}`)
        navigation.navigate(target, params)
    }

    useEffect(()=>{
        setCollectionSizes([])
        setTotalCollectionSize(0)
        setMaxSize(0)
        async function getCollectionSize(){
            let localMaxSize = 0
            for(const screen of screenNameParamsAll){
                if(screen.startsWith(collection)){
                    const collectionSize = await db.select({ count: count() }).from(schema[screen]).where(ne(schema[screen].sold_isSold, true))
                    setCollectionSizes(prev => [...prev, [screen, collectionSize[0].count]])
                    setTotalCollectionSize(prev => prev + collectionSize[0].count)
                    if(collectionSize[0].count > localMaxSize){
                        localMaxSize = collectionSize[0].count
                    }
                }
            }
            setMaxSize(localMaxSize)
        }
        getCollectionSize()
    },[])

    const palette = useMemo(() => {
        const primaryColor = new ColorModel(rgbaToHex(theme.colors.primary))
        const paletteFromColor = new ColorPaletteGenerator({
            precision: Math.ceil(collectionSizes.length/2),
            baseColor: primaryColor,
        })
        return paletteFromColor.getRandomPalette({ length: collectionSizes.length, filterPasses: false, })
    }, [theme.colors.primary, collectionSizes])

    const pieData = collectionSizes.map((collection, index) => {
        return {channel: `${collection[0]}: ${collection[1]}`, share: collection[1]}
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
                    orientation="horizontal"
                    showValuesOnTopOfBars={false}
                    width={width}
                    height={height/2}
                    yDomain={{ min: 0, max: maxSize, nice: false }}
                    formatXLabel={(value) => `${determineTabBarLabel(value.split(":")[0])[language]}`}
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
                            stroke={theme.colors.surfaceVariant}
                            strokeWidth={2}
                        />
                    )}
                />
                <ScrollView>
                    <View style={{backgroundColor: theme.colors.background}}>
                        <DataTable>
                            {pieData.map((item, index) => (
                                <DataTable.Row key={`dataTableRow_${index}`} >
                                    <DataTable.Cell style={{flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignContent: "center"}} >
                                        <View style={{position: "relative", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: palette[index].hex, width: "50%", aspectRatio: "1/1", borderRadius: "100%"}}>
                                        </View>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{flex: 3, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignContent: "center"}} >
                                        <Text>{`${determineTabBarLabel(collectionSizes[index][0])[language]}`}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{flex: 2}} numeric>{item.share}</DataTable.Cell>
                                    <DataTable.Cell style={{flex: 2}} numeric>{`${((item.share/totalCollectionSize)*100).toFixed(2)}%`}</DataTable.Cell>
                                    <DataTable.Cell>
                                        <IconButton onPress={()=>goToSubGranular("ViewSubGranularStatistics", {label: item.channel.split(":")[0]})} icon={"arrow-right"} iconColor={colorTheme.colors.onPrimary} style={{backgroundColor: colorTheme.colors.primary}} size={14} />
                                    </DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </DataTable>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}