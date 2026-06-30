import AsyncStorage from "@react-native-async-storage/async-storage";
import { countrySelection, defaultViewPadding, languageSelection } from "configs/configs";
import { PREFERENCES } from "configs/configs_DB";
import { Languages, SupportedCountries } from "lib/interfaces";
import { SimpleTranslation } from "lib/textTemplates";
import { useState } from "react";
import { View } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import { usePreferenceStore } from "stores/usePreferenceStore";

export default function Onboarding_CountrySelect(){

    const { language, switchCountry, theme } = usePreferenceStore()

    const [selectedCountry, setSelectedCountry] = useState<SupportedCountries>("ch")

    const countryHint: SimpleTranslation = {
        de: "Je nach gewähltem Land werden einige länderspezifische Funktionen sichtbar. Diese können aber jederzeit in den Einstellungen individuell aus- oder eingeschaltet werden, auch unabhängig vom gewählten Land.",
        en: "The language can be changed any time in the settings menu",
        fr: "La langue peut être modifiée à tout moment dans les paramètres",
        it: "La lingua può essere modificata in qualsiasi momento nelle impostazioni",
        ch: "La lingua po vegnir midada da tut temp en las configuraziuns",
    }

    async function handleCountrySwitch(country:SupportedCountries){
        setSelectedCountry(country)
        switchCountry(country)
        const preferences:string = await AsyncStorage.getItem(PREFERENCES)
        const newPreferences:{[key:string] : string} = preferences == null ? {"country": country} : {...JSON.parse(preferences), "country": country} 
        await AsyncStorage.setItem(PREFERENCES, JSON.stringify(newPreferences))
    }
    
    return(
        <View style={{ flex: 1, width: "100%" }}>
            {countrySelection.map(country =>{
                return (
                    <View key={`countrySelection_${country.iso}`} style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                        <View style={{width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            <Text>{`${country.flag}`}</Text>
                        </View>
                        <Text style={{width: "60%"}}>{`${country.name[language]}`}</Text>
                        <View style={{width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            <RadioButton
                                value="first"
                                status={ selectedCountry === country.iso ? 'checked' : 'unchecked' }
                                onPress={() => handleCountrySwitch(country.iso)}
                            />
                        </View>
                    </View>
                )
            })}

            <View style={{marginTop: defaultViewPadding*2}}>
                <Text style={{fontStyle: 'italic'}}>{countryHint[language]}</Text>
            </View>
        </View>
    )
}