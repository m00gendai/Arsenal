CREATE TABLE `ammunition` (
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
	`lastTopUpAt_unix` integer,
	`criticalStock` text,
	`remarks` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ammunition_uuid_unique` ON `ammunition` (`uuid`);