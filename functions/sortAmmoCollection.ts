import * as schema from "../db/schema"
import { eq, lt, gte, ne, and, or, like, asc, desc, exists, isNull, sql, inArray } from 'drizzle-orm';
import { SortingTypesAmmo } from "../interfaces";

export default function sortAmmoCollection(direction: "asc" | "desc", sortBy:SortingTypesAmmo){

    const ascending = direction === "asc"
    
    if(sortBy === "alphabetical"){
        return ascending ?
            asc((sql`COALESCE(NULLIF(${schema.ammoCollection.manufacturer}, ""), ${schema.ammoCollection.designation})`))
            :
            desc((sql`COALESCE(NULLIF(${schema.ammoCollection.manufacturer}, ""), ${schema.ammoCollection.designation})`))
    }
    if(sortBy === "createdAt"){
        return ascending ?
            asc(schema.ammoCollection.createdAt)
            :
            desc(schema.ammoCollection.createdAt)
    }
    if(sortBy === "lastModifiedAt"){
        return ascending ?
            sql`NULLIF(${schema.ammoCollection.lastModifiedAt}, "") ASC NULLS LAST`
            :
            sql`NULLIF(${schema.ammoCollection.lastModifiedAt}, "") DESC NULLS LAST`
    }
    if(sortBy === "currentStock"){
        return ascending ?
            sql`CAST(NULLIF(NULLIF(${schema.ammoCollection.currentStock}, ""), "0") AS INTEGER) ASC NULLS LAST`
            :
            sql`CAST(NULLIF(NULLIF(${schema.ammoCollection.currentStock}, ""), "0") AS INTEGER) DESC NULLS LAST`
    }
    if(sortBy === "lastTopUpAt"){
        return ascending ?
            sql`NULLIF(${schema.ammoCollection.lastTopUpAt_unix}, "") ASC NULLS LAST`
            :
            sql`NULLIF(${schema.ammoCollection.lastTopUpAt_unix}, "") DESC NULLS LAST`
    }

    // Fallback sorter
    return ascending ?
            asc((sql`COALESCE(NULLIF(${schema.ammoCollection.manufacturer}, ""), ${schema.ammoCollection.designation})`))
            :
            desc((sql`COALESCE(NULLIF(${schema.ammoCollection.manufacturer}, ""), ${schema.ammoCollection.designation})`))
}