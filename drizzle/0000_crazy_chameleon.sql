CREATE TABLE `ammo` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`createdAt` integer NOT NULL,
	`lastModifiedAt` integer,
	`images` text,
	`tags` text,
	`manufacturer` text,
	`designation` text NOT NULL,
	`originCountry` text,
	`caliber` text,
	`headstamp` text,
	`currentStock` text,
	`lastTopUpAt` text,
	`criticalStock` text,
	`remarks` text
);
--> statement-breakpoint
CREATE TABLE `ammoTags` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`color` text,
	`active` integer DEFAULT true
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ammoTag_label` ON `ammoTags` (`label`);--> statement-breakpoint
CREATE TABLE `guns` (
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
	`fullAuto` integer DEFAULT false,
	`exFullAuto` integer DEFAULT false,
	`highCapacityMagazine` integer DEFAULT false,
	`short` integer DEFAULT false,
	`launcher` integer DEFAULT false,
	`decepticon` integer DEFAULT false,
	`blooptoob` integer DEFAULT false,
	`grandfather` integer DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `gunReminder` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`label` text NOT NULL,
	`gun_id` text,
	FOREIGN KEY (`gun_id`) REFERENCES `guns`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `gunTags` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`color` text,
	`active` integer DEFAULT true
);
--> statement-breakpoint
CREATE UNIQUE INDEX `gunTag_label` ON `gunTags` (`label`);