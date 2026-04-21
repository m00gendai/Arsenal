import ModalContainer from "components/ModalContainer";
import { dateTimeOptions, defaultViewPadding } from "configs/configs";
import { Keyboard, Platform, Pressable, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton, Portal, TextInput } from "react-native-paper";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { useViewStore } from "stores/useViewStore";
import { useState } from "react";
import { modalTexts } from "lib/Text/text_modals";
import DateTimePicker from "react-native-ui-datepicker";
import { useItemStore } from "stores/useItemStore";
import { db } from "db/client"
import * as schema from "db/schema"
import { eq } from 'drizzle-orm';

export default function customShippingLabelDialog(){

    const { sellDialogVisible, setSellDialogVisible } = useViewStore()
    const { currentCollection, currentItem } = useItemStore()
    const { language, theme, generalSettings, caliberDisplayNameList, preferredUnits, sortBy } = usePreferenceStore()

    const [buyerName, setBuyerName] = useState<string>("")
    const [initialSellDate, setInitialSellDate] = useState<number>(null)
    const [sellDate, setSellDate] = useState<number>(null)
    const [sellPrice, setSellPrice] = useState<string>(null)
    const [buyerPermit, setBuyerPermit] = useState<string>("")
    const [soldRemarks, setSoldRemarks] = useState<string>("")
    
    const [showDateTime, setShowDateTime] = useState<boolean>(false)

    function updateDate(input){
        const inputDate = input as number
        setInitialSellDate(new Date(inputDate).getTime())
    }

    function confirmDate(){
        setSellDate(initialSellDate)
        setShowDateTime(false)
    }

    function cancelDate(){
        setInitialSellDate(sellDate)
        setShowDateTime(false)
    }

    function deleteDate(){
        setSellDate(null)
        setInitialSellDate(null)
        setShowDateTime(false)
    }

    async function handleConfirm(){
        const item = {
            ...currentItem,
            sold_isSold: true,
            sold_sellDate_unix: sellDate,
            sold_buyerName: buyerName,
            sold_sellPrice: sellPrice,
            sold_buyerPermit: buyerPermit,
            sold_remarks: soldRemarks,
        }
        try{
            await db.update(schema[currentCollection]).set(item).where((eq(schema[currentCollection].id, item.id)))
        }catch(e){
            console.error(e)
        }
        setSellDialogVisible(false)
    }

    function handleCancel(){
        setSellDialogVisible(false)
    }

    function handleInputPress(){
            Keyboard.dismiss()
            setShowDateTime(true)
        }

    return (
        <Portal>
            <ModalContainer
                title={"Sell Item"}
                subtitle={modalTexts.customPDFPrinter.text[language]}
                visible={sellDialogVisible}
                setVisible={setSellDialogVisible}
                content={
                    <View style={{ padding: defaultViewPadding, display: "flex", height: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", alignItems: "flex-start", alignContent: "flex-start" }}>
                        <View style={{width: "100%"}}>
                            
                        </View>
                        <View style={{width: "100%", paddingTop: defaultViewPadding, paddingBottom: defaultViewPadding}}>
                            <ScrollView style={{marginBottom: defaultViewPadding*5}}>
                                <TextInput
                                    label="Buyer"
                                    value={buyerName}
                                    onChangeText={text => setBuyerName(text)}
                                />
                                <View style={{flex: 1}}>
                                    <Pressable style={{flex: 1}} onPress={()=>{Platform.OS === "android" ? handleInputPress() : null}}>
                                        <TextInput
                                            label="Sell Date"
                                            editable={false}
                                            value={sellDate === null ? "" : new Date(sellDate).toLocaleDateString("de-CH", dateTimeOptions)}
                                            onPress={()=>{Platform.OS === "ios" ? handleInputPress() : null}}
                                        />
                                    </Pressable>
                                </View>
                                <TextInput
                                    label="Sell Price"
                                    value={sellPrice ? sellPrice.toString() : ""}
                                    inputMode={"decimal"}
                                    onChangeText={text => setSellPrice(text)}
                                />
                                 <TextInput
                                    label="Buyer Permit"
                                    value={buyerPermit}
                                    onChangeText={text => setBuyerPermit(text)}
                                />
                                <Pressable style={{flex: 1, height: 200}}>
                                            <TextInput
                                                label={`Remarks`} 
                                                style={{
                                                    height: 200
                                                }}
                                                value={soldRemarks}
                                                onChangeText={(text) => {
                                                        setSoldRemarks(text)
                                                    }}
                                                multiline={true}
                                                returnKeyType='done'
                                                returnKeyLabel='OK'
                                            />
                                        </Pressable>
                            </ScrollView>
                        </View>
                    </View>
                }
                buttonACK={<IconButton icon="currency-usd" onPress={() => handleConfirm()} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
                buttonCNL={<IconButton icon="cancel" onPress={() => handleCancel()} style={{width: 50, backgroundColor: theme.colors.secondaryContainer}} iconColor={theme.colors.onSecondaryContainer} />}
                buttonDEL={null}
            />

            <ModalContainer 
                title={modalTexts.datePicker.title[language]} 
                subtitle={modalTexts.datePicker.text[language]} 
                visible={showDateTime} 
                setVisible={setShowDateTime}
                content={<DateTimePicker
                            mode="single"
                            locale="de"
                            firstDayOfWeek={1}
                            date={initialSellDate === null ? undefined : new Date(initialSellDate)}
                            onChange={(params) => updateDate(params.date)}
                            selectedItemColor={theme.colors.primary}
                            calendarTextStyle={{color: theme.colors.onBackground}}
                            headerTextStyle={{color: theme.colors.primary, padding: defaultViewPadding}}
                            headerTextContainerStyle={{backgroundColor: theme.colors.primaryContainer, elevation: 5, marginLeft: defaultViewPadding, marginRight: defaultViewPadding}}
                            weekDaysTextStyle={{color: theme.colors.onBackground}}
                            headerButtonColor={theme.colors.primary}
                            monthContainerStyle={{backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.secondaryContainer}}
                            yearContainerStyle={{backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.secondaryContainer}}
                        />}
                buttonACK={<IconButton mode="contained" onPress={()=>confirmDate()} icon={"check"} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
                buttonCNL={<IconButton mode="contained" onPress={()=>cancelDate()} icon={"cancel"} style={{width: 50, backgroundColor: theme.colors.secondaryContainer}} />}
                buttonDEL={<IconButton mode="contained" onPress={()=>deleteDate()} icon={"delete"} style={{width: 50, backgroundColor: theme.colors.errorContainer}} iconColor={theme.colors.onErrorContainer}/>}
                />
            
        </Portal>
    )
    
}