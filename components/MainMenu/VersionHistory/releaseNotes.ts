//TODO: ditch XML, do directly in JSON and wirte an XML translator for the stores, its easier

export interface Version {
    title: string
    de: {
        text: string,
        ios: string | null,
        android: string | null
    }
    en: {
        text: string,
        ios: string | null,
        android: string | null
    }
    fr: {
        text: string,
        ios: string | null,
        android: string | null
    }
    it: {
        text: string,
        ios: string | null,
        android: string | null
    }
}

export const versionHistory: Version[] = [
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                           V5.0.0                            |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "V5.0.0",
        de: {
            text: `
Neu:
- Kostenübersicht für Verbrauchsmaterial via QuickStock Funktion
- Lokalisierungsoptionen

Verbessert:
- QuickMount Liste mit Bildern
- Zubehör und Waffenteile zeigen Trägerobjekt in Kachel

Behoben:
Kleinere Anpassungen und Fehlerbehebungen`,
            ios: "",
            android: null
        },
        en: {
            text: `
New: 
- Cost overview for consumables via QuickStock function
- Localization options

Improved:
- QuickMount list with images
- Accessories and parts show root object on tile

Fixed:
Minor improvements and bug fixes
`,
            ios: null,
            android: null
        },
        fr: {
            text: `
Nouveau :
- Aperçu des coûts pour le matériel consommable via la fonction QuickStock
- Options de localisation

Amélioré :
- Liste QuickMount avec images
- Les accessoires et pièces d'armes affichent l'objet porteur sur la vignette

Corrigé :
Ajustements mineurs et corrections de bugs
`,
            ios: null,
            android: null
        },
        it: {
            text: `
Novità:
- Panoramica dei costi per il materiale di consumo tramite la funzione QuickStock
- Opzioni di localizzazione

Migliorato:
- Elenco QuickMount con immagini
- Accessori e parti d'arma mostrano l'oggetto portante nella scheda

Corretto:
Piccoli miglioramenti e correzioni di bug
`,
            ios: null,
            android: null
        }
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                           V4.4.0                            |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "V4.4.0",
        de: {
            text: `
Neu:
- Neue Sammlungen: Geschosse, Hülsen, Zündhütchen und Pulver
- Diverse Schwarzpulver-Kaliber hinzugefügt

Behoben: 
Kleinere Anpassungen und Fehlerbehebungen
`,
            ios: "Behoben: Bilder konnten nicht nachträglich bearbeitet werden",
            android: null
        },
        en: {
            text: `
New:
- New collections: Bullets, Cases, Primers and Powder
- Added various black powder calibers

Fixed: 
Minor improvements and bug fixes`,
            ios: null,
            android: null
        },
        fr: {
            text: `
Nouveau:
- Nouvelles collections: Projectiles, Douilles, Amorces et Poudre
- Ajout de plusieurs calibres à poudre noire

Corrigé: 
Ajustements mineurs et corrections de bugs`,
            ios: null,
            android: null
        },
        it: {
            text: `
Novità::
- Nuove collezioni: Proiettili, Bossoli, Inneschi e Polvere
- Aggiunti diversi calibri a polvere nera

Corretto: 
Piccoli miglioramenti e correzioni di bug`,
            ios: null,
            android: null
        }
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                           V4.3.0                            |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "V4.3.0",
        de: {
            text: `
Neu:
- Verlauf für jeden Eintrag
- Markieren von Eintrag als "verkauft"
- PDFs sortiert wie in App
- App merkt sich zuletzt angesehene Sammlung beim Schliessen
- Kleinere Verbesserungen und neue Kaliber
- Aufforderung zur Bewertung :)

Behoben:
- Artikel-5-PDFs ohne Legende
- Kleinere Fehlerbehebungen
`,
            ios: null,
            android: null
        },
        en: {
            text: `
Fixed:
- Article 5 PDFs without legend
- Minor bug fixes

New:
- History for every entry
- Mark entries as "sold"
- PDFs sorted like in the app
- App remembers the last viewed collection when closing
- Minor improvements and new calibers
- Rating prompt :)`,
            ios: null,
            android: null
        },
        fr: {
            text: `
Corrigé:
- PDFs Article 5 sans légende
- Corrections mineures
Nouveautés:
- Historique pour chaque entrée
- Marquer une entrée comme "vendue"
- PDFs triés comme dans l’application
- L’application mémorise la dernière collection consultée à la fermeture
- Améliorations mineures et nouveaux calibres
- Demande d’évaluation :)`,
            ios: null,
            android: null
        },
        it: {
            text: `
Corretto:
- PDF Articolo 5 senza legenda
- Correzioni minori

Novità:
- Cronologia per ogni voce
- Contrassegnare una voce come "venduta"
- PDF ordinati come nell’app
- L’app ricorda l’ultima collezione visualizzata alla chiusura
- Miglioramenti minori e nuovi calibri
- Richiesta di valutazione :)`,
            ios: null,
            android: null
        },
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                           V4.2.0                            |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "V4.2.0",
        de: {
            text: `
Behoben:
- Datenbankexport hat Bilder ignoriert
- Autocomplete wurde durch Tastatur verdeckt
- Cache Overflow mit Kamerafunktion
- Schlagworte bei Literatur nicht gespeichert

Neu:
- PDF Exporte mit selbst wählbaren Attributen für alle Sammlungen
- Neue Sammlung: Wiederladen - Matrizen`,
            ios: null,
            android: null
        },
        en: {
            text: `
Fixed:
- Database export was ignoring images
- Autocomplete was hidden behind keyboard
- Cache overflow with camera function
- Keywords not being saved for literature entries

New:
- PDF exports with selectable attributes for all collections
- New collection: Reloading - Dies`,
            ios: null,
            android: null
        },
        fr: {
            text: `
Corrigé:
- L'export de la base de données ignorait les images
- La saisie automatique était masquée par le clavier
- Débordement du cache avec la fonction appareil photo
- Les mots-clés des entrées bibliographiques n'étaient pas enregistrés

Nouveautés:
- Exports PDF avec attributs sélectionnables pour toutes les collections
- Nouvelle collection: Rechargement - Matrices`,
            ios: null,
            android: null
        },
        it: {
            text: `
Corretto:
- L'esportazione del database ignorava le immagini
- Il completamento automatico era nascosto dalla tastiera
- Overflow della cache con la funzione fotocamera
- Le parole chiave delle voci bibliografiche non venivano salvate

Novità:
- Esportazioni PDF con attributi selezionabili per tutte le collezioni
- Nuova collezione: Ricarica - Matrici`,
            ios: null,
            android: null
        }
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                           V4.1.1                            |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "V4.1.1",
        de: {
            text: `
Behoben:
- Daten in QR Etiketten wurden als Unix Zeitstempel statt lokalisiertem Datumsformat angezeigt
-Leere Artikel 5 Kästchen wurden angezeigt, obwohl "leere Felder in Einträgen ausblenden" eingeschaltet war
- Möglichkeit, Etikettengitteranzeige auszuschalten fehlte`,
            ios: null,
            android: null
        },
        en: {
            text: `
Fixed:
- Dates in QR labels were shown as Unix timestamps instead of localized date format
- Empty article 5 boxes were shown even if “hide empty fields in entries” was turned on
- Option to turn off label grid display was missing`,
            ios: null,
            android: null
        },
        fr: {
            text: `
Correction:
- Les dates dans les étiquettes QR étaient affichées en tant que timestamp Unix au lieu d’un format de date localisé
- Des cases vides de 5 articles étaient affichées même si l’option «Masquer les cases vides dans les entrées» était activée
- Il n’était pas possible de désactiver l’affichage des grilles d’étiquettes`,
            ios: null,
            android: null
        },
        it: {
            text: `
Risolto:
- Le date nelle etichette QR venivano visualizzate come timbri temporali Unix invece che nel formato di data locale
- Quando era attivata l’opzione «Nascondi i campi vuoti nelle voci», venivano visualizzati 5 campi vuoti
- Mancava la possibilità di disattivare la visualizzazione della griglia delle etichette`,
            ios: null,
            android: null
        }
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                           V4.1.0                            |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "V4.1.0",
        de: {
            text: `
QR Codes integriert:
- Eigene bestehende QR Codes können Einträgen zugewiesen werden
- Direkte Navigation zu Eintrag durch Scannen von zugewiesenem QR Code
- Generierung von QR Codes für Einträge direkt in der App zum Ausdrucken auf Etikettpapier
- Vorgefertigte Etikettformate und Möglichkeit zur definierung eigener Formate`,
            ios: null,
            android: null
        },
        en: {
            text: `
QR Codes integrated:
- Existing QR Codes can be assigned to entries
- Direct navigation to entry by scanning the assigned QR Code
- Generation of QR Codes for entries directly in the app for printing on label paper
- Pre-made label formats and the possibility to define your own formats`,
            ios: null,
            android: null
        },
        fr: {
            text: `
Codes QR intégrés: 
- Possibilité d’attribuer vos propres codes QR existants aux entrées
- Navigation directe vers une entrée en scannant le code QR attribué
- Génération de codes QR pour les entrées directement dans l’application pour impression sur papier autocollant
- Modèles d’étiquettes prédéfinis et possibilité de créer vos propres modèles`,
            ios: null,
            android: null
        },
        it: {
            text: `
QR Code integrati:
- Possibilità di assegnare QR Code esistenti agli articoli
- Navigazione diretta all’articolo scansionando il QR Code assegnato
- Generazione di QR Code per gli articoli direttamente dall’app per la stampa su etichette
- Formati di etichette predefiniti e possibilità di definire formati personalizzati`,
            ios: null,
            android: null
        }
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                           V4.0.1                            |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "V4.0.1",
        de: {
            text: `
Behoben:
-App stürtzt ab wenn Schlagwort bei neuem Eintrag gewählt wird
-Statistiken: Anzahl verschiedener Kaliber inkorrekt

Verbessert:
-Statistiken: Bei inkorrekten Daten wird ein Hinweis angezeigt, welcher zeigt wo die inkorrekten Daten sind`,
            ios: null,
            android: null
        },
        en: {
            text: `
Fixed:
-App crashes if tag is selected on anew entry
-Statistics: Number of different Calibers not correct

Improved:
-Statistics: If there is incorrect data, a visual hint is displayed which shows where the incorrect data is`,
            ios: null,
            android: null
        },
        fr: {
            text: `
Corrigé:
-L'application se bloque si un mot-clé est sélectionné dans une nouvelle entrée
-Statistiques: Nombre de calibres différents incorrect

Amélioré:
-Statistiques: Si des données sont incorrectes, un indice visuel est affiché indiquant où se trouvent les données incorrectes`,
            ios: null,
            android: null
        },
        it: {
            text: `
Corretto:
-L'app si blocca se viene selezionata una parola chiave in una nuova voce
-Statistiche: Numero di calibri diversi non corretto

Migliorato:
-Statistiche: Se ci sono dati errati, viene mostrato un suggerimento visivo che indica dove si trovano i dati errati`,
            ios: null,
            android: null
        }
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                           V4.0.0                            |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "V4.0.0",
        de: {
            text: `
Neu:
- Sammlung: Literatur
- Neue Felder für Munition, Licht&Laser, Optiken und Verschiedenes
- Onboarding (setzen von präferierter Währung und Gewichts- und Längenmassen)
- Hinweis-System
- Autocomplete
- Quick Actions: Batteriewechsel und Reinigung

Verbessert:
- Bilderreihenfolge veränderbar
- Bilder drehbar
- Reinigungsintervall überarbeitet
- Zuletzt gewählte Kaliber in Kaliberauswahl aufgeführt

Behoben:
- CSV Importe/Exporte nur für Waffen und Munition
- QuickShot hat angebautes Zubehör nicht berücksichtigt`,
            ios: null,
            android: null
        },
        en: {
            text: `
New:
- Collection: Literature
- New fields for Ammunition, Lights&Lasers, Optics, and Miscellaneous
- Onboarding (setting preferred currency and weight and length units)
- In-app hint system
- Autocomplete
- Quick Actions: Battery replacement and cleaning

Improved:
- Image order can be changed
- Images can be rotated
- Cleaning interval revised
- Recently selected calibers are now shown in the caliber selection

Fixed:
- CSV imports/exports limited to firearms and ammunition
- QuickShot now correctly considers attached accessories`,
            ios: null,
            android: null
        },
        fr: {
            text: `
Nouveautés:
- Collection: Littérature
- Nouveaux champs pour les munitions, lumière&laser, optiques et divers
- Onboarding (définition de la devise préférée et des unités de poids et de longueur)
- Système d’astuces intégré à l’application
- Saisie semi-automatique
- Actions rapides: remplacement de batterie et nettoyage

Améliorations:
- L’ordre des images peut être modifié
- Rotation des images possible
- Intervalle de nettoyage révisé
- Les calibres récemment sélectionnés sont désormais affichés dans la sélection des calibres

Corrections:
- Import/export CSV limité aux armes et aux munitions
- QuickShot prend désormais correctement en compte les accessoires montés`,
            ios: null,
            android: null
        },
        it: {
            text: `
Novità:
- Collezione: Letteratura
- Nuovi campi per munizioni, luce&laser, ottiche e varie
- Onboarding (impostazione della valuta preferita e delle unità di peso e lunghezza)
- Sistema di suggerimenti integrato nell’app
- Completamento automatico
- Azioni rapide: sostituzione della batteria e pulizia
Miglioramenti:
- L’ordine delle immagini può essere modificato
- Le immagini possono essere ruotate
- Intervallo di pulizia rivisto
- I calibri selezionati di recente sono ora mostrati nella selezione dei calibri
Correzioni:
- Importazione/esportazione CSV limitata ad armi e munizioni
- QuickShot ora tiene correttamente conto degli accessori montati`,
            ios: null,
            android: null
        }
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                           V3.0.0                            |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "V3.0.0",
        de: {
            text: `
Neu:
- Neue Sammlungskategorie: Zubehör
- Neue Sammlungskategorie: Waffenbestandteile
- Zubehör und Bestandteile lassen sich untereinander oder zu einer Waffe zuweisen
- Kompakte Listenansicht

Behoben:
- Speichern nur möglich, nachdem ein anderes Eingabefeld ausgewählt wurde
- Zahlenwerte mit Kommas führten zu kaputten Statistiken
- Suchfeld in Munitionssamllung nicht sichtbar`,
            ios: null,
            android: null
        },
        en: {
            text: `
New:
- New collection category: Accessories
- New collection category: Weapon parts
- Accessories and parts can be linked with each other and to guns
- Compact list view

Fixed:
- Saving only possible when another input field has been selected first
- Number values with commas broke statistics
- Searchfield in ammunition collection not visible`,
            ios: null,
            android: null
        },
        fr: {
            text: `
Nouveau:
- Nouvelle catégorie de collection: Accessoires
- Nouvelle catégorie de collection: Pièces d’armes
- Les accessoires et les pièces peuvent être liés entre eux et aux armes
- Affichage de liste compact

Correctif:
- Enregistrement possible uniquement après avoir sélectionné un autre champ de saisie
- Les valeurs numériques avec des virgules ont perturbé les statistiques
- Le champ de recherche dans la collection de munitions n’était pas visible`,
            ios: null,
            android: null
        },
        it: {
            text: `
Novità:
- Nuova categoria di collezioni: Accessori
- Nuova categoria di collezioni: Parti di armi
- Accessori e parti possono essere collegati tra loro e alle armi
- Visualizzazione compatta delle liste

Risolti:
- Salvataggio possibile solo dopo aver selezionato un altro campo di input
- Valori numerici con virgole che causavano problemi con le statistiche
- Campo di ricerca nella collezione di munizioni non visibi`,
            ios: null,
            android: null
        }
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                           V2.0.1                            |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "V2.0.1",
        de: {
            text: `
- Potentielle Out of Memory Fehler beim Export der Arsenal-Datenbank behoben
- Fehler behoben bei seltenen Fällen, in denen Sammlungen erst dann angezeigt werden, wenn die Sortierreihenfolge manuell geändert wird`,
            ios: null,
            android: null
        },
        en: {
            text: `
- Fixed potential out of memory errors in exporting Arsenal Database 
- Fixed rare occasions where collections are not displayed until sorting order is manually changed`,
            ios: null,
            android: null
        },
        fr: {
            text: `
- Correction d'erreurs potentielles de manque de mémoire lors de l'exportation de la base de données Arsenal 
- Correction de cas rares où les collections ne sont pas affichées tant que l'ordre de tri n'est pas manuellement modifié`,
            ios: null,
            android: null
        },
        it: {
            text: `
- Corretta la potenziale mancanza di memoria durante l'esportazione della banca dati Arsenal 
- Corretta la rara situazione in cui le collezioni non vengono visualizzate finché l'ordine di ordinamento non viene cambiato manualmente`,
            ios: null,
            android: null
        }
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                           V2.0.0                            |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "V2.0.0",
        de: {
            text: `
Völlig überarbeitete interne Datenbankstruktur
- Legacy-Importer für Arsenal-Datenbank der Version 1

Weitere Änderungen:
- Konsolidierte Datenbankoptionen im Hauptmenü
- Nicht korrekt funktionierende Filter behoben
- Hinzufügung einiger weiterer Sortierarten
- Die Datenbankimporter sind viel toleranter gegenüber fehlerhaften Daten

Weitere neue Funktionen werden in Version 2.1.0 eingeführt`,
            ios: null,
            android: null
        },
        en: {
            text: `
Completely reworked internal database structure
- Legacy importer for version 1 Arsenal database

Other changes:
- Consolidated database options in the main menu
- Fixed some filters that were not working correctly
- Added some additional sorting options
- Database importers are much more tolerant to bad data

More new features will be introduced in version 2.1.0`,
            ios: null,
            android: null
        },
        fr: {
            text: `
Structure de la base de données interne entièrement révisée
- Importateur de version 1 de la base de données Arsenal

Autres modifications:
- Options de la base de données consolidées dans le menu principal
- Correction des filtres qui ne fonctionnaient pas correctement
- Ajout de quelques autres types de tri
- Les importateurs de base de données sont beaucoup plus tolérants aux données incorrectes

D'autres nouvelles fonctionnalités seront introduites dans la version 2.1.0`,
            ios: null,
            android: null
        },
        it: {
            text: `
Struttura di database interna completamente rinnovata
- Legacy-Importer per la versione 1 del database di Arsenal

Altre modifiche:
- Opzioni di database consolidate nel menu principale
- Corretti i filtri che non funzionavano correttamente
- Aggiunte alcune opzioni di ordinamento
- I database-importer sono molto più tolleranti nei confronti di dati errati

Ulteriori nuove funzionalità saranno introdotte nella versione 2.1.0`,
            ios: null,
            android: null
        }
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                           V1.4.1                            |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "V1.4.1",
        de: {
            text: `
Kleinere Fehlerbehebungen`,
            ios: null,
            android: null
        },
        en: {
            text: `
Minor bugfixes`,
            ios: null,
            android: null
        },
        fr: {
            text: `
Corrections mineures de bogues`,
            ios: null,
            android: null
        },
        it: {
            text: `
Correzioni di bug minori`,
            ios: null,
            android: null
        }
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                           V1.4.0                            |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "V1.4.0",
        de: {
            text: `
Behoben:
- Suche mit Sonderzeichen in Munitionsübersicht

Neu:
- Waffen filtern nach zuletzt geschossen und zuletzt gereinigt`,
            ios: null,
            android: null
        },
        en: {
            text: `
Fixed:
- Search with special characters in ammunition overview

New:
- Filter weapons for last shot and last cleaned`,
            ios: null,
            android: null
        },
        fr: {
            text: `
Corrigé:
- Recherche avec des caractères spéciaux dans l'aperçu des munitions

Nouveau:
- Filtrer les armes selon le dernier tir et le dernier nettoyage`,
            ios: null,
            android: null
        },
        it: {
            text: `
Risolto:
- Ricerca con caratteri speciali nella panoramica delle munizioni

Nuovo:
- Le armi filtrano dopo l'ultimo sparo e l'ultimo pulito`,
            ios: null,
            android: null
        }
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                           V1.3.0                            |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "V1.3.0",
        de: {
            text: `
Behoben:
- Datum immer zweistellig
- Bild teilen fehlerhaft
- "Out of Memory" Fehlermeldung bei Datenbankspeicherung
Verbessert:
- Kalibersuche überall toleranter
- Ausgewählte Kaliber in Auswahl direkt löschbar
- Verkürzte Kaliberbezeichnungen möglich (via Einstellungen)
`,
            ios: null,
            android: null
        },
        en: {
            text: `
Fixed:
- Date always in two digits
- Split image incorrect
- "Out of Memory" error message for database storage

Improved:
- Calibre search more tolerant everywhere
- Selected calibers in selection can be erased directly
- Abbreviated calibre designations possible (via settings)
`,
            ios: null,
            android: null
        },
        fr: {
            text: `
Corrigé:
- date toujours à deux chiffres
- Partage d'image défectueux
- Message d'erreur "Out of Memory" lors du stockage de la base de données

Amélioré:
- Recherche de calibre plus tolérant partout
- Calibres sélectionnés dans la sélection directement effaçables
- Désignations de calibres abrégées possibles (via les réglages)
`,
            ios: null,
            android: null
        },
        it: {
            text: `
Risolto:
- Data sempre a due cifre
- Condivisione immagine errata
- Messaggio di errore "Out of Memory" durante la memorizzazione di una banca dati

Migliorato:
- Ricerca del calibro più tollerante ovunque
- Calibri selezionati in selezione eliminabili direttamente
- Denominazioni di calibro abbreviate possibili (tramite impostazioni)
`,
            ios: null,
            android: null
        }
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                           V1.2.3                            |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "V1.2.3",
        de: {
            text: `
Code-Änderungen, keine sichtbaren Auswirkungen`,
            ios: `
Behoben:
- Bilder nach Update nicht mehr sichtbar
- Warnung-Popup für die PDF Funktionen`,
            android: null
        },
        en: {
            text: `
Code changes, no visible impact`,
            ios: `
Fixed:
- Images not visible after update
- Warning popup for PDF prints`,
            android: null
        },
        fr: {
            text: `
Changements de code, aucune incidence visible`,
            ios: `
Correction:
- Images non visibles après la mise à jour
- Popup d’alerte pour les fonctions PDF`,
            android: null
        },
        it: {
            text: `
Cambiamenti di codice, nessun impatto visibile`,
            ios: `
Risolto:
- Immagini non più visibili dopo l’aggiornamento
- Popup di avviso per le funzioni PDF`,
            android: null
        }
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                           V1.2.2                            |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "V1.2.2",
        de: {
            text: `
Herobrine entfernt`,
            ios: null,
            android: null
        },
        en: {
            text: `
Removed Herobrine`,
            ios: null,
            android: null
        },
        fr: {
            text: `
Herobrine supprimé`,
            ios: null,
            android: null
        },
        it: {
            text: `
Herobrine rimosso
`,
            ios: null,
            android: null
        }
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                           V1.2.1                            |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "V1.2.1",
        de: {
            text: `
Behoben:
- Neues Objekt mit alten Daten
- Fehlerhafter Farbtext
- Farbauswahl: Texte teils nicht an Hintergrundfarbe angepasst
- Unnötige Leerzeichen in Exporten
- Sortieren nach zuletzt hinzugefügt/zuletzt bearbeitet fehlerhafte Reihenfolge
- Datumauswahl: Knopf für schnelle Monats- und Jahresauswahl zu wenig sichtbar
`,
            ios: null,
            android: null
        },
        en: {
            text: `
Fixed:
- New object with old data
- Incorrect colour text
- Colour selection: texts not adapted to background colour
- Unnecessary spaces in exports
- Sort by last added/last edited incorrect order
- Date selection: Button for quick month and year selection not visible enough
`,
            ios: null,
            android: null
        },
        fr: {
            text: `
Corrigé:
- Nouvel objet avec d'anciennes données
- Texte de couleur erroné
- Choix des couleurs: Textes partiellement non adaptés à la couleur d'arrière-plan
- Espaces inutiles dans les exportations
- Tri par dernier ajout/dernier édité ordre erroné
- Sélection de date: le bouton pour sélection rapide du mois et de l'année est trop peu visible
`,
            ios: null,
            android: null
        },
        it: {
            text: `
Risolto:
- Nuovo oggetto con dati vecchi
- Testo a colori errato
- Selezione colore: testi non adattati al colore di sfondo
- Spazi inutili nelle esportazioni
- Ordina per ultimo aggiunto/ultimo modificato ordine errato
- Selezione data: pulsante per la selezione rapida del mese e dell' anno troppo poco visibile
`,
            ios: null,
            android: null
        }
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                           V1.2.0                            |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "V1.2.0",
        de: {
            text: `
Behoben:
- Abbrechen eines neuen Objekts nicht möglich
- Lange Schlüsselwörter verursachten Darstellungsfehler im Filtermenü
- Kalenderwoche begann am Sonntag
- Waffe: Hauptfarbe nicht löschbar
- Munition: Aktuelle Menge nicht bearbeitbar
- Mögliches Einfrieren beim Drucken von Tabellen
- Negative Mengen bei QuickShot möglich

Verbessert:
- Farbnamen statt Hex-Code (Englisch)
- Eingabefeld für Farben
- Mehr Artikel 5
- Kalibersuche toleranter

Neu:
- Luftgewehr/Airsoft Munition
- Feld für Kaufort
- Bilder teilen
- Objekt Klonen (langer Druck in Listenansicht)
`,
            ios: null,
            android: null
        },
        en: {
            text: `
Fixed:
- Cancel of new object not possible
- Long keywords display error filter menu
- Calendar week starts Sunday
- Weapon: main colour not deletable
- Ammunition: Current quantity cannot be edited
- Potential freezing on spreadsheet printing
- QuickShot negative quantities possible

Improved:
- Colour names instead of hex code (English)
- Input field for colours
- more Article 5
- Calibre search more tolerant

New:
- Air rifle/Airsoft ammunition
- field for place of purchase
- Share pictures
- Object Clone (long press in list view)
`,
            ios: `
- Scrolling opens Dialog Windows
- Keyboard overlap
`,
            android: null
        },
        fr: {
            text: `
Corrigé:
- Annulation de la création d’un nouvel objet impossible
- Les mots-clés longs provoquaient des erreurs d’affichage dans le menu de filtrage
- La semaine du calendrier commençait le dimanche
- Arme : couleur principale non supprimable
- Munitions : quantité actuelle non modifiable
- Gel potentiel lors de l’impression de tableaux
- Quantités négatives possibles avec QuickShot

Amélioré:
- Nom de couleur au lieu du code hexagonal (anglais)
- Zone de saisie des couleurs
- Voir article 5
- recherche de calibre plus tolérant

Nouveau:
- Fusil à air comprimé/Munitions Airsoft
- Champ pour le lieu d'achat
- Partager des images
- Clonage d'objets (longue impression en vue liste)
`,
            ios: null,
            android: null
        },
        it: {
            text: `
Risolto:
- Impossibile annullare la creazione di un nuovo oggetto
- Parole chiave lunghe causavano errori di visualizzazione nel menu dei filtri
- La settimana del calendario iniziava di domenica
- Arma: colore principale non eliminabile
- Munizioni: quantità attuale non modificabile
- Possibile blocco durante la stampa dei fogli di calcolo
- Quantità negative possibili con QuickShot

Migliorato:
- Nome del colore invece del codice esagonale (Inglese)
- Campo di inserimento dei colori
- Più articolo 5
- Ricerca del calibro più tollerante

Nuovo:
- Fucili ad aria compressa/Munizioni Airsoft
- Campo per il luogo di acquisto
- Condividi immagini
- Oggetto Clonazione (premere a lungo nella vista a lista)
`,
            ios: null,
            android: null
        }
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                           V1.1.0                            |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "V1.1.0",
        de: {
            text: `
Behoben:
- Darstellungsfehler bei Munition ohne Kaliberangabe
- Neues Sammlungsobjekt wird nicht an richtiger Position eingefügt

Verbessert:
- Suche schliesst Kaliber mit ein

Neu:
- Neue Sortieroptionen für Waffen
- Neues Feld "Aktueller Marktwert"
- Rudimentäre Statistiken
`,
            ios: null,
            android: null
        },
        en: {
            text: `
Fixed:
- Display error for ammunition without calibre indication
- New collection object is not inserted in correct position

Improved:
- Search includes calibre

New:
- New sorting options for weapons
- New field "Current Market Value"
- Rudimentary statistics
`,
            ios: null,
            android: null
        },
        fr: {
            text: `
Corrigé:
- erreur de présentation pour les munitions sans indication de calibre
- Le nouvel objet de collection n'est pas inséré au bon endroit

Amélioré:
- La recherche inclut le calibre

Nouveau:
- Nouvelles options de tri des armes
- Nouveau champ "Valeur de marché actuelle"
- Statistiques rudimentaires
`,
            ios: null,
            android: null
        },
        it: {
            text: `
Risolto:
- Errore di rappresentazione delle munizioni senza calibro
- Impossibilità di inserire il nuovo oggetto nella posizione corretta

Migliorato:
- La ricerca include i calibri

Nuovo:
- Nuove opzioni di smistamento per le armi
- Nuova casella "Valore di mercato attuale" 
- Statistiche rudimentali
`,
            ios: null,
            android: null
        }
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                   BETA V1.2.0-rc                            |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "BETA 1.2.0-rc",
        de: {
            text: `
Behoben:
- Liste merkt sich Scrollposition nicht
- CSV Import hat Kaliberfeld falsch gesetzt
- CSV Import hat Status falsch gesetzt
- Diverse kleinere Darstellungsfehler behoben

Verbessert:
- Munition mit Kaliber in der Listen-/Kachelansicht
- Sortierfunktion genauer
- Farbrahmen um Waffe ansehnlicher
- Löschfunktion jetzt auch im Bearbeitungsmodus und besser ersichtlich
`,
            ios: null,
            android: null
        },
        en: {
            text: `
Fixed:
- List does not remember scroll position
- CSV import has set caliber field incorrectly
- CSV import has set status incorrectly
- Various minor display errors fixed

Improved:
- Ammunition with caliber in the list/tile view
- Sorting function more accurate
- Color frame around weapon more attractive
- Delete function now also in edit mode and better visible
`,
            ios: null,
            android: null
        },
        fr: {
            text: `
Correction d'un problème:
- La liste ne se souvient pas de la position de défilement
- L'importation CSV ne définissait pas correctement le champ de calibre
- L'importation CSV a un statut incorrect
- Correction de diverses petites erreurs d'affichage

Amélioration de l'affichage :
- Munitions avec calibre dans la vue liste/carreau
- Fonction de tri plus précise
- Cadre de couleur plus visible autour de l'arme
- Fonction d'effacement maintenant aussi en mode édition et plus visible
`,
            ios: null,
            android: null
        },
        it: {
            text: `
Corretto:\n- L'elenco non ricorda la posizione di scorrimento\n- L'importazione CSV ha impostato il campo calibro in modo errato\n- L'importazione CSV ha uno stato sbagliato\n- Corretti vari errori di visualizzazione minori\n\nMigliorato:\n- Munizioni con calibro nella vista elenco/piastrella\n- Funzione di ordinamento più accurata\n- Cornice di colore intorno all'arma più attraente\n- Funzione di cancellazione ora anche in modalità di modifica e meglio visibile
`,
            ios: null,
            android: null
        }
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                         BETA 1.1.1                          |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "BETA 1.1.1",
        de: {
            text: `
Behoben:
- Potentielles Einfrieren der App beim Start
- Reinigungsintervall auf Waffenliste
- Galerie-Druck einer Waffe hat Munitionsparameter
`,
            ios: null,
            android: null
        },
        en: {
            text: `
Fixed: 
- Potential freezing of the app at startup
- Cleaning interval on weapon list
- Gallery print of a weapon has ammunition parameters
`,
            ios: null,
            android: null
        },
        fr: {
            text: `
Correction d'un problème: 
- Gel potentiel de l'application au démarrage
- Intervalle de nettoyage sur la liste des armes
- La pression de la galerie d'une arme a des paramètres de munitions
`,
            ios: null,
            android: null
        },
        it: {
            text: `
Corretto:
- Possibile blocco dell'applicazione all'avvio
- Intervallo di pulizia nell'elenco delle armi
- La stampa della galleria di un'arma contiene i parametri delle munizioni
`,
            ios: null,
            android: null
        }
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                        BETA 1.1.0                           |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "BETA 1.1.0",
        de: {
            text: `
Neu:
- Biometrisches Login
- Leere Felder in Sammlungsobjekten ausblenden
- Suche in Kaliberauswahl
- CSV Import mit oder ohne Kopfzeile

Behoben:
- undefined Objekt bei CSV Import
- Sortierreihenfolge
`,
            ios: null,
            android: null
        },
        en: {
            text: `
New:
- Biometric login
- Hide empty fields in collection objects
- Search in caliber selection
- CSV import with or without header

Fixed:
- undefined object in CSV import
- Sort order
`,
            ios: null,
            android: null
        },
        fr: {
            text: `
Nouveau:
- Connexion biométrique
- Masquer les champs vides dans les objets de collection
- Recherche dans la sélection de calibres
- Importation CSV avec ou sans en-tête

Correction:
- Objet non défini lors de l'importation CSV
- Ordre de tri
`,
            ios: null,
            android: null
        },
        it: {
            text: `
Nuovo:
- Accesso biometrico
- Nascondere i campi vuoti negli oggetti di raccolta
- Ricerca nella selezione dei calibri
- Importazione CSV con o senza intestazione
Corretto:
- Oggetto non definito nell'importazione CSV
- Ordinamento
`,
            ios: null,
            android: null
        }
    },
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |                          BETA 1.0.0                         |
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    {
        title: "BETA 1.0.0",
        de: {
            text: `
Fehler behoben, der die App abstürzen liess, wenn ein neuer Munitionseintrag erstellt wurde
`,
            ios: null,
            android: null
        },
        en: {
            text: `
Fixed bug that crashed the App if a new ammunition entry was created
`,
            ios: null,
            android: null
        },
        fr: {
            text: `
Correction d'un bug qui faisait planter l'application si une nouvelle entrée de munitions était créée
`,
            ios: null,
            android: null
        },
        it: {
            text: `
Corretto un bug che mandava in crash l'app se veniva creata una nuova voce di munizioni
`,
            ios: null,
            android: null
        }
    }
]