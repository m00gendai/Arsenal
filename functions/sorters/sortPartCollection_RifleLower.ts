import * as schema from "../../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesPart_RifleLower } from "../../lib/interfaces";

export default function sortPartCollection_RifleLower(direction: "asc" | "desc", sortBy:SortingTypesPart_RifleLower){
    const ascending = direction === "asc"
        // subtitle is caliber
        if(sortBy === "alphabetical"){
            return ascending ?
            asc((sql`
                lower(
                    trim(
                        coalesce(nullif(${schema.partCollection_RifleLower.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.partCollection_RifleLower.model}, ''), '')
                    )
                )
            `))
            :
            desc((sql
                `lower(
                    trim(
                        coalesce(nullif(${schema.partCollection_RifleLower.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.partCollection_RifleLower.model}, ''), '') 
                    )
                )
            `))
        }
        if(sortBy === "createdAt"){
            return ascending ?
                asc(schema.partCollection_RifleLower.createdAt)
                :
                desc(schema.partCollection_RifleLower.createdAt)
        }
        if(sortBy === "lastModifiedAt"){
            return ascending ?
                sql`NULLIF(${schema.partCollection_RifleLower.lastModifiedAt}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.partCollection_RifleLower.lastModifiedAt}, "") DESC NULLS LAST`
        }
        if(sortBy === "paidPrice"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.partCollection_RifleLower.paidPrice}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.partCollection_RifleLower.paidPrice}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "marketValue"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.partCollection_RifleLower.marketValue}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.partCollection_RifleLower.marketValue}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "acquisitionDate"){
            return ascending ?
                sql`NULLIF(${schema.partCollection_RifleLower.acquisitionDate_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.partCollection_RifleLower.acquisitionDate_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "lastShotAt"){
            return ascending ?
                sql`NULLIF(${schema.partCollection_RifleLower.lastShotAt_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.partCollection_RifleLower.lastShotAt_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "lastCleanedAt"){
            return ascending ?
                sql`NULLIF(${schema.partCollection_RifleLower.lastCleanedAt_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.partCollection_RifleLower.lastCleanedAt_unix}, "") DESC NULLS LAST`
        }
        
        // Default sorter
        return ascending ?
        asc((sql`
            lower(
                trim(
                    coalesce(nullif(${schema.partCollection_RifleLower.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.partCollection_RifleLower.model}, ''), '')
                )
            )
        `))
        :
        desc((sql
            `lower(
                trim(
                    coalesce(nullif(${schema.partCollection_RifleLower.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.partCollection_RifleLower.model}, ''), '')
                )
            )
        `))
}