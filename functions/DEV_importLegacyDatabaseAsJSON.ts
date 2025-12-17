// This is to test the migration of existing data <V2.0.0 to the new DB structure
// It is not used for anything else than testing

import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { AmmoType, GunType } from '../interfaces';
import { getImageSize, sanitizeFileName } from '../utils';
import { manipulateAsync } from "expo-image-manipulator"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { A_KEY_DATABASE, AMMO_DATABASE, GUN_DATABASE, KEY_DATABASE } from '../configs_DB';
import * as SecureStore from "expo-secure-store"
import { v4 as uuidv4 } from 'uuid';

export default async function DEV_importLegacyDatabaseAsJSON(type: "gun" | "ammo"){

    const legacyGun = [
        {
            "acquisitionDate": "31.12.2000", 
            "caliber": [".10 Eichelberger Long Rifle", ".10 Eichelberger Pup"], 
            "createdAt": "Mon Aug 26 2024 17:20:36 GMT+0200", 
            "id": uuidv4(), 
            "images": null, 
            "lastCleanedAt": "01.01.1996", 
            "lastModifiedAt": null, 
            "lastShotAt": "29.02.1988", 
            "mainColor": "#ff0000", 
            "manufacturer": "Tester Arms Co", 
            "manufacturingDate": "1970s", 
            "marketValue": "1234", 
            "model": `___DEV___${Math.random()}`, 
            "originCountry": "Elbonia", 
            "paidPrice": "4321", 
            "permit": "No", 
            "remarks": "Bla blubb\nnewline", 
            "serial": "abc-123", 
            "shotCount": "666", 
            "status": {
                "exFullAuto": false, 
                "fullAuto": true, 
                "highCapacityMagazine": false, 
                "short": false
            }, 
            "tags": ["test_tag"]
        }
    ]

    const legacyAmmo = [
        {
            "caliber": ".12 Cooper", 
            "createdAt": "Mon Aug 26 2024 17:20:36 GMT+0200", 
            "id": uuidv4(), 
            "images": null, 
            "lastModifiedAt": null, 
            "criticalStock": "123",
            "currentStock": "120",
            "designation": `___DEV___${Math.random()}`,
            "headstamp": "LOL",
            "lastTopUpAt": "31.12.2000",
            "manufacturer": "Tester Ammo Co",
            "originCountry": "Elbonia",
            "previousStock": "130",
            "remarks": "ababbase\nnewline",
            "tags": ["test_ammotag"]
        }
    ]

    if(type === "gun"){
        // Legacy GunType is incompatible with current GunType
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

    if(type === "ammo"){
        // Legacy AmmoType is incompatible with current AmmoType
        /*@ts-expect-error */
        const ammunition:AmmoType[] = legacyAmmo

        const importTags:{label:string, status:boolean}[] = []
        
        const importableAmmoCollection:AmmoType[] = await Promise.all(ammunition.map(async ammo=>{
            if(ammo.images !== null && ammo.images.length !== 0){
                const base64images:string[] = await Promise.all(ammo.images.map(async (image, index) =>{
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
                    const fileUri = FileSystem.documentDirectory + `${sanitizeFileName(ammo.id)}_image_${index}.jpg`;
                    await FileSystem.writeAsStringAsync(fileUri, base64Image, {
                        encoding: FileSystem.EncodingType.Base64,
                    })
                    return fileUri
                }))
                const importableAmmo:AmmoType = {...ammo, images: base64images}
                if(ammo.tags !== undefined && ammo.tags.length !== 0){
                    for(const tag of ammo.tags){
                        if(!importTags.some(importTag => importTag.label === tag)){
                            importTags.push({label: tag, status: true})
                        }
                    }
                }

                return importableAmmo
            } else {
                if(ammo.tags !== undefined && ammo.tags.length !== 0){
                    for(const tag in ammo.tags){
                        if(!importTags.some(importTag => importTag.label === tag)){
                            importTags.push({label: tag, status: true})
                        }
                    }
                }

                return ammo
            }
        }))

        const allKeys:string = await AsyncStorage.getItem(A_KEY_DATABASE) // gets the object that holds all key values
        let newKeys:string[] = []
        
        importableAmmoCollection.map(value =>{
            newKeys.push(value.id) // if its the first ammo to be saved, create an array with the id of the ammo. Otherwise, merge the key into the existing array
            SecureStore.setItem(`${AMMO_DATABASE}_${value.id}`, JSON.stringify(value)) // Save the ammo
        })
    
        await AsyncStorage.setItem(A_KEY_DATABASE, JSON.stringify(newKeys)) // Save the key object
    }
}