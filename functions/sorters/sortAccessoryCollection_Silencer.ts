import * as schema from "../../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesAccessory_Silencer } from "../../lib/interfaces";

export default function sortAccessoryCollection_Silencer(direction: "asc" | "desc", sortBy:SortingTypesAccessory_Silencer){
    const ascending = direction === "asc"
        // subtitle is caliber
        if(sortBy === "alphabetical"){
            return ascending ?
            asc((sql`
                lower(
                    trim(
                        coalesce(nullif(${schema.accessoryCollection_Silencer.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_Silencer.model}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_Silencer.caliber}, ''), '')
                    )
                )
            `))
            :
            desc((sql
                `lower(
                    trim(
                        coalesce(nullif(${schema.accessoryCollection_Silencer.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_Silencer.model}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_Silencer.caliber}, ''), '')
                    )
                )
            `))
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
                sql`NULLIF(${schema.accessoryCollection_Silencer.acquisitionDate_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_Silencer.acquisitionDate_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "lastShotAt"){
            return ascending ?
                sql`NULLIF(${schema.accessoryCollection_Silencer.lastShotAt_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_Silencer.lastShotAt_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "lastCleanedAt"){
            return ascending ?
                sql`NULLIF(${schema.accessoryCollection_Silencer.lastCleanedAt_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_Silencer.lastCleanedAt_unix}, "") DESC NULLS LAST`
        }
        
        // Default sorter
        return ascending ?
            asc((sql`
                lower(
                    trim(
                        coalesce(nullif(${schema.accessoryCollection_Silencer.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_Silencer.model}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_Silencer.caliber}, ''), '')
                    )
                )
            `))
            :
            desc((sql
                `lower(
                    trim(
                        coalesce(nullif(${schema.accessoryCollection_Silencer.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_Silencer.model}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_Silencer.caliber}, ''), '')
                    )
                )
            `))
}