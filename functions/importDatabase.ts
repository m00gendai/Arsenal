import * as FileSystem from "expo-file-system";
import * as DocumentPicker from 'expo-document-picker';
import { unzip } from 'react-native-zip-archive'
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from "../db/schema"
import { db } from "../db/client"
import { DB_NAME } from "../configs_DB";
import { collectionExportDirectories, collectionImportTables, nonCollectionTables } from "configs";
import { determineTagSchema } from "./determinators";
import { CollectionType } from "interfaces";

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
      collectionImportTables.forEach(async directory =>{
        try{
          const collection = cacheDBopen.select().from(schema[directory]).all()
          let tags
          if(!nonCollectionTables.includes(directory)){
            const tagDirectory = directory as CollectionType
            tags = cacheDBopen.select().from(determineTagSchema(tagDirectory)).all()
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
          
          for(const item of collection){
            await db.insert(schema[directory]).values(item);
          }
          for(const item of tags){
            if(!nonCollectionTables.includes(directory)){
              const tagDirectory = directory as CollectionType
              await db.insert(determineTagSchema(tagDirectory)).values(item);
            }
          }
        }catch(e){
          throw new Error(`itemCollection ${directory}: ${e}`)
        }
      })
      
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