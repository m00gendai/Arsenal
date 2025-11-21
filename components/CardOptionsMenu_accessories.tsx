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


export default function CardOptionsMenu_accessories(){

    const { language, theme } = usePreferenceStore()
    const { cardOptionsMenuVisible_accessories, setCardOptionsMenuVisible_accessories } = useViewStore()
    const { currentCollection, currentItem, setCurrentItem } = useItemStore()  

    const [deleteDialogVisible, toggleDeleteDialogVisible] = useState<boolean>(false)

    const navigation = useNavigation<NavigationProp<StackParamList>>()

    function handleClone(){
        setCardOptionsMenuVisible_accessories(false)
        navigation.navigate("newItem", {clone: true})
      }

      function handleShotButtonPress(item:ItemType){
        setCurrentItem(item)
        setCardOptionsMenuVisible_accessories(false)
        navigation.navigate("QuickShot")
      }

      function handleStockButtonPress(item:ItemType){
              setCurrentItem(item)
              setCardOptionsMenuVisible_accessories(false)
              navigation.navigate("QuickStock")
          } 

      async function deleteItem(item:ItemType){
        await db.delete(schema[currentCollection]).where(eq(schema[currentCollection].id, item.id));
        toggleDeleteDialogVisible(false)
        setCardOptionsMenuVisible_accessories(false)
    }
    
    const cardActions = cardActionsMountedOn

    return(
<Portal>
        <Modal visible={cardOptionsMenuVisible_accessories} onDismiss={()=>setCardOptionsMenuVisible_accessories(false)}>
        <Card style={{width: "85%", alignSelf: "center", padding: defaultViewPadding, backgroundColor: theme.colors.surface}}>
            <View style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
        {cardActions.map(action => {
            if(action === "goto"){
            return <Pressable key={action} onPress={()=>handleClone()} style={{ alignItems: 'center'}}>
            <Icon source="eye" size={48} />
            <Text style={{marginTop: defaultViewPadding}}>{longPressActions.goto[language]}</Text>
       </Pressable>}
       if(action === "unmount"){
       return <Pressable key={action} onPress={()=>toggleDeleteDialogVisible(true)} style={{ alignItems: 'center' }}>
            <Icon source="scissors-cutting" size={48} color={theme.colors.error}/>
            <Text style={{marginTop: defaultViewPadding, color: theme.colors.error}}>{longPressActions.unmount[language]}</Text>
       </Pressable>
       }
       if(action === "remount"){
        return <Pressable key={action} onPress={()=>handleShotButtonPress(currentItem)} style={{ alignItems: 'center' }}>
            <Icon source="pipe-wrench" size={48} />
            <Text style={{marginTop: defaultViewPadding}}>{longPressActions.remount[language]}</Text>
       </Pressable>
       }
    })}
       </View>

</Card>
    </Modal>

    <Dialog visible={deleteDialogVisible} onDismiss={()=>toggleDeleteDialogVisible(!deleteDialogVisible)}>
                            <Dialog.Title>
                            {currentItem ? `${"model" in currentItem ? (currentItem.model || "") : (currentItem.designation || "")} ${gunDeleteAlert.title[language]}` : ""}
                            </Dialog.Title>
                            <Dialog.Content>
                                <Text>{`${gunDeleteAlert.subtitle[language]}`}</Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={()=>deleteItem(currentItem)} icon="delete" buttonColor={theme.colors.errorContainer} textColor={theme.colors.onErrorContainer}>{gunDeleteAlert.yes[language]}</Button>
                                <Button onPress={()=>toggleDeleteDialogVisible(!deleteDialogVisible)} icon="cancel" buttonColor={theme.colors.secondary} textColor={theme.colors.onSecondary}>{gunDeleteAlert.no[language]}</Button>
                            </Dialog.Actions>
                        </Dialog>
</Portal>
    )
}