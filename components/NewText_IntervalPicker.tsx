import { IconButton, TextInput, Text, RadioButton, Divider } from 'react-native-paper';
import { useState } from 'react';
import { GunType, AmmoType, ItemType } from '../interfaces';
import { TouchableNativeFeedback, View, ScrollView, Pressable, Platform, Keyboard } from 'react-native';
import { usePreferenceStore } from '../stores//usePreferenceStore';
import { defaultViewPadding } from '../configs';
import ModalContainer from './ModalContainer';
import { cleanIntervals, modalTexts } from '../lib/textTemplates';

interface Props{
    data: string
    itemData?: ItemType
    setItemData?: React.Dispatch<React.SetStateAction<ItemType>>
    label: string
}

export default function NewText({data, itemData, setItemData, label}: Props){

    const [input, setInput] = useState<string>(itemData && itemData[data] ? itemData[data] : "")
    const [showCleanModal, setShowCleanModal] = useState<boolean>(false)
    const [checked, setChecked] = useState<string>("-")

    const { language, theme } = usePreferenceStore()

    const [charCount, setCharCount] = useState(0)
    const [isBackspace, setIsBackspace] = useState<boolean>(false)
    const [isFocus, setFocus] = useState<boolean>(false)

    const MAX_CHAR_COUNT: number = 100

    const cleanIntervalOptions:string[] = ["none", "day_1", "day_7", "day_14", "month_1", "month_3", "month_6", "month_9", "year_1", "year_5", "year_10"]    

    function updateItemData(input:string | string[]){
        if(charCount < MAX_CHAR_COUNT){
            setCharCount(input !== undefined ? input.length : 0)
            setInput(Array.isArray(input) ? input.join("\n") : input)
            setItemData({...itemData, [data]: Array.isArray(input) ? input : input.trim()})
        }
        if(charCount >= MAX_CHAR_COUNT && isBackspace){
            setCharCount(input !== undefined ? input.length : 0)
            setInput(Array.isArray(input) ? input.join("\n") : input)
            setItemData({...itemData, [data]: Array.isArray(input) ? input : input.trim()})
        }
    }

    function handleCleanIntervalConfirm(){
        updateItemData(checked)
        setShowCleanModal(false)
    }

    function handleCleanIntervalCancel(){
        setShowCleanModal(false)
    }

    function handleFocus(){
        setFocus(true)
        if(input === undefined){
            setCharCount(0)
        } else if(input === null){
            setCharCount(0)
        } else {
            setCharCount(input.toString().length)
        }
    }

    function handleInputPress(){
        Keyboard.dismiss()
        setShowCleanModal(true) 
    }

    return(
        <View style={{flex: 1}}>
            <Pressable style={{flex: 1}} onPress={()=>{Platform.OS === "android" ? handleInputPress() : null}}>
                <TextInput
                    label={`${label} ${isFocus ? `${charCount}/${MAX_CHAR_COUNT}` : ``}`} 
                    style={{
                        flex: 1,
                    }}
                    onFocus={()=>handleFocus()}
                    onBlur={()=>setFocus(false)}
                    value={input ? cleanIntervals[input][language] : ""}
                    editable={false}
                    showSoftInputOnFocus={true}
                    onChangeText={input => updateItemData(input)}
                    onKeyPress={({nativeEvent}) => setIsBackspace(nativeEvent.key === "Backspace" ? true : false)}
                    left={null}
                    inputMode={"text"}
                    multiline={false}
                    onPress={()=>{Platform.OS === "ios" ? handleInputPress() : null}}
                    returnKeyType='done'
                    returnKeyLabel='OK'
                    onSubmitEditing={()=>Keyboard.dismiss()}
                />
            </Pressable>
           
            <ModalContainer
                title={modalTexts.cleanInterval.title[language]}
                subtitle={modalTexts.cleanInterval.text[language]}
                visible={showCleanModal}
                setVisible={setShowCleanModal}
                content={
                    <View style={{width: "100%", display: "flex", padding: defaultViewPadding}}>
                        <ScrollView>
                        {cleanIntervalOptions.map((option, index)=>{
                            return (
                                <View key={`cleanIntervalOption__${index}`}>
                                    <TouchableNativeFeedback onPress={() => setChecked(option)}>
                                        <View style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center", marginBottom: defaultViewPadding, marginTop: defaultViewPadding}}>
                                            <Text style={{flex: 9}}>{cleanIntervals[option][language]}</Text>
                                            <RadioButton
                                                value={option}
                                                status={ checked === option ? 'checked' : 'unchecked' }
                                                onPress={() => setChecked(option)}
                                            />
                                        </View>
                                    </TouchableNativeFeedback>
                                    {index < cleanIntervalOptions.length-1 ? <Divider /> : null}
                                </View>
                            )
                        })}
                        </ScrollView>
                    </View>
                }
                buttonACK={<IconButton icon="check" onPress={() => handleCleanIntervalConfirm()} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
                buttonCNL={<IconButton icon="cancel" onPress={() => handleCleanIntervalCancel()} style={{width: 50, backgroundColor: theme.colors.secondaryContainer}} iconColor={theme.colors.onSecondaryContainer} />}
                buttonDEL={null}
            />

        </View>
    )
}