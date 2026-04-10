CREATE TABLE `reloading_die` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`createdAt` integer NOT NULL,
	`lastModifiedAt` integer,
	`images` text,
	`tags` text,
	`manufacturer` text,
	`name` text NOT NULL,
	`caliber` text,
	`dieSeries` text,
	`group` text,
	`partNumber` text,
	`shellHolder` text,
	`acquisitionDate_unix` integer,
	`paidPrice` text,
	`boughtFrom` text,
	`marketValue` text,
	`remarks` text,
	`customInventoryDesignation` text,
	`qrCode` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `reloading_die_uuid_unique` ON `reloading_die` (`uuid`);--> statement-breakpoint
CREATE TABLE `reloading_dieTags` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`color` text,
	`active` integer DEFAULT true
);
--> statement-breakpoint
CREATE UNIQUE INDEX `dieTag_label` ON `reloading_dieTags` (`label`);