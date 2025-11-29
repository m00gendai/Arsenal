import { AccessoryMount } from "interfaces"
import { create } from "zustand"

interface DatabaseStore {
    accessoryMount: AccessoryMount[]
    setAccessoryMount: (data: AccessoryMount[]) => void
}

export const useDatabaseStore = create<DatabaseStore>((set) => ({
    accessoryMount: [],
    setAccessoryMount: (data: AccessoryMount[]) => set((state) => ({accessoryMount: data}))
}))