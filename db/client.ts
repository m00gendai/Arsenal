import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from "db/schema"

export const expo = SQLite.openDatabaseSync("Arsenal.db", {enableChangeListener: true})
export const db = drizzle(expo, { schema })