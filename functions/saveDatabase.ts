import { expo } from "../db/client";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import JSZip from 'jszip';
import { db } from '../db/client';
import * as schema from '../db/schema';

export default async function saveDatabase() {
  try {
    const zip = new JSZip();

    // 1. Add database file to zip
    const dbPath = `file://${expo.databasePath}`;
    const dbContent = await FileSystem.readAsStringAsync(dbPath, {
      encoding: FileSystem.EncodingType.Base64
    });
    zip.file('database.db', dbContent, { base64: true });

    // 2. Create images folder in zip
    const imagesFolder = zip.folder('images');

    // 3. Get all guns with images from your database
    const gunsWithImages = await db.select().from(schema.gunCollection);

    // 4. Add all images to zip
    for (const gun of gunsWithImages) {
      if (gun.images && gun.images.length > 0) {
        for (const imagePath of gun.images) {
          const fileName = imagePath.split('/').pop();
          const sourceUri = `${FileSystem.documentDirectory}${fileName}`;

          // Check if source file exists before adding
          const fileInfo = await FileSystem.getInfoAsync(sourceUri);
          if (fileInfo.exists) {
            const imageContent = await FileSystem.readAsStringAsync(sourceUri, {
              encoding: FileSystem.EncodingType.Base64
            });
            imagesFolder.file(fileName, imageContent, { base64: true });
          }
        }
      }
    }

    // 5. Generate ZIP
    const zipContent = await zip.generateAsync({ 
      type: 'base64',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 }
    });

    // 6. Save to file
    const zipPath = `${FileSystem.cacheDirectory}gun-collection-backup.zip`;
    await FileSystem.writeAsStringAsync(zipPath, zipContent, {
      encoding: FileSystem.EncodingType.Base64
    });

    // 7. Share the ZIP file
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(zipPath, {
        mimeType: 'application/zip',
        dialogTitle: 'Export Gun Collection'
      });
    }

    console.log('Export completed successfully!');
    return zipPath;

  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
}