import * as schema from "../../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesAccessory_Misc } from "../../lib/interfaces";

export default function sortAccessoryCollection_Misc(direction: "asc" | "desc", sortBy:SortingTypesAccessory_Misc){
    const ascending = direction === "asc"
        // currently no subtitles
        if(sortBy === "alphabetical"){
            return ascending ?
            asc((sql`
                lower(
                    trim(
                        coalesce(nullif(${schema.accessoryCollection_Misc.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_Misc.model}, ''), '') 
                    )
                )
            `))
            :
            desc((sql
                `lower(
                    trim(
                        coalesce(nullif(${schema.accessoryCollection_Misc.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_Misc.model}, ''), '')
                    )
                )
            `))
        }
        if(sortBy === "createdAt"){
            return ascending ?
                asc(schema.accessoryCollection_Misc.createdAt)
                :
                desc(schema.accessoryCollection_Misc.createdAt)
        }
        if(sortBy === "lastModifiedAt"){
            return ascending ?
                sql`NULLIF(${schema.accessoryCollection_Misc.lastModifiedAt}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_Misc.lastModifiedAt}, "") DESC NULLS LAST`
        }
        if(sortBy === "paidPrice"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.accessoryCollection_Misc.paidPrice}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.accessoryCollection_Misc.paidPrice}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "marketValue"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.accessoryCollection_Misc.marketValue}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.accessoryCollection_Misc.marketValue}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "acquisitionDate"){
            return ascending ?
                sql`NULLIF(${schema.accessoryCollection_Misc.acquisitionDate_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_Misc.acquisitionDate_unix}, "") DESC NULLS LAST`
        }
        
        // Default sorter
        return ascending ?
        asc((sql`
            lower(
                trim(
                    coalesce(nullif(${schema.accessoryCollection_Misc.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.accessoryCollection_Misc.model}, ''), '') 
                )
            )
        `))
        :
        desc((sql
            `lower(
                trim(
                    coalesce(nullif(${schema.accessoryCollection_Misc.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.accessoryCollection_Misc.model}, ''), '')
                )
            )
        `))
}