import { SimpleTranslation } from "./interfaces_text"

interface PreferenceTitle{
    language: SimpleTranslation
    colors: SimpleTranslation
    db_gun: SimpleTranslation
    saveDb_gun: SimpleTranslation
    importDb_gun: SimpleTranslation
    db_ammo: SimpleTranslation
    saveDb_ammo: SimpleTranslation
    importDb_ammo: SimpleTranslation
    importCSV_ammo: SimpleTranslation
    gunList: SimpleTranslation
    printAllGuns: SimpleTranslation
    printArt5: SimpleTranslation
    printGunsHybrid: SimpleTranslation
    printGallery: SimpleTranslation
    printCustomList: SimpleTranslation
    ammoList: SimpleTranslation
    printAllAmmo: SimpleTranslation
    settings: SimpleTranslation
    generalSettings: SimpleTranslation
    displaySettings: SimpleTranslation
    preferredUnits: SimpleTranslation
    about: SimpleTranslation
    statistics: SimpleTranslation
    editData: SimpleTranslation
    editData_Autocomplete: SimpleTranslation
    editData_customLabels: SimpleTranslation
    versionHistory: SimpleTranslation
    generateQRCodes: SimpleTranslation
}

interface GeneralSettingsLabels{
    resizeImages: SimpleTranslation
    loginGuard: SimpleTranslation
    hintsDisplay: SimpleTranslation
    scanBeep: SimpleTranslation
}

interface DisplaySettingsLabels{
    displayImagesInListViewGun: SimpleTranslation
    displayImagesInListViewAmmo: SimpleTranslation
    emptyFields: SimpleTranslation
    caliberDisplayName: SimpleTranslation
    titleBelowImage: SimpleTranslation
}

export const preferenceTitles:PreferenceTitle = {
    language: {
        de: "Grüezi wohl!",
        en: "Tally ho!",
        fr: "Enchanté!",
        it: "Ciao!",
        ch: "Allegra!",
    },
    colors: {
        de: "Farbschema",
        en: "Color scheme",
        fr: "Schéma de couleurs",
        it: "Schema di colori",
        ch: "Schema da colur",
    },
    db_gun: {
        de: "Datenbanken",
        en: "Database",
        fr: "Base de données",
        it: "Database",
        ch: "Banca da datas",
    },
    saveDb_gun: {
        de: "Speichern",
        en: "Save",
        fr: "Enregistrer",
        it: "Salva",
        ch: "Arcunar",
    },
    importDb_gun: {
        de: "Importieren",
        en: "Import",
        fr: "Importer",
        it: "Importa",
        ch: "Importar",
    },
    db_ammo: {
        de: "Datenbank Munition",
        en: "Ammunition Database",
        fr: "Base de données munitions",
        it: "Database munizioni",
        ch: "Banca da datas muniziun",
    },
    saveDb_ammo: {
        de: "Speichern als Arsenal Datenbank",
        en: "Save",
        fr: "Enregistrer",
        it: "Salva",
        ch: "Arcunar",
    },
    importDb_ammo: {
        de: "Arsenal Datenbank importieren (ammoDB_17...)",
        en: "Import",
        fr: "Importer",
        it: "Importa",
        ch: "Importar",
    },
    importCSV_ammo: {
        de: "Eigene CSV Datenbank importieren",
        en: "Import custom CSV Database",
        fr: "Importer une base de données CSV personnalisée", 
        it: "Importazione di una propria banca dati CSV", 
        ch: "Importar l’atgna banca da datas CSV",
    },
    gunList: {
        de: "Verzeichnisse",
        en: "Lists",
        fr: "Listes",
        it: "Elenco",
        ch: "Register",
    },
    printAllGuns: {
        de: "Komplettes Waffenverzeichnis als Tabelle",
        en: "Complete gun list as a table",
        fr: "Liste complète des armes sous forme de tableau",
        it: "Elenco completo delle armi come tabella",
        ch: "Register cumplet da las armas sco tabella",
    },
    printArt5:{
        de: "Waffenverzeichnis nach WG Art. 5 als Tabelle",
        en: "Gun List according to WA Art. 5 as table",
        fr: "Liste des armes selon la LArm Art. 5 sous forme de tableau",
        it: "Elenco delle armi secondo la LArm Art. 5 come tabella",
        ch: "Register da las armas tenor la LArm Art. 5 sco tabella",
    },
    printGunsHybrid: {
        de: "Komplettes Waffenverzeichnis als Tabelle mit WG Art. 5 Eigenschaften",
        en: "Complete gun list as a table with WA Art. 5 properties",
        fr: "Liste complète des armes sous forme de tableau avec les caractéristiques de l’art. 5 LArm",
        it: "Elenco completo delle armi come tabella con le caratteristiche dell’art. 5 LArm",
        ch: "Register cumplet da las armas sco tabella cun las caracteristicas da l’art. 5 LArm",
    },
    printGallery:{
        de: "Galerie",
        en: "Gallery",
        fr: "Galerie",
        it: "Galleria",
        ch: "Galaria",
    },
    ammoList: {
        de: "Munitionsverzeichnis",
        en: "List of ammunition",
        fr: "Liste des munitions",
        it: "Elenco delle munizioni",
        ch: "Register da muniziun",
    },
    printAllAmmo: {
        de: "Komplettes Munitionsverzeichnis als Tabelle",
        en: "Complete list of ammunition as a table",
        fr: "Liste complète des munitions sous forme de tableau",
        it: "Elenco completo delle munizioni come tabella",
        ch: "Register cumplet da muniziun sco tabella",
    },
    printCustomList: {
        de: "Benutzerdefiniertes Verzeichnis",
        en: "Custom List",
        fr: "Liste personnalisé",
        it: "Elenco personalizzato",
        ch: "Register definì da l’utilisader",
    },
    settings:{
        de: "Einstellungen",
        en: "Settings",
        fr: "Paramètres",
        it: "Impostazioni",
        ch: "Parameters",
    },
    generalSettings:{
        de: "Allgemeine Einstellungen",
        en: "General settings",
        fr: "Paramètres généraux",
        it: "Impostazioni generali",
        ch: "Parameters generals",
    },
    displaySettings: {
        de: "Anzeigeoptionen",
        en: "Display settings",
        fr: "Paramètres d'affichage",   
        it: "Impostazioni di visualizzazione",
        ch: "Configuraziuns da visualisaziun" 
    },
    preferredUnits: {
        de: "Masseinheiten",
        en: "Measurement Units",
        fr: "Unités de mesure",
        it: "Unità di misura",
        ch: "Unitads da mesiraziun",
    },
    about:{
        de: "Über",
        en: "About",
        fr: "Au sujet de",
        it: "Circa",
        ch: "Davart",
    },
    statistics:{
        de: "Statistiken",
        en: "Statistics",
        fr: "Statistiques",
        it: "Statistiche",
        ch: "Statisticas",
    },
    editData:{
        de: "Daten bearbeiten",
        en: "Edit data",
        fr: "Modifier les données",       
        it: "Modificare i dati",            
        ch: "Modifitgar las datas" 
    },
    editData_Autocomplete:{
        de: "Autovervollständigungsdaten bearbeiten",
        en: "Edit Autocomplete Data",
        fr: "Modifier les données d’auto-complétion",   
        it: "Modificare i dati di completamento automatico",
        ch: "Modifitgar las datas da completaziun automatica"
    },
    editData_customLabels:{
        de: "Eigene Etiketten bearbeiten",
        en: "Edit Custom Labels",
        fr: "Modifier les étiquettes personnalisées",   
        it: "Modificare le etichette personalizzate",
        ch: "Modifitgar atgnas etichettas"
    },
    generateQRCodes:{
        de: "QR-Codes generieren",
        en: "Generate QR Codes",
        fr: "Générer des codes QR",   
        it: "Generare codici QR",
        ch: "Generar codes QR"
    },
    versionHistory:{
        de: "Versionshistorie",
        en: "Version History",
        fr: "Historique des versions",
        it: "Storia delle versioni",
        ch: "Istorgia da las versiuns"
    }
}

export const generalSettingsLabels: GeneralSettingsLabels = {
    resizeImages: {
        de: "Bildoptimierung",
        en: "Image optimization",
        fr: "Optimisation des images",
        it: "Ottimizzazione delle immagini",
        ch: "Optimaziun dal maletg"
    },
    loginGuard: {
        de: "Biometrischer Login",
        en: "Biometric login",
        fr: "Login biométrique",
        it: "Login biometrico",
        ch: "Login biometric"
    },
    hintsDisplay: {
        de: "Hinweisbox anzeigen",
        en: "Show hints box",
        fr: "Afficher la boîte d’indices",    
        it: "Mostrare la finestra dei suggerimenti",
        ch: "Mussar la box d’indizis",         
    },
    scanBeep: {
        de: "Ton abspielen bei QR-Code Scan",
        en: "Play sound when scanning QR code",
        fr: "Jouer un son lors du scan d’un code QR",
        it: "Riprodurre un suono quando si scansiona un codice QR",
        ch: "Duvrar in tun cura che vegn scaneà in code QR"
    }
}

export const displaySettingsLabels: DisplaySettingsLabels = {
    displayImagesInListViewGun: {
        de: "Bilder in Listenansicht Waffen anzeigen", 
        en: "Show images in gun list view",
        fr: "Afficher les images dans la vue en liste armes",
        it: "Visualizzare le immagini nella vista elenco armi",
        ch: "Mussar armas cun ina glista"  
    },
    displayImagesInListViewAmmo: {
        de: "Bilder in Listenansicht Munition anzeigen", 
        en: "Show images in ammunition list view",
        fr: "Afficher les images dans la vue en liste munitions",
        it: "Visualizzare le immagini nella vista elenco munizioni",
        ch: "Mussar maletgs cun ina glista muniziun"  
    },
    emptyFields: {
        de: "Leere Felder in Einträgen ausblenden",
        en: "Hide empty fields in entries",
        fr: "Masquer les champs vides dans les entrées",
        it: "Nascondere i campi vuoti nelle voci",
        ch: "Tschertgar champs vids en inscripziuns"
    },
    caliberDisplayName: {
        de: "Kurze Kaliberbezeichnungen verwenden in Einträgen und PDF-Listen",
        en: "Use short calibre designations in entries and PDF lists",
        fr: "Utiliser des désignations de calibres courtes dans les entrées et les listes PDF",
        it: "Usa etichette di calibro brevi nelle voci e nelle liste PDF",
        ch: "Duvrar nums da caliber curts en inscripziuns e glistas da pdf"
    },
    titleBelowImage: {
        de: "Text unterhalb des Bildes in der Kachelansicht anzeigen",
        en: "Show text below image in grid view",
        fr: "Afficher le texte sous l’image en vue en grille",
        it: "Mostrare il testo sotto l’immagine nella vista a griglia",
        ch: "Mussar il text sut l’imatge en la vista da griglia",
    },
}

export const aboutText: SimpleTranslation = {
    de: "Arsenal - Die schweizer App für Waffensammler!",
    en: "Arsenal - The Swiss app for gun collectors!",
    fr: "Arsenal - L'application suisse pour les collectionneurs d'armes !",
    it: "Arsenal - L'app svizzera per i collezionisti di armi!",
    ch: "Arsenal - L'app svizra per las collecziunadras ed ils collecziunaders d'armas!"
}

export const aboutThanks: SimpleTranslation = {
    de: "Speziellen Dank an:",
    en: "Special thanks to:",
    fr: "Remerciements spéciaux à",
    it: "Un ringraziamento speciale a",
    ch: "Grazia fitg spezial a",
}