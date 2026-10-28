import * as schema from "../../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesPart_RifleUpper } from "../../lib/interfaces";

export default function sortPartCollection_RifleUpper(direction: "asc" | "desc", sortBy:SortingTypesPart_RifleUpper){
    const ascending = direction === "asc"
        // subtitle is caliber
        if(sortBy === "alphabetical"){
            return ascending ?
            asc((sql`
                lower(
                    trim(
                        coalesce(nullif(${schema.partCollection_RifleUpper.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.partCollection_RifleUpper.model}, ''), '')
                    )
                )
            `))
            :
            desc((sql
                `lower(
                    trim(
                        coalesce(nullif(${schema.partCollection_RifleUpper.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.partCollection_RifleUpper.model}, ''), '') 
                    )
                )
            `))
        }
        if(sortBy === "createdAt"){
            return ascending ?
                asc(schema.partCollection_RifleUpper.createdAt)
                :
                desc(schema.partCollection_RifleUpper.createdAt)
        }
        if(sortBy === "lastModifiedAt"){
            return ascending ?
                sql`NULLIF(${schema.partCollection_RifleUpper.lastModifiedAt}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.partCollection_RifleUpper.lastModifiedAt}, "") DESC NULLS LAST`
        }
        if(sortBy === "paidPrice"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.partCollection_RifleUpper.paidPrice}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.partCollection_RifleUpper.paidPrice}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "marketValue"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.partCollection_RifleUpper.marketValue}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.partCollection_RifleUpper.marketValue}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "acquisitionDate"){
            return ascending ?
                sql`NULLIF(${schema.partCollection_RifleUpper.acquisitionDate_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.partCollection_RifleUpper.acquisitionDate_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "lastShotAt"){
            return ascending ?
                sql`NULLIF(${schema.partCollection_RifleUpper.lastShotAt_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.partCollection_RifleUpper.lastShotAt_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "lastCleanedAt"){
            return ascending ?
                sql`NULLIF(${schema.partCollection_RifleUpper.lastCleanedAt_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.partCollection_RifleUpper.lastCleanedAt_unix}, "") DESC NULLS LAST`
        }
        
        // Default sorter
        return ascending ?
        asc((sql`
            lower(
                trim(
                    coalesce(nullif(${schema.partCollection_RifleUpper.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.partCollection_RifleUpper.model}, ''), '')
                )
            )
        `))
        :
        desc((sql
            `lower(
                trim(
                    coalesce(nullif(${schema.partCollection_RifleUpper.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.partCollection_RifleUpper.model}, ''), '')
                )
            )
        `))
}