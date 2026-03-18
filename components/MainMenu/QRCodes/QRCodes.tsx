import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { defaultViewPadding } from "configs/configs";
import { determineSchemaStringFromTabBarLabel } from "functions/determinators";
import { CollectionType, StackParamList } from "lib/interfaces";
import { preferenceTitles, tabBarLabels } from "lib/textTemplates";
import { View } from "react-native";
import { Divider, IconButton, List, Text } from "react-native-paper";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { useViewStore } from "stores/useViewStore";

export default function QRCodes(){

    const { language, theme } = usePreferenceStore()
    const { setHideBottomSheet } = useViewStore()

    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()

    function handleEditDataNavigation(collection: CollectionType, label: string){
        setHideBottomSheet(true)
        navigation.navigate("GenerateQRCodes", {collection: collection, label: label})
    }

    return(
        <List.Accordion left={props => <List.Icon {...props} icon="qrcode-plus" />} title={preferenceTitles.generateQRCodes[language]} titleStyle={{fontWeight: "700", color: theme.colors.onBackground}}>
            <View style={{ marginLeft: 5, marginRight: 5, padding: defaultViewPadding, backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.primary, borderLeftWidth: 5}}>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", gap: 5}}>
                    {Object.entries(tabBarLabels).map((tabBar, index) => {
                        return(
                            <View key={`tabBar_${index}`} style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%"}}>
                                <Text style={{flex: 7}}>{tabBar[1][language]}</Text>
                                <IconButton 
                                    icon={"chevron-right"} 
                                    iconColor={theme.colors.onPrimary} 
                                    style={{backgroundColor: theme.colors.primary}} 
                                    onPress={() => handleEditDataNavigation(determineSchemaStringFromTabBarLabel(tabBar[0]), tabBar[0])}
                                />
                            </View>
                        )})}
                    <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                </View>
            </View>
        </List.Accordion>
    )
}