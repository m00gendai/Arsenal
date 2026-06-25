import * as schema from "../../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesReloading_Bullet } from "../../lib/interfaces";

export default function sortReloadingCollection_Bullet(direction: "asc" | "desc", sortBy:SortingTypesReloading_Bullet){

    const ascending = direction === "asc"
        // subtitle is serial
        if(sortBy === "alphabetical"){
            return ascending ?
            asc((sql`
                lower(
                    trim(
                        coalesce(nullif(${schema.reloadingCollection_Bullet.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.reloadingCollection_Bullet.model}, ''), '') 
                    )
                )
            `))
            :
            desc((sql
                `lower(
                    trim(
                        coalesce(nullif(${schema.reloadingCollection_Bullet.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.reloadingCollection_Bullet.model}, ''), '')
                    )
                )
            `))
        }
        if(sortBy === "createdAt"){
            return ascending ?
                asc(schema.reloadingCollection_Bullet.createdAt)
                :
                desc(schema.reloadingCollection_Bullet.createdAt)
        }
        if(sortBy === "lastModifiedAt"){
            return ascending ?
                sql`NULLIF(${schema.reloadingCollection_Bullet.lastModifiedAt}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.reloadingCollection_Bullet.lastModifiedAt}, "") DESC NULLS LAST`
        }
        
        // Default sorter
        return ascending ?
        asc((sql`
            lower(
                trim(
                    coalesce(nullif(${schema.reloadingCollection_Bullet.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.reloadingCollection_Bullet.model}, ''), '') 
                )
            )
        `))
        :
        desc((sql
            `lower(
                trim(
                    coalesce(nullif(${schema.reloadingCollection_Bullet.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.reloadingCollection_Bullet.model}, ''), '')
                )
            )
        `))
}