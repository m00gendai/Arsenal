import { IconButton, List, TextInput, Text, Searchbar, Chip } from 'react-native-paper';
import { useState } from 'react';
import { GunType, AmmoType } from '../interfaces';
import { TouchableNativeFeedback, View, ScrollView, Pressable, Platform, Keyboard } from 'react-native';
import { calibers } from '../lib/caliberData';
import { usePreferenceStore } from '../stores//usePreferenceStore';
import { defaultViewPadding } from '../configs';
import ModalContainer from './ModalContainer';
import { caliberPickerStrings, modalTexts } from '../lib/textTemplates';

interface Props{
    data: string
    itemData?: GunType | AmmoType 
    setItemData?: React.Dispatch<React.SetStateAction<GunType | AmmoType>>
    label: string
}

export default function NewText({data, itemData, setItemData, label}: Props){
    console.log(`${data}: CALIBERPICKER TEXT`)
    const [input, setInput] = useState<string>(itemData && itemData[data] ? itemData[data] : "")
    const [showModalCaliber, setShowModalCaliber] = useState<boolean>(false)
    const [activeCaliber, setActiveCaliber] = useState<string[]>(itemData && itemData[data] ? itemData[data] : [])
    const [caliberView, setCaliberView] = useState<"search" | "list">("search")
    const [caliberQuery, setCaliberQuery] = useState<string>("")
    
    const { language, theme } = usePreferenceStore()

    const [charCount, setCharCount] = useState(0)
    const [isBackspace, setIsBackspace] = useState<boolean>(false)
    const [isFocus, setFocus] = useState<boolean>(false)

    const MAX_CHAR_COUNT: number = 100

    function updateItemData(input:string | string[]){
        if(charCount < MAX_CHAR_COUNT){
            setCharCount(input !== undefined ? input.length : 0)
            setInput(Array.isArray(input) ? input.join("\n") : input)
            setItemData({...itemData, [data]: Array.isArray(input) ? input : input.trim()})
        }
        if(charCount >= MAX_CHAR_COUNT && isBackspace){
            setCharCount(input !== undefined ? input.length : 0)
            setInput(Array.isArray(input) ? input.join("\n") : input)
            setItemData({...itemData, [data]: Array.isArray(input) ? input : input.trim()})
        }
    }

    function handleCaliberItemSelect(name:string){
        if(activeCaliber.length === 0){ // empty caliber array, just push the new selection
            setActiveCaliber([name])
            return
        }
        if(activeCaliber.length !== 0){
            if(activeCaliber.includes(name)){ // not empty, but name already exists in caliber array -> remove it
                const index: number = activeCaliber.indexOf(name)
                const newActiveCaliber: string[] = activeCaliber.toSpliced(index, 1)
                setActiveCaliber(newActiveCaliber)
                return
            }
            if(!activeCaliber.includes(name)){ // not empty, name does not exist in caliber array -> push it
                setActiveCaliber([...activeCaliber, name])
                return
            }
        }
    }

    function handleCaliberSelectConfirm(){
        updateItemData(activeCaliber)
        setShowModalCaliber(false)
    }

    function handleCaliberSelectCancel(){
        setActiveCaliber(itemData && itemData[data] ? itemData[data] : "")
        setShowModalCaliber(false)
    }

    function handleFocus(){
        setFocus(true)
        if(input === undefined){
            setCharCount(0)
        } else if(input === null){
            setCharCount(0)
        } else {
            setCharCount(input.toString().length)
        }
    }

    function handleInputPress(){
        Keyboard.dismiss()
        setShowModalCaliber(true)
    }

    return(
        <View style={{flex: 1}}>
            <Pressable style={{flex: 1}} onPress={()=>{Platform.OS === "android" ? handleInputPress() : null}}>
                <TextInput
                    label={`${label} ${isFocus ? `${charCount}/${MAX_CHAR_COUNT}` : ``}`} 
                    style={{
                        flex: 1,
                    }}
                    onFocus={()=>handleFocus()}
                    onBlur={()=>setFocus(false)}
                    value={input ? input.toString() : ""}
                    editable={false}
                    showSoftInputOnFocus={true}
                    onChangeText={input => updateItemData(input)}
                    onKeyPress={({nativeEvent}) => setIsBackspace(nativeEvent.key === "Backspace" ? true : false)}
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
                visible={showModalCaliber}
                setVisible={setShowModalCaliber}
                content={
                    <List.Section style={{width: "100%", flexDirection: "column", height: "100%"}}>
                        <ScrollView style={{height: "20%", width: "100%", backgroundColor: theme.colors.background}}>
                            {Array.isArray(activeCaliber) && activeCaliber.length !== 0 ? 
                                activeCaliber.map((cal, index) => {return <View key={cal} style={{paddingTop: index === 0 ? defaultViewPadding : 0, paddingLeft: defaultViewPadding, paddingRight: defaultViewPadding, paddingBottom: defaultViewPadding/2}}><Chip onClose={()=>{console.log(cal);handleCaliberItemSelect(cal)}}>{cal}</Chip></View>}) 
                                : <Text>{`${caliberPickerStrings.caliberSelection[language]}`}</Text>
                            }
                        </ScrollView>
                        <View style={{height: "10%", display: "flex", flexDirection: "row", justifyContent: "space-between", padding: defaultViewPadding}}>
                            <TouchableNativeFeedback onPress={()=>setCaliberView("search")}>
                                <View style={{
                                    borderTopLeftRadius: 15, 
                                    borderBottomLeftRadius: 15, 
                                    position: "relative", 
                                    width: "50%", 
                                    height: "100%", 
                                    backgroundColor: caliberView === "search" ? theme.colors.primary : "transparent", 
                                    borderWidth: 1, 
                                    borderColor: caliberView === "list" ? theme.colors.primary : "transparent", 
                                    display: "flex", 
                                    justifyContent: "flex-start", 
                                    flexDirection: "row", 
                                    alignItems: "center", 
                                    paddingLeft: defaultViewPadding
                                }}>
                                    <Text style={{color: caliberView === "search" ? theme.colors.onPrimary : theme.colors.onBackground}}>
                                        {caliberPickerStrings.tabSearch[language]}
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback onPress={()=>setCaliberView("list")}>
                                <View style={{
                                    borderTopRightRadius: 15, 
                                    borderBottomRightRadius: 15, 
                                    position: "relative", 
                                    width: "50%", 
                                    height: "100%", 
                                    backgroundColor: caliberView === "list" ? theme.colors.primary : "transparent", 
                                    borderWidth: 1, 
                                    borderColor: caliberView === "search" ? theme.colors.primary : "transparent", 
                                    display: "flex", 
                                    justifyContent: "flex-end", 
                                    flexDirection: "row", 
                                    alignItems: "center", 
                                    paddingRight: defaultViewPadding
                                }}>
                                    <Text style={{color: caliberView === "list" ? theme.colors.onPrimary : theme.colors.onBackground}}>
                                        {caliberPickerStrings.tabList[language]}
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        {caliberView === "list" ?
                        <ScrollView style={{height: "70%", width: "100%", backgroundColor: "yellow"}}>
                            {calibers.map((caliber, index) =>{
                                return(
                                    <List.Accordion
                                        title={caliber.range}
                                        key={caliber.range}
                                        style={{
                                            backgroundColor: theme.colors.secondaryContainer,
                                        }}
                                    >
                                        <View style={{backgroundColor: theme.colors.tertiaryContainer}}>
                                            {caliber.variants.map((variant, index)=>{
                                                return(
                                                    <List.Item key={`${variant.name}_${index}`} title={variant.name} titleStyle={{color: activeCaliber !== undefined && activeCaliber !== null && activeCaliber.length !== 0 && activeCaliber.includes(variant.name) ? theme.colors.onTertiary : theme.colors.onTertiaryContainer}} onPress={()=>handleCaliberItemSelect(variant.name)} style={{backgroundColor: activeCaliber.includes(variant.name) ? theme.colors.tertiary : "transparent"}}/>
                                                )
                                            })}
                                        </View>
                                    </List.Accordion>
                                )
                            })}
                        </ScrollView>
                        :
                        <View style={{height: "70%"}}>
                            <View style={{padding: defaultViewPadding}}>
                                <Searchbar
                                    placeholder={caliberPickerStrings.tabSearch[language]}
                                    onChangeText={setCaliberQuery}
                                    value={caliberQuery}
                                />
                            </View>
                            <ScrollView>
                            {calibers.map((caliber, index) =>{
                                return caliber.variants.map((variant, index)=>{
                                    if(variant.name.toLowerCase().replaceAll(".", "").replaceAll(" ", "").includes(caliberQuery.toLowerCase().replaceAll(".", "").replaceAll(" ", ""))){
                                    return(
                                        <List.Item key={`${variant.name}_${index}`} title={variant.name} titleStyle={{color: activeCaliber !== undefined && activeCaliber !== null && activeCaliber.length !== 0 && activeCaliber.includes(variant.name) ? theme.colors.onTertiary : theme.colors.onTertiaryContainer}} onPress={()=>handleCaliberItemSelect(variant.name)} style={{backgroundColor: activeCaliber.includes(variant.name) ? theme.colors.tertiary : "transparent"}}/>
                                    )}
                                })})}
                            </ScrollView>
                        </View>}
                    </List.Section>
                }
                buttonACK={<IconButton icon="check" onPress={() => handleCaliberSelectConfirm()} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
                buttonCNL={<IconButton icon="cancel" onPress={() => handleCaliberSelectCancel()} style={{width: 50, backgroundColor: theme.colors.secondaryContainer}} iconColor={theme.colors.onSecondaryContainer} />}
                buttonDEL={null}
            />

        </View>
    )
}