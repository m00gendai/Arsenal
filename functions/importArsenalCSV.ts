import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';
import { unflatten } from 'flat'
import { AmmoType, GunType, GunTypeStatus } from 'interfaces';
import * as schema from "db/schema"
import { db } from "db/client"
import { emptyGunObject } from 'lib/DataTemplates/gunDataTemplate';
import { emptyAmmoObject } from 'lib/DataTemplates/ammoDataTemplate';

export default async function importArsenalCSV(data:"gun"|"ammo"){

        const result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: true})

        if(result.assets === null){
            return
        }

        const importableItem:GunType | AmmoType = data === "gun" ? emptyGunObject : emptyAmmoObject

        const content:string = await FileSystem.readAsStringAsync(result.assets[0].uri)
        
        const parsed = Papa.parse(content, {header: true, dynamicTyping: true})

        // The errors are due to GunType expecting string[], but the parsed content is only a string. Maybe a type ImportableGunType[] should be created.
        // Future me: What the hell dude, the caliber should, nay MUST be a string[], ffs, what were you THINKING past me
        const unflat:(GunType&GunTypeStatus | AmmoType)[] = parsed.data.map(item => {

            const unitem:GunType&GunTypeStatus | AmmoType = unflatten(item)
            /* @ts-expect-error */
            const filterEmptyTags:string[] = unitem.tags === undefined ? [] : unitem.tags === null ? [] : unitem.tags === "" ? [] : typeof unitem.tags === "string" ? unitem.tags.split(",") : unitem.tags

            if(data === "gun"){
                const item = unitem as GunType&GunTypeStatus
                const multiCal:string[] = unitem.caliber === undefined ? [] : unitem.caliber === null ? [] : typeof unitem.caliber === "string" ? unitem.caliber.split(",") : unitem.caliber
                
                const readyItem:GunType&GunTypeStatus = {...importableItem as GunType&GunTypeStatus, 
                    id: item.id,
                    manufacturer: item.manufacturer,
                    model: item.model,
                    manufacturingDate: item.manufacturingDate,
                    originCountry: item.originCountry,
                    caliber: multiCal,
                    serial: item.serial,
                    permit: item.permit,
                    acquisitionDate: item.acquisitionDate,
                    boughtFrom: item.boughtFrom,
                    mainColor: item.mainColor,
                    remarks : item.remarks,
                    images: [],
                    createdAt: item.createdAt === null ? new Date().getTime() : item.createdAt,
                    lastModifiedAt: item.lastModifiedAt,
                    shotCount: item.shotCount,
                    tags: filterEmptyTags,
                    lastShotAt: item.lastShotAt,
                    lastCleanedAt: item.lastCleanedAt,
                    paidPrice: item.paidPrice,
                    marketValue: item.marketValue,
                    cleanInterval: item.cleanInterval,
                    exFullAuto: item.exFullAuto,
                    highCapacityMagazine: item.highCapacityMagazine,
                    short: item.short,
                    fullAuto: item.fullAuto,
                    launcher: item.launcher,
                    decepticon: item.decepticon,
                    blooptoob: item.blooptoob,
                    grandfather: item.grandfather,
                }
                return readyItem
            }
            if(data === "ammo"){
                const item = unitem as AmmoType
                const readyItem:AmmoType = {...importableItem as AmmoType, 
                    id: item.id,
                    createdAt: item.createdAt === null ? new Date().getTime() : item.createdAt,
                    lastModifiedAt: item.lastModifiedAt,
                    manufacturer: item.manufacturer,
                    designation: item.designation,
                    originCountry: item.originCountry,
                    caliber: item.caliber,
                    headstamp: item.headstamp,
                    currentStock: item.currentStock,
                    lastTopUpAt: item.lastTopUpAt,
                    criticalStock: item.criticalStock,
                    tags: item.tags,
                    images: []
                }
                return readyItem
            }
            return null
        })
        if(unflat == null){
            return
        }

        if(data === "gun"){
            await db.delete(schema.gunCollection);
            for(const item of unflat){
                try{
                    await db.insert(schema.gunCollection).values(item as GunType&GunTypeStatus)
                }catch(e){
                    console.log(e)
                }  
            }
        }
        if(data === "ammo"){
            await db.delete(schema.ammoCollection);
            for(const item of unflat){
                await db.insert(schema.ammoCollection).values(item as AmmoType)
            }
        }

        return unflat.length

}