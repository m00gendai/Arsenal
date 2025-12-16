import { AmmoType } from "interfaces"
import { SimpleTranslation } from "lib/textTemplates";

type TemplateKeys = keyof Omit<AmmoType, "id" | "createdAt" | "lastModifiedAt" | "db_id" | "tags" | "images" | "remarks">;

type TemplateItem = {
    name: TemplateKeys
} & SimpleTranslation;

export const ammoDataTemplate:TemplateItem[] = [
        {
                name: "manufacturer",
                de: "Hersteller",
                en: "Manufacturer",
                fr: "Fabricant",
                it: "Produttore",
                ch: "Producent",
        },
        {   
                name: "designation",
                de: "Bezeichnung",
                en: "Designation",
                fr: "Désignation",
                it: "Denominazione",
                ch: "Designaziun",
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
                name: "caliber",
                de: "Kaliber",
                en: "Caliber",
                fr: "Calibre",
                it: "Calibro",
                ch: "Caliber",
        },
        {
                name: "headstamp",
                de: "Hülsenboden",
                en: "Headstamp",
                fr: "Cachet",
                it: "Punzonatura",
                ch: "Palantschieu sura",
        },
        {
            name: "currentStock",
            de: "Aktuelle Menge",
            en: "Current stock",
            fr: "Montant actuel",
            it: "Quantità attuale",
            ch: "Quantitad actuala",
    },
    {
        name: "lastTopUpAt_unix",
        de: "Letzte Mengenänderung",
        en: "Last change of stock",
        fr: "Dernier changement de quantité",
        it: "Ultima variazione di quantità",
        ch: "Ultima midada da la quantitad",
    },
    {
        name: "criticalStock",
        de: "Kritische Menge",
        en: "Critical stock",
        fr: "Quantité critique",
        it: "Scorta critica",
        ch: "Quantitad critica",
    }
    ]
    
    export const ammoRemarks:{name:string, de:string, en:string, fr:string, it: string, ch:string} = {
        name: "remarks",
        de: "Bemerkungen",
        en: "Remarks",
        fr: "Remarques",
        it: "Osservazioni",
        ch: "Remartgar",
    }
    
export const emptyAmmoObject:AmmoType = {
    id: "",
    createdAt: 0,
    lastModifiedAt: 0,
    manufacturer: null,
    designation: "",
    originCountry: null,
    caliber: null,
    headstamp: null,
    currentStock: null,
    lastTopUpAt_unix: null,
    criticalStock: null,
    tags: [],
    images: [],
    remarks: null,
}