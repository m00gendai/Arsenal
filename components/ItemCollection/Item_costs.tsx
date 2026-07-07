import { db } from "db/client";
import { CollectionType, ItemType } from "lib/interfaces";
import { useEffect, useState } from "react";
import { SectionList, TouchableOpacity, View } from "react-native";
import { DataTable, Icon, Text } from 'react-native-paper';
import { colorPickerTriggerFields, datePickerTriggerFields, dateTimeOptions, defaultViewPadding, ignoreIntervalFieldsForLogger, intervalPickerTriggerFields, unitFields_Length, unitFields_Weight } from "configs/configs";
import { DisplayVariants, usePreferenceStore } from "stores/usePreferenceStore";
import ItemCard_accessories from "./ItemCard_accessories";
import * as schema from "db/schema"
import { eq, desc } from 'drizzle-orm';
import { useViewStore } from "stores/useViewStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PREFERENCES } from "configs/configs_DB";
import { tabBarLabels } from "lib/Text/text_tabBarLabels";
import { convertLengthUnitsToPreferredUnit, convertWeightUnitsToPreferredUnit, parseDate } from "functions/utils";
import { dataTemplate_TranslationCheckboxes, dataTemplate_Translations_Unified } from "lib/DataTemplates/translations";
import { cleanIntervals, shotLabel } from "lib/textTemplates";
import { determineCostLoggerSchema } from "functions/determinators";

interface Props{
    currentItem: ItemType
    currentCollection: CollectionType
}

export default function Item_Costs({ currentItem, currentCollection }: Props) {

    const { language, theme, preferredUnits } = usePreferenceStore()

    const [loggerData, setLoggerData] = useState([])

    useEffect(()=>{
      async function getLoggerData(){
        const loggerData = await db.select()
          .from(determineCostLoggerSchema(currentCollection))
          .where(eq(determineCostLoggerSchema(currentCollection).reference, currentItem.id))
          .orderBy(desc(determineCostLoggerSchema(currentCollection).createdAt))

        setLoggerData(loggerData)
      }
      getLoggerData()

      
    },[])
    
    return(
        <View>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title><Icon source="calendar-range" size={24} /></DataTable.Title>
                    <DataTable.Title numeric><Icon source="basket-fill" size={24} /></DataTable.Title>
                    <DataTable.Title numeric><Icon source="cash-multiple" size={24} /></DataTable.Title>
                    <DataTable.Title numeric><Icon source="diameter-variant" size={24} /></DataTable.Title>
                </DataTable.Header>

                {loggerData.map((item) => (
                    <DataTable.Row key={item.key}>
                    <DataTable.Cell>{new Date(item.createdAt).toLocaleDateString("de-CH", dateTimeOptions)}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.amountBought}</DataTable.Cell>
                    <DataTable.Cell numeric>{Number(item.totalCost).toFixed(2)} </DataTable.Cell>
                    <DataTable.Cell numeric>{(item.totalCost/item.amountBought).toFixed(3)}</DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
        </View>
    )
}