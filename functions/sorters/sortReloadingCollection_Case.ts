import * as schema from "../../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesReloading_Case } from "../../lib/interfaces";

export default function sortReloadingCollection_Case(direction: "asc" | "desc", sortBy:SortingTypesReloading_Case){

    const ascending = direction === "asc"
        // subtitle is serial
        if(sortBy === "alphabetical"){
            return ascending ?
            asc((sql`
                lower(
                    trim(
                        coalesce(nullif(${schema.reloadingCollection_Case.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.reloadingCollection_Case.model}, ''), '') 
                    )
                )
            `))
            :
            desc((sql
                `lower(
                    trim(
                        coalesce(nullif(${schema.reloadingCollection_Case.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.reloadingCollection_Case.model}, ''), '')
                    )
                )
            `))
        }
        if(sortBy === "createdAt"){
            return ascending ?
                asc(schema.reloadingCollection_Case.createdAt)
                :
                desc(schema.reloadingCollection_Case.createdAt)
        }
        if(sortBy === "lastModifiedAt"){
            return ascending ?
                sql`NULLIF(${schema.reloadingCollection_Case.lastModifiedAt}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.reloadingCollection_Case.lastModifiedAt}, "") DESC NULLS LAST`
        }
        
        // Default sorter
        return ascending ?
        asc((sql`
            lower(
                trim(
                    coalesce(nullif(${schema.reloadingCollection_Case.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.reloadingCollection_Case.model}, ''), '') 
                )
            )
        `))
        :
        desc((sql
            `lower(
                trim(
                    coalesce(nullif(${schema.reloadingCollection_Case.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.reloadingCollection_Case.model}, ''), '')
                )
            )
        `))
}