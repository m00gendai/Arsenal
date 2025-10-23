import * as FileSystem from "expo-file-system";
import * as DocumentPicker from 'expo-document-picker';
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive'
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from "../db/schema"
import { db } from "../db/client"

// Remove importing expo from your old client to avoid confusion about db path

export default async function importDatabase() {
  try {
    
    const importableZip = await DocumentPicker.getDocumentAsync()
    console.log(importableZip)
    const importableZipUri = importableZip.assets[0].uri


    await unzip(importableZipUri, FileSystem.cacheDirectory)

    const importDatabase = await FileSystem.getInfoAsync(`${FileSystem.cacheDirectory}database.db`)
    if(importDatabase.exists){
        const cacheDB = SQLite.openDatabaseSync(`${FileSystem.cacheDirectory}database.db`)
        const cacheDBopen = drizzle(cacheDB)
        console.log(cacheDBopen.select().from(schema.gunCollection).all())
    }

    const imageFolder = await FileSystem.getInfoAsync(`${FileSystem.cacheDirectory}/images`)
    console.log(imageFolder.exists)
    if(imageFolder.exists){
        const images = await FileSystem.readDirectoryAsync(`${FileSystem.cacheDirectory}images`)
        console.log(images)
    }
   


  } catch (error) {
    console.error('Import failed:', error);
    throw error;
  }
}
