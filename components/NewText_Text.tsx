import { TextInput, Text, Portal, ThemeProvider } from 'react-native-paper';
import { useRef, useState } from 'react';
import { ItemType } from '../interfaces';
import { View, Pressable, Keyboard } from 'react-native';
import { currencyPrefixFields, defaultViewPadding, numberTextFields, requiredFieldsAmmo, requiredFieldsGun } from '../configs';
import { ScrollView } from 'react-native-gesture-handler';
import { usePreferenceStore } from 'stores/usePreferenceStore';
import Autocomplete from './Autocomplete';

interface Props{
    data: string
    itemData?: ItemType
    setItemData?: React.Dispatch<React.SetStateAction<ItemType>>
    label: string
}

export default function NewText({data, itemData, setItemData, label}: Props){

    const input = useRef<string|string[]>(itemData && itemData[data] ? itemData[data] : "")

    const [charCount, setCharCount] = useState(input.current?.length ?? 0)
    const [isBackspace, setIsBackspace] = useState<boolean>(false)
    const [isFocus, setFocus] = useState<boolean>(false)

    const { preferredUnits } = usePreferenceStore()

    const MAX_CHAR_COUNT: number = 100

    function updateItemData(text:string | string[]){
        if(charCount < MAX_CHAR_COUNT){
            setCharCount(text.length ?? 0)
            input.current = text
            setItemData({...itemData, [data]: Array.isArray(text) ? text : text.trim()})
        }
        if(charCount >= MAX_CHAR_COUNT && isBackspace){
            setCharCount(text.length ?? 0)
            input.current = text
            setItemData({...itemData, [data]: Array.isArray(text) ? text : text.trim()})
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
                    left={currencyPrefixFields.includes(data) ? <TextInput.Affix text={`${preferredUnits.selectedCurrency} `} /> : null}
                    inputMode={`${numberTextFields.includes(data) ? "decimal" : "text"}`}
                    multiline={false}
                    returnKeyType='done'
                    returnKeyLabel='OK'
                    onSubmitEditing={()=>Keyboard.dismiss()}
                />
            </Pressable>
            
            <Autocomplete title={label} data={data} inputText={input.current} updateItemData={updateItemData} charCount={charCount} isFocus={isFocus}/>

        </View>
    )
}