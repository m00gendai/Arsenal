import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';

export const expo = SQLite.openDatabaseSync("test_db01.db", {enableChangeListener: true})
export const db = drizzle(expo)