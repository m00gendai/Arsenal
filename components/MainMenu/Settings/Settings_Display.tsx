import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultViewPadding } from "configs/configs";
import { PREFERENCES } from "configs/configs_DB";
import { loginGuardAlert, resizeImageAlert } from "lib/Text/text_alerts";
import { displaySettingsLabels, preferenceTitles } from "lib/Text/text_settings";
import { View } from "react-native";
import { Dialog, Divider, List, Switch, Text, Button } from "react-native-paper";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { useViewStore } from "stores/useViewStore"

export default function Settings_Display(){

    const { theme, language, generalSettings, setGeneralSettings } = usePreferenceStore()
    const { imageResizeVisible, toggleImageResizeVisible, loginGuardVisible, toggleLoginGuardVisible } = useViewStore()

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
            <List.Accordion left={props => <List.Icon {...props} icon="monitor-dashboard" />} title={preferenceTitles.displaySettings[language]} titleStyle={{fontWeight: "700", color: theme.colors.onTertiaryContainer}} style={{paddingLeft: defaultViewPadding*2, backgroundColor: theme.colors.tertiaryContainer}}>
                <View style={{ marginLeft: 5, marginRight: 5, padding: defaultViewPadding, backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.primary, borderLeftWidth: 5}}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", gap: 5}}>
                        <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                            <Text style={{flex: 7}}>{displaySettingsLabels.displayImagesInListViewGun[language]}</Text>
                            <Switch style={{flex: 3}} value={generalSettings.displayImagesInListViewGun} onValueChange={()=>handleSwitches("displayImagesInListViewGun")} />
                        </View>
                        
                        <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                        
                        <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                            <Text style={{flex: 7}}>{displaySettingsLabels.displayImagesInListViewAmmo[language]}</Text>
                            <Switch style={{flex: 3}} value={generalSettings.displayImagesInListViewAmmo} onValueChange={()=>handleSwitches("displayImagesInListViewAmmo")} />
                        </View>
                        
                        <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                        
                        <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                            <Text style={{flex: 7}}>{displaySettingsLabels.titleBelowImage[language]}</Text>
                            <Switch style={{flex: 3}} value={generalSettings.titleBelowImage} onValueChange={()=>handleSwitches("titleBelowImage")} />
                        </View>
                        
                        <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                        
                        <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                            <Text style={{flex: 7}}>{displaySettingsLabels.emptyFields[language]}</Text>
                            <Switch style={{flex: 3}} value={generalSettings.emptyFields} onValueChange={()=>handleSwitches("emptyFields")} />
                        </View>
                        
                        <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                        
                        <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                            <Text style={{flex: 7}}>{displaySettingsLabels.caliberDisplayName[language]}</Text>
                            <Switch style={{flex: 3}} value={generalSettings.caliberDisplayName} onValueChange={()=>handleSwitches("caliberDisplayName")} />
                        </View>
                        
                    </View>
                </View>
            </List.Accordion>

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

        </View>
    )
}