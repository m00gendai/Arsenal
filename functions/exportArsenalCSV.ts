import { DBOperations } from "../interfaces"
import * as schema from "../db/schema"
import { db } from "../db/client"
import Papa from 'papaparse';
import { flatten } from 'flat'
import * as FileSystem from "expo-file-system";

export default async function exportArsenalCSV(data:"gun"|"ammo"){

    let collection
    if(data === "gun"){
        collection = db.select().from(schema.gunCollection).all()
    }
    if(data === "ammo"){
        collection = db.select().from(schema.ammoCollection).all()
    }
    const flattened = collection.map(item => {return flatten(item, {safe: true})})

    const csv = Papa.unparse(flattened)
    console.log(csv)
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()

    if(permissions.granted){
        let directoryUri = permissions.directoryUri
        const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(directoryUri, `arsenal_${data}DB.csv`, "text/csv")
        await FileSystem.writeAsStringAsync(fileUri, csv, {encoding: FileSystem.EncodingType.UTF8})
    }
}