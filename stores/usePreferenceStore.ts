import { create } from "zustand"
import { colorThemes } from "../lib/colorThemes"
import { Color, Languages, SortingTypesGun, SortingTypesAmmo, SortingTypesAccessory_Silencer, CollectionType, SortingTypes, SortingTypesAccessory_Optic, SortingTypesPart_ConversionKit, SortingTypesAccessory_LightLaser} from "../interfaces"

export type DisplayVariants = "grid" | "list" | "compactList"

interface GeneralSettings{
  displayImagesInListViewGun: boolean
  displayImagesInListViewAmmo: boolean
  displayImagesInListViewAccessory_Silencer: boolean
  displayImagesInListViewAccessory_Optic: boolean
  displayImagesInListViewAccessory_LightLaser: boolean
  displayImagesInListViewPart_ConversionKit: boolean
  resizeImages: boolean
  loginGuard: boolean
  emptyFields: boolean
  caliberDisplayName: boolean
}

interface DisplaySettings{
  gunCollection: DisplayVariants
  ammoCollection: DisplayVariants
  accessoryCollection_Silencer: DisplayVariants
  accessoryCollection_Optic: DisplayVariants
  accessoryCollection_LightLaser: DisplayVariants
  partCollection_ConversionKit: DisplayVariants
  accessoryView: DisplayVariants
}

export interface SorterSettings{
  gunCollection: {type: SortingTypesGun, direction: "asc" | "desc", icon: string}
  ammoCollection: {type: SortingTypesAmmo, direction: "asc" | "desc", icon: string}
  accessoryCollection_Silencer: {type: SortingTypesAccessory_Silencer, direction: "asc" | "desc", icon: string}
  accessoryCollection_Optic: {type: SortingTypesAccessory_Optic, direction: "asc" | "desc", icon: string}
  accessoryCollection_LightLaser: {type: SortingTypesAccessory_LightLaser, direction: "asc" | "desc", icon: string}
  partCollection_ConversionKit: {type: SortingTypesPart_ConversionKit, direction: "asc" | "desc", icon: string}
}

interface FilterState{
  gunCollection: boolean
  ammoCollection: boolean
  accessoryCollection_Silencer: boolean
  accessoryCollection_Optic: boolean
  accessoryCollection_LightLaser: boolean
  partCollection_ConversionKit: boolean
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

    displaySettings: DisplaySettings
    setDisplaySettings: (settings: DisplaySettings) => void

    sortBy: SorterSettings
    setSortBy: (collection: keyof SorterSettings, settings: SorterSettings[keyof SorterSettings]) => void

    filterOn: FilterState
    setFilterOn: (status: FilterState) => void

    hasConvertedLegacyDateFieldsToUnixTimeStamp: boolean
    setHasConvertedLegacyDateFieldsToUnixTimeStamp: (status: boolean) => void
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
      displayImagesInListViewAccessory_Optic: true,
      displayImagesInListViewAccessory_LightLaser: true,
      displayImagesInListViewPart_ConversionKit: true,
      resizeImages: true,
      loginGuard: false,
      emptyFields: false,
      caliberDisplayName: false,
    },
    setGeneralSettings: (settings: GeneralSettings) => set((state) => ({generalSettings: settings})),

    displaySettings: {
      gunCollection: "grid",
      ammoCollection: "grid",
      accessoryCollection_Silencer: "grid",
      accessoryCollection_Optic: "grid",
      accessoryCollection_LightLaser: "grid",
      partCollection_ConversionKit: "grid",
      accessoryView: "grid"
    },
    setDisplaySettings: (settings: DisplaySettings) => set((state) => ({displaySettings: settings})),


    caliberDisplayNameList: [],
    setCaliberDisplayNameList: (calibers: {name: string, displayName: string}[])  => set((state) =>({caliberDisplayNameList: calibers})),

    sortBy: {
      gunCollection: {type: "alphabetical", direction: "asc", icon: "alphabetical-variant"},
      ammoCollection: {type: "alphabetical", direction: "asc", icon: "alphabetical-variant"},
      accessoryCollection_Silencer: {type: "alphabetical", direction: "asc", icon: "alphabetical-variant"},
      accessoryCollection_Optic: {type: "alphabetical", direction: "asc", icon: "alphabetical-variant"},
      accessoryCollection_LightLaser: {type: "alphabetical", direction: "asc", icon: "alphabetical-variant"},
      partCollection_ConversionKit: {type: "alphabetical", direction: "asc", icon: "alphabetical-variant"},
    },
    setSortBy: (collection, settings) => set((state) => ({
      sortBy: { 
        ...state.sortBy, 
        [collection]: settings 
      }
    })),
    
    filterOn: {
      gunCollection: false,
      ammoCollection: false,
      accessoryCollection_Silencer: false,
      accessoryCollection_Optic: false,
      accessoryCollection_LightLaser: false,
      partCollection_ConversionKit: false
    },
    setFilterOn: (status: FilterState) => set((state) => ({filterOn: status})),

    hasConvertedLegacyDateFieldsToUnixTimeStamp: false,
    setHasConvertedLegacyDateFieldsToUnixTimeStamp: (status: boolean) => set((state) => ({hasConvertedLegacyDateFieldsToUnixTimeStamp: status}))
  }))