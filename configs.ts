import { CollectionType, CommonStyles, Languages, SortingTypesAccessory_LightLaser, SortingTypesAccessory_Magazine, SortingTypesAccessory_Misc, SortingTypesAccessory_Optic, SortingTypesAccessory_Scope, SortingTypesAccessory_Silencer, SortingTypesAmmo, SortingTypesGun, SortingTypesPart_Barrel, SortingTypesPart_ConversionKit } from "./interfaces"
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

export const pdfCommonStyles:CommonStyles = {
    allPageMargin: "15mm",
    allPageMarginIOS: Math.ceil(15*2.83465),
    allTitleFontSize: "30px",
    allSubtitleFontSize: "12px",
    allTableFontSize: "15px",
    imageGap: "20px",
    tableVerticalMargin: "20px",
    tableRowVerticalPadding: "5px",
    tableCellPadding: "5px",
    footerWidth: "calc(100% - 30mm)",
    footerFontSize: "8px",
    footerTopBorder: "1px solid grey",
    footerPaddingTop: "5px",
    footerMarginTop: "5mm",
    tagPadding: "5px",
    tagFontSize: "10px",
    tagContainerGap: "10px"
}

export const pdfDateOptions:Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: "2-digit",
    minute: "2-digit"
};

export const pdfExcludedKeys = ["db_id", "images", "createdAt", "lastModifiedAt", "status", "id", "tags", "remarks", "lastCleanedAt", "lastShotAt", "cleanInterval"]

export const requiredFieldsGun:string[] = ["model"]
export const requiredFieldsAmmo:string[] = ["designation"]
export const requiredFieldsAccessory_Silencer:string[] = ["model"]
export const requiredFieldsAccessory_Optic:string[] = ["model"]
export const requiredFieldsAccessory_Scope:string[] = ["model"]
export const requiredFieldsAccessory_LightLaser:string[] = ["model"]
export const requiredFieldsAccessory_Magazine:string[] = ["model"]
export const requiredFieldsAccessory_Misc:string[] = ["model"]
export const requiredFieldsPart_ConversionKit:string[] = ["model"]
export const requiredFieldsPart_Barrel:string[] = ["model"]

export const currencyPrefixFields:string[] = ["paidPrice", "marketValue"]
export const numberTextFields: string[] = ["shotCount", "currentStock", "criticalStock", "marketValue", "paidPrice", "decibelRating", "lumen", "capacity"]

export const datePickerTriggerFields: string[] =  ["acquisitionDate_unix", "lastCleanedAt_unix", "lastShotAt_unix", "lastTopUpAt_unix", "batteryLastChangedAt_unix"]
export const legacyDatePickerTriggerFields: string[] =  ["acquisitionDate", "lastCleanedAt", "lastShotAt", "lastTopUpAt"]

export const colorPickerTriggerFields: string[] = ["mainColor", "reticleColor"]
export const caliberPickerTriggerFields: string[] = ["caliber"]
export const intervalPickerTriggerFields: string[] = ["cleanInterval"]
export const mountedOnTriggerFields: string[] = ["currentlyMountedOn"]

export const cardActionsGun: string[] = ["delete", "clone", "quickShot"]
export const cardActionsAccessory_Silencer: string[] = ["delete", "clone", "quickMount"]
export const cardActionsAccessory_Optic: string[] = ["delete", "clone", "quickMount"]
export const cardActionsAccessory_Scope: string[] = ["delete", "clone", "quickMount"]
export const cardActionsAccessory_LightLaser: string[] = ["delete", "clone", "quickMount"]
export const cardActionsAccessory_Magazine: string[] = ["delete", "clone", "quickMount"]
export const cardActionsAccessory_Misc: string[] = ["delete", "clone", "quickMount"]
export const cardActionsPart_ConversionKit: string[] = ["delete", "clone", "quickMount"]
export const cardActionsPart_Barrel: string[] = ["delete", "clone", "quickMount"]
export const cardActionsAmmo: string[] = ["delete", "clone", "quickStock"]
export const cardActionsMountedOn: string[] = ["goto", "unmount", "remount"]

export const screenNameParamsMain:CollectionType[] = ["gunCollection", "ammoCollection"]
export const screenNameParamsAccessory:CollectionType[] = ["accessoryCollection_Silencer", "accessoryCollection_Optic", "accessoryCollection_Scope", "accessoryCollection_LightLaser", "accessoryCollection_Magazine", "accessoryCollection_Misc"]
export const screenNameParamsPart:CollectionType[] = ["partCollection_ConversionKit", "partCollection_Barrel"]
export const screenNameParamsLiterature: CollectionType[] = []
export const screenNameParamsReloading:CollectionType[] = []

export const screenNameParamsAll:CollectionType[] = [...screenNameParamsMain, ...screenNameParamsAccessory, ...screenNameParamsPart, ...screenNameParamsLiterature, ...screenNameParamsReloading]

export const nonCollectionTables: string[]= ["accessoryCollection", "partCollection", "accessoryMount", "partMount"]

export const collectionExportDirectories: CollectionType[] = screenNameParamsAll
export const collectionImportTables = [...screenNameParamsAll, ...nonCollectionTables]

export const sortingOptionsGun:SortingTypesGun[] = ["alphabetical", "paidPrice", "marketValue", "acquisitionDate", "createdAt", "lastModifiedAt", "lastShotAt", "lastCleanedAt"]
export const sortingOptionsAmmo:SortingTypesAmmo[] = ["alphabetical", "createdAt", "lastModifiedAt", "currentStock", "lastTopUpAt"]
export const sortingOptionsAccessory_Silencer:SortingTypesAccessory_Silencer[] = ["alphabetical", "paidPrice", "marketValue", "acquisitionDate", "createdAt", "lastModifiedAt", "lastShotAt", "lastCleanedAt"]
export const sortingOptionsAccessory_Optic:SortingTypesAccessory_Optic[] = ["alphabetical", "paidPrice", "marketValue", "acquisitionDate", "createdAt", "lastModifiedAt", "lastBatteryChangeAt", "lastCleanedAt"]
export const sortingOptionsAccessory_Scope:SortingTypesAccessory_Scope[] = ["alphabetical", "paidPrice", "marketValue", "acquisitionDate", "createdAt", "lastModifiedAt", "lastBatteryChangeAt", "lastCleanedAt"]
export const sortingOptionsAccessory_LightLaser:SortingTypesAccessory_LightLaser[] = ["alphabetical", "paidPrice", "marketValue", "acquisitionDate", "createdAt", "lastModifiedAt", "lastBatteryChangeAt"]
export const sortingOptionsAccessory_Magazine:SortingTypesAccessory_Magazine[] = ["alphabetical", "paidPrice", "marketValue", "acquisitionDate", "createdAt", "lastModifiedAt", "lastShotAt", "lastCleanedAt", "capacity"]
export const sortingOptionsAccessory_Misc:SortingTypesAccessory_Misc[] = ["alphabetical", "paidPrice", "marketValue", "acquisitionDate", "createdAt", "lastModifiedAt"]
export const sortingOptionsPart_ConversionKit:SortingTypesPart_ConversionKit[] = ["alphabetical", "paidPrice", "marketValue", "acquisitionDate", "createdAt", "lastModifiedAt", "lastShotAt", "lastCleanedAt"]
export const sortingOptionsPart_Barrel:SortingTypesPart_Barrel[] = ["alphabetical", "paidPrice", "marketValue", "acquisitionDate", "createdAt", "lastModifiedAt", "lastShotAt", "lastCleanedAt"]