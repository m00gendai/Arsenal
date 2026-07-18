import CSVImportModal from "components/CSVImportModal";
import { collectionExportDirectories, defaultViewPadding } from "configs/configs";
import saveDatabase from "functions/import_export/saveDatabase";
import { CollectionType, DBOperations } from "lib/interfaces";
import { mainMenu_DatabaseOperations } from "lib/Text/mainMenu_DatabaseOperations";
import { databaseOperations, importExportSelectionLabel } from "lib/textTemplates";
import { useEffect, useRef, useState } from "react";
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
import { tabBarLabels } from "lib/Text/text_tabBarLabels";
import { toastMessages } from "lib/Text/text_toastMessages";
import { preferenceTitles } from "lib/Text/text_settings";
import { databaseCSVExportAlert, databaseExportAlert, databaseImportAlert } from "lib/Text/text_alerts";
import { ExportCancelledError, ImportCancelledError, ImportDatabaseGenericFileError, ImportDatabaseMimeTypeError, ImportDatabaseNoValidFileSelectedError, ImportDatabaseVersionMismatchError } from "lib/customErrors";

export default function DatabaseOperations(){

    const { language, theme, generalSettings } = usePreferenceStore()
    const { setCSVHeader, setCSVBody } = useImportExportStore()
    const { dbModalVisible, setDbModalVisible, importCSVVisible, toggleImportCSVVisible, importModalVisible, toggleImportModalVisible, exportModalVisible, toggleExportModalVisible, setAlohaSnackbarVisible } = useViewStore()
    const { setAlohaSnackbarText } = useTextStore()

    const [dbModalText, setDbModalText] = useState<string>("")
    const [dbOperation, setDbOperation] = useState<DBOperations | "">("")
    const [elapsedTime, setElapsedTime] = useState<number>(0)

    const [importOptionLegacyDB, setImportOptionLegacyDB] = useState<CollectionType>("gunCollection")
    const [importOption, setImportOption] = useState<CollectionType>("gunCollection")
    const [importSize, setImportSize] = useState<number>(0)
    const [importCollection, setImportCollection] = useState<CollectionType | string>(null)
    const [importProgress, setImportProgress] = useState<number>(0)
    
    const [exportOption, setExportOption] = useState<CollectionType>("gunCollection")
    const [exportSize, setExportSize] = useState<number>(0)
    const [exportCollection, setExportCollection] = useState<CollectionType | string>(null)
    const [exportProgress, setExportProgress] = useState<number>(0)
    
    const elapsedTimeIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const startTimeRef = useRef<number | null>(null)


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

    function dbSaveCancel(){
        setDbModalVisible()
        setAlohaSnackbarText(`${toastMessages.dbSaveCancel[language]}`)
        setAlohaSnackbarVisible(true)
    }

    function dbSaveFail(){
        setDbModalVisible()
        setAlohaSnackbarText(`${toastMessages.dbSaveFail[language]}`)
        setAlohaSnackbarVisible(true)
    }

    function dbImportSuccess(){
        setDbModalVisible()
        setAlohaSnackbarText(`${toastMessages.dbImportSuccess[language]}`)
        setAlohaSnackbarVisible(true)
    }

    function dbImportCancel(){
        setDbModalVisible()
        setAlohaSnackbarText(`${toastMessages.dbImportCancel[language]}`)
        setAlohaSnackbarVisible(true)
    }

    function dbImportFail(){
        setDbModalVisible()
        setAlohaSnackbarText(`${toastMessages.dbImportFail[language]}`)
        setAlohaSnackbarVisible(true)
    }

    async function importCSV(){
        const result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: true})
        
        if(result.assets === null){
            throw new ImportCancelledError()
        }
        if(result.assets[0].mimeType !== "text/comma-separated-values" && result.assets[0].mimeType !== "text/csv"){
            throw new ImportDatabaseMimeTypeError("Non CSV file format detected")
        }

        try{
            const content:string = await FileSystem.readAsStringAsync(result.assets[0].uri)
            toggleImportCSVVisible()
            const parsed:Papa.ParseResult<string[]> = Papa.parse(content)
            setImportSize(parsed.data.length)
            const headerRow:string[] = parsed.data[0]
            const filteredForEmptyRow:string[][] = parsed.data.filter(item => !(item.length === 1 && item[0] === ""))
            const bodyRows:string[][] = filteredForEmptyRow.toSpliced(0, 1)
            setCSVHeader(headerRow)
            setCSVBody(bodyRows)    
            setImportCollection(importOption)
        }catch(e){
            throw new ImportDatabaseGenericFileError(e)
        }
    }

    function startElapsedTime(){
        startTimeRef.current = Date.now()
        setElapsedTime(0)
        elapsedTimeIntervalRef.current = setInterval(function(){
            setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000))
        },1000)
    }

    function stopElapsedTime(){
        if (elapsedTimeIntervalRef.current) {
            clearInterval(elapsedTimeIntervalRef.current)
            elapsedTimeIntervalRef.current = null
        }
    }

    useEffect(() => {
        if (dbOperation.startsWith("import_")){
            setDbModalText(`${databaseOperations.import[language]}${Math.floor(elapsedTime/60)}:${String(elapsedTime % 60).padStart(2, "0")}\n${importCollection ?? ""} ${importProgress}/${importSize}`)
        }
    }, [importProgress, importSize, importCollection, elapsedTime])

     useEffect(() => {
        if (dbOperation.startsWith("save_")){
            setDbModalText(`${databaseOperations.export[language]}${Math.floor(elapsedTime/60)}:${String(elapsedTime % 60).padStart(2, "0")}\n${exportCollection ?? ""} ${exportProgress}/${exportSize}`)
        }
    }, [exportProgress, exportSize, exportCollection, elapsedTime])
    
    async function handleDbOperation(data: DBOperations | ""){

        if(data === "save_arsenal_db"){
            toggleExportModalVisible()
            setDbModalVisible()
            setExportProgress(0)
            setExportSize(0)
            setExportCollection(null)
            setDbModalText(`${databaseOperations.export[language]}`)
            try{
                await saveDatabase(startElapsedTime, setExportSize, setExportProgress, setExportCollection)
                dbSaveSuccess()
            }catch(e){
                alarm(`DB ops error ${data}`, e)
                dbSaveFail()
            }finally{
                stopElapsedTime()
            }
        }

        if(data === "save_arsenal_csv"){
            toggleExportModalVisible()
            setDbModalVisible()
            setExportProgress(0)
            setExportSize(0)
            setDbModalText(`${databaseOperations.export[language]}`)
            try{
                await exportArsenalCSV(startElapsedTime, exportOption)
                dbSaveSuccess()
            }catch(e){
                if (e instanceof ExportCancelledError) {
                    dbSaveCancel()
                } else {
                    alarm(`DB ops error ${data}`, e)
                    dbSaveFail()
                }
            }finally{
                stopElapsedTime()
            }
        }

        if(data === "import_arsenal_db"){
            toggleImportModalVisible()
            setDbModalVisible()
            setImportProgress(0)
            setImportSize(0)
            setImportCollection(null)
            setDbModalText(`${databaseOperations.import[language]}`)
            try{
                await importDatabase(startElapsedTime, setImportSize, setImportProgress, setImportCollection)
                dbImportSuccess()
            }catch(e){
                if (e instanceof ImportCancelledError) {
                    dbImportCancel()
                } else {
                    alarm(`DB ops error ${data}`, e)
                    dbImportFail()
                }
            }finally{
                stopElapsedTime()
            }
        }

        if(data === "import_arsenal_csv"){
            toggleImportModalVisible()
            setDbModalVisible()
            setImportProgress(0)
            setImportSize(0)
            setDbModalText(`${databaseOperations.import[language]}`)
            try{
                await importArsenalCSV(importOption, startElapsedTime, setImportSize, setImportProgress)
                dbImportSuccess()
            }catch(e){
                if (e instanceof ImportCancelledError) {
                    dbImportCancel()
                } else if(e instanceof ImportDatabaseNoValidFileSelectedError){
                    alarm("Import Arsenal CSV Error: No Arsenal CSV selected", `${e}`)
                    dbImportFail()
                } else if(e instanceof ImportDatabaseVersionMismatchError){
                    alarm("Import Arsenal CSV Error: Version mismatch:", `${e}`)
                    dbImportFail()
                } else if(e instanceof ImportDatabaseMimeTypeError){
                    alarm("Import Arsenal CSV Error: No valid CSV format:", `${e}`)
                    dbImportFail()
                } else{
                    alarm(`DB ops error ${data}`, e)
                    dbImportFail()
                }
            }finally{
                stopElapsedTime()
            }
        }

        if(data === "import_custom_csv"){
            toggleImportModalVisible()
            setDbModalVisible()
            setImportProgress(0)
            setImportSize(0)
            setDbModalText(`${databaseOperations.import[language]}`)
            try{
                await importCSV()
                dbImportSuccess()
            }catch(e){
                if (e instanceof ImportCancelledError) {
                    dbImportCancel()
                } else if(e instanceof ImportDatabaseNoValidFileSelectedError){
                    alarm("Import Custom CSV Error: No Arsenal CSV selected", `${e}`)
                    dbImportFail()
                } else if(e instanceof ImportDatabaseVersionMismatchError){
                    alarm("Import Custom CSV Error: Version mismatch:", `${e}`)
                    dbImportFail()
                } else if(e instanceof ImportDatabaseMimeTypeError){
                    alarm("Import Custom CSV Error: No valid CSV format:", `${e}`)
                    dbImportFail()
                } else if(e instanceof ImportDatabaseGenericFileError){
                    alarm("Custom CSV Import File Error", `${e}`)
                    dbImportFail()
                } else{
                    alarm(`DB ops error ${data}`, e)
                    dbImportFail()
                }
            } finally{
                stopElapsedTime()
            }
        }

        if(data === "import_legacy_db"){
            toggleImportModalVisible()
            setDbModalVisible()
            setImportProgress(0)
            setImportSize(0)
            setDbModalText(`${databaseOperations.import[language]}`)
            try{
                await importLegacyGunDatabase(generalSettings.resizeImages, importOptionLegacyDB, startElapsedTime, setImportSize, setImportProgress)
                dbImportSuccess() 
            }catch(e){
                setDbModalVisible()
                alarm(`DB ops error ${data}`, e)
            }finally{
                stopElapsedTime()
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
                            <IconButton icon="floppy" onPress={()=>handleDbExport("save_arsenal_db")} mode="contained" iconColor={theme.colors.onPrimary} style={{backgroundColor: theme.colors.primary}}/>
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
            
            <Portal>
                <Dialog visible={importModalVisible} dismissable={false}>
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
            </Portal>
           
            <Portal>
                <Dialog visible={exportModalVisible} dismissable={false}>
                    <Dialog.Title>
                    {`${dbOperation === "save_arsenal_csv" ? databaseCSVExportAlert.title[language] : databaseExportAlert.title[language]}`}
                    </Dialog.Title>
                    <Dialog.Content>
                        {dbOperation === "save_arsenal_csv" ? <Dropdown
                            label={importExportSelectionLabel[language]}
                            placeholder=""
                            options={importExportOptions}
                            value={exportOption}
                            onSelect={(value) => setExportOption(value as CollectionType)}
                        /> : null}
                        {dbOperation === "save_arsenal_csv" ? <Text>{`\n${databaseExportAlert.subtitle[language]}`}</Text> : null}
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>handleDbOperation(dbOperation)} icon="application-import" buttonColor={theme.colors.errorContainer} textColor={theme.colors.onErrorContainer}>{databaseImportAlert.yes[language]}</Button>
                        <Button onPress={()=>toggleExportModalVisible()} icon="cancel" buttonColor={theme.colors.secondary} textColor={theme.colors.onSecondary}>{databaseImportAlert.no[language]}</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <Portal>
               {importCSVVisible ? <CSVImportModal startElapsedTime={startElapsedTime} stopElapsedTime={stopElapsedTime} setImportSize={setImportSize} setImportProgress={setImportProgress} importOption={importOption} dbImportCancel={dbImportCancel}/> : null} 
            </Portal>

            <Modal visible={dbModalVisible}>
                <ActivityIndicator size="large" animating={true} />
                <Text variant="bodyLarge" style={{width: "100%", textAlign: "center", color: theme.colors.onBackground, marginTop: 10, backgroundColor: theme.colors.background}}>
                    {`${dbModalText}`}
                </Text>
            </Modal>

        </View>
    )
}