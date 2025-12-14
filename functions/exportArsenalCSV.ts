import { CollectionType, DBOperations } from "../interfaces"
import * as schema from "../db/schema"
import { db } from "../db/client"
import Papa from 'papaparse';
import { flatten } from 'flat'
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";
import * as Sharing from 'expo-sharing';
import * as Application from 'expo-application';

export default async function exportArsenalCSV(data: CollectionType){

    const fileName = `arsenal_${Application.nativeApplicationVersion.replaceAll(".", "-")}_${data}_CSV`

    const collection = db.select().from(schema[data]).all()
    
    const flattened = collection.map(item => {return flatten(item, {safe: true})})

    const csv = Papa.unparse(flattened)

    if(Platform.OS === "android"){
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()

        if(permissions.granted){
            let directoryUri = permissions.directoryUri
            const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(directoryUri, `${fileName}.csv`, "text/csv")
            await FileSystem.writeAsStringAsync(fileUri, csv, {encoding: FileSystem.EncodingType.UTF8})
        }
    } else if(Platform.OS === "ios"){
        const tempPath = `${FileSystem.cacheDirectory}${fileName}.csv`;
              
        await FileSystem.writeAsStringAsync(tempPath, csv, {encoding: FileSystem.EncodingType.UTF8})
        
        await Sharing.shareAsync(tempPath, {mimeType: 'text/csv'})
    }
    
}