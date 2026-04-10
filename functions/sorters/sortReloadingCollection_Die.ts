import * as schema from "../../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesReloading_Die } from "../../lib/interfaces";

export default function sortReloadingCollection_Die(direction: "asc" | "desc", sortBy:SortingTypesReloading_Die){

    const ascending = direction === "asc"
        // subtitle is serial
        if(sortBy === "alphabetical"){
            return ascending ?
            asc((sql`
                lower(
                    trim(
                        coalesce(nullif(${schema.reloadingCollection_Die.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.reloadingCollection_Die.model}, ''), '') 
                    )
                )
            `))
            :
            desc((sql
                `lower(
                    trim(
                        coalesce(nullif(${schema.reloadingCollection_Die.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.reloadingCollection_Die.model}, ''), '')
                    )
                )
            `))
        }
        if(sortBy === "createdAt"){
            return ascending ?
                asc(schema.reloadingCollection_Die.createdAt)
                :
                desc(schema.reloadingCollection_Die.createdAt)
        }
        if(sortBy === "lastModifiedAt"){
            return ascending ?
                sql`NULLIF(${schema.reloadingCollection_Die.lastModifiedAt}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.reloadingCollection_Die.lastModifiedAt}, "") DESC NULLS LAST`
        }
        if(sortBy === "paidPrice"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.reloadingCollection_Die.paidPrice}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.reloadingCollection_Die.paidPrice}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "marketValue"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.reloadingCollection_Die.marketValue}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.reloadingCollection_Die.marketValue}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "acquisitionDate"){
            return ascending ?
                sql`NULLIF(${schema.reloadingCollection_Die.acquisitionDate_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.reloadingCollection_Die.acquisitionDate_unix}, "") DESC NULLS LAST`
        }
        
        // Default sorter
        return ascending ?
        asc((sql`
            lower(
                trim(
                    coalesce(nullif(${schema.reloadingCollection_Die.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.reloadingCollection_Die.model}, ''), '') 
                )
            )
        `))
        :
        desc((sql
            `lower(
                trim(
                    coalesce(nullif(${schema.reloadingCollection_Die.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.reloadingCollection_Die.model}, ''), '')
                )
            )
        `))
}