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

export interface customLabelNumberFields{
    pageHeight: SimpleTranslation
    pageWidth: SimpleTranslation
    marginTop: SimpleTranslation
    marginLeft: SimpleTranslation
    labelWidth: SimpleTranslation
    labelHeight: SimpleTranslation
    horizontalPitch: SimpleTranslation
    verticalPitch: SimpleTranslation
    columns: SimpleTranslation
    rows: SimpleTranslation
    radius: SimpleTranslation
}

export const helperText: customLabelNumberFields = {
    pageHeight: {
        de: "Gelb: Die Höhe der Seite, auf welcher die Etiketten sind",
        en: "Yellow: The height of the page that contains the labels",
        fr: "Jaune: La hauteur de la page contenant les étiquettes",
        it: "Giallo: L’altezza della pagina che contiene le etichette",
        ch: "Mellen: L’autezza da la pagina che cuntegna las etichettas"
    },
    pageWidth: {
        de: "Gelb: Die Breite der Seite, auf welcher die Etiketten sind",
        en: "Yellow: The width of the page that contains the labels",
        fr: "Jaune: La largeur de la page contenant les étiquettes",
        it: "Giallo:La larghezza della pagina che contiene le etichette",
        ch: "Mellen: La vastadad da la pagina che cuntegna las etichettas"
    },
    marginTop: {
        de: "Blau: Der Abstand vom oberen Rand der Seite, auf welcher die Etiketten sind, bis zum oberen Rand der ersten Etikette",
        en: "Blue: The margin from the top of the page that contains the labels until the top of the first label",
        fr: "Bleu: La marge du haut de la page contenant les étiquettes jusqu’au haut de la première étiquette",
        it: "Blu: L’intervallo tra la parte superiore della pagina che contiene le etichette e la parte superiore della prima etichetta",
        ch: "Blau: La distanza da l’ur sura da la pagina che cuntegna las inscripziuns fin a l’ur sura da l’emprima inscripziun"
    },
    marginLeft: {
        de: "Blau: Der Abstand vom linken Rand der Seite, auf welcher die Etiketten sind, bis zum linken Rand der ersten Etikette",
        en: "Blue: The margin from the left of the page that contains the labels until the left side of the first label",
        fr: "Bleu:La marge à partir de la gauche de la page contenant les étiquettes jusqu’à la gauche de la première étiquette",
        it: "Blu: L’intervallo a sinistra della pagina che contiene le etichette fino al lato sinistro della prima etichetta",
        ch: "Blau: La distanza da la vart sanestra che cuntegna las etichettas fin a la vart sanestra da l’emprima etichetta"
    },
    labelWidth: {
        de: "Rot: Die Breite der Etikette",
        en: "Red: The width of the label",
        fr: "Rouge: La largeur de l’étiquette",
        it: "Rosso: La larghezza dell’etichetta",
        ch: "Cotschen: La ladezza da l’etichetta"
    },
    labelHeight: {
        de: "Rot: Die Höhe der Etikette",
        en: "Red: The height of the label",
        fr: "Rouge: La hauteur de l’étiquette",
        it: "Rosso: L’altezza dell’etichetta",
        ch: "Cotschen:L’autezza da l’etichetta"
    },
    horizontalPitch: {
        de: "Orange: Der Abstand vom linken Rand der ersten Etikette in der Reihe bis zum linken Rand der nächsten Etikette in der Reihe. Beispiel: Wenn die Etikettenbreite 4 ist und KEIN horizontaler Abstand zwischen den Etiketten besteht, ist der Wert 4 (4-4 = 0). Wenn der Abstand 0.5 ist, ist der Wert 4.5 (4.5-4 = 0.5).",
        en: "Orange: The space from the left edge of the first label in the row to the left edge of the next label in the row. Example: If the label width is 4 and there is NO horizontal space between labels, the value is 4 (4-4 = 0). If the space is 0.5, the value is 4.5 (4.5-4 = 0.5)",
        fr: "Orange:La distance entre le bord gauche de la première étiquette de la rangée et le bord gauche de la prochaine étiquette de la rangée. Exemple: Si la largeur de l’étiquette est de 4 et qu’il n’y a PAS d’espace horizontal entre les étiquettes, la valeur est de 4 (4-4 = 0). Si l’espace est de 0.5, la valeur est de 4.5 (4.5-4 = 0.5)",
        it: "Arancione: Lo spazio tra il bordo sinistro del primo’etichetta della riga e il bordo sinistro dell’etichetta successiva nella riga. Esempio: se la larghezza dell’etichetta è 4 e NON c’è spazio orizzontale tra le etichette, il valore è 4 (4-4 = 0). Se lo spazio è 0.5, il valore è 4.5 (4.5-4 = 0.5)",
        ch: "Oransch:La distanza da l’ur sanester da l’emprima inscripziun en la lingia fin a l’ur sanester da la proxima inscripziun en la lingia. Exempel: Sche la ladezza da l’inscripziun è 4 e sch’i n’exista nagina distanza orizontala tranter las inscripziuns, importa la valur 4 (4-4 = 0). Sche la distanza munta a 0.5, importa la valur 4.5 (4.5-4 = 0.5)."
    },
    verticalPitch: {
        de: "Orange: Der Abstand vom oberen Rand der ersten Etikette in der Spalte bis zum oberen Rand der nächsten Etikette in der Spalte. Beispiel: Wenn die Etikettenhöhe 2 ist und KEIN vertikaler Abstand zwischen den Etiketten besteht, ist der Wert 2 (2-2 = 0). Wenn der Abstand 0.5 ist, ist der Wert 2.5 (2.5-2 = 0.5).",
        en: "Orange: The space from the top edge of the first label in the column to the top edge of the next label in the column. Example: If the label height is 2 and there is NO vertical space between labels, the value is 2 (2-2 = 0). If the space is 0.5, the value is 2.5 (2.5-2 = 0.5)",
        fr: "Orange: La distance entre le bord supérieur de la première étiquette de la colonne et le bord supérieur de la prochaine étiquette de la colonne. Exemple: Si la hauteur de l’étiquette est de 2 et qu’il n’y a AUCUNE espace vertical entre les étiquettes, la valeur est de 2 (2-2 = 0). Si l’espace est de 0.5, la valeur est de 2.5 (2.5-2 = 0.5)",
        it: "Arancione: Lo spazio tra il bordo superiore del primo’etichetta nella colonna e il bordo superiore dell’etichetta successiva nella colonna. Esempio: se l’altezza dell’etichetta è 2 e NON c’è spazio verticale tra le etichette, il valore è 2 (2-2 = 0). Se lo spazio è 0.5, il valore è 2.5 (2.5-2 = 0.5)",
        ch: "Oransch:La distanza tranter l’ur sura da l’emprima etichetta en la colonna e l’ur sura da la proxima etichetta en la colonna. Exempel: Sche l’autezza da l’etichetta è 2 e sch’i n’exista nagina distanza verticala tranter las etichettas, è la valur 2 (2-2=0). Sche la distanza munta a 0.5, importa la valur 2.5 (2.5-2=0.5)"
    },
    columns: {
        de: "Grün: Die Anzahl Spalten an Etiketten. Beispiel: 3 Etiketten horizontal nebeneinander sind 3 Spalten.",
        en: "Green: The amount of columns of labels. Example: 3 labels next to each other are 3 columns.",
        fr: "Vert: Le nombre de colonnes d’étiquettes. Exemple: 3 étiquettes côte à côte sont 3 colonnes.",
        it: "Verde: Il numero di colonne di etichette. Esempio: 3 etichette affiancate sono 3 colonne.",
        ch: "Verd: Il dumber da las colonnas da las etichettas. Exempel: 3 etichettas ina sper l’autra èn 3 colonnas."
    },
    rows: {
        de: "Grün: Die Anzahl Zeilen an Etiketten. Beispiel: 10 Etiketten untereinander sind 10 Zeilen.",
        en: "Green: The amount of rows of labels. Example: 10 labels underneath each other are 10 rows.",
        fr: "Vert:Le nombre de lignes d’étiquettes. Par exemple, 10 étiquettes alignées les unes sous les autres représentent 10 lignes.",
        it: "Verde: Il numero di righe di etichette. Ad esempio, 10 etichette in fila sono 10 righe.",
        ch: "Verd: Il dumber da lingias da las etichettas. Exempel: 10 etichettas ina tranter l’autra èn 10 lingias."
    },
    radius: {
        de: "Der Radius der Ecken der Etiketten. 0 ist absolut rechtweckig, 100 ist absolut Kreisförmig. ",
        en: "The radius of the labels edges. 0 is absolute rectangular, 100 is absolute circular.",
        fr: "Le rayon des bords des étiquettes. 0 est rectangulaire absolu, 100 est circulaire absolu.",
        it: "Il raggio dei bordi delle etichette. 0 è rettangolare assoluto, 100 è circolare assoluto.",
        ch: "Il radius dals urs da las etichettas. 0 è absolutamain rectangular, 100 è absolutamain en furma d’in circul."
    }
}