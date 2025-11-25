import ModalContainer from "components/ModalContainer"
import { defaultViewPadding } from "configs"
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { eq, lt, gte, ne, and, or, like, asc, desc, exists, isNull, sql, inArray } from 'drizzle-orm';
import { db } from 'db/client';
import * as schema from "db/schema"
import { modalTexts } from "lib/textTemplates"
import { ScrollView, TouchableNativeFeedback, View } from "react-native"
import { IconButton, List, Text } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore"
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ItemType } from "interfaces";

interface Props{
    data: string
    itemData?: ItemType
    setItemData?: React.Dispatch<React.SetStateAction<ItemType>>
    showModal: boolean
    setShowModal?: React.Dispatch<React.SetStateAction<boolean>>
    setItemName?: React.Dispatch<React.SetStateAction<string>>
}

export default function AccessoryMountDialog({data, itemData, setItemData, showModal, setShowModal, setItemName}: Props){

    const { language, theme } = usePreferenceStore()

    const [checked, setChecked] = useState<string>(itemData && itemData[data] ? itemData[data] : "")
    const [collection, setCollection] = useState<"guns" | "accessories" | "">("")

    const { data: gunData } = useLiveQuery(
        db.select()
        .from(schema.gunCollection)
        .orderBy(asc((sql`COALESCE(NULLIF(${schema.gunCollection.manufacturer}, ""), ${schema.gunCollection.model})`)))
    )

    const { data: silencerData } = useLiveQuery(
        db.select()
        .from(schema.accessoryCollection_Silencer)
        .where(
            ne(schema.accessoryCollection_Silencer.id, itemData.id)
        )
        .orderBy(asc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Silencer.manufacturer}, ""), ${schema.accessoryCollection_Silencer.model})`)))
    )

    const { data: opticData } = useLiveQuery(
        db.select()
        .from(schema.accessoryCollection_Optic)
        .where(
            ne(schema.accessoryCollection_Optic.id, itemData.id)
        )
        .orderBy(asc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Optic.manufacturer}, ""), ${schema.accessoryCollection_Optic.model})`)))
    )

    function getListItemBackgroundColor(id, index){
        if(id === checked){
            return theme.colors.tertiary
        }  
        if(index % 2 !== 0){
            return theme.colors.tertiaryContainer
        }
        return theme.colors.background
    }

    function getItemName(){
        if(setItemName){
        const selectedItem = [...gunData, ...silencerData, ...opticData].find(item => item.id === checked)

        setItemName(selectedItem ? `${selectedItem.manufacturer ? selectedItem.manufacturer : ""} ${selectedItem.model}` : "")
        }
    }

    async function updateItemData(input: string){
        // TODO: Update Item itself
        if(setItemData){
            setItemData({...itemData, [data]: input})
        }
        await db.delete(schema.accessoryMount)
        .where(eq(schema.accessoryMount.accessoryId, itemData.id));

        if(checked !== ""){
            await db.insert(schema.accessoryMount).values({
                id: uuidv4(),
                accessoryId: itemData.id,
                parentGunId: collection === "guns" ? checked : null,
                parentAccessoryId: collection === "accessories" ? checked : null,
            })
        }
    }

    function handleConfirm(){
        updateItemData(checked)
        getItemName()
        setShowModal(false)
    }

    function handleCancel(){
        setShowModal(false)
    }

    async function deleteMounting(){
        setChecked("")
        if(setItemData){
            setItemData({...itemData, [data]: null})
                }
                        await db.delete(schema.accessoryMount)
        .where(eq(schema.accessoryMount.accessoryId, itemData.id));
    }

    function handleSelect(id:string, collection: "guns" | "accessories"){
        setChecked(id)
        setCollection(collection)
    }
    
    return(
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
        style={gunData.some(item => item.id === checked) ? {backgroundColor: theme.colors.primary} : {}}
        titleStyle={gunData.some(item => item.id === checked) ? {color: theme.colors.onPrimary} : {}}
        left={props => <List.Icon {...props} icon="pistol" color={gunData.some(item => item.id === checked) ? theme.colors.onPrimary : ""} />}>
        {gunData.map((item, index) =>{
            return (
                <TouchableNativeFeedback onPress={() => handleSelect(item.id, "guns")} key={item.id} >
                    <View 
                        style={{
                            paddingLeft: defaultViewPadding, 
                            paddingRight: defaultViewPadding, 
                            backgroundColor: getListItemBackgroundColor(item.id, index), 
                            width: "100%", 
                            display: "flex", 
                            flexDirection: "row", 
                            alignItems: "center", 
                            marginBottom: index === gunData.length-1 ? 10 : 0
                        }}
                    >
                        <Text style={{padding: defaultViewPadding, width: "100%", color: item.id === checked ? theme.colors.onTertiary : ""}}>{`${item.manufacturer ? item.manufacturer : ""} ${item.model}`}</Text>
                    </View>
                </TouchableNativeFeedback>
            )
        })}
      </List.Accordion>

      <List.Accordion
        title="Schalldämpfer"
        style={silencerData.some(item => item.id === checked) ? {backgroundColor: theme.colors.primary} : {}}
        titleStyle={silencerData.some(item => item.id === checked) ? {color: theme.colors.onPrimary} : {}}
        left={props => <List.Icon {...props} icon="volume-mute" color={silencerData.some(item => item.id === checked) ? theme.colors.onPrimary : ""} />}>
        {silencerData.map((item, index) =>{
            return(
                <TouchableNativeFeedback onPress={() => handleSelect(item.id, "accessories")} key={item.id} >
                    <View 
                        style={{
                            paddingLeft: defaultViewPadding, 
                            paddingRight: defaultViewPadding, 
                            backgroundColor: getListItemBackgroundColor(item.id, index), 
                            width: "100%", 
                            display: "flex", 
                            flexDirection: "row", 
                            alignItems: "center", 
                            marginBottom: index === silencerData.length-1 ? 10 : 0
                        }}
                    >
                        <Text style={{padding: defaultViewPadding, width: "100%", color: item.id === checked ? theme.colors.onTertiary : ""}}>{`${item.manufacturer ? item.manufacturer : ""} ${item.model}`}</Text>
                    </View>
                </TouchableNativeFeedback>
            )
        })}
      </List.Accordion>

      <List.Accordion
        title="Optiken"
        style={opticData.some(item => item.id === checked) ? {backgroundColor: theme.colors.primary} : {}}
        titleStyle={opticData.some(item => item.id === checked) ? {color: theme.colors.onPrimary} : {}}
        left={props => <List.Icon {...props} icon="toslink" color={opticData.some(item => item.id === checked) ? theme.colors.onTertiary : ""} />}>
        {opticData.map((item, index) =>{
            return(
                <TouchableNativeFeedback onPress={() => handleSelect(item.id, "accessories")} key={item.id} >
                    <View 
                        style={{
                            paddingLeft: defaultViewPadding, 
                            paddingRight: defaultViewPadding, 
                            backgroundColor: getListItemBackgroundColor(item.id, index), 
                            width: "100%", 
                            display: "flex", 
                            flexDirection: "row", 
                            alignItems: "center", 
                            marginBottom: index === opticData.length-1 ? 10 : 0
                        }}
                    >
                        <Text style={{padding: defaultViewPadding, width: "100%", color: item.id === checked ? theme.colors.onPrimary : ""}}>{`${item.manufacturer ? item.manufacturer : ""} ${item.model}`}</Text>
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
                buttonDEL={<IconButton mode="contained" onPress={()=>deleteMounting()} icon={"delete"} style={{width: 50, backgroundColor: theme.colors.errorContainer}} iconColor={theme.colors.onErrorContainer}/>}
            />
    )
}