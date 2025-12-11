import * as FileSystem from "expo-file-system";
import * as DocumentPicker from 'expo-document-picker';
import { unzip } from 'react-native-zip-archive'
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from "../db/schema"
import { db } from "../db/client"
import { DB_NAME } from "../configs_DB";
import { collectionImportTables, legacyDatePickerTriggerFields, nonCollectionTables } from "configs";
import { determineTagSchema } from "./determinators";
import { AmmoType, CollectionType, ItemType, LegacyAmmoType } from "interfaces";

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

function checkDates(item: ItemType){
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

export default async function importDatabase() {
  try {
    const importableZip = await DocumentPicker.getDocumentAsync()
    const importableZipUri = importableZip.assets[0].uri
    await unzip(importableZipUri, FileSystem.cacheDirectory)
    
    const importDatabasePath = `${FileSystem.cacheDirectory}${DB_NAME}`
    const importDatabase = await FileSystem.getInfoAsync(importDatabasePath)
    
    if(importDatabase.exists){
      // Open the database from the cache directory using the full path
      const cacheDB = SQLite.openDatabaseSync(DB_NAME, {

        enableChangeListener: false,
        // Specify the directory if needed, or move the file first
      })
      
      // Better approach: Move the database to the SQLite directory first
      const sqliteDir = `${FileSystem.documentDirectory}SQLite`
      const tempDbName = `temp_import_${Date.now()}.db`
      const tempDbPath = `${sqliteDir}/${tempDbName}`
      
      // Ensure SQLite directory exists
      const sqliteDirInfo = await FileSystem.getInfoAsync(sqliteDir)
      if (!sqliteDirInfo.exists) {
        await FileSystem.makeDirectoryAsync(sqliteDir, { intermediates: true })
      }
      
      // Copy the unzipped database to SQLite directory
      await FileSystem.copyAsync({
        from: importDatabasePath,
        to: tempDbPath
      })
      
      // Now open it
      const cachedDB = SQLite.openDatabaseSync(tempDbName)
      const cacheDBopen = drizzle(cachedDB, { schema })
      
      // Handle Collections
      for (const directory of collectionImportTables) {
        console.log(`outer directory loop - ${directory}`)
        let collection
        try {
  if (directory === "ammoCollection") {
    try {

      collection = cacheDBopen.select().from(schema.ammoCollection).all()
      console.log("Loaded ammo using NEW schema")
    } catch (e) {
      console.warn("New ammo schema failed — falling back to LEGACY schema")
      collection = cacheDBopen.select().from(schema.legacyAmmoCollection).all()
      console.log("Loaded ammo using LEGACY schema")
    }
  } else {
    collection = cacheDBopen.select().from(schema[directory]).all()
  }
} catch (e) {
  const message = String(e?.message ?? e)

  if (message.includes("no such table")) {
    console.warn(`Skipping missing table: ${directory}`)
    continue 
  }

  throw new Error(`itemCollection ${directory}: Cache DB open failed ${message}`)
}
          let tags
          try{
            if(!nonCollectionTables.includes(directory)){
              const tagDirectory = directory as CollectionType
              tags = cacheDBopen.select().from(determineTagSchema(tagDirectory)).all()
            }
          }catch(e){
              throw new Error(`itemCollection ${directory}: Tag DB open failed ${e}`)
            }
          
          try{
            await db.delete(schema[directory])
            if(!nonCollectionTables.includes(directory)){
              const tagDirectory = directory as CollectionType
              await db.delete(determineTagSchema(tagDirectory))
            }
          }catch(e){
            throw new Error(`itemCollection ${directory}: DB Delete failed ${e}`)
          }
          try{
          for(const item of collection){
            console.log(`inner directory loop - ${directory}`)
            let newItem 
            if(nonCollectionTables.includes(directory)){
              console.log("itemize nonCollection Table")
              newItem = item
            } else {
              newItem = checkDates(item)
            }
            
            if(directory === "ammoCollection"){
              // LegacyAmmoType has caliber as string
              console.log(newItem)
              const newItemAmmo = newItem as unknown as LegacyAmmoType
              console.log(newItemAmmo)
              // AmmoType as haliber as string[]
              const newAmmo: AmmoType = {
                ...newItemAmmo, 
                caliber: [newItemAmmo.caliber]
              }
              console.log(newAmmo)
              try{
                await db.insert(schema[directory]).values(newAmmo);
              }catch(e){
                console.error(`Ammo Import failed for ${item.designation}`, e)
              }
              
            } else {
              await db.insert(schema[directory]).values(newItem);
              console.log("successfully imported item")
            }
          }
          if(!nonCollectionTables.includes(directory)){
            for(const item of tags){
              console.log("trying tags")
              
                const tagDirectory = directory as CollectionType
                await db.insert(determineTagSchema(tagDirectory)).values(item);
              }
          }
        }catch(e){
          throw new Error(`itemCollection ${directory}: ${e}`)
        }
      }
      
      // Close and cleanup temp database
      cacheDB.closeSync()
      await FileSystem.deleteAsync(tempDbPath, { idempotent: true })
      
      // Handle images
      const imageFolder = await FileSystem.getInfoAsync(`${FileSystem.cacheDirectory}images`)
      if(imageFolder.exists){
        const presentFolders = await FileSystem.readDirectoryAsync(imageFolder.uri)
        for(const folder of presentFolders){
          const itemFolder = await FileSystem.getInfoAsync(`${FileSystem.cacheDirectory}images/${folder}`)
          if(itemFolder.exists){
            const images = await FileSystem.readDirectoryAsync(`${FileSystem.cacheDirectory}images/${folder}`)
            for(const image of images){
              const imageURI = `${FileSystem.cacheDirectory}images/${folder}/${image}`
              const newPath = `${FileSystem.documentDirectory}${image}`;
              try {
                await FileSystem.moveAsync({
                  from: imageURI,
                  to: newPath,
                });
              }catch(e){
                console.error(`Failed to move image ${image}:`, e)
              }
            }
          }
        }
      }
      
      // Cleanup cache
      await FileSystem.deleteAsync(importDatabasePath, { idempotent: true })
      await FileSystem.deleteAsync(`${FileSystem.cacheDirectory}images`, { idempotent: true })
    }
  } catch (error) {
    console.error('Import failed:', error);
    throw error;
  }
}