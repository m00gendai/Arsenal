import { IconButton, TextInput, Text, RadioButton, Divider } from 'react-native-paper';
import { useEffect, useRef, useState } from 'react';
import { GunType, AmmoType, ItemType } from '../lib/interfaces';
import { TouchableNativeFeedback, View, ScrollView, Pressable, Platform, Keyboard } from 'react-native';
import { usePreferenceStore } from '../stores//usePreferenceStore';
import { cleanIntervalOptions, defaultViewPadding } from '../configs/configs';
import ModalContainer from './ModalContainer';
import { cleanIntervals, modalTexts, shotLabel } from '../lib/textTemplates';
import { Dropdown } from 'react-native-paper-dropdown';
import { currentShotCountDataLabel, nextShotIntervalDataLabel, preferedShotCountDataLabel, presetDataLabel, shotCountDataLabel } from 'lib/Text/textTemplates_intervalPicker';

interface Props{
    data: string
    itemData?: ItemType
    setItemData?: React.Dispatch<React.SetStateAction<ItemType>>
    label: string
}

export default function NewText({data, itemData, setItemData, label}: Props){

    const { language, theme } = usePreferenceStore()

    function getCleanIntervalDisplayValue(){
        const [presetString, shotSelectString] = itemData[data].split("/").map(s => s.trim())
        return(
            presetString && shotSelectString ? 
                `${cleanIntervals[presetString][language]} / ${shotSelectString} ${shotLabel[language]}`
                :  
                `${cleanIntervals[presetString][language]}` || `${shotSelectString} ${shotLabel[language]}` || ""
        )
    }

        function getNextShotInterval(currentShotCount:string){
        const current = Number(currentShotCount)
        const interval = Number(shotSelect.current ? shotSelect.current : 0)
        
        if(interval === 0){
            return current
        }
        if(current === 0){
            return interval
        }
        if(current === interval){
            return (Math.ceil(current / interval) * interval) + (Math.ceil(current / interval) * interval)
        }
        if(interval === 1){
            return (Math.ceil(current / interval) * interval) + 1
        }
        return Math.ceil(current / interval) * interval
    }

    const shotSelect = useRef("cleanInterval" in itemData && itemData.cleanInterval_ShotCount ? itemData.cleanInterval_ShotCount : null)

    const [input, setInput] = useState<string>(itemData && itemData[data] ? getCleanIntervalDisplayValue() : "")
    const [showCleanModal, setShowCleanModal] = useState<boolean>(false)
    const [preset, setPreset] = useState<string>(itemData && "cleanInterval" in itemData && itemData.cleanInterval ? itemData.cleanInterval : "none")
    const [nextShotInterval, setNextShotInterval] = useState<number>(itemData && "shotCount" in itemData && itemData.shotCount ? getNextShotInterval(itemData.shotCount) : 0)

    

    const [isBackspace, setIsBackspace] = useState<boolean>(false)
    const [isFocus, setFocus] = useState<boolean>(false)
    
    function setCleanIntervalDisplayValue(){
        const presetString = cleanIntervals[preset].name
        const shotSelectString = shotSelect.current ? `${shotSelect.current}` : ""

        return `${presetString} / ${shotSelectString}`
    }

    function updateItemData(){
        setInput(setCleanIntervalDisplayValue())
        setItemData(
            {
                ...itemData,
                cleanInterval: cleanIntervals[preset].name,
                cleanInterval_ShotCount: shotSelect.current,
                cleanIntervalDisplay: setCleanIntervalDisplayValue()
            }
        )
    }

    function handleShotInterval(value:string){
        shotSelect.current = value
        const next = "shotCount" in itemData ? getNextShotInterval(itemData.shotCount) : Number(value)
        setNextShotInterval(next)
    }

    function handleCleanIntervalConfirm(){
        updateItemData()
        setShowCleanModal(false)
    }

    function handleCleanIntervalCancel(){
        setShowCleanModal(false)
    }

    function handleFocus(){
        setFocus(true)
    }

    function handleInputPress(){
        Keyboard.dismiss()
        setShowCleanModal(true) 
    }

    const presetOptions = cleanIntervalOptions.map(interval =>{
        return {label: cleanIntervals[interval][language], value: interval}
    })

    return(
        <View style={{flex: 1}}>
            <Pressable style={{flex: 1}} onPress={()=>{Platform.OS === "android" ? handleInputPress() : null}}>
                <TextInput
                    label={`${label}`} 
                    style={{
                        flex: 1,
                    }}
                    onFocus={()=>handleFocus()}
                    onBlur={()=>setFocus(false)}
                    value={input ? input : ""}
                    editable={false}
                    showSoftInputOnFocus={true}
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
                title={modalTexts.cleanInterval.title[language]}
                subtitle={modalTexts.cleanInterval.text[language]}
                visible={showCleanModal}
                setVisible={setShowCleanModal}
                content={
                    <View style={{width: "100%", display: "flex", padding: defaultViewPadding}}>
                        <ScrollView>
                            <Text style={{marginBottom: defaultViewPadding}} variant='titleMedium'>{presetDataLabel[language]}</Text>
                            <Dropdown
                                label={presetDataLabel[language]}
                                placeholder=""
                                options={presetOptions}
                                value={preset}
                                onSelect={setPreset}
                            />

                            <Divider style={{height: 2, width: "100%", backgroundColor: theme.colors.primary, marginTop: defaultViewPadding, marginBottom: defaultViewPadding}} />

                            {"shotCount" in itemData ? <View>
                                <Text style={{marginBottom: defaultViewPadding}} variant='titleMedium'>{shotCountDataLabel[language]}</Text>
                                <Pressable style={{flex: 1}}>
                                    <TextInput
                                        label={preferedShotCountDataLabel[language]} 
                                        style={{
                                            flex: 1,
                                        }}
                                        onFocus={()=>handleFocus()}
                                        onBlur={()=>{
                                            setFocus(false)
                                        }}
                                        value={shotSelect.current ? shotSelect.current.toString() : ""}
                                        editable={true}
                                        showSoftInputOnFocus={true}
                                        onChangeText={(text) => {
                                            handleShotInterval(text)
                                        }}
                                        onKeyPress={({nativeEvent}) => setIsBackspace(nativeEvent.key === "Backspace" ? true : false)}
                                        inputMode={"decimal"}
                                        multiline={false}
                                        returnKeyType='done'
                                        returnKeyLabel='OK'
                                        onSubmitEditing={()=>Keyboard.dismiss()}
                                    />
                                </Pressable>
                                <View style={{display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
                                    <Text>{`${currentShotCountDataLabel[language]}:`}</Text>
                                    <Text>{`${itemData.shotCount ? itemData.shotCount : 0}`}</Text>
                                </View>
                                <View style={{display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
                                    <Text>{`${nextShotIntervalDataLabel[language]}:`}</Text>
                                    <Text>{`${nextShotInterval}`}</Text>
                                </View>
                            </View> : null}

                        </ScrollView>
                    </View>
                }
                buttonACK={<IconButton icon="check" onPress={() => handleCleanIntervalConfirm()} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
                buttonCNL={<IconButton icon="cancel" onPress={() => handleCleanIntervalCancel()} style={{width: 50, backgroundColor: theme.colors.secondaryContainer}} iconColor={theme.colors.onSecondaryContainer} />}
                buttonDEL={null}
            />

        </View>
    )
}