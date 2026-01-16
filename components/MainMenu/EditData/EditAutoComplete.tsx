import { TouchableNativeFeedback, View } from "react-native"
import { Appbar, Divider, Icon, IconButton, List, Text } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore"
import * as schema from "db/schema"
import { db } from "db/client"
import { eq, asc } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { defaultViewPadding } from "configs/configs"
import { ScrollView } from "react-native-gesture-handler"
import { dataTemplate_Translations } from "lib/DataTemplates/translations"
import { preferenceTitles } from "lib/textTemplates"

export default function EditAutocomplete({navigation}){

    const { language, switchLanguage, theme, switchTheme, generalSettings, setGeneralSettings, caliberDisplayNameList } = usePreferenceStore()

    const {data: autocompleteData } = useLiveQuery(db.select()
            .from(schema.autocomplete)
            .orderBy(asc(schema.autocomplete.label))
        )
    
    const fieldData = []
    
    autocompleteData.map(data =>{
        if(!fieldData.includes(data.field)){
            fieldData.push(data.field)
        }
    })

    async function deleteData(id: string){
        await db.delete(schema.autocomplete).where(eq(schema.autocomplete.id, id))
    }

    return(
        <View style={{flex: 1, paddingBottom: defaultViewPadding}}>
            <Appbar style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={preferenceTitles.editData_Autocomplete[language]}/>
            </Appbar>

            <ScrollView style={{flex: 1}}>
                <List.Section>
                    {fieldData.map((field, index) =>{
                        return (
                            <List.Accordion title={dataTemplate_Translations[field][language]} titleStyle={{fontWeight: "700", color: theme.colors.onBackground}} key={`${field}_${index}`}>
                                {autocompleteData.map(data =>{
                                    if(data.field === field){
                                        return(
                                            <View key={data.id}>
                                            <View style={{ marginLeft: 5, marginRight: 5, padding: defaultViewPadding}} >
                                                <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", gap: 5}}>
                                                    <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                                                        <Text style={{flex: 7}}>{data.label}</Text>
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
                                    }
                                })}
                                
                            </List.Accordion>
                        )
                    })}
                </List.Section>
            </ScrollView>
        </View>
    )
}