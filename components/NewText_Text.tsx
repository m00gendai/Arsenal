import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import { GunType, AmmoType } from '../interfaces';
import { View, Pressable, Platform, Keyboard } from 'react-native';
import { currencyPrefixFields, numberTextFields, requiredFieldsAmmo, requiredFieldsGun } from '../configs';

interface Props{
    data: string
    itemData?: GunType | AmmoType 
    setItemData?: React.Dispatch<React.SetStateAction<GunType | AmmoType>>
    label: string
}

export default function NewText({data, itemData, setItemData, label}: Props){
    console.log(`${data}: STRING TEXT`)
    const [input, setInput] = useState<string>(itemData && itemData[data] ? itemData[data] : "")

    const [charCount, setCharCount] = useState(0)
    const [isBackspace, setIsBackspace] = useState<boolean>(false)
    const [isFocus, setFocus] = useState<boolean>(false)

    const MAX_CHAR_COUNT: number = 100

    function updateItemData(input:string | string[]){
        if(charCount < MAX_CHAR_COUNT){
            setCharCount(input !== undefined ? input.length : 0)
            setItemData({...itemData, [data]: Array.isArray(input) ? input : input.trim()})
        }
        if(charCount >= MAX_CHAR_COUNT && isBackspace){
            setCharCount(input !== undefined ? input.length : 0)
            setItemData({...itemData, [data]: Array.isArray(input) ? input : input.trim()})
        }
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
                        updateItemData(input)
                    }}
                    value={input ? input.toString() : ""}
                    editable={true}
                    showSoftInputOnFocus={true}
                    onChangeText={input => setInput(input)}
                    onKeyPress={({nativeEvent}) => setIsBackspace(nativeEvent.key === "Backspace" ? true : false)}
                    left={currencyPrefixFields.includes(data) ? <TextInput.Affix text="CHF " /> : null}
                    inputMode={`${numberTextFields.includes(data) ? "decimal" : "text"}`}
                    multiline={false}
                    returnKeyType='done'
                    returnKeyLabel='OK'
                    onSubmitEditing={()=>Keyboard.dismiss()}
                />
            </Pressable>
           
        </View>
    )
}