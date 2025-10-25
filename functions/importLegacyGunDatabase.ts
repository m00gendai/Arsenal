import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { AmmoType, GunType } from '../interfaces';
import { getImageSize, sanitizeFileName } from '../utils';
import { manipulateAsync } from "expo-image-manipulator"
import { expo, db } from "../db/client"
import * as schema from "../db/schema"
import { ImportExportStore } from '../stores/useImportExportStore';

export async function importLegacyGunDatabase(resizeImages:boolean, importOptionLegacyDB:"gun"|"ammo"){
       
    const result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: true})
    
    if(result.assets === null){
        return
    }
    
    if(!result.assets[0].name.startsWith(`${importOptionLegacyDB}DB_`)){
        throw new Error(`Legacy DB Prefix not ${importOptionLegacyDB}DB_`)
    }

    const content = await FileSystem.readAsStringAsync(result.assets[0].uri)

    let importables:GunType[] | AmmoType[]
    try {
        importables = JSON.parse(content)
    } catch(e) {
        // This tries to fix any malformed JSON
        try {
            let tryParse = content.trim();
            
            // Remove outer brackets if present
            if (tryParse.startsWith('[')) {
                tryParse = tryParse.slice(1);
            }
            if (tryParse.endsWith(']')) {
                tryParse = tryParse.slice(0, -1);
            }
            
            // Remove any trailing commas
            tryParse = tryParse.trim().replace(/,\s*$/, '');
            
            // Fix missing commas between objects
            tryParse = tryParse.replace(/}\s*{/g, '},{');
            
            const jsonString = '[' + tryParse + ']';
            importables = JSON.parse(jsonString);
        } catch(e) {
            throw new Error(`JSON parsing ${importOptionLegacyDB}DB_: ${e}`)
        }
    }

    const importTags:{label:string, status:boolean}[] = []
    const importableCollection:GunType[] | AmmoType[] = await Promise.all(importables.map(async importable=>{
        if(importable.images !== null && importable.images.length !== 0){
            const base64images:string[] = await Promise.all(importable.images.map(async (image, index) =>{
                const base64ImageUri = `data:image/jpeg;base64,${image}`;
                const dimensions = await getImageSize(base64ImageUri) as {width: number, height: number}
                // Resize the image
                const resizedImage = dimensions.height !== 0 && dimensions.width !== 0 && resizeImages ? 
                    dimensions.width >= 1000 ? 
                        await manipulateAsync(
                            base64ImageUri,
                            [{ resize: dimensions.width >= 1000 ? {width: 1000} : {height: 1000}}], // Change dimensions as needed
                            { base64: true }
                        ) 
                    : dimensions.height >= 1000 ?
                        await manipulateAsync(
                            base64ImageUri,
                            [{ resize: dimensions.height >= 1000 ? {height: 1000} : {width: 1000}}], // Change dimensions as needed
                            { base64: true }
                        ) 
                    : 
                    await manipulateAsync(
                        base64ImageUri,
                        [{ resize: {width: dimensions.width, height: dimensions.height}}], // Change dimensions as needed
                        { base64: true }
                    ) 
                : await manipulateAsync(
                    base64ImageUri,
                    [{ resize: {width: dimensions.width, height: dimensions.height}}], // Change dimensions as needed
                    { base64: true }
                ) 

                const base64Image = resizedImage.base64;
                const fileUri = FileSystem.documentDirectory + `${sanitizeFileName(importable.id)}_image_${index}.jpg`;
                await FileSystem.writeAsStringAsync(fileUri, base64Image, {
                    encoding: FileSystem.EncodingType.Base64,
                })
                return fileUri
            }))
            const importableItem:GunType | AmmoType = {...importable, images: base64images}
            if(importable.tags !== undefined && importable.tags.length !== 0){
                for(const tag of importable.tags){
                    if(!importTags.some(importTag => importTag.label === tag)){
                        importTags.push({label: tag, status: true})
                    }
                }
            }
            return importableItem
        } else {
            if(importable.tags !== undefined && importable.tags.length !== 0){
                for(const tag in importable.tags){
                    if(!importTags.some(importTag => importTag.label === tag)){
                        importTags.push({label: tag, status: true})
                    }
                }
            }
            return importable
        }
    }))

    await db.delete(schema.gunCollection);

   for(const importable of importableCollection){
    if(importOptionLegacyDB === "gun"){
        const importableType = importable as GunType
        const flatGun = {...importableType, ...importableType.status}
        await db.insert(schema.gunCollection).values(flatGun)
    }
    if(importOptionLegacyDB === "ammo"){
        const importableType = importable as AmmoType
        await db.insert(schema.ammoCollection).values(importableType)
    }
    
   }

   for(const tag of importTags){
    if(importOptionLegacyDB === "gun"){
        await db.insert(schema.gunTags).values({label: tag.label}).onConflictDoNothing()
    }
    if(importOptionLegacyDB === "ammo"){
        await db.insert(schema.ammoTags).values({label: tag.label}).onConflictDoNothing()
    }
   }

   return importableCollection.length
}