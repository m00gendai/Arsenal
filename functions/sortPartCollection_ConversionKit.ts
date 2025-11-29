import * as schema from "../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesAccessory_Silencer, SortingTypesPart_ConversionKit } from "../interfaces";

export default function sortPartCollection_ConversionKit(direction: "asc" | "desc", sortBy:SortingTypesPart_ConversionKit){
    const ascending = direction === "asc"

    const parseDateColumn = (column) => sql`
        CAST(
            strftime('%s', 
            substr(NULLIF(NULLIF(${column}, ''), '0'), 7, 4) || '-' ||
            substr(NULLIF(NULLIF(${column}, ''), '0'), 4, 2) || '-' ||
            substr(NULLIF(NULLIF(${column}, ''), '0'), 1, 2)
            ) AS INTEGER
        )
    `

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
                sql`${parseDateColumn(schema.partCollection_ConversionKit.acquisitionDate)} ASC NULLS LAST`
                :
                sql`${parseDateColumn(schema.partCollection_ConversionKit.acquisitionDate)} DESC NULLS LAST`
        }
        if(sortBy === "lastShotAt"){
            return ascending ?
                sql`${parseDateColumn(schema.partCollection_ConversionKit.lastShotAt)} ASC NULLS LAST`
                :
                sql`${parseDateColumn(schema.partCollection_ConversionKit.lastShotAt)} DESC NULLS LAST`
        }
        if(sortBy === "lastCleanedAt"){
            return ascending ?
                sql`${parseDateColumn(schema.partCollection_ConversionKit.lastCleanedAt)} ASC NULLS LAST`
                :
                sql`${parseDateColumn(schema.partCollection_ConversionKit.lastCleanedAt)} DESC NULLS LAST`
        }
        
        // Default sorter
        return ascending ?
                asc((sql`COALESCE(NULLIF(${schema.partCollection_ConversionKit.manufacturer}, ""), ${schema.partCollection_ConversionKit.model})`))
                :
                desc((sql`COALESCE(NULLIF(${schema.partCollection_ConversionKit.manufacturer}, ""), ${schema.partCollection_ConversionKit.model})`))

}