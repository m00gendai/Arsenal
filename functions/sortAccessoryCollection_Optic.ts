import * as schema from "../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesAccessory_Optic, SortingTypesAccessory_Silencer } from "../interfaces";

export default function sortAccessoryCollection_Optic(direction: "asc" | "desc", sortBy:SortingTypesAccessory_Optic){
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
                asc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Optic.manufacturer}, ""), ${schema.accessoryCollection_Optic.model})`))
                :
                desc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Optic.manufacturer}, ""), ${schema.accessoryCollection_Optic.model})`))
        }
        if(sortBy === "createdAt"){
            return ascending ?
                asc(schema.accessoryCollection_Optic.createdAt)
                :
                desc(schema.accessoryCollection_Optic.createdAt)
        }
        if(sortBy === "lastModifiedAt"){
            return ascending ?
                sql`NULLIF(${schema.accessoryCollection_Optic.lastModifiedAt}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_Optic.lastModifiedAt}, "") DESC NULLS LAST`
        }
        if(sortBy === "paidPrice"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.accessoryCollection_Optic.paidPrice}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.accessoryCollection_Optic.paidPrice}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "marketValue"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.accessoryCollection_Optic.marketValue}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.accessoryCollection_Optic.marketValue}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "acquisitionDate"){
            return ascending ?
                sql`${parseDateColumn(schema.accessoryCollection_Optic.acquisitionDate)} ASC NULLS LAST`
                :
                sql`${parseDateColumn(schema.accessoryCollection_Optic.acquisitionDate)} DESC NULLS LAST`
        }
        if(sortBy === "lastBatteryChangeAt"){
            return ascending ?
                sql`${parseDateColumn(schema.accessoryCollection_Optic.lastShotAt)} ASC NULLS LAST`
                :
                sql`${parseDateColumn(schema.accessoryCollection_Optic.lastShotAt)} DESC NULLS LAST`
        }
        if(sortBy === "lastCleanedAt"){
            return ascending ?
                sql`${parseDateColumn(schema.accessoryCollection_Optic.lastCleanedAt)} ASC NULLS LAST`
                :
                sql`${parseDateColumn(schema.accessoryCollection_Optic.lastCleanedAt)} DESC NULLS LAST`
        }
        
        // Default sorter
        return ascending ?
                asc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Optic.manufacturer}, ""), ${schema.accessoryCollection_Optic.model})`))
                :
                desc((sql`COALESCE(NULLIF(${schema.accessoryCollection_Optic.manufacturer}, ""), ${schema.accessoryCollection_Optic.model})`))

}