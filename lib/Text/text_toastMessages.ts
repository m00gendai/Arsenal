import { SimpleTranslation } from "./interfaces_text"

interface Toast{
    saved: SimpleTranslation
    changed: SimpleTranslation
    dbSaveSuccess: SimpleTranslation
    dbImportSuccess: SimpleTranslation
    wrongGunDbSelected: SimpleTranslation
    wrongAmmoDbSelected: SimpleTranslation
    mountAccessory: SimpleTranslation
    removeAccessory: SimpleTranslation
}

export const toastMessages:Toast = {
    saved: {
        de: "gespeichert",
        en: "saved",
        fr: "enregistré",
        it: "salvato",
        ch: "accumulà",
    },
    changed: {
        de: "geändert",
        en: "changed",
        fr: "modifié",
        it: "modificato",
        ch: "modifitgà",
    },
    dbSaveSuccess: {
        de: "Datenbank im Downloads-Ordner gespeichert",
        en: "Database stored in the Downloads folder",
        fr: "Base de données enregistrée dans le dossier Téléchargements",
        it: "Banca dati salvata nella cartella Download",
        ch: "Arcunada en l'ordinatur da download",
    },
    dbImportSuccess: {
        de: "Datensätze importiert",
        en: "datasets imported",
        fr: "enregistrements importés",
        it: "dati importati",
        ch: "importà unitads da datas",
    },
    wrongGunDbSelected: {
        de: "Achtung: Sicherstellen, dass eine Waffendatenbank ausgewählt ist (gunDB_17.....)",
        en: "Attention: Make sure that a gun database is selected (gunDB_17.....)",
        fr: "Attention : s'assurer qu'une base de données d'armes est sélectionnée (gunDB_17.....)",
        it: "Attenzione: assicurarsi che sia selezionato un database di armi (gunDB_17.....).",
        ch: "Attenziun: garantir ch'ina banca da datas davart las armas vegnia tschernida (gunDB_17.....)"
    },
    wrongAmmoDbSelected: {
        de: "Achtung: Sicherstellen, dass eine Munitionsdatenbank ausgewählt ist (ammoDB_17.....)",
        en: "Attention: Ensure that an ammunition database is selected (ammoDB_17.....)",
        fr: "Attention : s'assurer qu'une base de données de munitions est sélectionnée (ammoDB_17.....)",
        it: "Attenzione: assicurarsi che sia selezionato un database di munizioni (ammoDB_17.....).",
        ch: "Attenziun: garantir ch'ina banca da datas da muniziun saja tschernida (ammoDB_17.....)"
    },
    mountAccessory: {
        de: `Zubehör/Waffenteil auf {{{A}}} montiert.`,
        en: "Accessory/Weapon Part mounted on {{{A}}}",
        fr: "Accessoire/pièce d’arme montée sur {{{A}}}",
        it: "Accessorio/parte dell’arma montata su {{{A}}}",
        ch: "Accessoris/part da las armas montads sin {{{A}}}",
    },
    removeAccessory: {
        de: `{{{A}}} entfernt.`,
        en: "{{{A}}} removed.",
        fr: "{{{A}}} éloigné.",
        it: "{{{{A}}} lontano.",
        ch: "{{{A}}} davent.",
    }
}