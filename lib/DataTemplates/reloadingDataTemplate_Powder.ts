import { ReloadingType_Powder } from "lib/interfaces"
import { SimpleTranslation } from "lib/textTemplates";
import { dataTemplate_TranslationRemarks, dataTemplate_Translations, dataTemplate_TranslationSoldisSold, dataTemplate_TranslationSoldTranslations, DataTemplateTranslation } from "./translations";
import { excludedKeysForDataTemplates } from "configs/configs";

type TemplateKeys = keyof Omit<ReloadingType_Powder, "id" | "createdAt" | "lastModifiedAt" | "db_id" | "tags" | "images" | "remarks">;

type TemplateItem = {
    name: TemplateKeys
} & SimpleTranslation;

export const emptyPowderObject:ReloadingType_Powder = {
    id: "",
    createdAt: 0,
    lastModifiedAt: 0,
    images: [],
    tags: [],
    manufacturer: null,
    designation: null,
    texture: null,
    application: null,
    powderWeight: null,
    lastTopUpAt_unix: null,
    criticalPowderWeight: null,
    remarks: null,
    customInventoryDesignation: null,
    qrCode: null,
    sold_isSold: false,
    sold_sellDate_unix: null,
    sold_buyerName: null,
    sold_sellPrice: null,
    sold_buyerPermit: null,
    sold_remarks: null,
}

export const reloadingDataTemplate_Powder:TemplateItem[] = Object.keys(emptyPowderObject)
    .filter(key => !excludedKeysForDataTemplates.includes(key))
    .map(key =>{
    const translation = dataTemplate_Translations[key as keyof typeof dataTemplate_Translations];    
    return translation as TemplateItem;
})

export const powderRemarks: DataTemplateTranslation = dataTemplate_TranslationRemarks.remarks

// This is a compile time check if all the keys in the emptyObject are present in dataTemplate_Translations.
// This is important because a runtime check is for naught; There must be a guarantee that all keys are present.
const _check: Record<TemplateKeys, any> = {...dataTemplate_Translations, ...dataTemplate_TranslationSoldTranslations, ...dataTemplate_TranslationSoldisSold};