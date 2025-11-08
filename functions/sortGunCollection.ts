import * as schema from "../db/schema"
import { eq, lt, gte, ne, and, or, like, asc, desc, exists, isNull, sql, inArray } from 'drizzle-orm';
import { SortingTypesGun } from "../interfaces";

export default function sortGunCollection(ascending:boolean, sortBy:SortingTypesGun){

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
                asc((sql`COALESCE(NULLIF(${schema.gunCollection.manufacturer}, ""), ${schema.gunCollection.model})`))
                :
                desc((sql`COALESCE(NULLIF(${schema.gunCollection.manufacturer}, ""), ${schema.gunCollection.model})`))
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
                sql`${parseDateColumn(schema.gunCollection.acquisitionDate)} ASC NULLS LAST`
                :
                sql`${parseDateColumn(schema.gunCollection.acquisitionDate)} DESC NULLS LAST`
        }
        if(sortBy === "lastShotAt"){
            return ascending ?
                sql`${parseDateColumn(schema.gunCollection.lastShotAt)} ASC NULLS LAST`
                :
                sql`${parseDateColumn(schema.gunCollection.lastShotAt)} DESC NULLS LAST`
        }
        if(sortBy === "lastCleanedAt"){
            return ascending ?
                sql`${parseDateColumn(schema.gunCollection.lastCleanedAt)} ASC NULLS LAST`
                :
                sql`${parseDateColumn(schema.gunCollection.lastCleanedAt)} DESC NULLS LAST`
        }
        
        // Default sorter
        return ascending ?
                asc((sql`COALESCE(NULLIF(${schema.gunCollection.manufacturer}, ""), ${schema.gunCollection.model})`))
                :
                desc((sql`COALESCE(NULLIF(${schema.gunCollection.manufacturer}, ""), ${schema.gunCollection.model})`))

}