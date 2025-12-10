import AsyncStorage from "@react-native-async-storage/async-storage"
import { datePickerTriggerFields } from "configs"
import { A_KEY_DATABASE, GUN_DATABASE, KEY_DATABASE, PREFERENCES } from "configs_DB"
import { db } from "db/client"
import * as schema from "db/schema"
import * as SecureStore from "expo-secure-store"
import { GunType } from "interfaces"
import { checkBoxes } from "lib/DataTemplates/gunDataTemplate"
import { usePreferenceStore } from "stores/usePreferenceStore"
import { alarm } from "utils"

// This checks for legacy gun data and migrates it to SQLite DB. Afterwards it emtpies the keys array and removes the legacy gun data from SecureStore
// This should only trigger once from an update <2.0.0 to a higher version using SQLite. After this ran, the key array should be empty and thus no
// gun data should be checked

async function getKeys(data: "guns" | "ammo"){
    const keys:string = await AsyncStorage.getItem(data === "guns" ? KEY_DATABASE : A_KEY_DATABASE)
    if(keys == null){
        return []
    }
    return JSON.parse(keys)
}

function parseDate(csvDate:string){
    console.log(csvDate)
    if(!isNaN(new Date(csvDate).getTime())){
        console.log("parseable ecma extended date detected")
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

export default async function checkLegacyGunData(setHasCheckedForLegacyGunData){

    let keys:string[]
    try{
      keys = await getKeys("guns")
    } catch(e){
      alarm("Legacy Gun Key Error", e)
    }
    console.log("Checked Gun Keys:")
    console.log(keys)
    if(keys.length === 0){
      setHasCheckedForLegacyGunData(true)
    let preferences = await AsyncStorage.getItem(PREFERENCES)
    let isPreferences = preferences === null ? null : JSON.parse(preferences)
    if(isPreferences){
      await AsyncStorage.setItem(PREFERENCES, JSON.stringify({...isPreferences, hasCheckedForLegacyGunData: true}))
    }
      return
    }
    let guns:GunType[]
    try{
      guns = await Promise.all(keys.map(async key =>{
        const item:string = await SecureStore.getItemAsync(`${GUN_DATABASE}_${key}`)
        return JSON.parse(item)
      }))
    } catch(e){
      alarm("Legacy Gun DB Error", e)
    }
    console.log("Checked Guns:")
    console.log(guns)
    if(guns.length !== 0){
      await Promise.all(guns.map(async gun =>{
        if(gun !== null){
          await Promise.all(checkBoxes.map(checkbox =>{
            gun[checkbox.name] = gun !== undefined && gun !== null && gun.status !== undefined && gun.status !== null ? gun.status[checkbox.name] : false
          }))
          gun.createdAt = gun.createdAt ? (isNaN(gun.createdAt) ? new Date(gun.createdAt).getTime() : gun.createdAt) : Date.now() 
          gun.lastModifiedAt = gun.lastModifiedAt ? (isNaN(gun.lastModifiedAt) ? new Date(gun.lastModifiedAt).getTime() : gun.lastModifiedAt) : Date.now() 
          datePickerTriggerFields.forEach(dateField =>{
            if(dateField in gun){
                gun[dateField] = gun[dateField] ? (isNaN(gun[dateField]) ? parseDate(gun[dateField]) : gun[dateField]) : null
            }
          })
          try{
            await db.insert(schema.gunCollection).values(gun)
          }catch(e){
            throw new Error(`Check Legacy Gun Data: Insert gun ${gun.model} into DB: ${e}`)
          }
          if(gun.tags !== undefined && gun.tags !== null && gun.tags.length !== 0){
            await Promise.all(gun.tags.map(async tag =>{
              try{
                await db.insert(schema.gunTags).values({label: tag}).onConflictDoNothing()
              }catch(e){
                throw new Error(`Check Legacy Gun Data: Insert tag ${tag} into DB: ${e}`)
              }
              
            }))
          }
        }
      }))
      await Promise.all(keys.map(async key =>{
        await SecureStore.deleteItemAsync(`${GUN_DATABASE}_${key}`)
      }))
      await AsyncStorage.removeItem(KEY_DATABASE)
    }
    setHasCheckedForLegacyGunData(true)
    let preferences = await AsyncStorage.getItem(PREFERENCES)
    let isPreferences = preferences === null ? null : JSON.parse(preferences)
    if(isPreferences){
      await AsyncStorage.setItem(PREFERENCES, JSON.stringify({...isPreferences, hasCheckedForLegacyGunData: true}))
    }
  }