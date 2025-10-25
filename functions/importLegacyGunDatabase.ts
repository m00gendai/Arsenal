import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { GunType } from '../interfaces';
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
    let guns:GunType[]
    try{
        guns = JSON.parse(content)
    }catch(e){
        throw new Error(`JSON parsing gunDB: ${e}`)
    }

    const importTags:{label:string, status:boolean}[] = []
    const importableGunCollection:GunType[] = await Promise.all(guns.map(async gun=>{
        if(gun.images !== null && gun.images.length !== 0){
            const base64images:string[] = await Promise.all(gun.images.map(async (image, index) =>{
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
                const fileUri = FileSystem.documentDirectory + `${sanitizeFileName(gun.id)}_image_${index}.jpg`;
                await FileSystem.writeAsStringAsync(fileUri, base64Image, {
                    encoding: FileSystem.EncodingType.Base64,
                })
                return fileUri
            }))
            const importableGun:GunType = {...gun, images: base64images}
            if(gun.tags !== undefined && gun.tags.length !== 0){
                for(const tag of gun.tags){
                    if(!importTags.some(importTag => importTag.label === tag)){
                        importTags.push({label: tag, status: true})
                    }
                }
            }
            return importableGun
        } else {
            if(gun.tags !== undefined && gun.tags.length !== 0){
                for(const tag in gun.tags){
                    if(!importTags.some(importTag => importTag.label === tag)){
                        importTags.push({label: tag, status: true})
                    }
                }
            }
            return gun
        }
    }))

    await db.delete(schema.gunCollection);

   for(const gun of importableGunCollection){
    const flatGun = {...gun, ...gun.status}
    await db.insert(schema.gunCollection).values(flatGun)
   }

   for(const tag of importTags){
    await db.insert(schema.gunTags).values({label: tag.label}).onConflictDoNothing()
   }

   return importableGunCollection.length
}