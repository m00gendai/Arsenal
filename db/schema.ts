import { relations } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const gunCollection = sqliteTable('guns', {
    db_id: integer('id').primaryKey().notNull(),
    id: text("uuid").notNull().unique(),
    createdAt: integer("createdAt").notNull(),
    lastModifiedAt: integer("lastModifiedAt"),
    images: text("images", {mode: "json"}),
    tags: text("tags", {mode: "json"}),
    manufacturer: text("manufacturer"),
    model: text('name').notNull(),
    manufacturingDate: text("manufacturinDdate"),
    originCountry: text("originCountry"),
    caliber: text("caliber", {mode: "json"}),
    serial: text("serial"),
    permit: text("permit"),
    acquisitionDate: text("acquisitionDate"),
    paidPrice: text("paidPrice"),
    boughtFrom: text("boughtFrom"),
    marketValue: text("marketValue"),
    shotCount: text("shotCount"),
    lastShotAt: text("lastShotAt"),
    lastCleanedAt: text("lastCleanedAt"),
    cleanInterval: text("cleanInterval", {enum: ["none", "day_1", "day_7", "day_14", "month_1", "month_3", "month_6", "month_9", "year_1", "year_5", "year_10"]}),
    mainColor: text("mainColor"),
    remarks: text("remarks"),
    fullAuto: integer("fullAuto", {mode: "boolean"}).default(false),
    exFullAuto: integer("exFullAuto", {mode: "boolean"}).default(false),
    highCapacityMagazine: integer("highCapacityMagazine", {mode: "boolean"}).default(false),
    short: integer("short", {mode: "boolean"}).default(false),
    launcher: integer("launcher", {mode: "boolean"}).default(false),
    decepticon: integer("decepticon", {mode: "boolean"}).default(false),
    blooptoob: integer("blooptoob", {mode: "boolean"}).default(false),
    grandfather: integer("grandfather", {mode: "boolean"}).default(false),
})

export const gunTags = sqliteTable("gunTags", {
    db_id: integer('id').primaryKey().notNull(),
    label: text("label").notNull().unique("gunTag_label"),
    color: text("color"),
    active: integer("active", {mode: "boolean"}).default(true),
})

export const ammoCollection = sqliteTable("ammo", {
    db_id: integer('id').primaryKey().notNull(),
    id: text("uuid").notNull().unique(),
    createdAt: integer("createdAt").notNull(),
    lastModifiedAt: integer("lastModifiedAt"),
    images: text("images", {mode: "json"}),
    tags: text("tags", {mode: "json"}),
    manufacturer: text("manufacturer"),
    designation: text("designation").notNull(),
    originCountry: text("originCountry"),
    caliber: text("caliber"),
    headstamp: text("headstamp"),
    currentStock: text("currentStock"),
    lastTopUpAt: text("lastTopUpAt"),
    criticalStock: text("criticalStock"),
    remarks: text("remarks"),
})

export const ammoTags = sqliteTable("ammoTags", {
    db_id: integer('id').primaryKey().notNull(),
    label: text("label").notNull().unique("ammoTag_label"),
    color: text("color"),
    active: integer("active", {mode: "boolean"}).default(true),
})

export const accessoryCollection_ConversionKit = sqliteTable("accessories_conversionKit", {
    db_id: integer('id').primaryKey().notNull(),
    id: text("uuid").notNull().unique(),
    createdAt: integer("createdAt").notNull(),
    lastModifiedAt: integer("lastModifiedAt"),
    images: text("images", {mode: "json"}),
    tags: text("tags", {mode: "json"}),
    manufacturer: text("manufacturer"),
    model: text('name').notNull(),
    manufacturingDate: text("manufacturinDdate"),
    originCountry: text("originCountry"),
    caliber: text("caliber", {mode: "json"}),
    serial: text("serial"),
    currentlyMountedOn: text("currentlyMountedOn")
})

export const accessory_ConversionKitTags = sqliteTable("accessories_conversionKitTags", {
    db_id: integer('id').primaryKey().notNull(),
    label: text("label").notNull().unique("conversionKitTag_label"),
    color: text("color"),
    active: integer("active", {mode: "boolean"}).default(true),
})

export const accessoryCollection_Silencer = sqliteTable("accessories_silencer", {
    db_id: integer('id').primaryKey().notNull(),
    id: text("uuid").notNull().unique(),
    createdAt: integer("createdAt").notNull(),
    lastModifiedAt: integer("lastModifiedAt"),
    images: text("images", {mode: "json"}),
    tags: text("tags", {mode: "json"}),
    manufacturer: text("manufacturer"),
    model: text('name').notNull(),
    manufacturingDate: text("manufacturinDdate"),
    originCountry: text("originCountry"),
    caliber: text("caliber", {mode: "json"}),
    serial: text("serial"),
    material: text("material"),
    decibelRating: text("decibelRating"),
    permit: text("permit"),
    acquisitionDate: text("acquisitionDate"),
    paidPrice: text("paidPrice"),
    boughtFrom: text("boughtFrom"),
    marketValue: text("marketValue"),
    shotCount: text("shotCount"),
    lastShotAt: text("lastShotAt"),
    lastCleanedAt: text("lastCleanedAt"),
    cleanInterval: text("cleanInterval", {enum: ["none", "day_1", "day_7", "day_14", "month_1", "month_3", "month_6", "month_9", "year_1", "year_5", "year_10"]}),
    mainColor: text("mainColor"),
    remarks: text("remarks"),
    currentlyMountedOn: text("currentlyMountedOn")
})

export const accessory_SilencerTags = sqliteTable("accessories_silencerTags", {
    db_id: integer('id').primaryKey().notNull(),
    label: text("label").notNull().unique("silencerTag_label"),
    color: text("color"),
    active: integer("active", {mode: "boolean"}).default(true),
})

export const gunReminders = sqliteTable("gunReminder",{
    db_id: integer('id').primaryKey().notNull(),
    id: text("uuid").notNull(),
    label: text("label").notNull(),
    gun_id: text('gun_id').references(() => gunCollection.id),
})

// RELATIONS

export const gunRelations = relations(gunCollection, ({ many }) => ({
  accessoryCollection_Silencer: many(accessoryCollection_Silencer),
  accessoryCollection_ConversionKit: many(accessoryCollection_ConversionKit),  
}));

export const accessoryCollection_ConversionKitRelations = relations(accessoryCollection_ConversionKit, ({ one }) => ({
  mountedOn: one(gunCollection, {
    fields: [accessoryCollection_ConversionKit.currentlyMountedOn],
    references: [gunCollection.id],
  }),
}));

export const accessoryCollection_SilencerRelations = relations(accessoryCollection_Silencer, ({ one }) => ({
  mountedOn: one(gunCollection, {
    fields: [accessoryCollection_Silencer.currentlyMountedOn],
    references: [gunCollection.id],
  }),
}));
