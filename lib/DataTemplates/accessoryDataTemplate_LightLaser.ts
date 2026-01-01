import { excludedKeysForDataTemplates } from "configs";
import { AccessoryType_LightLaser } from "interfaces"
import { SimpleTranslation } from "lib/textTemplates";
import { dataTemplate_TranslationRemarks, dataTemplate_Translations, DataTemplateTranslation } from "./translations";

type TemplateKeys = keyof Omit<AccessoryType_LightLaser, "id" | "createdAt" | "lastModifiedAt" | "db_id" | "tags" | "images" | "remarks">;

type TemplateItem = {
    name: TemplateKeys
} & SimpleTranslation;

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
    candela: null,
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

export const accessoryDataTemplate_LightLaser:TemplateItem[] = Object.keys(emptyLightLaserObject)
    .filter(key => !excludedKeysForDataTemplates.includes(key))
    .map(key =>{
    const translation = dataTemplate_Translations[key as keyof typeof dataTemplate_Translations];    
    return translation as TemplateItem;
})

export const lightLaserRemarks: DataTemplateTranslation = dataTemplate_TranslationRemarks.remarks

// This is a compile time check if all the keys in the emptyObject are present in dataTemplate_Translations.
// This is important because a runtime check is for naught; There must be a guarantee that all keys are present.
const _check: Record<TemplateKeys, any> = dataTemplate_Translations;