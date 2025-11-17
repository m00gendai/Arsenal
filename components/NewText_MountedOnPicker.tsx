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
    const [checked, setChecked] = useState<string>(itemData && itemData[data] ? itemData[data] : "")

    const { data: gunData } = useLiveQuery(
        db.select()
        .from(schema.gunCollection)
        .orderBy(asc((sql`COALESCE(NULLIF(${schema.gunCollection.manufacturer}, ""), ${schema.gunCollection.model})`)))
    )


    function updateItemData(input: string){
        setItemData({...itemData, [data]: input})
    }

    function handleConfirm(){
        updateItemData(checked)
        setShowModal(false)
    }

    function handleCancel(){
        setShowModal(false)
    }

    function handleFocus(){
        setFocus(true)
    }

    function handleInputPress(){
        Keyboard.dismiss()
        setShowModal(true)
    }

    function getGunName(){
        const selectedGun = gunData.find(gun => gun.id === checked)
        return selectedGun ? `${selectedGun.manufacturer ? selectedGun.manufacturer : ""} ${selectedGun.model}` : ""
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
                    value={checked ? getGunName() : ""}
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
           
            <ModalContainer
                title={modalTexts.caliberPicker.title[language]}
                subtitle={modalTexts.caliberPicker.text[language]}
                visible={showModal}
                setVisible={setShowModal}
                content={
                    <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap", width: "100%", height: "100%"}}>
                                <ScrollView style={{display: "flex", flexDirection: "column", flexWrap: "wrap", width: "100%", height: "100%", padding: defaultViewPadding}}>
                    {gunData.map(gun =>{
                        return (
                            <View key={gun.id} style={{width: "100%", display: "flex", flexDirection: "row"}}>
                                <Text style={{width: "80%"}}>{`${gun.manufacturer ? gun.manufacturer : ""} ${gun.model}`}</Text>
                                <RadioButton 
                                    value={gun.id}
                                    status={ checked === gun.id ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked(gun.id)}
                                />
                            </View>
                        )
                    })
                }</ScrollView>
                            </View>}
                buttonACK={<IconButton icon="check" onPress={() => handleConfirm()} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
                buttonCNL={<IconButton icon="cancel" onPress={() => handleCancel()} style={{width: 50, backgroundColor: theme.colors.secondaryContainer}} iconColor={theme.colors.onSecondaryContainer} />}
                buttonDEL={null}
            />

        </View>
    )
}