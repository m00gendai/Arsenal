import { CollectionType, Languages, SortingTypesAccessory_Optic, SortingTypesAccessory_Silencer, SortingTypesAmmo, SortingTypesGun, SortingTypesPart_ConversionKit } from "./interfaces"
import { SimpleTranslation } from "./lib/textTemplates"

export const defaultGridGap:number = 10

export const defaultViewPadding:number = 10

export const defaultModalBackdrop:string = "rgba(0,0,0,0.1)"

export const defaultBottomBarHeight:number = 60

export const defaultSearchBarHeight:number = 56

export const defaultBottomBarTextHeight: number = 30

export const defaultCardOptionsMenuIconSize: number = 36
export const defaultCardOptionsMenuFontSize: number = 12

export const dateLocales:SimpleTranslation = {
    de: "de-CH",
    en: "en-US",
    fr: "fr-CH",
    it: "it-CH", 
    ch: "de-CH"
}

export const dateTimeOptions:Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
}

export const languageSelection:{flag:string, code:Languages}[] = [
    {flag: "🇩🇪", code: "de"},
    {flag: "🇨🇭", code: "ch"},
    {flag: "🇫🇷", code: "fr"},
    {flag: "🇮🇹", code: "it"},
    {flag: "🇬🇧", code: "en"},
]

export const requiredFieldsGun:string[] = ["model"]
export const requiredFieldsAmmo:string[] = ["designation"]
export const requiredFieldsAccessory_Silencer:string[] = ["model"]
export const requiredFieldsAccessory_Optic:string[] = ["model"]
export const requiredFieldsPart_ConversionKit:string[] = ["model"]

export const currencyPrefixFields:string[] = ["paidPrice", "marketValue"]
export const numberTextFields: string[] = ["shotCount", "currentStock", "criticalStock", "marketValue", "paidPrice", "decibelRating"]

export const datePickerTriggerFields: string[] =  ["acquisitionDate_unix", "lastCleanedAt_unix", "lastShotAt_unix", "lastTopUpAt_unix", "batteryLastChangedAt_unix"]
export const legacyDatePickerTriggerFields: string[] =  ["acquisitionDate", "lastCleanedAt", "lastShotAt", "lastTopUpAt"]

export const colorPickerTriggerFields: string[] = ["mainColor", "reticleColor"]
export const caliberPickerTriggerFields: string[] = ["caliber"]
export const intervalPickerTriggerFields: string[] = ["cleanInterval"]
export const mountedOnTriggerFields: string[] = ["currentlyMountedOn"]

export const cardActionsGun: string[] = ["delete", "clone", "quickShot"]
export const cardActionsAccessory_Silencer: string[] = ["delete", "clone", "quickMount"]
export const cardActionsAccessory_Optic: string[] = ["delete", "clone", "quickMount"]
export const cardActionsPart_ConversionKit: string[] = ["delete", "clone", "quickMount"]
export const cardActionsAmmo: string[] = ["delete", "clone", "quickStock"]
export const cardActionsMountedOn: string[] = ["goto", "unmount", "remount"]

export const collectionExportDirectories: string[] = ["gun", "ammo", "accessory_silencer", "accessory_optic", "part_conversionKit"]

export const screenNameParamsMain:CollectionType[] = ["gunCollection", "ammoCollection"]
export const screenNameParamsAccessory:CollectionType[] = ["accessoryCollection_Silencer", "accessoryCollection_Optic"]
export const screenNameParamsPart:CollectionType[] = ["partCollection_ConversionKit"]
export const screenNameParamsLiterature: CollectionType[] = []
export const screenNameParamsReloading:CollectionType[] = []

export const screenNameParamsAll:CollectionType[] = [...screenNameParamsMain, ...screenNameParamsAccessory, ...screenNameParamsPart, ...screenNameParamsLiterature, ...screenNameParamsReloading]

export const sortingOptionsGun:SortingTypesGun[] = ["alphabetical", "paidPrice", "marketValue", "acquisitionDate", "createdAt", "lastModifiedAt", "lastShotAt", "lastCleanedAt"]
export const sortingOptionsAmmo:SortingTypesAmmo[] = ["alphabetical", "createdAt", "lastModifiedAt", "currentStock", "lastTopUpAt"]
export const sortingOptionsAccessory_Silencer:SortingTypesAccessory_Silencer[] = ["alphabetical", "paidPrice", "marketValue", "acquisitionDate", "createdAt", "lastModifiedAt", "lastShotAt", "lastCleanedAt"]
export const sortingOptionsAccessory_Optic:SortingTypesAccessory_Optic[] = ["alphabetical", "paidPrice", "marketValue", "acquisitionDate", "createdAt", "lastModifiedAt", "lastBatteryChangeAt", "lastCleanedAt"]
export const sortingOptionsPart_ConversionKit:SortingTypesPart_ConversionKit[] = ["alphabetical", "paidPrice", "marketValue", "acquisitionDate", "createdAt", "lastModifiedAt", "lastShotAt", "lastCleanedAt"]