import * as schema from "../db/schema"
import { eq, lt, gte, ne, and, or, like, asc, desc, exists, isNull, sql, inArray } from 'drizzle-orm';
import { SortingTypesGun } from "../interfaces";

export default function sortGunCollection(direction: "asc" | "desc", sortBy:SortingTypesGun){

    const ascending = direction === "asc"
        // subtitle is serial
        if(sortBy === "alphabetical"){
            return ascending ?
            asc((sql`
                lower(
                    trim(
                        coalesce(nullif(${schema.gunCollection.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.gunCollection.model}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.gunCollection.serial}, ''), '')
                    )
                )
            `))
            :
            desc((sql
                `lower(
                    trim(
                        coalesce(nullif(${schema.gunCollection.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.gunCollection.model}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.gunCollection.serial}, ''), '')
                    )
                )
            `))
        }
        if(sortBy === "createdAt"){
            return ascending ?
                asc(schema.gunCollection.createdAt)
                :
                desc(schema.gunCollection.createdAt)
        }
        if(sortBy === "lastModifiedAt"){
            return ascending ?
                sql`NULLIF(${schema.gunCollection.lastModifiedAt}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.gunCollection.lastModifiedAt}, "") DESC NULLS LAST`
        }
        if(sortBy === "paidPrice"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.gunCollection.paidPrice}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.gunCollection.paidPrice}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "marketValue"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.gunCollection.marketValue}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.gunCollection.marketValue}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "acquisitionDate"){
            return ascending ?
                sql`NULLIF(${schema.gunCollection.acquisitionDate_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.gunCollection.acquisitionDate_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "lastShotAt"){
            return ascending ?
                sql`NULLIF(${schema.gunCollection.lastShotAt_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.gunCollection.lastShotAt_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "lastCleanedAt"){
            return ascending ?
                sql`NULLIF(${schema.gunCollection.lastCleanedAt_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.gunCollection.lastCleanedAt_unix}, "") DESC NULLS LAST`
        }
        
        // Default sorter
        return ascending ?
        asc((sql`
            lower(
                trim(
                    coalesce(nullif(${schema.gunCollection.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.gunCollection.model}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.gunCollection.serial}, ''), '')
                )
            )
        `))
        :
        desc((sql
            `lower(
                trim(
                    coalesce(nullif(${schema.gunCollection.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.gunCollection.model}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.gunCollection.serial}, ''), '')
                )
            )
        `))
}