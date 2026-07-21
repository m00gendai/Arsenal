CREATE TABLE `costLoggerAmmunition` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`createdAt` integer NOT NULL,
	`reference` text,
	`amountBought` text,
	`totalCost` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `costLoggerAmmunition_uuid_unique` ON `costLoggerAmmunition` (`uuid`);--> statement-breakpoint
CREATE TABLE `costLoggerBullets` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`createdAt` integer NOT NULL,
	`reference` text,
	`amountBought` text,
	`totalCost` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `costLoggerBullets_uuid_unique` ON `costLoggerBullets` (`uuid`);--> statement-breakpoint
CREATE TABLE `costLoggerCasings` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`createdAt` integer NOT NULL,
	`reference` text,
	`amountBought` text,
	`totalCost` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `costLoggerCasings_uuid_unique` ON `costLoggerCasings` (`uuid`);--> statement-breakpoint
CREATE TABLE `costLoggerPowder` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`createdAt` integer NOT NULL,
	`reference` text,
	`amountBought` text,
	`totalCost` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `costLoggerPowder_uuid_unique` ON `costLoggerPowder` (`uuid`);--> statement-breakpoint
CREATE TABLE `costLoggerPrimers` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`createdAt` integer NOT NULL,
	`reference` text,
	`amountBought` text,
	`totalCost` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `costLoggerPrimers_uuid_unique` ON `costLoggerPrimers` (`uuid`);--> statement-breakpoint
ALTER TABLE `accessories_lightLaser` ADD `batteryType` text;--> statement-breakpoint
ALTER TABLE `accessories_optic` ADD `glassDimensions` text;--> statement-breakpoint
ALTER TABLE `accessories_optic` ADD `batteryType` text;--> statement-breakpoint
ALTER TABLE `accessories_scope` ADD `glassDimensions` text;--> statement-breakpoint
ALTER TABLE `accessories_scope` ADD `focalPlane` text;--> statement-breakpoint
ALTER TABLE `accessories_scope` ADD `batteryType` text;--> statement-breakpoint
ALTER TABLE `guns` ADD `pistol` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `guns` ADD `rifle` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `guns` ADD `shotgun` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `guns` ADD `sbr` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `guns` ADD `sbs` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `guns` ADD `aow` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `guns` ADD `machineGun` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `guns` ADD `dd` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `guns` ADD `pmf` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `guns` ADD `cr` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `guns` ADD `nfa` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `guns` ADD `antique` integer DEFAULT false;