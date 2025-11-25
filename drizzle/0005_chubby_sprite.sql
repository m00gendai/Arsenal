CREATE TABLE `accessories_optic` (
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
	`acquisitionDate` text,
	`paidPrice` text,
	`boughtFrom` text,
	`marketValue` text,
	`shotCount` text,
	`lastShotAt` text,
	`lastCleanedAt` text,
	`cleanInterval` text,
	`batteryLastChangedAt` text,
	`mainColor` text,
	`remarks` text,
	`currentlyMountedOn` text,
	FOREIGN KEY (`uuid`) REFERENCES `accessoryCollection`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `accessories_opticTags` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`color` text,
	`active` integer DEFAULT true
);
--> statement-breakpoint
CREATE UNIQUE INDEX `opticTag_label` ON `accessories_opticTags` (`label`);--> statement-breakpoint
DROP INDEX `accessoryMount_accessoryId_unique`;