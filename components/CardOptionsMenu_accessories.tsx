import { NavigationProp, useNavigation } from "@react-navigation/native";
import { cardActionsMountedOn, defaultCardOptionsMenuIconSize, defaultViewPadding } from "configs";
import * as schema from "db/schema"
import { db } from "db/client"
import { eq } from 'drizzle-orm';
import { determineCardOptions } from "functions/determinators";
import { ItemType, StackParamList } from "interfaces";
import { gunDeleteAlert, longPressActions, snackbarText } from "lib/textTemplates";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Button, Card, Dialog, Icon, Modal, Portal, Text } from "react-native-paper";
import { useItemStore } from "stores/useItemStore";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { useViewStore } from "stores/useViewStore";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useTextStore } from "stores/useTextStore";


export default function CardOptionsMenu_accessories(){

    const { language, theme } = usePreferenceStore()
    const { cardOptionsMenuVisible_accessories, setCardOptionsMenuVisible_accessories, setAlohaSnackbarVisible } = useViewStore()
    const { currentCollection, currentItem, setCurrentItem, currentAccessory } = useItemStore()  
    const { setAlohaSnackbarText } = useTextStore()

    const [deleteDialogVisible, toggleDeleteDialogVisible] = useState<boolean>(false)

    const navigation = useNavigation<NavigationProp<StackParamList>>()

    function handleRemount(){
        navigation.navigate("QuickMount", {item: currentAccessory})
        setCardOptionsMenuVisible_accessories(false)

      }

      async function handleUnmount(){

    await db.delete(schema.accessoryMount)
            .where(eq(schema.accessoryMount.accessoryId, currentAccessory.id));
      
        const whatIsIt = await db.select()
            .from(schema.accessoryCollection)
            .where(
                eq(
                    schema.accessoryCollection.id, currentAccessory.id
                )
            )


        await db.update(schema[whatIsIt[0].type]).set({currentlyMountedOn: null}).where((eq(schema[whatIsIt[0].type].id, currentAccessory.id)))
        setCardOptionsMenuVisible_accessories(false)
        setAlohaSnackbarVisible(true)
        if("model" in currentAccessory){ // this is always true, only ammoCollection uses "designation" instead of model and ammo is not in the accessories family
            setAlohaSnackbarText(snackbarText.removeAccessory[language].replace("{{{A}}}", currentAccessory.model))
        }
        
      }

    
    const cardActions = cardActionsMountedOn

    return(
<Portal>
        <Modal visible={cardOptionsMenuVisible_accessories} onDismiss={()=>setCardOptionsMenuVisible_accessories(false)}>
        <Card style={{width: "85%", alignSelf: "center", padding: defaultViewPadding, backgroundColor: theme.colors.surface}}>
            <View style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap"}}>
        {cardActions.map(action => {
        if(action === "unmount"){
            return <Pressable key={action} onPress={()=>handleUnmount()} style={{ alignItems: 'center', marginRight: 48 }}>
                    <Icon source="scissors-cutting" size={defaultCardOptionsMenuIconSize} color={theme.colors.error}/>
                    <Text style={{marginTop: defaultViewPadding, color: theme.colors.error}}>{longPressActions.unmount[language]}</Text>
            </Pressable>
        }
        if(action === "remount"){
            return <Pressable key={action} onPress={()=>handleRemount()} style={{ alignItems: 'center' }}>
                <Icon source="wrench" size={defaultCardOptionsMenuIconSize} />
                <Text style={{marginTop: defaultViewPadding}}>{longPressActions.remount[language]}</Text>
            </Pressable>
       }
    })}
       </View>

</Card>
    </Modal>

</Portal>
    )
}