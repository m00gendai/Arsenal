import AsyncStorage from "@react-native-async-storage/async-storage"
import { legacyDatePickerTriggerFields } from "configs"
import { PREFERENCES } from "configs_DB"
import { db } from "db/client"
import * as schema from "db/schema"
import { eq } from "drizzle-orm"
import { AmmoType, GunType, ItemType } from "interfaces"
import { usePreferenceStore } from "stores/usePreferenceStore"
import { alarm } from "utils"


function parseDate(inDate: string | number) {
 
  if (typeof inDate === "number") {
    return inDate
  }

  if (!isNaN(new Date(inDate).getTime())) {
    console.info("parseable ecma extended date detected")
    return new Date(inDate).getTime()
  }
if(!inDate){
  return null
}
  const splitDate = (inDate as string).split(".")
  const day = Number(splitDate[0])
  const month = Number(splitDate[1])
  const year = Number(splitDate[2])

  return new Date(year, month - 1, day).getTime()
}

function checkDatesGun(itemIn: any){
  const item = itemIn as GunType
  const parsedItem = {...item}
  legacyDatePickerTriggerFields.forEach(dateField => {
    if(dateField in parsedItem){
      const value = parsedItem[dateField]
      // Check if value exists and needs parsing
      if(value !== null && value !== undefined){
        // If it's already a number, use it
        if(typeof value === 'number'){
          parsedItem[`${dateField}_unix`] = value
        } else {
          // Otherwise, parse the date string
          parsedItem[`${dateField}_unix`] = parseDate(value)
        }
      } else {
        parsedItem[`${dateField}_unix`] = null
      }
    }
  })
  return parsedItem
}

function checkDatesAmmo(itemIn: any){
  const item = itemIn as AmmoType
  const parsedItem = {...item}
  legacyDatePickerTriggerFields.forEach(dateField => {
    if(dateField in parsedItem){
      const value = parsedItem[dateField]
      // Check if value exists and needs parsing
      if(value !== null && value !== undefined){
        // If it's already a number, use it
        if(typeof value === 'number'){
          parsedItem[`${dateField}_unix`] = value
        } else {
          // Otherwise, parse the date string
          parsedItem[`${dateField}_unix`] = parseDate(value)
        }
      } else {
        parsedItem[`${dateField}_unix`] = null
      }
    }
  })
  return parsedItem
}

export default async function migrateLegacyDateFields(setHasConvertedLegacyDateFieldsToUnixTimeStamp){

    let preferences:string
      try{
        preferences = await AsyncStorage.getItem(PREFERENCES)
      } catch(e){
        alarm("Migrate Date Fields Preference DB Error", e)
      }

      let isPreferences
      try{
       isPreferences = preferences === null ? null : JSON.parse(preferences)
      } catch(e){
        alarm("Migrate Date Fields Preference Parse Error", e)
      }
      
      try{
    
    const guns = await db.select().from(schema.gunCollection)
    const ammunition = await db.select().from(schema.legacyAmmoCollection)

await Promise.all(guns.map(async gun =>{
      // legacy date fields Gun: "acquisitionDate", "lastCleanedAt", "lastShotAt", "lastTopUpAt"
      const newGun: ItemType = checkDatesGun(gun)

      await db.update(schema.gunCollection)
        .set({ 
          acquisitionDate_unix: gun.acquisitionDate ? newGun.acquisitionDate_unix : null,
          lastCleanedAt_unix: gun.lastCleanedAt ? newGun.lastCleanedAt_unix : null,
          lastShotAt_unix: gun.lastShotAt ? newGun.lastShotAt_unix : null
        })
        .where(eq(schema.gunCollection.id, gun.id));
    }))

    await db.delete(schema.legacyAmmoCollection)
      await Promise.all(ammunition.map(async ammo =>{
      // legacy date fields Ammo: "lastTopUpAt"
      const newAmmo = checkDatesAmmo(ammo)

      await db.insert(schema.ammoCollection).values(newAmmo)
        
    }))
  } catch(e){
    alarm("Migrate Date Fields Final Error", e)
  }
  setHasConvertedLegacyDateFieldsToUnixTimeStamp(true)
  await AsyncStorage.setItem(PREFERENCES, JSON.stringify({...isPreferences, hasConvertedLegacyDateFieldsToUnixTimeStamp: true}))
}