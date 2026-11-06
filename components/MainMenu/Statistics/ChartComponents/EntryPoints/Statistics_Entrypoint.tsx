// Chart Kit example, not super customizable but the best there is...

import { Dimensions, LayoutChangeEvent, View } from "react-native"
import { Appbar, DataTable, Divider, Icon, IconButton, Text } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore"
import * as schema from "db/schema"
import { db } from "db/client"
import { eq, asc, count, ne } from 'drizzle-orm';
import { defaultViewPadding, screenNameParamsAll } from "configs/configs"
import { ScrollView } from "react-native-gesture-handler"
import { preferenceTitles } from "lib/Text/text_settings"
import { useEffect, useMemo, useState } from "react"
import { CollectionType, Screens, StackParamList } from "lib/interfaces"

import { ColorModel, ColorPaletteGenerator } from '@martinlaxenaire/color-palette-generator'
import { rgbaToHex } from "functions/utils"
import { PieChart } from "react-native-chart-kit/v2";
import { mainCollectionCategories, MainCollectionCategories } from "lib/textTemplates"
import { NavigationProp, useNavigation } from "@react-navigation/native"

export default function Statistics_Entrypoint(){

    const { language, switchLanguage, theme, switchTheme, generalSettings, setGeneralSettings, caliberDisplayNameList } = usePreferenceStore()
    const navigation = useNavigation<NavigationProp<StackParamList>>()
    
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

    const pieData = collectionMainSizes.map((collection, index) => {
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
                <PieChart
                    data={pieData}
                    valueKey="share"
                    labelKey="channel"
                    width={width}
                    height={height/2}
                    sliceSeparator={{ width: 2}}
                    innerRadius={50}
                    colors={palette.map(a => a.hex)}
                    theme={{
                        background: theme.colors.background,
                        plotBackground: theme.colors.background,
                        text: theme.colors.primary,
                        
                    }}
                    arcLabels={{
                        minPercentage: 0.01,
                        reservedWidth: width/5,
                        connectorColor: theme.colors.onBackground,
                        connectorLines: true,
                        offset: 25,
                        formatLabel: ({ label }) => `${mainCollectionCategories[label.split(":")[0]][language]}`
                    }}
                    legend={false}
                    centerLabel={() => (
                        <View style={{ alignItems: "center" }}>
                            <Icon source={"counter"} size={50} color={theme.colors.primary}/>
                        </View>
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
                                        <Text>{`${mainCollectionCategories[item.channel.split(":")[0]][language]}`}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{flex: 2}} numeric>{item.share}</DataTable.Cell>
                                    <DataTable.Cell style={{flex: 2}} numeric>{`${((item.share/totalCollectionSize)*100).toFixed(2)}%`}</DataTable.Cell>
                                    <DataTable.Cell>
                                        <IconButton onPress={()=>goToGranular("ViewGranularStatistics", {label: item.channel.split(":")[0]})} icon={"arrow-right"} iconColor={colorTheme.colors.onPrimary} style={{backgroundColor: colorTheme.colors.primary}} size={14} />
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