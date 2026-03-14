CREATE TABLE `customShippingLabels` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`createdAt` integer NOT NULL,
	`name` text,
	`pageFormat)` text,
	`pageWidth` real,
	`pageHeight` real,
	`unit` text,
	`marginTop` real,
	`marginLeft` real,
	`labelWidth` real,
	`labelHeight` real,
	`horizontalPitch` real,
	`verticalPitch` real,
	`columns` real,
	`rows` real,
	`radius` real
);
--> statement-breakpoint
CREATE UNIQUE INDEX `customShippingLabels_uuid_unique` ON `customShippingLabels` (`uuid`);