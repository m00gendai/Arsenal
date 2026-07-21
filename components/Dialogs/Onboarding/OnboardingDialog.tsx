import { defaultModalBackdrop, defaultViewPadding } from "configs/configs";
import { useState } from "react";
import { Dimensions, View } from "react-native";
import { Icon, IconButton, Modal, Portal, Text } from "react-native-paper";
import { usePreferenceStore } from "stores/usePreferenceStore";
import Onboarding_LanguageSelect from "./Onboarding_LanguageSelect";
import Onboarding_CurrencySelect from "./Onboarding_CurrencySelect";
import Onboarding_WeightSelect from "./Onboarding_UnitSelect";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PREFERENCES } from "configs/configs_DB";
import { useViewStore } from "stores/useViewStore";
import { ScrollView } from "react-native-gesture-handler";
import Onboarding_CountrySelect from "./Onboarding_CountrySelect";
import { distUnitNames, weightUnitNames } from "lib/interfaces";

export default function OnboardingDialog(){

    const { theme, setHasBeenOnboarded, setPreferredUnits } = usePreferenceStore()
    const { onboardingVisible, setOnboardingVisible} = useViewStore()    

    const [onboardIndex, setOnboardIndex] = useState<number>(0)

    const [selectedCurrency, setSelectedCurrency] = useState<string>("CHF")

    const [generalWeightUnit, setGeneralWeightUnit] = useState<weightUnitNames>("g")
    const [selectedBulletWeight, setSelectedBulletWeight] = useState<weightUnitNames>("gr")
    const [selectedPowderWeight, setSelectedPowderWeight] = useState<weightUnitNames>("kg")

    const [generalLengthUnit, setGeneralLengthUnit] = useState<distUnitNames>("cm")
    const [barrelLengthUnit, setBarrelLengthUnit] = useState<distUnitNames>("in")
    const [caseLengthUnit, setCaseLengthUnit] = useState<distUnitNames>("in")

    const titles = [
        {
            title: "Eligere Lingua",
            left: "translate",
            right: "translate",
        },
        {
            title: "Eligere patriam",
            left: "earth",
            right: "earth",
        },
        {
            title: "Eligere Pecuniam",
            left: "currency-usd",
            right: "cash-multiple",
        },
        {
            title: "Eligere Unitates",
            left: "weight-kilogram",
            right: "ruler",
        },
    ]

    function forward(){
        setOnboardIndex(onboardIndex => onboardIndex+1)
    }
    function backward(){
        setOnboardIndex(onboardIndex => onboardIndex-1)
    }

    async function savePreferredUnits(){
        const preferences:string = await AsyncStorage.getItem(PREFERENCES)
        const onboardingPreferences = {
            selectedCurrency: selectedCurrency,
            generalWeightUnit: generalWeightUnit,
            bulletWeightUnit: selectedBulletWeight,
            powderWeightUnit: selectedPowderWeight,
            criticalPowderWeightUnit: selectedPowderWeight,
            generalLengthUnit: generalLengthUnit,
            barrelLengthUnit: barrelLengthUnit,
            caseLengthUnit: caseLengthUnit
        }
        
        const newPreferences:{[key:string] : string} = preferences == null ? {
            preferredUnits: onboardingPreferences,
            hasBeenOnboarded: true
        } : {
            ...JSON.parse(preferences), 
            preferredUnits: onboardingPreferences,
            hasBeenOnboarded: true
        } 
        
        await AsyncStorage.setItem(PREFERENCES, JSON.stringify(newPreferences))
        setPreferredUnits(onboardingPreferences)
        setOnboardingVisible(false)
        setHasBeenOnboarded(true)
    }
    
    return(

        <Portal >
            <Modal visible={onboardingVisible} onDismiss={()=>setOnboardingVisible(false)} style={{position: "absolute"}}>
                <View 
                    style={{
                        width: "100%", 
                        height: "100%", 
                        display: "flex", 
                        flexDirection: "row", 
                        justifyContent: "center", 
                        alignItems: "center", 
                        alignContent: "center", 
                        flexWrap: "wrap", 
                        backgroundColor: defaultModalBackdrop
                    }}
                >
                    <View 
                        style={{
                            borderRadius: 25, 
                            width: (Dimensions.get("window").width/100)*85, 
                            height: (Dimensions.get("window").height/100)*85, 
                            display: "flex", 
                            flexDirection: "column", 
                            justifyContent: "flex-start", 
                            alignItems: "flex-start", 
                            flexWrap: "wrap", 
                            backgroundColor: theme.colors.background,
                        }}
                    >
                        <View 
                            style={{
                                backgroundColor: theme.colors.primary, 
                                width: "100%", 
                                borderTopLeftRadius: 25, 
                                borderTopRightRadius: 25,
                                padding: defaultViewPadding,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: defaultViewPadding
                            }}
                        >
                            <Icon source={titles[onboardIndex].left} size={20} color={theme.colors.onPrimary}/>
                            <Text variant="titleLarge" style={{color: theme.colors.onPrimary}}>
                                {titles[onboardIndex].title}
                            </Text>
                            <Icon source={titles[onboardIndex].right} size={20} color={theme.colors.onPrimary}/>
                        </View>
                        <ScrollView style={{width: "100%", flexDirection: "column", flexGrow: 1, padding: defaultViewPadding}}>
                            
                            <View style={{ flex: 1, display: onboardIndex === 0 ? "flex" : "none" }}>
                                <Onboarding_LanguageSelect />
                            </View>

                            <View style={{ flex: 1, display: onboardIndex === 1 ? "flex" : "none" }}>
                                <Onboarding_CountrySelect />
                            </View>

                            <View style={{ flex: 1, display: onboardIndex === 2 ? "flex" : "none" }}>
                                <Onboarding_CurrencySelect 
                                    selectedCurrency={selectedCurrency}
                                    setSelectedCurrency={setSelectedCurrency}
                                />
                            </View>

                            <View style={{ flex: 1, display: onboardIndex === 3 ? "flex" : "none" }}>
                                <Onboarding_WeightSelect 
                                    generalLengthUnit={generalLengthUnit} 
                                    setGeneralLengthUnit={setGeneralLengthUnit} 
                                    barrelLengthUnit={barrelLengthUnit}
                                    setBarrelLengthUnit={setBarrelLengthUnit}
                                    caseLengthUnit={caseLengthUnit}
                                    setCaseLengthUnit={setCaseLengthUnit}
                                    generalWeightUnit={generalWeightUnit} 
                                    setGeneralWeightUnit={setGeneralWeightUnit} 
                                    selectedBulletWeight={selectedBulletWeight} 
                                    setSelectedBulletWeight={setSelectedBulletWeight} 
                                    selectedPowderWeight={selectedPowderWeight}
                                    setSelectedPowderWeight={setSelectedPowderWeight}/>
                                    
                            </View>
                        </ScrollView>

                        

                        <View style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            {onboardIndex !== 0 ? <IconButton
                                icon="chevron-left"
                                iconColor={theme.colors.onPrimary}
                                size={20}
                                onPress={() => backward()}
                                style={{backgroundColor: theme.colors.primary}}
                            /> : <IconButton
                                icon=""
                                iconColor={theme.colors.onPrimary}
                                size={20}
                                onPress={null}
                            />}
                            {onboardIndex !== titles.length-1 ? <IconButton
                                icon="chevron-right"
                                iconColor={theme.colors.onPrimary}
                                size={20}
                                onPress={() => forward()}
                                style={{backgroundColor: theme.colors.primary}}
                            /> : <IconButton
                                icon="check"
                                iconColor={theme.colors.onPrimary}
                                size={20}
                                onPress={() => savePreferredUnits()}
                                style={{backgroundColor: theme.colors.primary}}
                            />}
                        </View>
                        
                    </View>
                </View>
            </Modal>
        </Portal>
    )
}
        