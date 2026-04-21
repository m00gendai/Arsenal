import { dateTimeOptions, soldKeys } from "configs/configs";
import { dataTemplate_TranslationSoldTranslations } from "lib/DataTemplates/translations";
import { View } from "react-native";
import { Text } from 'react-native-paper';
import { useItemStore } from "stores/useItemStore";
import { usePreferenceStore } from "stores/usePreferenceStore";

export default function SoldDetails(){

    const { currentItem, currentCollection } = useItemStore()
    const { language, theme, generalSettings, caliberDisplayNameList, preferredUnits } = usePreferenceStore()

    return(
        <View>
            {soldKeys.map((soldKey, index) =>{
                return dataTemplate_TranslationSoldTranslations[soldKey] ? 
                    <View key={`${soldKey}_${index}`} style={{flex: 1, flexDirection: "column"}} >
                        <Text style={{width: "100%", fontSize: 12,}}>{`${dataTemplate_TranslationSoldTranslations[soldKey][language]}`}</Text>
                        <Text style={{width: "100%", fontSize: 18, marginBottom: 5, paddingBottom: 5, borderBottomColor: theme.colors.primary, borderBottomWidth: 0.2}}>
                            {soldKey.endsWith("_unix") && currentItem[soldKey] ? `${new Date(currentItem[soldKey]).toLocaleDateString("de-CH", dateTimeOptions)}` : currentItem[soldKey]}
                        </Text>
                    </View>
                : null
            })}
        </View>
    )
}
