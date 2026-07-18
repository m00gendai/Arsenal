import { db, expo } from "../../db/client";
import { DB_NAME, ZIP_NAME } from "../../configs/configs_DB";
import { Directory, Paths, File } from 'expo-file-system';
import { FileSystem } from 'react-native-file-access';
import { zip } from 'react-native-zip-archive'
import * as schema from "../../db/schema";
import { CollectionType, ItemType } from "../../lib/interfaces";
import { collectionExportDirectories, imageFileExtensions } from "../../configs/configs";
import * as Sharing from 'expo-sharing';
import { Platform } from "react-native";

function nextFrame() {
    return new Promise(resolve => setTimeout(resolve, 0))
}

export default async function saveDatabase(
    startElapsedTime: () => void,
    setExportSize: React.Dispatch<React.SetStateAction<number>>,
    setExportProgress: React.Dispatch<React.SetStateAction<number>>,
    setExportCollection: React.Dispatch<React.SetStateAction<CollectionType | string>>
) {

    let tempDir: Directory;
    let imagesFolder: Directory
    let lastYield = Date.now()

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
  
    startElapsedTime()

    try {
        tempDir = new Directory(Paths.document, 'tmp_rsnl_bckp')
        imagesFolder = new Directory(tempDir, 'images')
    
    if(tempDir.exists){
        tempDir.delete();
    }
    tempDir.create();
    imagesFolder.create()
    
    } catch(e) {
        throw new Error(`Failed creating temporary directory: ${e}`)
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
        throw new Error(`Failed exporting decrypted DB copy: ${e}`)
    } finally {
        // don't leave a decrypted copy sitting on disk
        if (plainExportFile.exists) {
            plainExportFile.delete();
        }
    }
    
    try{
        for(const item of collectionExportDirectories){
            setExportCollection(item)
            const collectionImagesFolder = new Directory(imagesFolder, item)
            if(!collectionImagesFolder.exists){
                collectionImagesFolder.create()
            }

            const itemsWithImages = await db.select().from(schema[item]) as ItemType[]
            setExportSize(itemsWithImages.length)
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
            setExportProgress(exportProgress => exportProgress + 1)
            if (Date.now() - lastYield > 100) {   // yield at most ~10x/sec
                await nextFrame()
                lastYield = Date.now()
            }
        }

    } catch(e){
        throw new Error(`Save DB GunCollection: ${e}`)
    }

    try {
        await zip(tempDir.uri, `${Paths.document.uri}/${ZIP_NAME}.zip`)
    } catch(e) {
        throw new Error(`Failed to ZIP content of temp1 to temp2: ${e}`)
    }

    if(Platform.OS === "android"){
        try {
            const zipPath = `${Paths.document.uri}/${ZIP_NAME}.zip`;
            await FileSystem.cpExternal(zipPath, `${ZIP_NAME}.zip`, "downloads")
            console.info('Database backup successful!')
        } catch(e) {
            throw new Error(`ANDROID failed to copy external: ${e}`)
        }
    } else if(Platform.OS === "ios"){
        try{
            await Sharing.shareAsync(`${Paths.document.uri}/${ZIP_NAME}.zip`);
        }catch(e){
            throw new Error(`IOS failed to share external: ${e}`)
        }
    }
  
  // Clean up temp directories
    try {
        tempDir.delete();
    } catch(e) {
        throw new Error(`Failed to clean up: ${e}`)
    }
}