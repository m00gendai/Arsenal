import AsyncStorage from "@react-native-async-storage/async-storage";
import { collectionImportTables, defaultViewPadding } from "configs";
import { PREFERENCES } from "configs_DB";
import { db } from "db/client";
import * as schema from "db/schema"
import { useState } from "react";
import { View } from "react-native";
import { Divider, IconButton, List, Text } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { useTextStore } from "stores/useTextStore";
import { useViewStore } from "stores/useViewStore";

export default function DeveloperSettings(){

    const { theme, resetPreferenceStore } = usePreferenceStore()
    const { setAlohaSnackbarVisible } = useViewStore()
    const { setAlohaSnackbarText } = useTextStore()

    const [dropTable, setDropTable] = useState<string>("gunCollection")

    const dropTableOptions = collectionImportTables.map(table => {return {label: `${table}`, value: `${table}`}})

    async function purgePreferences(){
        console.log("Purge Preferences")
        await AsyncStorage.setItem(PREFERENCES, JSON.stringify({}))
        resetPreferenceStore()
        setAlohaSnackbarText("Purged Preferences")
        setAlohaSnackbarVisible(true)
    }

    function purgeDatabase(){
        console.log("Purge Database")
        collectionImportTables.forEach(async table => {
            await db.delete(schema[table])
        })
        setAlohaSnackbarText("Purged Database")
        setAlohaSnackbarVisible(true)
    }

    async function purgeTable(){
        await db.delete(schema[dropTable])
        setAlohaSnackbarText(`Purged Table ${dropTable}`)
        setAlohaSnackbarVisible(true)
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
                    {`These Settings are IRREVERSIBLE.

There are no translations and no explanations provided.

USE AT YOUR OWN RISK!

Use only if you know what you are doing and if you are sure of what you are doing.

There are no confirmation prompts.

Press the button and the function runs WITHOUT CONFIRMATION`}
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

            </View>
        </List.Accordion>
    )
}