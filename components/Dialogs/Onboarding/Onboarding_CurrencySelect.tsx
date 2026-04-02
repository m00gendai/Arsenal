import { defaultViewPadding } from "configs/configs";
import { SimpleTranslation } from "lib/textTemplates";
import { currencies } from "lib/unitData";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { usePreferenceStore } from "stores/usePreferenceStore";

interface Props{
    selectedCurrency: string
    setSelectedCurrency: React.Dispatch<React.SetStateAction<string>>
}

export default function Onboarding_CurrencySelect({selectedCurrency, setSelectedCurrency}:Props){

    const { language, switchLanguage, theme } = usePreferenceStore()

    const data = currencies.map(currency => {
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

    const currencyHint: SimpleTranslation = {
        de: "Die Währungsangabe ist rein kosmetisch, sämtliche Preise werden als reine Nummern in der Datenbank abgelegt.\n\nSollte etwas in einer Fremdwährung gekauft worden sein, so ist der umgerechnete Betrag in die App einzutragen - mangels Onlinefunktionalität sind keine aktuellen Devisenkurse abrufbar.\n\nDie Währung kann jederzeit in den Einstellungen geändert werden, die Nummer in der Datenbank ändert sich jedoch nicht.",
        en: "The currency selection is purely cosmetic, all prices are saved in the database as numbers only.\n\nShould you have bought something in another currency, enter the converted amount into the app - since there is no online functionality, there is no possibilities to use current conversion rates.\n\nThe currency can be changed via settings at any time, the number in the database will remain, however.",
        fr: "La sélection de la devise est purement cosmétique, tous les montants sont enregistrés dans la base de données uniquement sous forme de nombres.\n\nSi un achat a été effectué dans une devise étrangère, le montant converti doit être saisi dans l’application - en l’absence de fonctionnalité en ligne, aucun taux de change actuel ne peut être utilisé.\n\nLa devise peut être modifiée à tout moment dans les paramètres, toutefois le nombre enregistré dans la base de données reste inchangé.",
        it: "La selezione della valuta è puramente cosmetica, tutti gli importi vengono salvati nel database esclusivamente come numeri.\n\nSe un acquisto è stato effettuato in una valuta estera, l’importo convertito deve essere inserito nell’app - in assenza di funzionalità online non è possibile utilizzare tassi di cambio aggiornati.\n\nLa valuta può essere modificata in qualsiasi momento nelle impostazioni, tuttavia il numero nel database rimane invariato.",
        ch: "La selecziun da la valuta è puramain cosmetica, tut ils imports vegnan memorisads en la banca da datas mo sco nums.\n\nSche in cumpra è vegnida fatga en ina valuta estra, sto vegnir endatà l’import convertì en l’app - pervi da la mancanza da funcziunalitad online na pon vegnir duvrads nagins curs da midada actuals.\n\nLa valuta po vegnir midada da tut temp en las configuraziuns, dentant il numer en la banca da datas resta senza midada.",
    }

    
    return(
         <View>
            <Dropdown
                label={currencyLabel[language]}
                placeholder="Select Gender"
                options={data}
                value={selectedCurrency}
                onSelect={setSelectedCurrency}
                menuContentStyle={{height: "100%"}}
            />

            <View style={{marginTop: defaultViewPadding*2}}>
                <Text style={{fontStyle: 'italic'}}>{currencyHint[language]}</Text>
            </View>
        </View>
    )
}