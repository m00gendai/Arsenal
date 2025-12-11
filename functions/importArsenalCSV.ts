import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';
import { unflatten } from 'flat'
import { CollectionType, ItemType } from 'interfaces';
import * as schema from "db/schema"
import { db } from "db/client"

import { determineEmptyObject, determineEmptyObjectReturns } from './determinators';
import { alarm } from 'utils';


export default async function importArsenalCSV(data: CollectionType){

        const result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: true})

        if(result.assets === null){
            return
        }

        if(!result.assets[0].name.startsWith("arsenal_") && !result.assets[0].name.endsWith("DB")){
            alarm("Import Arsenal CSV Error", "No Arsenal CSV selected")
        }

        if(result.assets[0].mimeType !== "text/csv"){
            alarm("Import Arsenal CSV Error", "No valid CSV format")
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