import { db } from "db/client";
import { CollectionType, ItemType } from "lib/interfaces";
import { useEffect, useState } from "react";
import { SectionList, TouchableOpacity, View } from "react-native";
import { Icon, Text } from 'react-native-paper';
import { colorPickerTriggerFields, datePickerTriggerFields, defaultViewPadding, ignoreIntervalFieldsForLogger, intervalPickerTriggerFields } from "configs/configs";
import { DisplayVariants, usePreferenceStore } from "stores/usePreferenceStore";
import ItemCard_accessories from "./ItemCard_accessories";
import * as schema from "db/schema"
import { eq, desc } from 'drizzle-orm';
import { useViewStore } from "stores/useViewStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PREFERENCES } from "configs/configs_DB";
import { tabBarLabels } from "lib/Text/text_tabBarLabels";
import { parseDate } from "functions/utils";
import { dataTemplate_TranslationCheckboxes, dataTemplate_Translations_Unified } from "lib/DataTemplates/translations";
import { cleanIntervals, shotLabel } from "lib/textTemplates";

interface Props{
    currentItem: ItemType
    currentCollection: CollectionType
}

export default function Item_History({ currentItem, currentCollection }: Props) {

    const { language, theme } = usePreferenceStore()

    const [loggerData, setLoggerData] = useState([])

    useEffect(()=>{
      async function getLoggerData(){
        const loggerData = await db.select()
          .from(schema.logger)
          .where(eq(schema.logger.reference, currentItem.id))
          .orderBy(desc(schema.logger.createdAt))

        setLoggerData(loggerData.filter(data => !ignoreIntervalFieldsForLogger.includes(data.changedField)))
      }
      getLoggerData()

      
    },[])

    function getCleanIntervalDisplayValue(value: string){
            const [presetString, shotSelectString] = value.split("/").map(s => s.trim())
            return(
                presetString && shotSelectString ? 
                    `${cleanIntervals[presetString][language]} / ${shotSelectString} ${shotLabel[language]}`
                    :  
                    `${cleanIntervals[presetString][language]}` || `${shotSelectString} ${shotLabel[language]}` || ""
            )
        }

  function renderFieldName(field: string){
    if(dataTemplate_Translations_Unified[field]){
      return dataTemplate_Translations_Unified[field][language]
    }
    return field
  }

  function renderFieldValue(field: string, value: string){
    if(datePickerTriggerFields.includes(field)){
      return parseDate(value)
    }
    if(dataTemplate_TranslationCheckboxes[field]){
      return value === "0" ? "☐" : "☑"
    }
    if(field === "cleanIntervalDisplay"){
      return getCleanIntervalDisplayValue(value)
    }
    return value
  }

    return(
        <View>
          {loggerData.map((logEntry, index) =>{
              return(
              <View key={`loggerEntry_${index}`} style={index%2 === 1 ? 
                {backgroundColor: theme.colors.secondaryContainer, rowGap: defaultViewPadding, padding: defaultViewPadding}
                :
                {rowGap: defaultViewPadding, padding: defaultViewPadding}}
              >
                <View style={{width: "100%"}}>
                  <Text style={{fontWeight: "bold"}}>{`${parseDate(logEntry.createdAt)} ${renderFieldName(logEntry.changedField)}:`}</Text>
                </View>
                <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", alignItems: "center"}}>
                  {!logEntry.value_old && logEntry.value_new ? 
                    <View style={{marginRight: defaultViewPadding}}>
                      <Icon source={"plus-circle"} size={20} color={theme.colors.primary} />
                    </View> 
                  : 
                    null
                  }
                  {logEntry.value_old && !logEntry.value_new ? 
                    <View style={{marginRight: defaultViewPadding}}>
                      <Icon source={"minus-circle"} size={20} color={theme.colors.primary} />
                    </View> 
                  : 
                    null
                  }
                  {logEntry.value_old ? 
                    <Text style={colorPickerTriggerFields.includes(logEntry.changedField) ? {color: logEntry.value_old} : {}} key={index}>{`${renderFieldValue(logEntry.changedField, logEntry.value_old)}`}</Text> 
                  : 
                    null
                  }
                  {logEntry.value_old && logEntry.value_new ? 
                    <View style={{width: "100%", marginTop: defaultViewPadding, marginBottom: defaultViewPadding}}>
                      <Icon source={"arrow-right-bold"} size={20} color={theme.colors.primary} />
                    </View> 
                  : 
                    null
                  }
                  {logEntry.value_new ? 
                    <Text style={colorPickerTriggerFields.includes(logEntry.changedField) ? {color: logEntry.value_new} : {}}>{`${renderFieldValue(logEntry.changedField, logEntry.value_new)}`}</Text> 
                  : 
                    null
                  }
                </View>
              </View>
            )
          })}
     
      </View>
    )
}