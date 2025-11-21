import * as schema from "../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesAccessory_Silencer } from "../interfaces";

export default function sortGunCollection(direction: "asc" | "desc", sortBy:SortingTypesAccessory_Silencer){
    const ascending = direction === "asc"

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
                asc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Silencer.manufacturer}, ""), ${schema.accessoryCollection_Silencer.model})`))
                :
                desc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Silencer.manufacturer}, ""), ${schema.accessoryCollection_Silencer.model})`))
        }
        if(sortBy === "createdAt"){
            return ascending ?
                asc(schema.accessoryCollection_Silencer.createdAt)
                :
                desc(schema.accessoryCollection_Silencer.createdAt)
        }
        if(sortBy === "lastModifiedAt"){
            return ascending ?
                sql`NULLIF(${schema.accessoryCollection_Silencer.lastModifiedAt}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_Silencer.lastModifiedAt}, "") DESC NULLS LAST`
        }
        if(sortBy === "paidPrice"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.accessoryCollection_Silencer.paidPrice}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.accessoryCollection_Silencer.paidPrice}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "marketValue"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.accessoryCollection_Silencer.marketValue}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.accessoryCollection_Silencer.marketValue}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "acquisitionDate"){
            return ascending ?
                sql`${parseDateColumn(schema.accessoryCollection_Silencer.acquisitionDate)} ASC NULLS LAST`
                :
                sql`${parseDateColumn(schema.accessoryCollection_Silencer.acquisitionDate)} DESC NULLS LAST`
        }
        if(sortBy === "lastShotAt"){
            return ascending ?
                sql`${parseDateColumn(schema.accessoryCollection_Silencer.lastShotAt)} ASC NULLS LAST`
                :
                sql`${parseDateColumn(schema.accessoryCollection_Silencer.lastShotAt)} DESC NULLS LAST`
        }
        if(sortBy === "lastCleanedAt"){
            return ascending ?
                sql`${parseDateColumn(schema.accessoryCollection_Silencer.lastCleanedAt)} ASC NULLS LAST`
                :
                sql`${parseDateColumn(schema.accessoryCollection_Silencer.lastCleanedAt)} DESC NULLS LAST`
        }
        
        // Default sorter
        return ascending ?
                asc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Silencer.manufacturer}, ""), ${schema.accessoryCollection_Silencer.model})`))
                :
                desc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Silencer.manufacturer}, ""), ${schema.accessoryCollection_Silencer.model})`))

}