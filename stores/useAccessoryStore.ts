import { create } from "zustand"

/* TODO: define proper types */

interface AccessoryStore {
    currentAccessory: any | null 
    setCurrentAccessory: (accessory: any) => void
  }

  export const useAccessoryStore = create<AccessoryStore>((set) => ({
    currentAccessory: null,
    setCurrentAccessory: (accessory: any) => set((state) => ({currentAccessory: accessory}))
  }))