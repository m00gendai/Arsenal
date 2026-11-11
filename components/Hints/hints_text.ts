import { SimpleTranslation } from "lib/Text/interfaces_text";
import { generalSettingsLabels, preferenceTitles } from "lib/Text/text_settings";

export const hintsTitle:SimpleTranslation = {
    de: "Willkommen in der Arsenal App!",
    en: "Welcome to the Arsenal App",
    fr: "Bienvenue dans l'application Arsenal",
    it: "Benvenuto nell'app Arsenal",           
    ch: "Buna vegniada a l'app Arsenal"        
}

export const hints: SimpleTranslation[] = [
    {
        de: `Diese Hinweise können jederzeit übers Hauptmenü wieder angezeigt werden, sollten sie geschlossen werden: Hauptmenu > « ${preferenceTitles.generalSettings.de} » > « ${generalSettingsLabels.hintsDisplay.de} »`,
        en: `These hints can be re-toggled any time in the main menu, should you close this window: Main Menu > « ${preferenceTitles.generalSettings.en} » > « ${generalSettingsLabels.hintsDisplay.en} »`,
        fr: `Ces indications peuvent être réaffichées à tout moment via le menu principal si cette fenêtre est fermée : Menu principal > « ${preferenceTitles.generalSettings.fr} » > « ${generalSettingsLabels.hintsDisplay.fr} »`,
        it: `Questi suggerimenti possono essere visualizzati di nuovo in qualsiasi momento dal menu principale, se questa finestra viene chiusa: Menu principale > « ${preferenceTitles.generalSettings.it} » > « ${generalSettingsLabels.hintsDisplay.it} »`,
        ch: `Quests avis pon vegnir mussads danovamain mintga mument via il menu principal, sche questa fanestra vegn serrada: Menu principal > « ${preferenceTitles.generalSettings.ch} » > « ${generalSettingsLabels.hintsDisplay.ch} »`,
    },
    {
        de: "Die App ist komplett offline, das heisst, die Datenbank wird nicht automatisch irgendwo synchronisiert. Exportiere sie von Zeit zu Zeit und speichere sie an einem sicheren Ort.",
        en: "The app is completely offline, meaning the database is not synchronized to anywhere. Export it from time to time and save it somewhere secure.",
        fr: "L’application fonctionne entièrement hors ligne, ce qui signifie que la base de données n’est pas synchronisée automatiquement. Exportez-la de temps en temps et conservez-la dans un endroit sûr.",
        it: "L’app funziona completamente offline, il che significa che il database non viene sincronizzato automaticamente. Esportalo di tanto in tanto e salvalo in un luogo sicuro.",
        ch: "L’app funcziuna cumplettamain offline, quai vul dir che la banca da datas na vegn betg sincronisada automaticamain. Exportescha ella mintgatant e memorisescha ella en in lieu segir.",
    },
    {
        de: `Wirf einen Blick in die « ${preferenceTitles.settings.de} ». Dort kannst du die Farbgebung verändern, Anzeigeoptionen einstellen und die Masseinheiten festlegen.`,
        en: `Take a look at the « ${preferenceTitles.settings.en} ». There you can change the colour scheme, adjust display options and set your preferred units of measurement.`,
        fr: `Jette un œil aux « ${preferenceTitles.settings.fr} ». Tu peux y modifier les couleurs, régler les options d’affichage et choisir les unités de mesure.`,
        it: `Dai un’occhiata alle « ${preferenceTitles.settings.it} ». Qui puoi modificare i colori, regolare le opzioni di visualizzazione e scegliere le unità di misura.`,
        ch: `Dà in'egliada als « ${preferenceTitles.settings.ch} ». Là pos ti midar ils colurs, adattar las opziuns da visualisaziun e definir las unitads da mesira.`
    },
    {
        de: `Über den Menüpunkt « ${preferenceTitles.gunList.de} » kannst du PDF-Listen aller Sammelgebiete erstellen. Wähle aus vorgefertigten Listen oder stelle deine eigene individuell zusammen.`,
        en: `Use « ${preferenceTitles.gunList.en} » to create PDF lists for all your collection categories. Choose from predefined lists or create your own custom list.`,
        fr: `Dans « ${preferenceTitles.gunList.fr} », tu peux créer des listes PDF pour toutes les catégories de ta collection. Choisis parmi les listes prédéfinies ou compose ta propre liste personnalisée.`,
        it: `Nel menu « ${preferenceTitles.gunList.it} » puoi creare elenchi PDF per tutte le categorie della tua collezione. Scegli tra gli elenchi predefiniti o creane uno personalizzato.`,
        ch: `En il punct da menu « ${preferenceTitles.gunList.ch} » pos ti crear glistas PDF per tut ils secturs da collecziun. Tscherna tranter glistas predefinidas u creescha tia atgna glista individuala.`
    },
    {
        de: `Die Autokomplettierung in gewissen Textfeldern ist sehr nützlich. Falls mal etwas falsch geschrieben wurde kannst du den Eintrag via Hauptmenü > « ${preferenceTitles.editData.de} » > « ${preferenceTitles.editData_Autocomplete.de} » wieder löschen.`,
        en: `Autocomplete in some text fields is very useful. Should you notice a typo, you can delete the entry via Main Menu > « ${preferenceTitles.editData.en} » > « ${preferenceTitles.editData_Autocomplete.en} »`,
        fr: `La saisie semi-automatique dans certains champs de texte est très utile. En cas de faute, vous pouvez supprimer l’entrée via Menu principal > « ${preferenceTitles.editData.fr} » > « ${preferenceTitles.editData_Autocomplete.fr} ».`,
        it: `Il completamento automatico in alcuni campi di testo è molto utile. Se noti un errore, puoi eliminare la voce tramite Menu principale > « ${preferenceTitles.editData.it} » > « ${preferenceTitles.editData_Autocomplete.it} ».`,
        ch: `L’autocompletaziun en tscherts champs da text è fitg utila. Sche in pled è scrit fallà, pos ti stizzar l’entrada via Menu principal > « ${preferenceTitles.editData.ch} » > « ${preferenceTitles.editData_Autocomplete.ch} ».`,
    },
    {
        de: `Du kannst sogar deine eigenen Etiketten für alle Sammelgebiete erstellen, mit und ohne QR-Code, ganz einfach via Hauptmenü > « ${preferenceTitles.generateQRCodes.de} »`,
        en: `You can even create your own labels for all collection categories, with or without QR codes, right from Main Menu > « ${preferenceTitles.generateQRCodes.en} »`,
        fr: `Tu peux même créer tes propres étiquettes pour toutes les catégories de ta collection, avec ou sans code QR, directement depuis Menu principal > « ${preferenceTitles.generateQRCodes.fr} »`,
        it: `Puoi persino creare le tue etichette per tutte le categorie della tua collezione, con o senza codice QR, direttamente da Menu principale > « ${preferenceTitles.generateQRCodes.it} »`,
        ch: `Ti pos crear schizunt tias atgnas etichettas per tut ils secturs da collecziun, cun u senza codes QR, directamain sur Menu principal > « ${preferenceTitles.generateQRCodes.ch} »`
    },
    {
        de: `Detaillierte Statistiken zu allen Sammelgebieten kannst du unter Hauptmenü > « ${preferenceTitles.statistics.de} » einsehen. Tabellarisch und mit Grafiken!`,
        en: `You can find detailed statistics for all your collection categories under Main Menu > « ${preferenceTitles.statistics.en} ». Both tables and charts!`,
        fr: `Tu trouveras des statistiques détaillées sur toutes les catégories de ta collection sous Menu principal > « ${preferenceTitles.statistics.fr} ». Sous forme de tableaux et de graphiques !`,
        it: `Puoi consultare statistiche dettagliate su tutte le categorie della tua collezione in Menu principale > « ${preferenceTitles.statistics.it} ». Sia in tabelle che con grafici!`,
        ch: `Statisticas detagliadas davart tut ils secturs da collecziun chattas ti sut Menu principal > « ${preferenceTitles.statistics.ch} ». En furma da tabellas e diagrams!`
    },
    {
        de: "Schlagworte sind eine bequeme Option, deine Sammlungseinträge zu kategorisieren. Die Sammlungen können dann auch danach gefiltert werden.",
        en: "Tags are a comfortable way to categorize your collection items. The collections can also be filtered according to them.",
        fr: "Les mots-clés sont un moyen pratique de catégoriser les éléments de votre collection. Les collections peuvent ensuite être filtrées en conséquence.",
        it: "I tag sono un modo pratico per categorizzare gli elementi della tua collezione. Le collezioni possono poi essere filtrate in base a essi.",
        ch: "Tags èn ina moda cumadaivla per categorisar ils elements da tia collecziun. Las collecziuns pon lura era vegnir filtradas tenor quels.",
    },
    {
        de: `Hast du Wünsche? Kritik? Möchtest du den aktuellen Entwicklungsstatus einsehen, oder dich an der offiziellen Diskussion im waffenforum.ch beteiligen? Schau im Hauptmenü unter « ${preferenceTitles.about.de} » nach!`,
        en: `Have any suggestions? Feedback? Want to check out the current development status or join the official discussion on the waffenforum.ch? Head to « ${preferenceTitles.about.en} » » in the main menu!`,
        fr: `Des suggestions ? Des critiques ? Tu souhaites consulter l’état actuel du développement ou participer à la discussion officielle sur le waffenforum.ch ? Rendez-vous dans le menu principal, sous « ${preferenceTitles.about.fr} » » !`,
        it: `Hai suggerimenti? Critiche? Vuoi consultare lo stato attuale dello sviluppo o partecipare alla discussione ufficiale sul waffenforum.ch? Vai alla voce « ${preferenceTitles.about.it} » » nel menu principale!`,
        ch: `Has ti giavischs? Critica? Vuls ti consultar il stadi actual dal svilup u participar a la discussiun uffiziala en il waffenforum.ch? Va en il menu principal sut « ${preferenceTitles.about.ch} » »!`
},
];
