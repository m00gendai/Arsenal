import { ReloadingType_Die } from "lib/interfaces"
import { SimpleTranslation } from "lib/textTemplates";
import { dataTemplate_TranslationRemarks, dataTemplate_Translations, DataTemplateTranslation } from "./translations";
import { excludedKeysForDataTemplates } from "configs/configs";

type TemplateKeys = keyof Omit<ReloadingType_Die, "id" | "createdAt" | "lastModifiedAt" | "db_id" | "tags" | "images" | "remarks">;

type TemplateItem = {
    name: TemplateKeys
} & SimpleTranslation;

export const emptyDieObject:ReloadingType_Die = {
    id: "",
    createdAt: 0,
    lastModifiedAt: 0,
    images: [],
    tags: [],
    manufacturer: null,
    model: null,
    caliber: null,
    acquisitionDate_unix: null,
    paidPrice: null,
    boughtFrom: null,
    marketValue: null,
    remarks: null,
    customInventoryDesignation: null,
    qrCode: null
}

export const reloadingDataTemplate_Die:TemplateItem[] = Object.keys(emptyDieObject)
    .filter(key => !excludedKeysForDataTemplates.includes(key))
    .map(key =>{
    const translation = dataTemplate_Translations[key as keyof typeof dataTemplate_Translations];    
    return translation as TemplateItem;
})

export const dieRemarks: DataTemplateTranslation = dataTemplate_TranslationRemarks.remarks

// This is a compile time check if all the keys in the emptyObject are present in dataTemplate_Translations.
// This is important because a runtime check is for naught; There must be a guarantee that all keys are present.
const _check: Record<TemplateKeys, any> = dataTemplate_Translations;