import { NavigationProp, useNavigation } from "@react-navigation/native";
import { cardActionsMountedOn, defaultCardOptionsMenuIconSize, defaultViewPadding } from "configs";
import * as schema from "db/schema"
import { db } from "db/client"
import { eq } from 'drizzle-orm';
import { StackParamList } from "interfaces";
import { longPressActions, snackbarText } from "lib/textTemplates";
import { Pressable, View } from "react-native";
import { Card, Icon, Modal, Portal, Text } from "react-native-paper";
import { useItemStore } from "stores/useItemStore";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { useViewStore } from "stores/useViewStore";
import { useTextStore } from "stores/useTextStore";


export default function CardOptionsMenu_accessories(){

    const { language, theme } = usePreferenceStore()
    const { cardOptionsMenuVisible_accessories, setCardOptionsMenuVisible_accessories, setAlohaSnackbarVisible } = useViewStore()
    const { currentAccessory } = useItemStore()  
    const { setAlohaSnackbarText } = useTextStore()

    const navigation = useNavigation<NavigationProp<StackParamList>>()

    function handleRemount(){
        navigation.navigate("QuickMount", {item: currentAccessory})
        setCardOptionsMenuVisible_accessories(false)

    }

    async function handleUnmount(){

        await db.delete(schema.accessoryMount)
            .where(eq(schema.accessoryMount.accessoryId, currentAccessory.id));
        await db.delete(schema.partMount)
            .where(eq(schema.partMount.partId, currentAccessory.id));
       
        const whatIsItAccessory = await db.select()
            .from(schema.accessoryCollection)
            .where(
                eq(schema.accessoryCollection.id, currentAccessory.id)
            )

        const whatIsItPart = await db.select()
            .from(schema.partCollection)
            .where(
                eq(schema.partCollection.id, currentAccessory.id)
            )

        const whatIsIt = whatIsItAccessory.length !== 0 ? whatIsItAccessory : whatIsItPart

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
                                return(
                                    <Pressable key={action} onPress={()=>handleUnmount()} style={{ alignItems: 'center', marginRight: 48 }}>
                                        <Icon source="scissors-cutting" size={defaultCardOptionsMenuIconSize} color={theme.colors.error}/>
                                        <Text style={{marginTop: defaultViewPadding, color: theme.colors.error}}>{longPressActions.unmount[language]}</Text>
                                    </Pressable>
                                )
                            }
                            if(action === "remount"){
                                return(
                                    <Pressable key={action} onPress={()=>handleRemount()} style={{ alignItems: 'center' }}>
                                        <Icon source="wrench" size={defaultCardOptionsMenuIconSize} />
                                        <Text style={{marginTop: defaultViewPadding}}>{longPressActions.remount[language]}</Text>
                                    </Pressable>
                                )
                            }
                        })}
                    </View>
                </Card>
            </Modal>
        </Portal>
    )
}