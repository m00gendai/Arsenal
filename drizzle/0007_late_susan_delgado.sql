ALTER TABLE `accessories_conversionKit` RENAME TO `parts_conversionKit`;--> statement-breakpoint
ALTER TABLE `accessories_conversionKitTags` RENAME TO `parts_conversionKitTags`;--> statement-breakpoint
CREATE TABLE `partCollection` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `partCollection_uuid_unique` ON `partCollection` (`uuid`);--> statement-breakpoint
CREATE TABLE `partMount` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`partId` text NOT NULL,
	`partType` text NOT NULL,
	`parentGunId` text,
	`parentGunType` text,
	`parentPartId` text,
	`parentPartType` text,
	FOREIGN KEY (`partId`) REFERENCES `partCollection`(`uuid`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`parentGunId`) REFERENCES `guns`(`uuid`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`parentPartId`) REFERENCES `partCollection`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `partMount_uuid_unique` ON `partMount` (`uuid`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
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
	FOREIGN KEY (`uuid`) REFERENCES `accessoryCollection`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_parts_conversionKit`("id", "uuid", "createdAt", "lastModifiedAt", "images", "tags", "manufacturer", "name", "manufacturinDdate", "originCountry", "caliber", "serial", "currentlyMountedOn") SELECT "id", "uuid", "createdAt", "lastModifiedAt", "images", "tags", "manufacturer", "name", "manufacturinDdate", "originCountry", "caliber", "serial", "currentlyMountedOn" FROM `parts_conversionKit`;--> statement-breakpoint
DROP TABLE `parts_conversionKit`;--> statement-breakpoint
ALTER TABLE `__new_parts_conversionKit` RENAME TO `parts_conversionKit`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `accessories_silencer` ADD `thread` text;--> statement-breakpoint
ALTER TABLE `accessoryMount` ADD `parentPartId` text REFERENCES partCollection(uuid);--> statement-breakpoint
ALTER TABLE `accessoryMount` ADD `parentPartType` text;