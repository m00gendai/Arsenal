CREATE TABLE `accessories_scope` (
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
CREATE TABLE `accessories_scopeTags` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`color` text,
	`active` integer DEFAULT true
);
--> statement-breakpoint
CREATE UNIQUE INDEX `scopeTag_label` ON `accessories_scopeTags` (`label`);