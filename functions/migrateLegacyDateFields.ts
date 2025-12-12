import AsyncStorage from "@react-native-async-storage/async-storage"
import { PREFERENCES } from "configs_DB"
import { db } from "db/client"
import * as schema from "db/schema"
import { eq } from "drizzle-orm/sql"
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
    const ammunition = await db.select().from(schema.ammoCollection)

await Promise.all(guns.map(async gun =>{
      // legacy date fields Gun: "acquisitionDate", "lastCleanedAt", "lastShotAt", "lastTopUpAt"
      await db.update(schema.gunCollection)
        .set({ 
          acquisitionDate_unix: gun.acquisitionDate ? parseDate(gun.acquisitionDate) : null,
          lastCleanedAt_unix: gun.lastCleanedAt ? parseDate(gun.lastCleanedAt) : null,
          lastShotAt_unix: gun.lastShotAt ? parseDate(gun.lastShotAt) : null
        })
        .where(eq(schema.gunCollection.id, gun.id));
    }))

      await Promise.all(ammunition.map(async ammo =>{
      // legacy date fields Ammo: "lastTopUpAt"
      // caliber field needs to be converted from string to string[]
      await db.update(schema.ammoCollection)
        .set({ 
          lastTopUpAt_unix: ammo.lastTopUpAt ? parseDate(ammo.lastTopUpAt) : null,
          caliber: ammo.caliber ? [ammo.caliber] : null
        })
        .where(eq(schema.ammoCollection.id, ammo.id));
    }))
  } catch(e){
    alarm("Migrate Date Fields Final Error", e)
  }
  setHasConvertedLegacyDateFieldsToUnixTimeStamp(true)
  await AsyncStorage.setItem(PREFERENCES, JSON.stringify({...isPreferences, hasConvertedLegacyDateFieldsToUnixTimeStamp: true}))
}