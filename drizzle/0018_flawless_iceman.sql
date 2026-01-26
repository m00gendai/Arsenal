CREATE TABLE `literature_book` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`createdAt` integer NOT NULL,
	`lastModifiedAt` integer,
	`images` text,
	`tags` text,
	`language` text,
	`title` text,
	`subtitle` text,
	`isbn` text,
	`publishingDate` text,
	`author` text,
	`publisher` text,
	`edition` text,
	`series` text,
	`volume` text,
	`pages` text,
	`format` text,
	`acquisitionDate_unix` integer,
	`paidPrice` text,
	`boughtFrom` text,
	`marketValue` text,
	`remarks` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `literature_book_uuid_unique` ON `literature_book` (`uuid`);--> statement-breakpoint
CREATE TABLE `literature_bookTags` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`color` text,
	`active` integer DEFAULT true
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bookTag_label` ON `literature_bookTags` (`label`);