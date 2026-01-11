import { View } from "react-native"
import { Checkbox, Text, IconButton } from 'react-native-paper';
import { determineDataTemplate, determineRemarkDataTemplate } from 'functions/determinators';
import { useItemStore } from "stores/useItemStore";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { barrelLengthPrefixFields, bulletWeightPrefixFields, caliberPickerTriggerFields, colorPickerTriggerFields, currencyPrefixFields, datePickerTriggerFields, dateTimeOptions } from "configs";
import { cleanIntervals, shotLabel } from "lib/textTemplates";
import { GetColorName } from 'hex-color-to-color-name';
import { checkDate, convertLengthUnitsToPreferredUnit, convertWeightUnitsToPreferredUnit, getShortCaliberName } from "utils";
import { checkBoxes } from "lib/DataTemplates/gunDataTemplate";

export default function Item_details(){

    const { currentItem, currentCollection } = useItemStore()
    const { language, theme, generalSettings, caliberDisplayNameList, preferredUnits } = usePreferenceStore()

    function getCleanIntervalDisplayValue(){
        if("cleanIntervalDisplay" in currentItem){
            const [presetString, shotSelectString] = currentItem.cleanIntervalDisplay.split("/").map(s => s.trim())
            return(
                presetString && shotSelectString ? 
                    `${cleanIntervals[presetString][language]} / ${shotSelectString} ${shotLabel[language]}`
                    :  
                    `${cleanIntervals[presetString][language]}` || `${shotSelectString} ${shotLabel[language]}` || ""
            )
        }
        return ""
    }

    function checkColor(color:string){
        if(color.length === 9){
            return color.substring(0,8)
        }
        return color
    }    

    function insertText(dataItem){
        // dataItem is a TemplateItem
        if(caliberPickerTriggerFields.includes(dataItem.name) && dataItem.name in currentItem && currentItem[dataItem.name]){
            if(generalSettings.caliberDisplayName){
                return getShortCaliberName(currentItem[dataItem.name], caliberDisplayNameList).join("\n")
            } else {
                return currentItem[dataItem.name].join("\n")
            }
        }
        if(colorPickerTriggerFields.includes(dataItem.name) && dataItem.name in currentItem && currentItem[dataItem.name]){
            return GetColorName(`${checkColor(currentItem[dataItem.name]).split("#")[1]}`)
        }
        if(currencyPrefixFields.includes(dataItem.name)){
            return `${preferredUnits.selectedCurrency} ${currentItem[dataItem.name] ? currentItem[dataItem.name] :  ""}` 
        }
        if(bulletWeightPrefixFields.includes(dataItem.name)){
            return `${preferredUnits.bulletWeightUnit} ${currentItem[dataItem.name] ? convertWeightUnitsToPreferredUnit(preferredUnits, dataItem.name, currentItem[dataItem.name])  :  ""}` 
        }
        if(barrelLengthPrefixFields.includes(dataItem.name)){
            return `${preferredUnits.barrelLengthUnit} ${currentItem[dataItem.name] ? convertLengthUnitsToPreferredUnit(preferredUnits, dataItem.name, currentItem[dataItem.name]) :  ""}` 
        }
        if(dataItem.name === "cleanIntervalDisplay" && currentItem[dataItem.name]){
            return getCleanIntervalDisplayValue()
        }
        if(datePickerTriggerFields.includes(dataItem.name) && dataItem.name in currentItem && currentItem[dataItem.name]){
            return new Date(currentItem[dataItem.name]).toLocaleDateString("de-CH", dateTimeOptions)
        }
        return currentItem[dataItem.name]
    }

    return(
        <View>
                        {determineDataTemplate(currentCollection).map((dataItem, index)=>{
                            if(!generalSettings.emptyFields){
                                return(
                                    <View key={`${dataItem.name}`} style={{flex: 1, flexDirection: "column"}} >
{/* Textfield Label in selected language */}
                                        <Text style={{width: "100%", fontSize: 12,}}>{`${dataItem[language]}:`}</Text>
                {/* Textfield content */}
                                        <Text style={{width: "100%", fontSize: 18, marginBottom: 5, paddingBottom: 5, borderBottomColor: theme.colors.primary, borderBottomWidth: 0.2}}>
                                            {insertText(dataItem)}
                                        </Text>
            {/* Interval Warning Icons */}
                                        {dataItem.name === "lastCleanedAt_unix" && checkDate(currentItem) ? 
                                            <View style={{position:"absolute", top: 0, right: 0, bottom: 0, left: 0, display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                                                <IconButton icon="spray-bottle" iconColor={theme.colors.error} /><IconButton icon="toothbrush" iconColor={theme.colors.error} />
                                            </View> 
                                        : 
                                        null}
                    {/* Color splotch */}
                                        {colorPickerTriggerFields.includes(dataItem.name) && dataItem.name in currentItem && currentItem[dataItem.name] ? 
                                            <View style={{position:"absolute", top: 0, right: 0, bottom: 0, left: 0, display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                                                <View style={{height: "50%", aspectRatio: "5/1", borderRadius: 50, backgroundColor: `${currentItem[dataItem.name]}`, transform:[{translateY: -5}]}}>
                                                </View>
                                            </View> 
                                        : 
                                        null}
                                    </View>
                                )
                            } else if(currentItem[dataItem.name]){
                            return(
                                <View key={`${dataItem.name}`} style={{flex: 1, flexDirection: "column"}} >
                                    {/* Textfield Label in selected language */}
                                        <Text style={{width: "100%", fontSize: 12,}}>{`${dataItem[language]}:`}</Text>
                {/* Textfield content */}
                                        <Text style={{width: "100%", fontSize: 18, marginBottom: 5, paddingBottom: 5, borderBottomColor: theme.colors.primary, borderBottomWidth: 0.2}}>
                                            {insertText(dataItem)}
                                        </Text>
            {/* Interval Warning Icons */}
                                        {dataItem.name === "lastCleanedAt_unix" && checkDate(currentItem) ? 
                                            <View style={{position:"absolute", top: 0, right: 0, bottom: 0, left: 0, display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                                                <IconButton icon="spray-bottle" iconColor={theme.colors.error} /><IconButton icon="toothbrush" iconColor={theme.colors.error} />
                                            </View> 
                                        : 
                                        null}
                    {/* Color splotch */}
                                        {colorPickerTriggerFields.includes(dataItem.name) && dataItem.name in currentItem && currentItem[dataItem.name] ? 
                                            <View style={{position:"absolute", top: 0, right: 0, bottom: 0, left: 0, display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                                                <View style={{height: "50%", aspectRatio: "5/1", borderRadius: 50, backgroundColor: `${currentItem[dataItem.name]}`, transform:[{translateY: -5}]}}>
                                                </View>
                                            </View> 
                                        : 
                                        null}
                                </View>
                            )
                                }
                        })}

                        <View style={{flex: 1, flexDirection: "column"}} >
                            {currentCollection === "gunCollection" ? checkBoxes.map(checkBox=>{
                                return(
                                    <Checkbox.Item mode="android" key={checkBox.name} label={checkBox[language]} status={currentItem[checkBox.name] ? "checked" : "unchecked"}/>
                                )
                            }) : null}
                        </View>
                        <View style={{flex: 1, flexDirection: "column"}} >
                            <Text style={{width: "100%", fontSize: 12,}}>{determineRemarkDataTemplate(currentCollection)[language]}</Text>
                            <Text style={{width: "100%", fontSize: 18, marginBottom: 5, paddingBottom: 5, borderBottomColor: theme.colors.primary, borderBottomWidth: 0.2}}>{currentItem.remarks}</Text>
                        </View>
                    </View>
    )
}