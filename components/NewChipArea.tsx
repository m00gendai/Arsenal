import { View, TouchableNativeFeedback, ScrollView } from "react-native"
import { newTags, tagModal } from "../lib/textTemplates"
import { usePreferenceStore } from "../stores/usePreferenceStore"
import { Button, Chip, IconButton, TextInput, Text, Dialog, Surface, Modal, Portal, Divider } from "react-native-paper"
import { ItemType } from "../lib/interfaces"
import { useState } from "react"
import { defaultViewPadding } from "../configs/configs"
import ModalContainer from "./ModalContainer"
import {db} from "../db/client"
import { eq } from 'drizzle-orm';
import { useItemStore } from "stores/useItemStore"
import { useItemTags } from "../hooks/useItemTags"
import { determineTagSchema } from "functions/determinators"
import { deleteTagFromListAlert } from "lib/Text/text_alerts"

interface Props{
    data: string
    itemData: ItemType
    setItemData: React.Dispatch<React.SetStateAction<ItemType>>
}

export default function NewChipArea({data, itemData, setItemData}:Props){

    const { language, theme } = usePreferenceStore()
    const { currentItem, currentCollection } = useItemStore()
    const itemTags = useItemTags(currentCollection)

    const [viewTagModal, setViewTagModal] = useState<boolean>(false)
    const [text, setText] = useState<string>("")
    const [currentTag, setCurrentTag] = useState<string>("")
    const [tagDeleteDialogVisible, toggleTagDeleteDialogVisible] = useState<boolean>(false)

    async function saveNewTag(tag: string | null){

        const tagText:string = tag !== null ? tag : text

        if(tagText === ""){
            return
        }

        const currentTags: string[] = itemData.tags ?? []

        if (currentTags.includes(tagText)) return

        try{
            setItemData({...itemData, tags: [...currentTags, tagText]})
        }catch(e){
            console.warn(e)
        }

        await db.insert(determineTagSchema(currentCollection)).values({label: tagText}).onConflictDoNothing()

        setText("")
    }

    function deleteTag(tag:string){
        const tags: string[] = itemData.tags
        tags.splice(tags.indexOf(tag), 1)
        setItemData({...itemData, tags: tags})
    }

    function addTagFromList(tag:string){
        if(currentItem && currentItem.tags){
            if(currentItem.tags.includes(tag)){
                return
            }
        }
        saveNewTag(tag)
    }

    function handleDeleteTagFromList(tag:string){
        setCurrentTag(tag)
        toggleTagDeleteDialogVisible(true)
    }

    async function deleteTagFromList(){
        await db.delete(determineTagSchema(currentCollection)).where(eq(determineTagSchema(currentCollection).label, currentTag))
        toggleTagDeleteDialogVisible(false)

    }

    return(
        <View>
            <TouchableNativeFeedback onPress={()=>setViewTagModal(true)} >
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 10, marginTop: 10}}>
                    {itemData.tags && itemData.tags.length !== 0 ?
                        itemData.tags.map((tag, index) =>{
                            return  <View key={`${tag}_${index}`} style={{padding: 5}}><Chip >{tag}</Chip></View>
                    }) : <Chip>{newTags[language]}</Chip>}
                </View>
            </TouchableNativeFeedback>

            <ModalContainer visible={viewTagModal} setVisible={setViewTagModal}
                title={tagModal.title[language]}
                subtitle={tagModal.subtitle[language]}
                content={
                    <View style={{height: "100%", display: "flex", flexDirection: "column", alignContent: "flex-start"}}>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", padding: defaultViewPadding}}>
                            <TextInput
                                label={tagModal.inputTags[language]}
                                value={text}
                                onChangeText={text => setText(text)}
                                style={{flex: 8, marginRight: 10}}
                                returnKeyType='done'
                                returnKeyLabel='OK'
                            />
                            <IconButton mode="contained" icon={"tag-plus"} size={30} onPress={()=>saveNewTag(null)} style={{ margin: 0}} />
                        </View>

                        <View style={{flex: 1}}>
                            <View style={{ flex: 1, padding: defaultViewPadding}}>
                                <Text style={{ width: "100%" }}>{tagModal.existingTags[language]}</Text>
                                <Surface style={{ flex: 1 }}>
                                    <ScrollView contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}>
                                        {Array.from(new Set(itemTags.map((tag, index) => 
                                            <View key={`${tag.label}_${index}`} style={{padding: 5}}>
                                                <Chip onPress={()=>addTagFromList(tag.label)} onClose={()=>handleDeleteTagFromList(tag.label)}>{tag.label}</Chip>
                                            </View>)
                                        ))}
                                    </ScrollView>
                                </Surface>
                            </View>
                            <View style={{ flex: 1, padding: defaultViewPadding }}>
                                <Text style={{ width: "100%" }}>{tagModal.selectedTags[language]}</Text>
                                <Surface style={{ flex: 1 }}>
                                    <ScrollView contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}>
                                        {itemData.tags?.map((tag, index) =>{
                                            return <View key={`${tag}_${index}`} style={{padding: 5}}><Chip onClose={()=>deleteTag(tag)}>{tag}</Chip></View>
                                        })}
                                    </ScrollView>
                                </Surface>
                            </View>
                        </View>

                        <Dialog visible={tagDeleteDialogVisible} onDismiss={()=>toggleTagDeleteDialogVisible(false)}>
                            <Dialog.Title>
                                {deleteTagFromListAlert.title[language]}
                            </Dialog.Title>
                            <Dialog.Content>
                                <Text>{deleteTagFromListAlert.subtitle[language]}</Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={()=>deleteTagFromList()} icon="delete" buttonColor={theme.colors.errorContainer} textColor={theme.colors.onErrorContainer}>{deleteTagFromListAlert.yes[language]}</Button>
                                <Button onPress={()=>toggleTagDeleteDialogVisible(false)} icon="cancel" buttonColor={theme.colors.secondary} textColor={theme.colors.onSecondary}>{deleteTagFromListAlert.no[language]}</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </View>
                }
                buttonACK={<IconButton icon="check" onPress={() => setViewTagModal(false)} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
                buttonCNL={<IconButton icon="cancel" onPress={() => setViewTagModal(false)} style={{width: 50, backgroundColor: theme.colors.secondaryContainer}} iconColor={theme.colors.onSecondaryContainer}/>}
                buttonDEL={null}
            />
        </View>
    )
}