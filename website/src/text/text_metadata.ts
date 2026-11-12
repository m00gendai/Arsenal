import type { SimpleTranslation } from "../types/types_global";
import type { Language } from "../types/types_global";

export type MetaPage = "home" | "details" | "faq" | "privacy" | "imprint"

export const metadata_slugs: Record<MetaPage, Record<Language, string>> = {
    home:    { de: "",            en: "",        fr: "",        it: ""         },
    details: { de: "details",     en: "details", fr: "details", it: "details"  },
    faq:     { de: "faq",         en: "faq",     fr: "faq",     it: "faq"      },
    privacy: { de: "datenschutz", en: "privacy", fr: "nldp",    it: "privacy"  },
    imprint: { de: "impressum",   en: "imprint", fr: "legales", it: "impronta" },
}

export const metadata_pages: Record<MetaPage, { title: SimpleTranslation; description: SimpleTranslation }> = {
    home: {
        title: {
            de: `Arsenal - Die Schweizer App für Waffensammler`,
            en: `Arsenal - The Swiss App for Gun Collectors`,
            fr: `Arsenal - L’application suisse pour les collectionneurs d’armes`,
            it: `Arsenal - L’app svizzera per i collezionisti di armi`
        },
        description: {
            de: `Verwalten Sie Ihre Waffensammlung, den Munitionsbestand, Ihr Zubehör, Waffenbestandteile und Fachliteratur mit dieser bequemen App!`,
            en: `Manage your gun collection, ammo stock, accessories, gun parts and literature with this convenient app!`,
            fr: `Gérez vos armes, munitions, accessoires, pièces d’armes et votre littérature sur les armes avec cette application pratique!`,
            it: `Gestisci la tua collezione di armi, le munizioni, gli accessori, le parti d’arma e la letteratura con questa comoda app!`
        }
    },
    details: {
        title: {
            de: `Funktionen & Kaliber - Arsenal Waffen & Sammlung`,
            en: `Features & Supported Calibers - Arsenal Gun Collection App`,
            fr: `Fonctions et calibres - Arsenal Collection d’Armes`,
            it: `Funzioni e calibri - Arsenal Collezione d’Armi`
        },
        description: {
            de: `Alle Sammlungstypen, QuickShot, QuickStock, QuickMount, QR-Etiketten, PDF-Listen, Import/Export und die vollständige Liste der unterstützten Kaliber.`,
            en: `All collection types, QuickShot, QuickStock, QuickMount, QR labels, PDF lists, import/export and the full list of supported calibers.`,
            fr: `Tous les types de collections, QuickShot, QuickStock, QuickMount, étiquettes QR, listes PDF, import/export et la liste complète des calibres pris en charge.`,
            it: `Tutti i tipi di collezione, QuickShot, QuickStock, QuickMount, etichette QR, elenchi PDF, import/export e l’elenco completo dei calibri supportati.`
        }
    },
    faq: {
        title: {
            de: `FAQ: Datenschutz, Preis & Plattformen - Arsenal Waffen & Sammlung`,
            en: `FAQ: Privacy, Pricing & Platforms - Arsenal Gun Collection App`,
            fr: `FAQ : confidentialité, prix et plateformes - Arsenal Collection d’Armes`,
            it: `FAQ: privacy, prezzo e piattaforme - Arsenal Collezione d’Armi`
        },
        description: {
            de: `Antworten zu Datenschutz und Verschlüsselung, Offline-Nutzung, Backup und Gerätewechsel, Preis, Plattformen, CSV-Import und KI-Einsatz.`,
            en: `Answers on privacy and encryption, offline use, backup and device transfer, pricing, platforms, CSV import and AI usage.`,
            fr: `Réponses sur la confidentialité et le chiffrement, l’usage hors ligne, la sauvegarde et le changement d’appareil, le prix, les plateformes, l’import CSV et l’IA.`,
            it: `Risposte su privacy e crittografia, uso offline, backup e cambio dispositivo, prezzo, piattaforme, importazione CSV e uso dell’IA.`
        }
    },
        privacy: {
        title: {
            de: `Datenschutz - Arsenal Waffen & Sammlung`,
            en: `Privacy Policy - Arsenal Gun Collection App`,
            fr: `Politique de confidentialité - Arsenal Collection d’Armes`,
            it: `Informativa sulla privacy - Arsenal Collezione d’Armi`
        },
        description: {
            de: `Datenschutzerklärung der App Arsenal Waffen & Sammlung.`,
            en: `Privacy policy of the Arsenal Gun Collection app.`,
            fr: `Politique de confidentialité de l’application Arsenal Collection d’Armes.`,
            it: `Informativa sulla privacy dell’app Arsenal Collezione d’Armi.`
        }
    },
    imprint: {
        title: {
            de: `Impressum - Arsenal Waffen & Sammlung`,
            en: `Imprint - Arsenal Gun Collection App`,
            fr: `Mentions légales - Arsenal Collection d’Armes`,
            it: `Impressum - Arsenal Collezione d’Armi`
        },
        description: {
            de: `Impressum und Kontaktangaben zur App Arsenal Waffen & Sammlung.`,
            en: `Imprint and contact details for the Arsenal Gun Collection app.`,
            fr: `Mentions légales et coordonnées de l’application Arsenal Collection d’Armes.`,
            it: `Impressum e dati di contatto dell’app Arsenal Collezione d’Armi.`
        }
    }
}

// Backwards-compatible aliases for existing imports (home page values)
export const metadata_title: SimpleTranslation = metadata_pages.home.title
export const metadata_description: SimpleTranslation = metadata_pages.home.description

export const metadata_appName: SimpleTranslation = {
    de: `Arsenal Waffen & Sammlung`,
    en: `Arsenal Gun Collection`,
    fr: `Arsenal Collection d’Armes`,
    it: `Arsenal Collezione d’Armi`
}

export const metadata_featureImageAlt: SimpleTranslation = {
    de: `Vorstellungsbild von einigen Screenshots der App in Aktion`,
    en: `Feature Image of some Screenshots of the App in action`,
    fr: `Image principale de quelques captures d’écran de l’application en action`,
    it: `Immagine principale di alcuni screenshot dell’app in azione`
}