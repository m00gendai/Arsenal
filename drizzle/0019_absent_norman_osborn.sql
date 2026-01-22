ALTER TABLE `parts_barrel` RENAME COLUMN "length" TO "barrelLength";--> statement-breakpoint
CREATE TABLE `autocomplete` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text NOT NULL,
	`label` text NOT NULL,
	`field` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `autocomplete_label_unique` ON `autocomplete` (`label`);--> statement-breakpoint
ALTER TABLE `parts_barrel` ADD `cleanInterval_CustomTime` text;--> statement-breakpoint
ALTER TABLE `parts_barrel` ADD `cleanInterval_ShotCount` text;--> statement-breakpoint
ALTER TABLE `parts_barrel` ADD `cleanIntervalDisplay` text;--> statement-breakpoint
ALTER TABLE `parts_barrel` ADD `customInventoryDesignation` text;--> statement-breakpoint
ALTER TABLE `accessories_lightLaser` ADD `candela` text;--> statement-breakpoint
ALTER TABLE `accessories_lightLaser` ADD `customInventoryDesignation` text;--> statement-breakpoint
ALTER TABLE `accessories_magazine` ADD `cleanInterval_CustomTime` text;--> statement-breakpoint
ALTER TABLE `accessories_magazine` ADD `cleanInterval_ShotCount` text;--> statement-breakpoint
ALTER TABLE `accessories_magazine` ADD `cleanIntervalDisplay` text;--> statement-breakpoint
ALTER TABLE `accessories_magazine` ADD `customInventoryDesignation` text;--> statement-breakpoint
ALTER TABLE `accessories_misc` ADD `serial` text;--> statement-breakpoint
ALTER TABLE `accessories_misc` ADD `customInventoryDesignation` text;--> statement-breakpoint
ALTER TABLE `accessories_optic` ADD `footprint` text;--> statement-breakpoint
ALTER TABLE `accessories_optic` ADD `cleanInterval_CustomTime` text;--> statement-breakpoint
ALTER TABLE `accessories_optic` ADD `cleanInterval_ShotCount` text;--> statement-breakpoint
ALTER TABLE `accessories_optic` ADD `cleanIntervalDisplay` text;--> statement-breakpoint
ALTER TABLE `accessories_optic` ADD `customInventoryDesignation` text;--> statement-breakpoint
ALTER TABLE `accessories_scope` ADD `cleanInterval_CustomTime` text;--> statement-breakpoint
ALTER TABLE `accessories_scope` ADD `cleanInterval_ShotCount` text;--> statement-breakpoint
ALTER TABLE `accessories_scope` ADD `cleanIntervalDisplay` text;--> statement-breakpoint
ALTER TABLE `accessories_scope` ADD `customInventoryDesignation` text;--> statement-breakpoint
ALTER TABLE `accessories_silencer` ADD `cleanInterval_CustomTime` text;--> statement-breakpoint
ALTER TABLE `accessories_silencer` ADD `cleanInterval_ShotCount` text;--> statement-breakpoint
ALTER TABLE `accessories_silencer` ADD `cleanIntervalDisplay` text;--> statement-breakpoint
ALTER TABLE `accessories_silencer` ADD `customInventoryDesignation` text;--> statement-breakpoint
ALTER TABLE `ammo` ADD `bulletWeight` text;--> statement-breakpoint
ALTER TABLE `ammo` ADD `bulletType` text;--> statement-breakpoint
ALTER TABLE `ammo` ADD `customInventoryDesignation` text;--> statement-breakpoint
ALTER TABLE `guns` ADD `cleanInterval_CustomTime` text;--> statement-breakpoint
ALTER TABLE `guns` ADD `cleanInterval_ShotCount` text;--> statement-breakpoint
ALTER TABLE `guns` ADD `cleanIntervalDisplay` text;--> statement-breakpoint
ALTER TABLE `guns` ADD `customInventoryDesignation` text;--> statement-breakpoint
ALTER TABLE `literature_book` ADD `customInventoryDesignation` text;--> statement-breakpoint
ALTER TABLE `parts_conversionKit` ADD `cleanInterval_CustomTime` text;--> statement-breakpoint
ALTER TABLE `parts_conversionKit` ADD `cleanInterval_ShotCount` text;--> statement-breakpoint
ALTER TABLE `parts_conversionKit` ADD `cleanIntervalDisplay` text;--> statement-breakpoint
ALTER TABLE `parts_conversionKit` ADD `customInventoryDesignation` text;