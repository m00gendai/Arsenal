import { Dimensions, FlatList, View } from "react-native"
import { Appbar, Button, Checkbox, Icon, IconButton, List, RadioButton, Switch, Text } from "react-native-paper"
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
import { LabelTemplate, shippingLabelData } from "lib/shippingLables"
import { useCallback, useState } from "react"
import QRCodeStyled from 'react-native-qrcode-styled';
import QRCode from 'react-native-qrcode-skia';
import { printLabelsToPDF } from "functions/printers/printLabelsToPDF"

interface RouteParams {
  collection: CollectionType  
}

export default function GenerateQRCodes({navigation}){

    const route = useRoute()
    const params = route.params as RouteParams

    const { language, theme, generalSettings, caliberDisplayNameList, preferredUnits } = usePreferenceStore()

    const [contentIndex, setContentIndex] = useState<number>(0)
    const [selectedLabel, setSelectedLabel] = useState<string>(shippingLabelData[0].id)
    const [selectedGuns, setSelectedGuns] = useState(new Set<string>());
    const [qrCodeEnabled, setQrCodeEnabled] = useState<boolean>(true)
    const [textEnabled, setTextEnabled] = useState<boolean>(true)
    const [fontSize, setFontSize] = useState<number>(14)

    const collectionItems = db.select().from(schema[params.collection]).all()

    const labelOptions = shippingLabelData.map(label => {
        return {label: `${label.name}\n${label.labelWidth}x${label.labelHeight}${label.unit}\n${label.rows*label.columns} per ${label.region === "EU" ? "A4" : "Letter"}`, value: label.id}
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

    function getWidthHeight(){
        const label:LabelTemplate[] = shippingLabelData.filter(shippingLabel =>{
            return shippingLabel.id === selectedLabel
        })

        const displayWidth = Dimensions.get("window").width-(defaultViewPadding*2)
        const factor = displayWidth/label[0].labelWidth
        return {height: label[0].labelHeight*factor, width: label[0].labelWidth*factor}
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
            qrCodeWidthHeight
        )
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
                    {labelOptions.map((label, index) => {
                        return <RadioButton.Item key={`label_${index}`} label={label.label} value={label.value} mode="android"/>
                    })}
                    </RadioButton.Group>
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
                            overflow: "hidden"
                            }}
                        >
                            {qrCodeEnabled ? <View style={{padding: defaultViewPadding, display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center", flexDirection: "row", flex: 1}}>
                                <QRCode
                                    value="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                    size={(getWidthHeight().width/3)-10}
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
        </View>
    )
}