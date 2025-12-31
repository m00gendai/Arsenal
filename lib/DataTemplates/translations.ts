import { SimpleTranslation } from "lib/textTemplates";

export type DataTemplateTranslation = {name: string} & SimpleTranslation

interface DataTemplateTranslations {
    manufacturer: DataTemplateTranslation
    model: DataTemplateTranslation
    manufacturingDate: DataTemplateTranslation
    originCountry: DataTemplateTranslation
    caliber: DataTemplateTranslation
    serial: DataTemplateTranslation
    permit: DataTemplateTranslation
    acquisitionDate_unix: DataTemplateTranslation
    paidPrice: DataTemplateTranslation
    boughtFrom: DataTemplateTranslation
    marketValue: DataTemplateTranslation
    shotCount: DataTemplateTranslation
    lastShotAt_unix: DataTemplateTranslation
    lastCleanedAt_unix: DataTemplateTranslation
    cleanInterval: DataTemplateTranslation
    mainColor: DataTemplateTranslation
    language: DataTemplateTranslation
    title: DataTemplateTranslation
    subtitle: DataTemplateTranslation
    isbn: DataTemplateTranslation
    publishingDate: DataTemplateTranslation
    author: DataTemplateTranslation
    publisher: DataTemplateTranslation
    edition: DataTemplateTranslation
    series: DataTemplateTranslation
    volume: DataTemplateTranslation
    pages: DataTemplateTranslation
    format: DataTemplateTranslation
}

interface DataTemplateTranslationRemarks {
    remarks: DataTemplateTranslation
}

export const dataTemplate_Translations: DataTemplateTranslations = {
    "manufacturer": {
            name: "manufacturer",
            de: "Hersteller",
            en: "Manufacturer",
            fr: "Fabricant",
            it: "Produttore",
            ch: "Producent",
    },
    "model" : {
            name: "model",
            de: "Modellbezeichnung",
            en: "Model Name",
            fr: "Désignation du modèle",
            it: "Nome del modello",
            ch: "Designaziun dal model",
            },
    "manufacturingDate": {
            name: "manufacturingDate",
            de: "Herstellungszeitraum",
            en: "Manufacturing Date",
            fr: "Période de fabrication",
            it: "Periodo di produzione",
            ch: "Perioda da producziun",
        
    },
    "originCountry": {
            name: "originCountry",
            de: "Ursprungsland",    
            en: "Origin Country",
            fr: "Pays d'origine",
            it: "Paese di origine",
            ch: "Pajais d'origin",
    },
    "caliber": {
            name: "caliber",
            de: "Kaliber",
            en: "Caliber",
            fr: "Calibre",
            it: "Calibro",
            ch: "Caliber",
    },
    "serial": {   
            name: "serial",
            de: "Seriennummer",
            en: "Serial",
            fr: "Numéro de série",
            it: "Numero di serie",
            ch: "Numer da seria",
    },
    "permit": {
            name: "permit",
            de: "Bewilligung",
            en: "Permit",
            fr: "Permis",
            it: "Permesso",
            ch: "Concessiun",
    },
    "acquisitionDate_unix": {
            name: "acquisitionDate_unix",
            de: "Erwerbsdatum",     
            en: "Acquision Date",
            fr: "Date d'acquisition",
            it: "Data di acquisizione",
            ch: "Data d'acquist",
        
    },
    "paidPrice": {
        name: "paidPrice",
        de: "Kaufpreis",     
        en: "Price",
        fr: "Prix d'achat",
        it: "Prezzo",
        ch: "Pretsch da cumpra",
    
    },
    "boughtFrom": {
        name: "boughtFrom",
        de: "Gekauft bei/von",     
        en: "Acquired from",
        fr: "Acquis auprès de/par",
        it: "Acquistati presso/da",
        ch: "Acquistà tar/da",
    },
    "marketValue": {
        name: "marketValue",
        de: "Aktueller Marktwert",
        en: "Current market value",
        fr: "Valeur de marché actuelle",
        it: "Valore di mercato attuale",
        ch: "Valur actuala dal martgà"
    },
    "shotCount": {
        name: "shotCount",
        de: "Schussbelastung",
        en: "Shot count",
        fr: "Compte de tirs",
        it: "Numero di colpi sparati",
        ch: "Chargia da tir",
    },
    "lastShotAt_unix": {
        name: "lastShotAt_unix",
        de: "Zuletzt geschossen",
        en: "Last shot",
        fr: "Derniers tirs",
        it: "Ultimo colpo",
        ch: "L'ultim culp",
    },
    "lastCleanedAt_unix": {
        name: "lastCleanedAt_unix",
        de: "Zuletzt gereinigt",
        en: "Last cleaned",
        fr: "Nettoyé en dernier",
        it: "Ultima pulizia",
        ch: "Il davos purifitgà",
    },
    "cleanInterval": {
        name: "cleanInterval",
        de: "Reinigungsintervall",
        en: "Cleaning interval",
        fr: "Intervalle de nettoyage",
        it: "Intervallo di pulizia",
        ch: "Interval da nettegiar",
    },
    "mainColor": {
            name: "mainColor",
            de: "Hauptfarbe",
            en: "Main Color",
            fr: "Couleur principale",
            it: "Colore principale",
            ch: "Da colur principala",
    },
    "language": {
        name: "language",
        de: "Sprache",
        en: "Language",
        fr: "Langue",
        it: "Lingua",
        ch: "Favella",
    },
    "title": {
        name: "title",
        de: "Titel",
        en: "Title",
        fr: "Titre",
        it: "Titolo",
        ch: "Titel",
    }, 
    "subtitle": {
        name: "subtitle",
        de: "Untertitel",
        en: "Subtitle",
        fr: "Sous-titre",
        it: "Sottotitolo",
        ch: "Sutittel",
    },
    "isbn": {
        name: "isbn",
        de: "ISBN",
        en: "ISBN",
        fr: "ISBN",
        it: "ISBN",
        ch: "ISBN",
    },
    "publishingDate": {
        name: "publishingDate",
        de: "Publikationsdatum",
        en: "Publishing Date",
        fr: "Date de publication",
        it: "Data di pubblicazione",
        ch: "Data da publicaziun",
    },
    "author": {
        name: "author",
        de: "Author",
        en: "Author",
        fr: "Auteur",
        it: "Autore",
        ch: "Autura",
    },
    "publisher": {
        name: "publisher",
        de: "Verlag/Herausgeber",
        en: "Publisher",
        fr: "Éditeur",
        it: "Editore",
        ch: "Editur",
    },
    "edition": {
        name: "edition",
        de: "Auflage",
        en: "Edition",
        fr: "Édition",
        it: "Edizione",
        ch: "Emissiun",
    },
    "series": {
        name: "series",
        de: "Buchreihe",
        en: "Book Series",
        fr: "Collection",
        it: "Collana",
        ch: "Seria",
    },
    "volume": {
        name: "volume",
        de: "Band",
        en: "Volume",
        fr: "Volume",
        it: "Volume",
        ch: "Cudesch",
    },
    "pages": {
        name: "pages",
        de: "Seiten",
        en: "Pages",
        fr: "Pages",
        it: "Pagine",
        ch: "Paginas",
    },
    "format": {
        name: "format",
        de: "Format",
        en: "Format",
        fr: "Format",
        it: "Formato",
        ch: "Format ",
    },
}

export const dataTemplate_TranslationRemarks: DataTemplateTranslationRemarks = {
    "remarks": {
        name: "remarks",
        de: "Bemerkungen",
        en: "Remarks",
        fr: "Remarques",
        it: "Osservazioni",
        ch: "Remartgar",
    },
}