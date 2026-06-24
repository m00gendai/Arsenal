import { ReloadingType_Bullet } from "lib/interfaces"
import { SimpleTranslation } from "lib/textTemplates";
import { dataTemplate_TranslationRemarks, dataTemplate_Translations, dataTemplate_TranslationSoldisSold, dataTemplate_TranslationSoldTranslations, DataTemplateTranslation } from "./translations";
import { excludedKeysForDataTemplates } from "configs/configs";

type TemplateKeys = keyof Omit<ReloadingType_Bullet, "id" | "createdAt" | "lastModifiedAt" | "db_id" | "tags" | "images" | "remarks">;

type TemplateItem = {
    name: TemplateKeys
} & SimpleTranslation;

export const emptyBulletObject:ReloadingType_Bullet = {
    id: "",
    createdAt: 0,
    lastModifiedAt: 0,
    images: [],
    tags: [],
    manufacturer: null,
    model: null,
    caliber: null,
    bulletWeight: null,
    bulletType: null,
    ballisticCoefficient: null,
    currentStock: null,
    lastTopUpAt_unix: null,
    criticalStock: null,
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

export const reloadingDataTemplate_Bullet:TemplateItem[] = Object.keys(emptyBulletObject)
    .filter(key => !excludedKeysForDataTemplates.includes(key))
    .map(key =>{
    const translation = dataTemplate_Translations[key as keyof typeof dataTemplate_Translations];    
    return translation as TemplateItem;
})

export const bulletRemarks: DataTemplateTranslation = dataTemplate_TranslationRemarks.remarks

// This is a compile time check if all the keys in the emptyObject are present in dataTemplate_Translations.
// This is important because a runtime check is for naught; There must be a guarantee that all keys are present.
const _check: Record<TemplateKeys, any> = {...dataTemplate_Translations, ...dataTemplate_TranslationSoldTranslations, ...dataTemplate_TranslationSoldisSold};