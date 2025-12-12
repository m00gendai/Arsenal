import AsyncStorage from "@react-native-async-storage/async-storage"
import { PREFERENCES } from "configs_DB"
import { db } from "db/client"
import * as schema from "db/schema"
import { eq } from "drizzle-orm/sql"
import { usePreferenceStore } from "stores/usePreferenceStore"
import { alarm } from "utils"

export async function migrateLegacyAmmoCaliber(setHasConvertedLegacyAmmoCaliberFieldToStringArray){
      
    let preferences:string
      try{
        preferences = await AsyncStorage.getItem(PREFERENCES)
      } catch(e){
        alarm("Migrate Ammo Caliber Field Preference DB Error", e)
      }

      let isPreferences
      try{
       isPreferences = preferences === null ? null : JSON.parse(preferences)
      } catch(e){
        alarm("Migrate Ammo Caliber Field Preference Parse Error", e)
      }
      
      try{
        const ammunition = await db.select().from(schema.legacyAmmoCollection)
        await Promise.all(ammunition.map(async ammo =>{
          let parsedCaliberField
          if(ammo.caliber && !Array.isArray(ammo.caliber)){
            parsedCaliberField = [ammo.caliber]
          } else if(ammo.caliber && Array.isArray(ammo.caliber)){
            parsedCaliberField = ammo.caliber
          } else {
            parsedCaliberField = null
          }
          await db.update(schema.ammoCollection).set({caliber: parsedCaliberField}).where(eq(schema.ammoCollection.id, ammo.id))
        }))


        setHasConvertedLegacyAmmoCaliberFieldToStringArray(true)
        await AsyncStorage.setItem(PREFERENCES, JSON.stringify({...isPreferences, hasConvertedLegacyAmmoCaliberFieldToStringArray: true}))
      } catch(e){
        alarm("Migrate Ammo Caliber Field Final Error", e)
      }
    }