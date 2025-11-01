import { IconButton, TextInput } from 'react-native-paper';
import { useState } from 'react';
import { GunType, AmmoType } from '../interfaces';
import { View, Pressable, Platform, Keyboard } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { usePreferenceStore } from '../stores//usePreferenceStore';
import { dateTimeOptions, defaultViewPadding } from '../configs';
import ModalContainer from './ModalContainer';
import { modalTexts } from '../lib/textTemplates';

interface Props{
    data: string
    itemData?: GunType | AmmoType 
    setItemData?: React.Dispatch<React.SetStateAction<GunType | AmmoType>>
    label: string
}

export default function NewText({data, itemData, setItemData, label}: Props){
    console.log(`${data}: DATEPICKER TEXT`)
    const [input, setInput] = useState<string>(itemData ? itemData[data] : "")
    const [showDateTime, setShowDateTime] = useState<boolean>(false)
    const [date, setDate] = useState<(string | number | Date | dayjs.Dayjs)>(dayjs());
    const [initialDate, setInitialDate] = useState<string>(itemData ? itemData[data] : "")

    const { language, theme } = usePreferenceStore()

    const [charCount, setCharCount] = useState<number>(0)
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

    function updateDate(input){
        console.log(input)
        setInput(new Date(input).toLocaleDateString("de-CH", dateTimeOptions))
        setDate(input)
    }

    function confirmDate(){
        updateItemData(input)
        setShowDateTime(false)
        setInitialDate(input)
    }

    function cancelDate(){
        updateItemData(initialDate)
        setShowDateTime(false)
    }

    function deleteDate(){
        updateItemData("")
        setShowDateTime(false)
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
        setShowDateTime(true)
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
           
            
            {/* DATE TIME PICKER */}
            <ModalContainer 
                title={modalTexts.datePicker.title[language]} 
                subtitle={modalTexts.datePicker.text[language]} 
                visible={showDateTime} 
                setVisible={setShowDateTime}
                content={<DateTimePicker
                            mode="single"
                            locale="de"
                            firstDayOfWeek={1}
                            date={date}
                            onChange={(params) => updateDate(params.date)}
                            selectedItemColor={theme.colors.primaryContainer}
                            calendarTextStyle={{color: theme.colors.onBackground}}
                            headerTextStyle={{color: theme.colors.primary, padding: defaultViewPadding}}
                            headerTextContainerStyle={{backgroundColor: theme.colors.primaryContainer, elevation: 5, marginLeft: defaultViewPadding, marginRight: defaultViewPadding}}
                            weekDaysTextStyle={{color: theme.colors.onBackground}}
                            headerButtonColor={theme.colors.primary}
                            monthContainerStyle={{backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.secondaryContainer}}
                            yearContainerStyle={{backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.secondaryContainer}}
                        />}
                buttonACK={<IconButton mode="contained" onPress={()=>confirmDate()} icon={"check"} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
                buttonCNL={<IconButton mode="contained" onPress={()=>cancelDate()} icon={"cancel"} style={{width: 50, backgroundColor: theme.colors.secondaryContainer}} />}
                buttonDEL={<IconButton mode="contained" onPress={()=>deleteDate()} icon={"delete"} style={{width: 50, backgroundColor: theme.colors.errorContainer}} iconColor={theme.colors.onErrorContainer}/>}
             />
        
           </View>
    )
}