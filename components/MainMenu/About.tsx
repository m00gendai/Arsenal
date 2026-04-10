import { TouchableNativeFeedback, View } from "react-native";
import { Divider, List, Text } from "react-native-paper";
import { defaultViewPadding } from "configs/configs";
import { usePreferenceStore } from "stores/usePreferenceStore";
import * as Application from 'expo-application';
import { useRef } from "react";
import DeveloperSettings from "./DeveloperSettings";
import { useViewStore } from "stores/useViewStore";
import { aboutText, aboutThanks, preferenceTitles } from "lib/Text/text_settings";
import { aboutThanksPersons } from "lib/textTemplates";

export default function About(){

    const { language, theme } = usePreferenceStore()
    const {developerSettingsVisible, setDeveloperSettingsVisible } = useViewStore()

    const currentYear = new Date().getFullYear()
    const devCounter = useRef(0)

    function handleDevVisible(){
        devCounter.current = devCounter.current+1
        if(devCounter.current === 7){
            setDeveloperSettingsVisible(true)
        }
    }
    
    return(<View>
        <List.Accordion left={props => <List.Icon {...props} icon="cellphone-information" />} title={preferenceTitles.about[language]} titleStyle={{fontWeight: "700", color: theme.colors.onBackground}}>
            <View style={{ marginLeft: 5, marginRight: 5, padding: defaultViewPadding, backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.primary, borderLeftWidth: 5}}>
                <Text>{aboutText[language]}</Text>
                
                <Divider style={{marginTop: 5, marginBottom: 5, width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                
                <TouchableNativeFeedback onPress={()=>handleDevVisible()}>
                    <View>
                        <Text style={{color: theme.colors.onBackground}} >{`Version ${Application.nativeApplicationVersion}`}</Text>
                        <Text style={{color: theme.colors.onBackground}} >{`© ${currentYear === 2024 ? currentYear : `2024 - ${currentYear}`} Marcel Weber`} </Text>
                    </View>
                </TouchableNativeFeedback>

                <Divider style={{marginTop: 5, marginBottom: 5, width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                
                <Text style={{color: theme.colors.onBackground}} >{aboutThanks[language]}</Text>
                <Text>{`- ${aboutThanksPersons.michelle[language]}`}</Text>
                <Text>{`- ${aboutThanksPersons.jonas[language]}`}</Text>
                <Text>{`- ${aboutThanksPersons.waffenforum[language]}`}</Text>
                <Text>{`- ${aboutThanksPersons.others[language]}`}</Text>
                
                <Divider style={{marginTop: 5, marginBottom: 5, width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />
                
                <Text>Splash & Icon: Designed by dgim-studio / Freepik</Text>
            </View>
        </List.Accordion>
        {developerSettingsVisible ? <DeveloperSettings /> : null}
        </View>
    )
}