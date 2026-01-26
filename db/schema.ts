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
    acquisitionDate_unix: integer("acquisitionDate_unix"),
    paidPrice: text("paidPrice"),
    boughtFrom: text("boughtFrom"),
    marketValue: text("marketValue"),
    shotCount: text("shotCount"),
    lastShotAt: text("lastShotAt"),
    lastShotAt_unix: integer("lastShotAt_unix"),
    lastCleanedAt: text("lastCleanedAt"),
    lastCleanedAt_unix: integer("lastCleanedAt_unix"),
    cleanInterval: text("cleanInterval"),
    cleanInterval_CustomTime: text("cleanInterval_CustomTime"),
    cleanInterval_ShotCount: text("cleanInterval_ShotCount"),
    cleanIntervalDisplay: text("cleanIntervalDisplay"),
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
    customInventoryDesignation: text("customInventoryDesignation")
})

export const gunTags = sqliteTable("gunTags", {
    db_id: integer('id').primaryKey().notNull(),
    label: text("label").notNull().unique("gunTag_label"),
    color: text("color"),
    active: integer("active", {mode: "boolean"}).default(true),
})

export const legacyAmmoCollection = sqliteTable("ammo", {
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
    bulletWeight: text("bulletWeight"),
    bulletType: text("bulletType"),
    currentStock: text("currentStock"),
    lastTopUpAt: text("lastTopUpAt"),
    lastTopUpAt_unix: integer("lastTopUpAt_unix"),
    criticalStock: text("criticalStock"),
    remarks: text("remarks"),
    customInventoryDesignation: text("customInventoryDesignation")
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
    caliber: text("caliber", {mode: "json"}),
    headstamp: text("headstamp"),
    bulletWeight: text("bulletWeight"),
    bulletType: text("bulletType"),
    currentStock: text("currentStock"),
    lastTopUpAt: text("lastTopUpAt"),
    lastTopUpAt_unix: integer("lastTopUpAt_unix"),
    criticalStock: text("criticalStock"),
    remarks: text("remarks"),
    customInventoryDesignation: text("customInventoryDesignation")
})

export const ammoTags = sqliteTable("ammoTags", {
    db_id: integer('id').primaryKey().notNull(),
    label: text("label").notNull().unique("ammoTag_label"),
    color: text("color"),
    active: integer("active", {mode: "boolean"}).default(true),
})

// Master Accessory Table -> Here, all accessories regardless of type are stored
export const accessoryCollection = sqliteTable("accessoryCollection", {
    db_id: integer('id').primaryKey().notNull(),
    id: text("uuid").notNull().unique(),
    type: text("type").notNull()
});

// Master Parts Table -> Here, all parts regardless of type are stored
export const partCollection = sqliteTable("partCollection", {
    db_id: integer('id').primaryKey().notNull(),
    id: text("uuid").notNull().unique(),
    type: text("type").notNull()
});

// Mounting table for Accessories - here, the mounting relations are stored
// An Accessory can be mounted to another Accessory, to a Gun or to a Part
export const accessoryMount = sqliteTable("accessoryMount", {
    db_id: integer('id').primaryKey().notNull(),
    id: text("uuid").notNull().unique(),
    accessoryId: text("accessoryId").notNull().references(() => accessoryCollection.id),
    accessoryType: text("accessoryType").notNull(),
    parentGunId: text("parentGunId").references(() => gunCollection.id),
    parentGunType: text("parentGunType"),
    parentAccessoryId: text("parentAccessoryId").references(() => accessoryCollection.id),
    parentAccessoryType: text("parentAccessoryType"),
    parentPartId: text("parentPartId").references(() => partCollection.id),
    parentPartType: text("parentPartType")
});

// Mounting table for Parts - here, the mounting relations are stored
// A Part can be mounted to another Part or to a Gun. It cannot be mounted to an Accessory, only accept them as a parent!
export const partMount = sqliteTable("partMount", {
    db_id: integer('id').primaryKey().notNull(),
    id: text("uuid").notNull().unique(),
    partId: text("partId").notNull().references(() => partCollection.id),
    partType: text("partType").notNull(),
    parentGunId: text("parentGunId").references(() => gunCollection.id),
    parentGunType: text("parentGunType"),
    parentPartId: text("parentPartId").references(() => partCollection.id),
    parentPartType: text("parentPartType")
});



export const partCollection_ConversionKit = sqliteTable("parts_conversionKit", {
    db_id: integer('id').primaryKey().notNull(),
    id: text("uuid").notNull().references(() => accessoryCollection.id),
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
    currentlyMountedOn: text("currentlyMountedOn"),
    permit: text("permit"),
    acquisitionDate_unix: integer("acquisitionDate_unix"),
    paidPrice: text("paidPrice"),
    boughtFrom: text("boughtFrom"),
    marketValue: text("marketValue"),
    shotCount: text("shotCount"),
    lastShotAt_unix: integer("lastShotAt_unix"),
    lastCleanedAt_unix: integer("lastCleanedAt_unix"),
    cleanInterval: text("cleanInterval"),
    cleanInterval_CustomTime: text("cleanInterval_CustomTime"),
    cleanInterval_ShotCount: text("cleanInterval_ShotCount"),
    cleanIntervalDisplay: text("cleanIntervalDisplay"),
    mainColor: text("mainColor"),
    remarks: text("remarks"),
    customInventoryDesignation: text("customInventoryDesignation")
})

export const part_ConversionKitTags = sqliteTable("parts_conversionKitTags", {
    db_id: integer('id').primaryKey().notNull(),
    label: text("label").notNull().unique("conversionKitTag_label"),
    color: text("color"),
    active: integer("active", {mode: "boolean"}).default(true),
})

export const partCollection_Barrel = sqliteTable("parts_barrel", {
    db_id: integer('id').primaryKey().notNull(),
    id: text("uuid").notNull().references(() => partCollection.id),
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
    thread: text("thread"),
    barrelLength: text("barrelLength"),
    currentlyMountedOn: text("currentlyMountedOn"),
    permit: text("permit"),
    acquisitionDate_unix: integer("acquisitionDate_unix"),
    paidPrice: text("paidPrice"),
    boughtFrom: text("boughtFrom"),
    marketValue: text("marketValue"),
    shotCount: text("shotCount"),
    lastShotAt_unix: integer("lastShotAt_unix"),
    lastCleanedAt_unix: integer("lastCleanedAt_unix"),
    cleanInterval: text("cleanInterval"),
    cleanInterval_CustomTime: text("cleanInterval_CustomTime"),
    cleanInterval_ShotCount: text("cleanInterval_ShotCount"),
    cleanIntervalDisplay: text("cleanIntervalDisplay"),
    mainColor: text("mainColor"),
    remarks: text("remarks"),
    customInventoryDesignation: text("customInventoryDesignation")
})

export const part_BarrelTags = sqliteTable("parts_barrelTags", {
    db_id: integer('id').primaryKey().notNull(),
    label: text("label").notNull().unique("barrelTag_label"),
    color: text("color"),
    active: integer("active", {mode: "boolean"}).default(true),
})

export const accessoryCollection_Silencer = sqliteTable("accessories_silencer", {
    db_id: integer('id').primaryKey().notNull(),
    id: text("uuid").notNull().references(() => accessoryCollection.id),
    createdAt: integer("createdAt").notNull(),
    lastModifiedAt: integer("lastModifiedAt"),
    images: text("images", {mode: "json"}),
    tags: text("tags", {mode: "json"}),
    manufacturer: text("manufacturer"),
    model: text('name').notNull(),
    manufacturingDate: text("manufacturinDdate"),
    originCountry: text("originCountry"),
    caliber: text("caliber", {mode: "json"}),
    thread: text("thread"),
    serial: text("serial"),
    material: text("material"),
    decibelRating: text("decibelRating"),
    permit: text("permit"),
    acquisitionDate_unix: integer("acquisitionDate_unix"),
    paidPrice: text("paidPrice"),
    boughtFrom: text("boughtFrom"),
    marketValue: text("marketValue"),
    shotCount: text("shotCount"),
    lastShotAt_unix: integer("lastShotAt_unix"),
    lastCleanedAt_unix: integer("lastCleanedAt_unix"),
    cleanInterval: text("cleanInterval"),
    cleanInterval_CustomTime: text("cleanInterval_CustomTime"),
    cleanInterval_ShotCount: text("cleanInterval_ShotCount"),
    cleanIntervalDisplay: text("cleanIntervalDisplay"),
    mainColor: text("mainColor"),
    remarks: text("remarks"),
    currentlyMountedOn: text("currentlyMountedOn"),
    customInventoryDesignation: text("customInventoryDesignation")
})

export const accessory_SilencerTags = sqliteTable("accessories_silencerTags", {
    db_id: integer('id').primaryKey().notNull(),
    label: text("label").notNull().unique("silencerTag_label"),
    color: text("color"),
    active: integer("active", {mode: "boolean"}).default(true),
})

export const accessoryCollection_Optic = sqliteTable("accessories_optic", {
    db_id: integer('id').primaryKey().notNull(),
    id: text("uuid").notNull().references(() => accessoryCollection.id),
    createdAt: integer("createdAt").notNull(),
    lastModifiedAt: integer("lastModifiedAt"),
    images: text("images", {mode: "json"}),
    tags: text("tags", {mode: "json"}),
    manufacturer: text("manufacturer"),
    model: text('name').notNull(),
    manufacturingDate: text("manufacturinDdate"),
    originCountry: text("originCountry"),
    serial: text("serial"),
    reticle: text("reticle"),
    reticleColor: text("reticleColor"),
    footprint: text("footprint"),
    zoom: text("zoom"),
    unit: text("unit"),
    clicksToUnitElevation: text("clicksToUnitElevation"),
    clicksToUnitWindage: text("clicksToUnitWindage"),
    material: text("material"),
    acquisitionDate_unix: integer("acquisitionDate_unix"),
    paidPrice: text("paidPrice"),
    boughtFrom: text("boughtFrom"),
    marketValue: text("marketValue"),
    shotCount: text("shotCount"),
    lastShotAt_unix: integer("lastShotAt_unix"),
    lastCleanedAt_unix: integer("lastCleanedAt_unix"),
    cleanInterval: text("cleanInterval"),
    cleanInterval_CustomTime: text("cleanInterval_CustomTime"),
    cleanInterval_ShotCount: text("cleanInterval_ShotCount"),
    cleanIntervalDisplay: text("cleanIntervalDisplay"),
    batteryLastChangedAt_unix: integer("batteryLastChangedAt_unix"),
    mainColor: text("mainColor"),
    remarks: text("remarks"),
    currentlyMountedOn: text("currentlyMountedOn"),
    customInventoryDesignation: text("customInventoryDesignation")
})

export const accessory_OpticTags = sqliteTable("accessories_opticTags", {
    db_id: integer('id').primaryKey().notNull(),
    label: text("label").notNull().unique("opticTag_label"),
    color: text("color"),
    active: integer("active", {mode: "boolean"}).default(true),
})

export const accessoryCollection_Scope = sqliteTable("accessories_scope", {
    db_id: integer('id').primaryKey().notNull(),
    id: text("uuid").notNull().references(() => accessoryCollection.id),
    createdAt: integer("createdAt").notNull(),
    lastModifiedAt: integer("lastModifiedAt"),
    images: text("images", {mode: "json"}),
    tags: text("tags", {mode: "json"}),
    manufacturer: text("manufacturer"),
    model: text('name').notNull(),
    manufacturingDate: text("manufacturinDdate"),
    originCountry: text("originCountry"),
    serial: text("serial"),
    reticle: text("reticle"),
    reticleColor: text("reticleColor"),
    zoom: text("zoom"),
    unit: text("unit"),
    clicksToUnitElevation: text("clicksToUnitElevation"),
    clicksToUnitWindage: text("clicksToUnitWindage"),
    material: text("material"),
    acquisitionDate_unix: integer("acquisitionDate_unix"),
    paidPrice: text("paidPrice"),
    boughtFrom: text("boughtFrom"),
    marketValue: text("marketValue"),
    shotCount: text("shotCount"),
    lastShotAt_unix: integer("lastShotAt_unix"),
    lastCleanedAt_unix: integer("lastCleanedAt_unix"),
    cleanInterval: text("cleanInterval"),
    cleanInterval_CustomTime: text("cleanInterval_CustomTime"),
    cleanInterval_ShotCount: text("cleanInterval_ShotCount"),
    cleanIntervalDisplay: text("cleanIntervalDisplay"),
    batteryLastChangedAt_unix: integer("batteryLastChangedAt_unix"),
    mainColor: text("mainColor"),
    remarks: text("remarks"),
    currentlyMountedOn: text("currentlyMountedOn"),
    customInventoryDesignation: text("customInventoryDesignation")
})

export const accessory_ScopeTags = sqliteTable("accessories_scopeTags", {
    db_id: integer('id').primaryKey().notNull(),
    label: text("label").notNull().unique("scopeTag_label"),
    color: text("color"),
    active: integer("active", {mode: "boolean"}).default(true),
})

export const accessoryCollection_LightLaser = sqliteTable("accessories_lightLaser", {
    db_id: integer('id').primaryKey().notNull(),
    id: text("uuid").notNull().references(() => accessoryCollection.id),
    createdAt: integer("createdAt").notNull(),
    lastModifiedAt: integer("lastModifiedAt"),
    images: text("images", {mode: "json"}),
    tags: text("tags", {mode: "json"}),
    manufacturer: text("manufacturer"),
    model: text('name').notNull(),
    manufacturingDate: text("manufacturinDdate"),
    originCountry: text("originCountry"),
    serial: text("serial"),
    permit: text("permit"),
    lumen: text("lumen"),
    candela: text("candela"),
    wavelength: text("wavelength"),
    laserPower: text("laserPower"),
    acquisitionDate_unix: integer("acquisitionDate_unix"),
    paidPrice: text("paidPrice"),
    boughtFrom: text("boughtFrom"),
    marketValue: text("marketValue"),
    shotCount: text("shotCount"),
    lastShotAt_unix: integer("lastShotAt_unix"),
    batteryLastChangedAt_unix: integer("batteryLastChangedAt_unix"),
    mainColor: text("mainColor"),
    remarks: text("remarks"),
    currentlyMountedOn: text("currentlyMountedOn"),
    customInventoryDesignation: text("customInventoryDesignation")
})

export const accessory_LightLaserTags = sqliteTable("accessories_lightLaserTags", {
    db_id: integer('id').primaryKey().notNull(),
    label: text("label").notNull().unique("lightLaserTag_label"),
    color: text("color"),
    active: integer("active", {mode: "boolean"}).default(true),
})

export const accessoryCollection_Magazine = sqliteTable("accessories_magazine", {
    db_id: integer('id').primaryKey().notNull(),
    id: text("uuid").notNull().references(() => accessoryCollection.id),
    createdAt: integer("createdAt").notNull(),
    lastModifiedAt: integer("lastModifiedAt"),
    images: text("images", {mode: "json"}),
    tags: text("tags", {mode: "json"}),
    manufacturer: text("manufacturer"),
    model: text('name').notNull(),
    manufacturingDate: text("manufacturinDdate"),
    originCountry: text("originCountry"),
    caliber: text("caliber", {mode: "json"}),
    material: text("material"),
    serial: text("serial"),
    permit: text("permit"),
    capacity: text("capacity"),
    currentStock: text("currentStock"),
    platform: text("platform"),
    acquisitionDate_unix: integer("acquisitionDate_unix"),
    paidPrice: text("paidPrice"),
    boughtFrom: text("boughtFrom"),
    marketValue: text("marketValue"),
    shotCount: text("shotCount"),
    lastShotAt_unix: integer("lastShotAt_unix"),
    lastCleanedAt_unix: integer("lastCleanedAt_unix"),
    cleanInterval: text("cleanInterval"),
    cleanInterval_CustomTime: text("cleanInterval_CustomTime"),
    cleanInterval_ShotCount: text("cleanInterval_ShotCount"),
    cleanIntervalDisplay: text("cleanIntervalDisplay"),
    mainColor: text("mainColor"),
    remarks: text("remarks"),
    currentlyMountedOn: text("currentlyMountedOn"),
    customInventoryDesignation: text("customInventoryDesignation")
})

export const accessory_MagazineTags = sqliteTable("accessories_magazineTags", {
    db_id: integer('id').primaryKey().notNull(),
    label: text("label").notNull().unique("magazineTag_label"),
    color: text("color"),
    active: integer("active", {mode: "boolean"}).default(true),
})

export const accessoryCollection_Misc = sqliteTable("accessories_misc", {
    db_id: integer('id').primaryKey().notNull(),
    id: text("uuid").notNull().references(() => accessoryCollection.id),
    createdAt: integer("createdAt").notNull(),
    lastModifiedAt: integer("lastModifiedAt"),
    images: text("images", {mode: "json"}),
    tags: text("tags", {mode: "json"}),
    manufacturer: text("manufacturer"),
    model: text('name').notNull(),
    manufacturingDate: text("manufacturinDdate"),
    originCountry: text("originCountry"),
    acquisitionDate_unix: integer("acquisitionDate_unix"),
    paidPrice: text("paidPrice"),
    boughtFrom: text("boughtFrom"),
    marketValue: text("marketValue"),
    mainColor: text("mainColor"),
    remarks: text("remarks"),
    currentlyMountedOn: text("currentlyMountedOn"),
    serial: text("serial"),
    customInventoryDesignation: text("customInventoryDesignation")
})

export const accessory_MiscTags = sqliteTable("accessories_miscTags", {
    db_id: integer('id').primaryKey().notNull(),
    label: text("label").notNull().unique("miscAccessoryTag_label"),
    color: text("color"),
    active: integer("active", {mode: "boolean"}).default(true),
})

export const literatureCollection_Book = sqliteTable("literature_book", {
    db_id: integer('id').primaryKey().notNull(),
    id: text("uuid").notNull().unique(),
    createdAt: integer("createdAt").notNull(),
    lastModifiedAt: integer("lastModifiedAt"),
    images: text("images", {mode: "json"}),
    tags: text("tags", {mode: "json"}),
    language: text("language"),
    title: text("title"),
    subtitle: text("subtitle"),
    isbn: text("isbn"),
    publishingDate: text("publishingDate"),
    author: text("author"),
    publisher: text("publisher"),
    edition: text("edition"),
    series: text("series"),
    volume: text("volume"),
    pages: text("pages"),
    format: text("format"),
    acquisitionDate_unix: integer("acquisitionDate_unix"),
    paidPrice: text("paidPrice"),
    boughtFrom: text("boughtFrom"),
    marketValue: text("marketValue"),
    remarks: text("remarks"),
    customInventoryDesignation: text("customInventoryDesignation")
})

export const literature_BookTags = sqliteTable("literature_bookTags", {
    db_id: integer('id').primaryKey().notNull(),
    label: text("label").notNull().unique("bookTag_label"),
    color: text("color"),
    active: integer("active", {mode: "boolean"}).default(true),
})

export const autocomplete = sqliteTable("autocomplete",{
    db_id: integer('id').primaryKey().notNull(),
    id: text("uuid").notNull(),
    label: text("label").notNull().unique(),
    field: text("field").notNull()
})

export const gunReminders = sqliteTable("gunReminder",{
    db_id: integer('id').primaryKey().notNull(),
    id: text("uuid").notNull(),
    label: text("label").notNull(),
    gun_id: text('gun_id').references(() => gunCollection.id),
})

// RELATIONS

// Accessories accept only other Accessories to be mounted onto them
export const accessoryRelations = relations(accessoryCollection, ({ many }) => ({
    mounts: many(accessoryMount),
}));

// Parts accept either other Parts or Accessories mounted onto them
export const partsRelations = relations(partCollection, ({ many }) => ({
    mounts: many(partMount),          
    accessoryMounts: many(accessoryMount), 
}));

// Accessories can have Guns, other Accessories or Parts as Parents
export const accessoryMountRelations = relations(accessoryMount, ({ one }) => ({
    accessory: one(accessoryCollection, {
        fields: [accessoryMount.accessoryId],
        references: [accessoryCollection.id]
    }),
    parentGun: one(gunCollection, {
        fields: [accessoryMount.parentGunId],
        references: [gunCollection.id],
    }),
    parentAccessory: one(accessoryCollection, {
        fields: [accessoryMount.parentAccessoryId],
        references: [accessoryCollection.id],
    }),
     parentPart: one(partCollection, {
        fields: [accessoryMount.parentPartId],
        references: [partCollection.id],
    }),
}));

//Parts can have Guns or other Parts as Parents, but not Accessories!
export const partsMountRelations = relations(partMount, ({ one }) => ({
    part: one(partCollection, {
        fields: [partMount.partId],
        references: [partCollection.id],
    }),

    parentGun: one(gunCollection, {
        fields: [partMount.parentGunId],
        references: [gunCollection.id],
    }),

    parentPart: one(partCollection, {
        fields: [partMount.parentPartId],
        references: [partCollection.id],
    }),
}));