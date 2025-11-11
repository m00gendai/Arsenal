import { create } from "zustand"
import { colorThemes } from "../lib/colorThemes"
import { Color, Languages, SortingTypesGun, SortingTypesAmmo, SortingTypesAccessory_Silencer, CollectionType} from "../interfaces"

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

    display_grid: CollectionType[]
    display_list: CollectionType[]

    setDisplay_grid: (data: CollectionType[]) => void
    setDisplay_list: (data: CollectionType[]) => void

    displayAsGrid: boolean
    setDisplayAsGrid: (status: boolean) => void
    displayAmmoAsGrid: boolean
    setDisplayAmmoAsGrid: (status: boolean) => void
    displayAccessory_SilencerAsGrid: boolean
    setDisplayAccessory_SilencerAsGrid: (status: boolean) => void
    
    toggleDisplayAsGrid: () => void
    toggleDisplayAmmoAsGrid: () => void
    toggleDisplayAccessory_SilencerAsGrid: () => void

    sortGunIcon: string
    setSortGunIcon: (data: string) => void
    sortAmmoIcon: string
    setSortAmmoIcon: (data: string) => void
    sortAccessory_SilencerIcon: string
    setsortAccessory_SilencerIcon: (data: string) => void

    sortBy: SortingTypesGun
    setSortBy: (type: SortingTypesGun) => void
    sortAmmoBy: SortingTypesAmmo
    setSortAmmoBy: (type: SortingTypesAmmo) => void
    sortAccessory_SilencerBy: SortingTypesAccessory_Silencer
    setSortAccessory_SilencerBy: (type: SortingTypesAccessory_Silencer) => void

    sortGunsAscending: boolean
    toggleSortGunsAscending: () => void
    setSortGunsAscending: (status: boolean) => void
    sortAmmoAscending: boolean
    toggleSortAmmoAscending: () => void
    setSortAmmoAscending: (status: boolean) => void
    sortAccessory_SilencerAscending: boolean
    toggleSortAccessory_SilencerAscending: () => void
    setSortAccessory_SilencerAscending: (status: boolean) => void

    gunFilterOn: boolean
    toggleGunFilterOn: () => void
    ammoFilterOn: boolean
    toggleAmmoFilterOn: () => void
    accessory_SilencerFilterOn: boolean
    toggleAccessory_SilencerFilterOn: () => void
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
    
    display_grid: ["gunCollection", "ammoCollection"],
    display_list: [],
    setDisplay_grid: (data: CollectionType[]) => set((state) => ({display_grid: data})),
    setDisplay_list: (data: CollectionType[]) => set((state) => ({display_list: data})),

    displayAsGrid: true,
    setDisplayAsGrid: (status: boolean) => set((state) => ({displayAsGrid: status})),
    displayAmmoAsGrid: true,
    setDisplayAmmoAsGrid: (status: boolean) => set((state) => ({displayAmmoAsGrid: status})),
    displayAccessory_SilencerAsGrid: true,
    setDisplayAccessory_SilencerAsGrid: (status: boolean) => set((state) => ({displayAccessory_SilencerAsGrid: status})),
        
    toggleDisplayAsGrid: () => set((state) => ({displayAsGrid: !state.displayAsGrid})),
    toggleDisplayAmmoAsGrid: () => set((state) => ({displayAmmoAsGrid: !state.displayAmmoAsGrid})),
    toggleDisplayAccessory_SilencerAsGrid: () => set((state) => ({displayAccessory_SilencerAsGrid: !state.displayAccessory_SilencerAsGrid})),
    
    sortGunIcon: "alphabetical-variant",
    setSortGunIcon: (data: string) => set((state) => ({sortGunIcon: data})),
    sortAmmoIcon: "alphabetical-variant",
    setSortAmmoIcon: (data: string) => set((state) => ({sortAmmoIcon: data})),
    sortAccessory_SilencerIcon: "alphabetical-variant",
    setsortAccessory_SilencerIcon: (data: string) => set((state) => ({sortAccessory_SilencerIcon: data})),

    sortBy: "alphabetical",
    setSortBy: (type: SortingTypesGun) => set((state) => ({sortBy: type})),
    sortAmmoBy: "alphabetical",
    setSortAmmoBy: (type: SortingTypesAmmo) => set((state) => ({sortAmmoBy: type})),
    sortAccessory_SilencerBy: "alphabetical",
    setSortAccessory_SilencerBy: (type: SortingTypesAccessory_Silencer) => set((state) => ({sortAccessory_SilencerBy: type})),

    sortGunsAscending: true,
    toggleSortGunsAscending: () => set((state) => ({sortGunsAscending: !state.sortGunsAscending})),
    setSortGunsAscending: (status: boolean) => set((state) => ({sortGunsAscending: status})),
    sortAmmoAscending: true,
    toggleSortAmmoAscending: () => set((state) => ({sortAmmoAscending: !state.sortAmmoAscending})),
    setSortAmmoAscending: (status: boolean) => set((state) => ({sortAmmoAscending: status})),
    sortAccessory_SilencerAscending: true,
    toggleSortAccessory_SilencerAscending: () => set((state) => ({sortAccessory_SilencerAscending: !state.sortAccessory_SilencerAscending})),
    setSortAccessory_SilencerAscending: (status: boolean) => set((state) => ({sortAccessory_SilencerAscending: status})),

    gunFilterOn: false,
    toggleGunFilterOn: () => set((state) => ({gunFilterOn: !state.gunFilterOn})),
    ammoFilterOn: false,
    toggleAmmoFilterOn: () => set((state) => ({ammoFilterOn: !state.ammoFilterOn})),
    accessory_SilencerFilterOn: false,
    toggleAccessory_SilencerFilterOn: () => set((state) => ({accessory_SilencerFilterOn: !state.accessory_SilencerFilterOn}))
  }))