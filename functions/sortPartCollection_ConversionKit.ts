import * as schema from "../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesAccessory_Silencer, SortingTypesPart_ConversionKit } from "../interfaces";

export default function sortPartCollection_ConversionKit(direction: "asc" | "desc", sortBy:SortingTypesPart_ConversionKit){
    const ascending = direction === "asc"

        if(sortBy === "alphabetical"){
            return ascending ?
                asc((sql`COALESCE(NULLIF(${schema.partCollection_ConversionKit.manufacturer}, ""), ${schema.partCollection_ConversionKit.model})`))
                :
                desc((sql`COALESCE(NULLIF(${schema.partCollection_ConversionKit.manufacturer}, ""), ${schema.partCollection_ConversionKit.model})`))
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
                asc((sql`COALESCE(NULLIF(${schema.partCollection_ConversionKit.manufacturer}, ""), ${schema.partCollection_ConversionKit.model})`))
                :
                desc((sql`COALESCE(NULLIF(${schema.partCollection_ConversionKit.manufacturer}, ""), ${schema.partCollection_ConversionKit.model})`))

}