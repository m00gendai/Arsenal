import { SimpleTranslation } from "./interfaces_text"

interface ScannerNavigate{
    title: SimpleTranslation
    subtitle: SimpleTranslation
    error: SimpleTranslation
}

export const scannerNavigate: ScannerNavigate = {
    title: {
        de: "QR-Code-Navigator",
        en: "QR Code Navigator", 
        fr: "Navigateur de codes QR",
        it: "Navigatore QR Code",
        ch: "Navigatur da code QR"
    },
    subtitle: {
        de: `Scanne einen QR-Code und wähle aus, ob die App versuchen soll, zu einem Eintrag zu navigieren, der entweder anhand seiner ID oder des Wertes im Feld "QR Code" identifiziert wird.`,
        en: `Scan a QR Code and select if the app should try to navigate to an item based on its ID or the value in the "QR Code" field.`, 
        fr: `Scannez un code QR et sélectionnez si l’application doit essayer de naviguer vers un élément en fonction de son ID ou de la valeur dans le champ "QR Code".`,
        it: `Scansionate un codice QR e selezionate se l’app deve provare a navigare verso un elemento in base al suo ID o al valore nel campo "QR Code".`,
        ch: `Scannescha in code QR e tscherna, sche l’app duai empruvar da navigar tar in object che vegn identifitgà a maun da sia ID u da sia valur en il champ "QR Code".`
    },
    error: {
        de: "Keinen gültigen Eintrag gefunden für {{{A}}}:",
        en: "No valid entry found for {{{A}}}:", 
        fr: "Aucune entrée valide trouvée pour {{{A}}}:",
        it: "Non è stato trovato alcun elemento valido per {{{A}}}:",
        ch: "Betg chattà in’inoltraziun valaivla per {{{A}}}:"
    }
}