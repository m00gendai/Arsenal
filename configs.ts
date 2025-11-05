import { Languages } from "./interfaces"
import { SimpleTranslation } from "./lib/textTemplates"

export const defaultGridGap:number = 10

export const defaultViewPadding:number = 10

export const defaultModalBackdrop:string = "rgba(0,0,0,0.1)"

export const defaultBottomBarHeight:number = 60

export const defaultSearchBarHeight:number = 56

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

export const currencyPrefixFields:string[] = ["paidPrice", "marketValue"]
export const numberTextFields: string[] = ["shotCount", "currentStock", "criticalStock", "marketValue", "paidPrice"]

export const datePickerTriggerFields: string[] =  ["acquisitionDate", "lastCleanedAt", "lastShotAt", "lastTopUpAt"]
export const colorPickerTriggerFields: string[] = ["mainColor"]
export const caliberPickerTriggerFields: string[] = ["caliber"]
export const intervalPickerTriggerFields: string[] = ["cleanInterval"]

export const collectionExportDirectories: string[] = ["gun", "ammo"]