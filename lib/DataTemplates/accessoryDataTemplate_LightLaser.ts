import { AccessoryType_LightLaser } from "interfaces"
import { SimpleTranslation } from "lib/textTemplates";

type TemplateKeys = keyof Omit<AccessoryType_LightLaser, "id" | "createdAt" | "lastModifiedAt" | "db_id" | "tags" | "images" | "remarks">;

type TemplateItem = {
    name: TemplateKeys
} & SimpleTranslation;


export const accessoryDataTemplate_LightLaser:TemplateItem[] = [
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
            name: "serial",
            de: "Seriennummer",
            en: "Serial",
            fr: "Numéro de série",
            it: "Numero di serie",
            ch: "Numer da seria",
    },
    {   
            name: "permit",
            de: "Bewilligung",
            en: "Permit",
            fr: "",
            it: "",
            ch: "",
    },
    {   
            name: "lumen",
            de: "Lumen",
            en: "Lumen",
            fr: "",
            it: "",
            ch: "",
    },
    {   
            name: "wavelength",
            de: "Wellenlänge Laser",
            en: "Laser Wavelength",
            fr: "",
            it: "",
            ch: "",
    },
    {   
            name: "laserPower",
            de: "Laserstärke",
            en: "Laser Power",
            fr: "",
            it: "",
            ch: "",
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
        name: "shotCount",
        de: "Schussbelastung",
        en: "Shot count",
        fr: "Compte de tirs",
        it: "Numero di colpi sparati",
        ch: "Chargia da tir",
    },
    {
        name: "lastShotAt_unix",
        de: "Zuletzt geschossen",
        en: "Last shot",
        fr: "Derniers tirs",
        it: "Ultimo colpo",
        ch: "L'ultim culp",
    },
    {
        name: "batteryLastChangedAt_unix",
        de: "Zuletzt gereinigt",
        en: "Last cleaned",
        fr: "Nettoyé en dernier",
        it: "Ultima pulizia",
        ch: "Il davos purifitgà",
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
            fr: "Morere sur",
            it: "Montare sole",
            ch: "Va montaschier sur",
    },
]

export const lightLaserRemarks:{name:string, de:string, en:string, fr:string, it: string, ch: string} = {
    name: "remarks",
    de: "Bemerkungen",
    en: "Remarks",
    fr: "Remarques",
    it: "Osservazioni",
    ch: "Remartgar",
}

export const emptyLightLaserObject:AccessoryType_LightLaser = {
    id: "",
    manufacturer: null,
    model: "",
    manufacturingDate: null,
    originCountry: null,
    serial: null,
    acquisitionDate_unix: null,
    boughtFrom: null,
    mainColor: null,
    permit: null,
    lumen: null,
    wavelength: null,
    laserPower: null,
    remarks : null,
    images: [],
    createdAt: 0,
    lastModifiedAt: 0,
    shotCount: null,
    tags: [],
    lastShotAt_unix: null,
    paidPrice: null,
    marketValue: null,
    currentlyMountedOn: null,
    batteryLastChangedAt_unix: null
}