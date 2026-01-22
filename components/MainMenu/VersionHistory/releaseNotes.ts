//TODO: ditch XML, do directly in JSON and wirte an XML translator for the stores, its easier

export interface Version{
    title: string
    de: {text: string, ios: string | null, android: string | null}
    en: {text: string, ios: string | null, android: string | null}
    fr: {text: string, ios: string | null, android: string | null}
    it: {text: string, ios: string | null, android: string | null}
}

export const versionHistory: Version[] = [
  {
    "title": "V4.0.0",
    "de": {
      "text": `Neu:\n- Sammlung: Literatur\n- Neue Felder für Munition, Licht&Laser, Optiken und Verschiedenes\n- Onboarding (setzen von präferierter Währung und Gewichts- und Längenmassen)\n- Hinweis-System\n- Autocomplete\n- Quick Actions: Batteriewechsel und Reinigung\n\nVerbessert:\n- Bilderreihenfolge veränderbar\n- Bilder drehbar\n- Reinigungsintervall überarbeitet\n- Zuletzt gewählte Kaliber in Kaliberauswahl aufgeführt\n\nBehoben:\n- CSV Importe/Exporte nur für Waffen und Munition\n- QuickShot hat angebautes Zubehör nicht berücksichtigt`,
      "ios": null,
      "android": null
    },
    "en": {
      "text": "New:\n- Collection: Literature\n- New fields for Ammunition, Lights&Lasers, Optics, and Miscellaneous\n- Onboarding (setting preferred currency and weight and length units)\n- In-app hint system\n- Autocomplete\n- Quick Actions: Battery replacement and cleaning\n\nImproved:\n- Image order can be changed\n- Images can be rotated\n- Cleaning interval revised\n- Recently selected calibers are now shown in the caliber selection\n\nFixed:\n- CSV imports/exports limited to firearms and ammunition\n- QuickShot now correctly considers attached accessories",
      "ios": null,
      "android": null
    },
    "fr": {
      "text": "Nouveautés:\n- Collection: Littérature\n- Nouveaux champs pour les munitions, lumière&laser, optiques et divers\n- Onboarding (définition de la devise préférée et des unités de poids et de longueur)\n- Système d’astuces intégré à l’application\n- Saisie semi-automatique\n- Actions rapides: remplacement de batterie et nettoyage\nAméliorations:\n- L’ordre des images peut être modifié\n- Rotation des images possible\n- Intervalle de nettoyage révisé\n- Les calibres récemment sélectionnés sont désormais affichés dans la sélection des calibres\nCorrections:\n- Import/export CSV limité aux armes et aux munitions\n- QuickShot prend désormais correctement en compte les accessoires montés",
      "ios": null,
      "android": null
    },
    "it": {
      "text": "Novità:\n- Collezione: Letteratura\n- Nuovi campi per munizioni, luce&laser, ottiche e varie\n- Onboarding (impostazione della valuta preferita e delle unità di peso e lunghezza)\n- Sistema di suggerimenti integrato nell’app\n- Completamento automatico\n- Azioni rapide: sostituzione della batteria e pulizia\nMiglioramenti:\n- L’ordine delle immagini può essere modificato\n- Le immagini possono essere ruotate\n- Intervallo di pulizia rivisto\n- I calibri selezionati di recente sono ora mostrati nella selezione dei calibri\nCorrezioni:\n- Importazione/esportazione CSV limitata ad armi e munizioni\n- QuickShot ora tiene correttamente conto degli accessori montati",
      "ios": null,
      "android": null
    }
  },
  {
    "title": "V2.1.0",
    "de": {
      "text": "Neu:\n- Neue Sammlungskategorie: Zubehör\n- Neue Sammlungskategorie: Waffenbestandteile\n- Zubehör und Bestandteile lassen sich untereinander oder zu einer Waffe zuweisen\n- Kompakte Listenansicht\n\nBehoben:\n- Speichern nur möglich, nachdem ein anderes Eingabefeld ausgewählt wurde\n- Zahlenwerte mit Kommas führten zu kaputten Statistiken\n- Suchfeld in Munitionssamllung nicht sichtbar",
      "ios": null,
      "android": null
    },
    "en": {
      "text": "New:\n- New collection category: Accessories\n- New collection category: Weapon parts\n- Accessories and parts can be linked with each other and to guns\n- Compact list view\n\nFixed:\n- Saving only possible when another input field has been selected first\n- Number values with commas broke statistics\n- Searchfield in ammunition collection not visible",
      "ios": null,
      "android": null
    },
    "fr": {
      "text": "Nouveau:\n- Nouvelle catégorie de collection: Accessoires\n- Nouvelle catégorie de collection: Pièces d’armes\n- Les accessoires et les pièces peuvent être liés entre eux et aux armes\n- Affichage de liste compact\n\nCorrectif:\n- Enregistrement possible uniquement après avoir sélectionné un autre champ de saisie\n- Les valeurs numériques avec des virgules ont perturbé les statistiques\n- Le champ de recherche dans la collection de munitions n’était pas visible",
      "ios": null,
      "android": null
    },
    "it": {
      "text": "Novità:\n- Nuova categoria di collezioni: Accessori\n- Nuova categoria di collezioni: Parti di armi\n- Accessori e parti possono essere collegati tra loro e alle armi\n- Visualizzazione compatta delle liste\n\nRisolti:\n- Salvataggio possibile solo dopo aver selezionato un altro campo di input\n- Valori numerici con virgole che causavano problemi con le statistiche\n- Campo di ricerca nella collezione di munizioni non visibi",
      "ios": null,
      "android": null
    }
  },
  {
    "title": "V2.0.1",
    "de": {
      "text": "- Potentielle Out of Memory Fehler beim Export der Arsenal-Datenbank behoben\n- Fehler behoben bei seltenen Fällen, in denen Sammlungen erst dann angezeigt werden, wenn die Sortierreihenfolge manuell geändert wird",
      "ios": null,
      "android": null
    },
    "en": {
      "text": "- Fixed potential out of memory errors in exporting Arsenal Database \n- Fixed rare occasions where collections are not displayed until sorting order is manually changed",
      "ios": null,
      "android": null
    },
    "fr": {
      "text": "- Correction d'erreurs potentielles de manque de mémoire lors de l'exportation de la base de données Arsenal \n- Correction de cas rares où les collections ne sont pas affichées tant que l'ordre de tri n'est pas manuellement modifié",
      "ios": null,
      "android": null
    },
    "it": {
      "text": "- Corretta la potenziale mancanza di memoria durante l'esportazione della banca dati Arsenal \n- Corretta la rara situazione in cui le collezioni non vengono visualizzate finché l'ordine di ordinamento non viene cambiato manualmente",
      "ios": null,
      "android": null
    }
  },
  {
    "title": "V2.0.0",
    "de": {
      "text": "Völlig überarbeitete interne Datenbankstruktur\n- Legacy-Importer für Arsenal-Datenbank der Version 1\n\nWeitere Änderungen:\n- Konsolidierte Datenbankoptionen im Hauptmenü\n- Nicht korrekt funktionierende Filter behoben\n- Hinzufügung einiger weiterer Sortierarten\n- Die Datenbankimporter sind viel toleranter gegenüber fehlerhaften Daten\n\nWeitere neue Funktionen werden in Version 2.1.0 eingeführt",
      "ios": null,
      "android": null
    },
    "en": {
      "text": "Completely reworked internal database structure\n- Legacy importer for version 1 Arsenal database\n\nOther changes:\n- Consolidated database options in the main menu\n- Fixed some filters that were not working correctly\n- Added some additional sorting options\n- Database importers are much more tolerant to bad data\n\nMore new features will be introduced in version 2.1.0",
      "ios": null,
      "android": null
    },
    "fr": {
      "text": "Structure de la base de données interne entièrement révisée\n- Importateur de version 1 de la base de données Arsenal\n\nAutres modifications:\n- Options de la base de données consolidées dans le menu principal\n- Correction des filtres qui ne fonctionnaient pas correctement\n- Ajout de quelques autres types de tri\n- Les importateurs de base de données sont beaucoup plus tolérants aux données incorrectes\n\nD'autres nouvelles fonctionnalités seront introduites dans la version 2.1.0",
      "ios": null,
      "android": null
    },
    "it": {
      "text": "Struttura di database interna completamente rinnovata\n- Legacy-Importer per la versione 1 del database di Arsenal\n\nAltre modifiche:\n- Opzioni di database consolidate nel menu principale\n- Corretti i filtri che non funzionavano correttamente\n- Aggiunte alcune opzioni di ordinamento\n- I database-importer sono molto più tolleranti nei confronti di dati errati\n\nUlteriori nuove funzionalità saranno introdotte nella versione 2.1.0",
      "ios": null,
      "android": null
    }
  },
  {
    "title": "V1.4.1",
    "de": {
      "text": "Kleinere Fehlerbehebungen",
      "ios": null,
      "android": null
    },
    "en": {
      "text": "Minor bugfixes",
      "ios": null,
      "android": null
    },
    "fr": {
      "text": "Corrections mineures de bogues",
      "ios": null,
      "android": null
    },
    "it": {
      "text": "Correzioni di bug minori",
      "ios": null,
      "android": null
    }
  },
  {
    "title": "V1.4.0",
    "de": {
      "text": "Behoben:\n- Suche mit Sonderzeichen in Munitionsübersicht\n\nNeu:\n- Waffen filtern nach zuletzt geschossen und zuletzt gereinigt",
      "ios": null,
      "android": null
    },
    "en": {
      "text": "Fixed:\n- Search with special characters in ammunition overview\n\nNew:\n- Filter weapons for last shot and last cleaned",
      "ios": null,
      "android": null
    },
    "fr": {
      "text": "Corrigé:\n- Recherche avec des caractères spéciaux dans l'aperçu des munitions\n\nNouveau:\n- Filtrer les armes selon le dernier tir et le dernier nettoyage",
      "ios": null,
      "android": null
    },
    "it": {
      "text": "Risolto:\n- Ricerca con caratteri speciali nella panoramica delle munizioni\n\nNuovo:\n- Le armi filtrano dopo l'ultimo sparo e l'ultimo pulito",
      "ios": null,
      "android": null
    }
  },
  {
    "title": "V1.3.0",
    "de": {
      "text": "Behoben:\n- Datum immer zweistellig\n- Bild teilen fehlerhaft\n- \"Out of Memory\" Fehlermeldung bei Datenbankspeicherung\n\nVerbessert:\n- Kalibersuche überall toleranter\n- Ausgewählte Kaliber in Auswahl direkt löschbar\n- Verkürzte Kaliberbezeichnungen möglich (via Einstellungen)",
      "ios": null,
      "android": null
    },
    "en": {
      "text": "Fixed:\n- Date always in two digits\n- Split image incorrect\n- \"Out of Memory\" error message for database storage\n\nImproved:\n- Calibre search more tolerant everywhere\n- Selected calibers in selection can be erased directly\n- Abbreviated calibre designations possible (via settings)",
      "ios": null,
      "android": null
    },
    "fr": {
      "text": "Corrigé:\n- date toujours à deux chiffres\n- Partage d'image défectueux\n- Message d'erreur \"Out of Memory\" lors du stockage de la base de données\n\nAmélioré:\n- Recherche de calibre plus tolérant partout\n- Calibres sélectionnés dans la sélection directement effaçables\n- Désignations de calibres abrégées possibles (via les réglages)",
      "ios": null,
      "android": null
    },
    "it": {
      "text": "Risolto:\n- Data sempre a due cifre\n- Condivisione immagine errata\n- Messaggio di errore \"Out of Memory\" durante la memorizzazione di una banca dati\n\nMigliorato:\n- Ricerca del calibro più tollerante ovunque\n- Calibri selezionati in selezione eliminabili direttamente\n- Denominazioni di calibro abbreviate possibili (tramite impostazioni)",
      "ios": null,
      "android": null
    }
  },
  {
    "title": "V1.2.3",
    "de": {
      "text": "Code-Änderungen, keine sichtbaren Auswirkungen",
      "ios": "Behoben:\n- Bilder nach Update nicht mehr sichtbar\n- Warnung-Popup für die PDF Funktionen",
      "android": null
    },
    "en": {
      "text": "Code changes, no visible impact",
      "ios": "Fixed:\n- Images not visible after update\n- Warning popup for PDF prints",
      "android": null
    },
    "fr": {
      "text": "Changements de code, aucune incidence visible",
      "ios": "Correction:\n- Images non visibles après la mise à jour\n- Popup d’alerte pour les fonctions PDF",
      "android": null
    },
    "it": {
      "text": "Cambiamenti di codice, nessun impatto visibile",
      "ios": "Risolto:\n- Immagini non più visibili dopo l’aggiornamento\n- Popup di avviso per le funzioni PDF",
      "android": null
    }
  },
  {
    "title": "V1.2.2",
    "de": { "text": "Herobrine entfernt", "ios": null, "android": null },
    "en": { "text": "Removed Herobrine", "ios": null, "android": null },
    "fr": { "text": "Herobrine supprimé", "ios": null, "android": null },
    "it": { "text": "Herobrine rimosso", "ios": null, "android": null }
  },
  {
    "title": "V1.2.1",
    "de": {
      "text": "Behoben:\n- Neues Objekt mit alten Daten\n- Fehlerhafter Farbtext\n- Farbauswahl: Texte teils nicht an Hintergrundfarbe angepasst\n- Unnötige Leerzeichen in Exporten\n- Sortieren nach zuletzt hinzugefügt/zuletzt bearbeitet fehlerhafte Reihenfolge\n- Datumauswahl: Knopf für schnelle Monats- und Jahresauswahl zu wenig sichtbar",
      "ios": null,
      "android": null
    },
    "en": {
      "text": "Fixed:\n- New object with old data\n- Incorrect colour text\n- Colour selection: texts not adapted to background colour\n- Unnecessary spaces in exports\n- Sort by last added/last edited incorrect order\n- Date selection: Button for quick month and year selection not visible enough",
      "ios": null,
      "android": null
    },
    "fr": {
      "text": "Corrigé:\n- Nouvel objet avec d'anciennes données\n- Texte de couleur erroné\n- Choix des couleurs: Textes partiellement non adaptés à la couleur d'arrière-plan\n- Espaces inutiles dans les exportations\n- Tri par dernier ajout/dernier édité ordre erroné\n- Sélection de date: le bouton pour sélection rapide du mois et de l'année est trop peu visible",
      "ios": null,
      "android": null
    },
    "it": {
      "text": "Risolto:\n- Nuovo oggetto con dati vecchi\n- Testo a colori errato\n- Selezione colore: testi non adattati al colore di sfondo\n- Spazi inutili nelle esportazioni\n- Ordina per ultimo aggiunto/ultimo modificato ordine errato\n- Selezione data: pulsante per la selezione rapida del mese e dell' anno troppo poco visibile",
      "ios": null,
      "android": null
    }
  },
  {
    "title": "V1.2.0",
    "de": {
      "text": "Behoben:\n- Abbrechen eines neuen Objekts nicht möglich\n- Lange Schlüsselwörter verursachten Darstellungsfehler im Filtermenü\n- Kalenderwoche begann am Sonntag\n- Waffe: Hauptfarbe nicht löschbar\n- Munition: Aktuelle Menge nicht bearbeitbar\n- Mögliches Einfrieren beim Drucken von Tabellen\n- Negative Mengen bei QuickShot möglich\n\nVerbessert:\n- Farbnamen statt Hex-Code (Englisch)\n- Eingabefeld für Farben\n- Mehr Artikel 5\n- Kalibersuche toleranter\n\nNeu:\n- Luftgewehr/Airsoft Munition\n- Feld für Kaufort\n- Bilder teilen\n- Objekt Klonen (langer Druck in Listenansicht)",
      "ios": null,
      "android": null
    },
    "en": {
      "text": "Fixed:\n- Cancel of new object not possible\n- Long keywords display error filter menu\n- Calendar week starts Sunday\n- Weapon: main colour not deletable\n- Ammunition: Current quantity cannot be edited\n- Potential freezing on spreadsheet printing\n- QuickShot negative quantities possible\n\nImproved:\n- Colour names instead of hex code (English)\n- Input field for colours\n- more Article 5\n- Calibre search more tolerant\nNew:\n- Air rifle/Airsoft ammunition\n- field for place of purchase\n- Share pictures\n- Object Clone (long press in list view)",
      "ios": "- Scrolling opens Dialog Windows\n- Keyboard overlap",
      "android": null
    },
    "fr": {
      "text": "Corrigé:\n- Annulation de la création d’un nouvel objet impossible\n- Les mots-clés longs provoquaient des erreurs d’affichage dans le menu de filtrage\n- La semaine du calendrier commençait le dimanche\n- Arme : couleur principale non supprimable\n- Munitions : quantité actuelle non modifiable\n- Gel potentiel lors de l’impression de tableaux\n- Quantités négatives possibles avec QuickShot\n\nAmélioré:\n- Nom de couleur au lieu du code hexagonal (anglais)\n- Zone de saisie des couleurs\n- Voir article 5\n- recherche de calibre plus tolérant\nNouveau:\n- Fusil à air comprimé/Munitions Airsoft\n- Champ pour le lieu d'achat\n- Partager des images\n- Clonage d'objets (longue impression en vue liste)",
      "ios": null,
      "android": null
    },
    "it": {
      "text": "Risolto:\n- Impossibile annullare la creazione di un nuovo oggetto\n- Parole chiave lunghe causavano errori di visualizzazione nel menu dei filtri\n- La settimana del calendario iniziava di domenica\n- Arma: colore principale non eliminabile\n- Munizioni: quantità attuale non modificabile\n- Possibile blocco durante la stampa dei fogli di calcolo\n- Quantità negative possibili con QuickShot\n\nMigliorato:\n- Nome del colore invece del codice esagonale (Inglese)\n- Campo di inserimento dei colori\n- Più articolo 5\n- Ricerca del calibro più tollerante\nNuovo:\n- Fucili ad aria compressa/Munizioni Airsoft\n- Campo per il luogo di acquisto\n- Condividi immagini\n- Oggetto Clonazione (premere a lungo nella vista a lista)",
      "ios": null,
      "android": null
    }
  },
  {
    "title": "V1.1.0",
    "de": {
      "text": "Behoben:\n- Darstellungsfehler bei Munition ohne Kaliberangabe\n- Neues Sammlungsobjekt wird nicht an richtiger Position eingefügt\n\nVerbessert:\n- Suche schliesst Kaliber mit ein\n\nNeu:\n- Neue Sortieroptionen für Waffen\n- Neues Feld \"Aktueller Marktwert\"\n- Rudimentäre Statistiken",
      "ios": null,
      "android": null
    },
    "en": {
      "text": "Fixed:\n- Display error for ammunition without calibre indication\n- New collection object is not inserted in correct position\n\nImproved:\n- Search includes calibre\n\nNew:\n- New sorting options for weapons\n- New field \"Current Market Value\"\n- Rudimentary statistics",
      "ios": null,
      "android": null
    },
    "fr": {
      "text": "Corrigé:\n- erreur de présentation pour les munitions sans indication de calibre\n- Le nouvel objet de collection n'est pas inséré au bon endroit\n\nAmélioré:\n- La recherche inclut le calibre\n\nNouveau:\n- Nouvelles options de tri des armes\n- Nouveau champ \"Valeur de marché actuelle\"\n- Statistiques rudimentaires",
      "ios": null,
      "android": null
    },
    "it": {
      "text": "Risolto:\n- Errore di rappresentazione delle munizioni senza calibro\n- Impossibilità di inserire il nuovo oggetto nella posizione corretta\n\nMigliorato:\n- La ricerca include i calibri\n\nNuovo:\n- Nuove opzioni di smistamento per le armi\n- Nuova casella \"Valore di mercato attuale\"\n- Statistiche rudimentali",
      "ios": null,
      "android": null
    }
  },
  {
    "title": "BETA 1.2.0-rc",
    "de": {
      "text": "Behoben:\n- Liste merkt sich Scrollposition nicht\n- CSV Import hat Kaliberfeld falsch gesetzt\n- CSV Import hat Status falsch gesetzt\n- Diverse kleinere Darstellungsfehler behoben\n\nVerbessert:\n- Munition mit Kaliber in der Listen-/Kachelansicht\n- Sortierfunktion genauer\n- Farbrahmen um Waffe ansehnlicher\n- Löschfunktion jetzt auch im Bearbeitungsmodus und besser ersichtlich",
      "ios": null,
      "android": null
    },
    "en": {
      "text": "Fixed:\n- List does not remember scroll position\n- CSV import has set caliber field incorrectly\n- CSV import has set status incorrectly\n- Various minor display errors fixed\n\nImproved:\n- Ammunition with caliber in the list/tile view\n- Sorting function more accurate\n- Color frame around weapon more attractive\n- Delete function now also in edit mode and better visible",
      "ios": null,
      "android": null
    },
    "fr": {
      "text": "Correction d'un problème :\n- La liste ne se souvient pas de la position de défilement\n- L'importation CSV ne définissait pas correctement le champ de calibre\n- L'importation CSV a un statut incorrect\n- Correction de diverses petites erreurs d'affichage\n\nAmélioration de l'affichage :\n- Munitions avec calibre dans la vue liste/carreau\n- Fonction de tri plus précise\n- Cadre de couleur plus visible autour de l'arme\n- Fonction d'effacement maintenant aussi en mode édition et plus visible",
      "ios": null,
      "android": null
    },
    "it": {
      "text": "Corretto:\n- L'elenco non ricorda la posizione di scorrimento\n- L'importazione CSV ha impostato il campo calibro in modo errato\n- L'importazione CSV ha uno stato sbagliato\n- Corretti vari errori di visualizzazione minori\n\nMigliorato:\n- Munizioni con calibro nella vista elenco/piastrella\n- Funzione di ordinamento più accurata\n- Cornice di colore intorno all'arma più attraente\n- Funzione di cancellazione ora anche in modalità di modifica e meglio visibile",
      "ios": null,
      "android": null
    }
  },
  {
    "title": "BETA 1.1.1",
    "de": {
      "text": "Behoben: \n- Potentielles Einfrieren der App beim Start\n- Reinigungsintervall auf Waffenliste\n- Galerie-Druck einer Waffe hat Munitionsparameter",
      "ios": null,
      "android": null
    },
    "en": {
      "text": "Fixed: \n- Potential freezing of the app at startup\n- Cleaning interval on weapon list\n- Gallery print of a weapon has ammunition parameters",
      "ios": null,
      "android": null
    },
    "fr": {
      "text": "Correction d'un problème : \n- Gel potentiel de l'application au démarrage\n- Intervalle de nettoyage sur la liste des armes\n- La pression de la galerie d'une arme a des paramètres de munitions",
      "ios": null,
      "android": null
    },
    "it": {
      "text": "Corretto: \n- Possibile blocco dell'applicazione all'avvio\n- Intervallo di pulizia nell'elenco delle armi\n- La stampa della galleria di un'arma contiene i parametri delle munizioni",
      "ios": null,
      "android": null
    }
  },
  {
    "title": "BETA 1.1.0",
    "de": {
      "text": "Neu:\n- Biometrisches Login\n- Leere Felder in Sammlungsobjekten ausblenden\n- Suche in Kaliberauswahl\n- CSV Import mit oder ohne Kopfzeile\n\nBehoben:\n- undefined Objekt bei CSV Import\n- Sortierreihenfolge",
      "ios": null,
      "android": null
    },
    "en": {
      "text": "New:\n- Biometric login\n- Hide empty fields in collection objects\n- Search in caliber selection\n- CSV import with or without header\n\nFixed:\n- undefined object in CSV import\n- Sort order",
      "ios": null,
      "android": null
    },
    "fr": {
      "text": "Nouveau :\n- Connexion biométrique\n- Masquer les champs vides dans les objets de collection\n- Recherche dans la sélection de calibres\n- Importation CSV avec ou sans en-tête\n\nCorrection :\n- Objet non défini lors de l'importation CSV\n- Ordre de tri",
      "ios": null,
      "android": null
    },
    "it": {
      "text": "Nuovo:\n- Accesso biometrico\n- Nascondere i campi vuoti negli oggetti di raccolta\n- Ricerca nella selezione dei calibri\n- Importazione CSV con o senza intestazione\n\nCorretto:\n- Oggetto non definito nell'importazione CSV\n- Ordinamento",
      "ios": null,
      "android": null
    }
  },
  {
    "title": "BETA 1.0.0",
    "de": { 
        "text": "Fehler behoben, der die App abstürzen liess, wenn ein neuer Munitionseintrag erstellt wurde", 
        "ios": null, 
        "android": null 
    },
    "en": { 
        "text": "Fixed bug that crashed the App if a new ammunition entry was created", 
        "ios": null, 
        "android": null 
    },
    "fr": { 
        "text": "Correction d'un bug qui faisait planter l'application si une nouvelle entrée de munitions était créée",
         "ios": null,
         "android": null
    },
    "it": { 
        "text": 
        "Corretto un bug che mandava in crash l'app se veniva creata una nuova voce di munizioni", 
        "ios": null, 
        "android": null
    }
  }
]