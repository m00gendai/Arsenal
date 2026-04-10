import { SimpleTranslation } from "./interfaces_text"

interface Alert{
    title: SimpleTranslation
    subtitle: SimpleTranslation
    yes: SimpleTranslation
    no: SimpleTranslation
}

export const unsavedChangesAlert:Alert = {
    title: {
        de: "Es hat nicht gespeicherte Änderungen",
        en: "Unsaved changes",
        fr: "Il a des modifications non sauvegardées",
        it: "Modifiche non salvate",
        ch: "I n'ha betg midadas accumuladas",
    },
    subtitle: {
        de: "Wirklich zurück?",
        en: "Continue?",
        fr: "vraiment revenir?",
        it: "Davvero tornare?",
        ch: "Propi enavos?",
    },
    yes: {
        de: "Ja",
        en: "Yes",
        fr: "Oui",
        it: "Sì",
        ch: "Gea",
    },
    no: {
        de: "Nein",
        en: "No",
        fr: "Non",
        it: "No",
        ch: "Na",
    }
}

export const imageDeleteAlert:Alert = {
    title: {
        de: "Bild wirklich löschen?",
        en: "Delete image?",
        fr: "Supprimer vraiment l'image?",
        it: "Eliminare l'immagine?",
        ch: "Propi stizzar il maletg?",
    },
    subtitle: {
        de: "",
        en: "",
        fr: "",
        it: "",
        ch: "",
    },
    yes: {
        de: "Ja",
        en: "Yes",
        fr: "Oui",
        it: "Sì",
        ch: "Gea",
    },
    no: {
        de: "Nein",
        en: "No",
        fr: "Non",
        it: "No",
        ch: "Na",
    }
}

export const gunDeleteAlert:Alert = {
    title: {
        de: "wirklich löschen?",
        en: "will be deleted",
        fr: "vraiment supprimer?",
        it: "davvero eliminare?",
        ch: "propi stizzar?",
    },
    subtitle: {
        de: "Die Waffe wird unwiderruflich gelöscht. Wirklich fortfahren?",
        en: "The gun will be irrevocably deleted. Really continue?",
        fr: "L'arme sera effacée de manière irréversible. Vraiment continuer?",
        it: "L'arma sarà eliminata in modo irreversibile. Continuare davvero?",
        ch: "L'arma vegn stizzada irrevocablamain. Propi cuntinuar?",
    },
    yes: {
        de: "Ja",
        en: "Yes",
        fr: "Oui",
        it: "Sì",
        ch: "Gea",
    },
    no: {
        de: "Nein",
        en: "No",
        fr: "Non",
        it: "No",
        ch: "Na",
    }
}

export const ammoDeleteAlert:Alert = {
    title: {
        de: "wirklich löschen?",
        en: "will be deleted",
        fr: "vraiment supprimer?",
        it: "davvero eliminare?",
        ch: "propi stizzar?",
    },
    subtitle: {
        de: "Die Munition wird unwiderruflich gelöscht. Wirklich fortfahren?",
        en: "The ammunition will be irrevocably deleted. Really continue?",
        fr: "Les munitions sera effacée de manière irréversible. Vraiment continuer?",
        it: "Le munizioni saranno eliminate in modo irreversibile. Continuare davvero?",
        ch: "La muniziun vegn stizzada irrevocablamain. Propi cuntinuar?",
    },
    yes: {
        de: "Ja",
        en: "Yes",
        fr: "Oui",
        it: "Sì",
        ch: "Gea",
    },
    no: {
        de: "Nein",
        en: "No",
        fr: "Non",
        it: "No",
        ch: "Na",
    }
}

export const validationFailedAlert:Alert = {
    title: {
        de: "Validierung fehlgeschlagen",
        en: "Validation failed",
        fr: "Echec de la validation",
        it: "Validazione fallita",
        ch: "La validaziun n'è betg reussida",
    },
    subtitle: {
        de: "",
        en: "",
        fr: "",
        it: "",
        ch: "",
    },
    yes: {
        de: "Ja",
        en: "Yes",
        fr: "Oui",
        it: "Sì",
        ch: "Gea",
    },
    no: {
        de: "OK",
        en: "OK",
        fr: "OK",
        it: "OK",
        ch: "OK",
    }
}

export const databaseImportAlert:Alert = {
    title: {
        de: "Datenbank importieren und aktuelle überschreiben?",
        en: "Import database and overwrite current?",
        fr: "Importer la base de données et remplacer l'actuelle?",
        it: "Importare il database e sovrascrivere l'attuale?",
        ch: "Importar la banca da datas e transcriver il scriver actual?",
    },
    subtitle: {
        de: "Die aktuelle Datenbank wird unwiderruflich mit der importierten überschrieben. Wirklich fortfahren?",
        en: "The current database will be irrevocally overwritten. Really continue?",
        fr: "La base de données actuelle est irrémédiablement écrasée par celle qui a été importée. Vraiment continuer?",
        it: "Il database attuale sarà sovrascritto in modo irrevocabile. Continuare davvero?",
        ch: "La banca da datas actuala vegn transcritta irrevocablamain cun ils importads. Propi cuntinuar?",
    },
    yes: {
        de: "Ja",
        en: "Yes",
        fr: "Oui",
        it: "Sì",
        ch: "Gea",
    },
    no: {
        de: "Nein",
        en: "No",
        fr: "Non",
        it: "No",
        ch: "Na",
    }
}

export const databaseExportAlert:Alert = {
    title: {
        de: "Datenbank im CSV-Format exportieren",
        en: "Export database to CSV format",
        fr: "Exporter la base de données au format CSV",
        it: "Esporta la banca dati in formato CSV",
        ch: "Exportar la banca da datas en il format CSV",
    },
    subtitle: {
        de: "Der Export im CSV Format erfolgt ohne Bilder",
        en: "The export in CSV format only contains data, no images",
        fr: "L'exportation au format CSV ne contient que des données, pas d'images",
        it: "L'esportazione in formato CSV contiene solo i dati, non le immagini",
        ch: "L'export en il format da CSV cuntegna mo datas, nagins maletgs",
    },
    yes: {
        de: "Ja",
        en: "Yes",
        fr: "Oui",
        it: "Sì",
        ch: "Gea",
    },
    no: {
        de: "Nein",
        en: "No",
        fr: "Non",
        it: "No",
        ch: "Na",
    }
}

export const deleteTagFromListAlert:Alert = {
    title: {
        de: "Schlagwort wirklich löschen?",
        en: "Import database and overwrite current?",
        fr: "Importer la base de données et remplacer l'actuelle?",
        it: "Importare il database e sovrascrivere l'attuale?",
        ch: "Importar la banca da datas e transcriver il scriver actual?",
    },
    subtitle: {
        de: "Das Schlagwort wird sowohl aus der Liste wie auch aus dem Eintrag gelöscht",
        en: "The current database will be irrevocally overwritten. Really continue?",
        fr: "La base de données actuelle est irrémédiablement écrasée par celle qui a été importée. Vraiment continuer?",
        it: "Il database attuale sarà sovrascritto in modo irrevocabile. Continuare davvero?",
        ch: "La banca da datas actuala vegn transcritta irrevocablamain cun ils importads. Propi cuntinuar?",
    },
    yes: {
        de: "Ja",
        en: "Yes",
        fr: "Oui",
        it: "Sì",
        ch: "Gea",
    },
    no: {
        de: "Nein",
        en: "No",
        fr: "Non",
        it: "No",
        ch: "Na",
    }
}

export const resizeImageAlert:Alert = {
    title: {
        de: "Bildoptimierung wirklich ausschalten?",
        en: "Turn off image optimization?",
        fr: "Désactiver vraiment l'optimisation de l'image ?",
        it: "Si può davvero disattivare l'ottimizzazione delle immagini?",
        ch: "Propi eliminar l'optimaziun dal maletg?",
    },
    subtitle: {
        de: "Bildoptimierung benötigt wesentlich weniger Speicherplatz",
        en: "Image optimization requires considerably less disk space",
        fr: "L'optimisation des images nécessite beaucoup moins d'espace mémoire",
        it: "L'ottimizzazione delle immagini richiede una quantità di memoria notevolmente inferiore",
        ch: "L'optimaziun dal maletg dovra bler pli pauca plazza d'accumulaziun",
    },
    yes: {
        de: "Ja",
        en: "Yes",
        fr: "Oui",
        it: "Sì",
        ch: "Gea",
    },
    no: {
        de: "Nein",
        en: "No",
        fr: "Non",
        it: "No",
        ch: "Na",
    }
}

export const loginGuardAlert:Alert = {
    title: {
        de: "Biometrischer Login nicht möglich",
        en: "Biometric login not possible",
        fr: "Login biométrique impossible",
        it: "Login biometrico non possibile",
        ch: "Login biometric n'è betg pussaivel",
    },
    subtitle: {
        de: "Entweder ist Ihr Gerät nicht kompatibel, oder Sie haben keine biometrischen Daten hinterlegt.",
        en: "Either your device is not compatible or you have not registered any biometric data.",
        fr: "Soit votre appareil n'est pas compatible, soit vous n'avez pas enregistré de données biométriques.",
        it: "O il vostro dispositivo non è compatibile o non avete inserito alcun dato biometrico.",
        ch: "U che Voss apparat n'è betg cumpatibel u che Vus n'avais betg deponì datas biometricas.",
    },
    yes: {
        de: "",
        en: "",
        fr: "",
        it: "",
        ch: "",
    },
    no: {
        de: "OK",
        en: "OK",
        fr: "OK",
        it: "OK",
        ch: "OK",
    }
}