CREATE TABLE `parts_barrel` (
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
	`thread` text,
	`length` text,
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
	FOREIGN KEY (`uuid`) REFERENCES `partCollection`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `parts_barrelTags` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`color` text,
	`active` integer DEFAULT true
);
--> statement-breakpoint
CREATE UNIQUE INDEX `barrelTag_label` ON `parts_barrelTags` (`label`);