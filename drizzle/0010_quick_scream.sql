CREATE TABLE `accessories_lightLaser` (
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
	`permit` text,
	`lumen` text,
	`wavelength` text,
	`laserPower` text,
	`acquisitionDate_unix` integer,
	`paidPrice` text,
	`boughtFrom` text,
	`marketValue` text,
	`shotCount` text,
	`lastShotAt_unix` integer,
	`batteryLastChangedAt_unix` integer,
	`mainColor` text,
	`remarks` text,
	`currentlyMountedOn` text,
	FOREIGN KEY (`uuid`) REFERENCES `accessoryCollection`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `accessories_lightLaserTags` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`color` text,
	`active` integer DEFAULT true
);
--> statement-breakpoint
CREATE UNIQUE INDEX `lightLaserTag_label` ON `accessories_lightLaserTags` (`label`);