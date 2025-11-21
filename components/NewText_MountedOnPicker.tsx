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

interface Props{
    data: string
    itemData?: ItemType
    setItemData?: React.Dispatch<React.SetStateAction<ItemType>>
    label: string
}

export default function NewText({data, itemData, setItemData, label}: Props){

    const [showModal, setShowModal] = useState<boolean>(false)
    const { currentItem }= useItemStore()
    const { language, theme } = usePreferenceStore()

    const [isFocus, setFocus] = useState<boolean>(false)
    const [checked, setChecked] = useState<string>(itemData && itemData[data] ? itemData[data] : "")

    const { data: gunData } = useLiveQuery(
        db.select()
        .from(schema.gunCollection)
        .orderBy(asc((sql`COALESCE(NULLIF(${schema.gunCollection.manufacturer}, ""), ${schema.gunCollection.model})`)))
    )

    const { data: silencerData } = useLiveQuery(
        db.select()
        .from(schema.accessoryCollection_Silencer)
        .where(
            ne(schema.accessoryCollection_Silencer.id, currentItem.id)
        )
        .orderBy(asc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Silencer.manufacturer}, ""), ${schema.accessoryCollection_Silencer.model})`)))
    )


    async function updateItemData(input: string){
        setItemData({...itemData, [data]: input})
        console.log(checked)
        await db.insert(schema.accessoryMount)
        .values(
            {
                id: uuidv4(),
                accessoryId: itemData.id,
                parentGunId: checked,
                parentAccessoryId: null
            }
        )
        .onConflictDoUpdate({
            target: schema.accessoryMount.id,
            set: { 
                accessoryId: itemData.id,
                parentGunId: checked,
                parentAccessoryId: null 
            },
        });
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
                                <ScrollView 
                                    style={{width: "100%", height: "100%"}}
                                    contentContainerStyle={{display: "flex", flexDirection: "column", flexWrap: "wrap", justifyContent: "center", alignItems: "center", width: "100%" }}
                                >
                                    <List.Section style={{width: "100%"}}>
      <List.Accordion
        title="Waffen"
        left={props => <List.Icon {...props} icon="pistol" />}>
        {gunData.map((item, index) =>{
            return (
                <TouchableNativeFeedback onPress={() => setChecked(item.id)} key={item.id} >
                    <View 
                        style={{
                            paddingLeft: defaultViewPadding, 
                            paddingRight: defaultViewPadding, 
                            backgroundColor: index % 2 === 0 ? "" : theme.colors.tertiaryContainer, 
                            width: "100%", 
                            display: "flex", 
                            flexDirection: "row", 
                            alignItems: "center", 
                            marginBottom: index === gunData.length-1 ? 10 : 0
                        }}
                    >
                        <Text style={{width: "80%"}}>{`${item.manufacturer ? item.manufacturer : ""} ${item.model}`}</Text>
                        <View style={{width: "20%", display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                            <RadioButton 
                                value={item.id}
                                status={ checked === item.id ? 'checked' : 'unchecked' }
                            />
                        </View>
                    </View>
                </TouchableNativeFeedback>
            )
        })}
      </List.Accordion>

      <List.Accordion
        title="Schalldämpfer"
        left={props => <List.Icon {...props} icon="volume-mute" />}>
        {silencerData.map((item, index) =>{
            return(
                <TouchableNativeFeedback onPress={() => setChecked(item.id)} key={item.id} >
                    <View 
                        style={{
                            paddingLeft: defaultViewPadding, 
                            paddingRight: defaultViewPadding, 
                            backgroundColor: index % 2 === 0 ? "" : theme.colors.tertiaryContainer, 
                            width: "100%", 
                            display: "flex", 
                            flexDirection: "row", 
                            alignItems: "center", 
                            marginBottom: index === silencerData.length-1 ? 10 : 0
                        }}
                    >
                        <Text style={{width: "80%"}}>{`${item.manufacturer ? item.manufacturer : ""} ${item.model}`}</Text>
                        <View style={{width: "20%", display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                            <RadioButton 
                                value={item.id}
                                status={ checked === item.id ? 'checked' : 'unchecked' }
                            />
                        </View>
                    </View>
                </TouchableNativeFeedback>
            )
        })}
      </List.Accordion>
    </List.Section>
                    
                </ScrollView>
                            </View>}
                buttonACK={<IconButton icon="check" onPress={() => handleConfirm()} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
                buttonCNL={<IconButton icon="cancel" onPress={() => handleCancel()} style={{width: 50, backgroundColor: theme.colors.secondaryContainer}} iconColor={theme.colors.onSecondaryContainer} />}
                buttonDEL={null}
            />

        </View>
    )
}