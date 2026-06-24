CREATE TABLE `reloading_bullet` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`createdAt` integer NOT NULL,
	`lastModifiedAt` integer,
	`images` text,
	`tags` text,
	`manufacturer` text,
	`name` text NOT NULL,
	`caliber` text,
	`bulletWeight` text,
	`bulletType` text,
	`ballisticCoefficient` text,
	`currentStock` text,
	`lastTopUpAt_unix` integer,
	`criticalStock` text,
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
CREATE UNIQUE INDEX `reloading_bullet_uuid_unique` ON `reloading_bullet` (`uuid`);--> statement-breakpoint
CREATE TABLE `reloading_case` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`createdAt` integer NOT NULL,
	`lastModifiedAt` integer,
	`images` text,
	`tags` text,
	`manufacturer` text,
	`name` text NOT NULL,
	`caliber` text,
	`headstamp` text,
	`primer` text,
	`caseLength` text,
	`material` text,
	`currentStock` text,
	`lastTopUpAt_unix` integer,
	`criticalStock` text,
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
CREATE UNIQUE INDEX `reloading_case_uuid_unique` ON `reloading_case` (`uuid`);--> statement-breakpoint
CREATE TABLE `reloading_powder` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`createdAt` integer NOT NULL,
	`lastModifiedAt` integer,
	`images` text,
	`tags` text,
	`manufacturer` text,
	`name` text NOT NULL,
	`texture` text,
	`application` text,
	`powderWeight` text,
	`lastTopUpAt_unix` integer,
	`criticalPowderWeight` text,
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
CREATE UNIQUE INDEX `reloading_powder_uuid_unique` ON `reloading_powder` (`uuid`);--> statement-breakpoint
CREATE TABLE `reloading_primer` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`createdAt` integer NOT NULL,
	`lastModifiedAt` integer,
	`images` text,
	`tags` text,
	`manufacturer` text,
	`name` text NOT NULL,
	`type` text,
	`currentStock` text,
	`lastTopUpAt_unix` integer,
	`criticalStock` text,
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
CREATE UNIQUE INDEX `reloading_primer_uuid_unique` ON `reloading_primer` (`uuid`);--> statement-breakpoint
CREATE TABLE `reloading_bulletTags` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`color` text,
	`active` integer DEFAULT true
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bulletTag_label` ON `reloading_bulletTags` (`label`);--> statement-breakpoint
CREATE TABLE `reloading_caseTags` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`color` text,
	`active` integer DEFAULT true
);
--> statement-breakpoint
CREATE UNIQUE INDEX `caseTag_label` ON `reloading_caseTags` (`label`);--> statement-breakpoint
CREATE TABLE `reloading_powderTags` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`color` text,
	`active` integer DEFAULT true
);
--> statement-breakpoint
CREATE UNIQUE INDEX `powderTag_label` ON `reloading_powderTags` (`label`);--> statement-breakpoint
CREATE TABLE `reloading_primerTags` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`color` text,
	`active` integer DEFAULT true
);
--> statement-breakpoint
CREATE UNIQUE INDEX `primerTag_label` ON `reloading_primerTags` (`label`);