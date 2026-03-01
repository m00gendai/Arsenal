import { SimpleTranslation } from "./interfaces_text"

type ScreenTitle = {name:string} & SimpleTranslation

export const screenTitles:ScreenTitle[] = [
    {
        name: "selectLabelFormat",
        de: "Etikettenformat wählen",
        en: "Select Label Format",
        fr: "Choisir le format d’étiquette",
        it: "Selezionare il formato dell’etichetta",
        ch: "Tscherner il format da l’etichetta"
    },
    {
        name: "selectItems",
        de: "Einträge wählen",
        en: "Select Items",
        fr: "Choisir les éléments",
        it: "Selezionare gli elementi",
        ch: "Tscherner ils elements"
    },
    {
        name: "selectFields",
        de: "Eigenschaften wählen",
        en: "Select Fields",
        fr: "Choisir les champs",
        it: "Selezionare i campi",
        ch: "Tscherner ils champs"
    },
    {
        name: "previewLabel",
        de: "Etikettenvorschau",
        en: "Label Preview",
        fr: "Aperçu de l’étiquette",
        it: "Anteprima dell’etichetta",
        ch: "Previsualisaziun da l’etichetta"
    },
]

export const generateQRcodeText = {
    selectAll: {
        de: "Alle auswählen",
        en: "Select All",
        fr: "Tout sélectionner",
        it: "Selezionare tutto",
        ch: "Selecziunar tut"
    },
    previewNotice: {
        de: "Diese Vorschau ist nur für Anschauungszwecke. Das tatsächliche Etikett kann leicht anders aussehen, besonders die Schriftgrösse.",
        en: "This Preview is only for illustrative purposes. Actual label may look slightly different, especially font size.",
        fr: "Cet aperçu est fourni à titre indicatif uniquement. L’étiquette réelle peut légèrement différer, notamment la taille de la police.",
        it: "Questa anteprima è solo a scopo illustrativo. L’etichetta effettiva potrebbe avere un aspetto leggermente diverso, soprattutto per quanto riguarda la dimensione del carattere.",
        ch: "Questa previsualisaziun è mo per intents illustrativs. L’etichetta reala po variar levamain, spezialmain la grondezza dal scrit."
    },
    withQRcode: {
        de: "QR Code anzeigen",
        en: "Show QR Code",
        fr: "Afficher le code QR",
        it: "Mostrare il codice QR",
        ch: "Mussar il code QR"
    },
    withText: {
        de: "Text anzeigen",
        en: "Show Text",
        fr: "Afficher le texte",
        it: "Mostrare testo",
        ch: "Mussar il text"
    },  
    fontSize: {
        de: "Schriftgrösse ändern (falls nötig)",
        en: "Change Font Size (if necessary)",
        fr: "Modifier la taille de la police (si nécessaire)",
        it: "Modificare la dimensione del font (se necessario)",
        ch: "Midar la grondezza dal scrit (sche necessari)"
    },
    customLabel: {
        de: "Eigene Etiketten",
        en: "Custom Labels",
        fr: "Étiquettes personnalisées",
        it: "Etichette personalizzate",
        ch: "Etichettas persunalisadas"
    },
    createCustomLabel: {
        de: "Eigene Etikette erstellen",
        en: "Create Custom Label",
        fr: "Créer une étiquette personnalisée",
        it: "Creare etichetta personalizzata",
        ch: "Crear in’atgna etichetta"
    }
}

export const createQRcodeDialogText = {
    title: {
        de: "Eigenes Etikett erstellen",
        en: "Create Custom Label",
        fr: "Créer une étiquette personnalisée",
        it: "Creare etichetta personalizzata",
        ch: "Crear in’atgna etichetta"
    },
    subtitle: {
        de: "Hiermit kann ein eigenes (oder in der App fehlendes) Etikettformat erstellt werden. Die Eingaben können in Millimeter oder Inch gemacht werden. Zu jeder verlangten Nummernangabe gibt es eine separate Hilfestellung.",
        en: "With this dialog you can create custom labels (or ones missing in the app). Entries can be made in either millimeters or inches. There is a separate helper dialog for each numeric entry field.",
        fr: "Cette boîte de dialogue permet de créer des étiquettes personnalisées (ou absentes de l’application). Les valeurs peuvent être saisies en millimètres ou en pouces. Une aide est disponible pour chaque champ numérique.",
        it: "Con questo dialogo è possibile creare etichette personalizzate (o etichette mancanti nell’applicazione). È possibile inserire i valori in millimetri o in pollici. Per ogni campo numerico è disponibile un dialogo di aiuto separato.",
        ch: "Cun quest dialog pon vegnir creadas etichettas persunalisadas (u mancantas en l’app). Las valurs pon vegnir inditgadas en millimeters u inches. Per mintga champ numeric exista in agid separà."
    },
    name: {
        de: "Bezeichnung",
        en: "Designation",
        fr: "Désignation",
        it: "Designazione",
        ch: "Designaziun"
    },
    pageFormat: {
        de: "Seitenformat",
        en: "Page format",
        fr: "Format de page",
        it: "Formato della pagina",
        ch: "Format da pagina"
    },
    pageFormat_none: {
        de: "Kein spezifisches Format",
        en: "No specific format",
        fr: "Aucun format spécifique",
        it: "Nessun formato specifico",
        ch: "Nagins format specifics"
    },
    unit: {
        de: "Einheit",
        en: "Unit",
        fr: "Unité",
        it: "Unità",
        ch: "Unitad"
    },
    pageHeight: {
        de: "Seitenlänge",
        en: "Page height",
        fr: "Hauteur de page",
        it: "Altezza della pagina",
        ch: "Autezza da la pagina"
    },
    pageWidth: {
        de: "Seitenbreite",
        en: "Page width",
        fr: "Largeur de page",
        it: "Larghezza della pagina",
        ch: "Larghezza da la pagina"
    },
    marginTop: {
        de: "Oberer Abstand",
        en: "Margin top",
        fr: "Marge supérieure",
        it: "Margine superiore",
        ch: "Distanza sura"
    },
    marginLeft: {
        de: "Seitlicher Abstand (von links)",
        en: "Margin left",
        fr: "Marge gauche",
        it: "Margine sinistro",
        ch: "Distanza a sanestra"
    },
    labelWidth: {
        de: "Breite Etikette",
        en: "Label width",
        fr: "Largeur de l’étiquette",
        it: "Larghezza etichetta",
        ch: "Larghezza da l’etichetta"
    },
    labelHeight: {
        de: "Höhe Etikette",
        en: "Label height",
        fr: "Hauteur de l’étiquette",
        it: "Altezza etichetta",
        ch: "Autezza da l’etichetta"
    },
    horizontalPitch: {
        de: "Horizontaler Abstand (Teilungsabstand)",
        en: "Horizontal pitch (separation gap)",
        fr: "Pas horizontal (espacement)",
        it: "Passo orizzontale (spaziatura)",
        ch: "Distanza orizontala (spazi)"
    },
    verticalPitch: {
        de: "Vertikaler Abstand (Teilungsabstand)",
        en: "Vertical pitch (separation gap)",
        fr: "Pas vertical (espacement)",
        it: "Passo verticale (spaziatura)",
        ch: "Distanza verticala (spazi)"
    },
    columns: {
        de: "Spalten",
        en: "Columns",
        fr: "Colonnes",
        it: "Colonne",
        ch: "Colonnas"
    },
    rows: {
        de: "Zeilen",
        en: "Rows",
        fr: "Lignes",
        it: "Righe",
        ch: "Lingias"
    },
    radius: {
        de: "Radius",
        en: "Radius",
        fr: "Rayon",
        it: "Raggio",
        ch: "Radius"
    }
}