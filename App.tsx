import { useEffect, useState } from 'react';
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppContent from "./AppContent";
import { initDatabase, type AppDb } from "./db/client";
import * as SQLite from 'expo-sqlite';
import { alarm } from 'functions/utils';

export default function App() {
  const [dbState, setDbState] = useState<{ db: AppDb; expo: SQLite.SQLiteDatabase } | null>(null);
  const [initError, setInitError] = useState<Error | null>(null);

  useEffect(() => {
    initDatabase()
      .then(setDbState)
      .catch(setInitError);
  }, []);

  if (initError) {
    console.error("DB init failed: initError:", initError);
    alarm("APP DB init failed:", `${initError}`)
    return null
  }

  if (!dbState) {
    return null
  }

  return (
    <SafeAreaProvider>
      <AppContent db={dbState.db} expo={dbState.expo} />
    </SafeAreaProvider>
  );
}