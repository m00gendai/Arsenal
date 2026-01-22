import { SimpleTranslation } from "lib/Text/interfaces_text";
import { generalSettingsLabels, preferenceTitles } from "lib/textTemplates";

export const hintsTitle:SimpleTranslation = {
    de: "Willkommen in der Arsenal App!",
    en: "Welcome to the Arsenal App",
    fr: "Bienvenue dans l'application Arsenal",
    it: "Benvenuto nell'app Arsenal",           
    ch: "Buna vegniada a l'app Arsenal"        
}

export const hints: SimpleTranslation[] = [
    {
        de: `Diese Hinweise können jederzeit übers Hauptmenü wieder angezeigt werden, sollten sie geschlossen werden: Hauptmenu > ${preferenceTitles.generalSettings.de} > ${generalSettingsLabels.hintsDisplay.de}`,
        en: `These hints can be re-toggled any time in the main menu, should you close this window: Main Menu > ${preferenceTitles.generalSettings.en} > ${generalSettingsLabels.hintsDisplay.en}`,
        fr: `Ces indications peuvent être réaffichées à tout moment via le menu principal si cette fenêtre est fermée : Menu principal > ${preferenceTitles.generalSettings.fr} > ${generalSettingsLabels.hintsDisplay.fr}`,
        it: `Questi suggerimenti possono essere visualizzati di nuovo in qualsiasi momento dal menu principale, se questa finestra viene chiusa: Menu principale > ${preferenceTitles.generalSettings.it} > ${generalSettingsLabels.hintsDisplay.it}`,
        ch: `Quests avis pon vegnir mussads danovamain mintga mument via il menu principal, sche questa fanestra vegn serrada: Menu principal > ${preferenceTitles.generalSettings.ch} > ${generalSettingsLabels.hintsDisplay.ch}`,
    },
    {
        de: "Die App ist komplett offline, das heisst, die Datenbank wird nicht automatisch irgendwo synchronisiert. Exportiere sie von Zeit zu Zeit und speichere sie an einem sicheren Ort.",
        en: "The app is completely offline, meaning the database is not synchronized to anywhere. Export it from time to time and save it somewhere secure.",
        fr: "L’application fonctionne entièrement hors ligne, ce qui signifie que la base de données n’est pas synchronisée automatiquement. Exportez-la de temps en temps et conservez-la dans un endroit sûr.",
        it: "L’app funziona completamente offline, il che significa che il database non viene sincronizzato automaticamente. Esportalo di tanto in tanto e salvalo in un luogo sicuro.",
        ch: "L’app funcziuna cumplettamain offline, quai vul dir che la banca da datas na vegn betg sincronisada automaticamain. Exportescha ella mintgatant e memorisescha ella en in lieu segir.",
    },
    {
        de: "Wirf einen Blick in die Einstellungen. Dort können einige Ansichtsoptionen angepasst werden, zum Beispiel das Ausblenden von leeren Feldern oder kurze Kaliberbezeichnungen.",
        en: "Check out the settings. You can change a few display options there, like omitting empty fields or short caliber designations.",
        fr: "Jetez un œil aux paramètres. Vous pouvez y adapter certaines options d’affichage, par exemple masquer les champs vides ou utiliser des désignations de calibre abrégées.",
        it: "Dai un’occhiata alle impostazioni. Puoi modificare alcune opzioni di visualizzazione, ad esempio nascondere i campi vuoti o usare denominazioni di calibro abbreviate.",
        ch: "Fa in’egliada en las configuraziuns. Qua pon vegnir adattadas tschertas opziuns da visualisaziun, per exempel zuppar champs vids u duvrar denominaziuns da caliber abbreviadas.",
    },
    {
        de: `Die Autokomplettierung in gewissen Textfeldern ist sehr nützlich. Falls mal etwas falsch geschrieben wurde kannst du den Eintrag via "Hauptmenü > ${preferenceTitles.editData.de} > ${preferenceTitles.editData_Autocomplete.de}" wieder löschen.`,
        en: `Autocomplete in some text fields is very useful. Should you notice a typo, you can delete the entry via "Main Menu > ${preferenceTitles.editData.en} > ${preferenceTitles.editData_Autocomplete.en}"`,
        fr: `La saisie semi-automatique dans certains champs de texte est très utile. En cas de faute, vous pouvez supprimer l’entrée via "Menu principal > ${preferenceTitles.editData.fr} > ${preferenceTitles.editData_Autocomplete.fr}"".`,
        it: `Il completamento automatico in alcuni campi di testo è molto utile. Se noti un errore, puoi eliminare la voce tramite "Menu principale > ${preferenceTitles.editData.it} > ${preferenceTitles.editData_Autocomplete.it}".`,
        ch: `L’autocompletaziun en tscherts champs da text è fitg utila. Sche in pled è scrit fallà, pos ti stizzar l’entrada via "Menu principal > ${preferenceTitles.editData.ch} > ${preferenceTitles.editData_Autocomplete.ch}".`,
    },
    {
        de: "Schlagworte sind eine bequeme Option, deine Sammlungseinträge zu kategorisieren. Die Sammlungen können dann auch danach gefiltert werden.",
        en: "Tags are a comfortable way to categorize your collection items. The collections can also be filtered according to them.",
        fr: "Les mots-clés sont un moyen pratique de catégoriser les éléments de votre collection. Les collections peuvent ensuite être filtrées en conséquence.",
        it: "I tag sono un modo pratico per categorizzare gli elementi della tua collezione. Le collezioni possono poi essere filtrate in base a essi.",
        ch: "Tags èn ina moda cumadaivla per categorisar ils elements da tia collecziun. Las collecziuns pon lura era vegnir filtradas tenor quels.",
    }
];
