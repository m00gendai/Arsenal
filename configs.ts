import { CollectionType, Languages, SortingTypesAmmo, SortingTypesGun } from "./interfaces"
import { SimpleTranslation } from "./lib/textTemplates"

export const defaultGridGap:number = 10

export const defaultViewPadding:number = 10

export const defaultModalBackdrop:string = "rgba(0,0,0,0.1)"

export const defaultBottomBarHeight:number = 60

export const defaultSearchBarHeight:number = 56

export const defaultBottomBarTextHeight: number = 30

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

export const currencyPrefixFields:string[] = ["paidPrice", "marketValue"]
export const numberTextFields: string[] = ["shotCount", "currentStock", "criticalStock", "marketValue", "paidPrice", "decibelRating"]

export const datePickerTriggerFields: string[] =  ["acquisitionDate", "lastCleanedAt", "lastShotAt", "lastTopUpAt"]
export const colorPickerTriggerFields: string[] = ["mainColor"]
export const caliberPickerTriggerFields: string[] = ["caliber"]
export const intervalPickerTriggerFields: string[] = ["cleanInterval"]
export const mountedOnTriggerFields: string[] = ["currentlyMountedOn"]

export const cardActionsGun: string[] = ["clone", "delete", "quickShot"]
export const cardActionsAccessory_Silencer: string[] = ["clone", "delete", "quickShot"]
export const cardActionsAmmo: string[] = ["clone", "delete", "quickStock"]

export const collectionExportDirectories: string[] = ["gun", "ammo", "accessory_silencer"]

export const screenNameParamsMain:CollectionType[] = ["gunCollection", "ammoCollection"]
export const screenNameParamsAccessory:CollectionType[] = ["accessoryCollection_Silencer"]
export const screenNameParamsLiterature: CollectionType[] = []
export const screenNameParamsReloading:CollectionType[] = []

export const sortingOptionsGun:SortingTypesGun[] = ["alphabetical", "paidPrice", "marketValue", "acquisitionDate", "createdAt", "lastModifiedAt", "lastShotAt", "lastCleanedAt"]
export const sortingOptionsAmmo:SortingTypesAmmo[] = ["alphabetical", "createdAt", "lastModifiedAt", "currentStock", "lastTopUpAt"]
export const sortingOptionsAccessory_Silencer:SortingTypesGun[] = ["alphabetical", "paidPrice", "marketValue", "acquisitionDate", "createdAt", "lastModifiedAt", "lastShotAt", "lastCleanedAt"]