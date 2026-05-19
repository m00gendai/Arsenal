CREATE TABLE `logger` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`createdAt` integer NOT NULL,
	`reference` text,
	`collection` text,
	`changedField` text,
	`value_old` text,
	`value_new` text,
	`snapshot` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `logger_uuid_unique` ON `logger` (`uuid`);--> statement-breakpoint
ALTER TABLE `accessories_lightLaser` ADD `sold_isSold` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `accessories_lightLaser` ADD `sold_sellDate_unix` integer;--> statement-breakpoint
ALTER TABLE `accessories_lightLaser` ADD `sold_buyerName` text;--> statement-breakpoint
ALTER TABLE `accessories_lightLaser` ADD `sold_sellprice` text;--> statement-breakpoint
ALTER TABLE `accessories_lightLaser` ADD `sold_buyerPermit` text;--> statement-breakpoint
ALTER TABLE `accessories_lightLaser` ADD `sold_remarks` text;--> statement-breakpoint
ALTER TABLE `accessories_magazine` ADD `sold_isSold` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `accessories_magazine` ADD `sold_sellDate_unix` integer;--> statement-breakpoint
ALTER TABLE `accessories_magazine` ADD `sold_buyerName` text;--> statement-breakpoint
ALTER TABLE `accessories_magazine` ADD `sold_sellprice` text;--> statement-breakpoint
ALTER TABLE `accessories_magazine` ADD `sold_buyerPermit` text;--> statement-breakpoint
ALTER TABLE `accessories_magazine` ADD `sold_remarks` text;--> statement-breakpoint
ALTER TABLE `accessories_misc` ADD `sold_isSold` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `accessories_misc` ADD `sold_sellDate_unix` integer;--> statement-breakpoint
ALTER TABLE `accessories_misc` ADD `sold_buyerName` text;--> statement-breakpoint
ALTER TABLE `accessories_misc` ADD `sold_sellprice` text;--> statement-breakpoint
ALTER TABLE `accessories_misc` ADD `sold_buyerPermit` text;--> statement-breakpoint
ALTER TABLE `accessories_misc` ADD `sold_remarks` text;--> statement-breakpoint
ALTER TABLE `accessories_optic` ADD `sold_isSold` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `accessories_optic` ADD `sold_sellDate_unix` integer;--> statement-breakpoint
ALTER TABLE `accessories_optic` ADD `sold_buyerName` text;--> statement-breakpoint
ALTER TABLE `accessories_optic` ADD `sold_sellprice` text;--> statement-breakpoint
ALTER TABLE `accessories_optic` ADD `sold_buyerPermit` text;--> statement-breakpoint
ALTER TABLE `accessories_optic` ADD `sold_remarks` text;--> statement-breakpoint
ALTER TABLE `accessories_scope` ADD `sold_isSold` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `accessories_scope` ADD `sold_sellDate_unix` integer;--> statement-breakpoint
ALTER TABLE `accessories_scope` ADD `sold_buyerName` text;--> statement-breakpoint
ALTER TABLE `accessories_scope` ADD `sold_sellprice` text;--> statement-breakpoint
ALTER TABLE `accessories_scope` ADD `sold_buyerPermit` text;--> statement-breakpoint
ALTER TABLE `accessories_scope` ADD `sold_remarks` text;--> statement-breakpoint
ALTER TABLE `accessories_silencer` ADD `sold_isSold` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `accessories_silencer` ADD `sold_sellDate_unix` integer;--> statement-breakpoint
ALTER TABLE `accessories_silencer` ADD `sold_buyerName` text;--> statement-breakpoint
ALTER TABLE `accessories_silencer` ADD `sold_sellprice` text;--> statement-breakpoint
ALTER TABLE `accessories_silencer` ADD `sold_buyerPermit` text;--> statement-breakpoint
ALTER TABLE `accessories_silencer` ADD `sold_remarks` text;--> statement-breakpoint
ALTER TABLE `ammo` ADD `sold_isSold` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `ammo` ADD `sold_sellDate_unix` integer;--> statement-breakpoint
ALTER TABLE `ammo` ADD `sold_buyerName` text;--> statement-breakpoint
ALTER TABLE `ammo` ADD `sold_sellprice` text;--> statement-breakpoint
ALTER TABLE `ammo` ADD `sold_buyerPermit` text;--> statement-breakpoint
ALTER TABLE `ammo` ADD `sold_remarks` text;--> statement-breakpoint
ALTER TABLE `guns` ADD `sold_isSold` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `guns` ADD `sold_sellDate_unix` integer;--> statement-breakpoint
ALTER TABLE `guns` ADD `sold_buyerName` text;--> statement-breakpoint
ALTER TABLE `guns` ADD `sold_sellprice` text;--> statement-breakpoint
ALTER TABLE `guns` ADD `sold_buyerPermit` text;--> statement-breakpoint
ALTER TABLE `guns` ADD `sold_remarks` text;--> statement-breakpoint
ALTER TABLE `literature_book` ADD `sold_isSold` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `literature_book` ADD `sold_sellDate_unix` integer;--> statement-breakpoint
ALTER TABLE `literature_book` ADD `sold_buyerName` text;--> statement-breakpoint
ALTER TABLE `literature_book` ADD `sold_sellprice` text;--> statement-breakpoint
ALTER TABLE `literature_book` ADD `sold_buyerPermit` text;--> statement-breakpoint
ALTER TABLE `literature_book` ADD `sold_remarks` text;--> statement-breakpoint
ALTER TABLE `parts_barrel` ADD `sold_isSold` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `parts_barrel` ADD `sold_sellDate_unix` integer;--> statement-breakpoint
ALTER TABLE `parts_barrel` ADD `sold_buyerName` text;--> statement-breakpoint
ALTER TABLE `parts_barrel` ADD `sold_sellprice` text;--> statement-breakpoint
ALTER TABLE `parts_barrel` ADD `sold_buyerPermit` text;--> statement-breakpoint
ALTER TABLE `parts_barrel` ADD `sold_remarks` text;--> statement-breakpoint
ALTER TABLE `parts_conversionKit` ADD `sold_isSold` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `parts_conversionKit` ADD `sold_sellDate_unix` integer;--> statement-breakpoint
ALTER TABLE `parts_conversionKit` ADD `sold_buyerName` text;--> statement-breakpoint
ALTER TABLE `parts_conversionKit` ADD `sold_sellprice` text;--> statement-breakpoint
ALTER TABLE `parts_conversionKit` ADD `sold_buyerPermit` text;--> statement-breakpoint
ALTER TABLE `parts_conversionKit` ADD `sold_remarks` text;--> statement-breakpoint
ALTER TABLE `reloading_die` ADD `sold_isSold` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `reloading_die` ADD `sold_sellDate_unix` integer;--> statement-breakpoint
ALTER TABLE `reloading_die` ADD `sold_buyerName` text;--> statement-breakpoint
ALTER TABLE `reloading_die` ADD `sold_sellprice` text;--> statement-breakpoint
ALTER TABLE `reloading_die` ADD `sold_buyerPermit` text;--> statement-breakpoint
ALTER TABLE `reloading_die` ADD `sold_remarks` text;