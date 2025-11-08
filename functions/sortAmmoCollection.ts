import * as schema from "../db/schema"
import { eq, lt, gte, ne, and, or, like, asc, desc, exists, isNull, sql, inArray } from 'drizzle-orm';
import { SortingTypesAmmo } from "../interfaces";

export default function sortAmmoCollection(sortBy:SortingTypesAmmo, ascending:boolean){

    const parseDateColumn = (column) => sql`
            CAST(
                strftime('%s', 
                substr(NULLIF(NULLIF(${column}, ''), '0'), 7, 4) || '-' ||
                substr(NULLIF(NULLIF(${column}, ''), '0'), 4, 2) || '-' ||
                substr(NULLIF(NULLIF(${column}, ''), '0'), 1, 2)
                ) AS INTEGER
            )
        `
    
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
            sql`${parseDateColumn(schema.ammoCollection.lastTopUpAt)} ASC NULLS LAST`
            :
            sql`${parseDateColumn(schema.ammoCollection.lastTopUpAt)} DESC NULLS LAST`
    }

    // Fallback sorter
    return ascending ?
            asc((sql`COALESCE(NULLIF(${schema.ammoCollection.manufacturer}, ""), ${schema.ammoCollection.designation})`))
            :
            desc((sql`COALESCE(NULLIF(${schema.ammoCollection.manufacturer}, ""), ${schema.ammoCollection.designation})`))
}