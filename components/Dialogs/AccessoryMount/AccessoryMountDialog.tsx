import ModalContainer from "components/ModalContainer"
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { eq, ne, asc, sql, and} from 'drizzle-orm';
import { db } from 'db/client';
import * as schema from "db/schema"
import { ScrollView, View } from "react-native"
import { IconButton, List } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore"
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { CollectionType, ItemType } from "lib/interfaces";
import { useViewStore } from "stores/useViewStore";
import { useItemStore } from "stores/useItemStore";
import { useNavigation } from "@react-navigation/native";
import { useTextStore } from "stores/useTextStore";
import { determineAccessoryIcons, determineTabBarLabel } from "functions/determinators";
import { toastMessages } from "lib/Text/text_toastMessages";
import { modalTexts } from "lib/Text/text_modals";
import SelectRow from "./SelectRow";

interface Props{
    data: string
    itemData: ItemType
    setItemData?: React.Dispatch<React.SetStateAction<ItemType>>
    showModal: boolean
    setShowModal?: React.Dispatch<React.SetStateAction<boolean>>
    setItemName?: React.Dispatch<React.SetStateAction<string>>
    fromQuickMount?: boolean
}

export default function AccessoryMountDialog({data, itemData, setItemData, showModal, setShowModal, setItemName, fromQuickMount}: Props){

    const { language, theme } = usePreferenceStore()
    const { setAlohaSnackbarVisible } = useViewStore()
    const { currentItem, currentCollection, currentAccessory } = useItemStore()
    const { setAlohaSnackbarText } = useTextStore()

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
        .where(ne(schema.gunCollection.sold_isSold, true))
        .orderBy(asc((sql`COALESCE(NULLIF(${schema.gunCollection.manufacturer}, ""), ${schema.gunCollection.model})`)))
    )

    const { data: silencerData } = useLiveQuery(
        db.select()
        .from(schema.accessoryCollection_Silencer)
        .where(
            and(
                ne(schema.accessoryCollection_Silencer.sold_isSold, true),
                ne(schema.accessoryCollection_Silencer.id, itemData.id)
            ),
        )
        .orderBy(asc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Silencer.manufacturer}, ""), ${schema.accessoryCollection_Silencer.model})`)))
    )

    const { data: opticData } = useLiveQuery(
        db.select()
        .from(schema.accessoryCollection_Optic)
        .where(
            and(
                ne(schema.accessoryCollection_Optic.sold_isSold, true),
                ne(schema.accessoryCollection_Optic.id, itemData.id)
            )
        )
        .orderBy(asc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Optic.manufacturer}, ""), ${schema.accessoryCollection_Optic.model})`)))
    )

    const { data: scopeData } = useLiveQuery(
        db.select()
        .from(schema.accessoryCollection_Scope)
        .where(
            and(
                ne(schema.accessoryCollection_Scope.sold_isSold, true),
                ne(schema.accessoryCollection_Scope.id, itemData.id)
            )
        )
        .orderBy(asc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Scope.manufacturer}, ""), ${schema.accessoryCollection_Scope.model})`)))
    )

    const { data: lightLaserData } = useLiveQuery(
        db.select()
        .from(schema.accessoryCollection_LightLaser)
        .where(
            and(
                ne(schema.accessoryCollection_LightLaser.sold_isSold, true),
                ne(schema.accessoryCollection_LightLaser.id, itemData.id)
            )
        )
        .orderBy(asc((sql`COALESCE(NULLIF(${schema.accessoryCollection_LightLaser.manufacturer}, ""), ${schema.accessoryCollection_LightLaser.model})`)))
    )

    const { data: magazineData } = useLiveQuery(
        db.select()
        .from(schema.accessoryCollection_Magazine)
        .where(
            and(
                ne(schema.accessoryCollection_Magazine.sold_isSold, true),
                ne(schema.accessoryCollection_Magazine.id, itemData.id)
            )
        )
        .orderBy(asc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Magazine.manufacturer}, ""), ${schema.accessoryCollection_Magazine.model})`)))
    )

    const { data: miscAccessoryData } = useLiveQuery(
        db.select()
        .from(schema.accessoryCollection_Misc)
        .where(
            and(
                ne(schema.accessoryCollection_Misc.sold_isSold, true),
                ne(schema.accessoryCollection_Misc.id, itemData.id)
            )
        )
        .orderBy(asc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Misc.manufacturer}, ""), ${schema.accessoryCollection_Misc.model})`)))
    )


    const { data: conversionKitData } = useLiveQuery(
        db.select()
        .from(schema.partCollection_ConversionKit)
        .where(
            and(
                ne(schema.partCollection_ConversionKit.sold_isSold, true),
                ne(schema.partCollection_ConversionKit.id, itemData.id)
            )
        )
        .orderBy(asc((sql`COALESCE(NULLIF(${schema.partCollection_ConversionKit.manufacturer}, ""), ${schema.partCollection_ConversionKit.model})`)))
    )

    const { data: barrelData } = useLiveQuery(
        db.select()
        .from(schema.partCollection_Barrel)
        .where(
            and(
                ne(schema.partCollection_Barrel.sold_isSold, true),
                ne(schema.partCollection_Barrel.id, itemData.id)
            )
        )
        .orderBy(asc((sql`COALESCE(NULLIF(${schema.partCollection_Barrel.manufacturer}, ""), ${schema.partCollection_Barrel.model})`)))
    )

    function getItemName(){
        const selectedItem = [...gunData, ...silencerData, ...opticData, ...scopeData, ...lightLaserData, ...magazineData, ...miscAccessoryData, ...barrelData, ...conversionKitData].find(item => item.id === checked)

        return selectedItem ? `${selectedItem.manufacturer ? selectedItem.manufacturer : ""} ${selectedItem.model}` : ""
    }

    async function updateItemData(input: string){

        //This is if set via QuickMount/Remount

        if(fromQuickMount && currentCollection.startsWith("accessoryCollection_")){

            try{
                const mountableAccessory = currentAccessory ? currentAccessory : currentItem
                
                const type = await db.select().from(schema.accessoryCollection).where(eq(schema.accessoryCollection.id, mountableAccessory.id))

                await db.update(schema[type[0].type]).set({currentlyMountedOn: getItemName()}).where(eq(schema[type[0].type].id, mountableAccessory.id))
            }catch(e){
                console.error(`Update QuickMount accessoryData: ${e}`)
            }
        }    
        try{
            if(fromQuickMount && partData.length !== 0){
                const mountableAccessory = currentAccessory ? currentAccessory :currentItem
                const type = await db.select().from(schema.partCollection).where(eq(schema.partCollection.id, mountableAccessory.id))
                await db.update(schema[type[0].type]).set({currentlyMountedOn: getItemName()}).where(eq(schema[type[0].type].id, mountableAccessory.id))
            }  
        }catch(e){
            console.error(`Update QuickMount partData: ${e}`)
        }

        //This is if set via NewItem or EditItem
        if(!fromQuickMount){
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
        setAlohaSnackbarText(toastMessages.mountAccessory[language].replace("{{{A}}}", itemName))
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

    const accordionConstructorArray:{data:any, collection: CollectionType, category: "guns" | "accessories" | "parts"}[] = [
        {
            data: gunData,
            collection: "gunCollection",
            category: "guns"
        },
        {
            data: silencerData,
            collection: "accessoryCollection_Silencer",
            category: "accessories"
        },
        {
            data: opticData,
            collection: "accessoryCollection_Optic",
            category: "accessories"
        },
        {
            data: scopeData,
            collection: "accessoryCollection_Scope",
            category: "accessories"
        },
        {
            data: lightLaserData,
            collection: "accessoryCollection_LightLaser",
            category: "accessories"
        },
        {
            data: magazineData,
            collection: "accessoryCollection_Magazine",
            category: "accessories"
        },
        {
            data: miscAccessoryData,
            collection: "accessoryCollection_Misc",
            category: "accessories"
        },
        {
            data: barrelData,
            collection: "partCollection_Barrel",
            category: "parts"
        },
        {
            data: conversionKitData,
            collection: "partCollection_ConversionKit",
            category: "parts"
        },
    ]

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
                            {accordionConstructorArray.map((accordion, index) =>{
                                return(
                                    <List.Accordion
                                    key={`quickMount_${accordion}_${index}`}
                                        title={determineTabBarLabel(accordion.collection)[language]}
                                        style={accordion.data.some(item => item.id === checked) ? {backgroundColor: theme.colors.primary} : {}}
                                        titleStyle={accordion.data.some(item => item.id === checked) ? {color: theme.colors.onPrimary} : {}}
                                        left={props => <List.Icon {...props} icon={determineAccessoryIcons(accordion.collection)} color={gunData.some(item => item.id === checked) ? theme.colors.onPrimary : ""} />}
                                    >
                                        {accordion.data.map((item, index) =>{
                                            return (
                                                <SelectRow 
                                                    key={`${accordion.collection}_selectRow_${index}`}
                                                    checked={checked} 
                                                    setChecked={setChecked} 
                                                    setCollection={setCollection} 
                                                    item={item} 
                                                    index={index} 
                                                    listLength={accordion.data.length-1} 
                                                    category={accordion.category} 
                                                    collection={accordion.collection}
                                                />
                                            )
                                        })}
                                    </List.Accordion>
                                )
                            })}
                        </List.Section>
                    </ScrollView>
                </View>
            }
            buttonACK={<IconButton icon="check" onPress={() => handleConfirm()} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
            buttonCNL={<IconButton icon="cancel" onPress={() => handleCancel()} style={{width: 50, backgroundColor: theme.colors.secondaryContainer}} iconColor={theme.colors.onSecondaryContainer} />}
            buttonDEL={<IconButton mode="contained" onPress={()=>deleteMounting()} icon={"delete"} style={{width: 50, backgroundColor: theme.colors.errorContainer}} iconColor={theme.colors.onErrorContainer}/>}
        />
    )
}