import ModalContainer from "components/ModalContainer"
import { defaultViewPadding } from "configs"
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { eq, lt, gte, ne, and, or, like, asc, desc, exists, isNull, sql, inArray } from 'drizzle-orm';
import { db } from 'db/client';
import * as schema from "db/schema"
import { modalTexts, snackbarText, tabBarLabels } from "lib/textTemplates"
import { ScrollView, TouchableNativeFeedback, View } from "react-native"
import { IconButton, List, Text } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore"
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ItemType } from "interfaces";
import { useViewStore } from "stores/useViewStore";
import { useItemStore } from "stores/useItemStore";
import { useNavigation } from "@react-navigation/native";
import { useTextStore } from "stores/useTextStore";
import { determineAccessoryIcons } from "functions/determinators";

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
    const { setAlohaSnackbarVisible } = useViewStore()
    const { currentItem, setCurrentItem, currentCollection, currentAccessory } = useItemStore()
    const { setAlohaSnackbarText } = useTextStore()

    const navigation = useNavigation()

    const [checked, setChecked] = useState<string>(itemData && itemData[data] ? itemData[data] : "")
    const [collection, setCollection] = useState<"guns" | "accessories" | "parts" | "">("")

    const { data: accessoryData } = useLiveQuery(
        db.select()
        .from(schema.accessoryCollection)
        .where(
            eq(
                schema.accessoryCollection.id, itemData.id
            )
        )
    )

    const { data: partData } = useLiveQuery(
        db.select()
        .from(schema.partCollection)
        .where(
            eq(
                schema.partCollection.id, itemData.id
            )
        )
    )

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

    const { data: scopeData } = useLiveQuery(
        db.select()
        .from(schema.accessoryCollection_Scope)
        .where(
            ne(schema.accessoryCollection_Scope.id, itemData.id)
        )
        .orderBy(asc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Scope.manufacturer}, ""), ${schema.accessoryCollection_Scope.model})`)))
    )

    const { data: lightLaserData } = useLiveQuery(
        db.select()
        .from(schema.accessoryCollection_LightLaser)
        .where(
            ne(schema.accessoryCollection_LightLaser.id, itemData.id)
        )
        .orderBy(asc((sql`COALESCE(NULLIF(${schema.accessoryCollection_LightLaser.manufacturer}, ""), ${schema.accessoryCollection_LightLaser.model})`)))
    )

    const { data: magazineData } = useLiveQuery(
        db.select()
        .from(schema.accessoryCollection_Magazine)
        .where(
            ne(schema.accessoryCollection_Magazine.id, itemData.id)
        )
        .orderBy(asc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Magazine.manufacturer}, ""), ${schema.accessoryCollection_Magazine.model})`)))
    )


    const { data: conversionKitData } = useLiveQuery(
        db.select()
        .from(schema.partCollection_ConversionKit)
        .where(
            ne(schema.partCollection_ConversionKit.id, itemData.id)
        )
        .orderBy(asc((sql`COALESCE(NULLIF(${schema.partCollection_ConversionKit.manufacturer}, ""), ${schema.partCollection_ConversionKit.model})`)))
    )

    const { data: barrelData } = useLiveQuery(
        db.select()
        .from(schema.partCollection_Barrel)
        .where(
            ne(schema.partCollection_Barrel.id, itemData.id)
        )
        .orderBy(asc((sql`COALESCE(NULLIF(${schema.partCollection_Barrel.manufacturer}, ""), ${schema.partCollection_Barrel.model})`)))
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
        const selectedItem = [...gunData, ...silencerData, ...opticData, ...scopeData, ...lightLaserData, ...magazineData, ...barrelData, ...conversionKitData].find(item => item.id === checked)

        return selectedItem ? `${selectedItem.manufacturer ? selectedItem.manufacturer : ""} ${selectedItem.model}` : ""
}

    async function updateItemData(input: string){

        //This is if set via QuickMount/Remount

        if(!itemData && accessoryData.length !== 0){
            try{
                const mountableAccessory = currentAccessory ? currentAccessory :currentItem
                const type = await db.select().from(schema.accessoryCollection).where(eq(schema.accessoryCollection.id, mountableAccessory.id))

                await db.update(schema[type[0].type]).set({currentlyMountedOn: getItemName()})
            }catch(e){
                console.error(e)
            }
        }    
        if(!itemData && partData.length !== 0){
            const mountableAccessory = currentAccessory ? currentAccessory :currentItem
            const type = await db.select().from(schema.partCollection).where(eq(schema.partCollection.id, mountableAccessory.id))
            await db.update(schema[type[0].type]).set({currentlyMountedOn: getItemName()})
        }  

        //This is if set via NewItem or EditItem
        if(setItemData){
            setItemData({...itemData, [data]: input})
        }

        await db.delete(schema.accessoryMount)
            .where(eq(schema.accessoryMount.accessoryId, itemData.id));

        await db.delete(schema.partMount)
            .where(eq(schema.partMount.partId, itemData.id));
        
        if(checked !== ""){
            if(accessoryData.length !== 0 || currentCollection.startsWith("accessoryCollection_")){
                await db.insert(schema.accessoryMount).values({
                    id: uuidv4(),
                    accessoryId: itemData.id,
                    accessoryType: accessoryData[0] ? accessoryData[0].type : currentCollection,
                    parentGunId: collection === "guns" ? checked : null,
                    parentAccessoryId: collection === "accessories" ? checked : null,
                    parentPartId: collection === "parts" ? checked : null,
                })
            }
            if(partData.length !== 0 || currentCollection.startsWith("partCollection_")){
                await db.insert(schema.partMount).values({
                    id: uuidv4(),
                    partId: itemData.id,
                    partType: partData[0] ? partData[0].type : currentCollection,
                    parentGunId: collection === "guns" ? checked : null,
                    parentPartId: collection === "parts" ? checked : null,
                })
            }
        }
    }

    function handleConfirm(){
        


        const itemName = getItemName()

        updateItemData(itemName)
        if(setItemName){
            setItemName(itemName)
        }
        setShowModal(false)
        setAlohaSnackbarVisible(true)
        setAlohaSnackbarText(snackbarText.mountAccessory[language].replace("{{{A}}}", itemName))
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

    function handleSelect(id:string, collection: "guns" | "accessories" | "parts"){
        setChecked(id)
        setCollection(collection)
    }
    
    return(
        <ModalContainer
                title={modalTexts.mountedOn.title[language]}
                subtitle={modalTexts.mountedOn.text[language]}
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
        title={tabBarLabels.gunCollection[language]}
        style={gunData.some(item => item.id === checked) ? {backgroundColor: theme.colors.primary} : {}}
        titleStyle={gunData.some(item => item.id === checked) ? {color: theme.colors.onPrimary} : {}}
        left={props => <List.Icon {...props} icon={determineAccessoryIcons("gunCollection")} color={gunData.some(item => item.id === checked) ? theme.colors.onPrimary : ""} />}>
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

      {partData.length  === 0 ? <List.Accordion
        title={tabBarLabels.silencerCollection[language]}
        style={silencerData.some(item => item.id === checked) ? {backgroundColor: theme.colors.primary} : {}}
        titleStyle={silencerData.some(item => item.id === checked) ? {color: theme.colors.onPrimary} : {}}
        left={props => <List.Icon {...props} icon={determineAccessoryIcons("accessoryCollection_Silencer")} color={silencerData.some(item => item.id === checked) ? theme.colors.onPrimary : ""} />}>
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
      </List.Accordion> : null}

      {partData.length  === 0 ? <List.Accordion
        title={tabBarLabels.opticCollection[language]}
        style={opticData.some(item => item.id === checked) ? {backgroundColor: theme.colors.primary} : {}}
        titleStyle={opticData.some(item => item.id === checked) ? {color: theme.colors.onPrimary} : {}}
        left={props => <List.Icon {...props} icon={determineAccessoryIcons("accessoryCollection_Optic")} color={opticData.some(item => item.id === checked) ? theme.colors.onTertiary : ""} />}>
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
      </List.Accordion> : null}

      {partData.length  === 0 ? <List.Accordion
        title={tabBarLabels.scopeCollection[language]}
        style={scopeData.some(item => item.id === checked) ? {backgroundColor: theme.colors.primary} : {}}
        titleStyle={scopeData.some(item => item.id === checked) ? {color: theme.colors.onPrimary} : {}}
        left={props => <List.Icon {...props} icon={determineAccessoryIcons("accessoryCollection_Scope")} color={scopeData.some(item => item.id === checked) ? theme.colors.onTertiary : ""} />}>
        {scopeData.map((item, index) =>{
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
                            marginBottom: index === scopeData.length-1 ? 10 : 0
                        }}
                    >
                        <Text style={{padding: defaultViewPadding, width: "100%", color: item.id === checked ? theme.colors.onPrimary : ""}}>{`${item.manufacturer ? item.manufacturer : ""} ${item.model}`}</Text>
                    </View>
                </TouchableNativeFeedback>
            )
        })}
      </List.Accordion> : null}

      {partData.length  === 0 ? <List.Accordion
        title={tabBarLabels.lightLaserCollection[language]}
        style={lightLaserData.some(item => item.id === checked) ? {backgroundColor: theme.colors.primary} : {}}
        titleStyle={lightLaserData.some(item => item.id === checked) ? {color: theme.colors.onPrimary} : {}}
        left={props => <List.Icon {...props} icon={determineAccessoryIcons("accessoryCollection_LightLaser")} color={lightLaserData.some(item => item.id === checked) ? theme.colors.onTertiary : ""} />}>
        {lightLaserData.map((item, index) =>{
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
                            marginBottom: index === lightLaserData.length-1 ? 10 : 0
                        }}
                    >
                        <Text style={{padding: defaultViewPadding, width: "100%", color: item.id === checked ? theme.colors.onPrimary : ""}}>{`${item.manufacturer ? item.manufacturer : ""} ${item.model}`}</Text>
                    </View>
                </TouchableNativeFeedback>
            )
        })}
      </List.Accordion> : null}

      {partData.length  === 0 ? <List.Accordion
        title={tabBarLabels.magazineCollection[language]}
        style={magazineData.some(item => item.id === checked) ? {backgroundColor: theme.colors.primary} : {}}
        titleStyle={magazineData.some(item => item.id === checked) ? {color: theme.colors.onPrimary} : {}}
        left={props => <List.Icon {...props} icon={determineAccessoryIcons("accessoryCollection_Magazine")} color={magazineData.some(item => item.id === checked) ? theme.colors.onTertiary : ""} />}>
        {magazineData.map((item, index) =>{
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
                            marginBottom: index === magazineData.length-1 ? 10 : 0
                        }}
                    >
                        <Text style={{padding: defaultViewPadding, width: "100%", color: item.id === checked ? theme.colors.onPrimary : ""}}>{`${item.manufacturer ? item.manufacturer : ""} ${item.model}`}</Text>
                    </View>
                </TouchableNativeFeedback>
            )
        })}
      </List.Accordion> : null}

      <List.Accordion
        title={tabBarLabels.barrelCollection[language]}
        style={barrelData.some(item => item.id === checked) ? {backgroundColor: theme.colors.primary} : {}}
        titleStyle={barrelData.some(item => item.id === checked) ? {color: theme.colors.onPrimary} : {}}
        left={props => <List.Icon {...props} icon={determineAccessoryIcons("partCollection_Barrel")} color={barrelData.some(item => item.id === checked) ? theme.colors.onTertiary : ""} />}>
        {barrelData.map((item, index) =>{
            return(
                <TouchableNativeFeedback onPress={() => handleSelect(item.id, "parts")} key={item.id} >
                    <View 
                        style={{
                            paddingLeft: defaultViewPadding, 
                            paddingRight: defaultViewPadding, 
                            backgroundColor: getListItemBackgroundColor(item.id, index), 
                            width: "100%", 
                            display: "flex", 
                            flexDirection: "row", 
                            alignItems: "center", 
                            marginBottom: index === barrelData.length-1 ? 10 : 0
                        }}
                    >
                        <Text style={{padding: defaultViewPadding, width: "100%", color: item.id === checked ? theme.colors.onPrimary : ""}}>{`${item.manufacturer ? item.manufacturer : ""} ${item.model}`}</Text>
                    </View>
                </TouchableNativeFeedback>
            )
        })}
      </List.Accordion>


      <List.Accordion
        title={tabBarLabels.conversionCollection[language]}
        style={conversionKitData.some(item => item.id === checked) ? {backgroundColor: theme.colors.primary} : {}}
        titleStyle={conversionKitData.some(item => item.id === checked) ? {color: theme.colors.onPrimary} : {}}
        left={props => <List.Icon {...props} icon={determineAccessoryIcons("partCollection_ConversionKit")} color={opticData.some(item => item.id === checked) ? theme.colors.onTertiary : ""} />}>
        {conversionKitData.map((item, index) =>{
            return(
                <TouchableNativeFeedback onPress={() => handleSelect(item.id, "parts")} key={item.id} >
                    <View 
                        style={{
                            paddingLeft: defaultViewPadding, 
                            paddingRight: defaultViewPadding, 
                            backgroundColor: getListItemBackgroundColor(item.id, index), 
                            width: "100%", 
                            display: "flex", 
                            flexDirection: "row", 
                            alignItems: "center", 
                            marginBottom: index === conversionKitData.length-1 ? 10 : 0
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