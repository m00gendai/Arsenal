import CSVImportModal from "components/CSVImportModal";
import { collectionExportDirectories, defaultViewPadding } from "configs/configs";
import { db } from "db/client";
import * as schema from "db/schema"
import { count } from "drizzle-orm";
import saveDatabase from "functions/import_export/saveDatabase";
import { CollectionType, DBOperations } from "lib/interfaces";
import { mainMenu_DatabaseOperations } from "lib/Text/mainMenu_DatabaseOperations";
import { databaseExportAlert, databaseImportAlert, databaseOperations, importExportSelectionLabel, preferenceTitles, tabBarLabels, toastMessages } from "lib/textTemplates";
import { useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Button, Dialog, Divider, IconButton, List, Modal, Portal, Text } from "react-native-paper";
import { useImportExportStore } from "stores/useImportExportStore";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { useTextStore } from "stores/useTextStore";
import { useViewStore } from "stores/useViewStore";
import { alarm } from "functions/utils";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import Papa from 'papaparse';
import exportArsenalCSV from "functions/import_export/exportArsenalCSV";
import importDatabase from "functions/import_export/importDatabase";
import importArsenalCSV from "functions/import_export/importArsenalCSV";
import { importLegacyGunDatabase } from "functions/import_export/importLegacyGunDatabase";
import { Dropdown } from "react-native-paper-dropdown";
import { determineTabBarLabel } from "functions/determinators";

export default function DatabaseOperations(){

    const { language, theme, generalSettings } = usePreferenceStore()
    const { setCSVHeader, setCSVBody, setImportProgress, resetImportProgress, setImportSize, setDbCollectionType } = useImportExportStore()
    const { dbModalVisible, setDbModalVisible, importCSVVisible, toggleImportCSVVisible, importModalVisible, toggleImportModalVisible, exportModalVisible, toggleExportModalVisible, setAlohaSnackbarVisible } = useViewStore()
    const { setAlohaSnackbarText } = useTextStore()

    const [dbModalText, setDbModalText] = useState<string>("")
    const [dbOperation, setDbOperation] = useState<DBOperations | "">("")
    const [importOptionLegacyDB, setImportOptionLegacyDB] = useState<CollectionType>("gunCollection")
    const [importOption, setImportOption] = useState<CollectionType>("gunCollection")
    const [exportOption, setExportOption] = useState<CollectionType>("gunCollection")

    const importOptionsLegacyDB = [
        { label: tabBarLabels.gunCollection[language], value: 'gunCollection' },
        { label: tabBarLabels.ammoCollection[language], value: 'ammoCollection' },
    ];

    const importExportOptions = collectionExportDirectories.map(collection =>{
        return { label: determineTabBarLabel(collection)[language], value: collection }
    })

    function dbSaveSuccess(){
        setDbModalVisible()
        setAlohaSnackbarText(toastMessages.dbSaveSuccess[language])
        setAlohaSnackbarVisible(true)
    }

    function dbImportSuccess(data: DBOperations){
        setDbModalVisible()
        setAlohaSnackbarText(`${useImportExportStore.getState().importSize} ${toastMessages.dbImportSuccess[language]}`)
        setAlohaSnackbarVisible(true)
    }

    async function importCSV(data: DBOperations){
        let result 
        
        try{
            result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: true})
            if(result.assets === null){
                return
            }

            if(result.assets[0].mimeType !== "text/comma-separated-values" && result.assets[0].mimeType !== "text/csv"){
                throw("Non CSV file format detected")
            }
        }catch(e){
            alarm("Custom CSV Import Error", e)
            return
        }
        try{
            const content:string = await FileSystem.readAsStringAsync(result.assets[0].uri)
            toggleImportCSVVisible()
            const parsed:Papa.ParseResult<string[]> = Papa.parse(content)
            const headerRow:string[] = parsed.data[0]
            const filteredForEmptyRow:string[][] = parsed.data.filter(item => !(item.length === 1 && item[0] === ""))
            const bodyRows:string[][] = filteredForEmptyRow.toSpliced(0, 1)
            setCSVHeader(headerRow)
            setCSVBody(bodyRows)    
            setDbCollectionType(importOption)
        }catch(e){
            alarm("Custom CSV Import File Error", e)
        }
    }
    
    async function handleDbOperation(data: DBOperations | ""){
        setDbModalVisible()
        const gunCollectionSize = await db.select({ count: count() }).from(schema.gunCollection);
        const ammoCollectionSize = await db.select({ count: count() }).from(schema.ammoCollection);
        const collectionSize = gunCollectionSize[0].count + ammoCollectionSize[0].count
        if(data === "save_arsenal_db"){
            
            setImportSize(collectionSize)
            setDbModalText(databaseOperations.export[language])
            try{
                await saveDatabase(setImportSize, setImportProgress, resetImportProgress).then(()=>{
                    dbSaveSuccess()
                })
            }catch(e){
                setDbModalVisible()
                alarm(`DB ops error ${data}`, e)
            }
        }
        if(data === "save_arsenal_csv"){
            toggleExportModalVisible()
            setImportSize(collectionSize)
            setDbModalText(databaseOperations.export[language])
            try{
                await exportArsenalCSV(exportOption).then(()=>{
                    dbSaveSuccess()
                })
            }catch(e){
                setDbModalVisible()
                alarm(`DB ops error ${data}`, e)
            }
        }
        if(data === "import_arsenal_db"){
            toggleImportModalVisible()
            setDbModalText(databaseOperations.import[language])
            try{
                await importDatabase().then(()=>{
                    dbImportSuccess(data)
                })
            }catch(e){
                setDbModalVisible()
                alarm(`DB ops error ${data}`, e)
            }
        }
        if(data === "import_arsenal_csv"){
            toggleImportModalVisible()
            setDbModalText(databaseOperations.import[language])
            try{
                const collectionSize = await importArsenalCSV(importOption)
                setImportSize(collectionSize)
                dbImportSuccess(data)
                }catch(e){
                setDbModalVisible()
                alarm(`DB ops error ${data}`, e)
            }
        }
        if(data === "import_custom_csv"){
            toggleImportModalVisible()
            setDbModalText(databaseOperations.import[language])
            try{
                await importCSV(data)
                dbImportSuccess(data)
            }catch(e){
                setDbModalVisible()
                alarm(`DB ops error ${data}`, e)
            }
        }
        if(data === "import_legacy_db"){
            toggleImportModalVisible()
            setDbModalText(databaseOperations.import[language])
            try{
                const collectionSize = await importLegacyGunDatabase(generalSettings.resizeImages, importOptionLegacyDB)
                setImportSize(collectionSize)
                dbImportSuccess(data) 
            }catch(e){
                setDbModalVisible()
                alarm(`DB ops error ${data}`, e)
            }
        }
    }

    async function handleDbImport(data:DBOperations | ""){
        setDbOperation(data)
        toggleImportModalVisible()
    }

    async function handleDbExport(data:DBOperations | ""){
        setDbOperation(data)
        toggleExportModalVisible()
    }

    return(
        <View>
            <List.Accordion left={props => <List.Icon {...props} icon="database-outline" />} title={preferenceTitles.db_gun[language]} titleStyle={{fontWeight: "700", color: theme.colors.onBackground}}>
                <View style={{ marginLeft: 5, marginRight: 5, padding: defaultViewPadding, backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.primary, borderLeftWidth: 5}}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", gap: 5}}>
                        
                        {/* SAVE ARSENAL DB LOCALLY */}
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                            <Text style={{width: "80%"}}>{mainMenu_DatabaseOperations.saveArsenalDB[language]}</Text>
                            <IconButton icon="floppy" onPress={()=>handleDbOperation("save_arsenal_db")} mode="contained" iconColor={theme.colors.onPrimary} style={{backgroundColor: theme.colors.primary}}/>
                        </View>
                        
                        <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />

                        {/* SAVE ARSENAL CSV LOCALLY */}
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                            <Text style={{width: "80%"}}>{mainMenu_DatabaseOperations.saveArsenalCSV[language]}</Text>
                            <IconButton icon="file-delimited-outline" onPress={()=>handleDbExport("save_arsenal_csv")} mode="contained" iconColor={theme.colors.onPrimary} style={{backgroundColor: theme.colors.primary}}/>
                        </View>

                        <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                        
                        {/* IMPORT ARSENAL DB */}
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                            <Text style={{width: "80%"}}>{mainMenu_DatabaseOperations.importArsenalDB[language]}</Text>
                            <IconButton icon="database-plus-outline" onPress={()=>handleDbImport("import_arsenal_db")} mode="contained" iconColor={theme.colors.onPrimary} style={{backgroundColor: theme.colors.primary}}/>
                        </View>

                        <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />

                        {/* IMPORT CUSTOM CSV */}
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                            <Text style={{width: "80%"}}>{mainMenu_DatabaseOperations.importCustomCSV[language]}</Text>
                            <IconButton icon="table-large-plus" onPress={()=>handleDbImport("import_custom_csv")} mode="contained" iconColor={theme.colors.onPrimary} style={{backgroundColor: theme.colors.primary}}/>
                        </View>

                        <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />

                        {/* IMPORT ARSENAL CSV */}
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                            <Text style={{width: "80%"}}>{mainMenu_DatabaseOperations.importArsenalCSV[language]}</Text>
                            <IconButton icon="table-plus" onPress={()=>handleDbImport("import_arsenal_csv")} mode="contained" iconColor={theme.colors.onPrimary} style={{backgroundColor: theme.colors.primary}}/>
                        </View>   

                        <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />

                        {/* IMPORT LEGACY ARSENAL JSON */}
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                            <Text style={{width: "80%"}}>{mainMenu_DatabaseOperations.importLegacyDB[language]}</Text>
                            <IconButton icon="clock-plus-outline" onPress={()=>handleDbImport("import_legacy_db")} mode="contained" iconColor={theme.colors.onPrimary} style={{backgroundColor: theme.colors.primary}}/>
                        </View>  

                    </View>
                </View>
            </List.Accordion>

            <Dialog visible={importModalVisible} onDismiss={()=>toggleImportModalVisible()}>
                <Dialog.Title>
                {`${databaseImportAlert.title[language]}`}
                </Dialog.Title>
                <Dialog.Content>
                    {dbOperation === "import_legacy_db" || dbOperation === "import_arsenal_csv" || dbOperation === "import_custom_csv" ? <Dropdown
                        label={importExportSelectionLabel[language]}
                        placeholder=""
                        options={dbOperation === "import_legacy_db" ? importOptionsLegacyDB : importExportOptions}
                        value={dbOperation === "import_legacy_db" ? importOptionLegacyDB : importOption  }
                        onSelect={(value) => dbOperation === "import_legacy_db" ? setImportOptionLegacyDB(value as CollectionType) : setImportOption(value as CollectionType)}
                    /> : null}
                    <Text>{`\n${databaseImportAlert.subtitle[language]}`}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={()=>handleDbOperation(dbOperation)} icon="application-import" buttonColor={theme.colors.errorContainer} textColor={theme.colors.onErrorContainer}>{databaseImportAlert.yes[language]}</Button>
                    <Button onPress={()=>toggleImportModalVisible()} icon="cancel" buttonColor={theme.colors.secondary} textColor={theme.colors.onSecondary}>{databaseImportAlert.no[language]}</Button>
                </Dialog.Actions>
            </Dialog>

            <Dialog visible={exportModalVisible} onDismiss={()=>toggleExportModalVisible()}>
                <Dialog.Title>
                {`${databaseExportAlert.title[language]}`}
                </Dialog.Title>
                <Dialog.Content>
                    {dbOperation === "save_arsenal_csv" ? <Dropdown
                        label={importExportSelectionLabel[language]}
                        placeholder=""
                        options={importExportOptions}
                        value={exportOption}
                        onSelect={(value) => setExportOption(value as CollectionType)}
                    /> : null}
                    <Text>{`\n${databaseExportAlert.subtitle[language]}`}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={()=>handleDbOperation(dbOperation)} icon="application-import" buttonColor={theme.colors.errorContainer} textColor={theme.colors.onErrorContainer}>{databaseImportAlert.yes[language]}</Button>
                    <Button onPress={()=>toggleExportModalVisible()} icon="cancel" buttonColor={theme.colors.secondary} textColor={theme.colors.onSecondary}>{databaseImportAlert.no[language]}</Button>
                </Dialog.Actions>
            </Dialog>

            <Portal>
               {importCSVVisible ? <CSVImportModal /> : null} 
            </Portal>

            <Modal visible={dbModalVisible}>
                <ActivityIndicator size="large" animating={true} />
                <Text variant="bodyLarge" style={{width: "100%", textAlign: "center", color: theme.colors.onBackground, marginTop: 10, backgroundColor: theme.colors.background}}>
                    {`${dbModalText}: ${useImportExportStore.getState().importProgress}/${useImportExportStore.getState().importSize}`}
                </Text>
            </Modal>

        </View>
    )
}