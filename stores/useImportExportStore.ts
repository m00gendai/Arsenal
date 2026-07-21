import { create } from "zustand"
import { AmmoType, CollectionType, DBOperations, GunType, ItemType } from "../lib/interfaces"
import { emptyAmmoObject } from "../lib/DataTemplates/ammoDataTemplate"
import { emptyGunObject } from "../lib/DataTemplates/gunDataTemplate"

export interface ImportExportStore {
    CSVHeader: string[]
    setCSVHeader: (data:string[]) => void
    CSVBody: string[][]
    setCSVBody: (data:string[][]) => void
    mapCSVAmmo: AmmoType
    setMapCSVAmmo: (data: AmmoType) => void
    mapCSVGun: GunType
    setMapCSVGun: (data: GunType) => void
    mapCSVItem: ItemType
    setMapCSVItem: (data: ItemType) => void
  }

  export const useImportExportStore = create<ImportExportStore>((set) => ({
    CSVHeader: [],
    setCSVHeader: (data: string[]) => set((state) => ({ CSVHeader: data })),
    CSVBody: [[]],
    setCSVBody: (data: string[][]) => set((state) => ({ CSVBody: data })),
    mapCSVAmmo: emptyAmmoObject,
    setMapCSVAmmo: (data: AmmoType | null) => set((state => ({mapCSVAmmo: data}))),
    mapCSVGun: emptyGunObject,
    setMapCSVGun: (data: GunType | null) => set((state => ({mapCSVGun: data}))),
    mapCSVItem: emptyGunObject,
    setMapCSVItem: (data: ItemType | null) => set((state => ({mapCSVItem: data}))),
  }))