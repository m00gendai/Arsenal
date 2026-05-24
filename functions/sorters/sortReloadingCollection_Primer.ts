import * as schema from "../../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesReloading_Primer } from "../../lib/interfaces";

export default function sortReloadingCollection_Case(direction: "asc" | "desc", sortBy:SortingTypesReloading_Primer){

    const ascending = direction === "asc"
        // subtitle is serial
        if(sortBy === "alphabetical"){
            return ascending ?
            asc((sql`
                lower(
                    trim(
                        coalesce(nullif(${schema.reloadingCollection_Primer.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.reloadingCollection_Primer.model}, ''), '') 
                    )
                )
            `))
            :
            desc((sql
                `lower(
                    trim(
                        coalesce(nullif(${schema.reloadingCollection_Primer.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.reloadingCollection_Primer.model}, ''), '')
                    )
                )
            `))
        }
        if(sortBy === "createdAt"){
            return ascending ?
                asc(schema.reloadingCollection_Primer.createdAt)
                :
                desc(schema.reloadingCollection_Primer.createdAt)
        }
        if(sortBy === "lastModifiedAt"){
            return ascending ?
                sql`NULLIF(${schema.reloadingCollection_Primer.lastModifiedAt}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.reloadingCollection_Primer.lastModifiedAt}, "") DESC NULLS LAST`
        }
        
        // Default sorter
        return ascending ?
        asc((sql`
            lower(
                trim(
                    coalesce(nullif(${schema.reloadingCollection_Primer.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.reloadingCollection_Primer.model}, ''), '') 
                )
            )
        `))
        :
        desc((sql
            `lower(
                trim(
                    coalesce(nullif(${schema.reloadingCollection_Primer.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.reloadingCollection_Primer.model}, ''), '')
                )
            )
        `))
}