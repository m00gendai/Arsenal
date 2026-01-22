import { create } from "zustand"
import { AmmoType, CollectionType, DBOperations, GunType, ItemType } from "../lib/interfaces"
import { emptyAmmoObject } from "../lib/DataTemplates/ammoDataTemplate"
import { emptyGunObject } from "../lib/DataTemplates/gunDataTemplate"

export interface ImportExportStore {
    CSVHeader: string[]
    setCSVHeader: (data:string[]) => void
    CSVBody: string[][]
    setCSVBody: (data:string[][]) => void
    importProgress: number
    setImportProgress: (num: number) => void
    resetImportProgress: (num: number) => void
    importSize: number
    setImportSize: (num: number) => void
    resetImportSize: (num: number) => void
    mapCSVAmmo: AmmoType
    setMapCSVAmmo: (data: AmmoType) => void
    mapCSVGun: GunType
    setMapCSVGun: (data: GunType) => void
    mapCSVItem: ItemType
    setMapCSVItem: (data: ItemType) => void
    dbCollectionType: CollectionType
    setDbCollectionType: (data: string) => void
  }

  export const useImportExportStore = create<ImportExportStore>((set) => ({
    CSVHeader: [],
    setCSVHeader: (data: string[]) => set((state) => ({ CSVHeader: data })),
    CSVBody: [[]],
    setCSVBody: (data: string[][]) => set((state) => ({ CSVBody: data })),
    importProgress: 0,
    setImportProgress: (num: number) => set((state) => ({importProgress: state.importProgress + num})),
    resetImportProgress: (num: number) => set((state) => ({importProgress: num})),
    importSize: 0,
    setImportSize: (num: number) => set((state) => ({importSize: num})),
    resetImportSize: (num: number) => set((state) => ({importSize: num})),
    mapCSVAmmo: emptyAmmoObject,
    setMapCSVAmmo: (data: AmmoType | null) => set((state => ({mapCSVAmmo: data}))),
    mapCSVGun: emptyGunObject,
    setMapCSVGun: (data: GunType | null) => set((state => ({mapCSVGun: data}))),
    mapCSVItem: emptyGunObject,
    setMapCSVItem: (data: ItemType | null) => set((state => ({mapCSVItem: data}))),
    dbCollectionType: "gunCollection",
    setDbCollectionType: (data: CollectionType) => set((state) => ({dbCollectionType: data}))
  }))