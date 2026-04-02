import { Text, IconButton, TextInput } from 'react-native-paper';
import { useRef, useState } from 'react';
import { ItemType } from '../lib/interfaces';
import { View, Pressable, Keyboard, Platform } from 'react-native';
import { defaultViewPadding, unitFields_Length, unitFields_Weight } from '../configs/configs';
import { usePreferenceStore } from 'stores/usePreferenceStore';
import { convertLengthUnitsToMillimeter, convertLengthUnitsToPreferredUnit, convertWeightUnitsToMilligram, convertWeightUnitsToPreferredUnit } from 'functions/utils';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera'
import ModalContainer from './ModalContainer';
import { ScrollView } from 'react-native-gesture-handler';
import { scannerInfo } from 'lib/Text/textTemplates_scanner';

interface Props{
    data: string
    itemData?: ItemType
    setItemData?: React.Dispatch<React.SetStateAction<ItemType>>
    label: string
}

export default function NewText({data, itemData, setItemData, label}: Props){

    const { preferredUnits } = usePreferenceStore()

    function handleConversions(itemData:ItemType, data:string){
        if(unitFields_Weight.includes(data)){
            return convertWeightUnitsToPreferredUnit(preferredUnits, data, itemData[data])
        }
        if(unitFields_Length.includes(data)){
            return convertLengthUnitsToPreferredUnit(preferredUnits, data, itemData[data])
        }
        return itemData[data]
    }

    const input = useRef<string>(itemData && itemData[data] ? handleConversions(itemData, data) : "")

    const [charCount, setCharCount] = useState(input.current?.length ?? 0)
    const [isBackspace, setIsBackspace] = useState<boolean>(false)
    const [isFocus, setFocus] = useState<boolean>(false)
    const [showModalCaliber, setShowModalCaliber] = useState<boolean>(false)
    const [qrCode, setQrCode] = useState<string>(itemData && itemData[data] ? itemData[data] : "")
    const device = useCameraDevice('back')
    const { hasPermission, requestPermission } = useCameraPermission()
    const { language, theme } = usePreferenceStore()

    const MAX_CHAR_COUNT: number = 100

    function updateItemData(text:string){
        let determinedText: string
        if(unitFields_Weight.includes(data)){
            determinedText = convertWeightUnitsToMilligram(preferredUnits, data, text)
        } else if(unitFields_Length.includes(data)){
            determinedText = convertLengthUnitsToMillimeter(preferredUnits, data, text)
        }else {
            determinedText = text
        }
        
        if(charCount < MAX_CHAR_COUNT){
            setCharCount(text.length ?? 0)
            input.current = text
            setItemData({...itemData, [data]: Array.isArray(determinedText) ? determinedText : determinedText.trim()})
        }
        if(charCount >= MAX_CHAR_COUNT && isBackspace){
            setCharCount(text.length ?? 0)
            input.current = text
            setItemData({...itemData, [data]: Array.isArray(determinedText) ? determinedText : determinedText.trim()})
        }
    }

    function handleFocus(){
        setFocus(true)
        if(input === undefined){
            setCharCount(0)
        } else if(input === null){
            setCharCount(0)
        } else {
            setCharCount(input.current.toString().length)
        }
    }

    function handleInputPress(){
        Keyboard.dismiss()
        setShowModalCaliber(true)
    }

    function handleConfirm(){
        if(qrCode){
            updateItemData(qrCode)
            setShowModalCaliber(false)
        }
    }

    function handleCancel(){
        setQrCode(itemData && itemData[data] ? itemData[data] : "")
        setShowModalCaliber(false)
    }

    function handleDelete(){
        setQrCode("")
        updateItemData("")
        setShowModalCaliber(false)
    }

    const codeScanner = useCodeScanner({
      codeTypes: ['qr', 'ean-13'],
      onCodeScanned: (codes) => {
        setQrCode(codes[0].value)
      }
    })

    return(
        <View style={{flex: 1}}>
            <Pressable style={{flex: 1}} onPress={()=>{Platform.OS === "android" ? handleInputPress() : null}}>
                <TextInput
                    label={`QR-Code`} 
                    style={{
                        flex: 1,
                    }}
                    onFocus={()=>handleFocus()}
                    onBlur={()=>{
                        setFocus(false)
                    }}
                    value={input.current ? input.current.toString() : ""}
                    editable={false}
                    onPress={()=>{Platform.OS === "ios" ? handleInputPress() : null}}
                    multiline={false}
                    returnKeyType='done'
                    returnKeyLabel='OK'
                    onSubmitEditing={()=>Keyboard.dismiss()}
                />
            </Pressable>
            
            <ModalContainer
                title={`QR Code Scanner`}
                subtitle={scannerInfo[language]}
                visible={showModalCaliber}
                setVisible={setShowModalCaliber}
                content={
                    <View style={{width: "100%", height: "100%", position: "relative", padding: defaultViewPadding}}>
                        <Camera
                        style={{width: "100%", aspectRatio: "1/1", position: "relative"}}
                            device={device}
                            isActive={true}
                            codeScanner={codeScanner}
                        />
                        <ScrollView style={{width: "100%", height: 20, display: "flex",}}>
                            <Text>{qrCode}</Text>
                        </ScrollView>
                    </View>
                }
                buttonACK={<IconButton icon="check" onPress={() => handleConfirm()} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
                buttonCNL={<IconButton icon="cancel" onPress={() => handleCancel()} style={{width: 50, backgroundColor: theme.colors.secondaryContainer}} iconColor={theme.colors.onSecondaryContainer} />}
                buttonDEL={<IconButton mode="contained" onPress={()=>handleDelete()} icon={"delete"} style={{width: 50, backgroundColor: theme.colors.errorContainer}} iconColor={theme.colors.onErrorContainer}/>}
            />

        </View>
    )
}