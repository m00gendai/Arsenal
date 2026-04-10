import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import { ItemType } from '../lib/interfaces';
import { View, Pressable, Platform, Keyboard } from 'react-native';
import { usePreferenceStore } from '../stores/usePreferenceStore';
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