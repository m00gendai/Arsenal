import { View } from "react-native"
import { Appbar, Divider, IconButton, Text } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore"
import * as schema from "db/schema"
import { db } from "db/client"
import { eq, asc } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { defaultViewPadding } from "configs/configs"
import { ScrollView } from "react-native-gesture-handler"
import { preferenceTitles } from "lib/Text/text_settings"

export default function EditAutocomplete({navigation}){

    const { language, switchLanguage, theme, switchTheme, generalSettings, setGeneralSettings, caliberDisplayNameList } = usePreferenceStore()

    const {data: customLabelData } = useLiveQuery(db.select()
            .from(schema.customShippingLabels)
            .orderBy(asc(schema.customShippingLabels.name))
        )
    
    async function deleteData(id: string){
        await db.delete(schema.customShippingLabels).where(eq(schema.customShippingLabels.id, id))
    }

    return(
        <View style={{flex: 1, paddingBottom: defaultViewPadding}}>
            <Appbar style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={preferenceTitles.editData_customLabels[language]}/>
            </Appbar>

            <ScrollView style={{flex: 1}}>
                {customLabelData.map(data =>{
                    return(
                        <View key={data.id}>
                        <View style={{ marginLeft: 5, marginRight: 5, padding: defaultViewPadding}} >
                            <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", gap: 5}}>
                                <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                                    <Text style={{flex: 7}}>{data.name}</Text>
                                    <IconButton 
                                        icon="delete" 
                                        size={20} 
                                        iconColor={theme.colors.onErrorContainer} style={{backgroundColor: theme.colors.errorContainer, padding: 0, margin: 0}} 
                                        onPress={()=>deleteData(data.id)}
                                    />
                                </View>
                            </View>
                            
                        </View>
                        <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.primary}} />
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}