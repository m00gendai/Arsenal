import { NavigationProp, useNavigation } from "@react-navigation/native";
import { defaultViewPadding, defaultCardOptionsMenuFontSize, defaultCardOptionsMenuIconSize } from "configs/configs";
import * as schema from "db/schema"
import { db } from "db/client"
import { eq } from 'drizzle-orm';
import { determineCardOptions } from "functions/determinators";
import { ItemType, StackParamList } from "lib/interfaces";
import { longPressActions, longPressActionsSuccessMessages } from "lib/textTemplates";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Button, Card, Dialog, Icon, Modal, Portal, Text } from "react-native-paper";
import { useItemStore } from "stores/useItemStore";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { useViewStore } from "stores/useViewStore";
import { useTextStore } from "stores/useTextStore";
import { gunDeleteAlert } from "lib/Text/text_alerts";


export default function CardOptionsMenu(){

    const { language, theme } = usePreferenceStore()
    const { cardOptionsMenuVisible, setCardOptionsMenuVisible, setHideBottomSheet, setAlohaSnackbarVisible } = useViewStore()
    const { currentCollection, currentItem, setCurrentItem } = useItemStore() 
    const { setAlohaSnackbarText } = useTextStore() 

    const [deleteDialogVisible, toggleDeleteDialogVisible] = useState<boolean>(false)

    const navigation = useNavigation<NavigationProp<StackParamList>>()

    function handleClone(){
        setCardOptionsMenuVisible(false)
        setHideBottomSheet(true)
        navigation.navigate("newItem", {clone: true})
    }

    function handleShotButtonPress(item:ItemType){
        setCurrentItem(item)
        setCardOptionsMenuVisible(false)
        navigation.navigate("QuickShot")
    }

    function handleStockButtonPress(item:ItemType){
        setCurrentItem(item)
        setCardOptionsMenuVisible(false)
        navigation.navigate("QuickStock")
    } 

    function handleMountButtonPress(item:ItemType){
        setCardOptionsMenuVisible(false)
        navigation.navigate("QuickMount", {item: item})
    }

    async function handleCleanButtonPress(item:ItemType){
        if ("lastCleanedAt_unix" in schema[currentCollection]) {
            await db.update(schema[currentCollection] as any)
                .set({ lastCleanedAt_unix: Date.now() })
                .where(eq(schema[currentCollection].id, currentItem.id));
        }
        setCardOptionsMenuVisible(false)
        if("model" in currentItem){
            setAlohaSnackbarText(`${currentItem.model} ${longPressActionsSuccessMessages.clean[language]}`)
            setAlohaSnackbarVisible(true)
        }
    }

    async function handleBatteryButtonPress(item:ItemType){
        if ("batteryLastChangedAt_unix" in schema[currentCollection]) {
            await db.update(schema[currentCollection] as any)
                .set({ batteryLastChangedAt_unix: Date.now() })
                .where(eq(schema[currentCollection].id, currentItem.id));
        }
        setCardOptionsMenuVisible(false)
        if("model" in currentItem){
            setAlohaSnackbarText(`${longPressActionsSuccessMessages.battery[language].replace("{{{A}}}", currentItem.model)}`)
            setAlohaSnackbarVisible(true)
        }
    }

    async function deleteItem(item:ItemType){
        if(currentCollection.startsWith("accessoryCollection")){
            // Delete mount entry
            await db.delete(schema.accessoryMount).where(eq(schema.accessoryMount.accessoryId, item.id));
            // Delete master entry
            await db.delete(schema.accessoryCollection).where(eq(schema.accessoryCollection.id, item.id));
            // Delete individual entry
            await db.delete(schema[currentCollection]).where(eq(schema[currentCollection].id, item.id));
        } else {
            await db.delete(schema[currentCollection]).where(eq(schema[currentCollection].id, item.id));
        }
        toggleDeleteDialogVisible(false)
        setCardOptionsMenuVisible(false)
    }
    
    const cardActions = determineCardOptions(currentCollection)

    return(
        <Portal>
            <Modal visible={cardOptionsMenuVisible} onDismiss={()=>setCardOptionsMenuVisible(false)}>
                <Card style={{width: "85%", alignSelf: "center", padding: defaultViewPadding, backgroundColor: theme.colors.surface}}>
                    <View style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap"}}>
                        <View style={{flex: 1}}>
                            {cardActions.map(action => {
                                if(action === "delete"){
                                    return(
                                        <Pressable key={action} onPress={()=>toggleDeleteDialogVisible(true)} style={{ alignItems: 'center', width: "100%"}}>
                                            <Icon source="delete" size={defaultCardOptionsMenuIconSize} color={theme.colors.error}/>
                                            <Text style={{textAlign: "center", marginTop: defaultViewPadding, color: theme.colors.error, fontSize: defaultCardOptionsMenuFontSize}}>{longPressActions.delete[language]}</Text>
                                        </Pressable>
                                    )
                                }})
                            }
                        </View>
                        <View style={{flex: 3, display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", rowGap: defaultViewPadding, columnGap: 0}}>
                            {cardActions.map(action => {
                                if(action === "clone"){
                                    return( 
                                        <Pressable key={action} onPress={()=>handleClone()} style={{ alignItems: 'center', width: "33%"}}>
                                            <Icon source="content-duplicate" size={defaultCardOptionsMenuIconSize} />
                                            <Text style={{textAlign: "center", marginTop: defaultViewPadding, fontSize: defaultCardOptionsMenuFontSize}}>{longPressActions.clone[language]}</Text>
                                        </Pressable>
                                    )
                                }
                                if(action === "quickShot"){
                                    return( 
                                        <Pressable key={action} onPress={()=>handleShotButtonPress(currentItem)} style={{ alignItems: 'center', width: "33%"}}>
                                            <Icon source="bullet" size={defaultCardOptionsMenuIconSize} />
                                            <Text style={{textAlign: "center", marginTop: defaultViewPadding, fontSize: defaultCardOptionsMenuFontSize}}>{"QuickShot"}</Text>
                                        </Pressable>
                                    )
                                }
                                if(action === "quickStock"){
                                    return( 
                                        <Pressable key={action} onPress={()=>handleStockButtonPress(currentItem)} style={{ alignItems: 'center', width: "33%"}}>
                                            <Icon source="cart-variant" size={defaultCardOptionsMenuIconSize} />
                                            <Text style={{textAlign: "center", marginTop: defaultViewPadding, fontSize: defaultCardOptionsMenuFontSize}}>{"QuickStock"}</Text>
                                        </Pressable>
                                    )
                                }
                                if(action === "quickMount"){
                                    return( 
                                        <Pressable key={action} onPress={()=>handleMountButtonPress(currentItem)} style={{alignItems: 'center', width: "33%"}}>
                                            <Icon source="wrench" size={defaultCardOptionsMenuIconSize} />
                                            <Text style={{textAlign: "center", marginTop: defaultViewPadding, fontSize: defaultCardOptionsMenuFontSize}}>{"QuickMount"}</Text>
                                        </Pressable>
                                    )
                                }
                                if(action === "quickClean"){
                                    return( 
                                        <Pressable key={action} onPress={()=>handleCleanButtonPress(currentItem)} style={{alignItems: 'center', width: "33%"}}>
                                            <Icon source="spray-bottle" size={defaultCardOptionsMenuIconSize} />
                                            <Text style={{textAlign: "center", marginTop: defaultViewPadding, fontSize: defaultCardOptionsMenuFontSize}}>{longPressActions.clean[language]}</Text>
                                        </Pressable>
                                    )
                                }
                                if(action === "quickBatt"){
                                    return( 
                                        <Pressable key={action} onPress={()=>handleBatteryButtonPress(currentItem)} style={{ alignItems: 'center', width: "33%"}}>
                                            <Icon source="battery-sync" size={defaultCardOptionsMenuIconSize} />
                                            <Text style={{textAlign: "center", marginTop: defaultViewPadding, fontSize: defaultCardOptionsMenuFontSize}}>{longPressActions.battery[language]}</Text>
                                        </Pressable>
                                    )
                                }
                            })}
                        </View>
                    </View>
                </Card>
            </Modal>

            <Dialog visible={deleteDialogVisible} onDismiss={()=>toggleDeleteDialogVisible(!deleteDialogVisible)}>
                <Dialog.Title>
                    {currentItem ? `${"model" in currentItem ? (currentItem.model || "") : "designation" in currentItem ? (currentItem.designation || "") : (currentItem.title || "")} ${gunDeleteAlert.title[language]}` : ""}
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