import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultViewPadding, languageSelection } from "configs";
import { PREFERENCES } from "configs_DB";
import { Languages } from "interfaces";
import { SimpleTranslation } from "lib/textTemplates";
import { useState } from "react";
import { View } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import { usePreferenceStore } from "stores/usePreferenceStore";

export default function Onboarding_LanguageSelect(){

    const { language, switchLanguage, theme } = usePreferenceStore()

    const [selectedLanguage, setSelectedLanguage] = useState<Languages>("de")

    const languageSelect:SimpleTranslation = {
        de: "Sprache festlegen",
        en: "Select Language",
        fr: "Choisir la langue",
        it: "Seleziona la lingua",
        ch: "Tscherner la lingua",
    }

    const languageHint: SimpleTranslation = {
        de: "Die Sprache kann jederzeit in den Einstellungen geändert werden",
        en: "The language can be changed any time in the settings menu",
        fr: "La langue peut être modifiée à tout moment dans les paramètres",
        it: "La lingua può essere modificata in qualsiasi momento nelle impostazioni",
        ch: "La lingua po vegnir midada da tut temp en las configuraziuns",
    }

    async function handleLanguageSwitch(lng:Languages){
        setSelectedLanguage(lng)
        switchLanguage(lng)
        const preferences:string = await AsyncStorage.getItem(PREFERENCES)
        const newPreferences:{[key:string] : string} = preferences == null ? {"language": lng} : {...JSON.parse(preferences), "language":lng} 
        await AsyncStorage.setItem(PREFERENCES, JSON.stringify(newPreferences))
    }
    
    return(
        <View style={{ flex: 1, width: "100%" }}>
            {languageSelection.map(language =>{
                return (
                    <View key={`languageSelect_${language.code}`} style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                        <View style={{width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            <Text>{`${language.flag}`}</Text>
                        </View>
                        <Text style={{width: "60%"}}>{`${languageSelect[language.code]}`}</Text>
                        <View style={{width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            <RadioButton
                                value="first"
                                status={ selectedLanguage === language.code ? 'checked' : 'unchecked' }
                                onPress={() => handleLanguageSwitch(language.code)}
                            />
                        </View>
                    </View>
                )
            })}

            <View style={{marginTop: defaultViewPadding*2}}>
                <Text >{languageHint[language]}</Text>
            </View>
        </View>
    )
}