import AsyncStorage from "@react-native-async-storage/async-storage"
import { PREFERENCES } from "configs_DB"
import { db } from "db/client"
import * as schema from "db/schema"
import { eq } from "drizzle-orm/sql"
import { usePreferenceStore } from "stores/usePreferenceStore"
import { alarm } from "utils"

function prepareDateParse(dateString: string){
  if(!isNaN(new Date(dateString).getTime())){
    return Number(dateString)
  }
  const [day, month, year] = dateString.split(".").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getTime()
}

export default async function migrateLegacyDateFields(){

  const { setHasConvertedLegacyDateFieldsToUnixTimeStamp } = usePreferenceStore()

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
          acquisitionDate_unix: gun.acquisitionDate ? prepareDateParse(gun.acquisitionDate) : null,
          lastCleanedAt_unix: gun.lastCleanedAt ? prepareDateParse(gun.lastCleanedAt) : null,
          lastShotAt_unix: gun.lastShotAt ? prepareDateParse(gun.lastShotAt) : null
        })
        .where(eq(schema.gunCollection.id, gun.id));
    }))

      await Promise.all(ammunition.map(async ammo =>{
      // legacy date fields Ammo: "lastTopUpAt"
      // caliber field needs to be converted from string to string[]
      await db.update(schema.ammoCollection)
        .set({ 
          lastTopUpAt_unix: ammo.lastTopUpAt ? prepareDateParse(ammo.lastTopUpAt) : null,
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