import { expo } from "../db/client"
import * as FileSystem from 'expo-file-system';
import { Platform } from "react-native"
import * as Sharing from 'expo-sharing';

export default async function saveDatabase(){

  try {
    const dbPath = `file://${expo.databasePath}`;
    
    const dbInfo = await FileSystem.getInfoAsync(dbPath);
    
    if (!dbInfo.exists) {
      console.error('Database file not found');
      return;
    }

    if (Platform.OS === 'android') {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      
      if (permissions.granted) {
        const directoryUri = permissions.directoryUri;
        
        const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
          directoryUri,
          'test_db01.db',
          'application/octet-stream'
        );
        
        const dbContent = await FileSystem.readAsStringAsync(dbPath, {
          encoding: FileSystem.EncodingType.Base64,
        });
        
        await FileSystem.writeAsStringAsync(fileUri, dbContent, {
          encoding: FileSystem.EncodingType.Base64,
        });
        
        alert('Database exported successfully!');
      }
    } else {
      await Sharing.shareAsync(dbPath);
    }
  } catch (error) {
    console.error('Error exporting database:', error);
  }
};