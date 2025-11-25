import { NavigationProp, useNavigation } from "@react-navigation/native";
import { cardActionsMountedOn, defaultViewPadding } from "configs";
import * as schema from "db/schema"
import { db } from "db/client"
import { eq } from 'drizzle-orm';
import { determineCardOptions } from "functions/determinators";
import { ItemType, StackParamList } from "interfaces";
import { gunDeleteAlert, longPressActions } from "lib/textTemplates";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Button, Card, Dialog, Icon, Modal, Portal, Text } from "react-native-paper";
import { useItemStore } from "stores/useItemStore";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { useViewStore } from "stores/useViewStore";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";


export default function CardOptionsMenu_accessories(){

    const { language, theme } = usePreferenceStore()
    const { cardOptionsMenuVisible_accessories, setCardOptionsMenuVisible_accessories } = useViewStore()
    const { currentCollection, currentItem, setCurrentItem, currentAccessory } = useItemStore()  

    const [deleteDialogVisible, toggleDeleteDialogVisible] = useState<boolean>(false)

    const navigation = useNavigation<NavigationProp<StackParamList>>()

    function handleRemount(){
        
        console.log("remount")
      }

      async function handleUnmount(){

    console.log("unmount")
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
      }

    
    const cardActions = cardActionsMountedOn

    return(
<Portal>
        <Modal visible={cardOptionsMenuVisible_accessories} onDismiss={()=>setCardOptionsMenuVisible_accessories(false)}>
        <Card style={{width: "85%", alignSelf: "center", padding: defaultViewPadding, backgroundColor: theme.colors.surface}}>
            <View style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap"}}>
        {cardActions.map(action => {
        if(action === "unmount"){
            return <Pressable key={action} onPress={()=>handleUnmount()} style={{ alignItems: 'center' }}>
                    <Icon source="scissors-cutting" size={48} color={theme.colors.error}/>
                    <Text style={{marginTop: defaultViewPadding, color: theme.colors.error}}>{longPressActions.unmount[language]}</Text>
            </Pressable>
        }
       /* if(action === "remount"){
            return <Pressable key={action} onPress={()=>handleRemount()} style={{ alignItems: 'center' }}>
                <Icon source="wrench" size={48} />
                <Text style={{marginTop: defaultViewPadding}}>{longPressActions.remount[language]}</Text>
            </Pressable>
       } */
    })}
       </View>

</Card>
    </Modal>

</Portal>
    )
}