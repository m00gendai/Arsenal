import * as schema from "../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesAccessory_LightLaser } from "../interfaces";

export default function sortAccessoryCollection_LightLaser(direction: "asc" | "desc", sortBy:SortingTypesAccessory_LightLaser){
    const ascending = direction === "asc"
        // subtitle is serial
        if(sortBy === "alphabetical"){
            return ascending ?
            asc((sql`
                lower(
                    trim(
                        coalesce(nullif(${schema.accessoryCollection_LightLaser.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_LightLaser.model}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_LightLaser.serial}, ''), '')
                    )
                )
            `))
            :
            desc((sql
                `lower(
                    trim(
                        coalesce(nullif(${schema.accessoryCollection_LightLaser.manufacturer}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_LightLaser.model}, ''), '') || ' ' ||
                        coalesce(nullif(${schema.accessoryCollection_LightLaser.serial}, ''), '')
                    )
                )
            `))
        }
        if(sortBy === "createdAt"){
            return ascending ?
                asc(schema.accessoryCollection_LightLaser.createdAt)
                :
                desc(schema.accessoryCollection_LightLaser.createdAt)
        }
        if(sortBy === "lastModifiedAt"){
            return ascending ?
                sql`NULLIF(${schema.accessoryCollection_LightLaser.lastModifiedAt}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_LightLaser.lastModifiedAt}, "") DESC NULLS LAST`
        }
        if(sortBy === "paidPrice"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.accessoryCollection_LightLaser.paidPrice}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.accessoryCollection_LightLaser.paidPrice}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "marketValue"){
            return ascending ?
                sql`NULLIF(NULLIF(${schema.accessoryCollection_LightLaser.marketValue}, ""), "0") ASC NULLS LAST`
                :
                sql`NULLIF(NULLIF(${schema.accessoryCollection_LightLaser.marketValue}, ""), "0") DESC NULLS LAST`
        }
        if(sortBy === "acquisitionDate"){
            return ascending ?
                sql`NULLIF(${schema.accessoryCollection_LightLaser.acquisitionDate_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_LightLaser.acquisitionDate_unix}, "") DESC NULLS LAST`
        }
        if(sortBy === "lastBatteryChangeAt"){
            return ascending ?
                sql`NULLIF(${schema.accessoryCollection_LightLaser.batteryLastChangedAt_unix}, "") ASC NULLS LAST`
                :
                sql`NULLIF(${schema.accessoryCollection_LightLaser.batteryLastChangedAt_unix}, "") DESC NULLS LAST`
        }
        
        // Default sorter
        return ascending ?
        asc((sql`
            lower(
                trim(
                    coalesce(nullif(${schema.accessoryCollection_LightLaser.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.accessoryCollection_LightLaser.model}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.accessoryCollection_LightLaser.serial}, ''), '')
                )
            )
        `))
        :
        desc((sql
            `lower(
                trim(
                    coalesce(nullif(${schema.accessoryCollection_LightLaser.manufacturer}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.accessoryCollection_LightLaser.model}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.accessoryCollection_LightLaser.serial}, ''), '')
                )
            )
        `))
}