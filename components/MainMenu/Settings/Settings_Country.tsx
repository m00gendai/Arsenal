import AsyncStorage from "@react-native-async-storage/async-storage";
import { countrySelection, defaultViewPadding } from "configs/configs";
import { SimpleTranslation } from "lib/textTemplates";
import { View } from "react-native";
import { List } from "react-native-paper";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { Dropdown } from "react-native-paper-dropdown";
import { useEffect, useState } from "react";
import { PREFERENCES } from "configs/configs_DB";
import { preferenceTitles } from "lib/Text/text_settings";
import { SupportedCountries } from "lib/interfaces";

export default function Settings_Country(){

    const { theme, language, country, switchCountry } = usePreferenceStore()
    
    const [selectedCountry, setSelectedCountry] = useState<SupportedCountries>(country)

    useEffect(()=>{
        async function saveUnits(){
            const preferences:string = await AsyncStorage.getItem(PREFERENCES)
        
            const newPreferences:{[key:string] : string} = preferences == null ? {
                country: selectedCountry
            } : {
                ...JSON.parse(preferences), 
                country: selectedCountry,
            } 
        
            await AsyncStorage.setItem(PREFERENCES, JSON.stringify(newPreferences))
            switchCountry(selectedCountry)
        }
        saveUnits()
    },[selectedCountry])

    const selectCountryLabel:SimpleTranslation = {
        de: "Land auswählen",
        en: "Choose country",
        fr: "",
        it: "",
        ch: ""
    }

    const countryData = countrySelection.map(country => {return(
        {label: `${country.name[language]}`, value: `${country.iso}`}
    )})

    function selectCountry(iso: string){
        const code = iso as SupportedCountries
        setSelectedCountry(code)
    }

    return( 
        <View style={{backgroundColor: theme.colors.tertiaryContainer}}>
            <List.Accordion id="Settings_Units" left={props => <List.Icon {...props} icon="web" />} title={preferenceTitles.countrySpecifics[language]} titleStyle={{fontWeight: "700", color: theme.colors.onSecondaryContainer}} style={{paddingLeft: defaultViewPadding*2, backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.primary, borderLeftWidth: 5}}>
                <View style={{padding: defaultViewPadding, backgroundColor: theme.colors.tertiaryContainer}}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", gap: 5}}>
                        
                        <View style={{width: "100%"}}>
                            <Dropdown
                                label={selectCountryLabel[language]}
                                placeholder="Select Gender"
                                options={countryData}
                                value={selectedCountry}
                                onSelect={selectCountry}
                                menuContentStyle={{height: "100%"}}
                            />
                        </View>

                    </View>
                </View>
            </List.Accordion>
        </View>
    )
}