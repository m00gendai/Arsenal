import { db, expo } from "../db/client";
import { DB_NAME, ZIP_NAME } from "../configs_DB";
import { Directory, Paths } from 'expo-file-system/next';
import { FileSystem } from 'react-native-file-access';
import { zip } from 'react-native-zip-archive'
import * as schema from "../db/schema";
import { GunType } from "../interfaces";
import * as ExpoFS from "expo-file-system";
import { collectionExportDirectories } from "../configs";

function getSchema(item:string){
  switch(item){
    case "gun":
      return schema.gunCollection
  case "ammo":
    return schema.ammoCollection
  }
}

export default async function saveDatabase(
  setImportSize:(num:number)=>void, 
  setImportProgress:(num:number)=>void,
  resetImportProgress:(num:number)=>void
) {

  const dbPath = `file://${expo.databasePath}`;

  let tempDir: Directory;
  let imagesFolder: Directory
  
  try {
    tempDir = new Directory(Paths.document, 'tmp_rsnl_bckp')
    imagesFolder = new Directory(tempDir, 'images')
    
    if(tempDir.exists){
      tempDir.delete();
    }
    tempDir.create();
    imagesFolder.create()
    
  } catch(e) {
    console.error(`Failed creating temporary directory: ${e}`)
    return;
  }
  
  try { 
    await FileSystem.cp(dbPath, `${tempDir.uri}/${DB_NAME}`)
  } catch(e) {
    console.error(`Failed copying DB to tempDir1: ${e}`)
    return;
  }

  console.log("Handling Collections")
    try{

      for(const item of collectionExportDirectories){

        const collectionImagesFolder = new Directory(imagesFolder, item)
        if(!collectionImagesFolder.exists){
          collectionImagesFolder.create()
        }

        const itemsWithImages = await db.select().from(getSchema(item)) as GunType[]
        
        for (const entry of itemsWithImages) {
          if (entry.images?.length) {
            for (const imagePath of entry.images) {
              const fileName = imagePath.split("/").pop();
              const sourceUri = `${ExpoFS.documentDirectory}${fileName}`;
              const fileInfo = await ExpoFS.getInfoAsync(sourceUri);
              if (fileInfo.exists) {
                await FileSystem.cp(sourceUri, `${collectionImagesFolder.uri}${fileName}`)
              }
            }
          }
        }
      }
      
    } catch(e){
      throw new Error(`Save DB GunCollection: ${e}`)
    }

  try {
    await zip(tempDir.uri, `${Paths.document.uri}/${ZIP_NAME}.zip`)
  } catch(e) {
    console.error(`Failed to ZIP content of temp1 to temp2: ${e}`)
    return;
  }
  
  try {
    const zipPath = `${Paths.document.uri}/${ZIP_NAME}.zip`;
    await FileSystem.cpExternal(zipPath, `${ZIP_NAME}.zip`, "downloads")
    console.log('Database backup successful!')
  } catch(e) {
    console.error(`failed to copy external: ${e}`)
    return;
  }
  
  // Clean up temp directories
  try {
    tempDir.delete();
  } catch(e) {
    console.error(`Failed to clean up: ${e}`)
  }
}