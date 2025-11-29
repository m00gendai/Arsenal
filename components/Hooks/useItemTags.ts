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

    const { data: partTags_ConversionKit } = useLiveQuery(
        db.select()
        .from(schema.part_ConversionKitTags)
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
        case "partCollection_ConversionKit":
            return partTags_ConversionKit
    }
}