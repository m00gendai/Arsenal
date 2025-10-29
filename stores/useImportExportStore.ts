import { create } from "zustand"
import { AmmoType, DBOperations, GunType } from "../interfaces"
import { emptyAmmoObject } from "../lib/ammoDataTemplate"
import { emptyGunObject } from "../lib/gunDataTemplate"

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
    dbCollectionType: "gun" | "ammo"
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
    dbCollectionType: "gun",
    setDbCollectionType: (data: "gun" | "ammo") => set((state) => ({dbCollectionType: data}))
  }))