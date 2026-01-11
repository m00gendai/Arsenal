import { defaultViewPadding, languageSelection } from "configs";
import { Languages } from "interfaces";
import { SimpleTranslation } from "lib/textTemplates";
import { distUnits, weightUnits } from "lib/unitData";
import { SetStateAction, useState } from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-paper-dropdown";
import { Divider, Text } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore";

interface Props{
    generalWeightUnit: string
    setGeneralWeightUnit: React.Dispatch<React.SetStateAction<string>>
    selectedBulletWeight: string
    setSelectedBulletWeight: React.Dispatch<React.SetStateAction<string>>
    selectedPowderWeight: string
    setSelectedPowderWeight: React.Dispatch<React.SetStateAction<string>>
    generalLengthUnit: string 
    setGeneralLengthUnit: React.Dispatch<React.SetStateAction<string>>
    barrelLengthUnit: string
    setBarrelLengthUnit: React.Dispatch<React.SetStateAction<string>>
}

export default function Onboarding_WeightSelect(
    {
        generalWeightUnit, 
        setGeneralWeightUnit,  
        selectedBulletWeight, 
        setSelectedBulletWeight, 
        selectedPowderWeight, 
        setSelectedPowderWeight,
        generalLengthUnit, 
        setGeneralLengthUnit,
        barrelLengthUnit,
        setBarrelLengthUnit
    }: 
Props){

    const { language, theme } = usePreferenceStore()

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

    const weightLabelGeneral: SimpleTranslation = {
        de: "Generelle Gewichtseinheit",
        en: "General Weight Unit",
        fr: "Unité de poids générale",
        it: "Unità di peso generale",
        ch: "Unitad da pais generala",
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

    const unitHint: SimpleTranslation = {
        de: "Gewichtseinheiten werden in der Datenbank in Milligramm gespeichert und je nach gewählter Einheit umgerechnet dargestellt. Längenmässe in Milimeter. Die Einheiten können jederzeit in den Einstellungen geändert werden.",
        en: "Weight units are saved in the database in milligrams and displayed converted according to the chosen unit. Length units in millimeters. The units can be changed in the settings at any time.",
        fr: "Les unités de poids sont enregistrées dans la base de données en milligrammes et affichées sous forme convertie selon l’unité sélectionnée. Unités de longueur en millimètres. Les unités peuvent être modifiées à tout moment dans les paramètres.",
        it: "Le unità di peso vengono salvate nel database in milligrammi e visualizzate in forma convertita in base all’unità selezionata. Unità di lunghezza in millimetri. Le unità possono essere modificate in qualsiasi momento nelle impostazioni.",
        ch: "Las unitads da pais vegnan memorisadas en la banca da datas en milligrams e visualisadas convertidas tenor l’unitad tschernida. Unitads da lunghezza en millimeters. Las unitads pon vegnir midada da tut temp en las configuraziuns.",
    }
    
    return(
         <View>
            <Dropdown
                label={weightLabelGeneral[language]}
                options={weightData}
                value={generalWeightUnit}
                onSelect={setGeneralWeightUnit}
                menuContentStyle={{height: "100%"}}
            />

            <Dropdown
                label={weightLabelBulletWeight[language]}
                options={weightData}
                value={selectedBulletWeight}
                onSelect={setSelectedBulletWeight}
                menuContentStyle={{height: "100%"}}
            />

            <Dropdown
                label={weightLabelPowderWeight[language]}
                options={weightData}
                value={selectedPowderWeight}
                onSelect={setSelectedPowderWeight}
                menuContentStyle={{height: "100%"}}
            />

            <Divider style={{height: 2, width: "100%", backgroundColor: theme.colors.primary, marginTop: defaultViewPadding, marginBottom: defaultViewPadding}} />

            <Dropdown
                label={lengthLabelGeneral[language]}
                options={lengthData}
                value={generalLengthUnit}
                onSelect={setGeneralLengthUnit}
                menuContentStyle={{height: "100%"}}
            />

            <Dropdown
                label={lengthLabelBarrel[language]}
                options={lengthData}
                value={barrelLengthUnit}
                onSelect={setBarrelLengthUnit}
                menuContentStyle={{height: "100%"}}
            />

            <View style={{flex: 1}}></View>

            <View style={{marginTop: defaultViewPadding*2}}>
                <Text style={{fontStyle: 'italic'}}>{unitHint[language]}</Text>
            </View>
        </View>
    )
}