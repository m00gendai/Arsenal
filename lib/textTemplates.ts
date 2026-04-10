export interface SimpleTranslation{
    de: string
    en: string
    fr: string
    it: string
    ch: string
}

interface Validation{
    requiredFieldEmpty: SimpleTranslation
}

interface DatabaseOperation{
    export: SimpleTranslation
    import: SimpleTranslation
}



interface AmmoQuickUpdate{
    title: SimpleTranslation
    error: SimpleTranslation
    placeholder: SimpleTranslation
}

interface Tooltips{
    tagFilter: SimpleTranslation
    noGunsAddedYet: SimpleTranslation
    noAmmoAddedYet: SimpleTranslation
}



interface GunQuickShot{
    title: SimpleTranslation
    updateNonStock: SimpleTranslation
    updateNonStockInput: SimpleTranslation
    updateFromStock: SimpleTranslation
    errorNoAmountDefined: SimpleTranslation
    errorAmountTooLow: SimpleTranslation
}

interface TagModal{
    title: SimpleTranslation
    subtitle: SimpleTranslation
    existingTags: SimpleTranslation
    inputTags: SimpleTranslation
    selectedTags: SimpleTranslation
}

["-", "1 Tag", "7 Tage", "14 Tage", "1 Monat", "3 Monate", "6 Monate", "9 Monate", "1 Jahr", "5 Jahre", "10 Jahre"]

interface CleanIntervals{
    none: {name: string} & SimpleTranslation
    day_1: {name: string} & SimpleTranslation
    day_7: {name: string} & SimpleTranslation
    day_14: {name: string} & SimpleTranslation
    month_1: {name: string} & SimpleTranslation
    month_3: {name: string} & SimpleTranslation
    month_6: {name: string} & SimpleTranslation
    month_9: {name: string} & SimpleTranslation
    year_1: {name: string} & SimpleTranslation
    year_5: {name: string} & SimpleTranslation
    year_10: {name: string} & SimpleTranslation
}

interface CaliberPickerStrings{
    caliberSelection: SimpleTranslation
    tabList: SimpleTranslation
    tabSearch: SimpleTranslation
}

interface aboutThanksPersons{
    michelle: SimpleTranslation
    jonas: SimpleTranslation
    owg: SimpleTranslation
    waffenforum: SimpleTranslation
    others: SimpleTranslation
}

interface LongPressActions{
    clone: SimpleTranslation
    delete: SimpleTranslation
    goto: SimpleTranslation
    unmount: SimpleTranslation
    remount: SimpleTranslation
    clean: SimpleTranslation
    battery: SimpleTranslation
}

interface LongPressActionsSuccessMessages{
    clean: SimpleTranslation
    battery: SimpleTranslation
}

interface iosWarning{
    title: SimpleTranslation
    text: SimpleTranslation
    ok: SimpleTranslation
    cancel: SimpleTranslation
}

interface ItemViewTabBarLabels{
    details: SimpleTranslation
    accessories: SimpleTranslation
}

export const cleanIntervals:CleanIntervals = {
    none: {
        name: "none",
        de: "-",
        en: "-",
        fr: "-",
        it: "-",
        ch: "-",
    },
    day_1: {
        name: "day_1",
        de: "1 Tag",
        en: "1 day",
        fr: "1 jour",
        it: "1 giorno",
        ch: "1 di",
    },
    day_7: {
        name: "day_7",
        de: "1 Woche",
        en: "1 week",
        fr: "1 semaine",
        it: "1 settimana",
        ch: "1 emna",
    },
    day_14: {
        name: "day_14",
        de: "2 Wochen",
        en: "2 weeks",
        fr: "2 semaines",
        it: "2 settimane",
        ch: "2 emnas",
    },
    month_1:{
        name: "month_1",
        de: "1 Monat",
        en: "1 month",
        fr: "1 mois",
        it: "1 mese",
        ch: "1 mais",
    },
    month_3: {
        name: "month_3",
        de: "3 Monate",
        en: "3 months",
        fr: "3 mois",
        it: "3 mesi",
        ch: "3 mais",
    },
    month_6: {
        name: "month_6",
        de: "6 Monate",
        en: "6 months",
        fr: "6 mois",
        it: "6 mesi",
        ch: "6 mais",
    },
    month_9: {
        name: "month_9",
        de: "9 Monate",
        en: "9 months",
        fr: "9 mois",
        it: "9 mesi",
        ch: "9 mais",
    },
    year_1: {
        name: "year_1",
        de: "1 Jahr",
        en: "1 year",
        fr: "1 Année",
        it: "1 anno",
        ch: "1 onn",
    },
    year_5: {
        name: "year_5",
        de: "5 Jahre",
        en: "5 years",
        fr: "5 ans",
        it: "5 anni",
        ch: "5 onns",
    },
    year_10: {
        name: "year_10",
        de: "10 Jahre",
        en: "10' years",
        fr: "10 ans",
        it: "10 anni",
        ch: "10 onns",
    },
}

export const validationErros: Validation = {
    requiredFieldEmpty: {
        de: "Feld darf nicht leer sein",
        en: "Field can not be empty",
        fr: "Le champ ne doit pas être vide",
        it: "Il campo non può essere vuoto",
        ch: "Champ na dastga betg esser vid",
    },
}

export const databaseOperations:DatabaseOperation = {
    export: {
        de: "Datenbank wird gespeichert...",
        en: "Database is being saved...",
        fr: "Base de données en cours d'enregistrement",
        it: "Database in fase di salvataggio...",
        ch: "Banca da datas vegn arcunada",
    },
    import: {
        de: "Datenbank wird importiert...",
        en: "Database is being imported...",
        fr: "Base de données en cours d'importation...",
        it: "Database in fase di importazione...",
        ch: "Banca da datas vegn importada",
    }
}

interface MainCollectionCategories {
    gunCollection: SimpleTranslation
    ammoCollection: SimpleTranslation
    accessoryCollection: SimpleTranslation
    literatureCollection: SimpleTranslation
    reloadingCollection: SimpleTranslation
    partCollection: SimpleTranslation
}

export const mainCollectionCategories: MainCollectionCategories = {
    gunCollection: {
        de: "Waffen",
        en: "Weapons",
        fr: "Armes",
        it: "Armi",
        ch: "Armas",
    },
    ammoCollection: {
        de: "Munition",
        en: "Ammunition",
        fr: "Munitions",
        it: "Munizioni",
        ch: "Muniziun",
    },
    accessoryCollection: {
        de: "Zubehör",
        en: "Accessories", 
        fr: "Accessoires",
        it: "Accessorio",
        ch: "Accessoris",
    },
    literatureCollection: {
        de: "Literatur",
        en: "Literature", 
        fr: "Littérature",
        it: "Letteratura",
        ch: "Litteratura",
    },
    reloadingCollection: {
        de: "Wiederladen",
        en: "Reloading", 
        fr: "Recharger",
        it: "Ricaricare",
        ch: "Rechargiar",
    },
    partCollection: {
        de: "Waffenteile",
        en: "Weapon Parts", 
        fr: "Pièces d’armes",
        it: "Pezzi di arma",
        ch: "Parts d’armas",
    }
}

export const newTags:{name:string, de:string, en:string, fr:string, it:string, ch:string} = {
    name: "tags", 
    de: "Schlagworte",
    en: "Tags", 
    fr: "mots-clés",
    it: "tag",
    ch: "Pleds caracteristics",
}

export const ammoQuickUpdate:AmmoQuickUpdate = {
    title: {
        de: "Mit + oder - schnell eine Munitionszunahme oder -abnahme erfassen",
        en: "Use + or - to quickly record an increase or decrease in ammunition volume", 
        fr: "Saisir rapidement une augmentation ou une diminution de la munition avec + ou -.",
        it: "Usa + o - per registrare rapidamente un aumento o una diminuzione del volume delle munizioni",
        ch: "Registrar cun + u - svelt in augment u ina reducziun da la muniziun",
    },
    error: {
        de: "Entweder + oder - muss ausgewählt sein",
        en: "Either + or - must be selected", 
        fr: "Le + ou le - doit être sélectionné",
        it: "Deve essere selezionato + o -",
        ch: "Ubain + u - sto esser selecziunà",
    },
    placeholder: {
        de: "Menge +/-",
        en: "Amount +/-", 
        fr: "Montant +/-",
        it: "Quantità +/-",
        ch: "Quantitad +/-",
    }
}

export const tooltips:Tooltips = {
    tagFilter: {
        de: "Hier kann nach erfassten Schlagworten gefiltert werden",
        en: "Here you can filter by entered tags",
        fr: "Ici, il est possible de filtrer les mots-clés saisis",
        it: "Qui puoi filtrare per tag inseriti",
        ch: "Qua pon ins filtrar tenor pleds registrads",
    },
    noGunsAddedYet: {
        de: "Noch keine Waffen erfasst",
        en: "No guns added yet",
        fr: "Pas encore d'armes enregistrées",
        it: "Non sono ancora state registrate armi",
        ch: "Betg anc registrà armas",
    },
    noAmmoAddedYet: {
        de: "Noch keine Munition erfasst",
        en: "No ammunition added yet",
        fr: "Pas encore de munitions enregistrées",
        it: "Non sono ancora state registrate munizioni",
        ch: "Betg anc registrada ina muniziun",
    },
}



export const search:SimpleTranslation = {
    de: "Suchen", 
    en: "search",
    fr: "Chercher",
    it: "Ricerca",
    ch: "Tschertgar"
}

export const gunQuickShot:GunQuickShot = {
    title:{
        de: "Schussbelastung erhöhen", 
        en: "Increase shot count",
        fr: "Augmenter la charge de tir",
        it: "Aumentare il carico di pallini",
        ch: "Augmentar la chargia da tir"  
    },
    updateNonStock:{
        de: "Munition nicht aus Bestand", 
        en: "Ammunition not from stock",
        fr: "Munitions non issues de stocks",
        it: "Munizioni non di scorta",
        ch: "Muniziun betg or da l'effectiv"  
    },
    updateNonStockInput:{
        de: "Menge eingeben", 
        en: "Input amount",
        fr: "Saisir la quantité",
        it: "Inserire la quantità",
        ch: "S'approfundar"  
    },
    updateFromStock:{
        de: "Munition aus Bestand", 
        en: "Ammunition from stock",
        fr: "Munitions de stocks",
        it: "Munizioni di scorta",
        ch: "Muniziun da plantadi"  
    },
    errorNoAmountDefined:{
        de: "Achtung: Kein Bestand dieses Kalibers definiert!", 
        en: "Ammunition from stock",
        fr: "Munitions de stocks",
        it: "Munizioni di scorta",
        ch: "Muniziun da plantadi"  
    },
    errorAmountTooLow:{
        de: "Achtung: Bestand dieses Kalibers ({{AMOUNT}}) ist weniger als der eingegebene Verbrauch!", 
        en: "Ammunition from stock",
        fr: "Munitions de stocks",
        it: "Munizioni di scorta",
        ch: "Muniziun da plantadi"  
    }
}

export const tagModal:TagModal ={
    title: {
        de: "Schlagworte", 
        en: "Tags",
        fr: "Mots-clés",
        it: "Parole chiave",
        ch: "pleds caracteristics"  
    },
    subtitle: {
        de: "Hier können Schlagworte erfasst werden, nach denen in der Übersicht gefiltert werden kann.", 
        en: "Here you can define tags, by which you can filter in the collection view.",
        fr: "Il est possible de saisir ici des mots-clés qui serviront à filtrer l'aperçu.",
        it: "Qui si possono inserire parole chiave, che possono poi essere filtrate nella panoramica.",
        ch: "Qua pon ins registrar chavazzins, tenor ils quals ins po filtrar en la survista."  
    },
    existingTags: {
        de: "Bereits vorhandene Schlagwörter", 
        en: "Existing tags",
        fr: "Mots-clés déjà existants",
        it: "Parole chiave esistenti",
        ch: "Pleds gia existents"  
    },
    inputTags: {
        de: "Schlagwort eingeben", 
        en: "Enter tag",
        fr: "Saisir un mot-clé",
        it: "Inserire la parola chiave",
        ch: "Dar il pled da tagl"  
    },
    selectedTags: {
        de: "Ausgewählte Schlagworte", 
        en: "Selected tags",
        fr: "Mots-clés sélectionnés",
        it: "Parole chiave selezionate",
        ch: "Pleds selecziunads"  
    }
}



export const aboutThanksPersons:aboutThanksPersons = {
    michelle:{
        de: "Michelle Fabienne Weber-Meichtry",
        en: "Michelle Fabienne Weber-Meichtry",
        fr: "Michelle Fabienne Weber-Meichtry",
        it: "Michelle Fabienne Weber-Meichtry",
        ch: "Michelle Fabienne Weber-Meichtry",
    },
    jonas:{
        de: "Jonas Hürlimann",
        en: "Jonas Hürlimann",
        fr: "Jonas Hürlimann",
        it: "Jonas Hürlimann",
        ch: "Jonas Hürlimann",
    },
    owg:{
        de: "die Betatester der Ostschweizerischen Waffen-Sammler-Gesellschaft OWG",
        en: "the beta testers of the Eastern Swiss Arms Collectors Society OWG",
        fr: "les testeurs bêta de la Société suisse orientale des collectionneurs d'armes OWG",
        it: "i beta tester della Società dei collezionisti di armi della Svizzera orientale OWG",
        ch: "ils Betatestas da la Societad d'armas da la Svizra orientala OWG",
    },
    waffenforum:{
        de: "die Betatester des waffenforum.ch",
        en: "the beta testers of waffenforum.ch",
        fr: "les testeurs bêta du waffenforum.ch",
        it: "i beta tester di waffenforum.ch ",
        ch: "ils betatesters dal waffenforum.ch",
    },
    others:{
        de: "alle anderen Tester, ohne die die App so nicht möglich wäre",
        en: "all the other testers without whom the app would not be possible",
        fr: "tous les autres testeurs sans lesquels l'application ne serait pas possible",
        it: "tutti gli altri tester, senza i quali l'app non sarebbe possibile",
        ch: "tuot ils oters tests, sainza ils quals l'app nu füss uschè pussibla",
    },
}



export const caliberPickerStrings:CaliberPickerStrings = {
    caliberSelection:{
        de: "Ausgewählte Kaliber erscheinen hier",
        en: "Selected calibers appear here",
        fr: "Les calibres sélectionnés apparaissent ici",
        it: "I calibri selezionati appaiono qui",
        ch: "Caliber selecziunà cumpara qua",
    },
    tabList: {
        de: "Liste",
        en: "List",
        fr: "Liste",
        it: "Elenco",
        ch: "Glista",
    },
    tabSearch:{
        de: "Suche",
        en: "Search",
        fr: "Recherche",
        it: "Ricerca",
        ch: "Tschertga",
    }
}



export const longPressActions:LongPressActions = {
    clone:{
        de: "Klonen",
        en: "Clone",
        fr: "Clone",
        it: "Clone",
        ch: "Clona",
    },
    delete: {
        de: "Löschen",
        en: "Delete",
        fr: "Supprimer",
        it: "Cancellare",
        ch: "Stizzar",
    },
    goto: {
        de: "",
        en: "",
        fr: "",
        it: "",
        ch: "",
    },
    unmount: {
        de: "Abmontieren",
        en: "Unmount",
        fr: "Démonter",
        it: "Smontare",
        ch: "Demontar",
    },
    remount: {
        de: "Woanders montieren",
        en: "Remount",
        fr: "Monter ailleurs",
        it: "Montare altrove",
        ch: "Montar insanua auter",
    },
    clean: {
        de: "Reinigen",
        en: "Clean",
        fr: "Nettoyer",
        it: "Pulire",
        ch: "Nettar",
    },
    battery: {
        de: "Batterie wechseln",
        en: "Change Battery",
        fr: "Changer la batterie",
        it: "Cambiare la batteria",
        ch: "Midar la batteria",
    }
}

export const longPressActionsSuccessMessages:LongPressActionsSuccessMessages = {
    clean: {
        de: "gereinigt",
        en: "cleaned",
        fr: "nettoyé",
        it: "pulito",
        ch: "nettà",
    },
    battery: {
        de: "Batterie für {{{A}}} gewechselt",
        en: "Changed battery for {{{A}}}",
        fr: "Batterie changée pour {{{A}}}",
        it: "Batteria sostituita per {{{A}}}",
        ch: "Batteria midada per {{{A}}}",
    }
}

export const iosWarningText: iosWarning = {
    title: {
        de: "iOS Warnung",
        en: "iOS warning",
        fr: "Avertissement iOS",
        it: "Avvertimento iOS",
        ch: "iOS avertiment",
    },
    text:{
        de: "Normalerweise ist das PDF sehr schnell erstellt. Leider kann es dennoch vorkommen, dass das Erstellen der PDF-Datei sehr lange dauert (mehrere Minuten). Falls das der Fall ist, kann man entweder warten, bis das Erstellen beendet ist, oder die App neu starten und den Vorgang erneut versuchen. Das Problem ist bekannt und an einer Lösung wird gearbeitet.",
        en: "Generally, the PDF file is created very quickly. Unfortunately, however, it may take a very long time to create the PDF file (several minutes). If this is the case, you can either wait until the creation is finished, or restart the app and try again. The problem is known and a solution is being worked on.",
        fr: "Généralement, la création d'un fichier PDF est très rapide. Malheureusement, il arrive que la création d'un fichier PDF prenne beaucoup de temps (plusieurs minutes). Si c'est le cas, vous pouvez soit attendre que la création soit terminée, soit redémarrer l'application et réessayer. Le problème est connu et une solution est en cours.",
        it: "Normalmente il PDF viene creato molto velocemente. Purtroppo, però, la creazione di un file PDF può richiedere molto tempo (diversi minuti). In questo caso, puoi attendere che la creazione sia terminata, oppure riavviare l'applicazione e riprovare. Il problema è noto e stiamo lavorando per risolverlo.",
        ch: "Normalmain es il PDF construì fich svelt. Deplorablamain poi tuttavia capitar che la creaziun da la datoteca da PDF dura fich ditg (pliras minutas). Sche quai è il cas, pon ins spetgar fin che la creaziun è terminada, ubain cumenzar da nov l'applicaziun ed empruvar da far danovamain il proceder. Il problem è enconuschent ed ins lavura vi d'ina soluziun."
    },
    ok:{
        de: "Versuchen",
        en: "Try",
        fr: "Essayez",
        it: "Prova",
        ch: "Pruvar",
    },
    cancel:{
        de: "Abbrechen",
        en: "Cancel",
        fr: "Annuler",
        it: "Annulla",
        ch: "Rumper giu",
    }
}

export const shotLabel: SimpleTranslation = {
    de: "Schuss",
    en: "rounds",
    fr: "coups",
    it: "colpi",
    ch: "culps",
}

export const importExportSelectionLabel: SimpleTranslation = {
    de: "Ausgewählte Datenbank",
    en: "Selected database",
    fr: "Base de données sélectionnée",
    it: "Database selezionato",
    ch: "Banca da datas tschernida",
}

export const developerSettingsWarning: SimpleTranslation = {
    de: "Diese Einstellungen sind UNWIDERRUFLICH. Es gibt keine Übersetzungen und keine Erklärungen. VERWENDUNG AUF EIGENE GEFAHR! Verwenden Sie sie nur, wenn Sie wissen, was Sie tun und wenn Sie sicher sind, was Sie tun. Es gibt keine Bestätigungsaufforderungen. Drücken Sie die Taste und die Funktion WIRD OHNE BESTÄTIGUNG AUSGEFÜHRT!",
    en: "These Settings are IRREVERSIBLE. There are no translations and no explanations provided. USE AT YOUR OWN RISK! Use only if you know what you are doing and if you are sure of what you are doing. There are no confirmation prompts. Press the button and the function runs WITHOUT CONFIRMATION!",
    fr: "Ces paramètres SONT IRRÉVERSIBLES. Il n’y a pas de traductions et pas d’explications. UTILISEZ-LES À VOS PROPRES RISQUES ET PÉNALITÉS! Utilisez-les uniquement si vous savez ce que vous faites et si vous êtes sûr de ce que vous faites. Il n’y a pas de demande de confirmation. Appuyez sur le bouton et la fonction s’EXÉCUTERA SANS CONFIRMATION!",
    it: "Queste impostazioni SONO IRREVERSIBILI. Non ci sono traduzioni e non ci sono spiegazioni. USATE A VOSTRA PROPRIA RESPONSABILITÀ! Usate solo se sapete cosa state facendo e se siete sicuri di quello che state facendo. Non ci sono richieste di conferma. Premete il pulsante e la funzione viene ESEGUITA SENZA CONFERMA!",
    ch: "Questas preferenzas èn IRREVOCABLES. I na dat naginas translaziuns e naginas decleraziuns. UTILISAI QUAI SIN ATGNA RISTGA! Duvrai quai mo sche Vus savais, tge che Vus faschais e sche Vus essas segirs, tge che Vus faschais. I na dat naginas pretensiuns da conferma. Smatgai la tasta e la funcziun vegn exequida SENZA CONFERMAR!",
}

export const itemViewTabBarLabels: ItemViewTabBarLabels = {
    details: {
        de: "Details",
        en: "Details",
        fr: "Détails",
        it: "Dettagli",
        ch: "Detagls"
    },
    accessories: {
        de: "Zubehör",
        en: "Accessories",
        fr: "Accessoires",
        it: "Accessori",
        ch: "Airi"
    },
}

export const selectCollection: SimpleTranslation = {
    de: "Sammlung auswählen",
    en: "Select Collection",
    fr: "Sélectionner la collection",
    it: "Selezionare la collezione",
    ch: "Selecziun da la collecziun"
}