import { useEffect, useState } from 'react';
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppContent from "./AppContent";
import { initDatabase, type AppDb } from "./db/client";
import * as SQLite from 'expo-sqlite';

export default function App() {
  const [dbState, setDbState] = useState<{ db: AppDb; expo: SQLite.SQLiteDatabase } | null>(null);
  const [initError, setInitError] = useState<Error | null>(null);

  useEffect(() => {
    initDatabase()
      .then(setDbState)
      .catch(setInitError);
  }, []);

  if (initError) {
    console.error("DB init failed:", initError);
    return null; // keep splash up, or render a minimal error view
  }

  if (!dbState) {
    return null; // native splash screen stays visible — SplashScreen.preventAutoHideAsync() is already called in AppContent's module scope, that's fine
  }

  return (
    <SafeAreaProvider>
      <AppContent db={dbState.db} expo={dbState.expo} />
    </SafeAreaProvider>
  );
}