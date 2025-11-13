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
    switch(type){
        case "gunCollection":
            return gunTags
        case "ammoCollection":
            return ammoTags
    }
}