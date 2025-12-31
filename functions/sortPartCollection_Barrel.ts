import * as schema from "../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesPart_Barrel } from "../interfaces";

export default function sortPartCollection_Barrel(direction: "asc" | "desc", sortBy:SortingTypesPart_Barrel){
    const ascending = direction === "asc"
    // subtitle is caliber
    if(sortBy === "alphabetical"){
        return ascending ?
        asc((sql`
            lower(
                trim(
                    coalesce(nullif(${schema.partCollection_Barrel.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.partCollection_Barrel.model}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.partCollection_Barrel.caliber}, ''), '')
                )
            )
        `))
        :
        desc((sql
            `lower(
                trim(
                    coalesce(nullif(${schema.partCollection_Barrel.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.partCollection_Barrel.model}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.partCollection_Barrel.caliber}, ''), '')
                )
            )
        `))
    }
    if(sortBy === "createdAt"){
        return ascending ?
            asc(schema.partCollection_Barrel.createdAt)
            :
            desc(schema.partCollection_Barrel.createdAt)
    }
    if(sortBy === "lastModifiedAt"){
        return ascending ?
            sql`NULLIF(${schema.partCollection_Barrel.lastModifiedAt}, "") ASC NULLS LAST`
            :
            sql`NULLIF(${schema.partCollection_Barrel.lastModifiedAt}, "") DESC NULLS LAST`
    }
    if(sortBy === "paidPrice"){
        return ascending ?
            sql`NULLIF(NULLIF(${schema.partCollection_Barrel.paidPrice}, ""), "0") ASC NULLS LAST`
            :
            sql`NULLIF(NULLIF(${schema.partCollection_Barrel.paidPrice}, ""), "0") DESC NULLS LAST`
    }
    if(sortBy === "marketValue"){
        return ascending ?
            sql`NULLIF(NULLIF(${schema.partCollection_Barrel.marketValue}, ""), "0") ASC NULLS LAST`
            :
            sql`NULLIF(NULLIF(${schema.partCollection_Barrel.marketValue}, ""), "0") DESC NULLS LAST`
    }
    if(sortBy === "acquisitionDate"){
        return ascending ?
            sql`NULLIF(${schema.partCollection_Barrel.acquisitionDate_unix}, "") ASC NULLS LAST`
            :
            sql`NULLIF(${schema.partCollection_Barrel.acquisitionDate_unix}, "") DESC NULLS LAST`
    }
    if(sortBy === "lastShotAt"){
        return ascending ?
            sql`NULLIF(${schema.partCollection_Barrel.lastShotAt_unix}, "") ASC NULLS LAST`
            :
            sql`NULLIF(${schema.partCollection_Barrel.lastShotAt_unix}, "") DESC NULLS LAST`
    }
    if(sortBy === "lastCleanedAt"){
        return ascending ?
            sql`NULLIF(${schema.partCollection_Barrel.lastCleanedAt_unix}, "") ASC NULLS LAST`
            :
            sql`NULLIF(${schema.partCollection_Barrel.lastCleanedAt_unix}, "") DESC NULLS LAST`
    }
    
    // Default sorter
    return ascending ?
    asc((sql`
        lower(
            trim(
                coalesce(nullif(${schema.partCollection_Barrel.manufacturer}, ''), '') || ' ' ||
                coalesce(nullif(${schema.partCollection_Barrel.model}, ''), '') || ' ' ||
                coalesce(nullif(${schema.partCollection_Barrel.caliber}, ''), '')
            )
        )
    `))
    :
    desc((sql
        `lower(
            trim(
                coalesce(nullif(${schema.partCollection_Barrel.manufacturer}, ''), '') || ' ' ||
                coalesce(nullif(${schema.partCollection_Barrel.model}, ''), '') || ' ' ||
                coalesce(nullif(${schema.partCollection_Barrel.caliber}, ''), '')
            )
        )
    `))
}