import { Pressable, TouchableNativeFeedback, View } from "react-native";
import { Divider, Icon, List, Text } from "react-native-paper";
import { defaultViewPadding } from "configs/configs";
import { usePreferenceStore } from "stores/usePreferenceStore";
import * as Application from 'expo-application';
import { useRef } from "react";
import DeveloperSettings from "./DeveloperSettings";
import { useViewStore } from "stores/useViewStore";
import { aboutText, aboutThanks, preferenceTitles } from "lib/Text/text_settings";
import { aboutThanksPersons, SimpleTranslation } from "lib/textTemplates";
import { Linking } from 'react-native';

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

    const mailTo: SimpleTranslation = {
        de: "E-Mail an den Entwickler",
        en: "Email to the developer",
        fr: "E-mail au développeur",
        it: "E-mail allo sviluppatore",
        ch: "E-mail al sviluppader"
    }

    const officialPage: SimpleTranslation = {
        de: "Offizielle Webseite",
        en: "Official Website",
        fr: "Site officiel",
        it: "Sito ufficiale",
        ch: "Pagina uffiziala"
    }

    const officialThread: SimpleTranslation = {
        de: "Offizielle Diskussion im waffenforum.ch",
        en: "Official thread on waffenforum.ch",
        fr: "Discussion officielle sur waffenforum.ch",
        it: "Discussione ufficiale su waffenforum.ch",
        ch: "Discussiun uffiziala sin waffenforum.ch"
    }

    const developmentStatus: SimpleTranslation = {
        de: "Übersicht Entwicklungsstatus",
        en: "Development Status Overview",
        fr: "Aperçu de l'état de développement",
        it: "Panoramica dello stato di sviluppo",
        ch: "Survista da l'stadi da svilup",
    }

    const officialYoutube: SimpleTranslation = {
        de: "Offizieller YouTube-Kanal",
        en: "Official YouTube Channel",
        fr: "Chaîne YouTube officielle",
        it: "Canale YouTube ufficiale",
        ch: "Canal ufficial da YouTube",
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

                <Pressable onPress={() => Linking.openURL("https://waffenforum.ch/forum/index.php?thread/2883-arsenal-die-schweizer-app-f%C3%BCr-waffensammler/&action=lastPost")} style={{display: "flex", flexDirection: "row", alignItems: "center", gap: defaultViewPadding}}>
                     <Icon source="forum-outline" size={24} />
                     <Text>{officialThread[language]}</Text>
                </Pressable>

                <Divider style={{marginTop: 5, marginBottom: 5, width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />

                <Pressable onPress={() => Linking.openURL("https://arsenal-app.ch")} style={{display: "flex", flexDirection: "row", alignItems: "center", gap: defaultViewPadding}}>
                     <Icon source="monitor-cellphone-star" size={24} />
                     <Text>{officialPage[language]}</Text>
                </Pressable>

                <Divider style={{marginTop: 5, marginBottom: 5, width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />

                <Pressable onPress={() => Linking.openURL("https://trello.com/b/aewI0VKW/arsenal")} style={{display: "flex", flexDirection: "row", alignItems: "center", gap: defaultViewPadding}}>
                     <Icon source="chart-timeline" size={24} />
                     <Text>{developmentStatus[language]}</Text>
                </Pressable>

                <Divider style={{marginTop: 5, marginBottom: 5, width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />

                <Pressable onPress={() => Linking.openURL("https://www.youtube.com/@ArsenalGunCollectionApp")} style={{display: "flex", flexDirection: "row", alignItems: "center", gap: defaultViewPadding}}>
                     <Icon source="television-classic" size={24} />
                     <Text>{officialYoutube[language]}</Text>
                </Pressable>

                <Divider style={{marginTop: 5, marginBottom: 5, width: "100%", borderWidth: 0.5, borderColor: theme.colors.onSecondary}} />

                <Pressable onPress={() => Linking.openURL("mailto:info@mrweber.ch")} style={{display: "flex", flexDirection: "row", alignItems: "center", gap: defaultViewPadding}}>
                     <Icon source="email-outline" size={24} />
                     <Text>{mailTo[language]}</Text>
                </Pressable>

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