import * as schema from "../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesAccessory_Magazine } from "../interfaces";

export default function sortAccessoryCollection_Magazine(direction: "asc" | "desc", sortBy:SortingTypesAccessory_Magazine){
    const ascending = direction === "asc"

        if(sortBy === "alphabetical"){
            return ascending ?
                asc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Magazine.manufacturer}, ""), ${schema.accessoryCollection_Magazine.model})`))
                :
                desc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Magazine.manufacturer}, ""), ${schema.accessoryCollection_Magazine.model})`))
        }
        if(sortBy === "createdAt"){
            return ascending ?
                asc(schema.accessoryCollection_Magazine.createdAt)
                :
                desc(schema.accessoryCollection_Magazine.createdAt)
        }
        if(sortBy === "lastModifiedAt"){
            return ascending ?
                sql`NULLIF(${schema.accessoryCollection_Magazine.lastModifiedAt}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_Magazine.lastModifiedAt}, "") DESC NULLS LAST`
        }
        if(sortBy === "paidPrice"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.accessoryCollection_Magazine.paidPrice}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.accessoryCollection_Magazine.paidPrice}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "marketValue"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.accessoryCollection_Magazine.marketValue}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.accessoryCollection_Magazine.marketValue}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "acquisitionDate"){
            return ascending ?
                sql`NULLIF(${schema.accessoryCollection_Magazine.acquisitionDate_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_Magazine.acquisitionDate_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "lastShotAt"){
            return ascending ?
                sql`NULLIF(${schema.accessoryCollection_Magazine.lastShotAt_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_Magazine.lastShotAt_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "lastCleanedAt"){
            return ascending ?
                sql`NULLIF(${schema.accessoryCollection_Magazine.lastCleanedAt_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_Magazine.lastCleanedAt_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "capacity"){
            return ascending ?
                sql`NULLIF(${schema.accessoryCollection_Magazine.capacity}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_Magazine.capacity}, "") DESC NULLS LAST`
        }
        
        // Default sorter
        return ascending ?
                asc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Magazine.manufacturer}, ""), ${schema.accessoryCollection_Magazine.model})`))
                :
                desc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Magazine.manufacturer}, ""), ${schema.accessoryCollection_Magazine.model})`))

}