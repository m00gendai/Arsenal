import AsyncStorage from "@react-native-async-storage/async-storage"
import { A_KEY_DATABASE, AMMO_DATABASE, KEY_DATABASE, PREFERENCES } from "configs/configs_DB"
import { db } from "db/client"
import * as schema from "db/schema"
import { AmmoType } from "lib/interfaces"
import * as SecureStore from "expo-secure-store"
import { alarm } from "functions/utils"
import { legacyDatePickerTriggerFields } from "configs/configs"

// This checks for legacy ammo data and migrates it to SQLite DB. Afterwards it emtpies the keys array and removes the legacy ammo data from SecureStore
// This should only trigger once from an update <2.0.0 to a higher version using SQLite. After this ran, the key array should be empty and thus no
// ammo data should be checked

async function getKeys(data: "guns" | "ammo"){
    const keys:string = await AsyncStorage.getItem(data === "guns" ? KEY_DATABASE : A_KEY_DATABASE)
    if(keys == null){
        return []
    }
    return JSON.parse(keys)
}

function parseDate(csvDate:string){
    if(!isNaN(new Date(csvDate).getTime())){
        console.info("parseable ecma extended date detected")
        return new Date(csvDate).getTime()
    }

    const splitDate = csvDate.split(".")

    const csvDay = Number(splitDate[0])
    const csvMonth = Number(splitDate[1])
    const csvYear = Number(splitDate[2])

    const unixDate = new Date(csvYear, csvMonth-1, csvDay)
    const unixTime = unixDate.getTime()
    return unixTime
}

export default async function checkLegacyAmmoData(setHasCheckedForLegacyAmmoData){

    let keys:string[]
    try{
      keys = await getKeys("ammo")
    } catch(e){
      alarm("Legacy Ammo Key Error", e)
    }
    console.info("Checked Ammo Keys:")
    console.info(keys)
    if(keys.length === 0){
      setHasCheckedForLegacyAmmoData(true)
    let preferences = await AsyncStorage.getItem(PREFERENCES)
    let isPreferences = preferences === null ? null : JSON.parse(preferences)
    if(isPreferences){
      await AsyncStorage.setItem(PREFERENCES, JSON.stringify({...isPreferences, hasCheckedForLegacyAmmoData: true}))
    }
      return
    }
    let ammunition:AmmoType[]
    try{
      ammunition = await Promise.all(keys.map(async key =>{
        const item:string = await SecureStore.getItemAsync(`${AMMO_DATABASE}_${key}`)
        return JSON.parse(item)
      }))
    } catch(e){
      alarm("Legacy Ammo DB Error", e)
    }
    console.info("Checked Ammo:")
    console.info(ammunition)
    if(ammunition.length !== 0){
      await Promise.all(ammunition.map(async ammo =>{
        if(ammo !== null){
          const newCreatedAt = ammo.createdAt ? (isNaN(ammo.createdAt) ? new Date(ammo.createdAt).getTime() : ammo.createdAt) : Date.now() 
          const newLastModifiedAt = ammo.lastModifiedAt ? (isNaN(ammo.lastModifiedAt) ? new Date(ammo.lastModifiedAt).getTime() : ammo.lastModifiedAt) : Date.now() 
          const newCaliber = [ammo.caliber]
          const parsedAmmo = {
            ...ammo,
            createdAt: newCreatedAt,
            lastModifiedAt: newLastModifiedAt,
            caliber: newCaliber
        }
        legacyDatePickerTriggerFields.forEach(dateField =>{
            if(dateField in parsedAmmo){
                parsedAmmo[`${dateField}_unix`] = parsedAmmo[dateField] ? (isNaN(parsedAmmo[dateField]) ? parseDate(parsedAmmo[dateField]) : parsedAmmo[dateField]) : null
            }
        })
          try{
            await db.insert(schema.ammoCollection).values(parsedAmmo)
          }catch(e){
            throw new Error(`Check Legacy Ammo Data: Insert ammo ${ammo.designation} into DB: ${e}`)
          }
          if(ammo.tags !== undefined && ammo.tags !== null && ammo.tags.length !== 0){
              await Promise.all(ammo.tags.map(async tag =>{
                try{
                  await db.insert(schema.ammoTags).values({label: tag}).onConflictDoNothing()
                }catch(e){
                  throw new Error(`Check Legacy Ammo Data: Insert tag ${tag} into DB: ${e}`)
                }

              }))
            }
          }
        }))
      await Promise.all(keys.map(async key =>{
        await SecureStore.deleteItemAsync(`${AMMO_DATABASE}_${key}`)
      }))
      await AsyncStorage.removeItem(A_KEY_DATABASE)
    }
    setHasCheckedForLegacyAmmoData(true)
    let preferences = await AsyncStorage.getItem(PREFERENCES)
    let isPreferences = preferences === null ? null : JSON.parse(preferences)
    if(isPreferences){
      await AsyncStorage.setItem(PREFERENCES, JSON.stringify({...isPreferences, hasCheckedForLegacyAmmoData: true}))
    }
    
  }