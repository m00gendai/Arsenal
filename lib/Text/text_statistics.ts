import { SimpleTranslation } from "./interfaces_text"

export interface StatisticItems{
    gunCount: SimpleTranslation
    gunPrice: SimpleTranslation
    gunValue: SimpleTranslation
    ammoCount: SimpleTranslation
    roundCount: SimpleTranslation
    uniqueCalibers: SimpleTranslation
}

interface StatisticsAlert{
    gunPrice: SimpleTranslation
    gunCount: SimpleTranslation
    gunValue: SimpleTranslation
    ammoCount: SimpleTranslation
    roundCount: SimpleTranslation
    uniqueCalibers: SimpleTranslation
}

export const statisticItems:StatisticItems = {
    gunCount:{
        de: "Anzahl Waffen",
        en: "Number of weapons",
        fr: "Nombre d'armes",
        it: "Numero di armi",
        ch: "Dumber d'armas",
    },
    gunPrice:{
        de: "Kaufwert Waffen",
        en: "Purchase value arms",
        fr: "Valeur d'achat armes",
        it: "Valore d'acquisto armi",
        ch: "Valur da cumpra d'armas",
    },
    gunValue:{
        de: "Marktwert Waffen",
        en: "Market value arms",
        fr: "Valeur marchande armes",
        it: "Valore di mercato armi",
        ch: "Valur da martgà Armas",
    },
    ammoCount:{
        de: "Munitionssorten",
        en: "Types of ammunition",
        fr: "Types de munitions",
        it: "Varietà di munizioni",
        ch: "Spezias da muniziun",
    },
    roundCount:{
        de: "Anzahl Schuss total",
        en: "Total round count",
        fr: "Nombre de coups total",
        it: "Numero totale di cartucce",
        ch: "Dumber da patronas total",
    },
    uniqueCalibers: {
        de: "Anzahl verschiedener Kaliber",
        en: "Number of different calibers",
        fr: "Nombre de calibres différents",
        it: "Numero di calibri diversi",
        ch: "Dumber da calibers differents",
    }
}

export const statisticsAlert: StatisticsAlert = {
    gunCount: {
        de: "Es konnten nicht alle Waffen gezählt werden. Bitte überprüfe folgende Einträge:",
        en: "Not all guns could be counted. Please check the following entries:",
        fr: "Toutes les armes n’ont pas pu être comptées. Veuillez vérifier les entrées suivantes:",
        it: "Non è stato possibile contare tutte le armi. Verifica le seguenti voci:",
        ch: "Betg tut las armas han pudì vegnir dumbradas. Controllescha las suandantas vuschs:"
    }, 
gunPrice: {
        de: "Es konnten nicht alle Preise zusammengerechnet werden. Bitte überprüfe folgende Einträge:",
        en: "Not all prices could be calculated. Please check the following entries:",
        fr: "Tous les prix n’ont pas pu être calculés. Veuillez vérifier les entrées suivantes:",
        it: "Non è stato possibile calcolare tutti i prezzi. Verifica le seguenti voci:",
        ch: "Betg tut ils pretschs han pudì vegnir calculads. Controllescha las suandantas vuschs:"
    },
gunValue: {
        de: "Es konnten nicht alle Preise zusammengerechnet werden. Bitte überprüfe folgende Einträge:",
        en: "Not all prices could be calculated. Please check the following entries:",
        fr: "Tous les prix n’ont pas pu être calculés. Veuillez vérifier les entrées suivantes:",
        it: "Non è stato possibile calcolare tutti i prezzi. Verifica le seguenti voci:",
        ch: "Betg tut ils pretschs han pudì vegnir calculads. Controllescha las suandantas vuschs:"
    },
ammoCount: {
        de: "Es konnte nicht alle Munition gezählt werden. Bitte überprüfe folgende Einträge:",
        en: "Not all ammo could be counted. Please check the following entries:",
        fr: "Toutes les munitions n’ont pas pu être comptées. Veuillez vérifier les entrées suivantes:",
        it: "Non è stato possibile contare tutte le munizioni. Verifica le seguenti voci:",
        ch: "Betg tut la muniziun ha pudì vegnir dumbrada. Controllescha las suandantas vuschs:"
    },
roundCount: {
        de: "Es konnte nicht alle Munitionsmengen gezählt werden. Bitte überprüfe folgende Einträge:",
        en: "Not all ammo stock could be counted. Please check the following entries:",
        fr: "Toutes les quantités de munitions n’ont pas pu être comptées. Veuillez vérifier les entrées suivantes:",
        it: "Non è stato possibile contare tutte le quantità di munizioni. Verifica le seguenti voci:",
        ch: "Betg tut las quantitads da muniziun han pudì vegnir dumbradas. Controllescha las suandantas vuschs:"
    },
uniqueCalibers: {
        de: "Es konnten nicht alle Kalibr gezählt werden. Bitte überprüfe folgende Einträge:",
        en: "Not all calibers could be counted. Please check the following entries:",
        fr: "Tous les calibres n’ont pas pu être comptés. Veuillez vérifier les entrées suivantes:",
        it: "Non è stato possibile contare tutti i calibri. Verifica le seguenti voci:",
        ch: "Betg tut ils calibers han pudì vegnir dumbrads. Controllescha las suandantas vuschs:"
    },
}