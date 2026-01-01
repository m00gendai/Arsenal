import { ScrollView, TouchableNativeFeedback, View, Platform, Dimensions } from "react-native"
import { useViewStore } from "stores/useViewStore"
import { ActivityIndicator, Button, Dialog, Divider, Icon, IconButton, List, Modal, Portal, Snackbar, Switch, Text } from "react-native-paper"
import { databaseExportAlert, databaseImportAlert, databaseOperations, generalSettingsLabels, importExportSelectionLabel, iosWarningText, loginGuardAlert, preferenceTitles, resizeImageAlert, tabBarLabels, toastMessages } from "lib/textTemplates"
import { usePreferenceStore } from "stores/usePreferenceStore"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { defaultViewPadding, languageSelection } from "configs"
import { PREFERENCES } from "configs_DB"
import { colorThemes } from "lib/colorThemes"
import { useEffect, useState } from "react"
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { CollectionType, DBOperations, ItemType, Languages, StackParamList } from "interfaces"
import { printGunCollection, printGunCollectionArt5 } from "functions/printToPDF"
import { useTagStore } from "stores/useTagStore"
import { manipulateAsync } from "expo-image-manipulator"
import Papa from 'papaparse';
import { mainMenu_DatabaseOperations } from "lib/Text/mainMenu_DatabaseOperations"
import { useImportExportStore } from "stores/useImportExportStore"
import CSVImportModal from "components/CSVImportModal"
import { alarm } from "utils"
import * as SystemUI from "expo-system-ui"
import * as LocalAuthentication from 'expo-local-authentication';
import { db } from "db/client"
import * as schema from "db/schema"
import saveDatabase from "functions/saveDatabase"
import importDatabase from "functions/importDatabase"
import { count } from 'drizzle-orm';
import { importLegacyGunDatabase } from "functions/importLegacyGunDatabase"
import { Dropdown } from 'react-native-paper-dropdown';
import Statistics from "./Statistics"
import About from "./About"
import exportArsenalCSV from "functions/exportArsenalCSV"
import importArsenalCSV from "functions/importArsenalCSV"


export default function MainMenu({navigation}){

    const { 
        setMainMenuOpen, 
        toastVisible, 
        setToastVisible, 
        dbModalVisible, 
        setDbModalVisible, 
        imageResizeVisible, 
        toggleImageResizeVisible, 
        loginGuardVisible, 
        toggleLoginGuardVisible, 
        importCSVVisible, 
        toggleImportCSVVisible, 
        importModalVisible, 
        toggleImportModalVisible,
        exportModalVisible,
        toggleExportModalVisible, 
        setHideBottomSheet
    } = useViewStore()
    const { language, switchLanguage, theme, switchTheme, generalSettings, setGeneralSettings, caliberDisplayNameList } = usePreferenceStore()
    const { overWriteAmmoTags, overWriteTags} = useTagStore()
    const { setCSVHeader, setCSVBody, importProgress, setImportProgress, resetImportProgress, importSize, setImportSize, resetImportSize, setDbCollectionType } = useImportExportStore()


    const [snackbarText, setSnackbarText] = useState<string>("")
    const [dbModalText, setDbModalText] = useState<string>("")
    const [dbOperation, setDbOperation] = useState<DBOperations | "">("")

    const [iosWarning, toggleiosWarning] = useState<boolean>(false)
    const [printerSrc, setPrinterSrc] = useState<null | "gunCollection" | "gunCollectionArt5" | "ammoCollection">(null)

    const importOptionsLegacyDB = [
        { label: tabBarLabels.gunCollection[language], value: 'gunCollection' },
        { label: tabBarLabels.ammoCollection[language], value: 'ammoCollection' },
    ];

    const importOptions = [
        { label: tabBarLabels.gunCollection[language], value: 'gunCollection' },
        { label: tabBarLabels.ammoCollection[language], value: 'ammoCollection' },
    ];

     const exportOptions = [
        { label: tabBarLabels.gunCollection[language], value: 'gunCollection' },
        { label: tabBarLabels.ammoCollection[language], value: 'ammoCollection' },
    ];

    const [importOptionLegacyDB, setImportOptionLegacyDB] = useState<CollectionType>("gunCollection")
    const [importOption, setImportOption] = useState<CollectionType>("gunCollection")
    const [exportOption, setExportOption] = useState<CollectionType>("gunCollection")

    const onToggleSnackBar = () => setToastVisible(true);
    const onDismissSnackBar = () => {
        setToastVisible(false);
        resetImportProgress(0)
        resetImportSize(0)
    }

    const date: Date = new Date()
    const currentYear:number = date.getFullYear()

    async function handleThemeSwitch(color:string){
        switchTheme(color)
        SystemUI.setBackgroundColorAsync(colorThemes[color].background)
        const preferences:string = await AsyncStorage.getItem(PREFERENCES)
        const newPreferences:{[key:string] : string} = preferences == null ? {"theme": color} : {...JSON.parse(preferences), "theme":color} 
        await AsyncStorage.setItem(PREFERENCES, JSON.stringify(newPreferences))
    }

    async function handleLanguageSwitch(lng:Languages){
        switchLanguage(lng)
        const preferences:string = await AsyncStorage.getItem(PREFERENCES)
        const newPreferences:{[key:string] : string} = preferences == null ? {"language": lng} : {...JSON.parse(preferences), "language":lng} 
        await AsyncStorage.setItem(PREFERENCES, JSON.stringify(newPreferences))
    }

    function dbSaveSuccess(){
        setDbModalVisible()
        setSnackbarText(toastMessages.dbSaveSuccess[language])
        onToggleSnackBar()
        
    }

    function dbImportSuccess(data: DBOperations){
        setDbModalVisible()
        setSnackbarText(`${useImportExportStore.getState().importSize} ${toastMessages.dbImportSuccess[language]}`)
        onToggleSnackBar()
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

    async function handleSwitchesAlert(setting:string){
        if(setting === "resizeImages"){
            toggleImageResizeVisible()        
        }
        if(setting === "loginGuard"){
            const compatible = await LocalAuthentication.hasHardwareAsync();
            console.info(`compatible: ${compatible}`)
            const isEnrolled = await LocalAuthentication.isEnrolledAsync()
            console.info(`isEnrolled: ${isEnrolled}`)
            const getEnrolledLevel = await LocalAuthentication.getEnrolledLevelAsync()
            console.info(`getEnrolledLevel: ${getEnrolledLevel}`)
            if(!compatible){
                toggleLoginGuardVisible()
            }
            if(!isEnrolled){
                toggleLoginGuardVisible()
            }
            if(compatible && isEnrolled){
                handleSwitches("loginGuard")
            }
        }
    }

    async function handleSwitches(setting: string){
        const newSettings = {...generalSettings, [setting]: !generalSettings[setting]}
            setGeneralSettings(newSettings)
            const preferences:string = await AsyncStorage.getItem(PREFERENCES)
            const newPreferences:{[key:string] : string} = preferences == null ? {"generalSettings": newSettings} : {...JSON.parse(preferences), "generalSettings": newSettings} 
            await AsyncStorage.setItem(PREFERENCES, JSON.stringify(newPreferences))
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
    
    useEffect(()=>{
        const trigger = navigation.addListener("focus", function(){
            setMainMenuOpen()
        })
        return trigger
    },[navigation])

    useEffect(()=>{
        const trigger = navigation.addListener("blur", function(){
            setMainMenuOpen()
        })
        return trigger
    },[navigation])


    async function handleIOSprints(printer: "gunCollection" | "gunCollectionArt5" | "ammoCollection"){
        setPrinterSrc(printer)
        toggleiosWarning(true)
    }

    async function handlePrints(printer: null | "gunCollection" | "gunCollectionArt5" | "ammoCollection"){
        if(printer === null){
            return
        }
        toggleiosWarning(false)
        switch(printer){
            case "gunCollection":
                try{
                await printGunCollection(language, generalSettings.caliberDisplayName, caliberDisplayNameList);
               
                } catch(e){
                    alarm("printGunCollection Error", e)
                }
                break
            case "gunCollectionArt5":
                try{
                   await printGunCollectionArt5(language, generalSettings.caliberDisplayName, caliberDisplayNameList);
                 
                } catch(e){
                    alarm("printGunCollectioNArt5 Error", e)
                }
                break
           /* case "ammoCollection":
                try{
                   await printAmmoCollection(ammoCollection, language, generalSettings.caliberDisplayName, caliberDisplayNameList);
                 
                } catch(e){
                    alarm("printAmmoCollection Error", e)
                }
                break*/

        }
    }

    function handleEditDataNavigation(target: string){
        setHideBottomSheet(true)
        navigation.navigate(target)
    }

    function handleCloseMenu(){
        setHideBottomSheet(false)
        navigation.goBack()
    }
    

    return(
        
           <View style={{height: "100%", width: Dimensions.get("window").width > Dimensions.get("window").height ? "60%" : "100%"}}>
                <View style={{width: "100%", height: "100%"}}>
                    <TouchableNativeFeedback onPress={()=>handleCloseMenu()}>
                        <View style={{width: "100%", height: 50, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", paddingLeft: 20, backgroundColor: theme.colors.primary}}>
                            <Icon source="arrow-left" size={20} color={theme.colors.onPrimary}/>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={{padding: 0, display: "flex", height: "100%", flexDirection: "column", flexWrap: "wrap"}}>
                        <View style={{width: "100%", flex: 15}}>
                            <ScrollView>
                                <View style={{padding: defaultViewPadding, backgroundColor: theme.colors.primary}}>
                                    <Text variant="titleMedium" style={{marginBottom: 10, color: theme.colors.onPrimary}}>{preferenceTitles.language[language]}</Text>
                                    <View style={{display: "flex", flexDirection: "row", gap: 0, flexWrap: "wrap", justifyContent: "center"}}>
                                        {languageSelection.map(langSelect =>{
                                            return <Button style={{borderRadius: 0, marginRight: -1, marginBottom: -1}} key={langSelect.code} buttonColor={language === langSelect.code ? theme.colors.primaryContainer : theme.colors.background} onPress={()=>handleLanguageSwitch(langSelect.code)} mode="outlined">{langSelect.flag}</Button>
                                        })}
                                    </View>
                                </View>
                                <Divider style={{height: 2, backgroundColor: theme.colors.primary}} />

                                {/* COLOR PALETTE */ }

                                <List.Accordion left={props => <List.Icon {...props} icon="palette" />} title={preferenceTitles.colors[language]} titleStyle={{fontWeight: "700", color: theme.colors.onBackground}}>
                                    <View style={{marginLeft: 5, marginRight: 5, padding: defaultViewPadding, backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.primary, borderLeftWidth: 5}}>
                                        <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                                            {Object.entries(colorThemes).map(colorTheme =>{
                                                return(    
                                                    <TouchableNativeFeedback onPress={()=>handleThemeSwitch(colorTheme[0])} key={colorTheme[0]}>
                                                        <View style={{elevation: 4, backgroundColor: colorTheme[1].background, borderColor: theme.name === colorTheme[0] ? colorTheme[1].primary : colorTheme[1].primaryContainer, borderWidth: theme.name === colorTheme[0] ? 5 : 0, paddingTop: 5, paddingBottom: 5, paddingLeft:2, paddingRight:2, width: "45%", height: 50, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginTop: 10, marginBottom: 10, borderRadius: 30}}>
                                                        
                                                            <View style={{height: "100%", width: "30%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: colorTheme[1].primaryContainer, borderBottomLeftRadius: 50, borderTopLeftRadius: 50}}>
                                                                <Text style={{color:colorTheme[1].onPrimaryContainer, fontSize: 10}}>A</Text>
                                                            </View>
                                                            <View style={{height: "100%", width: "30%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: colorTheme[1].surfaceVariant}}>
                                                                <Text style={{color:colorTheme[1].onSurfaceVariant, fontSize: 10}}>B</Text>
                                                            </View>
                                                            <View style={{height: "100%", width: "30%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: colorTheme[1].primary, borderBottomRightRadius: 50, borderTopRightRadius: 50}}>
                                                                <Text style={{color:colorTheme[1].onPrimary, fontSize: 10}}>C</Text>
                                                            </View>

                                                        </View>
                                                    </TouchableNativeFeedback>
                                                )
                                            })}
                                        </View>
                                    </View>
                                </List.Accordion>

                                {/* DATABASE OPERATIONS */ }

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

                                {/* LISTS */ }

                                <List.Accordion left={props => <List.Icon {...props} icon="printer" />} title={preferenceTitles.gunList[language]} titleStyle={{fontWeight: "700", color: theme.colors.onBackground}}>
                                    <View style={{ marginLeft: 5, marginRight: 5, padding: defaultViewPadding, backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.primary, borderLeftWidth: 5}}>
                                        <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", gap: 5}}>
                                            <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                                                <Text style={{width: "80%"}}>{preferenceTitles.printAllGuns[language]}</Text>
                                                <IconButton icon="table-large" onPress={()=>Platform.OS === "ios" ? handleIOSprints("gunCollection") : handlePrints("gunCollection")} mode="contained" iconColor={theme.colors.onPrimary} style={{backgroundColor: theme.colors.primary}}/>
                                            </View>   
                                            <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                                            <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                                                <Text style={{width: "80%"}}>{preferenceTitles.printArt5[language]}</Text>
                                                <IconButton icon="table-large" onPress={()=>Platform.OS === "ios" ? handleIOSprints("gunCollectionArt5") : handlePrints("gunCollectionArt5")} mode="contained" iconColor={theme.colors.onPrimary} style={{backgroundColor: theme.colors.primary}}/>
                                            </View>   
                                            
                                        </View>
                                    </View>
                                </List.Accordion>

                                {/* GENERAL SETTINGS */ }
   
                                <List.Accordion left={props => <List.Icon {...props} icon="cog-outline" />} title={preferenceTitles.generalSettings[language]} titleStyle={{fontWeight: "700", color: theme.colors.onBackground}}>
                                    <View style={{ marginLeft: 5, marginRight: 5, padding: defaultViewPadding, backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.primary, borderLeftWidth: 5}}>
                                        <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", gap: 5}}>
                                            <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                                                <Text style={{flex: 7}}>{generalSettingsLabels.displayImagesInListViewGun[language]}</Text>
                                                <Switch style={{flex: 3}} value={generalSettings.displayImagesInListViewGun} onValueChange={()=>handleSwitches("displayImagesInListViewGun")} />
                                            </View>
                                            <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                                            <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                                                <Text style={{flex: 7}}>{generalSettingsLabels.displayImagesInListViewAmmo[language]}</Text>
                                                <Switch style={{flex: 3}} value={generalSettings.displayImagesInListViewAmmo} onValueChange={()=>handleSwitches("displayImagesInListViewAmmo")} />
                                            </View>
                                            <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                                            <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                                                <Text style={{flex: 7}}>{generalSettingsLabels.emptyFields[language]}</Text>
                                                <Switch style={{flex: 3}} value={generalSettings.emptyFields} onValueChange={()=>handleSwitches("emptyFields")} />
                                            </View>
                                            <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                                            <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                                                <Text style={{flex: 7}}>{generalSettingsLabels.caliberDisplayName[language]}</Text>
                                                <Switch style={{flex: 3}} value={generalSettings.caliberDisplayName} onValueChange={()=>handleSwitches("caliberDisplayName")} />
                                            </View>
                                            <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                                            <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                                                <Text style={{flex: 7}}>{generalSettingsLabels.resizeImages[language]}</Text>
                                                <Switch style={{flex: 3}} value={generalSettings.resizeImages} onValueChange={()=>generalSettings.resizeImages ? handleSwitchesAlert("resizeImages") : handleSwitches("resizeImages")} />
                                            </View>
                                            <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                                            <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                                                <Text style={{flex: 7}}>{generalSettingsLabels.loginGuard[language]}</Text>
                                                <Switch style={{flex: 3}} value={generalSettings.loginGuard} onValueChange={()=>handleSwitchesAlert("loginGuard")} />
                                            </View>
                                        </View>
                                    </View>
                                </List.Accordion>

                                {/* EDIT DATA */}

                                <List.Accordion left={props => <List.Icon {...props} icon="playlist-edit" />} title={preferenceTitles.editData[language]} titleStyle={{fontWeight: "700", color: theme.colors.onBackground}}>
                                    <View style={{ marginLeft: 5, marginRight: 5, padding: defaultViewPadding, backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.primary, borderLeftWidth: 5}}>
                                        <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", gap: 5}}>
                                            <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                                                <Text style={{flex: 7}}>{preferenceTitles.editData_Autocomplete[language]}</Text>
                                                <IconButton 
                                                    icon={"chevron-right"} 
                                                    iconColor={theme.colors.onPrimary} 
                                                    style={{backgroundColor: theme.colors.primary}} 
                                                    onPress={() => handleEditDataNavigation("EditAutocomplete")}
                                                />
                                            </View>
                                            <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                                        </View>
                                    </View>
                                </List.Accordion>

                                {/* STATISTICS */ }

                                <Statistics />

                                {/* ABOUT */ }

                                <About />

                            </ScrollView>
                        </View>
                        <View style={{width: "100%", flex: 1, padding: 0, marginTop: 10, marginBottom: 10, elevation: 4, backgroundColor: theme.colors.primary}}>
                        </View>
                    </View>
                </View>
           
            <Snackbar
            visible={toastVisible}
                onDismiss={onDismissSnackBar}
                action={{
                label: 'OK',
                onPress: () => {
                    onDismissSnackBar()
                },
                }}>
                {snackbarText}
            </Snackbar>

            <Dialog visible={importModalVisible} onDismiss={()=>toggleImportModalVisible()}>
                    <Dialog.Title>
                    {`${databaseImportAlert.title[language]}`}
                    </Dialog.Title>
                     <Dialog.Content>
                        {dbOperation === "import_legacy_db" || dbOperation === "import_arsenal_csv" || dbOperation === "import_custom_csv" ? <Dropdown
                            label={importExportSelectionLabel[language]}
                            placeholder=""
                            options={dbOperation === "import_legacy_db" ? importOptionsLegacyDB : importOptions}
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
                            options={exportOptions}
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


                <Dialog visible={imageResizeVisible} onDismiss={()=>toggleImageResizeVisible()}>
                    <Dialog.Title>
                    {`${resizeImageAlert.title[language]}`}
                    </Dialog.Title>
                    <Dialog.Content>
                        <Text>{`${resizeImageAlert.subtitle[language]}`}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>{
                            handleSwitches("resizeImages");
                            toggleImageResizeVisible();
                        }} icon="check" buttonColor={theme.colors.errorContainer} textColor={theme.colors.onErrorContainer}>{resizeImageAlert.yes[language]}</Button>
                        <Button onPress={()=>toggleImageResizeVisible()} icon="cancel" buttonColor={theme.colors.secondary} textColor={theme.colors.onSecondary}>{resizeImageAlert.no[language]}</Button>
                    </Dialog.Actions>
                </Dialog>

                <Dialog visible={loginGuardVisible} onDismiss={()=>toggleLoginGuardVisible()}>
                    <Dialog.Title>
                    {`${loginGuardAlert.title[language]}`}
                    </Dialog.Title>
                    <Dialog.Content>
                        <Text>{`${loginGuardAlert.subtitle[language]}`}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>toggleLoginGuardVisible()} icon="emoticon-frown-outline" buttonColor={theme.colors.secondary} textColor={theme.colors.onSecondary}>{loginGuardAlert.no[language]}</Button>
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

            <Dialog visible={iosWarning} onDismiss={()=>toggleiosWarning(false)}>
                    <Dialog.Title>
                    {iosWarningText.title[language]}
                    </Dialog.Title>
                    <Dialog.Content>
                        <Text>{iosWarningText.text[language]}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>handlePrints(printerSrc)} icon="heart" buttonColor={theme.colors.errorContainer} textColor={theme.colors.onErrorContainer}>{iosWarningText.ok[language]}</Button>
                        <Button onPress={()=>toggleiosWarning(false)} icon="heart-broken" buttonColor={theme.colors.secondary} textColor={theme.colors.onSecondary}>{iosWarningText.cancel[language]}</Button>
                    </Dialog.Actions>
                </Dialog>

            </View>
    )
}