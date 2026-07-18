import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import Papa from 'papaparse';
import { unflatten } from 'flat'
import { CollectionType, ItemType } from 'lib/interfaces';
import * as schema from "db/schema"
import { db } from "db/client"
import * as Application from 'expo-application';
import { determineEmptyObjectReturns } from '../determinators';
import { ImportCancelledError, ImportDatabaseMimeTypeError, ImportDatabaseNoValidFileSelectedError, ImportDatabaseVersionMismatchError } from 'lib/customErrors';

function nextFrame() {
    return new Promise(resolve => setTimeout(resolve, 0))
}

export default async function importArsenalCSV(
    importOption: CollectionType,
    startElapsedTime: () => void,
    setImportSize: React.Dispatch<React.SetStateAction<number>>,
    setImportProgress: React.Dispatch<React.SetStateAction<number>>,
){

    const result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: true})
    
    if(result.assets === null){
        throw new ImportCancelledError()
    }
    if(!result.assets[0].name.startsWith("arsenal_") && !result.assets[0].name.endsWith("_CSV")){
        throw new ImportDatabaseNoValidFileSelectedError(`Expected:\narsenal_${Application.nativeApplicationVersion.replaceAll(".", "-")}_${importOption}_CSV.csv\n\nReceived:\n${result.assets[0].name}.\n\nPlease use custom CSV import instead.`)
    }

    const validMimeTypes = [
        "text/csv",
        "text/comma-separated-values",
    ]

    if (!validMimeTypes.includes(result.assets[0].mimeType)) {
        throw new ImportDatabaseMimeTypeError(`Expected:\n${validMimeTypes.join("\n")}\n\nRead:\n${result.assets[0].mimeType}`);
    }
    if(result.assets[0].name.split("_")[1] !== Application.nativeApplicationVersion.replaceAll(".", "-")){
        throw new ImportDatabaseVersionMismatchError(`Expected:\narsenal_${Application.nativeApplicationVersion.replaceAll(".", "-")}_${importOption}_CSV.csv\n\nReceived:\n${result.assets[0].name}.\n\nPlease use custom CSV import instead.`)
    }
    let lastYield = Date.now()
    startElapsedTime()
    

    const importableItem:ItemType = determineEmptyObjectReturns(importOption)

    const content:string = await FileSystem.readAsStringAsync(result.assets[0].uri)
    
    const parsed = Papa.parse(content, {header: true, dynamicTyping: true})
    setImportSize(parsed.data.length)

    const unflat:ItemType[] = []
    for(const item of parsed.data){
        setImportProgress(importProgress => importProgress + 1)
        if (Date.now() - lastYield > 100) {   // yield at most ~10x/sec
            await nextFrame()
            lastYield = Date.now()
        }
        const unitem:ItemType = unflatten(item)

        const filterEmptyTags: string[] = unitem.tags ? typeof unitem.tags === "string" ? (unitem.tags as string).split(",") : (unitem.tags as string[]) : [];
                
        const readyItem:ItemType = {
            ...importableItem, 
            ...unitem, 
            createdAt: unitem.createdAt === null ? new Date().getTime() : unitem.createdAt,
            images: [],
            tags: filterEmptyTags,
            ...("caliber" in unitem && unitem.caliber && { caliber: Array.isArray(unitem.caliber) ? unitem.caliber : (unitem.caliber as string).split(",") })
        }

        unflat.push(readyItem)
    }

    await db.delete(schema[importOption]);
    
    for(const item of unflat){
        try{
            await db.insert(schema[importOption]).values(item)
        }catch(e){
            console.error(e)
            throw new Error(e)
        }  
    }
}