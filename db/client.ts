import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from "db/schema";
import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system/legacy';
import * as Crypto from 'expo-crypto';
import { alarm } from 'functions/utils';

const DB_NAME = "Arsenal.db";
const SQLITE_DIR = `${FileSystem.documentDirectory}SQLite/`;
const DB_PATH = `${SQLITE_DIR}${DB_NAME}`;
const TMP_NAME = "Arsenal.encrypting.db";
const TMP_PATH = `${SQLITE_DIR}${TMP_NAME}`;
const KEY_STORAGE_KEY = "arsenal_db_key";
const MIGRATION_FLAG = "arsenal_db_encrypted_v1";

export type AppDb = ReturnType<typeof drizzle>;

// Module-level mutable bindings — undefined until initDatabase() resolves.
// Safe because App.tsx doesn't mount any db-consuming component until then.
export let db: AppDb;
export let expo: SQLite.SQLiteDatabase;

async function getOrCreateKey(): Promise<string> {
  let key = await SecureStore.getItemAsync(KEY_STORAGE_KEY);
  if (!key) {
    const bytes = await Crypto.getRandomBytesAsync(32);
    key = Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
    await SecureStore.setItemAsync(KEY_STORAGE_KEY, key);
  }
  return key;
}

async function isMigrated(): Promise<boolean> {
  return (await SecureStore.getItemAsync(MIGRATION_FLAG)) === "true";
}

async function migrateToEncrypted(key: string) {
  const tmpInfo = await FileSystem.getInfoAsync(TMP_PATH);
  if (tmpInfo.exists) await FileSystem.deleteAsync(TMP_PATH, { idempotent: true });

  const plainDb = SQLite.openDatabaseSync(DB_NAME);
  await plainDb.execAsync("PRAGMA wal_checkpoint(FULL);");
  await plainDb.execAsync(`ATTACH DATABASE '${TMP_PATH}' AS encrypted KEY '${key}';`);
  await plainDb.execAsync("SELECT sqlcipher_export('encrypted');");
  await plainDb.execAsync("DETACH DATABASE encrypted;");
  await plainDb.closeAsync();

  const encDb = SQLite.openDatabaseSync(TMP_NAME);
  await encDb.execAsync(`PRAGMA key = '${key}';`);
  const check = await encDb.getFirstAsync<{ count: number }>(
    "SELECT count(*) as count FROM sqlite_master WHERE type='table';"
  );
  await encDb.closeAsync();
  if (!check || check.count === 0) throw new Error("Verification failed, aborting");

  const backupPath = `${DB_PATH}.plaintext.bak`;
  await FileSystem.moveAsync({ from: DB_PATH, to: backupPath });
  await FileSystem.moveAsync({ from: TMP_PATH, to: DB_PATH });
  await SecureStore.setItemAsync(MIGRATION_FLAG, "true");
}

export async function initDatabase(): Promise<{ db: AppDb; expo: SQLite.SQLiteDatabase }> {
  const key = await getOrCreateKey();

  if (!(await isMigrated())) {
    const existingDbInfo = await FileSystem.getInfoAsync(DB_PATH);

    if (!existingDbInfo.exists) {
      // Fresh install — no plaintext data to migrate. Just mark as
      // "migrated" so the fresh db gets created encrypted from the start.
      await SecureStore.setItemAsync(MIGRATION_FLAG, "true");
    } else {
      try {
        await migrateToEncrypted(key);
      } catch (e) {
        console.error("Encryption migration failed, retrying next launch", e);
      }
    }
  }

  const _expo = SQLite.openDatabaseSync(DB_NAME, { enableChangeListener: true });

  if (await isMigrated()) {
    await _expo.execAsync(`PRAGMA key = '${key}';`);

    try {
      // Querying sqlite_master forces SQLCipher to actually read and decrypt a page.
      // If the key is wrong, this call throws an explicit native error immediately,
      // rather than surfacing as a confusing failure on some later, arbitrary query.
      await _expo.getFirstAsync("SELECT count(*) FROM sqlite_master;");
    } catch (canaryError) {
      console.error("FATAL - Decryption failed, wrong key.", canaryError);
      alarm(
        "Database Decryption Error",
        "The stored key does not match this database. If your device's secure storage was reset or compromised, database access may be unrecoverable — please delete app data and restore from a backup."
      );
      throw new Error("Database decryption failed: invalid key.");
    }
  }

  const _db = drizzle(_expo, { schema });

  db = _db;
  expo = _expo;

  return { db: _db, expo: _expo };
}