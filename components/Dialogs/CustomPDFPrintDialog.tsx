import ModalContainer from "components/ModalContainer";
import { defaultViewPadding, screenNameParamsAll } from "configs/configs";
import { View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton, TextInput, Text, Portal, Dialog, Button, Checkbox } from "react-native-paper";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { useViewStore } from "stores/useViewStore";
import { createQRcodeDialogText, customLabelNumberFields, generateQRcodeText, helperText } from "lib/Text/textTemplates_generateQRcodes";
import { printCustomCollection } from "functions/printers/printCustomCollectionToPDF";
import { Dropdown } from "react-native-paper-dropdown";
import { useEffect, useState } from "react";
import { CollectionType } from "lib/interfaces";
import { determineDataTemplate, determineEmptyObject, determineTabBarLabel } from "functions/determinators";
import { dataTemplate_Translations } from "lib/DataTemplates/translations";

export default function customShippingLabelDialog(){

    const { customPDFPrintVisible, setCustomPDFPrintVisible } = useViewStore()
    const { language, theme, generalSettings, caliberDisplayNameList, preferredUnits } = usePreferenceStore()

    const [selectedScreen, setSelectedScreen] = useState<string>("gunCollection")
    const [selectedAttributes, setSelectedAttributes] = useState(new Set<string>());

    useEffect(()=>{
        setSelectedAttributes(new Set())
    },[selectedScreen])

    const screenData = screenNameParamsAll.map(screen => {
            return(
                {label: `${determineTabBarLabel(screen)[language]}`, value: screen}
            )
        })

    async function handleConfirm(){
      try{
        await printCustomCollection(
            language, 
            generalSettings.caliberDisplayName, 
            caliberDisplayNameList, 
            selectedScreen as CollectionType, 
            Array.from(selectedAttributes), 
            preferredUnits,
        "Custom List")
        }catch(e){
            console.error(`Print Ammo Collection Error: ${e}`)
        } 
    }

    function handleCancel(){
        setCustomPDFPrintVisible(false)
    }

    function handleCheckboxPress(data:string){
        setSelectedAttributes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(data)) {
                newSet.delete(data);
            } else {
                if(selectedAttributes.size < 7){
                    newSet.add(data);
                }
            }
            return newSet;
        })
    }

    return (<Portal>
        <ModalContainer
                            title={"Print custom list"}
                            subtitle={createQRcodeDialogText.subtitle[language]}
                            visible={customPDFPrintVisible}
                            setVisible={setCustomPDFPrintVisible}
                            content={
                                <View style={{ padding: defaultViewPadding, display: "flex", height: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", alignItems: "flex-start", alignContent: "flex-start" }}>
                                    <View style={{width: "100%"}}>
                                        <Dropdown
                                            label={"select collection"}
                                            options={screenData}
                                            value={selectedScreen}
                                            onSelect={setSelectedScreen}
                                            menuContentStyle={{height: "100%"}}
                                        />
                                    </View>
                                    <View style={{width: "100%", paddingTop: defaultViewPadding, paddingBottom: defaultViewPadding}}>
                                        <ScrollView style={{marginBottom: defaultViewPadding*5}}>
                                            {Object.entries(determineEmptyObject(selectedScreen)).map((data, index) =>{
                                                if(dataTemplate_Translations[data[0]]){
                                                    return (
                                                        <View key={`${data[0]}_${index}`} style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                                                            <Checkbox
                                                                status={selectedAttributes.has(data[0]) ? 'checked' : 'unchecked'}
                                                                onPress={() => handleCheckboxPress(data[0])}
                                                            />
                                                            <Text>{dataTemplate_Translations[data[0]][language]}</Text>
                                                        </View>
                                                    )
                                                }
                                            })}
                                        </ScrollView>
                                    </View>
                                </View>
                            }
                buttonACK={<IconButton icon="printer" onPress={() => handleConfirm()} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
                buttonCNL={<IconButton icon="cancel" onPress={() => handleCancel()} style={{width: 50, backgroundColor: theme.colors.secondaryContainer}} iconColor={theme.colors.onSecondaryContainer} />}
                buttonDEL={null}
            />
            
            </Portal>

                                )
    
}