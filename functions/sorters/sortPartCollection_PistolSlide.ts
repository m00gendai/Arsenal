import * as schema from "../../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesPart_PistolSlide } from "../../lib/interfaces";

export default function sortPartCollection_PistolSlide(direction: "asc" | "desc", sortBy:SortingTypesPart_PistolSlide){
    const ascending = direction === "asc"
        // subtitle is caliber
        if(sortBy === "alphabetical"){
            return ascending ?
            asc((sql`
                lower(
                    trim(
                        coalesce(nullif(${schema.partCollection_PistolSlide.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.partCollection_PistolSlide.model}, ''), '')
                    )
                )
            `))
            :
            desc((sql
                `lower(
                    trim(
                        coalesce(nullif(${schema.partCollection_PistolSlide.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.partCollection_PistolSlide.model}, ''), '') 
                    )
                )
            `))
        }
        if(sortBy === "createdAt"){
            return ascending ?
                asc(schema.partCollection_PistolSlide.createdAt)
                :
                desc(schema.partCollection_PistolSlide.createdAt)
        }
        if(sortBy === "lastModifiedAt"){
            return ascending ?
                sql`NULLIF(${schema.partCollection_PistolSlide.lastModifiedAt}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.partCollection_PistolSlide.lastModifiedAt}, "") DESC NULLS LAST`
        }
        if(sortBy === "paidPrice"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.partCollection_PistolSlide.paidPrice}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.partCollection_PistolSlide.paidPrice}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "marketValue"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.partCollection_PistolSlide.marketValue}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.partCollection_PistolSlide.marketValue}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "acquisitionDate"){
            return ascending ?
                sql`NULLIF(${schema.partCollection_PistolSlide.acquisitionDate_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.partCollection_PistolSlide.acquisitionDate_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "lastShotAt"){
            return ascending ?
                sql`NULLIF(${schema.partCollection_PistolSlide.lastShotAt_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.partCollection_PistolSlide.lastShotAt_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "lastCleanedAt"){
            return ascending ?
                sql`NULLIF(${schema.partCollection_PistolSlide.lastCleanedAt_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.partCollection_PistolSlide.lastCleanedAt_unix}, "") DESC NULLS LAST`
        }
        
        // Default sorter
        return ascending ?
        asc((sql`
            lower(
                trim(
                    coalesce(nullif(${schema.partCollection_PistolSlide.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.partCollection_PistolSlide.model}, ''), '')
                )
            )
        `))
        :
        desc((sql
            `lower(
                trim(
                    coalesce(nullif(${schema.partCollection_PistolSlide.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.partCollection_PistolSlide.model}, ''), '')
                )
            )
        `))
}