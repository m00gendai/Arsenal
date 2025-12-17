PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_accessories_optic` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`createdAt` integer NOT NULL,
	`lastModifiedAt` integer,
	`images` text,
	`tags` text,
	`manufacturer` text,
	`name` text NOT NULL,
	`manufacturinDdate` text,
	`originCountry` text,
	`serial` text,
	`reticle` text,
	`reticleColor` text,
	`zoom` text,
	`unit` text,
	`clicksToUnitElevation` text,
	`clicksToUnitWindage` text,
	`material` text,
	`acquisitionDate_unix` integer,
	`paidPrice` text,
	`boughtFrom` text,
	`marketValue` text,
	`shotCount` text,
	`lastShotAt_unix` integer,
	`lastCleanedAt_unix` integer,
	`cleanInterval` text,
	`batteryLastChangedAt_unix` integer,
	`mainColor` text,
	`remarks` text,
	`currentlyMountedOn` text,
	FOREIGN KEY (`uuid`) REFERENCES `accessoryCollection`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_accessories_optic`("id", "uuid", "createdAt", "lastModifiedAt", "images", "tags", "manufacturer", "name", "manufacturinDdate", "originCountry", "serial", "reticle", "reticleColor", "zoom", "unit", "clicksToUnitElevation", "clicksToUnitWindage", "material", "acquisitionDate_unix", "paidPrice", "boughtFrom", "marketValue", "shotCount", "lastShotAt_unix", "lastCleanedAt_unix", "cleanInterval", "batteryLastChangedAt_unix", "mainColor", "remarks", "currentlyMountedOn") SELECT "id", "uuid", "createdAt", "lastModifiedAt", "images", "tags", "manufacturer", "name", "manufacturinDdate", "originCountry", "serial", "reticle", "reticleColor", "zoom", "unit", "clicksToUnitElevation", "clicksToUnitWindage", "material", "acquisitionDate_unix", "paidPrice", "boughtFrom", "marketValue", "shotCount", "lastShotAt_unix", "lastCleanedAt_unix", "cleanInterval", "batteryLastChangedAt_unix", "mainColor", "remarks", "currentlyMountedOn" FROM `accessories_optic`;--> statement-breakpoint
DROP TABLE `accessories_optic`;--> statement-breakpoint
ALTER TABLE `__new_accessories_optic` RENAME TO `accessories_optic`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_accessories_silencer` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`createdAt` integer NOT NULL,
	`lastModifiedAt` integer,
	`images` text,
	`tags` text,
	`manufacturer` text,
	`name` text NOT NULL,
	`manufacturinDdate` text,
	`originCountry` text,
	`caliber` text,
	`thread` text,
	`serial` text,
	`material` text,
	`decibelRating` text,
	`permit` text,
	`acquisitionDate_unix` integer,
	`paidPrice` text,
	`boughtFrom` text,
	`marketValue` text,
	`shotCount` text,
	`lastShotAt_unix` integer,
	`lastCleanedAt_unix` integer,
	`cleanInterval` text,
	`mainColor` text,
	`remarks` text,
	`currentlyMountedOn` text,
	FOREIGN KEY (`uuid`) REFERENCES `accessoryCollection`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_accessories_silencer`("id", "uuid", "createdAt", "lastModifiedAt", "images", "tags", "manufacturer", "name", "manufacturinDdate", "originCountry", "caliber", "thread", "serial", "material", "decibelRating", "permit", "acquisitionDate_unix", "paidPrice", "boughtFrom", "marketValue", "shotCount", "lastShotAt_unix", "lastCleanedAt_unix", "cleanInterval", "mainColor", "remarks", "currentlyMountedOn") SELECT "id", "uuid", "createdAt", "lastModifiedAt", "images", "tags", "manufacturer", "name", "manufacturinDdate", "originCountry", "caliber", "thread", "serial", "material", "decibelRating", "permit", "acquisitionDate_unix", "paidPrice", "boughtFrom", "marketValue", "shotCount", "lastShotAt_unix", "lastCleanedAt_unix", "cleanInterval", "mainColor", "remarks", "currentlyMountedOn" FROM `accessories_silencer`;--> statement-breakpoint
DROP TABLE `accessories_silencer`;--> statement-breakpoint
ALTER TABLE `__new_accessories_silencer` RENAME TO `accessories_silencer`;--> statement-breakpoint
CREATE TABLE `__new_parts_conversionKit` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`createdAt` integer NOT NULL,
	`lastModifiedAt` integer,
	`images` text,
	`tags` text,
	`manufacturer` text,
	`name` text NOT NULL,
	`manufacturinDdate` text,
	`originCountry` text,
	`caliber` text,
	`serial` text,
	`currentlyMountedOn` text,
	`permit` text,
	`acquisitionDate_unix` integer,
	`paidPrice` text,
	`boughtFrom` text,
	`marketValue` text,
	`shotCount` text,
	`lastShotAt_unix` integer,
	`lastCleanedAt_unix` integer,
	`cleanInterval` text,
	`mainColor` text,
	`remarks` text,
	FOREIGN KEY (`uuid`) REFERENCES `accessoryCollection`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_parts_conversionKit`("id", "uuid", "createdAt", "lastModifiedAt", "images", "tags", "manufacturer", "name", "manufacturinDdate", "originCountry", "caliber", "serial", "currentlyMountedOn", "permit", "acquisitionDate_unix", "paidPrice", "boughtFrom", "marketValue", "shotCount", "lastShotAt_unix", "lastCleanedAt_unix", "cleanInterval", "mainColor", "remarks") SELECT "id", "uuid", "createdAt", "lastModifiedAt", "images", "tags", "manufacturer", "name", "manufacturinDdate", "originCountry", "caliber", "serial", "currentlyMountedOn", "permit", "acquisitionDate_unix", "paidPrice", "boughtFrom", "marketValue", "shotCount", "lastShotAt_unix", "lastCleanedAt_unix", "cleanInterval", "mainColor", "remarks" FROM `parts_conversionKit`;--> statement-breakpoint
DROP TABLE `parts_conversionKit`;--> statement-breakpoint
ALTER TABLE `__new_parts_conversionKit` RENAME TO `parts_conversionKit`;--> statement-breakpoint
ALTER TABLE `ammo` ADD `lastTopUpAt_unix` integer;--> statement-breakpoint
ALTER TABLE `guns` ADD `acquisitionDate_unix` integer;--> statement-breakpoint
ALTER TABLE `guns` ADD `lastShotAt_unix` integer;--> statement-breakpoint
ALTER TABLE `guns` ADD `lastCleanedAt_unix` integer;