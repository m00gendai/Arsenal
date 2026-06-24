import * as schema from "../../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesReloading_Powder } from "../../lib/interfaces";

export default function sortReloadingCollection_Powder(direction: "asc" | "desc", sortBy:SortingTypesReloading_Powder){

    const ascending = direction === "asc"
        // subtitle is serial
        if(sortBy === "alphabetical"){
            return ascending ?
            asc((sql`
                lower(
                    trim(
                        coalesce(nullif(${schema.reloadingCollection_Powder.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.reloadingCollection_Powder.designation}, ''), '') 
                    )
                )
            `))
            :
            desc((sql
                `lower(
                    trim(
                        coalesce(nullif(${schema.reloadingCollection_Powder.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.reloadingCollection_Powder.designation}, ''), '')
                    )
                )
            `))
        }
        if(sortBy === "createdAt"){
            return ascending ?
                asc(schema.reloadingCollection_Powder.createdAt)
                :
                desc(schema.reloadingCollection_Powder.createdAt)
        }
        if(sortBy === "lastModifiedAt"){
            return ascending ?
                sql`NULLIF(${schema.reloadingCollection_Powder.lastModifiedAt}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.reloadingCollection_Powder.lastModifiedAt}, "") DESC NULLS LAST`
        }
        
        // Default sorter
        return ascending ?
        asc((sql`
            lower(
                trim(
                    coalesce(nullif(${schema.reloadingCollection_Powder.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.reloadingCollection_Powder.designation}, ''), '') 
                )
            )
        `))
        :
        desc((sql
            `lower(
                trim(
                    coalesce(nullif(${schema.reloadingCollection_Powder.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.reloadingCollection_Powder.designation}, ''), '')
                )
            )
        `))
}