import * as schema from "../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesAccessory_Optic, SortingTypesAccessory_Silencer } from "../interfaces";

export default function sortAccessoryCollection_Optic(direction: "asc" | "desc", sortBy:SortingTypesAccessory_Optic){
    const ascending = direction === "asc"
        // subtitle is reticle
        if(sortBy === "alphabetical"){
            return ascending ?
            asc((sql`
                lower(
                    trim(
                        coalesce(nullif(${schema.accessoryCollection_Optic.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_Optic.model}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_Optic.reticle}, ''), '')
                    )
                )
            `))
            :
            desc((sql
                `lower(
                    trim(
                        coalesce(nullif(${schema.accessoryCollection_Optic.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_Optic.model}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_Optic.reticle}, ''), '')
                    )
                )
            `))
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
                sql`NULLIF(${schema.accessoryCollection_Optic.acquisitionDate_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_Optic.acquisitionDate_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "lastBatteryChangeAt"){
            return ascending ?
                sql`NULLIF(${schema.accessoryCollection_Optic.batteryLastChangedAt_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_Optic.batteryLastChangedAt_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "lastCleanedAt"){
            return ascending ?
                sql`NULLIF(${schema.accessoryCollection_Optic.lastCleanedAt_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_Optic.lastCleanedAt_unix}, "") DESC NULLS LAST`
        }
        
        // Default sorter
        return ascending ?
        asc((sql`
            lower(
                trim(
                    coalesce(nullif(${schema.accessoryCollection_Optic.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.accessoryCollection_Optic.model}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.accessoryCollection_Optic.reticle}, ''), '')
                )
            )
        `))
        :
        desc((sql
            `lower(
                trim(
                    coalesce(nullif(${schema.accessoryCollection_Optic.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.accessoryCollection_Optic.model}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.accessoryCollection_Optic.reticle}, ''), '')
                )
            )
        `))
}