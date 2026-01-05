import { TextInput, Text, Portal, ThemeProvider } from 'react-native-paper';
import { useRef, useState } from 'react';
import { ItemType } from '../interfaces';
import { View, Pressable, Keyboard } from 'react-native';
import { currencyPrefixFields, defaultViewPadding, numberTextFields, requiredFieldsAmmo, requiredFieldsGun } from '../configs';
import { ScrollView } from 'react-native-gesture-handler';
import * as schema from "db/schema"
import { db } from "db/client"
import { eq, asc } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { usePreferenceStore } from 'stores/usePreferenceStore';

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
    const [rerender, setRerender] = useState(0)

    const { language, theme, generalSettings, preferredUnits } = usePreferenceStore()

    const {data: autocompleteData } = useLiveQuery(db.select()
        .from(schema.autocomplete)
        .where(
          eq(
              schema.autocomplete.field, data
          )
        )
        .orderBy(asc(schema.autocomplete.label))
    )

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

    function handleAutocomplete(text: string){
        console.log(text)
        updateItemData(text)
        console.log(rerender)
        setRerender(rerender => rerender + 1)
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
            
            {charCount >= 2 && isFocus ? 
            <Portal>
                <View 
                    style={{position: "absolute", bottom: 0, backgroundColor: theme.colors.primaryContainer, width: "100%", elevation: 5, maxHeight: "33%", padding: defaultViewPadding}}
                    
                >
                    <ScrollView keyboardShouldPersistTaps="handled">
                        {autocompleteData.map((data, index) =>{
                            if(data.label.toLowerCase().includes((input.current as string).toLowerCase())){
                                return (
                                    <Pressable 
                                        style={{padding: defaultViewPadding, backgroundColor: index%2 === 1 ? theme.colors.background : theme.colors.tertiaryContainer}}
                                        onPress={()=>handleAutocomplete(data.label)}
                                        key={data.id}
                                    >
                                        <Text>{data.label}</Text>
                                    </Pressable>
                                )
                            }
                        })}
                    </ScrollView>
                </View>
            </Portal>
            :
            null
            }
        </View>
    )
}