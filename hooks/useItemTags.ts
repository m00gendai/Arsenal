import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import * as schema from "db/schema"
import { db } from "db/client"
import { CollectionType } from "interfaces";

export function useItemTags(type: CollectionType) {
    const { data: gunTags } = useLiveQuery(
        db.select()
        .from(schema.gunTags)
    )
  
    const { data: ammoTags } = useLiveQuery(
        db.select()
        .from(schema.ammoTags)
    )

    const { data: accessoryTags_Silencer } = useLiveQuery(
        db.select()
        .from(schema.accessory_SilencerTags)
    )

    const { data: accessoryTags_Optic } = useLiveQuery(
        db.select()
        .from(schema.accessory_OpticTags)
    )

    const { data: accessoryTags_Scope } = useLiveQuery(
        db.select()
        .from(schema.accessory_ScopeTags)
    )

    const { data: accessoryTags_LightLaser } = useLiveQuery(
        db.select()
        .from(schema.accessory_LightLaserTags)
    )

    const { data: accessoryTags_Magazine } = useLiveQuery(
        db.select()
        .from(schema.accessory_MagazineTags)
    )

    const { data: accessoryTags_Misc } = useLiveQuery(
        db.select()
        .from(schema.accessory_MiscTags)
    )

    const { data: partTags_ConversionKit } = useLiveQuery(
        db.select()
        .from(schema.part_ConversionKitTags)
    )

    const { data: partTags_Barrel } = useLiveQuery(
        db.select()
        .from(schema.part_BarrelTags)
    )

    const { data: literatureTags_Book } = useLiveQuery(
        db.select()
        .from(schema.literature_BookTags)
    )

    switch(type){
        case "gunCollection":
            return gunTags
        case "ammoCollection":
            return ammoTags
        case "accessoryCollection_Silencer":
            return accessoryTags_Silencer
        case "accessoryCollection_Optic":
            return accessoryTags_Optic
        case "accessoryCollection_Scope":
            return accessoryTags_Scope
        case "accessoryCollection_LightLaser":
            return accessoryTags_LightLaser
        case "accessoryCollection_Magazine":
            return accessoryTags_Magazine
        case "accessoryCollection_Misc":
            return accessoryTags_Misc
        case "partCollection_ConversionKit":
            return partTags_ConversionKit
        case "partCollection_Barrel":
            return partTags_Barrel
        case "literatureCollection_Book":
            return literatureTags_Book
    }
}