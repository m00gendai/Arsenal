import ModalContainer from "components/ModalContainer";
import { customLabelFieldsFormat, customLabelFieldsNumbers, customLabelFieldsText, customLabelFieldsUnit, defaultViewPadding } from "configs/configs";
import { db } from "db/client";
import { alarm } from "functions/utils";
import { CustomLabel } from "lib/interfaces";
import { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton, TextInput, Text, Portal, Dialog, Button } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { useViewStore } from "stores/useViewStore";
import { v4 as uuidv4 } from 'uuid';
import * as schema from "db/schema"
import { createQRcodeDialogText, customLabelNumberFields, generateQRcodeText, helperText } from "lib/Text/textTemplates_generateQRcodes";

export default function customShippingLabelDialog(){

    const { language, theme } = usePreferenceStore()
    const { customShippingLabelVisible, setCustomShippingLabelVisible } = useViewStore()
    const [helpDialogVisible, setHelpDialogVisible] = useState<boolean>(false)
    const [helpDialogText, setHelpDialogText] = useState<string>("")

    const reference = require("../../assets/labelMeasurements.jpg");
    const [imageHeight, setImageHeight] = useState(200);

    const [customLabelObject, setCustomLabelObject] = useState<CustomLabel>(
        {
            name: null,
            pageFormat: "",
            unit: "mm",
            pageHeight : null, 
            pageWidth: null, 
            marginTop: null, 
            marginLeft: null,
            labelWidth: null,
            labelHeight: null,
            horizontalPitch: null, 
            verticalPitch: null, 
            columns: null,
            rows: null,
            radius: null
        }
    )

    async function handleConfirm(){
        for(const entry of Object.entries(customLabelObject)){
            if(entry[1] === null){
                alarm("Validation Error", `Field ${entry[0]} must not be empty`)
                return
            }
        }
 
        await db.insert(schema.customShippingLabels).values({
                        id: uuidv4(),
                        createdAt: Date.now(),
                        ...customLabelObject
                    })
        setCustomShippingLabelVisible(false)
    }

    function handleCancel(){
        setCustomShippingLabelVisible(false)
    }

    function toggleHelpDialog(field: keyof customLabelNumberFields){
        setHelpDialogText(helperText[field][language])
        setHelpDialogVisible(true)
    }

console.log(customLabelObject)
    return (<Portal>
        <ModalContainer
                            title={createQRcodeDialogText.title[language]}
                            subtitle={createQRcodeDialogText.subtitle[language]}
                            visible={customShippingLabelVisible}
                            setVisible={setCustomShippingLabelVisible}
                            content={<View><ScrollView style={{width: "100%", height: "100%", padding: defaultViewPadding}}>
                                <View>
                                    {customLabelFieldsText.map((field, index) =>{
                                        return(
                                            <View 
                                            key={`field_${field}_${index}`}
                                            style={{
                                                width: "100%", 
                                                marginBottom: defaultViewPadding, 
                                                display: "flex", 
                                                flexDirection: "row", 
                                                alignItems: "center", 
                                                justifyContent: "flex-start"
                                            }} 
                                        >
                                            <TextInput 
                                                inputMode="text" 
                                                label={createQRcodeDialogText[field][language]}
                                                style={{width: "100%"}} 
                                                value={customLabelObject.name} 
                                                onChangeText={(value) => setCustomLabelObject((prev) => (
                                                    {...prev, name: value === "" ? null : value }
                                                ))}
                                            />
                                        </View>
                                        )
                                    })}
                                </View>
                                <View>
                                    {customLabelFieldsFormat.map((field, index) => {
                                        return (
                                        <View 
                                            key={`field_${field}_${index}`}
                                            style={{
                                                width: "100%", 
                                                marginBottom: defaultViewPadding, 
                                                display: "flex", 
                                                flexDirection: "row", 
                                                alignItems: "center", 
                                                justifyContent: "flex-start"
                                            }} 
                                        >
                                            <View style={{flex: 1}}>
                                                <Dropdown
                                                    label={createQRcodeDialogText[field][language]}
                                                    placeholder=""
                                                    options={[{label: `${createQRcodeDialogText.pageFormat_none[language]}`, value: ""},{label: "A4 - 297x210mm / 11.69x8.27 in", value: "A4"},{label: "US Letter - 279x216mm / 11x8.5 in", value: "US Letter"} ]}
                                                    value={customLabelObject.pageFormat}
                                                    onSelect={(value) => setCustomLabelObject((prev) => (
                                                        {...prev, pageFormat: value === "" ? null : value }
                                                    ))}
                                                />
                                            </View>
                                        </View>
                                        )})
                                    }
                                </View>
                                <View>
                                    {customLabelFieldsUnit.map((field, index) => {
                                        return (
                                        <View 
                                            key={`field_${field}_${index}`}
                                            style={{
                                                width: "100%", 
                                                marginBottom: defaultViewPadding, 
                                                
                                                display: "flex", 
                                                flexDirection: "row", 
                                                alignItems: "center", 
                                                justifyContent: "space-between"
                                            }} 
                                        >
                                            <View style={{flex: 1}}>
                                                <Dropdown
                                                    label={createQRcodeDialogText[field][language]}
                                                    placeholder=""
                                                    options={[{label: "Millimeter", value: "mm"},{label: "Inch", value: "in"}]}
                                                    value={customLabelObject.unit}
                                                    onSelect={(value) => setCustomLabelObject((prev) => (
                                                        {...prev, unit: value === "" ? null : value }
                                                    ))}
                                                />
                                            </View>
                                        </View>
                                        )})
                                    }
                                </View>
                                <View style={{marginBottom: defaultViewPadding}}>
                                    {customLabelFieldsNumbers.map((field, index) => {
                                        return(
                                        <View 
                                            key={`field_${field}_${index}`}
                                            style={{
                                                width: "100%", 
                                                marginBottom: defaultViewPadding, 
                                                
                                                display: "flex", 
                                                flexDirection: "row", 
                                                alignItems: "center", 
                                                justifyContent: "space-between"
                                            }} 
                                        >
                                            <Text style={{width: "50%"}}>{createQRcodeDialogText[field][language]}</Text>
                                            
                                            <TextInput 
                                                inputMode="decimal" 
                                                label="" 
                                                style={{width: 100}} 
                                                value={customLabelObject[field] !== null ? customLabelObject[field].toString() : ""} 
                                                onChangeText={(value) => {
                                                    const num = value.replace(",", ".");
                                                    setCustomLabelObject((prev) => (
                                                    
                                                    {...prev, [field]: value === "" ? null : num }
                                                
                                                ))}}
                                            />
                                            <IconButton icon="help-circle-outline" onPress={()=>toggleHelpDialog(field as keyof customLabelNumberFields)}/>
                                        </View>)})}
                                </View>
                                
                            </ScrollView><Dialog visible={helpDialogVisible}>
                         <Dialog.Content>
                           <Text variant="bodyMedium">{helpDialogText}</Text>
                           <View
      style={{ width: "100%" }}
      onLayout={(e) => {
        const { width, height } = Image.resolveAssetSource(reference);
        setImageHeight(e.nativeEvent.layout.width * (height / width));
      }}
    >
      <Image
        source={reference}
        style={{ width: "100%", height: imageHeight }}
        resizeMode="contain"
      />
    </View>

                         </Dialog.Content>
                         <Dialog.Actions>
                      <Button onPress={() => setHelpDialogVisible(false)}>OK</Button>
                    </Dialog.Actions>
                         </Dialog></View>}
                buttonACK={<IconButton icon="check" onPress={() => handleConfirm()} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
                buttonCNL={<IconButton icon="cancel" onPress={() => handleCancel()} style={{width: 50, backgroundColor: theme.colors.secondaryContainer}} iconColor={theme.colors.onSecondaryContainer} />}
                buttonDEL={null}
            />
            
            </Portal>

                                )
    
}