import { Divider, List, Text } from "react-native-paper";
import { preferenceTitles, statisticItems } from "lib/textTemplates";
import { dateLocales, defaultViewPadding } from "configs";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { View } from "react-native";
import { db } from "db/client";
import { count } from "drizzle-orm";
import * as schema from "db/schema"
import { useEffect, useState } from "react";
import { intlNumberFormatOptions } from "utils";


export default function Statistics(){

    const { language, theme } = usePreferenceStore()

    const [statistics, setStatistics] = useState({
        gunCount: 0,
        gunPrice: 0,
        gunValue: 0,
        ammoCount: 0,
        roundCount: 0,
        uniqueCalibers: 0
    })

    useEffect(()=>{
        async function getStatistics(){
            const collectionSize = await db.select({ count: count() }).from(schema.gunCollection)
            setStatistics(prev => ({...prev, gunCount: collectionSize[0].count}))

            const collectionValues = await db.select({value: schema.gunCollection.paidPrice}).from(schema.gunCollection)
            const collectionValuesTotal = collectionValues.reduce((acc, curr) => {
                return acc + Number(curr.value ? curr.value.replace(",", ".") : 0)
            }, 0);
            setStatistics(prev => ({...prev, gunPrice: collectionValuesTotal}))
            
            const collectionMarketValue = await db.select({value: schema.gunCollection.marketValue}).from(schema.gunCollection)
            const collectionMarketValueTotal = collectionMarketValue.reduce((acc, curr) => acc + Number(curr.value), 0)
            setStatistics(prev => ({...prev, gunValue:collectionMarketValueTotal}))

            const ammoSize = await db.select({ count: count() }).from(schema.ammoCollection)
            setStatistics(prev => ({...prev, ammoCount: ammoSize[0].count}))

            const rounds = await db.select({value: schema.ammoCollection.currentStock}).from(schema.ammoCollection)
            const roundsTotal = rounds.reduce((acc, curr) => acc + Number(curr.value), 0)
            setStatistics(prev => ({...prev, roundCount: roundsTotal}))

            const ammoCalibers = await db.select({value: schema.ammoCollection.caliber}).from(schema.ammoCollection)
            const uniqueCalibers = Array.from(new Set(ammoCalibers.filter(caliber => caliber.value !== "" ).map(caliber => caliber.value)))
            setStatistics(prev => ({...prev, uniqueCalibers: uniqueCalibers.length}))
        }
        getStatistics()
    },[])

    return(
        <List.Accordion left={props => <><List.Icon {...props} icon="chart-box-outline" /><List.Icon {...props} icon="chart-arc" /></>} title={preferenceTitles.statistics[language]} titleStyle={{fontWeight: "700", color: theme.colors.onBackground}}>
            <View style={{ marginLeft: 5, marginRight: 5, padding: defaultViewPadding, backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.primary, borderLeftWidth: 5}}>
                {Object.entries(statistics).map((statistic, index) =>{
                    return(
                        <View key={`statistic_${index}`}>
                            <View style={{paddingTop: defaultViewPadding, paddingBottom: 5, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <Text>{`${statisticItems[statistic[0]][language]}`}</Text><Text>{`${new Intl.NumberFormat(dateLocales[language], intlNumberFormatOptions(statistics[statistic[0]])).format(statistics[statistic[0]])}`}</Text>
                            </View>
                    
                            {Object.entries(statistics).length-1 === index ? 
                                null 
                            : 
                                <Divider style={{marginTop: 5, marginBottom: 5, width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                            }
                        </View>
                    )
                })}
            
                
            
            </View>
        </List.Accordion>
    )
}