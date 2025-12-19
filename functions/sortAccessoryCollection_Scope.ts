import * as schema from "../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesAccessory_Scope } from "../interfaces";

export default function sortAccessoryCollection_Scope(direction: "asc" | "desc", sortBy:SortingTypesAccessory_Scope){
    const ascending = direction === "asc"
        // subtitle is zoom
        if(sortBy === "alphabetical"){
            return ascending ?
            asc((sql`
                lower(
                    trim(
                        coalesce(nullif(${schema.accessoryCollection_Scope.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_Scope.model}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_Scope.zoom}, ''), '')
                    )
                )
            `))
            :
            desc((sql
                `lower(
                    trim(
                        coalesce(nullif(${schema.accessoryCollection_Scope.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_Scope.model}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_Scope.zoom}, ''), '')
                    )
                )
            `))
        }
        if(sortBy === "createdAt"){
            return ascending ?
                asc(schema.accessoryCollection_Scope.createdAt)
                :
                desc(schema.accessoryCollection_Scope.createdAt)
        }
        if(sortBy === "lastModifiedAt"){
            return ascending ?
                sql`NULLIF(${schema.accessoryCollection_Scope.lastModifiedAt}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_Scope.lastModifiedAt}, "") DESC NULLS LAST`
        }
        if(sortBy === "paidPrice"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.accessoryCollection_Scope.paidPrice}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.accessoryCollection_Scope.paidPrice}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "marketValue"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.accessoryCollection_Scope.marketValue}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.accessoryCollection_Scope.marketValue}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "acquisitionDate"){
            return ascending ?
                sql`NULLIF(${schema.accessoryCollection_Scope.acquisitionDate_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_Scope.acquisitionDate_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "lastBatteryChangeAt"){
            return ascending ?
                sql`NULLIF(${schema.accessoryCollection_Scope.batteryLastChangedAt_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_Scope.batteryLastChangedAt_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "lastCleanedAt"){
            return ascending ?
                sql`NULLIF(${schema.accessoryCollection_Scope.lastCleanedAt_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_Scope.lastCleanedAt_unix}, "") DESC NULLS LAST`
        }
        
        // Default sorter
        return ascending ?
        asc((sql`
            lower(
                trim(
                    coalesce(nullif(${schema.accessoryCollection_Scope.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.accessoryCollection_Scope.model}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.accessoryCollection_Scope.zoom}, ''), '')
                )
            )
        `))
        :
        desc((sql
            `lower(
                trim(
                    coalesce(nullif(${schema.accessoryCollection_Scope.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.accessoryCollection_Scope.model}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.accessoryCollection_Scope.zoom}, ''), '')
                )
            )
        `))
}