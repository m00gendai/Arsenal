export type Language = "de" | "en" | "fr" | "it"

export interface SimpleTranslation{
    de: string
    en: string
    fr: string
    it: string
    ch?: string
}

export interface SimpleTranslation_StringArray{
    de: (string | string[])[]
    en: (string | string[])[]
    fr: (string | string[])[]
    it: (string | string[])[]
    ch?: (string | string[])[]
}

export interface SimpleTranslation_StringArrayName{
    de: (string | string[] | {name: string})[]
    en: (string | string[] | {name: string})[]
    fr: (string | string[] | {name: string})[]
    it: (string | string[] | {name: string})[]
    ch?: (string | string[] | {name: string})[]
}