import * as schema from "../../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesPart_PistolFrame } from "../../lib/interfaces";

export default function sortPartCollection_PistolFrame(direction: "asc" | "desc", sortBy:SortingTypesPart_PistolFrame){
    const ascending = direction === "asc"
        // subtitle is caliber
        if(sortBy === "alphabetical"){
            return ascending ?
            asc((sql`
                lower(
                    trim(
                        coalesce(nullif(${schema.partCollection_PistolFrame.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.partCollection_PistolFrame.model}, ''), '')
                    )
                )
            `))
            :
            desc((sql
                `lower(
                    trim(
                        coalesce(nullif(${schema.partCollection_PistolFrame.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.partCollection_PistolFrame.model}, ''), '') 
                    )
                )
            `))
        }
        if(sortBy === "createdAt"){
            return ascending ?
                asc(schema.partCollection_PistolFrame.createdAt)
                :
                desc(schema.partCollection_PistolFrame.createdAt)
        }
        if(sortBy === "lastModifiedAt"){
            return ascending ?
                sql`NULLIF(${schema.partCollection_PistolFrame.lastModifiedAt}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.partCollection_PistolFrame.lastModifiedAt}, "") DESC NULLS LAST`
        }
        if(sortBy === "paidPrice"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.partCollection_PistolFrame.paidPrice}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.partCollection_PistolFrame.paidPrice}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "marketValue"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.partCollection_PistolFrame.marketValue}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.partCollection_PistolFrame.marketValue}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "acquisitionDate"){
            return ascending ?
                sql`NULLIF(${schema.partCollection_PistolFrame.acquisitionDate_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.partCollection_PistolFrame.acquisitionDate_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "lastShotAt"){
            return ascending ?
                sql`NULLIF(${schema.partCollection_PistolFrame.lastShotAt_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.partCollection_PistolFrame.lastShotAt_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "lastCleanedAt"){
            return ascending ?
                sql`NULLIF(${schema.partCollection_PistolFrame.lastCleanedAt_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.partCollection_PistolFrame.lastCleanedAt_unix}, "") DESC NULLS LAST`
        }
        
        // Default sorter
        return ascending ?
        asc((sql`
            lower(
                trim(
                    coalesce(nullif(${schema.partCollection_PistolFrame.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.partCollection_PistolFrame.model}, ''), '')
                )
            )
        `))
        :
        desc((sql
            `lower(
                trim(
                    coalesce(nullif(${schema.partCollection_PistolFrame.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.partCollection_PistolFrame.model}, ''), '')
                )
            )
        `))
}