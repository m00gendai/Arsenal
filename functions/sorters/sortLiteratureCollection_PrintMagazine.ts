import * as schema from "../../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesLiterature_PrintMagazine } from "../../lib/interfaces";

export default function sortLiteratureCollection_PrintMagazine(direction: "asc" | "desc", sortBy:SortingTypesLiterature_PrintMagazine){
    const ascending = direction === "asc"
    // subtitle is ...well, subtitle
    if(sortBy === "alphabetical"){
        return ascending ?
        asc((sql`
            lower(
                trim(
                    coalesce(nullif(${schema.literatureCollection_PrintMagazine.title}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.literatureCollection_PrintMagazine.volume_printMagazine}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.literatureCollection_PrintMagazine.issue}, ''), '')
                )
            )
        `))
        :
        desc((sql
            `lower(
                trim(
                    coalesce(nullif(${schema.literatureCollection_PrintMagazine.title}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.literatureCollection_PrintMagazine.volume_printMagazine}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.literatureCollection_PrintMagazine.issue}, ''), '')
                )
            )
        `))
    }
    if(sortBy === "createdAt"){
        return ascending ?
            asc(schema.literatureCollection_PrintMagazine.createdAt)
            :
            desc(schema.literatureCollection_PrintMagazine.createdAt)
    }
    if(sortBy === "lastModifiedAt"){
        return ascending ?
            sql`NULLIF(${schema.literatureCollection_PrintMagazine.lastModifiedAt}, "") ASC NULLS LAST`
            :
            sql`NULLIF(${schema.literatureCollection_PrintMagazine.lastModifiedAt}, "") DESC NULLS LAST`
    }
    if(sortBy === "paidPrice"){
        return ascending ?
            sql`NULLIF(NULLIF(${schema.literatureCollection_PrintMagazine.paidPrice}, ""), "0") ASC NULLS LAST`
            :
            sql`NULLIF(NULLIF(${schema.literatureCollection_PrintMagazine.paidPrice}, ""), "0") DESC NULLS LAST`
    }
    if(sortBy === "marketValue"){
        return ascending ?
            sql`NULLIF(NULLIF(${schema.literatureCollection_PrintMagazine.marketValue}, ""), "0") ASC NULLS LAST`
            :
            sql`NULLIF(NULLIF(${schema.literatureCollection_PrintMagazine.marketValue}, ""), "0") DESC NULLS LAST`
    }
    if(sortBy === "acquisitionDate"){
        return ascending ?
            sql`NULLIF(${schema.literatureCollection_PrintMagazine.acquisitionDate_unix}, "") ASC NULLS LAST`
            :
            sql`NULLIF(${schema.literatureCollection_PrintMagazine.acquisitionDate_unix}, "") DESC NULLS LAST`
    }
    if(sortBy === "pages"){
        return ascending ?
            sql`NULLIF(${schema.literatureCollection_PrintMagazine.pages}, "") ASC NULLS LAST`
            :
            sql`NULLIF(${schema.literatureCollection_PrintMagazine.pages}, "") DESC NULLS LAST`
    }
    
    // Default sorter
    return ascending ?
    asc((sql`
        lower(
            trim(
                coalesce(nullif(${schema.literatureCollection_PrintMagazine.title}, ''), '') || ' ' ||
                coalesce(nullif(${schema.literatureCollection_PrintMagazine.volume_printMagazine}, ''), '') || ' ' ||
                coalesce(nullif(${schema.literatureCollection_PrintMagazine.issue}, ''), '')
            )
        )
    `))
    :
    desc((sql
        `lower(
            trim(
                coalesce(nullif(${schema.literatureCollection_PrintMagazine.title}, ''), '') || ' ' ||
                coalesce(nullif(${schema.literatureCollection_PrintMagazine.volume_printMagazine}, ''), '') || ' ' ||
                coalesce(nullif(${schema.literatureCollection_PrintMagazine.issue}, ''), '')
            )
        )
    `))
}