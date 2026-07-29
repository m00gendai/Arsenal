import type { SimpleTranslation } from "../types/types_global"

export interface FAQ_Section{
    title: SimpleTranslation
    content: FAQ_QuestionAnswer[]
}

export interface FAQ_QuestionAnswer{
    question: SimpleTranslation
    answer: SimpleTranslation
}

export const title: SimpleTranslation ={
    de: "FAQ",
    en: "FAQ",
    fr: "FAQ",
    it: "FAQ"
}

export const faq: FAQ_Section[] = [
/* #################### Data Privacy and Security #################### */
    {
        title: {
            de: `Datenschutz und Datensicherheit`,
            en: `Data Privacy and Security`,
            fr: `Protection des données et sécurité`,
            it: `Privacy e sicurezza dei dati`
        },
        content: [
            {
                question: {
                    de: `Braucht Arsenal ein Benutzerkonto?`,
                    en: `Does Arsenal require an account?`,
                    fr: `Arsenal a-t-il besoin d’un compte?`,
                    it: `Arsenal richiede un account?`
                },
                answer: {
                    de: `
Nein, Arsenal funktioniert gänzlich ohne Benutzerkonten, Logins oder Registrierungen.
`,
                    en: `
No, Arsenal has no user accounts, login or registration.
`,
                    fr: `
Non, Arsenal n’a pas de comptes utilisateurs, de connexion ou d’inscription.
`,
                    it: `
No, Arsenal non ha account utente, login o registrazione.
`,
                },
            },
            {
                question: {
                    de: `Wo werden die Daten gespeichert und wer hat Zugriff darauf?`,
                    en: `Where is the data saved and who has access to it?`,
                    fr: `Où sont stockées les données et qui y a accès?`,
                    it: `Dove vengono salvati i dati e chi ha accesso a essi?`
                },
                answer: {
                    de: `
Die Datenbanken werden lokal auf deinem Gerät gespeichert und sind nur für dich zugänglich.
`,
                    en: `
Your collection database is stored locally on your device and only you have access to it.
`,
                    fr: `
Ta base de données de collection est stockée localement sur ton appareil et tu es le seul à y avoir accès.
`,
                    it: `
Il tuo database di collezioni è memorizzato localmente sul tuo dispositivo e solo tu hai accesso ad esso.
`,
                },
            },
            {
                question: {
                    de: `Sind meine Daten verschlüsselt?`,
                    en: `Is my data encrypted?`,
                    fr: `Mes données sont-elles chiffrées?`,
                    it: `I miei dati sono crittografati?`
                },
                answer: {
                    de: `
Ja.
Arsenal verwendet SQLCipher, eine Open-Source-Datenbankverschlüsselungsbibliothek, um deine Daten mit AES-256 zu verschlüsseln.
Der Schlüssel wird auf deinem Gerät erstellt und in der iOS-Keychain oder im Android-Keystore gespeichert - er verlässt dein Gerät nie.
`,
                    en: `
Yes.
Arsenal uses SQLCipher, an open-source database encryption library, to encrypt your data with AES-256. 
The encryption key is generated on your device and stored in the iOS Keychain or Android Keystore — it never leaves your device.

`,
                    fr: `
Oui.
Arsenal utilise SQLCipher, une bibliothèque de chiffrement de base de données open source, pour chiffrer tes données avec AES-256.
La clé de chiffrement est générée sur ton appareil et stockée dans le Keychain iOS ou le Keystore Android - elle ne quitte jamais ton appareil.
`,
                    it: `
Sì.
Arsenal utilizza SQLCipher, una libreria di crittografia di database open source, per crittografare i tuoi dati con AES-256.
La chiave di crittografia viene generata sul tuo dispositivo e memorizzata nel Keychain di iOS o nel Keystore di Android: non esce mai dal tuo dispositivo.
`,
                },
            },
            {
                question: {
                    de: `Was passiert, wenn ich einen Entschlüsselungsfehler bekomme / meine Daten plötzlich nicht mehr lesbar sind?`,
                    en: `What happens if I get a decryption error / my data suddenly becomes unreadable?`,
                    fr: `Que se passe-t-il si je reçois une erreur de déchiffrement / mes données deviennent soudainement illisibles?`,
                    it: `Cosa succede se ricevi un errore di decodifica o i tuoi dati diventano improvvisamente illeggibili?`
                },
                answer: {
                    de: `
Entschlüsselungsfehler sind extrem selten und weisen in der Regel auf einen korrupten Schlüssel hin oder ein Problem mit dem Secure Storage.
Leider kann die Datenbank ohne den Schlüssel nicht wiederhergestellt werden. Daher sind regelmässige Backups dringend zu empfehlen.
`,
                    en: `
Decryption failures are extremely rare and usually indicate corruption of the encryption key or secure storage. 
Unfortunately, without the encryption key the database cannot be recovered. Regular backups are therefore strongly recommended.

`,
                    fr: `
Les échecs de déchiffrement sont extrêmement rares et indiquent généralement une corruption de la clé de chiffrement ou du Secure Storage.
Malheureusement, sans la clé de chiffrement, la base de données ne peut pas être récupérée. Il est donc fortement recommandé de faire régulièrement des sauvegardes.
`,
                    it: `
I fallimenti nella decrittazione sono estremamente rari e di solito indicano una corruzione della chiave di crittografia o dello spazio di Secure Storage.
Purtroppo, senza la chiave di crittografia, il database non può essere recuperato. Per questo motivo, ti consigliamo vivamente di eseguire regolarmente dei backup.
`,
                },
            },
            {
                question: {
                    de: `Welche Berechtigungen benötigt Arsenal und warum?`,
                    en: `What permissions does Arsenal need, and why?`,
                    fr: `Quelles autorisations Arsenal doit-il obtenir et pourquoi?`,
                    it: `Quelles autorisations Arsenal doit-il obtenir et pourquoi?`
                },
                answer: {
                    de: `
Arsenal benötigt folgende Berechtigungen:
- Zugriff auf das Dateisystem
    Dies ist notwendig, um die Datenbank zu importieren/exportieren und Bilder aus der Galerie auszuwählen
- Zugriff auf die Kamera
    Dies ist notwendig, um Fotos deiner Sammlungsstücke direkt in der App zu machen und QR-Codes zu scannen
`,
                    en: `
Arsenal needs permissions:
- to access your file system
    This is to import and export your database and to select images from your gallery
- to access your camera
    This is to take photos of your collection items directly from within the app and to scan QR Codes

`,
                    fr: `
Arsenal a besoin des autorisations suivantes:
- accès au système de fichiers
    Cela est nécessaire pour importer et exporter ta base de données et pour sélectionner des images de ta galerie
- accès à l’appareil photo
    Cela est nécessaire pour prendre des photos de tes objets de collection directement depuis l’application et pour scanner des codes QR
`,
                    it: `
Arsenal ha bisogno di permessi:
- per accedere al tuo file system
    Questo è necessario per importare ed esportare il tuo database e per selezionare immagini dalla tua galleria
- per accedere alla tua fotocamera
    Questo è necessario per scattare foto dei tuoi oggetti di collezione direttamente dall’app e per scansionare i codici QR
`,
                },
            },
            {
                question: {
                    de: `Sammelt Arsenal Analysedaten?`,
                    en: `Does Arsenal collect analytics?`,
                    fr: `Arsenal collecte-t-il des données analytiques?`,
                    it: `Arsenal raccoglie dati analitici?`
                },
                answer: {
                    de: `
Nein, Arsenal sammelt selbst keine Analyse- oder Telemetriedaten, Nutzungsstatistiken oder Datensätze und leitet diese auch nicht an den Entwickler weiter.

Beachte, dass Google Play und der Apple App Store möglicherweise eigene Diagnose-, Kauf- oder Downloadinformationen nach ihren jeweiligen Datenschutzrichtlinien sammeln.
Dies liegt ausserhalb der Kontrolle von Arsenal und beinhaltet keine Anwendungsdaten.
`,
                    en: `
No, Arsenal itself does not collect analytics, telemetry, usage statistics or collection data, nor does it transmit your collection to the developer.

Please note that Google Play and the Apple App Store may collect their own diagnostic, purchase or download information according to their respective privacy policies. 
This is outside Arsenal's control and does not include any application data.

`,
                    fr: `
Non, Arsenal ne collecte pas d’informations analytiques, de télémétrie, de statistiques d’utilisation ou de données de collecte, et ne transmet pas tes données de collecte au développeur.

Note que Google Play et l’App Store d’Apple peuvent collecter leurs propres informations de diagnostic, d’achat ou de téléchargement conformément à leurs politiques de confidentialité respectives.
Ces informations sont hors du contrôle d’Arsenal et ne contiennent aucune donnée d’application.
`,
                    it: `
No, Arsenal non raccoglie dati analitici, di telemetria, di utilizzo o di raccolta, né li trasmette allo sviluppatore.

Tieni presente che Google Play e l’App Store di Apple potrebbero raccogliere informazioni diagnostiche, di acquisto o di download in base alle rispettive politiche sulla privacy.
Questo non è sotto il controllo di Arsenal e non include alcun dato dell’app.
`,
                },
            },
        ]
    },
/* #################### Legal #################### */
    {
        title: {
            de: `Rechtliches`,
            en: `Legal`,
            fr: `Légal`,
            it: `Legale`
        },
        content: [
            {
                question: {
                    de: `Erfüllt oder ersetzt die Nutzung von Arsenal irgendwelche gesetzlichen Pflichten oder Prozesse?`,
                    en: `Does using Arsenal fulfill or replace any legal record-keeping obligations?`,
                    fr: `L’utilisation d’Arsenal remplace-t-elle ou complète-t-elle les obligations légales de tenue de registres?`,
                    it: `L’utilizzo di Arsenal soddisfa o sostituisce qualsiasi obbligo di conservazione legale?`
                },
                answer: {
                    de: `
Arsenal ersetzt keine offiziellen Dokumente oder Prozesse und ist nicht als rechtliche Alternative für bestehende Dokumente oder Prozesse, oder rechtliche Rahmenbedingungen akkreditiert.
Es ist eine persönliche Applikation, um deine Waffen und zugehörige Sammlungen für den persönlichen Gebrauch zu verwalten.
Es bietet jedoch die Möglichkeit, Listen der Sammlungen zu erstellen, z. B. Waffenlisten, die an spezifische Anforderungen angepasst werden können - z.B. für Versicherungen oder waffenrechtliche Behörden.
`,
                    en: `
Arsenal does not replace any official documents, nor is it accredited to function as a legal alternative for existing documents or legal frameworks.
It is a personal tool to track your firearm and related collections for personal use.
It does, however, provide the possibility to generate collection reports, for example gun lists, which can be tailored for specific requirements - eg for insurance companies or government agencies.
`,
                    fr: `
Arsenal ne remplace aucun document officiel et n’est pas accrédité pour servir d’alternative légale aux documents ou cadres juridiques existants.
C’est un outil personnel pour suivre tes armes à feu et tes collections connexes à des fins personnelles.
Il offre néanmoins la possibilité de générer des rapports sur tes collections, par exemple des listes d’armes, que tu peux adapter à des besoins spécifiques, par exemple pour des compagnies d’assurance ou des organismes gouvernementaux.
`,
                    it: `
Arsenal non sostituisce alcun documento ufficiale e non è autorizzato a fungere da alternativa legale per i documenti o i quadri normativi esistenti.
È uno strumento personale per tenere traccia delle tue armi e delle relative collezioni per uso personale.
Tuttavia, ti offre la possibilità di generare report sulle collezioni, ad esempio elenchi di armi, che possono essere personalizzati in base a requisiti specifici, ad esempio per compagnie assicurative o enti governativi.
`,
                },
            },
            {
                question: {
                    de: `Meldet Arsenal etwas an die Polizei oder an andere Waffenbehörden?`,
                    en: `Does Arsenal report anything to police or other weapons authorities?`,
                    fr: `Arsenal signale-t-il quoi que ce soit à la police ou à d’autres autorités chargées des armes?`,
                    it: `Arsenal comunica qualcosa alla polizia o ad altre autorità competenti in materia di armi?`
                },
                answer: {
                    de: `
Nein.
Deine Sammlung bleibt privat und auf deinem Gerät gespeichert. Nur du hast Zugriff darauf.
Weder die Polizei, der Entwickler, noch irgendwelche anderen Behörden haben Zugriff auf deine Sammlung, da sie nie dein Gerät verlässt.
`,
                    en: `
No. 
Your collection data stays private, on your device, and only you have access to it.
The developer has no access to your collection because it never leaves your device.

`,
                    fr: `
Non.
Tes données de collection restent privées, sur ton appareil, et tu es le seul à y avoir accès.
Le développeur n’a pas accès à tes données de collection car elles ne quittent jamais ton appareil.
`,
                    it: `
No.
I tuoi dati di collezione rimangono privati sul tuo dispositivo e solo tu hai accesso ad essi.
Lo sviluppatore non ha accesso ai tuoi dati di collezione perché questi non escono mai dal tuo dispositivo.
`,
                },
            },
        ]
    },
/* #################### Data Backup, Synchronization & Portability #################### */
    {
        title: {
            de: `Daten-Backup, -Synchronisation und -Portabilität`,
            en: `Data Backup, Synchronization & Portability`,
            fr: `Sauvegarde des données, synchronisation et portabilité`,
            it: `Backup dei dati, sincronizzazione e portabilità`
        },
        content: [
            {
                question: {
                    de: `Was passiert, wenn ich mein Gerät verliere oder ersetze? Kann ich meine Sammlung wiederherstellen?`,
                    en: `What happens if I lose or replace my phone — can I restore my collection?`,
                    fr: `Que se passe-t-il si je perds ou remplace mon téléphone? Peux-je restaurer ma collection?`,
                    it: `Cosa succede se perdo o cambio il telefono? Posso ripristinare la mia collezione?`
                },
                answer: {
                    de: `
Der Datenschutz und die daraus resultierende Vermeidung jeglicher Netzwerkverbindung gehen mit dem Nachteil einher, dass es keine Cloud-Sicherung oder Server-Synchronisierung gibt.
Es liegt in deiner Verantwortung, regelmässig ein Backup deiner Datenbank zu erstellen. Du kannst dies über die verschiedenen Exportoptionen tun.

Wenn du dein Gerät wechselst, exportiere einfach die Datenbank von deinem alten Gerät und importiere sie in dein neues.
`,
                    en: `
The privacy focus and subsequent avoidance of any network connectivity whatsoever comes with the caveat that there is no cloud backup or server synchronization.
It is your responsibility to back up your database regularly. You can do so via the various export options.

If you replace your phone, simply export the database from your old phone and import it in the new phone.
`,
                    fr: `
L’accent mis sur la confidentialité et l’absence totale de connexion réseau implique que tu ne bénéficies pas de sauvegarde dans le cloud ni de synchronisation avec un serveur.
Il t’incombe de sauvegarder régulièrement ta base de données. Tu peux le faire en utilisant les différentes options d’exportation.

Si tu changes de téléphone, exporte simplement la base de données de ton ancien téléphone et importe-la dans ton nouveau téléphone.
`,
                    it: `
La privacy è al primo posto e, di conseguenza, non c’è alcuna connessione di rete.
È tua responsabilità eseguire regolarmente il backup del database. Puoi farlo tramite le varie opzioni di esportazione.

Se cambi telefono, esporta il database dal vecchio telefono e importalo nel nuovo.
`,
                },
            },
            {
                question: {
                    de: `Kann ich Daten aus Excel oder einer Konkurrenz-App importieren?`,
                    en: `Can I import data from Excel or a competitor app?`,
                    fr: `Puis-je importer des données depuis Excel ou une autre application?`,
                    it: `Posso importare dati da Excel o da un’altra app?`
                },
                answer: {
                    de: `
Ja, du kannst deine eigenen Excel-Dateien (im CSV-Format) importieren. Die Feldzuweisung kannst du direkt in der App konfigurieren.

Achte darauf, dass die Kaliber genau so benannt sind, wie in der App angegeben, sonst funktioniert die Funktion "QuickShot" nicht. Eine Liste der Kaliber findest du hier. Mehrere Kaliber werden durch ein Komma gefolgt von einem Leerzeichen ", " getrennt.

Bitte beachte, dass beim Import als CSV-Datei keine Bilder dabei sind, diese musst du in der App hinzufügen.
`,
                    en: `
Yes, your own Excel files (in CSV format) can be imported. The handling of the fields can be configured directly in the app.

Please note that the calibers must be named exactly as specified in the app, otherwise the "QuickShot" function will not work. A list of calibers can be found here. Multiple calibers are separated by a comma followed by a space ", ".

Please also note that importing as a CSV file does not support images, these must be added in the app.

`,
                    fr: `
Oui, tes propres fichiers Excel (au format CSV) peuvent être importés. La gestion des champs peut être configurée directement dans l’application.

Note que les calibres doivent être nommés exactement comme indiqué dans l’application, sinon la fonction "QuickShot" ne fonctionnera pas. Tu trouveras une liste des calibres ici. Plusieurs calibres sont séparés par une virgule suivie d’un espace: ", ".

Note également que l’importation au format CSV ne prend pas en charge les images, celles-ci doivent être ajoutées dans l’application.
`,
                    it: `
Sì, puoi importare i tuoi file Excel (in formato CSV). La gestione dei campi può essere configurata direttamente nell’app.

Tieni presente che i calibri devono avere esattamente il nome indicato nell’app, altrimenti la funzione "QuickShot" non funzionerà. Un elenco dei calibri è disponibile qui. I calibri multipli devono essere separati da una virgola seguita da uno spazio: ", ".

Tieni presente che l’importazione come file CSV non supporta le immagini, queste devono essere aggiunte nell’app.
`,
                },
            },
        ]
    },
/* #################### Pricing & Access #################### */
    {
        title: {
            de: `Preis & Zugang`,
            en: `Pricing & Access`,
            fr: `Prix et accès`,
            it: `Prezzi e accesso`
        },
        content: [
            {
                question: {
                    de: `Ist Arsenal ein einmaliger Kauf oder ein Abonnement?`,
                    en: `Is Arsenal a one-time purchase or a subscription?`,
                    fr: `Arsenal est-il un achat unique ou un abonnement?`,
                    it: `Arsenal è un acquisto una tantum o un abbonamento?`
                },
                answer: {
                    de: `
Arsenal ist ein einmaliger Kauf - Einmal kaufen, immer nutzen, inklusive aller zukünftigen Updates.
`,
                    en: `
Arsenal is strictly a one-time purchase. Buy once, use forever, including any future updates.
`,
                    fr: `
Arsenal est un achat unique. Tu l’achètes une fois et tu l’utilises à jamais, y compris pour toutes les mises à jour futures.
`,
                    it: `
Arsenal è un acquisto una tantum. Acquista una volta e usalo per sempre, inclusi tutti gli aggiornamenti futuri.
`,
                },
            },
            {
                question: {
                    de: `Was passiert mit meinen Daten, wenn ich die App oder die App-Daten lösche?`,
                    en: `What happens to my data if I delete the app or app data?`,
                    fr: `Que se passe-t-il si tu supprimes l’application ou les données de l’application?`,
                    it: `Cosa succede ai miei dati se elimini l’app o i dati dell’app?`
                },
                answer: {
                    de: `
Wenn du die App löschst (deinstallierst), wird auch die Datenbank gelöscht, sodass deine Daten verloren gehen, wenn du sie nicht gesichert hast.
Das Gleiche gilt, wenn du die App-Daten über die Geräteeinstellungen löschst.
`,
                    en: `
Deleting (uninstalling) the app deletes the database as well, so your data is lost if you did not back it up.
The same applies when deleting app data via the phone settings.
`,
                    fr: `
La suppression (désinstallation) de l’application supprime également la base de données, ce qui signifie que tes données sont perdues si tu ne les as pas sauvegardées.
C’est la même chose si tu supprimes les données de l’application via les paramètres du téléphone.
`,
                    it: `
Eliminando (disinstallando) l’app, elimini anche il database, quindi i tuoi dati andranno persi se non li hai salvati.
Lo stesso vale quando elimini i dati dell’app tramite le impostazioni del telefono.
`,
                },
            },
            {
                question: {
                    de: `Gibt es eine kostenlose Testversion oder eine Demoversion?`,
                    en: `Is there a free trial or demo version?`,
                    fr: `Existe-t-il une version d’essai gratuite ou une version de démonstration?`,
                    it: `C’è una versione di prova gratuita o una versione demo?`
                },
                answer: {
                    de: `
Nein, Arsenal bietet momentan keine Testversion an.
Da die App als einmaliger Kauf angeboten wird, kann das Geld über den Google Playstore/Apple Appstore zurückgefordert werden, falls die App nicht den Erwartungen entspricht.
`,
                    en: `
No, Arsenal currently doesn't offer a trial version. 
Since the app is a one-time purchase, both Google Play and the Apple App Store offer refund options if the app doesn't meet your expectations.
`,
                    fr: `
Non, Arsenal ne propose pas de version d’essai.
Comme l’application est un achat unique, Google Play et l’App Store d’Apple proposent des options de remboursement si l’application ne répond pas à tes attentes.
`,
                    it: `
No, al momento Arsenal non offre una versione di prova.
Poiché l’app è un acquisto una tantum, sia Google Play che l’App Store di Apple offrono la possibilità di richiedere un rimborso se l’app non soddisfa le tue aspettative.
`,
                },
            },
        ]
    },
/* #################### Practical Use #################### */
    {
        title: {
            de: `Bedienung`,
            en: `Practical Use`,
            fr: `Utilisation pratique`,
            it: `Uso pratico`
        },
        content: [
            {
                question: {
                    de: `Welche Plattformen werden unterstützt?`,
                    en: `Which platforms are supported?`,
                    fr: `Quelles plateformes sont prises en charge?`,
                    it: `Quali piattaforme sono supportate?`
                },
                answer: {
                    de: `
Arsenal ist für Android und iOS verfügbar.
Benötigt wird Android 7.0 oder neuer bzw. iOS 15.5 oder neuer.
`,
                    en: `
Arsenal is available for both Android and iOS.
It requires Android 7.0 or newer, and iOS 15.5 or newer respectively.
`,
                    fr: `
Arsenal est disponible pour Android et iOS.
Il requiert Android 7.0 ou une version plus récente, et iOS 15.5 ou une version plus récente, respectivement.
`,
                    it: `
Arsenal è disponibile sia per Android che per iOS.
Per Android è richiesto Android 7.0 o superiore, per iOS 15.5 o superiore.
`,
                },
            },
            {
                question: {
                    de: `Funktioniert Arsenal offline?`,
                    en: `Does Arsenal work offline?`,
                    fr: `Arsenal fonctionne-t-il hors ligne?`,
                    it: `Arsenal funziona offline?`
                },
                answer: {
                    de: `
Arsenal wurde rein als Offline-App konzipiert und benötigt keine Internetverbindung, um zu funktionieren.

Der Menüpunkt "Über" in der App enthält Links zu externen Ressourcen, die eine Internetverbindung zum Anzeigen benötigen.
Alle Funktionen zur Verwaltung der Sammlung funktionieren weiterhin vollständig offline.
`,
                    en: `
Arsenal has been built with strict offline operation in mind and does not require any internet connection to function.

The About section contains links to external resources that require an internet connection to display. 
All collection management features continue to work fully offline.
`,
                    fr: `
Arsenal a été conçu pour fonctionner hors ligne et ne nécessite aucune connexion Internet pour fonctionner.

La section À propos contient des liens vers des ressources externes qui nécessitent une connexion Internet pour s’afficher.
Toutes les fonctionnalités de gestion de collection continuent de fonctionner entièrement hors ligne.
`,
                    it: `
Arsenal è stato progettato per funzionare in modo completamente offline e non richiede una connessione internet per funzionare.

La sezione Informazioni contiene link a risorse esterne che richiedono una connessione internet per essere visualizzate.
Tutte le funzionalità di gestione della collezione continuano a funzionare completamente offline.
`,
                },
            },
            {
                question: {
                    de: `Kann ich Arsenal auf mehreren Geräten nutzen?`,
                    en: `Can I use Arsenal on multiple devices?`,
                    fr: `Puis-je utiliser Arsenal sur plusieurs appareils?`,
                    it: `Posso usare Arsenal su più dispositivi?`
                },
                answer: {
                    de: `
Ja.
Exportiere deine Datenbank von einem Gerät und importiere sie auf ein anderes.
Arsenal synchronisiert Geräte nicht automatisch, da es keine Cloud-Dienste nutzt.
`,
                    en: `
Yes.
Export your database from one device and import it on another.
Arsenal intentionally does not synchronize devices automatically because it does not use cloud services.
`,
                    fr: `
Oui.
Exporte ta base de données d’un appareil et importe-la sur un autre.
Arsenal ne synchronise pas automatiquement les appareils parce qu’il n’utilise pas de services cloud.
`,
                    it: `
Sì.
Esporta il tuo database da un dispositivo e importalo su un altro.
Arsenal non sincronizza i dispositivi automaticamente perché non utilizza servizi cloud.
`,
                },
            },
            {
                question: {
                    de: `Kann ich die PDF-Exporte für Versicherungsdokumente oder eine von der Polizei geforderte Inventarliste verwenden?`,
                    en: `Can I use the PDF exports for insurance documentation or a police-requested inventory list?`,
                    fr: `Puis-je utiliser les exportations PDF pour la documentation d’assurance ou une liste d’inventaire demandée par la police?`,
                    it: `Posso usare le esportazioni PDF per la documentazione assicurativa o per un inventario richiesto dalla polizia?`
                },
                answer: {
                    de: `
Ja.
Arsenal bietet flexible PDF-Exporte mit vordefinierten und frei anpassbaren Listen, je nach dem wofür du sie grade brauchst.
`,
                    en: `
Yes.
Arsenal features a flexible PDF export generation with predefined and customizable exports tailored to your specific needs.
`,
                    fr: `
Oui.
Arsenal propose une génération flexible de PDF avec des exports prédéfinis et personnalisables adaptés à tes besoins spécifiques.
`,
                    it: `
Sì.
Arsenal offre una generazione flessibile di PDF con esportazioni predefinite e personalizzabili, adattate alle tue esigenze specifiche.
`,
                },
            },
            {
                question: {
                    de: `Kann ich benutzerdefinierte Attribute für Sammlungsobjekte erstellen?`,
                    en: `Can I create custom attributes beyond what's built in?`,
                    fr: `Puis-je créer des attributs personnalisés qui ne sont pas déjà préconfigurés?`,
                    it: `Posso creare attributi personalizzati che non sono già predefiniti?`
                },
                answer: {
                    de: `
Nein, die Attribute sind fix und nicht erweiterbar. 
Das soll Konflikte mit zukünftigen Updates vermeiden.
`,
                    en: `
No, the attributes are fixed and not extensible.
This is to avoid any conflicts with future updates.
`,
                    fr: `
Non, les attributs sont fixes et non extensibles.
Ceci est fait pour éviter tout conflit avec les futures mises à jour.
`,
                    it: `
Non, les attributs sont fixes et non extensibles.
Ceci est fait pour éviter tout conflit avec les futures mises à jour.
`,
                },
            },
            {
                question: {
                    de: `Kann ich eigene Kaliber definieren, wenn sie nicht in der Liste enthalten sind?`,
                    en: `Can I define custom calibers when they're not in the built-in list?`,
                    fr: `Puis-je définir des calibres personnalisés qui ne figurent pas dans la liste intégrée?`,
                    it: `Posso definire calibri personalizzati che non sono presenti nell’elenco predefinito?`
                },
                answer: {
                    de: `
Nein, die Kaliber sind fix und nicht erweiterbar.
Das soll Konflikte mit zukünftigen Updates vermeiden und die QuickShot/QuickStock-Funktionalität synchron halten - QuickShot/QuickStock sind abhängig vom korrekten Kaliberformat.

Falls ein Kaliber fehlt, schreib dem Entwickler eine Nachricht. Es wird dann im nächsten Update hinzugefügt.

Diese Einschränkung kann umgangen werden, indem du eine CSV-Datei importierst, wobei die Kalibereinträge nicht validiert werden.
Das wird aber nicht empfohlen und kann zu unerwartetem Verhalten führen.
Sichere die Datenbank, bevor du das versuchst!
`,
                    en: `
No, the calibers are fixed and not extensible.
This is to avoid any conflicts with future updates and to keep the QuickShot/QuickStock functionality in sync - QuickShot/QuickStock depend on the correct caliber format.

If a caliber is missing, you can request it by sending a message to the developer. It will then be added in the next update.

You can bypass this restriction by importing a CSV where the caliber entries are not validated. 
However, this is not recommended and can lead to unexpected behavior.
Backup the database before trying this!
`,
                    fr: `
Non, les calibres sont fixes et non extensibles.
Ceci est fait pour éviter tout conflit avec les futures mises à jour et pour garder la fonctionnalité QuickShot/QuickStock synchronisée - QuickShot/QuickStock dépendent du format de calibre correct.

Si un calibre est manquant, tu peux le demander en envoyant un message au développeur. Il sera alors ajouté dans la prochaine mise à jour.

Tu peux contourner cette restriction en important un fichier CSV où les entrées de calibre ne sont pas validées.
Cependant, ce n’est pas recommandé et peut entraîner un comportement inattendu.
Fais une sauvegarde de la base de données avant d’essayer!
`,
                    it: `
No, i calibri sono fissi e non estendibili.
Questo per evitare conflitti con futuri aggiornamenti e per mantenere la funzionalità QuickShot/QuickStock sincronizzata - QuickShot/QuickStock dipende dal corretto formato dei calibri.

Se manca un calibro, puoi richiederlo inviando un messaggio allo sviluppatore. Sarà aggiunto nel prossimo aggiornamento.

Puoi aggirare questa restrizione importando un file CSV in cui le voci relative ai calibri non sono state validate.
Tuttavia, non è consigliabile farlo, perché potrebbe portare a comportamenti inattesi.
Esegui un backup del database prima di provare!
`,
                },
            },
            {
                question: {
                    de: `Was passiert mit meiner Sammlung, wenn ich eine Waffe an jemand anderen verkaufe - gibt es eine Übertragungs-/Übergabeprotokollierung?`,
                    en: `What happens to my collection if I sell a firearm to someone else — is there a transfer/handoff record?`,
                    fr: `Que se passe-t-il si je vends une arme à feu à quelqu’un d’autre? Y a-t-il un registre de transfert/de remise?`,
                    it: `Cosa succede alla mia collezione se vendo un’arma a qualcun altro? Esiste un registro di trasferimento/consegna?`
                },
                answer: {
                    de: `
Ja.
Verkäufe können mit Verkaufsdatum, Verkaufspreis, Referenznummer der Käufergenehmigung und persönlichen Anmerkungen erfasst werden.
Verkaufte Artikel bleiben in der Datenbank, bis sie explizit gelöscht werden, können aber über die Einstellungen ausgeblendet werden.
`,
                    en: `
Yes.
Sales can be recorded with sell date, sell price, buyer permit reference and any personal remarks.
Sold items remain in the database unless explicitly deleted but can be hidden via settings.
`,
                    fr: `
Oui.
Les ventes peuvent être enregistrées avec la date de vente, le prix de vente, la référence du permis de l’acheteur et toute remarque personnelle.
Les articles vendus restent dans la base de données à moins qu’ils ne soient explicitement supprimés, mais peuvent être masqués via les paramètres.
`,
                    it: `
Sì.
Le vendite possono essere registrate con data di vendita, prezzo di vendita, riferimento del permesso del compratore e qualsiasi altra osservazione personale.
Gli articoli venduti rimangono nel database a meno che non vengano cancellati esplicitamente, ma possono essere nascosti tramite le impostazioni.
`,
                },
            },
            {
                question: {
                    de: `Welche Sprachen unterstützt die App?`,
                    en: `What languages does the app support?`,
                    fr: `Quelles langues l’application prend-elle en charge?`,
                    it: `In quali lingue è disponibile l’app?`
                },
                answer: {
                    de: `
Die App unterstützt momentan Englisch, Deutsch, Französisch, Italienisch und Rumantsch Grischun.
Das Wechseln der Sprache ist jederzeit nahtlos möglich.
`,
                    en: `
The app currently supports English, German, French, Italian and Rumantsch Grischun.
Changing language is seamless and can be done at any time.
`,
                    fr: `
L’application prend actuellement en charge l’anglais, l’allemand, le français, l’italien et le romanche.
Le changement de langue se fait de manière fluide et à tout moment.
`,
                    it: `
L’app supporta attualmente le lingue inglese, tedesco, francese, italiano e rumantsch grischun.
Il cambio di lingua avviene senza problemi e può essere effettuato in qualsiasi momento.
`,
                },
            },
        ]
    },
/* #################### General #################### */
    {
        title: {
            de: `Allgemein`,
            en: `General`,
            fr: `Général`,
            it: `Generale`
        },
        content: [
            {
                question: {
                    de: `Ich nutze bereits eine Konkurrenz-App, warum sollte ich zu Arsenal wechseln?`,
                    en: `I already use a competitor app, why should I switch to Arsenal?`,
                    fr: `J’utilise déjà une autre application, pourquoi devrais-je passer à Arsenal?`,
                    it: `Uso già un’altra app, perché dovrei passare ad Arsenal?`
                },
                answer: {
                    de: `
Es gibt tatsächlich einige alternative Apps, vor allem für Android, die den gleichen Zweck wie Arsenal erfüllen (es gibt sogar eine die gleich heisst!). Allerdings:
- sind die meisten US-zentrisch
- scheinen sie keine Sprachauswahl zu haben oder nutzen eine automatische Übersetzung
- scheinen sie nicht den gleichen Funktionsumfang zu haben, oder wenn doch, sind sie ziemlich unintuitiv und umständlich
- ist der Entwickler manchmal schwer zu identifizieren oder zu kontaktieren (Entwickler hinter Firma) und scheint manchmal nicht mit der Community zu interagieren
- können sie doppelt so teuer sein, teilweise nicht transparente In-App-Käufe oder Werbung enthalten oder bieten Abonnements an
- scheinen einige nicht aktiv weiterentwickelt zu werden

Arsenal hingegen:
- ist primär auf Schweizer Bedürfnisse zugeschnitten, aber auch weltweit nutzbar und bietet beispielsweise eine Auswahl an angezeigten Massangaben
- ist in fünf Sprachen verfügbar, wobei die Übersetzungen ins Deutsche und Englische von Hand erstellt wurden und Französisch, Italienisch und Rumantsch Grischun von einem Schweizer Übersetzungsdienst
- hat eine moderne, schlichte (so weit wie möglich) und funktionale Benutzeroberfläche
- hat einen privaten Schweizer Entwickler, der in der Schweizer Waffen- und Schützen-Community aktiv bekannt ist und mit dieser interagiert
- kostet einmalig 5 CHF, inklusive aller zukünftigen Updates. Keine Werbung, keine Abonnements, keine In-App-Käufe.
- wird ständig weiterentwickelt

Letztendlich entscheidet jeder selbst, welche App, wenn überhaupt, am besten geeignet ist. Manchmal reicht auch ein Excel-Sheet.
`,
                    en: `
There are indeed several alternative apps, especially on Android, that serve the same purpose as Arsenal. However:
- most are US-oriented
- they seem to have no language selection or employ an auto-translation
- they do not seem to have the same range of functions, or if they do, they seem quite unintuitive and cumbersome
- the developer can sometimes be difficult to identify or contact (LLC in front of the developer) and sometimes appear to not interact with the community
- they can cost twice as much, may have partly non-transparent in-app purchases or advertising or can offer subscription based payment models
- some seem to not be in active development

Arsenal, on the other hand:
- is primarily tailored to Swiss needs, but also usable worldwide and offers a choice in displayed units of measurement, for example
- is available in five languages, with translations into German and English made by hand, and French, Italian and Rumantsch Grischun by using a Swiss Translation Service
- has a modern, simple (as much as possible) and functional user interface
- has a private Swiss developer who is actively known in the Swiss weapons and shooting community and interacts with that community
- costs a one-time fee of 5 CHF for life, including all future updates. No ads, no subscriptions, no in-app purchases.
- is in constant development

Ultimately, everyone decides for themselves which app, if any, is best suited. Sometimes that Excel-Sheet is sufficient.
`,
                    fr: `
Il existe effectivement plusieurs applications alternatives, surtout sur Android, qui remplissent la même fonction qu’Arsenal. Cependant:
- la plupart sont axées sur les États-Unis
- elles ne proposent pas de sélection de langue ou utilisent une traduction automatique
- elles ne semblent pas offrir la même gamme de fonctions, ou si elles le font, elles sont peu intuitives et peu pratiques
- il est parfois difficile d’identifier ou de contacter le développeur (LLC devant le nom du développeur) et il semble parfois qu’il ne communique pas avec la communauté
- elles peuvent coûter deux fois plus cher, proposer des achats intégrés ou de la publicité partiellement opaques ou encore des modèles de paiement par abonnement
- certaines ne semblent pas être en développement actif

Arsenal, en revanche:
- est principalement adapté aux besoins de la Suisse, mais peut aussi être utilisé dans le monde entier et offre un choix d’unités de mesure, par exemple
- est disponible en cinq langues, dont le français, l’italien et le romanche grison, traduites par un service de traduction suisse, et l’allemand et l’anglais, traduites manuellement
- possède une interface utilisateur moderne, simple (autant que possible) et fonctionnelle
- a été développé par un développeur suisse privé qui est activement connu dans la communauté suisse des armes et du tir et qui communique avec cette communauté
- coûte un montant unique de 5 CHF pour une utilisation à vie, y compris toutes les mises à jour futures. Pas de publicité, pas d’abonnement, pas d’achats intégrés.
- est en développement permanent

En fin de compte, chacun décide lui-même quelle application, si tant est qu’il en utilise une, est la plus adaptée. Parfois, une feuille de calcul Excel suffit.
`,
                    it: `
Esistono effettivamente diverse app alternative, soprattutto per Android, che svolgono la stessa funzione di Arsenal. Tuttavia:
- la maggior parte di esse è orientata verso il mercato statunitense
- non sembrano offrire la possibilità di scegliere la lingua o utilizzano una traduzione automatica
- non sembrano avere la stessa gamma di funzioni, oppure, se le hanno, sembrano poco intuitive e complicate
- a volte è difficile identificare o contattare lo sviluppatore (LLC davanti al nome dello sviluppatore) e a volte sembra che non interagisca con la comunità
- possono costare il doppio, possono avere acquisti in-app o pubblicità non del tutto trasparenti o possono offrire modelli di pagamento basati su abbonamento
- alcune sembrano non essere più in fase di sviluppo attivo

Arsenal, d’altro canto:
- è principalmente pensata per le esigenze svizzere, ma è utilizzabile in tutto il mondo e offre la possibilità di scegliere le unità di misura da visualizzare, per esempio
- è disponibile in cinque lingue, con traduzioni in tedesco e inglese realizzate a mano e in francese, italiano e rumantsch grischun tramite un servizio di traduzione svizzero
- ha un’interfaccia utente moderna, semplice (per quanto possibile) e funzionale
- è stata creata da uno sviluppatore svizzero privato che è ben conosciuto nella comunità svizzera di armi e di tiro e che interagisce con questa comunità
- costa una tariffa una tantum di 5 CHF per l’intera vita, inclusi tutti gli aggiornamenti futuri. Non ci sono pubblicità, abbonamenti o acquisti in-app.
- è in costante fase di sviluppo

Alla fine, ognuno decide autonomamente quale app, se ce n’è una, è la più adatta alle proprie esigenze. A volte un foglio di calcolo Excel è sufficiente.
`,
                },
            },
        ]
    },
/* #################### Support #################### */
    {
        title: {
            de: `Support`,
            en: `Support`,
            fr: `Soutien`,
            it: `Supporto`
        },
        content: [
            {
                question: {
                    de: `Kann ich den Entwicklungsstand der App einsehen?`,
                    en: `Can I see the development progress of the app?`,
                    fr: `Puis-je suivre l’évolution de l’application?`,
                    it: `Posso vedere i progressi dello sviluppo dell’app?`
                },
                answer: {
                    de: `
Ja, der aktuelle Entwicklungsstand, einschliesslich geplanter und gewünschter Features, wird auf [Trello (nur auf Englisch)](https://trello.com/b/aewI0VKW/arsenal) veröffentlicht.
`,
                    en: `
Yes, the current development status, including planned and requested features, is published on [Trello (English only)](https://trello.com/b/aewI0VKW/arsenal).
`,
                    fr: `
Oui, l’état actuel du développement, y compris les fonctionnalités prévues et demandées, est publié sur [Trello (en anglais uniquement)](https://trello.com/b/aewI0VKW/arsenal).
`,
                    it: `
Sì, lo stato attuale dello sviluppo, comprese le funzionalità pianificate e richieste, è pubblicato su [Trello (solo in inglese)](https://trello.com/b/aewI0VKW/arsenal).
`,
                },
            },
            {
                question: {
                    de: `Wo kann ich Feedback, Kritik und Wünsche anbringen?`,
                    en: `Where can I voice my feedback, critique and wishes?`,
                    fr: `Où puis-je faire part de mes commentaires, critiques et souhaits?`,
                    it: `Dove posso esprimere i miei commenti, critiche e desideri?`
                },
                answer: {
                    de: `
Offizielle Diskussion auf [waffenforum.ch](https://waffenforum.ch/forum/index.php?thread/2883-arsenal-die-schweizer-app-f%C3%BCr-waffensammler/&pageNo=1)
Per E-Mail an info@mrweber.ch
`,
                    en: `
Official Thread on [waffenforum.ch](https://waffenforum.ch/forum/index.php?thread/2883-arsenal-die-schweizer-app-f%C3%BCr-waffensammler/&pageNo=1)
Via Email to info@mrweber.ch
`,
                    fr: `
Forum officiel sur [waffenforum.ch](https://waffenforum.ch/forum/index.php?thread/2883-arsenal-die-schweizer-app-f%C3%BCr-waffensammler/&pageNo=1)
Par e-mail à info@mrweber.ch
`,
                    it: `
Discussione ufficiale su [waffenforum.ch](https://waffenforum.ch/forum/index.php?thread/2883-arsenal-die-schweizer-app-f%C3%BCr-waffensammler/&pageNo=1)
Tramite e-mail a info@mrweber.ch
`,
                },
            },
        ]
    },
/* #################### AI #################### */
    {
        title: {
            de: `KI - Künstliche Intelligenz`,
            en: `AI - Artificial Intelligence`,
            fr: `IA - Intelligence artificielle`,
            it: `AI - Intelligenza artificiale`
        },
        content: [
            {
                question: {
                    de: `Gibt Arsenal meine Daten an KI-Dienste weiter?`,
                    en: `Does Arsenal send my data to AI services?`,
                    fr: `Arsenal envoie-t-il mes données à des services d’IA?`,
                    it: `Arsenal invia i miei dati a servizi di intelligenza artificiale?`
                },
                answer: {
                    de: `
Nein, Arsenal sendet keine Daten irgendwohin, sie bleiben strikt auf deinem Gerät.
`,
                    en: `
No, Arsenal does not send your data anywhere, it remains strictly on your device.
`,
                    fr: `
Non, Arsenal ne transmet pas tes données à qui que ce soit, elles restent strictement sur ton appareil.
`,
                    it: `
No, Arsenal non invia i tuoi dati da nessuna parte, rimangono strettamente sul tuo dispositivo.
`,
                },
            },
            {
                question: {
                    de: `Hat Arsenal KI-Funktionen?`,
                    en: `Does Arsenal have AI functionality?`,
                    fr: `Arsenal a-t-il des fonctionnalités d’IA?`,
                    it: `Arsenal ha funzionalità AI?`
                },
                answer: {
                    de: `
Arsenal verwendet keine Cloud-basierten KI-Dienste oder generative KI.
Momentan beinhaltet Arsenal die QR-Code-Erkennung auf dem Gerät, die Daten vollständig auf deinem Gerät verarbeitet und nichts an externe Dienste überträgt.
Zukünftige intelligente Funktionen wie OCR werden ebenfalls so konzipiert, dass sie vollständig auf deinem Gerät laufen und deine Daten nicht übertragen werden.
`,
                    en: `
Arsenal does not rely on cloud-based AI services or generative AI.
Currently, Arsenal includes on-device QR code recognition, which processes data entirely on your device and does not transmit anything to external services.
Any future intelligent features, such as OCR, will likewise be designed to run entirely on your device without transmitting your data.
`,
                    fr: `
Arsenal ne s’appuie pas sur des services d’IA basés sur le cloud ou sur l’IA générative.
Pour l’instant, Arsenal inclut la reconnaissance de QR codes sur l’appareil, qui traite les données entièrement sur ton appareil et ne transmet rien à des services externes.
Toute fonctionnalité intelligente future, comme la reconnaissance optique de caractères (OCR), sera conçue pour fonctionner entièrement sur ton appareil sans transmettre tes données.
`,
                    it: `
Arsenal non si basa su servizi AI basati sul cloud o sull’AI generativa.
Al momento, Arsenal include il riconoscimento di codici QR che elabora i dati interamente sul tuo dispositivo e non li trasmette a servizi esterni.
Qualsiasi futura funzionalità intelligente, come l’OCR, sarà progettata per funzionare interamente sul tuo dispositivo senza trasmettere i tuoi dati.
`,
                },
            },
            {
                question: {
                    de: `Wurde KI während der Entwicklung eingesetzt? Wenn ja, in welcher Form?`,
                    en: `Was AI used during development? If so, in what capacity?`,
                    fr: `L’IA a-t-elle été utilisée pendant le développement? Si oui, dans quel but?`,
                    it: `È stata utilizzata l’intelligenza artificiale durante lo sviluppo? Se sì, in che modo?`
                },
                answer: {
                    de: `
Ja.
KI wird als Hilfsmittel für die Entwicklung eingesetzt, in gleicher Form wie offizielle Dokumentationen, Fachbücher oder spezialisierte Foren.
Arsenal wird nicht von KI generiert. Der Entwickler verfügt über langjährige Erfahrung mit JavaScript/TypeScript und React, schon vor der Entstehung moderner KI-Tools.
Jeder KI-generierte Vorschlag wird kritisch geprüft, getestet und manuell angepasst, bevor er allenfalls in die App integriert wird.
`,
                    en: `
Yes.
AI is used as a development aid in much the same way as documentation, technical books or specialized forums.
Arsenal is not generated by AI. The developer has extensive experience with JavaScript, TypeScript and React predating modern AI tools. 
Every AI-generated suggestion is critically reviewed, tested and manually adapted before being incorporated into the app.
`,
                    fr: `
Oui.
L’IA est utilisée comme un outil de développement, de la même manière que la documentation, les livres techniques ou les forums spécialisés.
Arsenal n’est pas généré par l’IA. Le développeur possède une vaste expérience en JavaScript, TypeScript et React, qui remonte à avant l’arrivée des outils d’IA modernes.
Chaque suggestion générée par l’IA est examinée de près, testée et adaptée manuellement avant d’être intégrée à l’application.
`,
                    it: `
Sì.
L’AI viene utilizzata come strumento di sviluppo, proprio come la documentazione, i libri tecnici o i forum specializzati.
Arsenal non è generato dall’AI. Lo sviluppatore ha una vasta esperienza con JavaScript, TypeScript e React, che risale a prima dell’avvento degli strumenti AI moderni.
Ogni suggerimento generato dall’AI viene esaminato criticamente, testato e adattato manualmente prima di essere integrato nell’app.
`,
                },
            },
            {
                question: {
                    de: `Warum setzt Arsenal nicht auf Cloud-basierte KI?`,
                    en: `Why doesn't Arsenal rely on cloud-based AI?`,
                    fr: `Pourquoi Arsenal ne s’appuie-t-il pas sur l’IA basée sur le cloud?`,
                    it: `Perché Arsenal non si affida all’AI basata sul cloud?`
                },
                answer: {
                    de: `
Arsenal wurde mit Fokus auf Privatsphäre, Offline-Funktionalität und langfristige Zuverlässigkeit konzipiert. Cloudbasierte KI-Dienste erfordern in der Regel die Übertragung von Daten an externe Anbieter und verursachen laufende Betriebskosten.

Um auch offline voll funktionsfähig zu bleiben, unabhängig von KI-Diensten von Drittanbietern und als einmalige Anschaffung ohne Abonnements oder wiederkehrende Gebühren verfügbar zu sein, verzichtet Arsenal bewusst auf cloudbasierte KI-Dienste.

On-Device-Technologien wie QR-Code-Erkennung und möglicherweise zukünftige OCR-Funktionen sind mit dieser Philosophie kompatibel, da sie Daten ausschliesslich auf deinem Gerät verarbeiten.
`,
                    en: `
Arsenal is designed around privacy, offline operation and long-term reliability. Cloud-based AI services generally require transmitting data to external providers and incur ongoing operating costs.

To remain fully functional offline, independent of third-party AI providers and available as a one-time purchase without subscriptions or recurring fees, Arsenal intentionally does not rely on cloud-based AI services.

On-device technologies, such as QR code recognition and potentially future OCR, are compatible with this philosophy because they process data entirely on your device.
`,
                    fr: `
Arsenal a été conçu en gardant à l’esprit la confidentialité, le fonctionnement hors ligne et la fiabilité à long terme. Les services d’IA basés sur le cloud nécessitent généralement de transmettre des données à des fournisseurs externes et engendrent des coûts d’exploitation récurrents.

Pour rester entièrement fonctionnel hors ligne, sans dépendre de fournisseurs d’IA tiers et pour être disponible à l’achat unique sans abonnement ni frais récurrents, Arsenal n’utilise pas intentionnellement de services d’IA basés sur le cloud.

Les technologies intégrées à l’appareil, comme la reconnaissance de codes QR et potentiellement l’OCR à l’avenir, sont compatibles avec cette philosophie, car elles traitent les données entièrement sur ton appareil.
`,
                    it: `
Arsenal è progettato per la privacy, il funzionamento offline e l’affidabilità a lungo termine. I servizi AI basati su cloud richiedono in genere la trasmissione di dati a fornitori esterni e comportano costi operativi ricorrenti.

Per poter funzionare completamente offline, senza dipendere da fornitori di AI di terze parti e per essere disponibile come acquisto una tantum senza abbonamenti o costi ricorrenti, Arsenal non si basa intenzionalmente su servizi AI basati su cloud.

Le tecnologie integrate nel dispositivo, come il riconoscimento di codici QR e potenzialmente l’OCR in futuro, sono compatibili con questa filosofia perché elaborano i dati interamente sul tuo dispositivo.
`,
                },
            },
        ]
    },
]