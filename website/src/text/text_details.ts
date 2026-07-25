import { getCaliberCount } from "../../../lib/caliberData";
import { dataTemplate_Translations } from "../../../lib/DataTemplates/translations";
import { tabBarLabels } from "../../../lib/Text/text_tabBarLabels"
import type { functionalityIcons, Language, SimpleTranslation, SimpleTranslation_StringArray, SimpleTranslation_StringArrayName } from "../types/types_global";
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
import { emptyCaseObject } from "../../../lib/DataTemplates/reloadingDataTemplate_Case"
import { emptyBulletObject } from "../../../lib/DataTemplates/reloadingDataTemplate_Bullet"
import { emptyPrimerObject } from "../../../lib/DataTemplates/reloadingDataTemplate_Primer"
import { emptyPowderObject, powderRemarks } from "../../../lib/DataTemplates/reloadingDataTemplate_Powder"


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

const gunCollection             = dataTemplateConverter(emptyGunObject)
const ammoCollection            = dataTemplateConverter(emptyAmmoObject)
const silencerCollection        = dataTemplateConverter(emptySilencerObject)
const lightLaserCollection      = dataTemplateConverter(emptyLightLaserObject)
const magazineCollection        = dataTemplateConverter(emptyMagazineObject)
const miscAccessoryCollection   = dataTemplateConverter(emptyMiscAccessoryObject)
const opticCollection           = dataTemplateConverter(emptyOpticObject)
const scopeCollection           = dataTemplateConverter(emptyScopeObject)
const bookCollection            = dataTemplateConverter(emptyBookObject)
const barrelCollection          = dataTemplateConverter(emptyBarrelObject)
const conversionCollection      = dataTemplateConverter(emptyConversionKitObject)
const dieCollection             = dataTemplateConverter(emptyDieObject)
const bulletCollection          = dataTemplateConverter(emptyBulletObject)
const caseCollection            = dataTemplateConverter(emptyCaseObject)
const primerCollection          = dataTemplateConverter(emptyPrimerObject)
const powderCollection          = dataTemplateConverter(emptyPowderObject)

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
        getTranslatedTitle("bulletCollection", lang),
        getTranslatedData(bulletCollection, lang),
        {name: "bulletCollection"},
        getTranslatedTitle("caseCollection", lang),
        getTranslatedData(caseCollection, lang),
        {name: "caseCollection"},
        getTranslatedTitle("primerCollection", lang),
        getTranslatedData(primerCollection, lang),
        {name: "primerCollection"},
        getTranslatedTitle("powderCollection", lang),
        getTranslatedData(powderCollection, lang),
        {name: "powderCollection"},
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

export const section_supportedFunctionality = {
    title: {
        de: ``,
        en: `Additional Functionality`,
        fr: ``,
        it: ``
    },
    text: {
        de: `
        `,
        en: `
Arsenal offers a wide variety of additional functionality that goes beyond what a simple gun collection tracker offers and which sets it apart from competitor applications.
        `,
        fr: `
        `,
        it: `
        `,
    }
}

export const section_supportedFunctionality_details: {title: SimpleTranslation, text: SimpleTranslation, icon: functionalityIcons}[] = [
    {
        title: {
            de: ``,
            en: `QuickShot - Keep track of how may rounds went through your gun`,
            fr: ``,
            it: ``,
        },
        text: {
            de: ``,
            en: `
QuickShot is a "rangelog light" and allows to log shots taken with a firearm directly from the collection overview.
It is connected to the ammunition in the app, meaning QuickShot detects if you have caliber compatible ammunition in stock.
This allows you to not only quickly log a shooting session, but also directly subtract the spent rounds from your ammunition stock.

Of course, you can just log shots without touching your ammunition stock.
Using QuickShot will update the used firearm with shots fired and date of last shooting and the ammuniton, if applicable.
`,
            fr: ``,
            it: ``,
        },
    icon: "quickShot"
    },
    {
        title: {
            de: ``,
            en: `QuickStock - Keep track of your consumables' stock increase and decrease`,
            fr: ``,
            it: ``,
        },
        text: {
            de: ``,
            en: `
QuickStock is a smart utility to quickly top up your consumables (ammunition, bullets, casings, primers, powder) directly from the collection overview.
Not only can you quickly log increase and decrease of stock, you can also add how much you paid for your top-up.
In the detail view of your consumables, you will find a "costs" tab, which lists all top-ups, how much you paid and what the average price is.

For powder, you can specify the quantity unit. This is so you can log a decrease in grains despite having the powder amount unit set to pounds, for example.
`,
            fr: ``,
            it: ``,
        },
    icon: "quickStock"
    },
        {
        title: {
            de: ``,
            en: `QuickMount - Keep track of where your accessories or weapon parts are mounted to`,
            fr: ``,
            it: ``,
        },
        text: {
            de: ``,
            en: `
QuickMount allows you to quickly "mount" an accessory or a weapon part to a gun, another accessory or another weapon part.
This way, you always know where an accessory is mounted on, or which weapon has which accessories attached.
A convenient, categorized list (with images) makes it easy to quickly select your target gun, accessory or weapon part.

In the tile view image, on the bottom, you will find icons corresponding to the type of accessory or weapon part which is mounted.
In the detail view under the tab "accessories" you will find the information of the accessory or weapon part and you can unmount or remount the accessory or weapon part.
In the tile view image, on the top, it is shown on which accessory, weapon part or weapon something is currently mounted to.
`,
            fr: ``,
            it: ``,
        },
    icon: "quickMount"
    },
    {
        title: {
            de: ``,
            en: `QR Code Integration & Creation`,
            fr: ``,
            it: ``,
        },
        text: {
            de: ``,
            en: `
QR Codes are a quick and easy way to physically track your inventory. 

If you already employ QR Codes in your collection, be it codes on a tag on your guns, or code stickers on ammo boxes, simply scan the existing code when creating a new collection entry and that code is now linked to it. 
Use the scan button in the collection overview to scan your code and the linked collection item is displayed immediately - no matter where you are in the app.

But what if you dont already have QR codes, but _want_ to? 
No problem, Arsenal features a complete customizable QR Code Label generator! 
Select which collection you want to generate codes for, which items specifically (or just everything), select which attributes should appear on the label (or none if you just want the code) and the format and there you go!
Arsenal generates a PDF with the QR Code Tags ready to print! 

There are several predefined formats (the most common Avery/Zweckform) in either DIN A4 or US Letter format, but you can of course create and save your own custom format, just like in Microsoft Office Word! 
Dont want to deal iwth QR Codes but labels would be neat? No problem, just leave the QR Code off!
`,
            fr: ``,
            it: ``,
        },
    icon: "qrCode"
    },
        {
        title: {
            de: ``,
            en: `Database import/Export`,
            fr: ``,
            it: ``,
        },
        text: {
            de: ``,
            en: `
A core functionality of every collection tracker is importing/exporting existing databases from and to the app. 
Arsenal uses SQLite under the hood, a fast and stable database standard used in millions of applications. 

Export:
You can export the Arsenal Database in the following formats:
- __Full Database Export__
  This generates a zipped folder with your raw database in SQlite and a folder with all your images. This is the standard format you should use to back up your database and when switching devices.
- __CSV Export__
  This generates a CSV file of the collection you specified. This is useful if you wnat physical printouts or if you want to amend your database on a computer.
  It does not include images, though, only the references to their location on your device. 
  However if you reimport the CSV and you did not delete any data on the Arsenal app, the images will be correctly linked again.

Import:
You can import databases into Arsenal in the following formats:
- __Full Database Import__
  This imports the zipped folder with the database and images. It requires a certain naming convention and file format; This is set automatically on the full database export.
- __Arsenal CSV Import__
  This imports the file generated by the CSV Export. It requires a certain naming convention and file format and the CSV Export needs to have been generated by the same app version.
  This is set automatically on the Arsenal CSV Export.
- __Custom CSV Import__
  This imports any CSV file you desire. You have to manually map the CSV column names to the Arsenal database column names; This can be done through a convenient helper dialog in the app.
  Use this if you want to move your database from a third party gun collection app, from your computers Excel file or from a lower version Arsenal CSV.
  
  Please make sure that the \`caliber\` field in your CSV matches the expected caliber notation of Arsenal, otherwise the QuickStock functionality will be impacted and other undesireable sideeffects may appear.  
`,
            fr: ``,
            it: ``,
        },
    icon: "importExport"
    },
        {
        title: {
            de: ``,
            en: `PDF Lists`,
            fr: ``,
            it: ``,
        },
        text: {
            de: ``,
            en: `
Another core functionality of every decent collection tracker are PDF list exports. Arsenal offers two universal PDF lists:
- __Complete Gun List as a table__
  This generates a table with all your guns with the following attributes:
  - Manufacturer
  - Model Name
  - Caliber
  - Serial
  - Permit reference
  - Acquisition Date
  
  It is a quick and easy way to provide a complete list of your guns, be it for insurance purposes, on agency request or for whatever you might need it

- __Custom List__
This lets you print a PDF list of any collection you want with any attributes you want. Need a list of all your guns for your insurance and want to include
the value, but not the serial? No problem! Want a physical list of your ammo collection with just the Designation and the caliber? Here you go!

Depending on your selected country of residence, additional predefined lists are offered. Currently, these are:
- Switzerland
  - __Gun List according to WA Article 5 as a table__
    This generates a table with all your guns that fall under Article 5 with the following attributes:
    - Manufacturer
    - Model Name
    - Caliber
    - Serial
    - Permit reference
    - Acquisition Date
    - Reason why it is under Aticle 5
    This is very useful if you apply for a collectors permit or if your local weapons bureau wants an excerpt of your prohibited items.

  - __Complete Gun List as a table with WA Article 5 properties__
    This generates a table with all your guns including wether or not thes fall under Article 5 and why. Its a hybrid between the Complete Gun List and the Article 5 List.
    It exists because it was requested by some users since some weapons bureaus want a complete list of your collection, not only of the guns that fall under Article 5. 
    This list adds additional detail.

Also, each collection item can be printed as a "gallery print", which displays every image, any tags, and all attributes. This is useful if you want to have a physical representation for display purposes or if you want to sell something and need a flyer for your clubs blackboard.
`,
            fr: ``,
            it: ``,
        },
    icon: "pdf"
    },{
        title: {
            de: ``,
            en: `Customizable Units`,
            fr: ``,
            it: ``,
        },
        text: {
            de: ``,
            en: `
Depending on where you live on this planet, you are used to certain units of measurements. However, sometimes, you still want to or have to use other units. Arsenal leaves you the freedom to decide which length or weight unit for what purpose you want to display. 

Everything in metric except powder? No problem. Bullet weight in ounces? Weird choice, but you do you. 
To account for future additional unit attributes, a general weight and length unit is also provided. 

You can change these values anytime. The database strictly saves every value in Milligram and Millimeter respectively and converts it to your desired display unit.

For powder, it is recommended that you set the weight unit to the commonly used commercial units - Kilograms or Grams for metric countries, Pounds or Ounces for imperial countries.
For any stock increase or decrease, you can select your preferred unit again - this is to accomodate stock increase in for example Kilograms, but decrease in Grains when you used some powder for reloading.

As for currencies, you can set any world currency you like. 
However it is merely a cosmetic choice, as the database only saves the numeric value and doesnt associate it with any currency conversions or inflation percentages. 
This is due to the strict offline handling of the app.

Most people use only one currency anyways. If you bought something in another currency, it is recommended you enter the buy price converted to your currency.

As for inflation, it is planned to integrate yearly inflation percentages for every country directly into the app with the caveat that data only starts at 1980.
`,
            fr: ``,
            it: ``,
        },
    icon: "units"
    },
    {
        title: {
            de: ``,
            en: `Item History`,
            fr: ``,
            it: ``,
        },
        text: {
            de: ``,
            en: `
Every change, every edit you make for a collection item is logged, so you always have a complete and transparent history for your item.
Each log entry displays exactly when a change was made, what changed, what the old value was and what the new value is.

Not only is this useful to trace the entire history of an item, it also acts as a save point when you accidentally enter a wrong value and dont remember the original value.
`,
            fr: ``,
            it: ``,
        },
    icon: "history"
    },
    {
        title: {
            de: ``,
            en: `Cost History`,
            fr: ``,
            it: ``,
        },
        text: {
            de: ``,
            en: `
Consumables (Ammunition, Bullets, Cases, Primers, Powder) also feature a Cost History so you see exactly when you spent what on which item.

It displays the purchase date, the total amount, the total price paid and an average price. That way you can monitor your spending and any price trends.
`,
            fr: ``,
            it: ``,
        },
    icon: "costHistory"
    },
    {
        title: {
            de: ``,
            en: `Mark as Sold`,
            fr: ``,
            it: ``,
        },
        text: {
            de: ``,
            en: `
Its unheard of, but it can happen that something of your collection got sold to someone else. 
Arsenal (reluctantly) offers a functionality to mark an item as sold, but keeps it in your database. You can choose if you want to have it still displayed in our collection (greyed out) or have it hidden completely. 

When "selling" something, you can enter the details of the transaction, such as buyer name, sell date, sell price, any permit references and personal notes.
These details cannot be amended later, so make sure they are correct. They will be displayed on top of all other attributes when you view a sold item in your collection.
`,
            fr: ``,
            it: ``,
        },
    icon: "sold"
    },
    {
        title: {
            de: ``,
            en: `Tags`,
            fr: ``,
            it: ``,
        },
        text: {
            de: ``,
            en: `
Tags are a convenient way to group items in a collection. 

If for example you want to filter your book collection for the topic "Swiss Military Weapons", simply tag the corresponding collection items and apply the collection filter. 
Its also useful to group your weapons by type. Everyone has their own preferences: 
One just wants a general distiction between rifles, Pistols and Revolvers. Another wants to distinguish deeper - Toploading revolvers, Cap & Ball Revolvers, Magnum Revolvers, etc...
With tags, you can decide on your own framework of weapon classifications.

You can use any tags you like. You also do not need to write them a hundred times over; Arsenal offers a convenient dialog to manage the tags and it keeps track of existing ones.
`,
            fr: ``,
            it: ``,
        },
    icon: "tags"
    },
]