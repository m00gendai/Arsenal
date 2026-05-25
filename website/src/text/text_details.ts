import { getCaliberCount } from "../../../lib/caliberData";
import { dataTemplate_Translations } from "../../../lib/DataTemplates/translations";
import { tabBarLabels } from "../../../lib/Text/text_tabBarLabels"
import type { Language, SimpleTranslation, SimpleTranslation_StringArray, SimpleTranslation_StringArrayName } from "../types/types_global";
import { dataTemplateConverter } from "../utils/dataTemplateConverter";
import { emptyGunObject } from "../../../lib/DataTemplates/gunDataTemplate"
import { emptyAmmoObject } from "../../../lib/DataTemplates/ammoDataTemplate"
import { emptyLightLaserObject } from "../../../lib/DataTemplates/accessoryDataTemplate_LightLaser"
import { emptyMiscAccessoryObject } from "../../../lib/DataTemplates/accessoryDataTemplate_Misc"
import { emptyMagazineObject } from "../../../lib/DataTemplates/accessoryDataTemplate_Magazine"
import { emptyOpticObject } from "../../../lib/DataTemplates/accessoryDataTemplate_Optic"
import { emptyScopeObject } from "../../../lib/DataTemplates/accessoryDataTemplate_Scope"
import { emptySilencerObject } from "../../../lib/DataTemplates/accessoryDataTemplate_Silencer"
import { emptyBookObject } from "../../../lib/DataTemplates/literatureDataTemplate_Book"
import { emptyBarrelObject } from "../../../lib/DataTemplates/partDataTemplate_Barrel"
import { emptyConversionKitObject } from "../../../lib/DataTemplates/partDataTemplate_ConversionKit"
import { emptyDieObject } from "../../../lib/DataTemplates/reloadingDataTemplate_Die"


interface Section{
    title: SimpleTranslation
    text: SimpleTranslation_StringArray
}

interface collectionSection{
    title: SimpleTranslation
    text: SimpleTranslation_StringArrayName
}

export const title: SimpleTranslation ={
    de: "Details",
    en: "Details",
    fr: "Détails",
    it: "Dettagli"
}

const gunCollection = dataTemplateConverter(emptyGunObject)
const ammoCollection = dataTemplateConverter(emptyAmmoObject)
const silencerCollection = dataTemplateConverter(emptySilencerObject)
const lightLaserCollection = dataTemplateConverter(emptyLightLaserObject)
const magazineCollection = dataTemplateConverter(emptyMagazineObject)
const miscAccessoryCollection = dataTemplateConverter(emptyMiscAccessoryObject)
const opticCollection = dataTemplateConverter(emptyOpticObject)
const scopeCollection = dataTemplateConverter(emptyScopeObject)
const bookCollection = dataTemplateConverter(emptyBookObject)
const barrelCollection = dataTemplateConverter(emptyBarrelObject)
const conversionCollection = dataTemplateConverter(emptyConversionKitObject)
const dieCollection = dataTemplateConverter(emptyDieObject)

function getTranslatedData(fields: string[], lang: Language){
    const translations = Object.keys(dataTemplate_Translations)
        .filter(field => fields.includes(field))
        .map(field => dataTemplate_Translations[field][lang])
            
    return translations
}

function getTranslatedTitle(type: keyof tabBarLabels, lang: Language){
    return tabBarLabels[type][lang]
}

function buildSectionMain(lang: Language) {
    return [
        getTranslatedTitle("gunCollection", lang),
        getTranslatedData(gunCollection, lang),
        {name: "gunCollection"},
        getTranslatedTitle("ammoCollection", lang),
        getTranslatedData(ammoCollection, lang),
        {name: "ammoCollection"},
    ]
}

function buildSectionAccessories(lang: Language) {
    return [
        getTranslatedTitle("silencerCollection", lang),
        getTranslatedData(silencerCollection, lang),
        {name: "silencerCollection"},
        getTranslatedTitle("opticCollection", lang),
        getTranslatedData(opticCollection, lang),
        {name: "opticCollection"},
        getTranslatedTitle("scopeCollection", lang),
        getTranslatedData(scopeCollection, lang),
        {name: "scopeCollection"},
        getTranslatedTitle("lightLaserCollection", lang),
        getTranslatedData(lightLaserCollection, lang),
        {name: "lightLaserCollection"},
        getTranslatedTitle("magazineCollection", lang),
        getTranslatedData(magazineCollection, lang),
        {name: "magazineCollection"},
        getTranslatedTitle("miscAccessoryCollection", lang),
        getTranslatedData(miscAccessoryCollection, lang),
        {name: "miscAccessoryCollection"},
    ]
}

function buildSectionParts(lang: Language) {
    return [
        getTranslatedTitle("conversionCollection", lang),
        getTranslatedData(conversionCollection, lang),
        {name: "conversionCollection"},
        getTranslatedTitle("barrelCollection", lang),
        getTranslatedData(barrelCollection, lang),
        {name: "barrelCollection"},
    ]
}

function buildSectionLiterature(lang: Language) {
    return [
        getTranslatedTitle("bookCollection", lang),
        getTranslatedData(bookCollection, lang),
        {name: "bookCollection"},
    ]
}

function buildSectionReloading(lang: Language) {
    return [
        getTranslatedTitle("dieCollection", lang),
        getTranslatedData(dieCollection, lang),
        {name: "dieCollection"},
    ]
}

export const section_collectionItems_title: Section = {
    title: {
        de: `Unterstützte Sammlungen`,
        en: `Supported Collections`,
        fr: `Collections soutenues`,
        it: `Collezioni supportate`
    },
    text: {
        de: [
                `Mit Arsenal können viele Sammlungen angelegt werden, über Waffen und Munition, Zubehör wie Optiken, Schalldämpfer und Laser bishin zu Büchern.
                Die Sammlungen werden stetig ausgebaut, in Planung sind zum Beispiel mehr Literatur und die Verwaltung des Wiederlade-Equipments.`
            ],
        en: [
                `With Arsenal, many collections can be created, from weapons and ammunition to accessories such as optics, silencers, and lasers, to books.
                The collections are constantly being expanded, with more literature and the management of reloading equipment being planned, for example.`
            ],
        fr: [
                `De nombreuses collections peuvent être créées avec Arsenal, des armes et munitions, aux accessoires comme les optiques, les silencieux et les lasers, en passant par les livres.
                Les collections sont en constante évolution, avec notamment plus de littérature et la gestion de l’équipement de rechargement en cours de développement.`
            ],
        it: [
                `Con Arsenal si possono creare molte collezioni, dalle armi e munizioni, agli accessori come ottiche, silenziatori e laser, fino ai libri.
                Le collezioni sono in continua espansione, con l’aggiunta di più letteratura e la gestione di attrezzature per il ricaricamento, ad esempio.`
        ]
    }
}

export const section_collectionItems_main: collectionSection = {
    title: {
        de: `Hauptsammlungen`,
        en: `Main Collections`,
        fr: `Collections principales`,
        it: `Collezioni principali`,
    },
    text: {
        de: buildSectionMain("de"),
        en: buildSectionMain("en"),
        fr: buildSectionMain("fr"),
        it: buildSectionMain("it")
    }
}

export const section_collectionItems_accessories: collectionSection = {
    title: {
        de: `Zubehör`,
        en: `Accessories`,
        fr: `Accessoires`,
        it: `Accessori`
    },
    text: {
        de: buildSectionAccessories("de"),
        en: buildSectionAccessories("en"),
        fr: buildSectionAccessories("fr"),
        it: buildSectionAccessories("it"),
    }
}

export const section_collectionItems_parts: collectionSection = {
    title: {
        de: `Waffenteile`,
        en: `Gun Parts`,
        fr: `Pièces d’arme`,
        it: `Parti di armi`
    },
    text: {
        de: buildSectionParts("de"),
        en: buildSectionParts("en"),
        fr: buildSectionParts("fr"),
        it: buildSectionParts("it"),
    }
}

export const section_collectionItems_literature: collectionSection = {
    title: {
        de: `Literatur`,
        en: `Literature`,
        fr: `Littérature`,
        it: `Letteratura`
    },
    text: {
        de: buildSectionLiterature("de"),
        en: buildSectionLiterature("en"),
        fr: buildSectionLiterature("fr"),
        it: buildSectionLiterature("it"),
    }
}

export const section_collectionItems_reloading: collectionSection = {
    title: {
        de: `Wiederladen`,
        en: `Reloading`,
        fr: `Rechargement`,
        it: `Ricarica`
    },
    text: {
        de: buildSectionReloading("de"),
        en: buildSectionReloading("en"),
        fr: buildSectionReloading("fr"),
        it: buildSectionReloading("it"),
    }
}

export const section_supportedCalibers: Section = {
    title: {
        de: `Unterstützte Kaliber`,
        en: `Supported Calibers`,
        fr: `Calibres pris en charge`,
        it: `Calibri supportati`
    },
    text: {
        de: [
            `Gewisse Funktionalität wie zum Beispiel QuickShot ist abhängig von einem bestimmten Kaliber-Format. Die App stellt selbst sicher, dass dieses Format befolgt wird. 
            Wenn allerdings eigene Daten importiert werden, müssen diese Daten auf das korrekte Format geprüft und gegebenenfalls geändert werden.`,
            `Unten folgt eine Liste der <strong>${getCaliberCount()} Kaliber</strong> und deren Format, die die App erwartet. Sollen mehrere Kaliber angegeben werden (beispielsweise für einen Revolver, 
            der .357 Magnum und .38 Special verschiesst), so sind diese mit einem Komma und Abstand ", " zu trennen:`,
            `<code>.357 S&W Magnum, .38 S&W Special</code>`
        ],
        en: [
            `Some functionality like QuickShot depend on a specific caliber format. In-App there are guardrails in place to ensure a caliber follows this format,
            however when importing your own custom data, you may need to amend your caliber data first.`,
            `Below is a list of the <strong>${getCaliberCount()} calibers</strong> and their exact format the App supports. If you need to specify multiple calibers (for example if a Revolver 
            shoots .357 Magnum and .38 Special), separate them with a comma and space ", ":`,
            `<code>.357 S&W Magnum, .38 S&W Special</code>`
        ],
        fr: [
            `Certaines fonctionnalités comme QuickShot dépendent d’un format de calibre spécifique. Dans l’application, des garde-fous sont en place pour s’assurer que le 
            calibre respecte ce format, mais lorsque vous importez vos propres données personnalisées, vous devrez peut-être modifier vos données de calibre au préalable.`,
            `Vous trouverez ci-dessous une liste des <strong>${getCaliberCount()} calibres</strong> et de leur format exact pris en charge par l’application. Si vous devez spécifier plusieurs calibres
            (par exemple si un revolver tire en .357 Magnum et en .38 Special), séparez-les par une virgule et un espace ", ":`,
            `<code>.357 S&W Magnum, .38 S&W Special</code>`
        ],
        it: [
             `Alcune funzionalità, come QuickShot, dipendono da un formato specifico del calibro. All’interno dell’app sono presenti dei limiti per garantire che il calibro segua questo formato,
            ma quando si importano dati personalizzati, potrebbe essere necessario modificare i dati del calibro prima di importarli`,
            `Di seguito è riportato un elenco dei <strong>${getCaliberCount()} calibri</strong> e del formato esatto che l’app supporta. Se è necessario specificare più calibri
            (ad esempio, se un revolver spara sia .357 Magnum che .38 Special), separarli con una virgola e uno spazio «, «:`,
            `<code>.357 S&W Magnum, .38 S&W Special</code>`
        ]
    }
}