import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultViewPadding } from "configs/configs";
import { SimpleTranslation } from "lib/textTemplates";
import { View } from "react-native";
import { List } from "react-native-paper";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { currencies, distUnits, weightUnits } from "lib/unitData";
import { Dropdown } from "react-native-paper-dropdown";
import { useEffect, useState } from "react";
import { PREFERENCES } from "configs/configs_DB";
import { preferenceTitles } from "lib/Text/text_settings";

export default function Settings_Units(){

    const { theme, language, preferredUnits, setPreferredUnits } = usePreferenceStore()
    
    const [selectedCurrency, setSelectedCurrency] = useState<string>(preferredUnits.selectedCurrency)

    const [generalWeightUnit, setGeneralWeightUnit] = useState<string>(preferredUnits.generalWeightUnit)
    const [selectedBulletWeight, setSelectedBulletWeight] = useState<string>(preferredUnits.bulletWeightUnit)
    const [selectedPowderWeight, setSelectedPowderWeight] = useState<string>(preferredUnits.powderWeightUnit)

    const [generalLengthUnit, setGeneralLengthUnit] = useState<string>(preferredUnits.generalLengthUnit)
    const [barrelLengthUnit, setBarrelLengthUnit] = useState<string>(preferredUnits.barrelLengthUnit)

    useEffect(()=>{
        async function saveUnits(){
            const preferences:string = await AsyncStorage.getItem(PREFERENCES)
            const onboardingPreferences = {
                selectedCurrency: selectedCurrency,
                generalWeightUnit: generalWeightUnit,
                bulletWeightUnit: selectedBulletWeight,
                powderWeightUnit: selectedPowderWeight,
                generalLengthUnit: generalLengthUnit,
                barrelLengthUnit: barrelLengthUnit
            }
        
            const newPreferences:{[key:string] : string} = preferences == null ? {
                preferredUnits: onboardingPreferences
            } : {
                ...JSON.parse(preferences), 
                preferredUnits: onboardingPreferences,
            } 
        
            await AsyncStorage.setItem(PREFERENCES, JSON.stringify(newPreferences))
            setPreferredUnits(onboardingPreferences)
        }
        saveUnits()
    },[generalLengthUnit, barrelLengthUnit, generalWeightUnit, selectedBulletWeight, selectedPowderWeight, selectedCurrency])

    const weightData = weightUnits.map(unit => {
            return(
                {label: `${unit[language]} - ${unit.iso}`, value: `${unit.iso}`}
            )
        })
    
        const lengthData = distUnits.map(unit => {
            return(
                {label: `${unit[language]} - ${unit.iso}`, value: `${unit.iso}`}
            )
        })
     const currencyData = currencies.map(currency => {
            return(
                {label: `${currency.flag} ${currency.isoCode} ${currency.name}`, value: `${currency.isoCode}`}
            )
        })
    
        const currencyLabel: SimpleTranslation = {
            de: "Währung",
            en: "Currency",
            fr: "Devise",
            it: "Valuta",
            ch: "Valuta",
        }
        const weightLabelGeneral: SimpleTranslation = {
            de: "Generelle Gewichtseinheit",
            en: "General Weight Unit",
            fr: "Unité de poids générale",
            it: "Unità di peso generale",
            ch: "Unitad da pais generala",
        }
    
        const weightLabelBulletWeight: SimpleTranslation = {
            de: "Einheit Geschossgewicht",
            en: "Unit Bullet Weight",
            fr: "Unité du poids du projectile",
            it: "Unità del peso del proiettile",
            ch: "Unitad dal pais dal projectil",
        }
    
        const weightLabelPowderWeight: SimpleTranslation = {
            de: "Einheit Pulvergewicht",
            en: "Unit Powder Weight",
            fr: "Unité du poids de la poudre",
            it: "Unità del peso della polvere",
            ch: "Unitad dal pais da la pulvara",
        }

        const lengthLabelGeneral: SimpleTranslation = {
            de: "Generelle Längeneinheit",
            en: "General Length Unit",
            fr: "Unité de longueur générale",
            it: "Unità di lunghezza generale",
            ch: "Unitad da lunghezza generala",
        }

        const lengthLabelBarrel: SimpleTranslation = {
            de: "Einheit Lauflänge",
            en: "Unit Barrel Length",
            fr: "Unité de longueur du canon",
            it: "Unità di lunghezza della canna",
            ch: "Unitad da lunghezza dal chanal",
        }
    

    return( 
        <View style={{backgroundColor: theme.colors.tertiaryContainer}}>
            <List.Accordion id="Settings_Units" left={props => <List.Icon {...props} icon="weight-kilogram" />} title={preferenceTitles.preferredUnits[language]} titleStyle={{fontWeight: "700", color: theme.colors.onTertiaryContainer}} style={{paddingLeft: defaultViewPadding*2, backgroundColor: theme.colors.tertiaryContainer}}>
                <View style={{ marginLeft: 5, marginRight: 5, padding: defaultViewPadding, backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.primary, borderLeftWidth: 5}}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", gap: 5}}>
                        
                        <View style={{width: "100%"}}>
                            <Dropdown
                                label={currencyLabel[language]}
                                placeholder="Select Gender"
                                options={currencyData}
                                value={selectedCurrency}
                                onSelect={setSelectedCurrency}
                                menuContentStyle={{height: "100%"}}
                            />
                        </View>

                        <View style={{width: "100%"}}>
                            <Dropdown
                                label={weightLabelGeneral[language]}
                                options={weightData}
                                value={generalWeightUnit}
                                onSelect={setGeneralWeightUnit}
                                menuContentStyle={{height: "100%"}}
                            />
                        </View>

                        <View style={{width: "100%"}}>
                            <Dropdown
                                label={weightLabelBulletWeight[language]}
                                options={weightData}
                                value={selectedBulletWeight}
                                onSelect={setSelectedBulletWeight}
                                menuContentStyle={{height: "100%"}}
                            />
                        </View>

                        <View style={{width: "100%"}}>
                            <Dropdown
                                label={weightLabelPowderWeight[language]}
                                options={weightData}
                                value={selectedPowderWeight}
                                onSelect={setSelectedPowderWeight}
                                menuContentStyle={{height: "100%"}}
                            />
                        </View>

                        <View style={{width: "100%"}}>
                            <Dropdown
                                label={lengthLabelGeneral[language]}
                                options={lengthData}
                                value={generalLengthUnit}
                                onSelect={setGeneralLengthUnit}
                                menuContentStyle={{height: "100%"}}
                            />
                        </View>

                        <View style={{width: "100%"}}>
                            <Dropdown
                                label={lengthLabelBarrel[language]}
                                options={lengthData}
                                value={barrelLengthUnit}
                                onSelect={setBarrelLengthUnit}
                                menuContentStyle={{height: "100%"}}
                            />
                        </View>

                    </View>
                </View>
            </List.Accordion>
        </View>
    )
}