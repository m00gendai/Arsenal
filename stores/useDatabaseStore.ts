import { AccessoryMount, PartMount } from "interfaces"
import { create } from "zustand"

interface DatabaseStore {
    accessoryMount: AccessoryMount[]
    setAccessoryMount: (data: AccessoryMount[]) => void

    partMount: PartMount[]
    setPartMount: (data: PartMount[]) => void
}

export const useDatabaseStore = create<DatabaseStore>((set) => ({
    accessoryMount: [],
    setAccessoryMount: (data: AccessoryMount[]) => set((state) => ({accessoryMount: data})),

    partMount: [],
    setPartMount: (data: PartMount[]) => set((state) => ({partMount: data}))
}))