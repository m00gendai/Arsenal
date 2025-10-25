import { expo } from "../db/client";
import * as FileSystem from "expo-file-system";
import JSZip from "jszip";
import { db } from "../db/client";
import * as schema from "../db/schema";
import { GunType } from "../interfaces";
import { count } from "drizzle-orm";

export default async function saveDatabase(
  importProgress:number, 
  setImportSize:(num:number)=>void, 
  setImportProgress:(num:number)=>void,
  resetImportProgress:(num:number)=>void
) {
  const ZIP_NAME = "ArsenalDB";
  const DB_NAME = "Arsenal.db"

  try {
    // Ask user to select a folder
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (!permissions.granted || !permissions.directoryUri) {
      console.log("User did not grant folder permissions.");
      return;
    }

    // Create a file inside that folder
    const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
      permissions.directoryUri,
      ZIP_NAME,
      "application/zip"
    );

    // 1. Create ZIP instance
    const zip = new JSZip();

    // 2. Add database file to ZIP
    const dbPath = `file://${expo.databasePath}`;
    const dbContent = await FileSystem.readAsStringAsync(dbPath, {
      encoding: FileSystem.EncodingType.Base64,
    });
    zip.file(DB_NAME, dbContent, { base64: true });

    // 3. Add images folder and content
    const imagesFolder = zip.folder("images");
    const gunsWithImages = await db.select().from(schema.gunCollection) as GunType[]
    const collectionSize = await db.select({ count: count() }).from(schema.gunCollection)
    setImportSize(collectionSize[0].count)
    resetImportProgress(0)
    for (const gun of gunsWithImages) {
      if (gun.images?.length) {
        for (const imagePath of gun.images) {
          const fileName = imagePath.split("/").pop();
          const sourceUri = `${FileSystem.documentDirectory}${fileName}`;
          const fileInfo = await FileSystem.getInfoAsync(sourceUri);
          if (fileInfo.exists) {
            const imageContent = await FileSystem.readAsStringAsync(sourceUri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            imagesFolder.file(fileName!, imageContent, { base64: true });
          }
        }
      }
      setImportProgress(importProgress+1)
    }

    // 4. Generate ZIP as base64
    const zipContent = await zip.generateAsync({
      type: "base64",
      compression: "DEFLATE",
      compressionOptions: { level: 9 },
    });

    // 5. Write ZIP to selected folder (via SAF)
    await FileSystem.writeAsStringAsync(fileUri, zipContent, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log("Export completed successfully!");
    console.log("File saved at:", fileUri);

    return fileUri;
  } catch (error) {
    console.error("Export failed:", error);
    throw error;
  }
}

/*} // 7. Share the ZIP file if (await Sharing.isAvailableAsync()) { await Sharing.shareAsync(zipPath, { mimeType: 'application/zip', dialogTitle: 'Export Gun Collection' }); } */
