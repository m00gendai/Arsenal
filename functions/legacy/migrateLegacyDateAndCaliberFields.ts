import AsyncStorage from "@react-native-async-storage/async-storage"
import { legacyDatePickerTriggerFields } from "configs/configs"
import { PREFERENCES } from "configs/configs_DB"
import { db } from "db/client"
import * as schema from "db/schema"
import { eq } from "drizzle-orm"
import { AmmoType, GunType, ItemType } from "lib/interfaces"
import { usePreferenceStore } from "stores/usePreferenceStore"
import { alarm } from "functions/utils"

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
  const item = itemIn
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
  const item = itemIn
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

function checkLegacyAmmoCaliber(ammo: any){
  if(!ammo.caliber){
    return null
  }
  if(Array.isArray(ammo.caliber)){
    return ammo.caliber
  }
  try{
    const parsed = JSON.parse(ammo.caliber)
    return Array.isArray(parsed) ? parsed : [parsed]
  } catch{
    return [ammo.caliber]
  }
}

export default async function migrateLegacyDateAndCaliberFields(setHasConvertedLegacyAmmoCaliberFieldToStringArray, setHasConvertedLegacyDateFieldsToUnixTimeStamp){
    try{
        
        let preferences:string
        try{
            preferences = await AsyncStorage.getItem(PREFERENCES)
        } catch(e){
            throw new Error(`Migrate Date Fields Preference DB Error: ${e}`)
        }

        let isPreferences
        try{
            isPreferences = preferences === null ? null : JSON.parse(preferences)
        } catch(e){
            throw new Error(`Migrate Date Fields Preference Parse Error: ${e}`)
        }

        try{
            const guns = await db.select().from(schema.gunCollection)
            await Promise.all(guns.map(async gun =>{
                // legacy date fields Gun: "acquisitionDate", "lastCleanedAt", "lastShotAt", "lastTopUpAt"
                let newGun: ItemType
                try{
                    newGun = checkDatesGun(gun) as GunType
                } catch(e){
                    throw new Error(`Migrating Gun Date failed: ${e}`)
                }
            
                await db.update(schema.gunCollection)
                .set(newGun)
                .where(eq(schema.gunCollection.id, gun.id));
            }))
        } catch(e){
            throw new Error(`Updating migrated Gun Dates failed: ${e}`)
        }

        try{
            const ammunition = await db.select().from(schema.legacyAmmoCollection)
            await Promise.all(ammunition.map(async ammo =>{

                let newAmmo: ItemType 
                try{
                    newAmmo = checkDatesAmmo(ammo) as AmmoType
                } catch(e){
                    throw new Error(`Migrating Ammo Date failed: ${e}`)
                }

                const parsedCaliberField = checkLegacyAmmoCaliber(newAmmo)

                const parsedAmmo: ItemType = {
                  ...newAmmo,
                  caliber: parsedCaliberField
                }
                
                await db.update(schema.ammoCollection)
                  .set(parsedAmmo)
                  .where(eq(schema.ammoCollection.id, ammo.id));
            }))
        } catch(e){
            throw new Error(`Updating migrated Ammo Dates and Caliber failed: ${e}`)
        }
        setHasConvertedLegacyAmmoCaliberFieldToStringArray(true)
        setHasConvertedLegacyDateFieldsToUnixTimeStamp(true)

        await AsyncStorage.setItem(PREFERENCES, JSON.stringify(
            {
                ...isPreferences, 
                hasConvertedLegacyAmmoCaliberFieldToStringArray: true,
                hasConvertedLegacyDateFieldsToUnixTimeStamp: true
        }))
    
    } catch(e){
        alarm("Migrating Date and Caliber final error:", e)
    }
}