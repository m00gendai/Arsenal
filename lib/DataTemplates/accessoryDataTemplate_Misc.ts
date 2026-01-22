import { excludedKeysForDataTemplates } from "configs/configs";
import { AccessoryType_Misc } from "lib/interfaces"
import { SimpleTranslation } from "lib/textTemplates";
import { dataTemplate_TranslationRemarks, dataTemplate_Translations, DataTemplateTranslation } from "./translations";

type TemplateKeys = keyof Omit<AccessoryType_Misc, "id" | "createdAt" | "lastModifiedAt" | "db_id" | "tags" | "images" | "remarks">;

type TemplateItem = {
    name: TemplateKeys
} & SimpleTranslation;

export const emptyMiscAccessoryObject:AccessoryType_Misc= {
    id: "",
    manufacturer: null,
    model: "",
    manufacturingDate: null,
    originCountry: null,
    serial: null,
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
    customInventoryDesignation: null
}

export const accessoryDataTemplate_Misc:TemplateItem[] = Object.keys(emptyMiscAccessoryObject)
    .filter(key => !excludedKeysForDataTemplates.includes(key))
    .map(key =>{
    const translation = dataTemplate_Translations[key as keyof typeof dataTemplate_Translations];    
    return translation as TemplateItem;
})

export const miscAccessoryRemarks: DataTemplateTranslation = dataTemplate_TranslationRemarks.remarks

// This is a compile time check if all the keys in the emptyObject are present in dataTemplate_Translations.
// This is important because a runtime check is for naught; There must be a guarantee that all keys are present.
const _check: Record<TemplateKeys, any> = dataTemplate_Translations;
