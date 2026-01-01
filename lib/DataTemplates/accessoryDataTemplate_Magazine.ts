import { excludedKeysForDataTemplates } from "configs";
import { AccessoryType_Magazine } from "interfaces"
import { SimpleTranslation } from "lib/textTemplates";
import { dataTemplate_TranslationRemarks, dataTemplate_Translations, DataTemplateTranslation } from "./translations";

type TemplateKeys = keyof Omit<AccessoryType_Magazine, "id" | "createdAt" | "lastModifiedAt" | "db_id" | "tags" | "images" | "remarks">;

type TemplateItem = {
    name: TemplateKeys
} & SimpleTranslation;

export const emptyMagazineObject:AccessoryType_Magazine= {
    id: "",
    manufacturer: null,
    model: "",
    manufacturingDate: null,
    originCountry: null,
    caliber: [],
    capacity: null,
    currentStock: null,
    platform: null,
    serial: null,
    permit: null,
    acquisitionDate_unix: null,
    boughtFrom: null,
    mainColor: null,
    remarks : null,
    images: [],
    createdAt: 0,
    lastModifiedAt: 0,
    shotCount: null,
    tags: [],
    lastShotAt_unix: null,
    lastCleanedAt_unix: null,
    paidPrice: null,
    marketValue: null,
    cleanInterval: null,
    material: null,
    currentlyMountedOn: null,
}

export const accessoryDataTemplate_Magazine:TemplateItem[] = Object.keys(emptyMagazineObject)
    .filter(key => !excludedKeysForDataTemplates.includes(key))
    .map(key =>{
    const translation = dataTemplate_Translations[key as keyof typeof dataTemplate_Translations];    
    return translation as TemplateItem;
})

export const magazineRemarks: DataTemplateTranslation = dataTemplate_TranslationRemarks.remarks

// This is a compile time check if all the keys in the emptyObject are present in dataTemplate_Translations.
// This is important because a runtime check is for naught; There must be a guarantee that all keys are present.
const _check: Record<TemplateKeys, any> = dataTemplate_Translations;