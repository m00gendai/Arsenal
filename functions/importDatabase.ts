import * as FileSystem from "expo-file-system";
import * as DocumentPicker from 'expo-document-picker';
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive'
import * as SQLite from 'expo-sqlite';
import { drizzle, ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import * as schema from "../db/schema"
import { db } from "../db/client"
import { DB_NAME, ZIP_NAME } from "../configs_DB";
import { GunType } from "../interfaces";
import { eq, lt, gte, ne, and, or, like, asc, desc, exists, isNull, sql } from 'drizzle-orm';

export default async function importDatabase() {
  try {
    
    const importableZip = await DocumentPicker.getDocumentAsync()
    const importableZipUri = importableZip.assets[0].uri

    await unzip(importableZipUri, FileSystem.cacheDirectory)

    const importDatabase = await FileSystem.getInfoAsync(`${FileSystem.cacheDirectory}${DB_NAME}`)
    if(importDatabase.exists){
        const cacheDB = SQLite.openDatabaseSync(`${FileSystem.cacheDirectory}${DB_NAME}`)
        const cacheDBopen = drizzle(cacheDB)

        // Handle Gun Collection
        try{
          const collection = cacheDBopen.select().from(schema.gunCollection).all()
          try{
            await db.delete(schema.gunCollection);
          }catch(e){
            throw new Error("gunCollection: DB Delete failed", e)
          }

          for(const item of collection){
            await db.insert(schema.gunCollection).values(item);
          }
        }catch(e){
          throw new Error("gunCollection: ", e)
        }

        // Handle Ammo Collection
        try{
          const collection = cacheDBopen.select().from(schema.ammoCollection).all()
        
          try{
            await db.delete(schema.ammoCollection);
          }catch(e){
            throw new Error("ammoCollection: DB Delete failed", e)
          }

          for(const item of collection){
            await db.insert(schema.ammoCollection).values(item);
          }
        }catch(e){
          throw new Error("ammoCollection: ", e)
        }

        const imageFolder = await FileSystem.getInfoAsync(`${FileSystem.cacheDirectory}/images`)
        if(imageFolder.exists){
          const presentFolders = await FileSystem.readDirectoryAsync(imageFolder.uri)
          for(const folder of presentFolders){
            const itemFolder = await FileSystem.getInfoAsync(`${FileSystem.cacheDirectory}/images/${folder}`)
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
                  throw e
                }
              }
            }
          }
        }
      }
  } catch (error) {
    console.error('Import failed:', error);
    throw error;
  }
}
