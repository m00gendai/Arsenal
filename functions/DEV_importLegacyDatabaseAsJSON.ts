// This is to test the migration of existing data <V2.0.0 to the new DB structure
// It is not used for anything else than testing

import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { GunType } from '../interfaces';
import { getImageSize, sanitizeFileName } from '../utils';
import { manipulateAsync } from "expo-image-manipulator"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GUN_DATABASE, KEY_DATABASE } from '../configs_DB';
import * as SecureStore from "expo-secure-store"
import { v4 as uuidv4 } from 'uuid';

export default async function DEV_importLegacyDatabaseAsJSON(){

    const legacyGun = [
        {
            "acquisitionDate": "", 
            "caliber": [], 
            "createdAt": 
            "Mon Aug 26 2024 17:20:36 GMT+0200", 
            "id": uuidv4(), 
            "images": null, 
            "lastCleanedAt": "", 
            "lastModifiedAt": "Mon Aug 26 2024 17:20:36 GMT+0200", 
            "lastShotAt": "", 
            "mainColor": "", 
            "manufacturer": "", 
            "manufacturingDate": "", 
            "marketValue": "", 
            "model": `___DEV___${Math.random()}`, 
            "originCountry": "", 
            "paidPrice": "", 
            "permit": "", 
            "remarks": "", 
            "serial": "", 
            "shotCount": "", 
            "status": {
                "exFullAuto": false, 
                "fullAuto": true, 
                "highCapacityMagazine": false, 
                "short": false
            }, 
            "tags": []
        }
    ]

        // LEgacy GunType is incompatible with current GunType
        /*@ts-expect-error */
        const guns:GunType[] = legacyGun

        const importTags:{label:string, status:boolean}[] = []
        
        const importableGunCollection:GunType[] = await Promise.all(guns.map(async gun=>{
            if(gun.images !== null && gun.images.length !== 0){
                const base64images:string[] = await Promise.all(gun.images.map(async (image, index) =>{
                    const base64ImageUri = `data:image/jpeg;base64,${image}`;
                    const dimensions = await getImageSize(base64ImageUri) as {width: number, height: number}
                    // Resize the image
                    const resizedImage = dimensions.height !== 0 && dimensions.width !== 0 ? 
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

        const allKeys:string = await AsyncStorage.getItem(KEY_DATABASE) // gets the object that holds all key values
        let newKeys:string[] = []
        
        importableGunCollection.map(value =>{
            newKeys.push(value.id) // if its the first gun to be saved, create an array with the id of the gun. Otherwise, merge the key into the existing array
            SecureStore.setItem(`${GUN_DATABASE}_${value.id}`, JSON.stringify(value)) // Save the gun
        })
    
        await AsyncStorage.setItem(KEY_DATABASE, JSON.stringify(newKeys)) // Save the key object
    }