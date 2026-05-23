import { excludedKeysForDataTemplates } from "configs/configs";
import { AmmoType } from "lib/interfaces"
import { SimpleTranslation } from "lib/textTemplates";
import { dataTemplate_Translations, DataTemplateTranslation, dataTemplate_TranslationRemarks, dataTemplate_TranslationSoldTranslations, dataTemplate_TranslationSoldisSold } from "./translations";

type TemplateKeys = keyof Omit<AmmoType, "id" | "createdAt" | "lastModifiedAt" | "db_id" | "tags" | "images" | "remarks">;

type TemplateItem = {
    name: TemplateKeys
} & SimpleTranslation;

export const emptyAmmoObject:AmmoType = {
    id: "",
    createdAt: 0,
    lastModifiedAt: 0,
    manufacturer: null,
    designation: "",
    originCountry: null,
    caliber: null,
    bulletType: null,
    bulletWeight: null,
    headstamp: null,
    currentStock: null,
    lastTopUpAt_unix: null,
    criticalStock: null,
    tags: [],
    images: [],
    customInventoryDesignation: null,
    remarks: null,
    qrCode: null,
    sold_isSold: false,
    sold_sellDate_unix: null,
    sold_buyerName: null,
    sold_sellPrice: null,
    sold_buyerPermit: null,
    sold_remarks: null,
}

export const ammoDataTemplate:TemplateItem[] = Object.keys(emptyAmmoObject)
    .filter(key => !excludedKeysForDataTemplates.includes(key))
    .map(key =>{
    const translation = dataTemplate_Translations[key as keyof typeof dataTemplate_Translations];    
    return translation as TemplateItem;
})

export const ammoRemarks: DataTemplateTranslation = dataTemplate_TranslationRemarks.remarks

// This is a compile time check if all the keys in the emptyObject are present in dataTemplate_Translations.
// This is important because a runtime check is for naught; There must be a guarantee that all keys are present.
const _check: Record<TemplateKeys, any> = {...dataTemplate_Translations, ...dataTemplate_TranslationSoldTranslations, ...dataTemplate_TranslationSoldisSold};