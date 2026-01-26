import { Platform, View } from "react-native";
import { Divider, List, Text } from "react-native-paper";
import { preferenceTitles } from "lib/textTemplates";
import { defaultViewPadding } from "configs/configs";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { versionHistory } from "./releaseNotes";
import { Languages } from "lib/interfaces";


export default function VersionHistory(){

    const { language, theme } = usePreferenceStore()

    return(
        <View>
            <List.Accordion left={props => <List.Icon {...props} icon="clock-start" />} title={preferenceTitles.versionHistory[language]} titleStyle={{fontWeight: "700", color: theme.colors.onBackground}}>
                <View style={{ marginLeft: 5, marginRight: 5, padding: defaultViewPadding, backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.primary, borderLeftWidth: 5}}>
                    {versionHistory.map((version, index) =>{
                        const lang:Languages = language === "ch" ? "de" : language
                        return(
                            <View 
                                key={`VersionHistory_${index}`}
                            >
                                <Text style={{fontWeight: "bold"}}>{`${version.title}`}</Text>
                                <Text>{`${version[lang].text}`}</Text>
                                {Platform.OS === "ios" && version[lang].ios ? <View><Text style={{fontStyle: "italic"}}>{`\niOS:`}</Text><Text>{version[lang].ios}</Text></View> : null}
                                {Platform.OS === "android" && version[lang].android ? <View><Text style={{fontStyle: "italic"}}>{`\nAndroid:`}</Text><Text>{version[lang].android}</Text></View> : null}
                                 <Divider style={{width: "100%", borderWidth: 0.5, borderColor: theme.colors.backdrop, marginTop: defaultViewPadding, marginBottom: defaultViewPadding}} />
                            </View>
                        )
                    })}
                </View>
            </List.Accordion>
        </View>
    )
}