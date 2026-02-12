import AsyncStorage from "@react-native-async-storage/async-storage";
import { collectionImportTables, defaultViewPadding, imageFileExtensions, screenNameParamsAll } from "configs/configs";
import { PREFERENCES } from "configs/configs_DB";
import { db } from "db/client";
import * as schema from "db/schema"
import { eq } from "drizzle-orm/sql";
import DEV_importLegacyDatabaseAsJSON from "functions/DEV/DEV_importLegacyDatabaseAsJSON";
import DEV_injectBadItem_date from "functions/DEV/DEV_injectBadItem_date";
import { developerSettingsWarning } from "lib/textTemplates";
import { useState } from "react";
import { View } from "react-native";
import { Divider, IconButton, List, Text } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { useTextStore } from "stores/useTextStore";
import { useViewStore } from "stores/useViewStore";

export default function DeveloperSettings(){

    const { theme, language, resetPreferenceStore } = usePreferenceStore()
    const { setAlohaSnackbarVisible } = useViewStore()
    const { setAlohaSnackbarText } = useTextStore()

    const [dropTable, setDropTable] = useState<string>("gunCollection")

    const dropTableOptions = collectionImportTables.map(table => {return {label: `${table}`, value: `${table}`}})

    async function purgePreferences(){
        console.info("Purge Preferences")
        await AsyncStorage.setItem(PREFERENCES, JSON.stringify({}))
        resetPreferenceStore()
        setAlohaSnackbarText("Purged Preferences")
        setAlohaSnackbarVisible(true)
    }

    function purgeDatabase(){
        console.info("Purge Database")
        collectionImportTables.forEach(async table => {
            await db.delete(schema[table])
        })
        setAlohaSnackbarText("Purged Database")
        setAlohaSnackbarVisible(true)
    }

    async function purgeTable(){
        console.info("Purge Table")
        await db.delete(schema[dropTable])
        setAlohaSnackbarText(`Purged Table ${dropTable}`)
        setAlohaSnackbarVisible(true)
    }

    function nullFaultyImages(){
        screenNameParamsAll.forEach(async table => {
            const collection = db.select().from(schema[table]).all()
            collection.forEach(async item => {
                if(item.images !== null){
                    if(Array.isArray(item.images)){
                        const cleanedImages = item.images.filter(image =>{
                            if(imageFileExtensions.some(extension => image.endsWith(extension))){
                                return image
                            }
                        })
                        await db.update(schema[table]).set({images: cleanedImages}).where((eq(schema[table].id, item.id)))
                    } else {
                        await db.update(schema[table]).set({images: null}).where((eq(schema[table].id, item.id)))
                    }
                }
            })
        })
    }
    
    return(
        <List.Accordion 
            left={props => 
                <>
                    <List.Icon {...props} icon="skull" color={theme.colors.onError} />
                    <List.Icon {...props} icon="alert-circle-outline" color={theme.colors.onError} />
                </>
            } 
            title={"Developer Settings"} 
            titleStyle={{fontWeight: "700", color: theme.colors.onError}}
            style={{backgroundColor: theme.colors.error}}
        >
            <View style={{ marginLeft: 5, marginRight: 5, padding: defaultViewPadding, backgroundColor: theme.colors.errorContainer, borderColor: theme.colors.error, borderLeftWidth: 5}}>
                
                <Text style={{display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent: "flex-start"}}>
                   {`${developerSettingsWarning[language]}`}
                </Text>

                <Divider style={{marginTop: 5, marginBottom: 5, width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                
                <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                    <Text style={{flex: 7}}>Purge Preferences</Text>
                    <IconButton 
                        icon="cog-off-outline" 
                        iconColor={theme.colors.onErrorContainer}
                        style={{height: "100%", backgroundColor: theme.colors.error, aspectRatio: "1/1"}} 
                        onPress={()=>purgePreferences()}
                    />
                </View>

                <Divider style={{marginTop: 5, marginBottom: 5, width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />

                <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                    <Text style={{flex: 7}}>Purge Database</Text>
                    <IconButton 
                        icon="database-off-outline" 
                        iconColor={theme.colors.onErrorContainer}
                        style={{height: "100%", backgroundColor: theme.colors.error, aspectRatio: "1/1"}} 
                        onPress={()=>purgeDatabase()}
                    />
                </View>

                <Divider style={{marginTop: 5, marginBottom: 5, width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />

                <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                    <View style={{width: "80%"}}><Dropdown
                            label="Purge Table"
                            placeholder=""
                            options={dropTableOptions}
                            value={dropTable}
                            onSelect={setDropTable}
                        /></View>
                    <IconButton 
                        icon="table-off" 
                        iconColor={theme.colors.onErrorContainer}
                        style={{height: "100%", backgroundColor: theme.colors.error, aspectRatio: "1/1"}} 
                        onPress={()=>purgeTable()}
                    />
                </View>

                <Divider style={{marginTop: 5, marginBottom: 5, width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />

                <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                    <Text style={{flex: 7}}>Inject gun JSON</Text>
                    <IconButton 
                        icon="pistol" 
                        iconColor={theme.colors.onErrorContainer}
                        style={{height: "100%", backgroundColor: theme.colors.error, aspectRatio: "1/1"}} 
                        onPress={()=>DEV_importLegacyDatabaseAsJSON("gun")}
                    />
                </View>

                <Divider style={{marginTop: 5, marginBottom: 5, width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />

                <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                    <Text style={{flex: 7}}>Inject ammo JSON</Text>
                    <IconButton 
                        icon="ammunition" 
                        iconColor={theme.colors.onErrorContainer}
                        style={{height: "100%", backgroundColor: theme.colors.error, aspectRatio: "1/1"}} 
                        onPress={()=>DEV_importLegacyDatabaseAsJSON("ammo")}
                    />
                </View>

                <Divider style={{marginTop: 5, marginBottom: 5, width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />

                <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                    <Text style={{flex: 7}}>Inject Bad Item Date</Text>
                    <IconButton 
                        icon="calendar-range" 
                        iconColor={theme.colors.onErrorContainer}
                        style={{height: "100%", backgroundColor: theme.colors.error, aspectRatio: "1/1"}} 
                        onPress={()=>DEV_injectBadItem_date()}
                    />
                </View>

                <Divider style={{marginTop: 5, marginBottom: 5, width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />

                <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                    <Text style={{flex: 7}}>Null Faulty Images</Text>
                    <IconButton 
                        icon="image-sync-outline" 
                        iconColor={theme.colors.onErrorContainer}
                        style={{height: "100%", backgroundColor: theme.colors.error, aspectRatio: "1/1"}} 
                        onPress={()=>nullFaultyImages()}
                    />
                </View>

            </View>
        </List.Accordion>
    )
}