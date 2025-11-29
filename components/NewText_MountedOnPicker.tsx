import { IconButton, List, TextInput, Text, Searchbar, Chip, RadioButton } from 'react-native-paper';
import { useState } from 'react';
import { GunType, AmmoType, ItemType } from '../interfaces';
import { TouchableNativeFeedback, View, ScrollView, Pressable, Platform, Keyboard } from 'react-native';
import { calibers } from '../lib/caliberData';
import { usePreferenceStore } from '../stores/usePreferenceStore';
import { defaultViewPadding } from '../configs';
import ModalContainer from './ModalContainer';
import { caliberPickerStrings, modalTexts } from '../lib/textTemplates';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { db } from 'db/client';
import * as schema from "db/schema"
import { eq, lt, gte, ne, and, or, like, asc, desc, exists, isNull, sql, inArray } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { useItemStore } from 'stores/useItemStore';
import AccessoryMountDialog from './Dialogs/AccessoryMountDialog';

interface Props{
    data: string
    itemData?: ItemType
    setItemData?: React.Dispatch<React.SetStateAction<ItemType>>
    label: string
}

export default function NewText({data, itemData, setItemData, label}: Props){

    const [showModal, setShowModal] = useState<boolean>(false)

    const { language, theme } = usePreferenceStore()

    const [isFocus, setFocus] = useState<boolean>(false)
    
    const [itemName, setItemName] = useState<string>("")
    


    

    

    

    function handleFocus(){
        setFocus(true)
    }

    function handleInputPress(){
        Keyboard.dismiss()
        setShowModal(true)
    }

    

    

    return(
        <View style={{flex: 1}}>
            <Pressable style={{flex: 1}} onPress={()=>{Platform.OS === "android" ? handleInputPress() : null}}>
                <TextInput
                    label={`${label}`} 
                    style={{
                        flex: 1,
                    }}
                    onFocus={()=>handleFocus()}
                    onBlur={()=>setFocus(false)}
                    value={itemName}
                    editable={false}
                    showSoftInputOnFocus={true}
                    left={null}
                    inputMode={"text"}
                    multiline={true}
                    onPress={()=>{Platform.OS === "ios" ? handleInputPress() : null}}
                    returnKeyType='done'
                    returnKeyLabel='OK'
                    onSubmitEditing={()=>Keyboard.dismiss()}
                />
            </Pressable>
           
            <AccessoryMountDialog data={data} itemData={itemData} setItemData={setItemData} showModal={showModal} setShowModal={setShowModal} setItemName={setItemName}/>

        </View>
    )
}