import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultViewPadding } from "configs/configs";
import { PREFERENCES } from "configs/configs_DB";
import { generalSettingsLabels, loginGuardAlert, preferenceTitles, resizeImageAlert } from "lib/textTemplates";
import { View } from "react-native";
import { Dialog, Divider, List, Switch, Text, Button } from "react-native-paper";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { useViewStore } from "stores/useViewStore"
import * as LocalAuthentication from 'expo-local-authentication';

export default function Settings_General(){

    const { theme, language, generalSettings, setGeneralSettings } = usePreferenceStore()
    const { imageResizeVisible, toggleImageResizeVisible, loginGuardVisible, toggleLoginGuardVisible } = useViewStore()

    async function handleSwitches(setting: string){
        const newSettings = {...generalSettings, [setting]: !generalSettings[setting]}
        setGeneralSettings(newSettings)
        const preferences:string = await AsyncStorage.getItem(PREFERENCES)
        const newPreferences:{[key:string] : string} = preferences == null ? {"generalSettings": newSettings} : {...JSON.parse(preferences), "generalSettings": newSettings} 
        await AsyncStorage.setItem(PREFERENCES, JSON.stringify(newPreferences))
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

    return( 
        <View style={{backgroundColor: theme.colors.tertiaryContainer}}>
            <List.Accordion left={props => <List.Icon {...props} icon="tune" />} title={preferenceTitles.generalSettings[language]} titleStyle={{fontWeight: "700", color: theme.colors.onTertiaryContainer}} style={{paddingLeft: defaultViewPadding*2, backgroundColor: theme.colors.tertiaryContainer}}>
                <View style={{ marginLeft: 5, marginRight: 5, padding: defaultViewPadding, backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.primary, borderLeftWidth: 5}}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", gap: 5}}>
                        
                        <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                            <Text style={{flex: 7}}>{generalSettingsLabels.resizeImages[language]}</Text>
                            <Switch style={{flex: 3}} value={generalSettings.resizeImages} onValueChange={()=>generalSettings.resizeImages ? handleSwitchesAlert("resizeImages") : handleSwitches("resizeImages")} />
                        </View>
                        
                        <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                        
                        <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                            <Text style={{flex: 7}}>{generalSettingsLabels.loginGuard[language]}</Text>
                            <Switch style={{flex: 3}} value={generalSettings.loginGuard} onValueChange={()=>handleSwitchesAlert("loginGuard")} />
                        </View>

                        <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                        
                        <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                            <Text style={{flex: 7}}>{generalSettingsLabels.hintsDisplay[language]}</Text>
                            <Switch style={{flex: 3}} value={generalSettings.hintsDisplay} onValueChange={()=>handleSwitches("hintsDisplay")} />
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