import { defaultViewPadding } from "configs/configs";
import { printGunCollection } from "functions/printers/printGunCollectionToPDF";
import { iosWarningText, preferenceTitles } from "lib/textTemplates";
import { useState } from "react";
import { Platform, View } from "react-native";
import { Button, Dialog, Divider, IconButton, List, Portal, Text } from "react-native-paper";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { alarm } from "functions/utils";
import { ListPrinter } from "lib/interfaces";
import { determineAccessoryIcons } from "functions/determinators";
import { printAmmoCollection } from "functions/printers/printAmmoCollectionToPDF";

export default function Lists(){

    const { language, theme, generalSettings, caliberDisplayNameList, preferredUnits } = usePreferenceStore()

    const [printerSrc, setPrinterSrc] = useState<ListPrinter>(null)
    const [iosWarning, toggleiosWarning] = useState<boolean>(false)

    async function handlePrints(printer: ListPrinter){
        if(printer === null){
            return
        }
        toggleiosWarning(false)
        if(printer.startsWith("gunCollection")){
            try {
                await printGunCollection(language, generalSettings.caliberDisplayName, caliberDisplayNameList, printer, preferredUnits)
            }catch(e){
                console.error(`Print Gun Collection Error: ${e}`)
            }
        }
        if(printer.startsWith("ammoCollection")){
            try{
                await printAmmoCollection(language, generalSettings.caliberDisplayName, caliberDisplayNameList, printer, preferredUnits)
            }catch(e){
                console.error(`Print Ammo Collection Error: ${e}`)
            }
        }
    }


    async function handleIOSprints(printer: ListPrinter){
        setPrinterSrc(printer)
        toggleiosWarning(true)
    }
    
    return(
        <View>
            
            <List.Accordion left={props => <List.Icon {...props} icon="printer" />} title={preferenceTitles.gunList[language]} titleStyle={{fontWeight: "700", color: theme.colors.onBackground}}>
                <View style={{ marginLeft: 5, marginRight: 5, padding: defaultViewPadding, backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.primary, borderLeftWidth: 5}}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", gap: 5}}>
                        
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                            <Text style={{width: "80%"}}>{preferenceTitles.printAllGuns[language]}</Text>
                            <IconButton icon={determineAccessoryIcons("gunCollection")} onPress={()=>Platform.OS === "ios" ? handleIOSprints("gunCollection") : handlePrints("gunCollection")} mode="contained" iconColor={theme.colors.onPrimary} style={{backgroundColor: theme.colors.primary}}/>
                        </View>   
                        
                        <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                        
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                            <Text style={{width: "80%"}}>{preferenceTitles.printArt5[language]}</Text>
                            <IconButton icon={determineAccessoryIcons("gunCollection")} onPress={()=>Platform.OS === "ios" ? handleIOSprints("gunCollectionArt5") : handlePrints("gunCollectionArt5")} mode="contained" iconColor={theme.colors.onPrimary} style={{backgroundColor: theme.colors.primary}}/>
                        </View>   

                        <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                        
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                            <Text style={{width: "80%"}}>{preferenceTitles.printGunsHybrid[language]}</Text>
                            <IconButton icon={determineAccessoryIcons("gunCollection")} onPress={()=>Platform.OS === "ios" ? handleIOSprints("gunCollectionHybrid") : handlePrints("gunCollectionHybrid")} mode="contained" iconColor={theme.colors.onPrimary} style={{backgroundColor: theme.colors.primary}}/>
                        </View> 

                        <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                        
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                            <Text style={{width: "80%"}}>{preferenceTitles.printAllAmmo[language]}</Text>
                            <IconButton icon={determineAccessoryIcons("ammoCollection")} onPress={()=>Platform.OS === "ios" ? handleIOSprints("ammoCollection") : handlePrints("ammoCollection")} mode="contained" iconColor={theme.colors.onPrimary} style={{backgroundColor: theme.colors.primary}}/>
                        </View>
                        
                    </View>
                </View>
            </List.Accordion>
            
            <Portal>
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
            </Portal>
        
        </View>
    )
}