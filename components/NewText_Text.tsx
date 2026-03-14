import { TextInput, Text, Portal, ThemeProvider, IconButton } from 'react-native-paper';
import { useRef, useState } from 'react';
import { ItemType } from '../lib/interfaces';
import { View, Pressable, Keyboard } from 'react-native';
import { barrelLengthPrefixFields, bulletWeightPrefixFields, currencyPrefixFields, defaultViewPadding, numberTextFields, requiredFieldsAmmo, requiredFieldsGun, unitFields_Length, unitFields_Weight } from '../configs/configs';
import { ScrollView } from 'react-native-gesture-handler';
import { usePreferenceStore } from 'stores/usePreferenceStore';
import Autocomplete from './Autocomplete';
import { convertLengthUnitsToMillimeter, convertLengthUnitsToPreferredUnit, convertWeightUnitsToMilligram, convertWeightUnitsToPreferredUnit } from 'functions/utils';
import OCR from './OCR';

interface Props{
    data: string
    itemData?: ItemType
    setItemData?: React.Dispatch<React.SetStateAction<ItemType>>
    label: string
}

export default function NewText({data, itemData, setItemData, label}: Props){

    const { preferredUnits } = usePreferenceStore()
    const [ocrVisible, setOcrVisible] = useState<boolean>(false)

    function handleConversions(itemData:ItemType, data:string){
        if(unitFields_Weight.includes(data)){
            return convertWeightUnitsToPreferredUnit(preferredUnits, data, itemData[data])
        }
        if(unitFields_Length.includes(data)){
            return convertLengthUnitsToPreferredUnit(preferredUnits, data, itemData[data])
        }
        return itemData[data]
    }

    const input = useRef<string>(itemData && itemData[data] ? handleConversions(itemData, data) : "")

    const [charCount, setCharCount] = useState(input.current?.length ?? 0)
    const [isBackspace, setIsBackspace] = useState<boolean>(false)
    const [isFocus, setFocus] = useState<boolean>(false)

    const MAX_CHAR_COUNT: number = 100

    function updateItemData(text:string){
        let determinedText: string
        if(unitFields_Weight.includes(data)){
            determinedText = convertWeightUnitsToMilligram(preferredUnits, data, text)
        } else if(unitFields_Length.includes(data)){
            determinedText = convertLengthUnitsToMillimeter(preferredUnits, data, text)
        }else {
            determinedText = text
        }
        
        if(charCount < MAX_CHAR_COUNT){
            setCharCount(text.length ?? 0)
            input.current = text
            setItemData({...itemData, [data]: Array.isArray(determinedText) ? determinedText : determinedText.trim()})
        }
        if(charCount >= MAX_CHAR_COUNT && isBackspace){
            setCharCount(text.length ?? 0)
            input.current = text
            setItemData({...itemData, [data]: Array.isArray(determinedText) ? determinedText : determinedText.trim()})
        }
    }

    function handleFocus(){
        setFocus(true)
        if(input === undefined){
            setCharCount(0)
        } else if(input === null){
            setCharCount(0)
        } else {
            setCharCount(input.current.toString().length)
        }
    }

    return(
        <View style={{flex: 1}}>
            <Pressable style={{flex: 1}}>
                <TextInput
                    label={`${label}${requiredFieldsGun.includes(data) ? "*" : requiredFieldsAmmo.includes(data) ? "*" : ""} ${isFocus ? `${charCount}/${MAX_CHAR_COUNT}` : ``}`} 
                    style={{
                        flex: 1,
                    }}
                    onFocus={()=>handleFocus()}
                    onBlur={()=>{
                        setFocus(false)
                    }}
                    value={input.current ? input.current.toString() : ""}
                    editable={true}
                    showSoftInputOnFocus={true}
                    onChangeText={(text) => {
                        updateItemData(text)
                    }}
                    onKeyPress={({nativeEvent}) => setIsBackspace(nativeEvent.key === "Backspace" ? true : false)}
                    left={
                        currencyPrefixFields.includes(data) ? 
                        <TextInput.Affix text={`${preferredUnits.selectedCurrency} `} /> 
                        : 
                        bulletWeightPrefixFields.includes(data) ? 
                        <TextInput.Affix text={`${preferredUnits.bulletWeightUnit} `} /> 
                        :
                        barrelLengthPrefixFields.includes(data) ? 
                        <TextInput.Affix text={`${preferredUnits.barrelLengthUnit} `} /> 
                        :
                        null
                    }
                    inputMode={`${numberTextFields.includes(data) ? "decimal" : "text"}`}
                    multiline={false}
                    returnKeyType='done'
                    returnKeyLabel='OK'
                    onSubmitEditing={()=>Keyboard.dismiss()}
                />
                {/*<IconButton icon="text-recognition" style={{position: "absolute", right: 0}} onPress={()=>setOcrVisible(true)}/>*/}
            </Pressable>

            <Autocomplete title={label} data={data} inputText={input.current} updateItemData={updateItemData} charCount={charCount} isFocus={isFocus}/>
            <OCR ocrVisible={ocrVisible} setOcrVisible={setOcrVisible}/>
        </View>
    )
}