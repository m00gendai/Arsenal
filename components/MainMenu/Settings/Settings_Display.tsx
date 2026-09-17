import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultViewPadding, numberBadgeCollections } from "configs/configs";
import { PREFERENCES } from "configs/configs_DB";
import { displaySettingsLabels, preferenceTitles } from "lib/Text/text_settings";
import { View } from "react-native";
import { Divider, List, Switch, Text } from "react-native-paper";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { SegmentedButtons } from 'react-native-paper';
import { useState } from "react";
import { Dropdown } from "react-native-paper-dropdown";

export default function Settings_Display(){

    const { theme, language, generalSettings, setGeneralSettings } = usePreferenceStore()
    const [value, setValue] = useState<number>(generalSettings.gridColumns)

    async function handleRange(range: string, value: number){
        // DISPLAY SETTINGS ARE STORED AS GENERAL SETTINGS, the distinction is only made for UI reasons
        const newSettings = {...generalSettings, [range]: value}
        setGeneralSettings(newSettings)
        const preferences:string = await AsyncStorage.getItem(PREFERENCES)
        const newPreferences:{[key:string] : string} = preferences == null ? {"generalSettings": newSettings} : {...JSON.parse(preferences), "generalSettings": newSettings} 
        await AsyncStorage.setItem(PREFERENCES, JSON.stringify(newPreferences))
        setValue(value)
    }

    async function handleSwitches(setting: string){
        // DISPLAY SETTINGS ARE STORED AS GENERAL SETTINGS, the distinction is only made for UI reasons
        const newSettings = {...generalSettings, [setting]: !generalSettings[setting]}
        setGeneralSettings(newSettings)
        const preferences:string = await AsyncStorage.getItem(PREFERENCES)
        const newPreferences:{[key:string] : string} = preferences == null ? {"generalSettings": newSettings} : {...JSON.parse(preferences), "generalSettings": newSettings} 
        await AsyncStorage.setItem(PREFERENCES, JSON.stringify(newPreferences))
    }



    return( 
        <View style={{backgroundColor: theme.colors.tertiaryContainer}}>
            <List.Accordion left={props => <List.Icon {...props} icon="monitor-dashboard" />} title={preferenceTitles.displaySettings[language]} titleStyle={{fontWeight: "700", color: theme.colors.onSecondaryContainer}} style={{paddingLeft: defaultViewPadding*2, backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.primary, borderLeftWidth: 5}}>
                <View style={{padding: defaultViewPadding, backgroundColor: theme.colors.tertiaryContainer, borderColor: theme.colors.primary}}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", gap: 5}}>
                        <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                            <Text style={{flex: 7}}>{displaySettingsLabels.displayImagesInListView[language]}</Text>
                            <View style={{flex: 3, flexDirection: "row", justifyContent: "flex-end"}}><Switch value={generalSettings.displayImagesInListView} onValueChange={()=>handleSwitches("displayImagesInListView")} /></View>
                        </View>
                        
                        <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                        
                        <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                            <Text style={{flex: 7}}>{displaySettingsLabels.titleBelowImage[language]}</Text>
                            <View style={{flex: 3, flexDirection: "row", justifyContent: "flex-end"}}><Switch value={generalSettings.titleBelowImage} onValueChange={()=>handleSwitches("titleBelowImage")} /></View>
                        </View>
                        
                        <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                        
                        <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                            <Text style={{flex: 7}}>{displaySettingsLabels.emptyFields[language]}</Text>
                            <View style={{flex: 3, flexDirection: "row", justifyContent: "flex-end"}}><Switch value={generalSettings.emptyFields} onValueChange={()=>handleSwitches("emptyFields")} /></View>
                        </View>
                        
                        <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
    
                        <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                            <Text style={{flex: 7}}>{displaySettingsLabels.caliberDisplayName[language]}</Text>
                            <View style={{flex: 3, flexDirection: "row", justifyContent: "flex-end"}}><Switch value={generalSettings.caliberDisplayName} onValueChange={()=>handleSwitches("caliberDisplayName")} /></View>
                        </View>

                        <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
 
                        <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                            <Text style={{flex: 7}}>{displaySettingsLabels.displaySoldItems[language]}</Text>
                            <View style={{flex: 3, flexDirection: "row", justifyContent: "flex-end"}}><Switch value={generalSettings.displaySoldItems} onValueChange={()=>handleSwitches("displaySoldItems")} /></View>
                        </View>

                        <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
 
                        <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                            <Text style={{flex: 7}}>{displaySettingsLabels.gridColumns[language]}</Text>
<View style={{flex: 4, flexDirection: "row", justifyContent: "flex-end"}}><View style={{width: "50%"}}><Dropdown
                            label={displaySettingsLabels.gridColumnsLabel[language]}
                            placeholder={``}
                            options={[
                                {
                                    label: "1",
                                    value: "1"
                                },
                                {
                                    label: "2",
                                    value: "2"
                                },
                                {
                                    label: "3",
                                    value: "3"
                                },
                                {
                                    label: "4",
                                    value: "4"
                                },
                            ]}
                            value={`${value}`}
                            onSelect={(newValue) => handleRange("gridColumns", Number(newValue))}

                        /></View>
                        </View>
                        </View>
                        
                    </View>
                </View>
            </List.Accordion>
            
        </View>
    )
}