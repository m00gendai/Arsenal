import * as schema from "db/schema"
import { db } from "db/client"
import { GunType } from "lib/interfaces";
import { v4 as uuidv4 } from 'uuid';
import { emptyGunObject } from "lib/DataTemplates/gunDataTemplate";

export default async function DEV_injectBadItem_date(){
    const badItem: GunType = {...emptyGunObject}
    try{
        // This injects deliberately bad data so errors are expected
        /*@ts-expect-error */
        await db.insert(schema.gunCollection).values({...badItem, id: uuidv4(), acquisitionDate_unix: "b"})
    } catch(e){
        console.error(e)
    }
}