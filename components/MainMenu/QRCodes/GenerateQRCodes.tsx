import { Dimensions, FlatList, PixelRatio, View } from "react-native"
import { Appbar, Button, Checkbox, Icon, IconButton, List, RadioButton, Switch, Text, TextInput } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore"
import * as schema from "db/schema"
import { db } from "db/client"
import { eq, asc, inArray } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { defaultViewPadding } from "configs/configs"
import { ScrollView } from "react-native-gesture-handler"
import { dataTemplate_Translations } from "lib/DataTemplates/translations"
import { preferenceTitles, tabBarLabels } from "lib/textTemplates"
import { CollectionType, ItemType } from "lib/interfaces"
import { useRoute } from "@react-navigation/native"
import { Dropdown } from "react-native-paper-dropdown"
import { LabelTemplate, shippingLabelData_ISO, shippingLabelData_US } from "lib/shippingLables"
import { useCallback, useState } from "react"
import QRCodeStyled from 'react-native-qrcode-styled';
import QRCode from 'react-native-qrcode-skia';
import { printLabelsToPDF } from "functions/printers/printLabelsToPDF"
import ModalContainer from "components/ModalContainer"
import { devNull } from "node:os"

interface RouteParams {
  collection: CollectionType  
}

export default function GenerateQRCodes({navigation}){

    const route = useRoute()
    const params = route.params as RouteParams

    const { language, theme, generalSettings, caliberDisplayNameList, preferredUnits, sortBy } = usePreferenceStore()
    
    const customLabels = db.select().from(schema.customShippingLabels).all()
    const shippingLabelData = [...shippingLabelData_ISO, ...shippingLabelData_US, ...customLabels]

    const [contentIndex, setContentIndex] = useState<number>(0)
    const [selectedLabel, setSelectedLabel] = useState<string>(shippingLabelData[0].id)
    const [selectedGuns, setSelectedGuns] = useState(new Set<string>());
    const [qrCodeEnabled, setQrCodeEnabled] = useState<boolean>(true)
    const [textEnabled, setTextEnabled] = useState<boolean>(true)
    const [fontSize, setFontSize] = useState<number>(14)
    const [customModalVisible, setCustomModalVisible] = useState<boolean>(false)

    const collectionItems = db.select().from(schema[params.collection]).all()

    const labelOptions_ISO = shippingLabelData_ISO.map(label => {
        return {label: `${label.name}\n${label.labelWidth}x${label.labelHeight}${label.unit}\n${label.rows*label.columns} per ${label.pageFormat}`, value: label.id}
    })

    const labelOptions_US = shippingLabelData_US.map(label => {
        return {label: `${label.name}\n${(label.labelWidth/25.4).toFixed(2)}x${(label.labelHeight/25.5).toFixed(2)} ${label.unit}\n${label.rows*label.columns} per ${label.pageFormat}`, value: label.id}
    })

    const labelOptions_Custom = customLabels.map(label =>{
        return {label: `${label.name}\n${(label.labelWidth/25.4).toFixed(2)}x${(label.labelHeight/25.5).toFixed(2)} ${label.unit}\n${label.rows*label.columns} per ${label.pageFormat}`, value: label.id}
    })

    const titles = [
        "Select Label Format", "Select Items", "Adjust Label"
    ]

    const handleCheckboxPress = useCallback((id: string) => {
        setSelectedGuns(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        })
    }, [])

    function selectAll(){
        
            setSelectedGuns(prev => {
                const newSet = new Set(prev);
                collectionItems.forEach(item => {
                    if (!newSet.has(item.id)) {
                        newSet.add(item.id);
                    } 
                })
            return newSet;
        })
    }

    function getWidthHeight(id?:string){

        const label:LabelTemplate[] = shippingLabelData.filter(shippingLabel =>{
            return shippingLabel.id === (id ?? selectedLabel)
        })

        const displayWidth = Dimensions.get("window").width-(defaultViewPadding*2)

        const factor = displayWidth/label[0].labelWidth

        return {height: label[0].labelHeight*factor, width: label[0].labelWidth*factor}
    }

    function getRadius(id?: string){
        const label:LabelTemplate[] = shippingLabelData.filter(shippingLabel =>{
            return shippingLabel.id === (id ?? selectedLabel)
        })

        return label[0].radius
    }

    function getQRCodeSizeForPreview(){
        const labelWidthHeight = getWidthHeight()
        const labelRadius = getRadius()

        if(textEnabled){
            return (labelWidthHeight.width/3)-10
        }
        if(!textEnabled && labelRadius !== 100){
            return labelWidthHeight.width >= labelWidthHeight.height ? labelWidthHeight.height-10 : labelWidthHeight.width-10
        } else if(!textEnabled && labelRadius === 100){
            return labelWidthHeight.width >= labelWidthHeight.height ? (labelWidthHeight.width*0.7071)-10 : (labelWidthHeight.height*0.7071)-10
        }

    }

    function getSelectedItemsFromDatabase(){
        const items = collectionItems.filter(item => selectedGuns.has(item.id)) as ItemType[]
        return items
    }

    function generatePDF(){
        const label:LabelTemplate[] = shippingLabelData.filter(shippingLabel =>{
            return shippingLabel.id === selectedLabel
        })

        const itemArray = Array.from(selectedGuns)

        const qrCodeWidthHeight = getWidthHeight()

        printLabelsToPDF(
            language, 
            generalSettings.caliberDisplayName, 
            caliberDisplayNameList, 
            preferredUnits, 
            label[0],
            qrCodeEnabled,
            textEnabled,
            fontSize,
            itemArray,
            params.collection,
            qrCodeWidthHeight,
            sortBy
        )
    }

    function handleConfirm(){

    }

    function handleCancel(){
        setCustomModalVisible(false)
    }

    return(
        <View style={{flex: 1, paddingBottom: defaultViewPadding}}>
            <Appbar style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={tabBarLabels[params.collection][language]}/>
            </Appbar>
            <View><Text variant="titleMedium">{titles[contentIndex]}</Text></View>
            {contentIndex === 0 ? 
                <ScrollView style={{flex: 1}}>
                    <RadioButton.Group onValueChange={value => setSelectedLabel(value)} value={selectedLabel}>
                        <List.Accordion title="A4">{labelOptions_ISO.map((label, index) => {
                        return <View 
                                    key={`label_${index}`}
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        flexDirection: "row",
                                        width: "100%"
                                    }}
                                >
                                    <View 
                                    style={{
                                        width: getWidthHeight(label.value).width/10, 
                                        height: getWidthHeight(label.value).height/10, 
                                        borderWidth: 1, 
                                        borderStyle: "solid", 
                                        borderColor: "black", 
                                        borderRadius: getRadius(label.value)
                                    }}
                                >
                            </View>
                            <View style={{flex: 1}}>
                            <RadioButton.Item 
                                label={label.label} 
                                value={label.value} 
                                mode="android"
                            /></View>
                        </View>
                    })}</List.Accordion>
                     <List.Accordion title="US Letter">{labelOptions_US.map((label, index) => {
                        return <View 
                                    key={`label_${index}`}
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        flexDirection: "row",
                                        width: "100%"
                                    }}
                                >
                                    <View 
                                    style={{
                                        width: getWidthHeight(label.value).width/10, 
                                        height: getWidthHeight(label.value).height/10, 
                                        borderWidth: 1, 
                                        borderStyle: "solid", 
                                        borderColor: "black", 
                                        borderRadius: getRadius(label.value)
                                    }}
                                >
                            </View>
                            <View style={{flex: 1}}>
                            <RadioButton.Item 
                                label={label.label} 
                                value={label.value} 
                                mode="android"
                            /></View>
                        </View>
                    })}</List.Accordion>
                    <List.Accordion title="Custom">{labelOptions_Custom.map((label, index) => {
                        return <View 
                                    key={`label_${index}`}
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        flexDirection: "row",
                                        width: "100%"
                                    }}
                                >
                                    <View 
                                    style={{
                                        width: getWidthHeight(label.value).width/10, 
                                        height: getWidthHeight(label.value).height/10, 
                                        borderWidth: 1, 
                                        borderStyle: "solid", 
                                        borderColor: "black", 
                                        borderRadius: getRadius(label.value)
                                    }}
                                >
                            </View>
                            <View style={{flex: 1}}>
                            <RadioButton.Item 
                                label={label.label} 
                                value={label.value} 
                                mode="android"
                            /></View>
                            
                        </View>
                        
                    })}</List.Accordion>
                    </RadioButton.Group>
                    <Button onPress={()=>setCustomModalVisible(true)}>Create Custom Label</Button>
                </ScrollView> 
            :
            contentIndex === 1 ? 
                <View style={{flex: 1}}>
                    <Button onPress={()=>selectAll()}>Select All</Button>
                    <FlatList
                        data={collectionItems}
                        keyExtractor={(item, index) => `label_${index}`}
                        renderItem={({ item }) => (
                            <Checkbox.Item
                                label={`${"manufacturer" in item ? item.manufacturer : ""}${"manufacturer" in item ? " " : ""}${item.model}`}
                                status={selectedGuns.has(item.id) ? "checked" : "unchecked"}
                                onPress={() => handleCheckboxPress(item.id)}
                                mode="android"
                            />
                        )}
                    />
                </View> 
            :
            contentIndex === 2 ? 
                <View style={{flex: 1}}>
                    <View 
                        style={{
                            width: getWidthHeight().width, 
                            height: getWidthHeight().height, 
                            borderColor: theme.colors.primary,
                            borderWidth: 1,
                            alignSelf: "center",
                            display: "flex",
                            flexDirection: "row",
                            overflow: "hidden",
                            borderRadius: `${getRadius()}%`
                            }}
                        >
                            {qrCodeEnabled ? <View style={{padding: defaultViewPadding, display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center", flexDirection: "row", flex: 1}}>
                                <QRCode
                                    value="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                    size={getQRCodeSizeForPreview()}
                                />
                            </View> : null}
                            {textEnabled ? <View style={{padding: defaultViewPadding, flexDirection: 'column', flex: 2, flexShrink: 1}}>
                                <View>
                                    <Text style={{fontSize: fontSize}}>{`${dataTemplate_Translations.manufacturer[language]}:`}</Text>
                                    <Text style={{fontSize: fontSize, fontWeight: "bold"}} numberOfLines={1} >{`${getSelectedItemsFromDatabase()[0].manufacturer}`}</Text>
                                </View>
                                <View>
                                    <Text style={{fontSize: fontSize}}>{`${dataTemplate_Translations.model[language]}:`}</Text>
                                    <Text style={{fontSize: fontSize, fontWeight: "bold"}} numberOfLines={1} >{`${getSelectedItemsFromDatabase()[0].model}`}</Text>
                                </View>
                                <View>
                                    <Text style={{fontSize: fontSize}}>{`${dataTemplate_Translations.serial[language]}:`}</Text>
                                    <Text style={{fontSize: fontSize, fontWeight: "bold"}} numberOfLines={1} >{`${getSelectedItemsFromDatabase()[0].serial}`}</Text>
                                </View>
                            </View> : null}
                        </View>
                        <View>
                            <View><Text style={{fontStyle: "italic"}}>This Preview is only for illustrative purposes. Actual label may look slightly different, especially font size.</Text></View>
                            <View style={{width: "50%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                <Text>With QR Code</Text>
                                <Switch value={qrCodeEnabled} onValueChange={()=> setQrCodeEnabled(prev => !prev)} />
                            </View>
                            <View style={{width: "50%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                <Text>With Text</Text>
                                <Switch value={textEnabled} onValueChange={()=> setTextEnabled(prev => !prev)} />
                            </View>
                            <View style={{width: "50%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                <Text>Font Size</Text>
                                <IconButton size={14} mode={"contained"} icon={"minus"} onPress={() => fontSize >= 2 ? setFontSize(prev => prev-1) : null} />
                                <Text>{fontSize}</Text>
                                <IconButton size={14} mode={"contained"} icon={"plus"} onPress={() => setFontSize(prev => prev+1)} />
                            </View>
                        </View>
                </View>
            :
            null
            }

            <View style={{backgroundColor: "red"}}>
                {contentIndex !== 0 ? <Button onPress={()=> setContentIndex(contentIndex => contentIndex-1)}>Previous</Button> : null}
                {contentIndex === 2 ? 
                    <Button onPress={()=> generatePDF()}>Generate PDF</Button> 
                : 
                    <Button onPress={()=> contentIndex === 1 && selectedGuns.size === 0 ? null : setContentIndex(contentIndex => contentIndex+1)}>Next</Button>
                }
            </View>
            <ModalContainer
                            title={"Custom Shipping Label"}
                            subtitle={"Create Custom Shipping Label Dimensions"}
                            visible={customModalVisible}
                            setVisible={setCustomModalVisible}
                            content={<ScrollView style={{width: "100%", height: "100%", padding: defaultViewPadding}}>
                                <View><Text>All entries in Milimeters! </Text></View>
                                <View>
                                <View style={{width: "100%", marginBottom: defaultViewPadding}} ><TextInput inputMode="decimal" label="Page Width" /></View>
                                <View style={{width: "100%", marginBottom: defaultViewPadding}} ><TextInput inputMode="decimal" label="Page Height" /></View>
                                <View style={{width: "100%", marginBottom: defaultViewPadding}} ><TextInput inputMode="decimal" label="Margin Top" /></View>
                                <View style={{width: "100%", marginBottom: defaultViewPadding}} ><TextInput inputMode="decimal" label="Margin Left" /></View>
                                <View style={{width: "100%", marginBottom: defaultViewPadding}} ><TextInput inputMode="decimal" label="Label Width" /></View>
                                <View style={{width: "100%", marginBottom: defaultViewPadding}} ><TextInput inputMode="decimal" label="Label Height" /></View>
                                <View style={{width: "100%", marginBottom: defaultViewPadding}} ><TextInput inputMode="decimal" label="Horizontal Pitch" /></View>
                                <View style={{width: "100%", marginBottom: defaultViewPadding}} ><TextInput inputMode="decimal" label="Vertical Pitch" /></View>
                                <View style={{width: "100%", marginBottom: defaultViewPadding}} ><TextInput inputMode="decimal" label="Columns" /></View>
                                <View style={{width: "100%", marginBottom: defaultViewPadding}} ><TextInput inputMode="decimal" label="Rows" /></View>
                                <View style={{width: "100%", marginBottom: defaultViewPadding}} ><TextInput inputMode="decimal" label="Radius" /></View>
                                </View>
                            </ScrollView>}
                buttonACK={<IconButton icon="check" onPress={() => handleConfirm()} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
                buttonCNL={<IconButton icon="cancel" onPress={() => handleCancel()} style={{width: 50, backgroundColor: theme.colors.secondaryContainer}} iconColor={theme.colors.onSecondaryContainer} />}
                buttonDEL={null}
            />
        </View>
    )
}