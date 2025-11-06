import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import { GunType, AmmoType } from 'interfaces';
import { Pressable } from 'react-native';

interface Props{
    data: string
    itemData?: GunType | AmmoType 
    setItemData?: React.Dispatch<React.SetStateAction<GunType | AmmoType>>
    label: string
}

export default function NewText({data, itemData, setItemData, label}: Props){
    console.log(`${data}: TEXT AREA`)
    const [input, setInput] = useState<string>(itemData && itemData[data] ? itemData[data] : "")
    const [charCount, setCharCount] = useState(0)
    const [isBackspace, setIsBackspace] = useState<boolean>(false)
    const [isFocus, setFocus] = useState<boolean>(false)

    const MAX_CHAR_COUNT: number = 1000

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
        <Pressable style={{flex: 1, height: 200}}>
            <TextInput
                label={`${label} ${isFocus ? `${charCount}/${MAX_CHAR_COUNT}` : ``}`} 
                style={{
                    height: 200
                }}
                onFocus={()=>handleFocus()}
                onBlur={()=>{
                    setFocus(false)
                    updateItemData(input)
                }}
                value={input ? input.toString() : ""}
                onKeyPress={({nativeEvent}) => setIsBackspace(nativeEvent.key === "Backspace" ? true : false)}
                onChangeText={input => setInput(input)}
                multiline={true}
                returnKeyType='done'
                returnKeyLabel='OK'
            />
        </Pressable>
    )
}