import { IconButton, TextInput } from 'react-native-paper';
import { useState } from 'react';
import { ItemType } from '../interfaces';
import { View, Pressable, Platform, Keyboard } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import { usePreferenceStore } from '../stores//usePreferenceStore';
import { dateTimeOptions, defaultViewPadding } from '../configs';
import ModalContainer from './ModalContainer';
import { modalTexts } from '../lib/textTemplates';

interface Props{
    data: string
    itemData?: ItemType
    setItemData?: React.Dispatch<React.SetStateAction<ItemType>>
    label: string
}

export default function NewText({data, itemData, setItemData, label}: Props){

    const [input, setInput] = useState<number>(itemData && itemData[data] ? itemData[data] : "")
    const [showDateTime, setShowDateTime] = useState<boolean>(false)
    const [date, setDate] = useState<number>(itemData && itemData[data] ? itemData[data] : Date.now());
    const [initialDate, setInitialDate] = useState<number>(itemData && itemData[data] ? itemData[data] : null)

    const { language, theme } = usePreferenceStore()

    const [charCount, setCharCount] = useState<number>(0)
    const [isBackspace, setIsBackspace] = useState<boolean>(false)
    const [isFocus, setFocus] = useState<boolean>(false)

    const MAX_CHAR_COUNT: number = 100

    function updateItemData(input: number){
        if(charCount < MAX_CHAR_COUNT){
            setCharCount(0)
            setInput(input)
            setItemData({...itemData, [data]: input})
        }
        if(charCount >= MAX_CHAR_COUNT && isBackspace){
            setCharCount(0)
            setInput(input)
            setItemData({...itemData, [data]: input})
        }
    }

    function updateDate(input){
        const inputDate = input as number
        setInput(new Date(inputDate).getTime())
        setDate(input)
    }

    function confirmDate(){
        const inputDate = input ? input as number : date

        updateItemData(inputDate)
        setShowDateTime(false)
        setInitialDate(inputDate)
    }

    function cancelDate(){
        updateItemData(initialDate)
        setShowDateTime(false)
    }

    function deleteDate(){
        updateItemData(null)
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
                        value={input ? new Date(input).toLocaleDateString("de-CH", dateTimeOptions) : ""}
                        editable={false}
                        showSoftInputOnFocus={true}
                        onChangeText={input => updateItemData(Number(input))}
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
                            selectedItemColor={theme.colors.primary}
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