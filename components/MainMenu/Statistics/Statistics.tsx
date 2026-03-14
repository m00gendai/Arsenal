import { Dialog, Divider, List, Text, Button, IconButton, TouchableRipple, Icon, Portal } from "react-native-paper";
import { preferenceTitles, statisticItems, statisticsAlert } from "lib/textTemplates";
import { dateLocales, defaultViewPadding } from "configs/configs";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { View } from "react-native";
import { db } from "db/client";
import { count } from "drizzle-orm";
import * as schema from "db/schema"
import { useEffect, useState } from "react";
import { intlNumberFormatOptions } from "functions/utils";

interface BadDataValues{
    value: string
    manufacturer: string
    model: string
}

interface BadData{
    gunCount: BadDataValues[]
    gunPrice: BadDataValues[]
    gunValue: BadDataValues[]
    ammoCount: BadDataValues[]
    roundCount: BadDataValues[]
    uniqueCalibers: BadDataValues[]
}

type BadDataTitle = "gunCount" | "gunPrice" | "gunValue" | "ammoCount" | "roundCount" | "uniqueCalibers"


export default function Statistics(){

    const { language, theme } = usePreferenceStore()

    const [badDataVisible, setBadDataVisible] = useState<boolean>(false)
    const [badDataTitle, selectBadDataTitle] = useState<BadDataTitle>("gunCount")

    const [badData, setBadData] = useState<BadData>({
        gunCount: [],
        gunPrice: [],
        gunValue: [],
        ammoCount: [],
        roundCount: [],
        uniqueCalibers: [],
    })

    const [statistics, setStatistics] = useState({
        gunCount: 0,
        gunPrice: 0,
        gunValue: 0,
        ammoCount: 0,
        roundCount: 0,
        uniqueCalibers: 0
    })

    async function getCollectionSize(){
        const collectionSize = await db.select({ count: count() }).from(schema.gunCollection)
        setStatistics(prev => ({...prev, gunCount: collectionSize[0].count}))
    }

    async function getCollectionValue(){
        const collectionValues = await db.select({
            value: schema.gunCollection.paidPrice, 
            manufacturer: schema.gunCollection.manufacturer,
            model: schema.gunCollection.model
        }).from(schema.gunCollection)
        
        const collectionValuesTotal = collectionValues.reduce((acc, curr) => {
            let val
            
            if(isNaN(Number(curr.value))){
                const badData:BadDataValues = {
                    value: curr.value,
                    manufacturer: curr.manufacturer,
                    model: curr.model
                }
                setBadData(prev => ({...prev, gunPrice: [...prev.gunPrice, badData]}))
                val = 0
            }  else {
                val = curr.value
            }
            
            return acc + Number(val ? val.replace(",", ".") : 0)
        }, 0)
        
        setStatistics(prev => ({...prev, gunPrice: collectionValuesTotal}))
    }

    async function getCollectionMarketValue(){
        const collectionMarketValue = await db.select({
            value: schema.gunCollection.marketValue, 
            manufacturer: schema.gunCollection.manufacturer,
            model: schema.gunCollection.model
        }).from(schema.gunCollection)
        
        const collectionMarketValueTotal = collectionMarketValue.reduce((acc, curr) => {
            let val
            
            if(isNaN(Number(curr.value))){
                const badData:BadDataValues = {
                    value: curr.value,
                    manufacturer: curr.manufacturer,
                    model: curr.model
                }
                setBadData(prev => ({...prev, gunValue: [...prev.gunValue, badData]}))
                val = 0
            }  else {
                val = curr.value
            }
            return acc + Number(val ? val.replace(",", ".") : 0)
        }, 0)
        
        setStatistics(prev => ({...prev, gunValue:collectionMarketValueTotal}))
    }

    async function getAmmoSize(){
        const ammoSize = await db.select({ count: count() }).from(schema.ammoCollection)
        setStatistics(prev => ({...prev, ammoCount: ammoSize[0].count}))
    }

    async function getRoundCount(){
        const rounds = await db.select({
            value: schema.ammoCollection.currentStock, 
            manufacturer: schema.ammoCollection.manufacturer,
            model: schema.ammoCollection.designation
        }).from(schema.ammoCollection)
                
        const roundsTotal = rounds.reduce((acc, curr) => {
            let val
            
            if(isNaN(Number(curr.value))){
                const badData:BadDataValues = {
                    value: curr.value,
                    manufacturer: curr.manufacturer,
                    model: curr.model
                }
                setBadData(prev => ({...prev, roundCount: [...prev.roundCount, badData]}))
                val = 0
            }  else {
                val = curr.value
            }
            return acc + Number(val ? val.replace(",", ".") : 0)
        }, 0)
        
        setStatistics(prev => ({...prev, roundCount: roundsTotal}))
    }

    async function getUniqueCalibers(){
        const ammoCalibers = await db.select({value: schema.ammoCollection.caliber}).from(schema.ammoCollection) as {value: string}[]

        const normalizedArray:string[] = ammoCalibers.map(caliber => caliber.value)

        const filteredArray:string[] = normalizedArray.filter(caliber => caliber && caliber.length !== 0)
        const uniqueCalibers = Array.from(new Set(filteredArray.flat()))
        
        setStatistics(prev => ({...prev, uniqueCalibers: uniqueCalibers.length}))
    }

    useEffect(()=>{
        async function getStatistics(){
            await getCollectionSize()
            await getCollectionValue()
            await getCollectionMarketValue()
            await getAmmoSize()
            await getRoundCount()
            await getUniqueCalibers()
        }
        getStatistics()
    },[])

    function handleAlertPress(title: BadDataTitle){
        selectBadDataTitle(title)
        setBadDataVisible(true)
    }

    return(
        <List.Accordion left={props => <List.Icon {...props} icon="chart-box-outline" />} title={preferenceTitles.statistics[language]} titleStyle={{fontWeight: "700", color: theme.colors.onBackground}}>
            <View style={{ marginLeft: 5, marginRight: 5, padding: defaultViewPadding, backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.primary, borderLeftWidth: 5}}>
                {Object.entries(statistics).map((statistic, index) =>{
                    return(
                        <View key={`statistic_${index}`}>
                            <View style={{paddingTop: defaultViewPadding, paddingBottom: 5, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <Text>{`${statisticItems[statistic[0]][language]}`}</Text>
                                <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                                    <Text>{`${new Intl.NumberFormat(dateLocales[language], intlNumberFormatOptions(statistics[statistic[0]])).format(statistics[statistic[0]])}`}</Text>
                                    {badData[statistic[0]].length !== 0 ? 
                                        <TouchableRipple
                                            onPress={() => handleAlertPress(statistic[0] as BadDataTitle)}
                                            style={{
                                                backgroundColor: theme.colors.error,
                                                width: 14,
                                                height: 14,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: 20,
                                                marginLeft: 12
                                            }}
                                            >
                                                <Icon
                                                    source="alert-circle-outline"
                                                    size={14}
                                                    color={theme.colors.onError}
                                                />
                                            </TouchableRipple> 
                                            : 
                                            null
                                    }
                                </View>
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
            
            <Portal>
                <Dialog visible={badDataVisible}>
                    <Dialog.Content>
                        <Text>{statisticsAlert[badDataTitle][language]}</Text>
                        {Object.entries(badData).map((badData) => {
                            if(badData[0] === badDataTitle && badData[1].length !== 0){
                                return badData[1].map((entry, index) =>{
                                    return <Text style={{marginTop: defaultViewPadding}} key={`badData_${index}`} variant="bodyMedium">
                                        {`${entry.manufacturer} ${entry.model}: ${entry.value}`}
                                    </Text>
                                })
                            }
                        })}
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>setBadDataVisible(false)}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        
        </List.Accordion>
    )
}