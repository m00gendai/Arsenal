import { Checkbox, Divider, IconButton, Text } from "react-native-paper"
import { useViewStore } from "stores/useViewStore"
import { usePreferenceStore } from "stores/usePreferenceStore"
import { View, ScrollView, Platform } from "react-native"
import { datePickerTriggerFields, defaultViewPadding } from "configs/configs"
import { mainMenu_DatabaseOperations } from "lib/Text/mainMenu_DatabaseOperations"
import { Picker } from "@react-native-picker/picker"
import { useImportExportStore } from "stores/useImportExportStore"
import { CollectionType, ItemType } from "lib/interfaces"
import { v4 as uuidv4 } from 'uuid';
import ModalContainer from "./ModalContainer"
import { useState } from "react"
import { db } from "db/client"
import * as schema from "db/schema"
import { determineDataTemplate, determineEmptyObjectReturns } from "functions/determinators"
import { Dropdown } from 'react-native-paper-dropdown';
import { ImportCancelledError } from "lib/customErrors"
import { toastMessages } from "lib/Text/text_toastMessages"
import { useTextStore } from "stores/useTextStore"

interface Props{
    startElapsedTime: () => void
    stopElapsedTime: () => void
    setImportSize: React.Dispatch<React.SetStateAction<number>>
    setImportProgress: React.Dispatch<React.SetStateAction<number>>
    importOption: CollectionType
    setDbModalVisible: () => void
}

export default function CSVImportModal({startElapsedTime, stopElapsedTime, setImportSize, setImportProgress, importOption, setDbModalVisible}: Props){

    const { importCSVVisible, toggleImportCSVVisible, setAlohaSnackbarVisible } = useViewStore()
    const { language, theme } = usePreferenceStore()
    const { CSVHeader, CSVBody, mapCSVItem, setMapCSVItem } = useImportExportStore()
    const { setAlohaSnackbarText } = useTextStore()

    const [hasHeaders, setHasHeaders] = useState<boolean>(true)
    const [dateFormat, setDateFormat] = useState<string>("DD-MM-YYYY-period")
    
    const dateFormatOptions = [
        { label: '31.12.2000', value: 'DD-MM-YYYY-period' },
        { label: '31-12-2000', value: 'DD-MM-YYYY-dash' },
        { label: '31/12/2000', value: 'DD-MM-YYYY-slash' },
        { label: '12-31-2000', value: 'MM-DD-YYYY-dash' },
        { label: '12/31/2000', value: 'MM-DD-YYYY-slash' },
        { label: '2000-12-31', value: 'YYYY-MM-DD-dash' },
        { label: "Unix Epoch", value: "unix"}
    ];

    let lastYield = Date.now()

    function nextFrame() {
        return new Promise(resolve => setTimeout(resolve, 0))
    }

    function handleCancel(){
        toggleImportCSVVisible()
        stopElapsedTime()
        setDbModalVisible()
        setAlohaSnackbarText(`${toastMessages.dbImportCancel[language]}`)
        setAlohaSnackbarVisible(true)
    }

    function parseDate(csvDate:string){
        if(dateFormat === "unix"){
            console.info("unix date detected")
            return Number(csvDate)
        }
        if(!isNaN(new Date(csvDate).getTime())){
            console.info("parseable ecma extended date detected")
            return new Date(csvDate).getTime()
        }
        const dateTemplate = dateFormat.split("-")
        const delimiterString = dateTemplate[3]
        const delimiter = delimiterString === "period" ? "." : delimiterString === "dash" ? "-" : "/"
        const day = dateTemplate.indexOf("DD")
        const month = dateTemplate.indexOf("MM")
        const year = dateTemplate.indexOf("YYYY")

        const splitDate = csvDate.split(delimiter)
        if(splitDate.length === 1 && splitDate[0].includes(",")){
            return null
        }
        const csvDay = Number(splitDate[day])
        const csvMonth = Number(splitDate[month])
        const csvYear = Number(splitDate[year])

        const unixDate = new Date(csvYear, csvMonth-1, csvDay)
        const unixTime = unixDate.getTime()
        return unixTime
    }

    async function setImportedCSV(){
        try{
        setDbModalVisible()
        startElapsedTime()
        toggleImportCSVVisible()
        setImportSize(CSVBody.length)
        const indexMapCSV: {[key: string]: number} = {}
        for(const [key, header] of Object.entries(mapCSVItem)){
            indexMapCSV[key] = CSVHeader.indexOf(header)
        }
        const usedIndexes:number[] = []
        for(const entries of Object.values(indexMapCSV)){
            if(!usedIndexes.includes(entries) && entries !== -1){
                usedIndexes.push(entries)
            }
        }

        const itemsToBeMapped:string[][] = hasHeaders ? [...CSVBody] : [[...CSVHeader], ...CSVBody]

        const objects: ItemType[] = []

        for (const items of itemsToBeMapped) {
            const mapped:ItemType = determineEmptyObjectReturns(importOption)
            const uniqueId = uuidv4()
            for(const entry of Object.entries(indexMapCSV)){

                if(entry[0] === "id"){
                    mapped[entry[0]] = uniqueId 
                } else if(entry[0] === "tags"){
                    mapped[entry[0]] = []
                } else if(entry[0] === "createdAt"){
                    mapped[entry[0]] = entry[1] === -1 ? new Date().getTime() : parseDate(items[entry[1]])
                } else if(entry[0] === "caliber"){
                    mapped[entry[0]] = entry[1] === -1 ? "" : items[entry[1]] !== undefined ? items[entry[1]].split(",") : items[entry[1]]
                } else if(datePickerTriggerFields.includes(entry[0])){
                    mapped[entry[0]] = entry[1] === -1 ? null : parseDate(items[entry[1]])
                } else {
                    mapped[entry[0]] = entry[1] === -1 ? "" : items[entry[1]]
                }
                
            }
            const rmk:string[] = []
            items.map((item, index) =>{
                if(!usedIndexes.includes(index) && item !== ""){
                    rmk.push(`${CSVHeader[index]}: ${item}`)
                }
            })
            mapped.remarks = rmk.join("\n")
            setImportProgress(importProgress => importProgress + 1)
            if (Date.now() - lastYield > 100) {   // yield at most ~10x/sec
                await nextFrame()
                lastYield = Date.now()
            }
            objects.push(mapped)
        }

        setImportProgress(0)
        setImportSize(objects.length)
        lastYield = Date.now()

        await db.delete(schema[importOption]);
        for(const item of objects){
            await db.insert(schema[importOption]).values(item)

            setImportProgress(importProgress => importProgress + 1)
            if (Date.now() - lastYield > 100) {
                await nextFrame()
                lastYield = Date.now()
            }
        }
        setMapCSVItem(null)
        setDbModalVisible()
        setAlohaSnackbarText(`${toastMessages.dbImportSuccess[language]}`)
        setAlohaSnackbarVisible(true)
    }catch(e){
        console.error(e)
    }
    }

    return(
        <ModalContainer 
            visible={importCSVVisible} 
            setVisible={toggleImportCSVVisible}
            title={mainMenu_DatabaseOperations.importCSVModalTitle[language]}
            subtitle={mainMenu_DatabaseOperations.importCSVModalText[language]}
            content={
                <View>
                    <View style={{marginBottom: defaultViewPadding}}>
                        <Checkbox.Item 
                            mode="android" 
                            label={mainMenu_DatabaseOperations.importCSVModalCheckbox[language]} 
                            status={hasHeaders ? "checked" : "unchecked"} 
                            onPress={()=>setHasHeaders(!hasHeaders)} 
                        />
                        <Dropdown
                            label="Datumsformat"
                            placeholder="31.12.2000"
                            options={dateFormatOptions}
                            value={dateFormat}
                            onSelect={setDateFormat}

                        />
                    </View>
                    <ScrollView style={{padding: defaultViewPadding}}>
                    
                        {determineDataTemplate(importOption).map((item, index)=>{
                            return(
                                <View key={`mapperRow_${index}`} style={{width: "100%", display: "flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between"}}>
                                    <Text style={{width: "50%"}}>{item[language]}</Text>
                                    <Picker 
                                        itemStyle={Platform.OS === "ios" ? {fontSize: 15, height: 100}:{}} 
                                        style={{width: "50%", color: theme.colors.onBackground}} 
                                        dropdownIconColor={theme.colors.onBackground} 
                                        selectedValue={mapCSVItem[item.name]} 
                                        onValueChange={(itemValue, itemIndex) => setMapCSVItem({...mapCSVItem, [item.name]: itemValue})}
                                    >
                                        <Picker.Item label={"-"} value={""} style={{backgroundColor: theme.colors.background}} color={theme.colors.onBackground}/>
                                        {CSVHeader.map((item, index) => {
                                            return(
                                                <Picker.Item key={`picker_${index}`} label={item} value={item} style={{backgroundColor: theme.colors.background}} color={theme.colors.onBackground}/>
                                            )
                                        })}
                                    </Picker>
                                <Divider style={{width: "100%"}}/>
                                </View>
                            )
                        })}
                
                    </ScrollView>
                </View>
            }

            buttonACK={<IconButton icon="check" mode="contained" style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary} onPress={()=>setImportedCSV()} />}
            buttonCNL={<IconButton icon="cancel" mode="contained" style={{width: 50, backgroundColor: theme.colors.secondaryContainer}} iconColor={theme.colors.onSecondaryContainer} onPress={()=>handleCancel()} />}
            buttonDEL={null}
        />              
    )
}