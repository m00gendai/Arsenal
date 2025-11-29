PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_accessories_conversionKit` (
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
	`currentlyMountedOn` text
);
--> statement-breakpoint
INSERT INTO `__new_accessories_conversionKit`("id", "uuid", "createdAt", "lastModifiedAt", "images", "tags", "manufacturer", "name", "manufacturinDdate", "originCountry", "caliber", "serial", "currentlyMountedOn") SELECT "id", "uuid", "createdAt", "lastModifiedAt", "images", "tags", "manufacturer", "name", "manufacturinDdate", "originCountry", "caliber", "serial", "currentlyMountedOn" FROM `accessories_conversionKit`;--> statement-breakpoint
DROP TABLE `accessories_conversionKit`;--> statement-breakpoint
ALTER TABLE `__new_accessories_conversionKit` RENAME TO `accessories_conversionKit`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `accessories_conversionKit_uuid_unique` ON `accessories_conversionKit` (`uuid`);--> statement-breakpoint
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
	`serial` text,
	`material` text,
	`decibelRating` text,
	`permit` text,
	`acquisitionDate` text,
	`paidPrice` text,
	`boughtFrom` text,
	`marketValue` text,
	`shotCount` text,
	`lastShotAt` text,
	`lastCleanedAt` text,
	`cleanInterval` text,
	`mainColor` text,
	`remarks` text,
	`currentlyMountedOn` text
);
--> statement-breakpoint
INSERT INTO `__new_accessories_silencer`("id", "uuid", "createdAt", "lastModifiedAt", "images", "tags", "manufacturer", "name", "manufacturinDdate", "originCountry", "caliber", "serial", "material", "decibelRating", "permit", "acquisitionDate", "paidPrice", "boughtFrom", "marketValue", "shotCount", "lastShotAt", "lastCleanedAt", "cleanInterval", "mainColor", "remarks", "currentlyMountedOn") SELECT "id", "uuid", "createdAt", "lastModifiedAt", "images", "tags", "manufacturer", "name", "manufacturinDdate", "originCountry", "caliber", "serial", "material", "decibelRating", "permit", "acquisitionDate", "paidPrice", "boughtFrom", "marketValue", "shotCount", "lastShotAt", "lastCleanedAt", "cleanInterval", "mainColor", "remarks", "currentlyMountedOn" FROM `accessories_silencer`;--> statement-breakpoint
DROP TABLE `accessories_silencer`;--> statement-breakpoint
ALTER TABLE `__new_accessories_silencer` RENAME TO `accessories_silencer`;--> statement-breakpoint
CREATE UNIQUE INDEX `accessories_silencer_uuid_unique` ON `accessories_silencer` (`uuid`);