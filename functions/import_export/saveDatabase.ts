import { db, expo } from "../../db/client";
import { DB_NAME, ZIP_NAME } from "../../configs/configs_DB";
import { Directory, Paths, File } from 'expo-file-system';
import { FileSystem } from 'react-native-file-access';
import { zip } from 'react-native-zip-archive'
import * as schema from "../../db/schema";
import { ItemType } from "../../lib/interfaces";
import { collectionExportDirectories, imageFileExtensions } from "../../configs/configs";
import * as Sharing from 'expo-sharing';
import { Platform } from "react-native";

export default async function saveDatabase(
  setImportSize:(num:number)=>void, 
  setImportProgress:(num:number)=>void,
  resetImportProgress:(num:number)=>void
) {

  const dbPath = `file://${expo.databasePath}`;

  let tempDir: Directory;
  let imagesFolder: Directory

  function getItemDescription(item: ItemType){
    if("model" in item){
      return `${item.manufacturer} ${item.model}`
    }
    if("designation" in item){
      return `${item.manufacturer} ${item.designation}`
    }
    if("title" in item){
      return `${item.title}`
    }
  }
  
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
  
// saveDatabase.ts — decrypt-on-export block
const plainExportFile = new File(Paths.document, 'Arsenal.export.tmp.db');

try {
  // clean up any leftover from a previous failed export
  if (plainExportFile.exists) {
    plainExportFile.delete();
  }

  // decrypt into a fresh plaintext db, using the already-keyed live connection
  await expo.execAsync(`ATTACH DATABASE '${plainExportFile.uri.replace('file://', '')}' AS plaintext KEY '';`);
  await expo.execAsync(`SELECT sqlcipher_export('plaintext');`);
  await expo.execAsync(`DETACH DATABASE plaintext;`);

  await FileSystem.cp(plainExportFile.uri, `${tempDir.uri}/${DB_NAME}`);
} catch(e) {
  console.error(`Failed exporting decrypted DB copy: ${e}`);
  return;
} finally {
  // don't leave a decrypted copy sitting on disk
  if (plainExportFile.exists) {
    plainExportFile.delete();
  }
}
    try{

      for(const item of collectionExportDirectories){

        const collectionImagesFolder = new Directory(imagesFolder, item)
        if(!collectionImagesFolder.exists){
          collectionImagesFolder.create()
        }

        const itemsWithImages = await db.select().from(schema[item]) as ItemType[]
        
        for (const entry of itemsWithImages) {
          if (entry.images?.length) {
            for (const imagePath of entry.images) {
              if(!imageFileExtensions.some(extension => imagePath.endsWith(extension))){
                throw new Error(`\nImage file extension mismatch:\n${imagePath}\ndoes not have any of ${imageFileExtensions.join(", ")}\nin ${item}: ${getItemDescription(entry)}`)
              }
              const fileName = imagePath.startsWith("file://") ? imagePath.split("/").pop() : imagePath
              if(!fileName){
                continue
              }
              const sourceUri = new File(Paths.document, fileName)
              try {
                const sourceUri = new File(Paths.document, fileName)
if (sourceUri.exists) {
  await FileSystem.cp(sourceUri.uri, `${collectionImagesFolder.uri}${fileName}`)
}
              }catch(e){
                throw new Error(`Processing Images for DB export: ${e}`)
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
  if(Platform.OS === "android"){
    try {
      const zipPath = `${Paths.document.uri}/${ZIP_NAME}.zip`;
      await FileSystem.cpExternal(zipPath, `${ZIP_NAME}.zip`, "downloads")
      console.info('Database backup successful!')
    } catch(e) {
      console.error(`ANDROID failed to copy external: ${e}`)
      return;
    }
  } else if(Platform.OS === "ios"){
    try{
      await Sharing.shareAsync(`${Paths.document.uri}/${ZIP_NAME}.zip`);
    }catch(e){
      console.error(`IOS failed to share external: ${e}`)
      return
    }
  }
  
  // Clean up temp directories
  try {
    tempDir.delete();
  } catch(e) {
    console.error(`Failed to clean up: ${e}`)
  }
}