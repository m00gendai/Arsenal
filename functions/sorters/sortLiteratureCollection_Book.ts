import * as schema from "../../db/schema"
import { asc, desc, sql } from 'drizzle-orm';
import { SortingTypesLiterature_Book } from "../../lib/interfaces";

export default function sortLiteratureCollection_Book(direction: "asc" | "desc", sortBy:SortingTypesLiterature_Book){
    const ascending = direction === "asc"
    // subtitle is ...well, subtitle
    if(sortBy === "alphabetical"){
        return ascending ?
        asc((sql`
            lower(
                trim(
                    coalesce(nullif(${schema.literatureCollection_Book.title}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.literatureCollection_Book.volume}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.literatureCollection_Book.subtitle}, ''), '')
                )
            )
        `))
        :
        desc((sql
            `lower(
                trim(
                    coalesce(nullif(${schema.literatureCollection_Book.title}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.literatureCollection_Book.volume}, ''), '') || ' ' ||
                    coalesce(nullif(${schema.literatureCollection_Book.subtitle}, ''), '')
                )
            )
        `))
    }
    if(sortBy === "createdAt"){
        return ascending ?
            asc(schema.literatureCollection_Book.createdAt)
            :
            desc(schema.literatureCollection_Book.createdAt)
    }
    if(sortBy === "lastModifiedAt"){
        return ascending ?
            sql`NULLIF(${schema.literatureCollection_Book.lastModifiedAt}, "") ASC NULLS LAST`
            :
            sql`NULLIF(${schema.literatureCollection_Book.lastModifiedAt}, "") DESC NULLS LAST`
    }
    if(sortBy === "paidPrice"){
        return ascending ?
            sql`NULLIF(NULLIF(${schema.literatureCollection_Book.paidPrice}, ""), "0") ASC NULLS LAST`
            :
            sql`NULLIF(NULLIF(${schema.literatureCollection_Book.paidPrice}, ""), "0") DESC NULLS LAST`
    }
    if(sortBy === "marketValue"){
        return ascending ?
            sql`NULLIF(NULLIF(${schema.literatureCollection_Book.marketValue}, ""), "0") ASC NULLS LAST`
            :
            sql`NULLIF(NULLIF(${schema.literatureCollection_Book.marketValue}, ""), "0") DESC NULLS LAST`
    }
    if(sortBy === "acquisitionDate"){
        return ascending ?
            sql`NULLIF(${schema.literatureCollection_Book.acquisitionDate_unix}, "") ASC NULLS LAST`
            :
            sql`NULLIF(${schema.literatureCollection_Book.acquisitionDate_unix}, "") DESC NULLS LAST`
    }
    if(sortBy === "pages"){
        return ascending ?
            sql`NULLIF(${schema.literatureCollection_Book.pages}, "") ASC NULLS LAST`
            :
            sql`NULLIF(${schema.literatureCollection_Book.pages}, "") DESC NULLS LAST`
    }
    
    // Default sorter
    return ascending ?
    asc((sql`
        lower(
            trim(
                coalesce(nullif(${schema.literatureCollection_Book.title}, ''), '') || ' ' ||
                coalesce(nullif(${schema.literatureCollection_Book.volume}, ''), '') || ' ' ||
                coalesce(nullif(${schema.literatureCollection_Book.subtitle}, ''), '')
            )
        )
    `))
    :
    desc((sql
        `lower(
            trim(
                coalesce(nullif(${schema.literatureCollection_Book.title}, ''), '') || ' ' ||
                coalesce(nullif(${schema.literatureCollection_Book.volume}, ''), '') || ' ' ||
                coalesce(nullif(${schema.literatureCollection_Book.subtitle}, ''), '')
            )
        )
    `))
}