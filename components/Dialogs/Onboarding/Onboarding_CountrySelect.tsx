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
        de: "Je nach gewähltem Land werden einige länderspezifische Funktionen sichtbar, hauptsächlich Klassifizierungen für Waffen und vordefinierte PDF-Listen.\n\nDas Land kann in den Einstellungen jederzeit ohne Datenverlust gewechselt werden; Die Datenbank unterscheidet nicht zwischen Ländern, es geht rein um die Darstellung.",
        en: "Depending on the selected country, some country-specific features will become available, mainly firearm classifications and predefined PDF lists.\n\nThe country can be changed at any time in the settings without losing any data. The database does not distinguish between countries; this setting only affects the presentation.",
        fr: "Selon le pays sélectionné, certaines fonctionnalités spécifiques au pays deviennent disponibles, principalement les classifications des armes et les listes PDF prédéfinies.\n\nLe pays peut être modifié à tout moment dans les paramètres sans perte de données. La base de données ne fait aucune distinction entre les pays ; ce réglage n'affecte que la présentation.",
        it: "A seconda del Paese selezionato, saranno disponibili alcune funzionalità specifiche del Paese, principalmente le classificazioni delle armi e gli elenchi PDF predefiniti.\n\nIl Paese può essere modificato in qualsiasi momento nelle impostazioni senza alcuna perdita di dati. Il database non distingue tra i diversi Paesi; questa impostazione influisce esclusivamente sulla visualizzazione.",
        ch: "Tut tenor il pajais tschernì vegnan activadas tschertas funcziuns specificas dal pajais, principalmain classificaziuns d'armas e glistas PDF predefinidas.\n\nIl pajais po vegnir midà da tut temp en las preferenzas senza perdita da datas. La banca da datas na fa nagina differenza tranter ils pajais; questa configuraziun influenzescha mo la preschentaziun.",
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