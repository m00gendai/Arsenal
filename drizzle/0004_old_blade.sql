CREATE TABLE `accessoryCollection` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `accessoryCollection_uuid_unique` ON `accessoryCollection` (`uuid`);--> statement-breakpoint
CREATE TABLE `accessoryMount` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`accessoryId` text NOT NULL,
	`parentGunId` text,
	`parentAccessoryId` text,
	FOREIGN KEY (`accessoryId`) REFERENCES `accessoryCollection`(`uuid`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`parentGunId`) REFERENCES `guns`(`uuid`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`parentAccessoryId`) REFERENCES `accessoryCollection`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `accessoryMount_uuid_unique` ON `accessoryMount` (`uuid`);--> statement-breakpoint
CREATE UNIQUE INDEX `accessoryMount_accessoryId_unique` ON `accessoryMount` (`accessoryId`);--> statement-breakpoint
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
	`currentlyMountedOn` text,
	FOREIGN KEY (`uuid`) REFERENCES `accessoryCollection`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_accessories_conversionKit`("id", "uuid", "createdAt", "lastModifiedAt", "images", "tags", "manufacturer", "name", "manufacturinDdate", "originCountry", "caliber", "serial", "currentlyMountedOn") SELECT "id", "uuid", "createdAt", "lastModifiedAt", "images", "tags", "manufacturer", "name", "manufacturinDdate", "originCountry", "caliber", "serial", "currentlyMountedOn" FROM `accessories_conversionKit`;--> statement-breakpoint
DROP TABLE `accessories_conversionKit`;--> statement-breakpoint
ALTER TABLE `__new_accessories_conversionKit` RENAME TO `accessories_conversionKit`;--> statement-breakpoint
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
	`currentlyMountedOn` text,
	FOREIGN KEY (`uuid`) REFERENCES `accessoryCollection`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_accessories_silencer`("id", "uuid", "createdAt", "lastModifiedAt", "images", "tags", "manufacturer", "name", "manufacturinDdate", "originCountry", "caliber", "serial", "material", "decibelRating", "permit", "acquisitionDate", "paidPrice", "boughtFrom", "marketValue", "shotCount", "lastShotAt", "lastCleanedAt", "cleanInterval", "mainColor", "remarks", "currentlyMountedOn") SELECT "id", "uuid", "createdAt", "lastModifiedAt", "images", "tags", "manufacturer", "name", "manufacturinDdate", "originCountry", "caliber", "serial", "material", "decibelRating", "permit", "acquisitionDate", "paidPrice", "boughtFrom", "marketValue", "shotCount", "lastShotAt", "lastCleanedAt", "cleanInterval", "mainColor", "remarks", "currentlyMountedOn" FROM `accessories_silencer`;--> statement-breakpoint
DROP TABLE `accessories_silencer`;--> statement-breakpoint
ALTER TABLE `__new_accessories_silencer` RENAME TO `accessories_silencer`;