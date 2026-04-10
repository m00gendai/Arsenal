import { SimpleTranslation } from "./interfaces_text"

interface Sorting{
    alphabetical: SimpleTranslation
    lastModifiedAt: SimpleTranslation
    createdAt: SimpleTranslation
    paidPrice: SimpleTranslation
    marketValue: SimpleTranslation
    acquisitionDate: SimpleTranslation
    lastCleanedAt: SimpleTranslation
    lastShotAt: SimpleTranslation
    currentStock: SimpleTranslation
    lastTopUpAt: SimpleTranslation
    lastBatteryChangeAt: SimpleTranslation
    capacity: SimpleTranslation
    pages: SimpleTranslation
}

export const sorting:Sorting = {
    alphabetical: {
        de: "Alphabetisch",
        en: "Alphabetical",
        fr: "Alphabétique",
        it: "Alfabetico",
        ch: "Alfabetic",
    },
    lastModifiedAt: {
        de: "Zuletzt geändert",
        en: "Last modified",
        fr: "Dernière modification",
        it: "Ultima modifica",
        ch: "L'ultima giada midà",
    },
    createdAt: {
        de: "Zuletzt hinzugefügt",
        en: "Last added",
        fr: "Dernier ajout",
        it: "Ultimo aggiunto",
        ch: "L'ultima giada agiuntà",
    },
    paidPrice:{
        de: "Kaufpreis",     
        en: "Price",
        fr: "Prix d'achat",
        it: "Prezzo",
        ch: "Pretsch da cumpra",
    },
    marketValue:{
        de: "Aktueller Marktwert",
        en: "Current market value",
        fr: "Valeur de marché actuelle",
        it: "Valore di mercato attuale",
        ch: "Valur actuala dal martgà"
    },
    acquisitionDate:{
        de: "Erwerbsdatum",     
        en: "Acquision Date",
        fr: "Date d'acquisition",
        it: "Data di acquisizione",
        ch: "Data d'acquist",        
    },
    lastCleanedAt:{
        de: "Zuletzt gereinigt",     
        en: "Last cleaned",
        fr: "Dernier nettoyage",
        it: "Ultima pulizia",
        ch: "Ultima nettegiada",        
    },
    lastShotAt:{
        de: "Zuletzt geschossen",     
        en: "Last shot",
        fr: "Dernier coup de feu",
        it: "Ultimo sparo",
        ch: "L'ultim culp",        
    },
    lastTopUpAt:{
        de: "Zuletzt aufgestockt",     
        en: "Last topped up",
        fr: "dernier rempli",
        it: "Ultimo rifornito",
        ch: "Ultimas emplenidas",    
    },
    currentStock:{
        de: "Aktuelle Menge",     
        en: "Current quantity",
        fr: "Quantité actuelle",
        it: "Quantità attuale",
        ch: "Quantitad actuala",    
    },
    lastBatteryChangeAt:{
        de: "Letzter Batteriewechsel",     
        en: "Last Battery Change",
        fr: "Dernier changement de batterie",
        it: "Ultimo cambio di batteria",
        ch: "Ultima midada da battaria",    
    },
    capacity:{
        de: "Kapazität",     
        en: "Capacity",
        fr: "Capacité",
        it: "Capacità",
        ch: "Capacitad",    
    },
    pages:{
        de: "Seiten",     
        en: "Pages",
        fr: "Pages",
        it: "Pagine",
        ch: "Paginas",    
    }
}