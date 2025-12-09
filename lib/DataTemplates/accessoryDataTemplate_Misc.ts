import { AccessoryType_Misc } from "interfaces"
import { SimpleTranslation } from "lib/textTemplates";

type TemplateKeys = keyof Omit<AccessoryType_Misc, "id" | "createdAt" | "lastModifiedAt" | "db_id" | "tags" | "images" | "remarks">;

type TemplateItem = {
    name: TemplateKeys
} & SimpleTranslation;

export const accessoryDataTemplate_Misc:TemplateItem[] = [
    {
            name: "manufacturer",
            de: "Hersteller",
            en: "Manufacturer",
            fr: "Fabricant",
            it: "Produttore",
            ch: "Producent",
    },
    {   
            name: "model",
            de: "Modellbezeichnung",
            en: "Model Name",
            fr: "Désignation du modèle",
            it: "Nome del modello",
            ch: "Designaziun dal model",
            },
    {
            name: "manufacturingDate",
            de: "Herstellungszeitraum",
            en: "Manufacturing Date",
            fr: "Période de fabrication",
            it: "Periodo di produzione",
            ch: "Perioda da producziun",
    },
    {
            name: "originCountry",
            de: "Ursprungsland",    
            en: "Origin Country",
            fr: "Pays d'origine",
            it: "Paese di origine",
            ch: "Pajais d'origin",
    },
    {
            name: "acquisitionDate_unix",
            de: "Erwerbsdatum",     
            en: "Acquision Date",
            fr: "Date d'acquisition",
            it: "Data di acquisizione",
            ch: "Data d'acquist",
        
    },
    {
        name: "paidPrice",
        de: "Kaufpreis",     
        en: "Price",
        fr: "Prix d'achat",
        it: "Prezzo",
        ch: "Pretsch da cumpra",
    
    },
    {
        name: "boughtFrom",
        de: "Gekauft bei/von",     
        en: "Acquired from",
        fr: "Acquis auprès de/par",
        it: "Acquistati presso/da",
        ch: "Acquistà tar/da",
    },
    {
        name: "marketValue",
        de: "Aktueller Marktwert",
        en: "Current market value",
        fr: "Valeur de marché actuelle",
        it: "Valore di mercato attuale",
        ch: "Valur actuala dal martgà"
    },
    {
            name: "mainColor",
            de: "Hauptfarbe",
            en: "Main Color",
            fr: "Couleur principale",
            it: "Colore principale",
            ch: "Da colur principala",
    },
    {
            name: "currentlyMountedOn",
            de: "Montiert auf",
            en: "Mounted on",
            fr: "",
            it: "",
            ch: "",
    },
]

export const miscAccessoryRemarks:{name:string, de:string, en:string, fr:string, it: string, ch: string} = {
    name: "remarks",
    de: "Bemerkungen",
    en: "Remarks",
    fr: "Remarques",
    it: "Osservazioni",
    ch: "Remartgar",
}

export const emptyMiscAccessoryObject:AccessoryType_Misc= {
    id: "",
    manufacturer: null,
    model: "",
    manufacturingDate: null,
    originCountry: null,
    acquisitionDate_unix: null,
    boughtFrom: null,
    mainColor: null,
    remarks : null,
    images: [],
    createdAt: 0,
    lastModifiedAt: 0,
    tags: [],
    paidPrice: null,
    marketValue: null,
    currentlyMountedOn: null,
}