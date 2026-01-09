import { SimpleTranslation } from "lib/textTemplates";

export type DataTemplateTranslation = {name: string} & SimpleTranslation

interface DataTemplateTranslations {
    manufacturer: DataTemplateTranslation
    model: DataTemplateTranslation
    manufacturingDate: DataTemplateTranslation
    originCountry: DataTemplateTranslation
    caliber: DataTemplateTranslation
    serial: DataTemplateTranslation
    permit: DataTemplateTranslation
    acquisitionDate_unix: DataTemplateTranslation
    paidPrice: DataTemplateTranslation
    boughtFrom: DataTemplateTranslation
    marketValue: DataTemplateTranslation
    shotCount: DataTemplateTranslation
    lastShotAt_unix: DataTemplateTranslation
    lastCleanedAt_unix: DataTemplateTranslation
    cleanInterval: DataTemplateTranslation
    mainColor: DataTemplateTranslation
    language: DataTemplateTranslation
    title: DataTemplateTranslation
    subtitle: DataTemplateTranslation
    isbn: DataTemplateTranslation
    publishingDate: DataTemplateTranslation
    author: DataTemplateTranslation
    publisher: DataTemplateTranslation
    edition: DataTemplateTranslation
    series: DataTemplateTranslation
    volume: DataTemplateTranslation
    pages: DataTemplateTranslation
    format: DataTemplateTranslation
    lumen: DataTemplateTranslation
    candela: DataTemplateTranslation
    wavelength: DataTemplateTranslation
    laserPower: DataTemplateTranslation
    batteryLastChangedAt_unix: DataTemplateTranslation
    currentlyMountedOn: DataTemplateTranslation
    capacity: DataTemplateTranslation
    currentStock: DataTemplateTranslation
    material: DataTemplateTranslation
    platform: DataTemplateTranslation
    reticle: DataTemplateTranslation
    reticleColor: DataTemplateTranslation
    zoom: DataTemplateTranslation
    unit: DataTemplateTranslation
    clicksToUnitElevation: DataTemplateTranslation
    clicksToUnitWindage: DataTemplateTranslation
    thread: DataTemplateTranslation
    decibelRating: DataTemplateTranslation
    designation: DataTemplateTranslation
    headstamp: DataTemplateTranslation
    lastTopUpAt_unix: DataTemplateTranslation
    criticalStock: DataTemplateTranslation
    barrelLength: DataTemplateTranslation
    bulletType: DataTemplateTranslation
    bulletWeight: DataTemplateTranslation
    footprint: DataTemplateTranslation
}

interface DataTemplateTranslationRemarks {
    remarks: DataTemplateTranslation
}

interface DataTemplateTranslationCheckboxes {
    fullAuto: DataTemplateTranslation
    exFullAuto: DataTemplateTranslation
    highCapacityMagazine: DataTemplateTranslation
    short: DataTemplateTranslation
    launcher: DataTemplateTranslation
    decepticon: DataTemplateTranslation
    blooptoob: DataTemplateTranslation
    grandfather: DataTemplateTranslation
}

export const dataTemplate_Translations: DataTemplateTranslations = {
    "manufacturer": {
        name: "manufacturer",
        de: "Hersteller",
        en: "Manufacturer",
        fr: "Fabricant",
        it: "Produttore",
        ch: "Producent",
    },
    "model" : {
        name: "model",
        de: "Modellbezeichnung",
        en: "Model Name",
        fr: "Désignation du modèle",
        it: "Nome del modello",
        ch: "Designaziun dal model",
    },
    "manufacturingDate": {
        name: "manufacturingDate",
        de: "Herstellungszeitraum",
        en: "Manufacturing Date",
        fr: "Période de fabrication",
        it: "Periodo di produzione",
        ch: "Perioda da producziun",
        
    },
    "originCountry": {
        name: "originCountry",
        de: "Ursprungsland",    
        en: "Origin Country",
        fr: "Pays d'origine",
        it: "Paese di origine",
        ch: "Pajais d'origin",
    },
    "caliber": {
        name: "caliber",
        de: "Kaliber",
        en: "Caliber",
        fr: "Calibre",
        it: "Calibro",
        ch: "Caliber",
    },
    "serial": {   
        name: "serial",
        de: "Seriennummer",
        en: "Serial",
        fr: "Numéro de série",
        it: "Numero di serie",
        ch: "Numer da seria",
    },
    "permit": {
        name: "permit",
        de: "Bewilligung",
        en: "Permit",
        fr: "Permis",
        it: "Permesso",
        ch: "Concessiun",
    },
    "acquisitionDate_unix": {
        name: "acquisitionDate_unix",
        de: "Erwerbsdatum",     
        en: "Acquision Date",
        fr: "Date d'acquisition",
        it: "Data di acquisizione",
        ch: "Data d'acquist",
    },
    "paidPrice": {
        name: "paidPrice",
        de: "Kaufpreis",     
        en: "Price",
        fr: "Prix d'achat",
        it: "Prezzo",
        ch: "Pretsch da cumpra",
    },
    "boughtFrom": {
        name: "boughtFrom",
        de: "Gekauft bei/von",     
        en: "Acquired from",
        fr: "Acquis auprès de/par",
        it: "Acquistati presso/da",
        ch: "Acquistà tar/da",
    },
    "marketValue": {
        name: "marketValue",
        de: "Aktueller Marktwert",
        en: "Current market value",
        fr: "Valeur de marché actuelle",
        it: "Valore di mercato attuale",
        ch: "Valur actuala dal martgà"
    },
    "shotCount": {
        name: "shotCount",
        de: "Schussbelastung",
        en: "Shot count",
        fr: "Compte de tirs",
        it: "Numero di colpi sparati",
        ch: "Chargia da tir",
    },
    "lastShotAt_unix": {
        name: "lastShotAt_unix",
        de: "Zuletzt geschossen",
        en: "Last shot",
        fr: "Derniers tirs",
        it: "Ultimo colpo",
        ch: "L'ultim culp",
    },
    "lastCleanedAt_unix": {
        name: "lastCleanedAt_unix",
        de: "Zuletzt gereinigt",
        en: "Last cleaned",
        fr: "Nettoyé en dernier",
        it: "Ultima pulizia",
        ch: "Il davos purifitgà",
    },
    "cleanInterval": {
        name: "cleanInterval",
        de: "Reinigungsintervall",
        en: "Cleaning interval",
        fr: "Intervalle de nettoyage",
        it: "Intervallo di pulizia",
        ch: "Interval da nettegiar",
    },
    "mainColor": {
        name: "mainColor",
        de: "Hauptfarbe",
        en: "Main Color",
        fr: "Couleur principale",
        it: "Colore principale",
        ch: "Da colur principala",
    },
    "language": {
        name: "language",
        de: "Sprache",
        en: "Language",
        fr: "Langue",
        it: "Lingua",
        ch: "Favella",
    },
    "title": {
        name: "title",
        de: "Titel",
        en: "Title",
        fr: "Titre",
        it: "Titolo",
        ch: "Titel",
    }, 
    "subtitle": {
        name: "subtitle",
        de: "Untertitel",
        en: "Subtitle",
        fr: "Sous-titre",
        it: "Sottotitolo",
        ch: "Sutittel",
    },
    "isbn": {
        name: "isbn",
        de: "ISBN",
        en: "ISBN",
        fr: "ISBN",
        it: "ISBN",
        ch: "ISBN",
    },
    "publishingDate": {
        name: "publishingDate",
        de: "Publikationsdatum",
        en: "Publishing Date",
        fr: "Date de publication",
        it: "Data di pubblicazione",
        ch: "Data da publicaziun",
    },
    "author": {
        name: "author",
        de: "Author",
        en: "Author",
        fr: "Auteur",
        it: "Autore",
        ch: "Autura",
    },
    "publisher": {
        name: "publisher",
        de: "Verlag/Herausgeber",
        en: "Publisher",
        fr: "Éditeur",
        it: "Editore",
        ch: "Editur",
    },
    "edition": {
        name: "edition",
        de: "Auflage",
        en: "Edition",
        fr: "Édition",
        it: "Edizione",
        ch: "Emissiun",
    },
    "series": {
        name: "series",
        de: "Buchreihe",
        en: "Book Series",
        fr: "Collection",
        it: "Collana",
        ch: "Seria",
    },
    "volume": {
        name: "volume",
        de: "Band",
        en: "Volume",
        fr: "Volume",
        it: "Volume",
        ch: "Cudesch",
    },
    "pages": {
        name: "pages",
        de: "Seiten",
        en: "Pages",
        fr: "Pages",
        it: "Pagine",
        ch: "Paginas",
    },
    "format": {
        name: "format",
        de: "Format",
        en: "Format",
        fr: "Format",
        it: "Formato",
        ch: "Format ",
    },
    "lumen":{   
        name: "lumen",
        de: "Lumen",
        en: "Lumen",
        fr: "Lumen",
        it: "Lumen",
        ch: "Lumen",
    },
    "candela":{   
        name: "candela",
        de: "Candela",
        en: "Candela",
        fr: "Candela",
        it: "Candela",
        ch: "Candela",
    },
    "wavelength":{   
        name: "wavelength",
        de: "Wellenlänge Laser",
        en: "Laser Wavelength",
        fr: "Longueur d’onde du laser",
        it: "Lunghezza d’onda del laser",
        ch: "Laser lung d’undada",
    },
    "laserPower":{   
        name: "laserPower",
        de: "Laserstärke",
        en: "Laser Power",
        fr: "Puissance du laser",
        it: "Intensità del laser",
        ch: "Grossezza da laser",
    },
    "batteryLastChangedAt_unix":{
        name: "batteryLastChangedAt_unix",
        de: "Zuletzt gereinigt",
        en: "Last cleaned",
        fr: "Nettoyé en dernier",
        it: "Ultima pulizia",
        ch: "Il davos purifitgà",
    },
    "currentlyMountedOn":{
        name: "currentlyMountedOn",
        de: "Montiert auf",
        en: "Mounted on",
        fr: "Morere sur",
        it: "Montare sole",
        ch: "Va montaschier sur",
    },
    "capacity": {
        name: "capacity",
        de: "Kapazität",
        en: "Capacity",
        fr: "Capacité",
        it: "Capacità",
        ch: "Capacitad ",
    },
    "currentStock": {
        name: "currentStock",
        de: "Aktuelle Menge",
        en: "Current stock",
        fr: "Montant actuel",
        it: "Quantità attuale",
        ch: "Quantitad actuala",
    },
    "reticle": {   
        name: "reticle",
        de: "Absehen",
        en: "Reticle",
        fr: "Réticule",
        it: "Reticolo",
        ch: "Griglia",
    },
    "reticleColor": {   
        name: "reticleColor",
        de: "Absehen Farbe",
        en: "Reticle Color",
        fr: "Couleur du réticule",
        it: "Colore reticolo",
        ch: "Colur da rudella en retagl",
    },
    "zoom": {   
        name: "zoom",
        de: "Vergrösserung",
        en: "Zoom",
        fr: "Agrandissement",
        it: "Ingrandimento",
        ch: "Augment",
    },
    "unit": {   
        name: "unit",
        de: "Verstelleinheit",
        en: "Click Unit",
        fr: "Unité de réglage",
        it: "Unità di regolazione",
        ch: "Sistem da regulaziun",
    },
    "clicksToUnitElevation": {   
        name: "clicksToUnitElevation",
        de: "Höhenverstellung pro Klick",
        en: "Elevation Adjustment per Click",
        fr: "ajustement de l’élévation par clic",
        it: "Rajustement de l’élévation par clic",
        ch: "Regulaziun da l’autezza per clic",
    },
    "clicksToUnitWindage": {   
        name: "clicksToUnitWindage",
        de: "Seitenverstellung pro Klick",
        en: "Windage Adjustment per Click",
        fr: "Ajustement de la dérive par clic",
        it: "Regolazione della deriva per clic",
        ch: "Regulaziun da la direcziun dal vent per in clic",
    },
    "material": {
        name: "material",
        de: "Material",
        en: "Material",
        fr: "La Materiala",
        it: "Il Materiale",
        ch: "Va Materiala",
    },
    "thread": {
        name: "thread",
        de: "Gewinde",
        en: "Threading",
        fr: "Filet",
        it: "Filetto",
        ch: "Crennà",
    },
    "decibelRating": {
        name: "decibelRating",
        de: "Dezibelwert",
        en: "Decibel Rating",
        fr: "Décibels",
        it: "Valore in decibel",
        ch: "Valur decibla",
    },
    "platform": {
        name: "platform",
        de: "Waffenplattform",
        en: "Gun Platform",
        fr: "Plateforme d’armes",
        it: "Piattaforma d’armi",
        ch: "Plattafurma d’armas",
    },
    "headstamp": {
        name: "headstamp",
        de: "Hülsenboden",
        en: "Headstamp",
        fr: "Cachet",
        it: "Punzonatura",
        ch: "Palantschieu sura",
    },
    "criticalStock": {
        name: "criticalStock",
        de: "Kritische Menge",
        en: "Critical stock",
        fr: "Quantité critique",
        it: "Scorta critica",
        ch: "Quantitad critica",
    },
    "designation": {   
        name: "designation",
        de: "Bezeichnung",
        en: "Designation",
        fr: "Désignation",
        it: "Denominazione",
        ch: "Designaziun",
    },
    "lastTopUpAt_unix": {
        name: "lastTopUpAt_unix",
        de: "Letzte Mengenänderung",
        en: "Last change of stock",
        fr: "Dernier changement de quantité",
        it: "Ultima variazione di quantità",
        ch: "Ultima midada da la quantitad",
    },
    "barrelLength": {
        name: "barrelLength",
        de: "Lauflänge",
        en: "Barrel length",
        fr: "Longueur du canon",
        it: "Lunghezza della canna",
        ch: "Lunghezza da la channa",
    },
    "bulletType":{
        name: "bulletType",
        de: "Geschosstyp",
        en: "Bullet type",
        fr: "Type de balle",
        it: "Tipo di proiettile",
        ch: "Tip da culla",
    },
    "bulletWeight":{
        name: "bulletWeight",
        de: "Geschossgewicht",
        en: "Bullet weight",
        fr: "Poids de la balle",
        it: "Peso del proiettile",
        ch: "Pais dal projectil",
    },
    "footprint":{
        name: "footprint",
        de: "Footprint",
        en: "Footprint",
        fr: "Empreinte",
        it: "Impronta",
        ch: "Impronta",
    },
}

export const dataTemplate_TranslationRemarks: DataTemplateTranslationRemarks = {
    "remarks": {
        name: "remarks",
        de: "Bemerkungen",
        en: "Remarks",
        fr: "Remarques",
        it: "Osservazioni",
        ch: "Remartgar",
    },
}

export const dataTemplate_TranslationCheckboxes: DataTemplateTranslationCheckboxes = {
    "fullAuto": {
        name: "fullAuto",
        de: "Seriefeuerwaffe",
        en: "Automatic firearm", 
        fr: "Arme à feu automatique",
        it: "Arma da fuoco automatica",
        ch: "Arma da fieu a seria",
    },
    "exFullAuto": {
        name: "exFullAuto",
        de: "Umgebaute Seriefeuerwaffe",
        en: "Converted automatic firearm", 
        fr: "Arme à feu automatique transformée",
        it: "Arma da fuoco automatica convertita",
        ch: "Arma da fieu a seria transfurmada",
    },
    "highCapacityMagazine": {
        name: "highCapacityMagazine",
        de: "Ladevorrichtung mit hoher Kapazität",
        en: "High Capacity Magazine", 
        fr: "Chargeur de grande capacité",
        it: "Caricatore ad alta capacità",
        ch: "Indriz da chargiar da gronda capacitad",
    },
    "short": {
        name: "short",
        de: "Kürzbar auf unter 60cm",
        en: "Can be shortened to under 60cm", 
        fr: "Peut être raccourci à moins de 60cm",
        it: "Può essere accorciato a meno di 60cm",
        ch: "Per pauc sin main che 60cm",
    },
    "launcher": {
        name: "launcher",
        de: "Militärisches Abschussgerät mit Sprengwirkung",
        en: "Military launching device with explosive effect",
        fr: "Lanceur militaire à effet explosif",
        it: "Ordigni militari con effetto dirompente",
        ch: "Apparats militars cun effect explosiv",
    },
    "decepticon": {
        name: "decepticon",
        de: "Gebrauchsgegenstand vortäuschend",
        en: "Resembling article of everyday use",
        fr: "Imitant un objet d’usage courant",
        it: "Simulano oggetti d’uso corrente",
        ch: "Imitaziun d’in object da diever",
    },
    "blooptoob": {
        name: "blooptoob",
        de: "Granatwerfer als Zusatz zu einer Feuerwaffe",
        en: "Grenade launcher as additional device for a firearm",
        fr: "Lance-grenades d’appoint à une arme à feu",
        it: "Lanciagranate supplementare di un’arma da fuoco",
        ch: "Bittagranatas supplementaras d’ina arma da fieu",
    },
    "grandfather": {
        name: "grandfather",
        de: "Altrechtlich erworben",
        en: "Acquired under old law", 
        fr: "Acquis sous l'ancien régime",
        it: "Acquisito in base alla vecchia legge",
        ch: "Acquistà tenor il dretg vegl",
    },
}