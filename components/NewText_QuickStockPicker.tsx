import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import { ItemType } from '../lib/interfaces';
import { View, Pressable, Platform, Keyboard } from 'react-native';
import { usePreferenceStore } from '../stores/usePreferenceStore';
import AccessoryMountDialog from './Dialogs/AccessoryMount/AccessoryMountDialog';
import QuickStockDialog from './Dialogs/QuickStockDialog';

interface Props{
    data: string
    itemData?: ItemType
    setItemData?: React.Dispatch<React.SetStateAction<ItemType>>
    label: string
}

export default function NewText({data, itemData, setItemData, label}: Props){

    const [showModal, setShowModal] = useState<boolean>(false)
    const [isFocus, setFocus] = useState<boolean>(false)

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
                    value={itemData && itemData[data] ? itemData[data] : ""}
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
           
            <QuickStockDialog showModal={showModal} setShowModal={setShowModal} data={data} itemData={itemData} setItemData={setItemData}/>

        </View>
    )
}