import { SimpleTranslation } from "./interfaces_text"

interface ModalTextItems{
    title: SimpleTranslation
    text: SimpleTranslation
}

interface ModalText{
    datePicker: ModalTextItems
    colorPicker: ModalTextItems
    caliberPicker: ModalTextItems
    cleanInterval: ModalTextItems
    mountedOn: ModalTextItems
    customPDFPrinter: ModalTextItems
    sellItem: ModalTextItems
}

export const modalTexts: ModalText = {
    datePicker: {
        title: {
            de: "Datumsauswahl",
            en: "Date picker",
            fr: "Sélection de la date",
            it: "Selezione della data",
            ch: "Tscherna da las datas",
        },
        text:{
            de: "Tippe auf das Datum, um es zu setzen.\nDie Pfeile links und rechts wechseln zum vorherigen, respektive nächsten Monat.\nTippe den Monat an, um zur Monatsauswahl zu kommen.\nTippe das Jahr an, um zur Jahresauswahl zu kommen.",
            en: "Tap on the date to set it.\nThe arrows on the left and right switch to the previous and next month respectively.\nTap on the month to go to the month selection.\nTap on the year to go to the year selection.",
            fr: "Appuie sur la date pour la définir.\nLes flèches à gauche et à droite passent respectivement au mois précédent et au mois suivant.\nAppuie sur le mois pour accéder à la sélection du mois.\nAppuie sur l'année pour accéder à la sélection de l'année.",
            it: "Toccare la data per impostarla.Le frecce a sinistra e a destra passano rispettivamente al mese precedente e a quello successivo.Toccare il mese per passare alla selezione del mese.Toccare l'anno per passare alla selezione dell'anno.",
            ch: "Tippas a la data per al metter.\nIls battas a sanestra ed a dretga müdan per il mais avant, resp. il prossem mais.\n Tipp al mais per gnir a la tscherna dal mais.\n Tipp l'on per gnir a la tscherna dal mais.",
        }
    },
    colorPicker: {
        title: {
            de: "Farbauswahl",
            en: "Color picker",
            fr: "Sélection de couleurs",
            it: "Selezione del colore",
            ch: "Schelta da colurs",
        },
        text:{
            de: "Wähle die zur Waffe passende Farbe.\nDies setzt auch einen farblichen Rahmen um die Fotos.",
            en: "Choose the color that matches the gun.\nThis also sets a color frame around the photos.",
            fr: "Choisis la couleur correspondant à l'arme.\nDies met aussi un cadre coloré autour des photos.",
            it: "Scegliere il colore che si abbina all'arma.´In questo modo si crea anche una cornice di colore intorno alle foto.",
            ch: "Tscherni la colur adattada per l'arma.\nDies dat er in rom en colur enturn las fotografias.",
        }
    },
    caliberPicker: {
        title: {
            de: "Kaliberauswahl",
            en: "Caliber selection",
            fr: "Sélection du calibre",
            it: "Selezione del calibro",
            ch: "Tscherna da caliber",
        },
        text:{
            de: `Wähle die passenden Kaliber.\nBei Waffen können mehrere Kaliber gewählt werden (zum Beispiel .357 Magnum und .38 Special), bei Munitionssorten ist nur ein Kaliber vorgesehen.\nDas/die ausgewählte/n Kaliber wird/werden jeweils angezeigt.\nWichtig: Damit die Funktion "QuickShot", respektive "QuickStock" richtig funktionieren, müssen die Kaliberangabe bei Waffe und Munition übereinstimmen.`,
            en: `Select the appropriate calibers.\nMultiple calibers can be selected for weapons (for example .357 Magnum and .38 Special), only one caliber is provided for ammunition types.\nThe selected caliber(s) is/are displayed in each case.\nImportant: For the "QuickShot" and "QuickStock" functions to work correctly, the caliber information for the weapon and ammunition must match.`,
            fr: `Choisis les calibres appropriés.\nPour les armes, il est possible de choisir plusieurs calibres (par exemple .357 Magnum et .38 Special), pour les munitions, un seul calibre est prévu.\nLe(s) calibre(s) choisi(s) s'affiche(nt) à chaque fois.\nImportant : pour que la fonction "QuickShot", respectivement "QuickStock", fonctionne correctement, les indications de calibre de l'arme et des munitions doivent correspondre.`,
            it: `È possibile selezionare più calibri per le armi (ad esempio .357 Magnum e .38 Special), mentre per le munizioni è previsto un solo calibro.Il calibro o i calibri selezionati vengono visualizzati in ogni caso.Importante: affinché le funzioni "QuickShot" e "QuickStock" funzionino correttamente, le informazioni sul calibro dell'arma e delle munizioni devono corrispondere.`,
            ch: `Tschernas ils caliber correspundents.\nSche armas pon vegnir tschernidas plirs caliber (per exempel .357 magnum e .38 special), en cas da sorts da muniziun è previs mo in caliber.\nIl/il caliber tschernì vegn/sa mussà mintgamai.\nimpurtant: Per che la funcziun da "QuickShot", respectiv "QuickStock" funcziunia endretg, ston las indicaziuns da caliber tar l'arma e tar la muniziun correspunder.`,
        }
    },
    cleanInterval: {
        title: {
            de: "Reinigungsintervall",
            en: "Cleaning interval",
            fr: "Intervalle de nettoyage",
            it: "Intervallo di pulizia",
            ch: "Interval da nettegiar",
        },
        text:{
            de: `Wähle einen Zeitintervall, nach dem die Waffe wieder geputzt werden müsste.\n\nDies wird anhand des Wertes von "zuletzt geputzt" gerechnet, sofern dieser gesetzt ist.\n\nBei Überschreitung des Intervalls erscheint der Name der Waffe in der Übersicht rot.`,
            en: `Select a time interval after which the weapon should be cleaned again.\n\nThis is calculated based on the value of "last cleaned", if this is set.\n\nIf the interval is exceeded, the name of the weapon appears in red in the overview.`,
            fr: `Choisir un intervalle de temps après lequel l'arme devrait être nettoyée à nouveau.\n\nCeci est calculé en fonction de la valeur de "dernier nettoyé", si celle-ci est définie.\n\nSi l'intervalle est dépassé, le nom de l'arme apparaît en rouge dans l'aperçu.`,
            it: `Selezionare un intervallo di tempo dopo il quale l'arma deve essere pulita di nuovo.\n\nQuesto viene calcolato in base al valore di "ultima pulizia", se impostato.\n\nSe l'intervallo viene superato, il nome dell'arma appare in rosso nella panoramica.`,
            ch: `Tscherni in interval da temp, cur che l'arma stuess puspè vegnir nettegiada.\n\nDies vegn quintà vi da la valur da "l'ultima nettegiada", premess che quella saja messa.\n\nBenenen surpassament da l'interval cumpara il num da l'arma en la survista cotschna.`,
        }
    },
    mountedOn: {
        title: {
            de: "QuickMount",
            en: "QuickMount",
            fr: "QuickMount",
            it: "QuickMount",
            ch: "QuickMount",
        },
        text:{
            de: `Wähle, auf welche Waffe/welches Zubehör das aktuelle Zubehör/Waffenteil montiert werden soll.`,
            en: ``,
            fr: ``,
            it: ``,
            ch: ``,
        }
    },
    customPDFPrinter: {
        title: {
            de: "Benutzerdefiniertes Verzeichnis drucken",
            en: "Print Custom List",
            fr: "Imprimer la liste personnalisée",
            it: "Stampa elenco personalizzato",
            ch: "Stampar register definì da l’utilisader",
        },
        text:{
            de: `Wähle die Sammlung aus, die gedruckt werden soll und welche Attribute angezeigt werden sollen. Die Anzahl der Attribute ist auf 7 beschränkt.`,
            en: `Select the collection you want to print and which attributes should be displayed. The number of attributes is limited to 7.`,
            fr: `Sélectionnez la collection que vous souhaitez imprimer et les attributs à afficher. Le nombre d’attributs est limité à 7.`,
            it: `Selezionate la collezione che desiderate stampare e gli attributi che devono essere visualizzati. Il numero di attributi è limitato a 7.`,
            ch: `Tscherna la collecziun che Vus vulais stampar e tge attributs che duain vegnir inditgads. Il dumber dals attributs è limità a 7.`,
        }
    },
    sellItem: {
        title: {
            de: "Artikel verkaufen",
            en: "Sell item",
            fr: "Vendre l'article",
            it: "Vendere l'articolo",
            ch: "Vender l'artitgel",
        },
        text:{
            de: `Gib die Informationen zum Verkauf des Artikels ein und bestätige den Verkauf.\n\nDer Artikel wird daraufhin als verkauft markiert und in der Übersicht je nach Einstellung in den Anzeigeoptionen entweder halbtransparent oder gar nicht angezeigt.`,
            en: `Enter the information for selling the item and confirm the sale.\n\nThe item will then be marked as sold and displayed in the overview either semi-transparently or not at all, depending on the setting in the display options.`,
            fr: `Entrez les informations pour vendre l'article et confirmez la vente.\n\nL'article sera alors marqué comme vendu et affiché dans l'aperçu soit en semi-transparence, soit pas du tout, selon le paramètre dans les options d'affichage.`,
            it: `Inserisci le informazioni per vendere l'articolo e conferma la vendita.\n\nL'articolo sarà quindi contrassegnato come venduto e visualizzato nella panoramica in modo semi-trasparente o per niente, a seconda dell'impostazione nelle opzioni di visualizzazione.`,
            ch: `Inseris las infurmaziuns per vender l'artitgel e conferma la vendita.\n\nIl artitgel vegn lura marcà sco vendì e mussà en la survista u en semi-transparenza u per nagut, dependent da l'impostaziun en las opziuns da visualisaziun.`,
        }
    },
}