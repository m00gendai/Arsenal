import { TextInput } from 'react-native-paper';
import { useRef, useState } from 'react';
import { GunType, AmmoType, ItemType } from 'lib/interfaces';
import { Pressable } from 'react-native';

interface Props{
    data: string
    itemData: ItemType
    setItemData: React.Dispatch<React.SetStateAction<ItemType>>
    label: string
}

export default function NewText({data, itemData, setItemData, label}: Props){
    
    const input = useRef<string|string[]>(itemData && itemData[data] ? itemData[data] : "")

    const [charCount, setCharCount] = useState(0)
    const [isBackspace, setIsBackspace] = useState<boolean>(false)
    const [isFocus, setFocus] = useState<boolean>(false)

    const MAX_CHAR_COUNT: number = 1000

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
                }}
                value={input.current ? input.current.toString() : ""}
                onKeyPress={({nativeEvent}) => setIsBackspace(nativeEvent.key === "Backspace" ? true : false)}
                onChangeText={(text) => {
                        updateItemData(text)
                    }}
                multiline={true}
                returnKeyType='done'
                returnKeyLabel='OK'
            />
        </Pressable>
    )
}