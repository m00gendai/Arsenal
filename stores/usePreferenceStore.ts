import { create } from "zustand"
import { colorThemes } from "../lib/colorThemes"
import { Color, Languages, SortingTypesGun, SortingTypesAmmo} from "../interfaces"

interface GeneralSettings{
  displayImagesInListViewGun: boolean
  displayImagesInListViewAmmo: boolean
  displayImagesInListViewAccessory_Silencer: boolean
  resizeImages: boolean
  loginGuard: boolean
  emptyFields: boolean
  caliberDisplayName: boolean
}

interface PreferenceStore {
    language: string
    switchLanguage: (lang: string) => void
    theme: {name: string, colors: Color},
    switchTheme: (name: string) => void,
    generalSettings: GeneralSettings
    setGeneralSettings: (settings: GeneralSettings) => void
    caliberDisplayNameList: {name: string, displayName: string}[]
    setCaliberDisplayNameList: (calibers: {name: string, displayName?: string}[]) => void

    displayAsGrid: boolean
    setDisplayAsGrid: (status: boolean) => void
    displayAmmoAsGrid: boolean
    setDisplayAmmoAsGrid: (status: boolean) => void
    
    toggleDisplayAsGrid: () => void
    toggleDisplayAmmoAsGrid: () => void

    sortGunIcon: string
    setSortGunIcon: (data: string) => void
    sortAmmoIcon: string
    setSortAmmoIcon: (data: string) => void

    sortBy: SortingTypesGun
    setSortBy: (type: SortingTypesGun) => void
    sortAmmoBy: SortingTypesAmmo
    setSortAmmoBy: (type: SortingTypesAmmo) => void

    sortGunsAscending: boolean
    toggleSortGunsAscending: () => void
    setSortGunsAscending: (status: boolean) => void
    sortAmmoAscending: boolean
    toggleSortAmmoAscending: () => void
    setSortAmmoAscending: (status: boolean) => void

    gunFilterOn: boolean
    toggleGunFilterOn: () => void
    ammoFilterOn: boolean
    toggleAmmoFilterOn: () => void
  }

  export const usePreferenceStore = create<PreferenceStore>((set) => ({
    language: "de",
    switchLanguage: (lang: Languages) => set((state) => ({ language: lang })),
    theme: { name: "default", colors: colorThemes.default },
    switchTheme: (name: string) => set((state) => ({theme: {name: name, colors: colorThemes[name]}})),
    generalSettings: {
      displayImagesInListViewGun: true,
      displayImagesInListViewAmmo: true,
      displayImagesInListViewAccessory_Silencer: true,
      resizeImages: true,
      loginGuard: false,
      emptyFields: false,
      caliberDisplayName: false,
    },
    setGeneralSettings: (settings: GeneralSettings) => set((state) => ({generalSettings: settings})),
    caliberDisplayNameList: [],
    setCaliberDisplayNameList: (calibers: {name: string, displayName: string}[])  => set((state) =>({caliberDisplayNameList: calibers})),
        
    displayAsGrid: true,
    setDisplayAsGrid: (status: boolean) => set((state) => ({displayAsGrid: status})),
    displayAmmoAsGrid: true,
    setDisplayAmmoAsGrid: (status: boolean) => set((state) => ({displayAmmoAsGrid: status})),
        
    toggleDisplayAsGrid: () => set((state) => ({displayAsGrid: !state.displayAsGrid})),
    toggleDisplayAmmoAsGrid: () => set((state) => ({displayAmmoAsGrid: !state.displayAmmoAsGrid})),
    
    sortGunIcon: "alphabetical-variant",
    setSortGunIcon: (data: string) => set((state) => ({sortGunIcon: data})),
    sortAmmoIcon: "alphabetical-variant",
    setSortAmmoIcon: (data: string) => set((state) => ({sortAmmoIcon: data})),

    sortBy: "alphabetical",
    setSortBy: (type: SortingTypesGun) => set((state) => ({sortBy: type})),
    sortAmmoBy: "alphabetical",
    setSortAmmoBy: (type: SortingTypesAmmo) => set((state) => ({sortAmmoBy: type})),
    
    sortGunsAscending: true,
    toggleSortGunsAscending: () => set((state) => ({sortGunsAscending: !state.sortGunsAscending})),
    setSortGunsAscending: (status: boolean) => set((state) => ({sortGunsAscending: status})),
    sortAmmoAscending: true,
    toggleSortAmmoAscending: () => set((state) => ({sortAmmoAscending: !state.sortAmmoAscending})),
    setSortAmmoAscending: (status: boolean) => set((state) => ({sortAmmoAscending: status})),
    
    gunFilterOn: false,
    toggleGunFilterOn: () => set((state) => ({gunFilterOn: !state.gunFilterOn})),
    ammoFilterOn: false,
    toggleAmmoFilterOn: () => set((state) => ({ammoFilterOn: !state.ammoFilterOn}))
  }))