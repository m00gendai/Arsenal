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
import { emptyPowderObject } from "../../../lib/DataTemplates/reloadingDataTemplate_Powder"


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
            (ad esempio, se un revolver spara sia .357 Magnum che .38 Special), separarli con una virgola e uno spazio ", ":`,
            `<code>.357 S&W Magnum, .38 S&W Special</code>`
        ]
    }
}

export const section_supportedFunctionality = {
    title: {
        de: `Zusätzliche Funktionalität`,
        en: `Additional Functionality`,
        fr: `Fonctionnalités supplémentaires`,
        it: `Funzionalità aggiuntive`
    },
    text: {
        de: `
Arsenal bietet eine breite Palette an zusätzlicher Funktionalität, die über das hinausgeht, was ein einfacher Sammel-Tracker für Waffen bietet, und die es von der Konkurrenz abheben lassen.
        `,
        en: `
Arsenal offers a wide variety of additional functionality that goes beyond what a simple gun collection tracker offers and which sets it apart from competitor applications.
        `,
        fr: `
Arsenal propose une large gamme de fonctionnalités supplémentaires qui vont au-delà de ce qu’un simple suivi de collection d’armes à feu peut offrir et qui le distinguent des applications concurrentes.
        `,
        it: `
Arsenal offre una vasta gamma di funzionalità aggiuntive che vanno oltre quelle di un semplice tracciatore di collezioni di armi e che lo distinguono dalle applicazioni concorrenti.
        `,
    }
}

export const section_supportedFunctionality_details: {title: SimpleTranslation, text: SimpleTranslation, icon: functionalityIcons}[] = [
    {
        title: {
            de: `QuickShot - Behalte den Überblick, wie viele Schüsse du abgegeben hast`,
            en: `QuickShot - Keep track of how may rounds went through your gun`,
            fr: `QuickShot - Garde une trace du nombre de balles tirées par ton arme`,
            it: `QuickShot - Tieni traccia di quanti colpi sono stati sparati con la tua arma`,
        },
        text: {
            de: `
QuickShot ist ein "Rangelog light" und ermöglicht dir, abgegebene Schüsse direkt aus der Sammlungsübersicht zu erfassen.
Es ist mit der Munition in der App verbunden, wodurch QuickShot erkennt, ob du passende Munition für das Kaliber an Lager hast.
So kannst du nicht nur schnell eine Schiesssession erfassen, sondern auch die verschossenen Patronen direkt von deinem Munitionsbestand abziehen.

Natürlich kannst du Schüsse auch einfach erfassen, ohne deinen Munitionsbestand anzupassen.
Die Verwendung von QuickShot aktualisiert die verwendete Waffe mit der Anzahl abgegebener Schüsse sowie dem Datum der letzten Schiesssession und, falls zutreffend, die verwendete Munition.
            `,
            en: `
QuickShot is a "rangelog light" and allows to log shots taken with a firearm directly from the collection overview.
It is connected to the ammunition in the app, meaning QuickShot detects if you have caliber compatible ammunition in stock.
This allows you to not only quickly log a shooting session, but also directly subtract the spent rounds from your ammunition stock.

Of course, you can just log shots without touching your ammunition stock.
Using QuickShot will update the used firearm with shots fired and date of last shooting and the ammuniton, if applicable.
`,
            fr: `
QuickShot est un "rangelog light" qui te permet d'enregistrer les coups tirés avec une arme directement depuis l'aperçu de ta collection.
Il est lié aux munitions dans l'application, ce qui signifie que QuickShot détecte si tu as des munitions compatibles avec le calibre en stock.
Cela te permet non seulement d'enregistrer rapidement une séance de tir, mais aussi de déduire directement les coups tirés de ton stock de munitions.

Bien sûr, tu peux aussi simplement enregistrer les coups tirés sans modifier ton stock de munitions.
L'utilisation de QuickShot met à jour l'arme concernée avec le nombre de coups tirés ainsi que la date de la dernière séance de tir, et les munitions utilisées si applicable.

            `,
            it: `
QuickShot è un "rangelog light" che ti permette di registrare i colpi sparati con un'arma direttamente dalla panoramica della tua collezione.
È collegato alle munizioni presenti nell'app, ciò significa che QuickShot rileva se hai delle munizioni compatibili con il calibro disponibili in magazzino.
Questo ti permette non solo di registrare rapidamente una sessione di tiro, ma anche di sottrarre direttamente i colpi sparati dalla tua scorta di munizioni.

Naturalmente puoi anche semplicemente registrare i colpi sparati senza modificare la tua scorta di munizioni.
L'utilizzo di QuickShot aggiorna l'arma interessata con il numero di colpi sparati e la data dell'ultima sessione di tiro, così come le munizioni utilizzate, se applicabile.

            `,
        },
    icon: "quickShot"
    },
    {
        title: {
            de: `QuickStock - Behalte den Überblick über den Lagerbestand deines Verbrauchsmaterials`,
            en: `QuickStock - Keep track of your consumables' stock increase and decrease`,
            fr: `QuickStock - Suis l’augmentation et la diminution de ton stock de consommables`,
            it: `QuickStock - Tieni traccia dell’aumento e della diminuzione delle scorte dei materiali di consumo`,
        },
        text: {
            de: `
QuickStock ist ein intelligentes Werkzeug, mit dem du deine Verbrauchsmaterialien (Munition, Geschosse, Hülsen, Zündhütchen, Pulver) direkt aus der Sammlungsübersicht schnell nachfüllen kannst.
Du kannst damit nicht nur Zu- und Abgänge deines Bestands schnell erfassen, sondern auch den bezahlten Betrag für deine Auffüllung hinzufügen.
In der Detailansicht deiner Verbrauchsmaterialien findest du einen "Kosten"-Tab, der alle Auffüllungen, die bezahlten Beträge sowie den Durchschnittspreis auflistet.

Bei Pulver kannst du die Mengeneinheit festlegen. So kannst du beispielsweise eine Reduktion in Grain erfassen, obwohl die Pulvermenge in Pfund angezeigt wird.

            `,
            en: `
QuickStock is a smart utility to quickly top up your consumables (ammunition, bullets, casings, primers, powder) directly from the collection overview.
Not only can you quickly log increase and decrease of stock, you can also add how much you paid for your top-up.
In the detail view of your consumables, you will find a "costs" tab, which lists all top-ups, how much you paid and what the average price is.

For powder, you can specify the quantity unit. This is so you can log a decrease in grains despite having the powder amount unit set to pounds, for example.
`,
            fr: `
QuickStock est un outil intelligent qui te permet de compléter rapidement ton stock de consommables (munitions, balles, douilles, amorces, poudre) directement depuis l'aperçu de ta collection.
Tu peux non seulement enregistrer rapidement les augmentations et diminutions de stock, mais aussi ajouter le montant payé lors de ton réapprovisionnement.
Dans la vue détaillée de tes consommables, tu trouveras un onglet "coûts" qui liste tous les réapprovisionnements, les montants payés ainsi que le prix moyen.

Pour la poudre, tu peux définir l'unité de quantité. Cela te permet par exemple d'enregistrer une diminution en grains, même si la quantité de poudre est affichée en livres.
`,
            it: `
QuickStock è uno strumento intelligente che ti permette di rifornire rapidamente le tue scorte di materiali di consumo (munizioni, palle, bossoli, inneschi, polvere) direttamente dalla panoramica della tua collezione.
Non solo puoi registrare rapidamente gli aumenti e le diminuzioni delle scorte, ma puoi anche aggiungere quanto hai pagato per il rifornimento.
Nella vista dettagliata dei tuoi materiali di consumo troverai una scheda "costi", che elenca tutti i rifornimenti, gli importi pagati e il prezzo medio.

Per la polvere puoi definire l'unità di quantità. Questo ti permette, ad esempio, di registrare una diminuzione in grani anche se la quantità di polvere è impostata in libbre.

            `,
        },
    icon: "quickStock"
    },
        {
        title: {
            de: `QuickMount - Behalte den Überblick, wo du dein Zubehör oder deine Waffenkomponenten montiert hast`,
            en: `QuickMount - Keep track of where your accessories or weapon parts are mounted to`,
            fr: `QuickMount - Garde une trace de l’endroit où tes accessoires ou pièces d’arme sont montés`,
            it: `QuickMount - Tieni traccia di dove sono montati i tuoi accessori o le parti dell’arma`,
        },
        text: {
            de: `
QuickMount ermöglicht dir, ein Zubehör oder Waffenteil schnell auf einer Waffe, einem anderen Zubehör oder einem anderen Waffenteil zu "montieren".
So weisst du jederzeit, an welcher Waffe ein Zubehör montiert ist oder welche Waffe über welches Zubehör verfügt.
Eine praktische, kategorisierte Liste (mit Bildern) macht es einfach, schnell die gewünschte Waffe, das Zubehör oder das Waffenteil auszuwählen.

Im Bild der Kachelansicht findest du unten Symbole, die dem Typ des montierten Zubehörs oder Waffenteils entsprechen.
In der Detailansicht findest du unter dem Tab "Zubehör" die Informationen zum Zubehör oder Waffenteil und kannst dieses demontieren oder erneut montieren.
Im Bild der Kachelansicht wird oben angezeigt, worauf das Objekt aktuell montiert ist.

            `,
            en: `
QuickMount allows you to quickly "mount" an accessory or a weapon part to a gun, another accessory or another weapon part.
This way, you always know where an accessory is mounted on, or which weapon has which accessories attached.
A convenient, categorized list (with images) makes it easy to quickly select your target gun, accessory or weapon part.

In the tile view image, on the bottom, you will find icons corresponding to the type of accessory or weapon part which is mounted.
In the detail view under the tab "accessories" you will find the information of the accessory or weapon part and you can unmount or remount the accessory or weapon part.
In the tile view image, on the top, it is shown on which accessory, weapon part or weapon something is currently mounted to.
`,
            fr: `
QuickMount te permet de "monter" rapidement un accessoire ou une pièce d'arme sur une arme, un autre accessoire ou une autre pièce d'arme.
Ainsi, tu sais toujours sur quelle arme un accessoire est monté ou quelles armes possèdent quels accessoires.
Une liste pratique et catégorisée (avec images) te permet de sélectionner rapidement l'arme, l'accessoire ou la pièce d'arme souhaitée.

Dans l'image de la vue en tuiles, tu trouveras en bas les icônes correspondant au type d'accessoire ou de pièce d'arme actuellement monté.
Dans la vue détaillée, sous l'onglet "accessoires", tu trouveras les informations concernant l'accessoire ou la pièce d'arme. Tu peux également démonter ou remonter l'accessoire ou la pièce d'arme.
Dans l'image de la vue en tuiles, les éléments en haut indiquent sur quel accessoire, quelle pièce d'arme ou quelle arme l'objet est actuellement monté.

            `,
            it: `
QuickMount ti permette di "montare" rapidamente un accessorio o un componente d'arma su un'arma, un altro accessorio o un altro componente d'arma.
In questo modo sai sempre su quale arma è montato un accessorio o quali accessori sono installati su una determinata arma.
Una pratica lista categorizzata (con immagini) ti permette di selezionare rapidamente l'arma, l'accessorio o il componente d'arma desiderato.

Nell'immagine della vista a riquadri, in basso trovi le icone corrispondenti al tipo di accessorio o componente d'arma attualmente montato.
Nella vista dettagliata, sotto la scheda "accessori", trovi le informazioni sull'accessorio o sul componente d'arma e puoi smontarlo o rimontarlo.
Nell'immagine della vista a riquadri, in alto viene mostrato su quale accessorio, componente d'arma o arma è attualmente montato l'oggetto.

            `,
        },
    icon: "quickMount"
    },
    {
        title: {
            de: `QR-Code-Integration und -Erstellung`,
            en: `QR Code Integration & Creation`,
            fr: `Intégration et création de QR Code`,
            it: `Integrazione e creazione di codici QR`,
        },
        text: {
            de: `
QR-Codes sind eine schnelle und einfache Möglichkeit, dein Inventar physisch zu verwalten.
Wenn du bereits QR-Codes in deiner Sammlung verwendest, sei es Codes auf Etiketten an deinen Waffen oder Code-Aufkleber auf Munitionsboxen, scanne beim Erstellen eines neuen Sammlungseintrags einfach den bestehenden Code - und dieser Code ist nun damit verknüpft.
Verwende den Scan-Button in der Sammlungsübersicht, um deinen Code zu scannen. Der verknüpfte Sammlungseintrag wird sofort angezeigt - egal, wo du dich gerade in der App befindest.

Aber was, wenn du noch keine QR-Codes hast, sie aber gerne verwenden möchtest?
Kein Problem, Arsenal verfügt über einen vollständig anpassbaren QR-Code-Etikettengenerator!
Wähle aus, für welche Sammlung du Codes erstellen möchtest, welche Einträge enthalten sein sollen (oder einfach alles), welche Informationen auf dem Etikett erscheinen sollen (oder keine, wenn du nur den Code möchtest), wähle das Format - und los geht's!
Arsenal erstellt ein PDF mit den QR-Code-Etiketten, die direkt gedruckt werden können!

Es stehen mehrere vordefinierte Formate zur Verfügung (darunter die gängigsten Avery/Zweckform-Formate) - entweder im DIN-A4- oder US-Letter-Format. Natürlich kannst du auch dein eigenes benutzerdefiniertes Format erstellen und speichern, genau wie in Microsoft Word!
Du möchtest keine QR-Codes verwenden, aber Etiketten wären trotzdem praktisch? Kein Problem, lass den QR-Code einfach weg!
            `,
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
            fr: `
Les codes QR sont un moyen simple et rapide de suivre physiquement ton inventaire.

Si tu utilises déjà des codes QR dans ta collection, que ce soit des codes sur des étiquettes fixées à tes armes ou des autocollants avec des codes sur tes boîtes de munitions, il te suffit de scanner le code existant lors de la création d'un nouvel élément de collection, et ce code sera désormais lié à celui-ci.
Utilise le bouton de scan dans l'aperçu de ta collection pour scanner ton code: l'élément de collection associé s'affichera immédiatement, peu importe où tu te trouves dans l'application.

Mais que faire si tu n'as pas encore de codes QR, mais que tu aimerais en utiliser?
Aucun problème, Arsenal dispose d'un générateur complet et personnalisable d'étiquettes avec codes QR!
Sélectionne la collection pour laquelle tu souhaites générer des codes, les éléments concernés (ou simplement tout), choisis les informations à afficher sur l'étiquette (ou aucune si tu veux uniquement le code), sélectionne le format et c'est parti!
Arsenal génère un PDF avec les étiquettes QR prêtes à être imprimées!

Plusieurs formats prédéfinis sont disponibles (notamment les formats Avery/Zweckform les plus courants) en format DIN A4 ou US Letter. Tu peux également créer et enregistrer ton propre format personnalisé, exactement comme dans Microsoft Word!
Tu ne veux pas utiliser de codes QR mais tu aimerais quand même avoir des étiquettes? Aucun problème, désactive simplement le code QR!

            `,
            it: `
I codici QR sono un modo semplice e veloce per tenere traccia fisicamente del tuo inventario.
Se utilizzi già dei codici QR nella tua collezione, ad esempio codici su etichette applicate alle tue armi o adesivi con codici sulle scatole di munizioni, ti basta scansionare il codice esistente durante la creazione di un nuovo elemento della collezione e il codice verrà collegato automaticamente a quell'elemento.
Utilizza il pulsante di scansione nella panoramica della collezione per scansionare il codice: l'elemento collegato verrà visualizzato immediatamente, indipendentemente da dove ti trovi nell'app.

Ma cosa succede se non hai ancora dei codici QR, ma vorresti usarli?
Nessun problema, Arsenal dispone di un generatore completo e personalizzabile di etichette con codici QR!
Seleziona la collezione per cui vuoi generare i codici, quali elementi includere (oppure semplicemente tutto), scegli quali informazioni devono apparire sull'etichetta (o nessuna se vuoi solo il codice), seleziona il formato e il gioco è fatto!
Arsenal genera un PDF con le etichette QR pronte per la stampa!

Sono disponibili diversi formati predefiniti (tra cui i più comuni Avery/Zweckform) in formato DIN A4 o US Letter, ma puoi naturalmente creare e salvare anche il tuo formato personalizzato, proprio come in Microsoft Word!
Non vuoi usare i codici QR ma ti piacerebbe avere delle etichette? Nessun problema, basta disattivare il codice QR!
`,
        },
    icon: "qrCode"
    },
        {
        title: {
            de: `Datenbank Import/Export`,
            en: `Database import/Export`,
            fr: `Importation/exportation de la base de données`,
            it: `Importazione/Esportazione del database`,
        },
        text: {
            de: `
Eine Kernfunktion jeder Sammlungsverwaltung ist der Import und Export bestehender Datenbanken in und aus der App.
Arsenal verwendet im Hintergrund SQLite, einen schnellen und stabilen Datenbankstandard, der in Millionen von Anwendungen eingesetzt wird.

Export:
Du kannst die Arsenal-Datenbank in folgenden Formaten exportieren:
- __Vollständiger Datenbankexport__
Dieser erstellt einen komprimierten Ordner mit deiner Rohdatenbank im SQLite-Format sowie einem Ordner mit all deinen Bildern. Dies ist das Standardformat, das du für Backups deiner Datenbank und beim Wechsel auf ein neues Gerät verwenden solltest.
- __CSV-Export__
Dieser erstellt eine CSV-Datei der von dir ausgewählten Sammlung. Dies ist nützlich, wenn du physische Ausdrucke erstellen oder deine Datenbank am Computer bearbeiten möchtest.
Die Bilder sind jedoch nicht enthalten, sondern nur die Verweise auf deren Speicherort auf deinem Gerät.
Wenn du die CSV-Datei jedoch wieder importierst und keine Daten in der Arsenal-App gelöscht hast, werden die Bilder wieder korrekt verknüpft.

Import:
Du kannst Datenbanken in folgenden Formaten in Arsenal importieren:
- __Vollständiger Datenbankimport__
  Dieser importiert den komprimierten Ordner mit Datenbank und Bildern. Er benötigt eine bestimmte Namenskonvention und ein bestimmtes Dateiformat; diese werden beim vollständigen Datenbankexport automatisch gesetzt.
- __Arsenal-CSV-Import__
Dieser importiert die Datei, die durch den CSV-Export erstellt wurde. Er benötigt eine bestimmte Namenskonvention und ein bestimmtes Dateiformat, und der CSV-Export muss mit derselben App-Version erstellt worden sein.
Diese Einstellungen werden beim Arsenal-CSV-Export automatisch gesetzt.
- __Benutzerdefinierter CSV-Import__
Dieser importiert jede beliebige CSV-Datei. Du musst die CSV-Spaltennamen manuell den Spaltennamen der Arsenal-Datenbank zuordnen; dies kann über einen praktischen Assistenten in der App erledigt werden.
Verwende diese Option, wenn du deine Datenbank aus einer anderen Waffen-Sammlungs-App, aus einer Excel-Datei auf deinem Computer oder aus einem CSV-Export einer älteren Arsenal-Version übernehmen möchtest.

Stelle bitte sicher, dass das Feld \`caliber\` in deiner CSV-Datei der von Arsenal erwarteten Kalibernotation entspricht. Andernfalls wird die QuickStock-Funktionalität beeinträchtigt und es können weitere unerwünschte Nebeneffekte auftreten.

            `,
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
            fr: `
Une fonctionnalité essentielle de toute application de gestion de collection est l'importation et l'exportation de bases de données existantes vers et depuis l'application.
Arsenal utilise SQLite en arrière-plan, un standard de base de données rapide et fiable utilisé dans des millions d'applications.

Exportation:
Tu peux exporter la base de données Arsenal dans les formats suivants:
- __Exportation complète de la base de données__
Cette option génère un dossier compressé contenant ta base de données brute au format SQLite ainsi qu'un dossier avec toutes tes images. C'est le format standard à utiliser pour sauvegarder ta base de données et lors d'un changement d'appareil.
- __Exportation CSV__
Cette option génère un fichier CSV de la collection que tu as sélectionnée. C'est utile si tu souhaites créer des impressions papier ou modifier ta base de données sur un ordinateur.
Les images ne sont toutefois pas incluses, uniquement les références vers leur emplacement sur ton appareil.
Cependant, si tu réimportes le CSV et que tu n'as supprimé aucune donnée dans l'application Arsenal, les images seront correctement associées à nouveau.

Importation :
Tu peux importer des bases de données dans Arsenal dans les formats suivants:
- __Importation complète de la base de données__
Cette option importe le dossier compressé contenant la base de données et les images. Elle nécessite une convention de nommage et un format de fichier spécifiques; ceux-ci sont automatiquement définis lors de l'exportation complète de la base de données.
- __Importation CSV Arsenal__
Cette option importe le fichier généré par l'exportation CSV. Elle nécessite une convention de nommage et un format de fichier spécifiques, et l'exportation CSV doit avoir été générée par la même version de l'application.
Ces paramètres sont automatiquement définis lors de l'exportation CSV Arsenal.
- __Importation CSV personnalisée__
Cette option importe n'importe quel fichier CSV de ton choix. Tu dois associer manuellement les noms des colonnes CSV aux noms des colonnes de la base de données Arsenal; cela peut être fait facilement grâce à une fenêtre d'aide dans l'application.
Utilise cette option si tu souhaites transférer ta base de données depuis une autre application de gestion de collection d'armes, depuis un fichier Excel sur ton ordinateur ou depuis un fichier CSV Arsenal d'une version précédente.

Assure-toi que le champ \`caliber\` dans ton fichier CSV correspond à la notation de calibre attendue par Arsenal. Dans le cas contraire, la fonctionnalité QuickStock sera affectée et d'autres effets indésirables peuvent apparaître.
`,
            it: `
Una funzionalità fondamentale di ogni applicazione per la gestione di collezioni è l'importazione e l'esportazione di database esistenti da e verso l'applicazione.
Arsenal utilizza SQLite internamente, uno standard di database veloce e stabile utilizzato in milioni di applicazioni.

Esportazione:
Puoi esportare il database Arsenal nei seguenti formati:
- __Esportazione completa del database__
Questa opzione genera una cartella compressa contenente il tuo database grezzo in formato SQLite e una cartella con tutte le tue immagini. Questo è il formato standard da utilizzare per il backup del database e quando cambi dispositivo.
- __Esportazione CSV__
Questa opzione genera un file CSV della collezione selezionata. È utile se vuoi creare stampe cartacee o modificare il database su un computer.
Le immagini non sono incluse, ma vengono salvati solo i riferimenti alla loro posizione sul dispositivo.
Tuttavia, se reimporti il CSV e non hai eliminato alcun dato nell'app Arsenal, le immagini verranno collegate nuovamente correttamente.

Importazione:
Puoi importare database in Arsenal nei seguenti formati:
- __Importazione completa del database__
Questa opzione importa la cartella compressa contenente il database e le immagini. Richiede una determinata convenzione di denominazione e un formato di file specifico; entrambi vengono impostati automaticamente durante l'esportazione completa del database.
- __Importazione CSV Arsenal__
Questa opzione importa il file generato dall'esportazione CSV. Richiede una determinata convenzione di denominazione e un formato di file specifico, e l'esportazione CSV deve essere stata generata dalla stessa versione dell'app.
Questi parametri vengono impostati automaticamente durante l'esportazione CSV Arsenal.
- __Importazione CSV personalizzata__
Questa opzione importa qualsiasi file CSV desiderato. Devi associare manualmente i nomi delle colonne CSV ai nomi delle colonne del database Arsenal; puoi farlo tramite una comoda finestra di assistenza nell'app.
Usa questa opzione se vuoi trasferire il tuo database da un'altra applicazione per la gestione di collezioni di armi, da un file Excel sul tuo computer o da un file CSV Arsenal di una versione precedente.

Assicurati che il campo \`caliber\` nel tuo file CSV corrisponda alla notazione del calibro prevista da Arsenal. In caso contrario, la funzionalità QuickStock potrebbe essere compromessa e potrebbero verificarsi altri effetti indesiderati.
            `,
        },
    icon: "importExport"
    },
        {
        title: {
            de: `PDF-Listen`,
            en: `PDF Lists`,
            fr: `PDF Listes`,
            it: `PDF Elenchi`,
        },
        text: {
            de: `
Eine weitere Kernfunktion jeder guten Sammlungsverwaltung sind PDF-Listenexporte. Arsenal bietet zwei universelle PDF-Listen:
- __Vollständige Waffenliste als Tabelle__
    Diese erstellt eine Tabelle mit allen deinen Waffen und folgenden Informationen:
    - Hersteller
    - Modellname
    - Kaliber
    - Seriennummer
    - Bewilligungsreferenz
    - Erwerbsdatum

    Dies ist eine schnelle und einfache Möglichkeit, eine vollständige Liste deiner Waffen bereitzustellen - sei es für Versicherungszwecke, auf Anfrage einer Behörde oder für was auch immer du sie benötigst.

- __Benutzerdefinierte Liste__
    Damit kannst du eine PDF-Liste jeder gewünschten Sammlung mit beliebigen Informationen erstellen.
    Du brauchst eine Liste aller deiner Waffen für die Versicherung und möchtest den Wert, aber nicht die Seriennummer anzeigen? Kein Problem!
    Du möchtest eine physische Liste deiner Munitionssammlung nur mit Bezeichnung und Kaliber? Kein Problem!

Je nach ausgewähltem Wohnsitzland werden zusätzliche vordefinierte Listen angeboten. Aktuell sind dies:
- Schweiz
    - __Waffenliste gemäss WA Art. 5 als Tabelle__
        Diese erstellt eine Tabelle mit allen deinen Waffen, die unter Artikel 5 fallen, mit folgenden Informationen:
        - Hersteller
        - Modellname
        - Kaliber
        - Seriennummer
        - Bewilligungsreferenz
        - Erwerbsdatum
        - Grund, weshalb sie unter Artikel 5 fallen
    
        Diese Liste ist sehr nützlich, wenn du eine Sammlerbewilligung beantragst oder wenn dein kantonales Waffenbüro einen Auszug deiner verbotenen Gegenstände verlangt.

    - __Vollständige Waffenliste als Tabelle mit WA-Art.-5-Eigenschaften__
        Diese erstellt eine Tabelle mit allen deinen Waffen inklusive der Information, ob sie unter Artikel 5 fallen und weshalb. Sie ist eine Kombination aus der vollständigen Waffenliste und der Artikel-5-Liste.

        Diese Liste existiert, weil sie von einigen Benutzern gewünscht wurde: Manche Waffenbüros möchten eine vollständige Liste deiner Sammlung und nicht nur der Waffen, die unter Artikel 5 fallen.

Zusätzlich kann jeder Sammlungseintrag als "Galerieausdruck" gedruckt werden. Dieser zeigt jedes Bild, alle Tags und sämtliche Attribute.
Dies ist nützlich, wenn du eine physische Darstellung zur Präsentation möchtest oder wenn du etwas verkaufen möchtest und dafür einen Flyer für das Anschlagbrett deines Vereins benötigst.
            `,
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

Also, each collection item can be printed as a "gallery print", which displays every image, any tags, and all attributes. 
This is useful if you want to have a physical representation for display purposes or if you want to sell something and need a flyer for your clubs blackboard.
`,
            fr: `
Une autre fonctionnalité essentielle de toute bonne application de gestion de collection est l'exportation de listes PDF. Arsenal propose deux listes PDF universelles:
- __Liste complète des armes sous forme de tableau__
    Cette option génère un tableau contenant toutes tes armes avec les informations suivantes :
        - Fabricant
        - Nom du modèle
        - Calibre
        - Numéro de série
        - Référence du permis
        - Date d'acquisition

    C'est un moyen simple et rapide de fournir une liste complète de tes armes, que ce soit pour une assurance, sur demande d'une autorité ou pour tout autre besoin.

- __Liste personnalisée__
    Cette option te permet d'imprimer une liste PDF de la collection de ton choix avec les informations que tu souhaites.
    Besoin d'une liste de toutes tes armes pour ton assurance et tu veux inclure la valeur, mais pas le numéro de série? Aucun problème!
    Tu souhaites une liste papier de ta collection de munitions avec uniquement la désignation et le calibre? La voici!

Selon le pays de résidence sélectionné, des listes prédéfinies supplémentaires sont proposées. Actuellement, celles-ci sont :
- Suisse
    - __Liste des armes selon l'art. 5 de la LArm sous forme de tableau__
    Cette option génère un tableau contenant toutes tes armes soumises à l'article 5 avec les informations suivantes :
        - Fabricant
        - Nom du modèle
        - Calibre
        - Numéro de série
        - Référence du permis
        - Date d'acquisition
        - Raison pour laquelle elle est soumise à l'article 5
    
        Cette liste est très utile si tu demandes une autorisation de collectionneur ou si ton bureau des armes local demande un extrait de tes objets interdits.
  
    - __Liste complète des armes sous forme de tableau avec les informations de l'art. 5 LArm__
        Cette option génère un tableau contenant toutes tes armes, en indiquant si elles sont soumises ou non à l'article 5 et pour quelle raison. C'est un mélange entre la liste complète des armes et la liste article 5.

        Cette liste existe car certains utilisateurs l'ont demandée : certains bureaux des armes souhaitent recevoir une liste complète de ta collection, et pas uniquement des armes soumises à l'article 5.

De plus, chaque élément de collection peut être imprimé sous forme de "fiche galerie", qui affiche toutes les images, les tags et toutes les informations associées.
C'est utile si tu souhaites avoir une représentation physique pour l'affichage ou si tu veux vendre un objet et créer un flyer pour le tableau d'affichage de ton club.
            `,
            it: `
Un'altra funzionalità fondamentale di ogni buona applicazione per la gestione di collezioni sono le esportazioni di liste in PDF. Arsenal offre due liste PDF universali:

- __Lista completa delle armi in formato tabella__
    Questa opzione genera una tabella con tutte le tue armi e le seguenti informazioni:
        - Produttore
        - Nome modello
        - Calibro
        - Numero di serie
        - Riferimento del permesso
        - Data di acquisizione
        
    È un modo semplice e veloce per fornire un elenco completo delle tue armi, ad esempio per motivi assicurativi, su richiesta delle autorità o per qualsiasi altra necessità.

- __Lista personalizzata__
    Questa opzione ti permette di stampare una lista PDF di qualsiasi collezione desideri con qualsiasi informazione tu scelga.
    Ti serve una lista di tutte le tue armi per l'assicurazione e vuoi includere il valore, ma non il numero di serie? Nessun problema!
    Vuoi una lista cartacea della tua collezione di munizioni con solo la designazione e il calibro? Eccola!

In base al paese di residenza selezionato vengono offerte ulteriori liste predefinite. Attualmente sono disponibili:

- Svizzera
    - __Lista delle armi secondo l'art. 5 LArm in formato tabella__
    Questa opzione genera una tabella con tutte le tue armi soggette all'articolo 5 con le seguenti informazioni:
        - Produttore
        - Nome modello
        - Calibro
        - Numero di serie
        - Riferimento del permesso
        - Data di acquisizione
        - Motivo per cui rientra nell'articolo 5
    
        Questa lista è molto utile se richiedi un permesso per collezionisti o se il tuo ufficio armi locale richiede un estratto dei tuoi oggetti vietati.
  
    - __Lista completa delle armi in formato tabella con informazioni sull'art. 5 LArm__
        Questa opzione genera una tabella con tutte le tue armi, indicando se rientrano o meno nell'articolo 5 e il motivo. È una combinazione tra la lista completa delle armi e la lista articolo 5.

        Questa lista esiste perché è stata richiesta da alcuni utenti: alcuni uffici armi richiedono un elenco completo della collezione, non solo delle armi soggette all'articolo 5.

Inoltre, ogni elemento della collezione può essere stampato come "scheda galleria", che mostra tutte le immagini, i tag e tutti gli attributi.
È utile se vuoi avere una rappresentazione fisica da esporre oppure se vuoi vendere qualcosa e hai bisogno di un volantino per la bacheca del tuo club.

            `,
        },
    icon: "pdf"
    },{
        title: {
            de: `Anpassbare Einheiten`,
            en: `Customizable Units`,
            fr: `Unités personnalisables`,
            it: `Unità personalizzabili`,
        },
        text: {
            de: `
Je nachdem, wo du auf diesem Planeten lebst, bist du an bestimmte Masseinheiten gewöhnt. Manchmal möchtest oder musst du jedoch andere Einheiten verwenden. Arsenal lässt dir die Freiheit zu entscheiden, welche Längen- oder Gewichtseinheit du für welchen Zweck anzeigen möchtest.

Alles metrisch ausser Pulver? Kein Problem.
Geschossgewicht in Unzen? Eine ungewöhnliche Wahl, aber du entscheidest.

Um zukünftige zusätzliche Einheiten-Attribute zu ermöglichen, steht auch eine allgemeine Gewichts- und Längeneinheit zur Verfügung.

Du kannst diese Werte jederzeit ändern. Die Datenbank speichert jeden Wert strikt in Milligramm beziehungsweise Millimeter und rechnet ihn in deine gewünschte Anzeigeeinheit um.

Bei Pulver wird empfohlen, die Gewichtseinheit auf die üblichen kommerziellen Einheiten einzustellen - Kilogramm oder Gramm in metrischen Ländern, Pfund oder Unzen in Ländern mit imperialem System.
Bei jeder Bestandserhöhung oder -verringerung kannst du die gewünschte Einheit erneut auswählen. So kannst du beispielsweise Pulver in Kilogramm einlagern, aber eine Verringerung in Grain erfassen, wenn du Pulver zum Wiederladen verwendet hast.

Bei Währungen kannst du jede beliebige Weltwährung einstellen.
Dies ist jedoch lediglich eine optische Einstellung, da die Datenbank nur den Zahlenwert speichert und keine Verbindung zu Währungsumrechnungen oder Inflationsraten herstellt.
Dies ist auf die konsequent Offline-Verarbeitung der App zurückzuführen.
Die meisten Personen verwenden ohnehin nur eine einzige Währung. Wenn du etwas in einer anderen Währung kaufst, wird empfohlen, den Kaufpreis umgerechnet in deine eigene Währung einzugeben.
Was die Inflation betrifft, ist geplant, jährliche Inflationsraten für jedes Land direkt in die App zu integrieren. Die Einschränkung dabei ist, dass die Daten erst ab 1980 verfügbar sind.
            `,
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
            fr: `
Selon l'endroit où tu vis sur cette planète, tu es habitué à certaines unités de mesure. Cependant, il arrive que tu veuilles ou doives utiliser d'autres unités. Arsenal te laisse la liberté de choisir quelle unité de longueur ou de poids afficher pour chaque utilisation.

Tout en métrique sauf pour la poudre? Aucun problème.
Le poids des balles en onces? Un choix étrange, mais c'est toi qui décides.

Afin de pouvoir intégrer de futures unités supplémentaires, une unité générale de poids et de longueur est également disponible.

Tu peux modifier ces valeurs à tout moment. La base de données enregistre strictement toutes les valeurs en milligrammes et en millimètres, puis les convertit dans l'unité d'affichage de ton choix.

Pour la poudre, il est recommandé de définir l'unité de poids sur les unités commerciales couramment utilisées : kilogrammes ou grammes dans les pays utilisant le système métrique, livres ou onces dans les pays utilisant le système impérial.
Pour chaque augmentation ou diminution de stock, tu peux à nouveau sélectionner l'unité souhaitée. Cela permet par exemple d'ajouter du stock en kilogrammes, mais de diminuer le stock en grains après avoir utilisé de la poudre pour le rechargement.

Concernant les devises, tu peux choisir n'importe quelle monnaie du monde.
Cependant, il s'agit uniquement d'un choix visuel, car la base de données enregistre uniquement la valeur numérique et n'effectue aucune conversion de devise ni aucun calcul lié à l'inflation.
Cela est dû au fonctionnement strictement hors ligne de l'application.
La plupart des personnes n'utilisent qu'une seule devise. Si tu achètes quelque chose dans une autre devise, il est recommandé d'entrer le prix d'achat converti dans ta propre devise.
Concernant l'inflation, il est prévu d'intégrer directement dans l'application les taux d'inflation annuels pour chaque pays, avec la limitation que les données ne commencent qu'en 1980.
            `,
            it: `
A seconda di dove vivi su questo pianeta, sei abituato a determinate unità di misura. Tuttavia, a volte vuoi o devi utilizzare altre unità. Arsenal ti lascia la libertà di decidere quale unità di lunghezza o peso visualizzare per ogni scopo.

Tutto in metrico tranne la polvere? Nessun problema.
Peso delle palle in once? Una scelta particolare, ma sei tu a decidere.

Per permettere l'aggiunta futura di ulteriori attributi con unità diverse, è disponibile anche un'unità generale per peso e lunghezza.

Puoi modificare questi valori in qualsiasi momento. Il database salva rigorosamente ogni valore rispettivamente in milligrammi e millimetri e lo converte nell'unità di visualizzazione desiderata.

Per la polvere, è consigliato impostare l'unità di peso sulle unità commerciali comunemente utilizzate: chilogrammi o grammi nei paesi con sistema metrico, libbre o once nei paesi con sistema imperiale.
Per ogni aumento o diminuzione della scorta puoi selezionare nuovamente l'unità preferita. Questo permette, ad esempio, di aggiungere polvere in chilogrammi ma di registrare una diminuzione in grani quando hai utilizzato della polvere per il ricaricamento.

Per quanto riguarda le valute, puoi impostare qualsiasi valuta mondiale.
Tuttavia, si tratta solamente di una scelta estetica, poiché il database salva esclusivamente il valore numerico e non lo collega ad alcuna conversione valutaria o percentuale di inflazione.
Questo è dovuto alla gestione rigorosamente offline dell'app.
La maggior parte delle persone utilizza comunque una sola valuta. Se acquisti qualcosa in un'altra valuta, è consigliato inserire il prezzo d'acquisto convertito nella tua valuta.
Per quanto riguarda l'inflazione, è prevista l'integrazione diretta nell'app delle percentuali annuali di inflazione per ogni paese, con la limitazione che i dati iniziano solamente dal 1980.
            `,
        },
    icon: "units"
    },
    {
        title: {
            de: `Artikelverlauf`,
            en: `Item History`,
            fr: `Historique de l’article`,
            it: `Cronologia articolo`,
        },
        text: {
            de: `
Jede Änderung, jede Bearbeitung, die du an einem Sammlungseintrag vornimmst, wird protokolliert. So hast du jederzeit eine vollständige und transparente Historie deines Eintrags.
Jeder Verlaufseintrag zeigt genau an, wann eine Änderung vorgenommen wurde, was geändert wurde, welchen alten Wert es gab und welcher neue Wert eingetragen wurde.

Dies ist nicht nur nützlich, um die gesamte Geschichte eines Eintrags nachzuverfolgen, sondern dient auch als Wiederherstellungspunkt, falls du versehentlich einen falschen Wert eingibst und dich nicht mehr an den ursprünglichen Wert erinnerst.

            `,
            en: `
Every change, every edit you make for a collection item is logged, so you always have a complete and transparent history for your item.
Each log entry displays exactly when a change was made, what changed, what the old value was and what the new value is.

Not only is this useful to trace the entire history of an item, it also acts as a save point when you accidentally enter a wrong value and dont remember the original value.
`,
            fr: `
Chaque modification, chaque édition que tu effectues sur un élément de collection est enregistrée. Tu disposes ainsi toujours d'un historique complet et transparent de ton élément.
Chaque entrée de l'historique indique précisément quand une modification a été effectuée, ce qui a changé, quelle était l'ancienne valeur et quelle est la nouvelle valeur.

Cela est non seulement utile pour retracer l'ensemble de l'historique d'un élément, mais sert également de point de sauvegarde si tu saisis accidentellement une mauvaise valeur et que tu ne te souviens plus de la valeur d'origine.
            `,
            it: `
Ogni modifica, ogni cambiamento effettuato su un elemento della collezione viene registrato, così hai sempre a disposizione una cronologia completa e trasparente del tuo elemento.
Ogni voce della cronologia mostra esattamente quando è stata effettuata una modifica, cosa è cambiato, quale fosse il valore precedente e quale sia il nuovo valore.

Non è solo utile per ricostruire l'intera storia di un elemento, ma funge anche da punto di ripristino nel caso in cui inserisci accidentalmente un valore errato e non ricordi più quello originale.

            `,
        },
    icon: "history"
    },
    {
        title: {
            de: `Kostenhistorie`,
            en: `Cost History`,
            fr: `Historique des coûts`,
            it: `Cronologia dei costi`,
        },
        text: {
            de: `
Verbrauchsmaterialien (Munition, Geschosse, Hülsen, Zündhütchen, Pulver) verfügen ebenfalls über eine Kostenhistorie, damit du jederzeit genau siehst, wann du was für welchen Eintrag ausgegeben hast.

Sie zeigt das Kaufdatum, die Gesamtmenge, den insgesamt bezahlten Preis sowie einen Durchschnittspreis an.
So kannst du deine Ausgaben und mögliche Preisentwicklungen verfolgen.
            `,
            en: `
Consumables (Ammunition, Bullets, Cases, Primers, Powder) also feature a Cost History so you see exactly when you spent what on which item.

It displays the purchase date, the total amount, the total price paid and an average price. 
That way you can monitor your spending and any price trends.
`,
            fr: `
Les consommables (munitions, balles, douilles, amorces, poudre) disposent également d'un historique des coûts, afin que tu voies exactement quand tu as dépensé quoi et pour quel élément.

Il affiche la date d'achat, la quantité totale, le prix total payé ainsi qu'un prix moyen.
De cette manière, tu peux suivre tes dépenses et l'évolution des prix au fil du temps.
`,
            it: `
Anche i materiali di consumo (munizioni, palle, bossoli, inneschi, polvere) dispongono di una cronologia dei costi, così puoi vedere esattamente quando hai speso cosa e per quale elemento.

Vengono visualizzati la data di acquisto, la quantità totale, il prezzo totale pagato e un prezzo medio.
In questo modo puoi monitorare le tue spese e l'andamento dei prezzi nel tempo.
            `,
        },
    icon: "costHistory"
    },
    {
        title: {
            de: `Als verkauft markieren`,
            en: `Mark as Sold`,
            fr: `Marquer comme vendu`,
            it: `Segna come venduto`,
        },
        text: {
            de: `
Es ist ungewöhnlich, aber es kann vorkommen, dass etwas aus deiner Sammlung an jemand anderen verkauft wird.
Arsenal bietet (widerwillig) eine Funktion an, um einen Eintrag als verkauft zu markieren, behält ihn aber weiterhin in deiner Datenbank. Du kannst wählen, ob er weiterhin in deiner Sammlung angezeigt werden soll (ausgegraut) oder ob er vollständig ausgeblendet werden soll.

Beim "Verkauf" eines Objekts kannst du die Details der Transaktion eingeben, wie zum Beispiel den Namen des Käufers, das Verkaufsdatum, den Verkaufspreis, allfällige Bewilligungsreferenzen und persönliche Notizen.
Diese Details können später nicht mehr geändert werden. Stelle daher sicher, dass sie korrekt sind. Sie werden oberhalb aller anderen Attribute angezeigt, wenn du einen verkauften Eintrag in deiner Sammlung ansiehst.
            `,
            en: `
Its unheard of, but it can happen that something of your collection got sold to someone else. 
Arsenal (reluctantly) offers a functionality to mark an item as sold, but keeps it in your database. You can choose if you want to have it still displayed in our collection (greyed out) or have it hidden completely. 

When "selling" something, you can enter the details of the transaction, such as buyer name, sell date, sell price, any permit references and personal notes.
These details cannot be amended later, so make sure they are correct. They will be displayed on top of all other attributes when you view a sold item in your collection.
`,
            fr: `
C'est quelque chose d'inhabituel, mais il peut arriver qu'un objet de ta collection soit vendu à quelqu'un d'autre.
Arsenal propose (à contrecœur) une fonctionnalité permettant de marquer un élément comme vendu, tout en le conservant dans ta base de données. Tu peux choisir si tu souhaites encore l'afficher dans ta collection (grisé) ou le masquer complètement.

Lors de la "vente" d'un objet, tu peux saisir les détails de la transaction, comme le nom de l'acheteur, la date de vente, le prix de vente, les références des permis ainsi que des notes personnelles.
Ces informations ne peuvent plus être modifiées par la suite, assure-toi donc qu'elles sont correctes. Elles seront affichées au-dessus de tous les autres attributs lorsque tu consulteras un élément vendu dans ta collection.
`,
            it: `
È qualcosa di raro, ma può capitare che un oggetto della tua collezione venga venduto a qualcun altro.
Arsenal offre (a malincuore) una funzionalità per contrassegnare un elemento come venduto, mantenendolo comunque nel tuo database. Puoi scegliere se vuoi continuare a visualizzarlo nella tua collezione (in grigio) oppure nasconderlo completamente.

Quando "vendi" un oggetto, puoi inserire i dettagli della transazione, come il nome dell'acquirente, la data di vendita, il prezzo di vendita, eventuali riferimenti ai permessi e note personali.
Questi dettagli non possono essere modificati in seguito, quindi assicurati che siano corretti. Verranno visualizzati sopra tutti gli altri attributi quando visualizzi un elemento venduto nella tua collezione.

            `,
        },
    icon: "sold"
    },
    {
        title: {
            de: `Schlagworte`,
            en: `Tags`,
            fr: `Les tags`,
            it: `I tag`,
        },
        text: {
            de: `
Schlagworte sind eine praktische Möglichkeit, Einträge in einer Sammlung zu gruppieren.

Wenn du zum Beispiel deine Büchersammlung nach dem Thema "Schweizer Militärwaffen" filtern möchtest, versehe die entsprechenden Sammlungseinträge einfach mit einem Schlagwort und wende den Sammlungsfilter an.
Sie sind auch nützlich, um deine Waffen nach Typ zu gruppieren. Jeder hat seine eigenen Vorlieben:
Der eine möchte nur eine allgemeine Unterscheidung zwischen Gewehren, Pistolen und Revolvern. Der andere möchte tiefer unterscheiden - Vorderladerrevolver, Perkussionsrevolver, Magnum-Revolver usw.
Mit Schlagworten kannst du dein eigenes System zur Waffenklassifizierung festlegen.

Du kannst beliebige Schlagworte verwenden. Du musst sie auch nicht hundertmal neu eingeben: Arsenal bietet eine praktische Verwaltung für Schlagworte und behält den Überblick über bereits vorhandene Schlagworte.
            `,
            en: `
Tags are a convenient way to group items in a collection. 

If for example you want to filter your book collection for the topic "Swiss Military Weapons", simply tag the corresponding collection items and apply the collection filter. 
Its also useful to group your weapons by type. Everyone has their own preferences: 
One just wants a general distiction between rifles, Pistols and Revolvers. Another wants to distinguish deeper - Toploading revolvers, Cap & Ball Revolvers, Magnum Revolvers, etc...
With tags, you can decide on your own framework of weapon classifications.

You can use any tags you like. You also do not need to write them a hundred times over; Arsenal offers a convenient dialog to manage the tags and it keeps track of existing ones.
`,
            fr: `
Les tags sont un moyen pratique de regrouper les éléments d'une collection.

Si, par exemple, tu souhaites filtrer ta collection de livres sur le thème "Armes militaires suisses", il te suffit d'ajouter un tag aux éléments correspondants et d'appliquer le filtre de collection.
C'est également utile pour classer tes armes par type. Chacun a ses propres préférences :
Certains veulent simplement une distinction générale entre fusils, pistolets et revolvers. D'autres souhaitent aller plus loin : revolvers à chargement par la bouche, revolvers à poudre noire, revolvers Magnum, etc.
Avec les tags, tu peux définir toi-même ton propre système de classification des armes.

Tu peux utiliser les tags que tu souhaites. Tu n'as pas non plus besoin de les saisir une centaine de fois : Arsenal propose une fenêtre pratique pour gérer les tags et garde une liste des tags existants.
            `,
            it: `
I tag sono un modo pratico per raggruppare gli elementi di una collezione.

Se, ad esempio, vuoi filtrare la tua collezione di libri per il tema "Armi militari svizzere", ti basta aggiungere un tag agli elementi corrispondenti e applicare il filtro della collezione.
Sono anche utili per raggruppare le tue armi per tipologia. Ognuno ha le proprie preferenze:
Qualcuno vuole solo una distinzione generale tra fucili, pistole e revolver. Altri vogliono una classificazione più dettagliata: revolver a caricamento anteriore, revolver ad avancarica, revolver Magnum, ecc.
Con i tag puoi decidere autonomamente il tuo sistema di classificazione delle armi.

Puoi usare qualsiasi tag desideri. Inoltre non devi scriverli cento volte: Arsenal offre una comoda finestra per gestire i tag e tiene traccia di quelli già esistenti.
            `,
        },
    icon: "tags"
    },
]