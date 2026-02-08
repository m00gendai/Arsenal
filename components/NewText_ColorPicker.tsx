import { IconButton, TextInput, Text } from 'react-native-paper';
import { useState } from 'react';
import { GunType, AmmoType, ItemType } from '../lib/interfaces';
import { View, ScrollView, Pressable, Platform, Keyboard } from 'react-native';
import ColorPicker, { Panel1, Swatches, Preview, HueSlider, InputWidget } from 'reanimated-color-picker';
import { usePreferenceStore } from '../stores//usePreferenceStore';
import { defaultViewPadding } from '../configs/configs';
import ModalContainer from './ModalContainer';
import { modalTexts } from '../lib/textTemplates';
import { GetColorName } from 'hex-color-to-color-name';
import { scheduleOnRN  } from "react-native-worklets"

interface Props{
    data: string
    itemData?: ItemType
    setItemData?: React.Dispatch<React.SetStateAction<ItemType>>
    label: string
}

export default function NewText({data, itemData, setItemData, label}: Props){

    const [input, setInput] = useState<string>(itemData && itemData[data] ? itemData[data] : "")
    const [showModal, setShowModal] = useState(false);
    const [color, setColor] = useState<string>(itemData && itemData[data] ? itemData[data] : "#000")
    const [initialColor, setInitialColor] = useState<string>(itemData && itemData[data] ? itemData[data] : "#000")

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

    const onSelectColor = ({ hex }) => {
        'worklet';
        scheduleOnRN(updateColor, hex);
    }

    function updateColor(hex) {
        if (hex.length === 9) {
            setColor(hex.substring(0,7));
        } else {
            setColor(hex);
        }
    }

    function handleColorConfirm(){
        try{
        updateItemData(color)
        setShowModal(false)
        }catch(e){
            throw new Error(`handleColorConfirm: ${e}`)
        }
    }

    function handleColorCancel(){
        setColor(itemData ? itemData[data] : "#000")
        setShowModal(false)
    }

    function handleColorDelete(){
        updateItemData("")
        setShowModal(false)
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
        setShowModal(true)
    }

    function checkColor(color:string){
try{
        if(color === undefined){
            return ""
        }
        if(color === null){
            return ""
        }
        if(color.length === 9){
            return color.substring(0,7)
        }
        return color
    }catch(e){
        throw new Error(`checkColor: ${e}`)
    }
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
                    multiline={false}
                    onPress={()=>{Platform.OS === "ios" ? handleInputPress() : null}}
                    returnKeyType='done'
                    returnKeyLabel='OK'
                    onSubmitEditing={()=>Keyboard.dismiss()}
                />
            </Pressable>
           
            <ModalContainer
                title={modalTexts.colorPicker.title[language]}
                subtitle={modalTexts.colorPicker.text[language]}
                visible={showModal}
                setVisible={setShowModal}
                content={
                    <ColorPicker style={{ width: '100%', padding: 10 }} value={itemData && itemData[data] ? itemData[data] : "#000"} onComplete={onSelectColor}>
                        <View style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <Text>{GetColorName(checkColor(initialColor))}</Text>
                            <Text>{GetColorName(checkColor(color))}</Text>
                        </View>
                        <Preview style={{marginBottom: 10}} />
                        <ScrollView >
                            <Panel1 style={{marginBottom: 10}} />
                            <HueSlider style={{marginBottom: 10}} />
                            <View style={{paddingRight: defaultViewPadding/2, marginBottom: 10}}>
                                <InputWidget inputStyle={{color: theme.colors.onBackground}} iconColor={theme.colors.primary} inputTitleStyle={{color: theme.colors.onBackground}} formats={["HEX", "RGB", "HSL"]} disableAlphaChannel/>
                            </View>
                            <Swatches colors={["#000000", "#c0c0c0", "#e0e0e0", "#818589", "#6b8e23", "#877348", "#f6d7b0", "#ff69b4", "#ffc5cb", "#dd8a3c", "#56301d"]}/>
                        </ScrollView>
                    </ColorPicker>
                }
                buttonACK={<IconButton icon="check" onPress={() => handleColorConfirm()} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
                buttonCNL={<IconButton icon="cancel" onPress={() => handleColorCancel()} style={{width: 50, backgroundColor: theme.colors.secondaryContainer}} iconColor={theme.colors.onSecondaryContainer} />}
                buttonDEL={<IconButton mode="contained" onPress={()=>handleColorDelete()} icon={"delete"} style={{width: 50, backgroundColor: theme.colors.errorContainer}} iconColor={theme.colors.onErrorContainer}/>}
             
            />
        </View>
    )
}