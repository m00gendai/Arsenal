import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';
import { unflatten } from 'flat'
import { CollectionType, ItemType } from 'lib/interfaces';
import * as schema from "db/schema"
import { db } from "db/client"
import * as Application from 'expo-application';
import { determineEmptyObject, determineEmptyObjectReturns } from '../determinators';
import { alarm } from 'functions/utils';


export default async function importArsenalCSV(data: CollectionType){

        const result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: true})

        if(result.assets === null){
            return
        }

        if(!result.assets[0].name.startsWith("arsenal_") && !result.assets[0].name.endsWith("_CSV")){
            alarm("Import Arsenal CSV Error: No Arsenal CSV selected", `Expected:\narsenal_${Application.nativeApplicationVersion.replaceAll(".", "-")}_${data}_CSV.csv\n\nReceived:\n${result.assets[0].name}.\n\nPlease use custom CSV import instead.`)
            return
        }

        const validMimeTypes = [
            "text/csv",
            "text/comma-separated-values",
        ]

        if (!validMimeTypes.includes(result.assets[0].mimeType)) {
            alarm("Import Arsenal CSV Error: No valid CSV format", `Expected:\n${validMimeTypes.join("\n")}\n\nRead:\n${result.assets[0].mimeType}`);
            return
        }

        if(result.assets[0].name.split("_")[1] !== Application.nativeApplicationVersion.replaceAll(".", "-")){
            alarm(`Import Arsenal CSV Error: Version mismatch`, `Expected:\narsenal_${Application.nativeApplicationVersion.replaceAll(".", "-")}_${data}_CSV.csv\n\nReceived:\n${result.assets[0].name}.\n\nPlease use custom CSV import instead.`)
            return
        }

        const importableItem:ItemType = determineEmptyObjectReturns(data)

        const content:string = await FileSystem.readAsStringAsync(result.assets[0].uri)
        
        const parsed = Papa.parse(content, {header: true, dynamicTyping: true})

        const unflat:ItemType[] = parsed.data.map(item => {

            const unitem:ItemType = unflatten(item)

         
            const filterEmptyTags: string[] = unitem.tags ? typeof unitem.tags === "string" ? (unitem.tags as string).split(",") : (unitem.tags as string[]) : [];
            
            const readyItem:ItemType = {
                ...importableItem, 
                ...unitem, 
                createdAt: unitem.createdAt === null ? new Date().getTime() : unitem.createdAt,
                images: [],
                tags: filterEmptyTags
            }

            return readyItem
        })

        await db.delete(schema[data]);
        for(const item of unflat){
            try{
                await db.insert(schema[data]).values(item)
            }catch(e){
                console.error(e)
            }  
        }

        return unflat.length

}