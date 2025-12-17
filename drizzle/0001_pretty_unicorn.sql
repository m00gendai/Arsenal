CREATE TABLE `accessories_conversionKit` (
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
	`gun_id` text,
	FOREIGN KEY (`gun_id`) REFERENCES `guns`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `accessories_conversionKit_uuid_unique` ON `accessories_conversionKit` (`uuid`);--> statement-breakpoint
CREATE TABLE `accessories_silencer` (
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
	`gun_id` text,
	`conversionKit_id` text,
	FOREIGN KEY (`gun_id`) REFERENCES `guns`(`uuid`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`conversionKit_id`) REFERENCES `accessories_conversionKit`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `accessories_silencer_uuid_unique` ON `accessories_silencer` (`uuid`);--> statement-breakpoint
CREATE TABLE `accessories_conversionKitsTags` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`color` text,
	`active` integer DEFAULT true
);
--> statement-breakpoint
CREATE UNIQUE INDEX `conversionKitTag_label` ON `accessories_conversionKitsTags` (`label`);--> statement-breakpoint
CREATE TABLE `accessories_silencerTags` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`color` text,
	`active` integer DEFAULT true
);
--> statement-breakpoint
CREATE UNIQUE INDEX `silencerTag_label` ON `accessories_silencerTags` (`label`);--> statement-breakpoint
CREATE UNIQUE INDEX `ammo_uuid_unique` ON `ammo` (`uuid`);--> statement-breakpoint
CREATE UNIQUE INDEX `guns_uuid_unique` ON `guns` (`uuid`);