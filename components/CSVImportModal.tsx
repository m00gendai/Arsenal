import { Checkbox, Divider, IconButton, Text } from "react-native-paper"
import { useViewStore } from "../stores/useViewStore"
import { usePreferenceStore } from "../stores/usePreferenceStore"
import { View, ScrollView, Platform } from "react-native"
import { defaultViewPadding } from "../configs"
import { mainMenu_DatabaseOperations } from "../lib/Text/mainMenu_DatabaseOperations"
import { ammoDataTemplate, emptyAmmoObject } from "../lib/ammoDataTemplate"
import { Picker } from "@react-native-picker/picker"
import { useImportExportStore } from "../stores/useImportExportStore"
import { AmmoType, GunType, GunTypeStatus } from "../interfaces"
import { v4 as uuidv4 } from 'uuid';
import { useGunStore } from "../stores/useGunStore"
import { useAmmoStore } from "../stores/useAmmoStore"
import { emptyGunObject, gunDataTemplate } from "../lib/gunDataTemplate"
import ModalContainer from "./ModalContainer"
import { useState } from "react"
import { db } from "../db/client"
import * as schema from "../db/schema"


export default function CSVImportModal(){

    const { importCSVVisible, toggleImportCSVVisible } = useViewStore()
    const { language, theme } = usePreferenceStore()
    const { CSVHeader, CSVBody, importProgress, setImportProgress, setImportSize, mapCSVAmmo, setMapCSVAmmo, mapCSVGun, setMapCSVGun, dbCollectionType, setDbCollectionType } = useImportExportStore()
    const { setGunCollection } = useGunStore()
    const { setAmmoCollection } = useAmmoStore()

    const [hasHeaders, setHasHeaders] = useState<boolean>(true)

    async function setImportedCSV(){

        toggleImportCSVVisible()
        setImportSize(CSVBody.length)
        const indexMapCSV:{[key: string]: number}= {}
        for(const entry of Object.entries(dbCollectionType === "gun" ? mapCSVGun : mapCSVAmmo)){
            indexMapCSV[entry[0]] = CSVHeader.indexOf(entry[1])
        }
        const usedIndexes:number[] = []
        for(const entries of Object.values(indexMapCSV)){
            if(!usedIndexes.includes(entries) && entries !== -1){
                usedIndexes.push(entries)
            }
        }

        const itemsToBeMapped:string[][] = hasHeaders ? [...CSVBody] : [[...CSVHeader], ...CSVBody]

        const objects: (AmmoType | GunType)[] = itemsToBeMapped.map((items, index)=>{
            const mapped:AmmoType | GunType = dbCollectionType === "gun" ? {...emptyGunObject} : {...emptyAmmoObject}

            for(const entry of Object.entries(indexMapCSV)){
                console.log(entry)
                if(entry[0] === "id"){
                    mapped[entry[0]] = uuidv4()  
                } else if(entry[0] === "tags"){
                    mapped[entry[0]] = []
                } else if(entry[0] === "createdAt"){
                    /* @ts-expect-error */
                    mapped[entry[0]] = entry[1] === -1 ? new Date().toISOString() : items[entry[1]]
                } else if(entry[0] === "caliber"){
                    mapped[entry[0]] = entry[1] === -1 ? "" : items[entry[1]] !== undefined ? items[entry[1]].split(", ") : items[entry[1]]
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
            setImportProgress(importProgress+1)
            return mapped
        })

        if(dbCollectionType ==="gun"){
            await db.delete(schema.gunCollection);
            for(const item of objects){
                await db.insert(schema.gunCollection).values(item as GunType&GunTypeStatus)
            }
        }

        if(dbCollectionType ==="ammo"){
            await db.delete(schema.ammoCollection);
            for(const item of objects){
                await db.insert(schema.ammoCollection).values(item as AmmoType)
            }
        }
  
        setDbCollectionType("")
        setMapCSVAmmo(null)
        setMapCSVGun(null)
    }

    return(
        <ModalContainer visible={importCSVVisible} setVisible={toggleImportCSVVisible}
        title={mainMenu_DatabaseOperations.importCSVModalTitle[language]}
        subtitle={mainMenu_DatabaseOperations.importCSVModalText[language]}
        content={<View><View><Checkbox.Item mode="android" label={mainMenu_DatabaseOperations.importCSVModalCheckbox[language]} status={hasHeaders ? "checked" : "unchecked"} onPress={()=>setHasHeaders(!hasHeaders)} /></View><ScrollView style={{padding: defaultViewPadding}}>
                
            {dbCollectionType === "gun" ? gunDataTemplate.map((gunItem, gunIndex)=>{
                return(
                    <View key={`mapperRow_${gunIndex}`} style={{width: "100%", display: "flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between"}}>
                        <Text style={{width: "50%"}}>{gunItem.de}</Text>
                        <Picker itemStyle={Platform.OS === "ios" ? {fontSize: 15}:{}} style={{width: "50%", color: theme.colors.onBackground}} dropdownIconColor={theme.colors.onBackground} selectedValue={mapCSVGun[gunItem.name]} onValueChange={(itemValue, itemIndex) => setMapCSVGun({...mapCSVGun, [gunItem.name]:itemValue})}>
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
                }) 
            :
            dbCollectionType === "ammo" ? ammoDataTemplate.map((ammoItem, ammoIndex)=>{

                return(
                    <View key={`mapperRow_${ammoIndex}`} style={{width: "100%", display: "flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between"}}>
                        <Text style={{width: "50%"}}>{ammoItem.de}</Text>
                        <Picker itemStyle={Platform.OS === "ios" ? {fontSize: 15}:{}} style={{width: "50%", color: theme.colors.onBackground}} dropdownIconColor={theme.colors.onBackground} selectedValue={mapCSVAmmo[ammoItem.name]} onValueChange={(itemValue, itemIndex) => setMapCSVAmmo({...mapCSVAmmo, [ammoItem.name]:itemValue})}>
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
                })
            :
            null
            }
            
                </ScrollView></View>}
        buttonACK={<IconButton icon="check" mode="contained" style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary} onPress={()=>setImportedCSV()} />}
        buttonCNL={<IconButton icon="cancel" mode="contained" style={{width: 50, backgroundColor: theme.colors.secondaryContainer}} iconColor={theme.colors.onSecondaryContainer} onPress={()=>toggleImportCSVVisible()} />}
        buttonDEL={null}
        
        />
                  
    )
}