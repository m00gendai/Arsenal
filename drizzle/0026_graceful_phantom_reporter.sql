CREATE TABLE `literature_printMagazine` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`createdAt` integer NOT NULL,
	`lastModifiedAt` integer,
	`images` text,
	`tags` text,
	`language` text,
	`title` text,
	`subtitle` text,
	`publishingDate` text,
	`publisher` text,
	`volume_printMagazine` text,
	`issue` text,
	`wholeNumber` text,
	`issn` text,
	`pages` text,
	`format` text,
	`acquisitionDate_unix` integer,
	`paidPrice` text,
	`boughtFrom` text,
	`marketValue` text,
	`remarks` text,
	`customInventoryDesignation` text,
	`qrCode` text,
	`sold_isSold` integer DEFAULT false,
	`sold_sellDate_unix` integer,
	`sold_buyerName` text,
	`sold_sellprice` text,
	`sold_buyerPermit` text,
	`sold_remarks` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `literature_printMagazine_uuid_unique` ON `literature_printMagazine` (`uuid`);--> statement-breakpoint
CREATE TABLE `literature_printMagazineTags` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`color` text,
	`active` integer DEFAULT true
);
--> statement-breakpoint
CREATE UNIQUE INDEX `printMagazineTag_label` ON `literature_printMagazineTags` (`label`);--> statement-breakpoint
CREATE TABLE `parts_pistolFrame` (
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
	`cleanInterval_CustomTime` text,
	`cleanInterval_ShotCount` text,
	`cleanIntervalDisplay` text,
	`mainColor` text,
	`remarks` text,
	`customInventoryDesignation` text,
	`qrCode` text,
	`sold_isSold` integer DEFAULT false,
	`sold_sellDate_unix` integer,
	`sold_buyerName` text,
	`sold_sellprice` text,
	`sold_buyerPermit` text,
	`sold_remarks` text,
	`de_wbkColor` text,
	`de_wbkNumber` text,
	`de_wbkRunningNumber` text,
	`de_nwrId` text,
	FOREIGN KEY (`uuid`) REFERENCES `partCollection`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `parts_pistolSlide` (
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
	`cleanInterval_CustomTime` text,
	`cleanInterval_ShotCount` text,
	`cleanIntervalDisplay` text,
	`mainColor` text,
	`remarks` text,
	`customInventoryDesignation` text,
	`qrCode` text,
	`sold_isSold` integer DEFAULT false,
	`sold_sellDate_unix` integer,
	`sold_buyerName` text,
	`sold_sellprice` text,
	`sold_buyerPermit` text,
	`sold_remarks` text,
	`de_wbkColor` text,
	`de_wbkNumber` text,
	`de_wbkRunningNumber` text,
	`de_nwrId` text,
	FOREIGN KEY (`uuid`) REFERENCES `partCollection`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `parts_rifleLower` (
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
	`cleanInterval_CustomTime` text,
	`cleanInterval_ShotCount` text,
	`cleanIntervalDisplay` text,
	`mainColor` text,
	`remarks` text,
	`customInventoryDesignation` text,
	`qrCode` text,
	`sold_isSold` integer DEFAULT false,
	`sold_sellDate_unix` integer,
	`sold_buyerName` text,
	`sold_sellprice` text,
	`sold_buyerPermit` text,
	`sold_remarks` text,
	`de_wbkColor` text,
	`de_wbkNumber` text,
	`de_wbkRunningNumber` text,
	`de_nwrId` text,
	FOREIGN KEY (`uuid`) REFERENCES `partCollection`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `parts_rifleUpper` (
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
	`cleanInterval_CustomTime` text,
	`cleanInterval_ShotCount` text,
	`cleanIntervalDisplay` text,
	`mainColor` text,
	`remarks` text,
	`customInventoryDesignation` text,
	`qrCode` text,
	`sold_isSold` integer DEFAULT false,
	`sold_sellDate_unix` integer,
	`sold_buyerName` text,
	`sold_sellprice` text,
	`sold_buyerPermit` text,
	`sold_remarks` text,
	`de_wbkColor` text,
	`de_wbkNumber` text,
	`de_wbkRunningNumber` text,
	`de_nwrId` text,
	FOREIGN KEY (`uuid`) REFERENCES `partCollection`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `parts_pistolFrameTags` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`color` text,
	`active` integer DEFAULT true
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pistolFrameTag_label` ON `parts_pistolFrameTags` (`label`);--> statement-breakpoint
CREATE TABLE `parts_pistolSlideTags` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`color` text,
	`active` integer DEFAULT true
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pistolSlideTag_label` ON `parts_pistolSlideTags` (`label`);--> statement-breakpoint
CREATE TABLE `parts_rifleLowerTags` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`color` text,
	`active` integer DEFAULT true
);
--> statement-breakpoint
CREATE UNIQUE INDEX `rifleLowerTag_label` ON `parts_rifleLowerTags` (`label`);--> statement-breakpoint
CREATE TABLE `parts_rifleUpperTags` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`color` text,
	`active` integer DEFAULT true
);
--> statement-breakpoint
CREATE UNIQUE INDEX `rifleUpperTag_label` ON `parts_rifleUpperTags` (`label`);--> statement-breakpoint
ALTER TABLE `accessories_silencer` ADD `de_wbkColor` text;--> statement-breakpoint
ALTER TABLE `accessories_silencer` ADD `de_wbkNumber` text;--> statement-breakpoint
ALTER TABLE `accessories_silencer` ADD `de_wbkRunningNumber` text;--> statement-breakpoint
ALTER TABLE `accessories_silencer` ADD `de_nwrId` text;--> statement-breakpoint
ALTER TABLE `ammo` ADD `casingType` text;--> statement-breakpoint
ALTER TABLE `ammo` ADD `shotWeight` text;--> statement-breakpoint
ALTER TABLE `ammo` ADD `velocity` text;--> statement-breakpoint
ALTER TABLE `ammo` ADD `drameq` text;--> statement-breakpoint
ALTER TABLE `guns` ADD `overallLength` text;--> statement-breakpoint
ALTER TABLE `guns` ADD `barrelLength` text;--> statement-breakpoint
ALTER TABLE `guns` ADD `thread` text;--> statement-breakpoint
ALTER TABLE `guns` ADD `de_wbkColor` text;--> statement-breakpoint
ALTER TABLE `guns` ADD `de_wbkNumber` text;--> statement-breakpoint
ALTER TABLE `guns` ADD `de_wbkRunningNumber` text;--> statement-breakpoint
ALTER TABLE `guns` ADD `de_nwrId` text;--> statement-breakpoint
ALTER TABLE `parts_barrel` ADD `de_wbkColor` text;--> statement-breakpoint
ALTER TABLE `parts_barrel` ADD `de_wbkNumber` text;--> statement-breakpoint
ALTER TABLE `parts_barrel` ADD `de_wbkRunningNumber` text;--> statement-breakpoint
ALTER TABLE `parts_barrel` ADD `de_nwrId` text;--> statement-breakpoint
ALTER TABLE `parts_conversionKit` ADD `de_wbkColor` text;--> statement-breakpoint
ALTER TABLE `parts_conversionKit` ADD `de_wbkNumber` text;--> statement-breakpoint
ALTER TABLE `parts_conversionKit` ADD `de_wbkRunningNumber` text;--> statement-breakpoint
ALTER TABLE `parts_conversionKit` ADD `de_nwrId` text;