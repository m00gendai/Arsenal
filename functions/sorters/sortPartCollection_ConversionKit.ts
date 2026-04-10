import * as schema from "../../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesPart_ConversionKit } from "../../lib/interfaces";

export default function sortPartCollection_ConversionKit(direction: "asc" | "desc", sortBy:SortingTypesPart_ConversionKit){
    const ascending = direction === "asc"
        // subtitle is caliber
        if(sortBy === "alphabetical"){
            return ascending ?
            asc((sql`
                lower(
                    trim(
                        coalesce(nullif(${schema.partCollection_ConversionKit.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.partCollection_ConversionKit.model}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.partCollection_ConversionKit.caliber}, ''), '')
                    )
                )
            `))
            :
            desc((sql
                `lower(
                    trim(
                        coalesce(nullif(${schema.partCollection_ConversionKit.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.partCollection_ConversionKit.model}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.partCollection_ConversionKit.caliber}, ''), '')
                    )
                )
            `))
        }
        if(sortBy === "createdAt"){
            return ascending ?
                asc(schema.partCollection_ConversionKit.createdAt)
                :
                desc(schema.partCollection_ConversionKit.createdAt)
        }
        if(sortBy === "lastModifiedAt"){
            return ascending ?
                sql`NULLIF(${schema.partCollection_ConversionKit.lastModifiedAt}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.partCollection_ConversionKit.lastModifiedAt}, "") DESC NULLS LAST`
        }
        if(sortBy === "paidPrice"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.partCollection_ConversionKit.paidPrice}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.partCollection_ConversionKit.paidPrice}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "marketValue"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.partCollection_ConversionKit.marketValue}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.partCollection_ConversionKit.marketValue}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "acquisitionDate"){
            return ascending ?
                sql`NULLIF(${schema.partCollection_ConversionKit.acquisitionDate_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.partCollection_ConversionKit.acquisitionDate_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "lastShotAt"){
            return ascending ?
                sql`NULLIF(${schema.partCollection_ConversionKit.lastShotAt_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.partCollection_ConversionKit.lastShotAt_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "lastCleanedAt"){
            return ascending ?
                sql`NULLIF(${schema.partCollection_ConversionKit.lastCleanedAt_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.partCollection_ConversionKit.lastCleanedAt_unix}, "") DESC NULLS LAST`
        }
        
        // Default sorter
        return ascending ?
        asc((sql`
            lower(
                trim(
                    coalesce(nullif(${schema.partCollection_ConversionKit.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.partCollection_ConversionKit.model}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.partCollection_ConversionKit.caliber}, ''), '')
                )
            )
        `))
        :
        desc((sql
            `lower(
                trim(
                    coalesce(nullif(${schema.partCollection_ConversionKit.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.partCollection_ConversionKit.model}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.partCollection_ConversionKit.caliber}, ''), '')
                )
            )
        `))
}