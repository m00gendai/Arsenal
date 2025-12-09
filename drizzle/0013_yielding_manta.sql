CREATE TABLE `accessories_magazine` (
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
	`material` text,
	`serial` text,
	`permit` text,
	`capacity` text,
	`platform` text,
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
CREATE TABLE `accessories_magazineTags` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`color` text,
	`active` integer DEFAULT true
);
--> statement-breakpoint
CREATE UNIQUE INDEX `magazineTag_label` ON `accessories_magazineTags` (`label`);