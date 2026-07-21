import * as FileSystem from 'expo-file-system/legacy';
import * as SecureStore from 'expo-secure-store';
import { db, expo } from 'db/client';

const DB_NAME = "Arsenal.db";
const SQLITE_DIR = `${FileSystem.documentDirectory}SQLite/`;
const DB_PATH = `${SQLITE_DIR}${DB_NAME}`;
const MIGRATION_FLAG = "arsenal_db_encrypted_v1";

export async function runDbDiagnostics() {
  const results: Record<string, any> = {};

  results.migrationFlag = await SecureStore.getItemAsync(MIGRATION_FLAG);

  try {
    const base64 = await FileSystem.readAsStringAsync(DB_PATH, {
      encoding: FileSystem.EncodingType.Base64,
      length: 16,
      position: 0,
    });
    const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    const header = String.fromCharCode(...bytes);
    results.fileHeader = header;
    results.looksEncrypted = header !== "SQLite format 3\u0000";
  } catch (e) {
    results.fileHeaderError = String(e);
  }

  const backupInfo = await FileSystem.getInfoAsync(`${DB_PATH}.plaintext.bak`);
  results.backupExists = backupInfo.exists;
  results.backupSize = backupInfo.exists ? (backupInfo as any).size : null;

  // Row counts via raw SQL against the actual live connection — no schema-object guessing
  try {
    const tables = await expo.getAllAsync<{ name: string }>(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '__drizzle%'"
    );
    const counts: Record<string, number> = {};
    for (const { name } of tables) {
      try {
        const r = await expo.getFirstAsync<{ c: number }>(`SELECT count(*) as c FROM "${name}"`);
        counts[name] = r?.c ?? -1;
      } catch (e) {
        counts[name] = -1; // couldn't count this one, but don't abort the rest
      }
    }
    results.rowCounts = counts;
    results.tableCount = tables.length;
  } catch (e) {
    results.rowCountError = String(e);
  }

  return results;
}