import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { defaultViewPadding } from "configs/configs";
import { StackParamList } from "lib/interfaces";
import { preferenceTitles } from "lib/Text/text_settings";
import { View } from "react-native";
import { Divider, IconButton, List, Text } from "react-native-paper";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { useViewStore } from "stores/useViewStore";

export default function EditData(){

    const { language, theme } = usePreferenceStore()
    const { setHideBottomSheet } = useViewStore()

    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()

    function handleEditDataNavigation(target: keyof StackParamList){
        setHideBottomSheet(true)
        navigation.navigate(target)
    }

    return(
        <List.Accordion left={props => <List.Icon {...props} icon="playlist-edit" />} title={preferenceTitles.editData[language]} titleStyle={{fontWeight: "700", color: theme.colors.onBackground}}>
            <View style={{ marginLeft: 5, marginRight: 5, padding: defaultViewPadding, backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.primary, borderLeftWidth: 5}}>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", gap: 5}}>
                    <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                        <Text style={{flex: 7}}>{preferenceTitles.editData_Autocomplete[language]}</Text>
                        <IconButton 
                            icon={"chevron-right"} 
                            iconColor={theme.colors.onPrimary} 
                            style={{backgroundColor: theme.colors.primary}} 
                            onPress={() => handleEditDataNavigation("EditAutocomplete")}
                        />
                    </View>
                    <View style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                        <Text style={{flex: 7}}>{preferenceTitles.editData_customLabels[language]}</Text>
                        <IconButton 
                            icon={"chevron-right"} 
                            iconColor={theme.colors.onPrimary} 
                            style={{backgroundColor: theme.colors.primary}} 
                            onPress={() => handleEditDataNavigation("EditCustomLabels")}
                        />
                    </View>
                    <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                </View>
            </View>
        </List.Accordion>
    )
}