import { SimpleTranslation } from "./interfaces_text"

interface Toast{
    saved: SimpleTranslation
    changed: SimpleTranslation
    dbSaveSuccess: SimpleTranslation
    dbSaveFail: SimpleTranslation
    dbSaveCancel: SimpleTranslation
    dbImportSuccess: SimpleTranslation
    dbImportFail: SimpleTranslation
    dbImportCancel: SimpleTranslation
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
    dbSaveCancel: {
        de: "Datenbankexport abgebrochen",
        en: "Database Export cancelled",
        fr: "Exportation de la base de données annulée",
        it: "Exportazione del database annullata",
        ch: "Export da la banca da datas interrut",
    },
    dbSaveFail: {
        de: "Datenbankexport fehlgeschlagen",
        en: "Database Export failed",
        fr: "Échec de l'exportation de la base de données",
        it: "Exportazione del database non riuscita",
        ch: "L'export da la banca da datas è betg reussì",
    },
    dbImportSuccess: {
        de: "Datenbank erfolgreich importiert",
        en: "Database successfully imported",
        fr: "Base de données importée avec succès",
        it: "Database importato con successo",
        ch: "Importà cun success la banca da datas",
    },
    dbImportCancel: {
        de: "Datenbankimport abgebrochen",
        en: "Database Import cancelled",
        fr: "Importation de la base de données annulée",
        it: "Importazione del database annullata",
        ch: "Import da la banca da datas interrut",
    },
    dbImportFail: {
        de: "Datenbank Import fehlgeschlagen",
        en: "Database Import failed",
        fr: "Échec de l'importation de la base de données",
        it: "Importazione del database non riuscita",
        ch: "L'import da la banca da datas è betg reussì",
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