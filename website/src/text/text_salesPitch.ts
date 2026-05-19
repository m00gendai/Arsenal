interface SalesPitch_Content_Topic{
    intro: string
    list?: string[]
    outro?: string
}

interface SalesPitch_Content{
    tagline: string
    topics: SalesPitch_Content_Topic[]
}

export interface SalesPitch{
    de: SalesPitch_Content
    en: SalesPitch_Content
    fr: SalesPitch_Content
}

export const salesPitch: SalesPitch = {
    de: {
        tagline: `Arsenal ist <strong>die App zur Verwaltung der Waffensammlung</strong> - entwickelt in der Schweiz, von Sammlern für Sammlern.<br>
                    Verwalte deine Waffen, Munition und Zubehör - <strong>komplett offline, einmaliger Kauf, kein Abo</strong>.`,
        topics: [
            {
                intro: `Legen Sie eine <strong>Sammlung Ihrer Waffen</strong> an, mit Fotos und vielen Parametern, unter anderem:`,
                list: [
                    `Bis zu 5 Fotos mit Galeriemodus`,
                    `Kaliber (unterstützt mehrere pro Waffe, zB .357 Magnum, .38 Special) mit einfach zu handhabender Auswahlliste`,
                    `Erwerbsdatum mit Kalenderauswahl`,
                    `Farbe mit Farbauswahl`,
                    `Merkmale für Waffen gemäss Schweizer Waffengesetz Artikel 5`,
                    `Freie Bemerkungen`
                ],
                outro: `Fügen Sie auch individuelle Schlagworte hinzu!`
            },
            {
                intro: `Verwalten Sie auch Ihren <strong>Munitionsbestand</strong>:`,
                list: [
                    `Mengenänderungen können manuell eingegeben werden oder mit QuickShot/QuickStock schnell ausgeführt werden.`,
                    `Kritische Menge`,
                    `Freie Bemerkungen`,
                ],
            },
            {
                intro: `Behalten Sie auch ihr <strong>Zubehör</strong> und einzelne <strong>Waffenbestandteile</strong> unter Kontrolle:`,
                list: [
                    `Mehrere Unterkategorien von Zubehör und Waffenbestandteilen wie Schalldämpfer, Wechselläufe, Optiken, etc`,
                    `Jede Unterkategorie hat ihre eigenen Merkmale`,
                    `Weisen Sie ein Zubehör einem anderen Zubehör, einem Waffenbestandteil oder eine Waffe zu, mit optischem Merkmal in der Sammlungsübersicht!`,
                    `Weisen Sie ein Waffenbestandteil einem anderen Waffenbestanteil oder eine Waffe zu, mit optischem Merkmal in der Sammlungsübersicht!`,
                    `Ein erneutes Zuweisen auf etwas anderes oder ein Abmontieren ist mittels Schnellauswahl komfortabel erledigt`
                ],
            },
            {
                intro: `Auch die <strong>Fachbüchersammlung</strong> darf nicht fehlen!`,
            },
            {
                intro: `Erstellen Sie mit einem Knopfdruck <strong>PDF-Dateien</strong> von:`,
                list: [
                    `Der kompletten Waffen- und/oder Munitionssammlung als tabellarische Übersicht`,
                        `Der Waffensammlung gemäss Artikel 5 als tabellarische Übersicht`,
                        `Eines einzelnen Sammlungseintrages schön präsentiert (zum Beispiel für ans Schwarze Brett im Verein)`,
                ],
            },
            {
                intro: `<strong>QuickShot</strong>:`,
                outro: `Haben Sie mit einer Waffe geschossen? Mit einem Klick aus der Waffensammlung heraus können Sie die Schussbelastung anpassen - es werden automatisch die kompatiblen Munitionssorten aus dem Munitonsbestand angezeigt, somit wird mit Erhöhung der Schussbelastung automatisch auch der Munitonsbestand des ausgewählten Kalibers angepasst. Natürlich kann auch ohne den Bestand zu beeinflussen die Schussbelastung angepasst werden.`
            },
            {
                intro: `<strong>QuickStock</strong>:`,
                outro: `Hat sich Ihr Munitionsbestand geändert? Mit einem Klick aus der Munitionsübersicht heraus können Sie den Bestand anpassen, egal ob zu- oder abnehmend.`
            },
            {
                intro: `<strong>QuickMount</strong>:`,
                outro: `Ein Zubehör oder Waffenbestandteil schnell etwas anderem zuordnen, ohne den betreffenden Eintrag direkt editieren zu müssen.`
            },
            {
                intro: `<strong>Bestandswarnung</strong>:`,
                outro: `Haben Sie eine kritische Menge bei einer Munitionssorte angegeben, so warnt Sie die Munitionsübersicht optisch, wenn Ihr Bestand unter diese Menge fällt.`
            },
            {
                intro: `<strong>Reinigungserinnerung</strong>:`,
                outro: `Legen Sie fest, in welchen Intervallen etwas gereinigt werden sollte - mit vorgefertigten Zeitintervallen oder nach X Schuss!`
            },
            {
                intro: `<strong>Speichern und Importieren</strong> Sie Ihre Datenbanken - als komplette ZIP-Datei mit Datenbank und Bildern oder separat für jede Sammlung im CSV-Format (dann aber ohne Bilder)! Importieren Sie auch Ihre <strong>bestehenden Excel-Dateien (CSV)</strong>!`,
            },
            {
                intro: `<strong>Weitere Funktionen</strong>: `,
                outro: `Schlagwort-Filter, Suchfunktion, verschiedene Farbpaletten (hell und dunkel), Sortierfunktion, Autocomplete, Kachel-, Listen- und Kompaktansicht.`
            },
            {
                intro: `Alles ist zu <strong>100% offline</strong> und benötigt keinen Internetzugang. Alle Daten werden <strong>lokal auf dem Gerät</strong> gespeichert und können bei Bedarf exportiert werden. Keine Server, keine Telemetrie (abgesehen vom Playstore selbst).`,
            },
            {
                intro: `Die App ist in <strong>fünf Sprachen</strong> verfügbar: Deutsch, Französisch, Italienisch, Englisch und... Rumantsch Grischun!`,
                outro: `Sie wurde in der Schweiz entwickelt und richtet sich an Bedürfnisse von Schweizer Waffensammlern, kann aber selbstverständlich auf der ganzen Welt genutzt werden.`
            },
            {
                intro: `<strong>Einmal kaufen, immer nutzen</strong>! Für en Schnägg gibts Updates, so lange die App existiert. Keine monatlichen Raten, keine In-App-Käufe, keine Werbung!`,
            },
        ]
    },
    fr: {
        tagline: `Arsenal est le <strong>gestionnaire d’inventaire d’armes à feu et de collection d’armes</strong> pour les collectionneurs sérieux, développé en Suisse.<br>
                    Suivez vos armes, votre stock de munitions et vos accessoires - <strong>entièrement hors ligne, achat unique, sans abonnement</strong>.`,
        topics: [
            {
                intro: `Créez une <strong>collection de vos armes</strong>, avec des photos et de nombreux paramètres, notamment:`,
                list: [
                    `Jusqu’à 5 photos avec mode galerie`,
                        `Calibre (supporte plusieurs par arme, par ex. .357 Magnum, .38 Special) avec liste de sélection facile à utiliser`,
                        `Date d’acquisition avec sélection de calendrier`,
                        `Couleur avec sélection de couleur`,
                        `Caractéristiques des armes conformément à l’article 5 de la loi suisse sur les armes à feu`,
                        `Commentaires libres`,
                ],
                outro: `Vous pouvez également ajouter des mots-clés individuels!`
            },
            {
                intro: `Gérez également votre stock d’<strong>munitions</strong>:`,
                list: [
                    `Dernière modification de quantité avec sélection de calendrier ou automatiquement avec QuickShot/QuickStock`,
                        `Quantité critique `,
                        `Commentaires libres`,
                ],
            },
            {
                intro: `Gérez également vos accessoires<strong> et pièces d’armes</strong> sous contrôle:`,
                list: [
                    `Multiples sous-catégories d’accessoires et de pièces d’armes telles que silencieux, canons, optiques, etc`,
                        `Chaque sous-catégorie a ses propres paramètres`,
                        `Lier un accessoire à un autre accessoire, à une pièce d’arme ou à une arme, avec des représentations visuelles dans la vue d’ensemble de la collection!`,
                        `Lier une pièce d’arme à une autre pièce d’arme ou à une arme, avec des représentations visuelles dans la vue d’ensemble de la collection!`,
                        `Lier quelque chose à quelque chose d’autre ou le délier confortablement avec une action rapide`,
                ],
            },
            {
                intro: `N’oubliez pas votre <strong>collection de littérature spécialisée</strong>`,
            },
            {
                intro: `Créez des fichiers <strong>PDF</strong> en un seul clic:`,
                list: [
                    `La collection d’armes et/ou de munitions complète sous forme de tableau récapitulatif`,
                        `La collection d’armes conformément à l’article 5 sous forme de tableau récapitulatif`,
                        `Un article de la collection d’armes présenté de manière attrayante (par exemple pour l’affichage du club)`,
                ],
            },
            {
                intro: `<strong>QuickShot</strong>:`,
                outro: `Avez-vous tiré avec une arme? Vous pouvez modifier la charge de tir en un seul clic à partir de la collection d’armes – les types de munitions compatibles de la réserve de munitions sont automatiquement affichés, de sorte que la réserve de munitions du calibre sélectionné est automatiquement ajustée si la charge de tir est augmentée. Bien entendu, la charge de tir peut également être modifiée sans affecter la réserve.`
            },
            {
                intro: `<strong>QuickStock</strong>:`,
                outro: `Votre réserve de munitions a-t-elle changé? Vous pouvez modifier la réserve en un seul clic à partir du tableau récapitulatif des munitions, que ce soit en l’augmentant ou en la réduisant.`
            },
            {
                intro: `<strong>QuickMount</strong>:`,
                outro: `Lier rapidement un accessoire ou une pièce d’arme à un autre élément sans avoir à modifier directement la fiche d’information`
            },
            {
                intro: `<strong>Avertissement de réserve</strong>:`,
                outro: `Si vous avez défini une quantité critique pour un type de munition, le tableau récapitulatif des munitions vous avertit visuellement si votre réserve est inférieure à cette quantité.`
            },
            {
                intro: `<strong>Rappel de nettoyage</strong>:`,
                outro: `Définissez les intervalles à partir desquels vous souhaitez être rappelé de nettoyer quelque chose – choisissez parmi des intervalles de temps prédéfinis ou après X tirs.`
            },
            {
                intro: `<strong>Enregistrez et importez</strong> vos bases de données – en tant que fichier ZIP complet avec base de données et images ou séparément pour chaque collection au format CSV (sans images)! Importez vos fichiers <strong>Excel personnalisés</strong> (CSV) aussi!`,
            },
            {
                intro: `<strong>Autres fonctionnalités</strong>: `,
                outro: `Filtre de tags, fonction de recherche, plusieurs schémas de couleurs (clair et foncé), fonctions de tri, complétion automatique et affichage des collections sous forme de grille, de liste ou de liste compacte.`
            },
            {
                intro: `Tout est <strong>100% hors ligne</strong> et ne nécessite aucun accès à Internet. Toutes les données sont <strong>stockées localement sur l’appareil</strong> et peuvent être exportées si nécessaire. Pas de serveurs, pas de télémétrie (à l’exception du Playstore lui-même).`,
            },
            {
                intro: `L’application est disponible en <strong>cinq langues</strong>: allemand, français, italien, anglais et... Rumantsch Grischun!`,
                outro: `Elle a été développée en Suisse et répond aux besoins des collectionneurs d’armes suisses, mais peut bien entendu être utilisée dans le monde entier.`
            },
            {
                intro: `<strong>Achetez une fois, utilisez toujours</strong>! Il y a des mises à jour pendant cinq ans tant que l’application existe. Pas d’abonnement mensuel, pas d’achats intégrés, pas de publicité!`,
            },
        ]
    },
    en: {
        tagline: `Arsenal is the <strong>firearm inventory and gun collection manager</strong> for serious collectors, made in Switzerland.<br>
                    Track your guns, ammo stock, and accessories - <strong>fully offline, one-time purchase, no subscription</strong>.`,
        topics: [
            {
                intro: `Create a <strong>collection of your weapons</strong>, with photos and many parameters, including:`,
                list: [
                    `Up to 5 photos with gallery mode`,
                        `Caliber (supports multiple per gun, e.g. .357 Magnum, .38 Special) with easy to use selection list`,
                        `Acquisition date with calendar selection`,
                        `Color with color selection`,
                        `Features for weapons according to Swiss Weapons Act Article 5`,
                        `Free comments`,
                ],
                outro: `You can also add individual keywords!`
            },
            {
                intro: `Manage your <strong>ammunition stock</strong>, too:`,
                list: [
                    `Last quantity change with calendar selection or automatically with QuickShot/QuickStock`,
                        `Critical quantity `,
                        `Free comments`,
                ],
            },
            {
                intro: `Keep your <strong>accessories</strong> and <strong>weapon parts</strong> under control, too:`,
                list: [
                     `Multiple subcategories of accessories and weapon parts such as silencers, barrels, optics, etc`,
                        `Each subcategory has its own parameters`,
                        `Link an accessory to another accessory, a weapon part or a gun, with visual depictions in the collection overview!`,
                        `Link a weapon part to another weapon part or a gun, with visual depictions in the collection overview!`,
                        `Quickly link something to something else or unlink it comfortably with a quick action`,
                ],
            },
            {
                intro: `Don't forget your <strong>collection of specialized literature</strong>!`,
            },
            {
                intro: `Create <strong>PDF files</strong> at the touch of a button:`,
                list: [
                    `The complete weapons and/or ammunition collection as a tabular overview`,
                        `The weapons collection in accordance with Article 5 as a tabular overview`,
                        `An individual collection item presented nicely (e.g. for the club notice board)`,
                ],
            },
            {
                intro: `<strong>QuickShot</strong>:`,
                outro: `Have you fired a weapon? With one click from the gun collection you can adjust the shot load - the compatible ammunition types from the ammunition stock are automatically displayed, so the ammunition stock of the selected caliber is automatically adjusted when the shot load is increased. Of course, the shot load can also be adjusted without affecting the stock.`
            },
            {
                intro: `<strong>QuickStock</strong>:`,
                outro: `Has your ammunition stock changed? With one click from the ammunition overview, you can adjust the stock, whether increasing or decreasing.`
            },
            {
                intro: `<strong>QuickMount</strong>:`,
                outro: `Quickly link an accessory or a weapon part to something else without having to edit the entry directly`
            },
            {
                intro: `<strong>Stock warning</strong>:`,
                outro: `If you have specified a critical quantity for a type of ammunition, the ammunition overview will give you a visual warning if your stock falls below this quantity.`
            },
            {
                intro: `<strong>Cleaning reminder</strong>:`,
                outro: `Define in what intervals you want to be reminded to clean something - choose from predefined time intervals or after X shots fired.`
            },
            {
                intro: `<strong>Save and import</strong> your databases - as a complete ZIP-file with database and images or separately for each collection in CSV-format (without images)! Import your <strong>custom Excel files</strong>, too (CSV)!`,
            },
            {
                intro: `<strong>Other functionality</strong>: `,
                outro: `Tag filter, search function, multiple color schemes (light and dark), sorting functions, autocomplete and collection display as grid, list or compact list.`
            },
            {
                intro: `Everything is <strong>100% offline</strong> and requires no internet access. All data is <strong>stored locally on the device</strong> and can be exported if required. No servers, no telemetry (apart from the Playstore itself).`,
            },
            {
                intro: `The app is available in <strong>five languages</strong>: German, French, Italian, English and... Rumantsch Grischun!`,
                outro: `It was developed in Switzerland and is aimed at the needs of Swiss gun collectors, but can of course be used all over the world.`
            },
            {
                intro: `<strong>Buy once, use always</strong>! There are updates for a fiver as long as the app exists. No monthly installments, no in-app purchases, no advertising!`,
            },
        ]
    },
}