export interface GunTypeDetails{
  id: string
  manufacturer: string | null
  model: string
  manufacturingDate: string | null
  originCountry: string | null
  caliber: string[] | null
  serial: string | null
  permit: string | null
  acquisitionDate_unix: number | null
  boughtFrom: string | null
  mainColor: string | null
  remarks: string | null
  images: string[]
  createdAt: number
  lastModifiedAt: number
  status?: GunTypeStatus
  shotCount: string
  tags: string[]
  lastShotAt_unix: number | null
  lastCleanedAt_unix: number | null
  paidPrice: string
  marketValue: string
  cleanInterval: null | string
  cleanInterval_CustomTime: null | string
  cleanInterval_ShotCount: null | string
  cleanIntervalDisplay: null | string
}

export interface GunTypeStatus{
  exFullAuto: boolean
  highCapacityMagazine: boolean
  short: boolean
  fullAuto: boolean
  launcher: boolean
  decepticon: boolean
  blooptoob: boolean
  grandfather: boolean
}

export type GunType = GunTypeDetails & GunTypeStatus

export interface LegacyAmmoType{
  id: string
  manufacturer: string | null
  caliber: string | null
  designation: string
  originCountry: string | null
  createdAt: number,
  lastModifiedAt: number,
  headstamp: string | null
  currentStock: string
  lastTopUpAt_unix: number | null
  criticalStock: string
  tags: string[]
  images: string[]
  remarks: string
}

export interface AmmoType{
  id: string
  manufacturer: string | null
  caliber: string[] | null
  designation: string
  originCountry: string | null
  createdAt: number,
  lastModifiedAt: number,
  bulletType: string,
  bulletWeight: string,
  headstamp: string | null
  currentStock: string
  lastTopUpAt_unix: number | null
  criticalStock: string
  tags: string[]
  images: string[]
  remarks: string
}

export interface AccessoryType_Silencer{
  id: string
  createdAt: number
  lastModifiedAt: number
  images: string[]
  tags: string []
  manufacturer: string
  model: string
  manufacturingDate: string
  originCountry: string
  caliber: string[]
  thread: string
  serial: string
  material: string
  decibelRating: string
  permit: string
  acquisitionDate_unix: number | null
  paidPrice: string
  boughtFrom: string
  marketValue: string
  shotCount: string
  lastShotAt_unix: number | null
  lastCleanedAt_unix: number | null
  cleanInterval: null | string
  cleanInterval_CustomTime: null | string
  cleanInterval_ShotCount: null | string
  cleanIntervalDisplay: null | string
  mainColor: string
  remarks: string
  currentlyMountedOn: string
}

export interface AccessoryType_Optic{
  id: string
  createdAt: number
  lastModifiedAt: number
  images: string[]
  tags: string []
  manufacturer: string
  model: string
  manufacturingDate: string
  originCountry: string
  serial: string
  reticle: string
  reticleColor: string
  footprint: string
  zoom: string
  unit: string
  clicksToUnitElevation: string
  clicksToUnitWindage: string
  material: string
  acquisitionDate_unix: number | null
  paidPrice: string
  boughtFrom: string
  marketValue: string
  shotCount: string
  lastShotAt_unix: number | null
  lastCleanedAt_unix: number | null
  cleanInterval: null | string
  cleanInterval_CustomTime: null | string
  cleanInterval_ShotCount: null | string
  cleanIntervalDisplay: null | string
  batteryLastChangedAt_unix: number | null
  mainColor: string
  remarks: string
  currentlyMountedOn: string
}

export interface AccessoryType_Scope{
  id: string
  createdAt: number
  lastModifiedAt: number
  images: string[]
  tags: string []
  manufacturer: string
  model: string
  manufacturingDate: string
  originCountry: string
  serial: string
  reticle: string
  reticleColor: string
  zoom: string
  unit: string
  clicksToUnitElevation: string
  clicksToUnitWindage: string
  material: string
  acquisitionDate_unix: number | null
  paidPrice: string
  boughtFrom: string
  marketValue: string
  shotCount: string
  lastShotAt_unix: number | null
  lastCleanedAt_unix: number | null
  cleanInterval: null | string
  cleanInterval_CustomTime: null | string
  cleanInterval_ShotCount: null | string
  cleanIntervalDisplay: null | string
  batteryLastChangedAt_unix: number | null
  mainColor: string
  remarks: string
  currentlyMountedOn: string
}

export interface AccessoryType_LightLaser{
  id: string;
  createdAt: number;
  lastModifiedAt: number
  images: string[]
  tags: string[]             
  manufacturer: string
  model: string
  manufacturingDate: string
  originCountry: string
  serial: string
  permit: string
  lumen: string
  candela: string
  wavelength: string
  laserPower: string
  acquisitionDate_unix: number | null
  paidPrice: string
  boughtFrom: string
  marketValue: string
  shotCount: string
  lastShotAt_unix: number | null
  batteryLastChangedAt_unix: number | null
  mainColor: string
  remarks: string
  currentlyMountedOn: string
}

export interface AccessoryType_Magazine{
  id: string
  createdAt: number
  lastModifiedAt: number
  images: string[]
  tags: string []
  manufacturer: string
  model: string
  manufacturingDate: string
  originCountry: string
  caliber: string[]
  serial: string
  material: string
  permit: string
  capacity: string
  platform: string
  acquisitionDate_unix: number | null
  paidPrice: string
  boughtFrom: string
  marketValue: string
  shotCount: string
  lastShotAt_unix: number | null
  lastCleanedAt_unix: number | null
  cleanInterval: null | string
  cleanInterval_CustomTime: null | string
  cleanInterval_ShotCount: null | string
  cleanIntervalDisplay: null | string
  mainColor: string
  remarks: string
  currentlyMountedOn: string
  currentStock: string
}

export interface AccessoryType_Misc{
  id: string
  createdAt: number
  lastModifiedAt: number
  images: string[]
  tags: string []
  manufacturer: string
  model: string
  manufacturingDate: string
  originCountry: string
  acquisitionDate_unix: number | null
  paidPrice: string
  boughtFrom: string
  marketValue: string
  mainColor: string
  remarks: string
  currentlyMountedOn: string
  serial: string
}

export interface PartType_ConversionKit{
  id: string
  createdAt: number
  lastModifiedAt: number
  images: string[]
  tags: string []
  manufacturer: string
  model: string
  manufacturingDate: string
  originCountry: string
  caliber: string[]
  serial: string
  permit: string
  acquisitionDate_unix: number | null
  paidPrice: string
  boughtFrom: string
  marketValue: string
  shotCount: string
  lastShotAt_unix: number | null
  lastCleanedAt_unix: number | null
  cleanInterval: null | string
  cleanInterval_CustomTime: null | string
  cleanInterval_ShotCount: null | string
  cleanIntervalDisplay: null | string
  mainColor: string
  remarks: string
  currentlyMountedOn: string
}

export interface PartType_Barrel{
  id: string
  createdAt: number
  lastModifiedAt: number
  images: string[]
  tags: string []
  manufacturer: string
  model: string
  manufacturingDate: string
  originCountry: string
  caliber: string[]
  thread: string
  barrelLength: string
  serial: string
  permit: string
  acquisitionDate_unix: number | null
  paidPrice: string
  boughtFrom: string
  marketValue: string
  shotCount: string
  lastShotAt_unix: number | null
  lastCleanedAt_unix: number | null
  cleanInterval: null | string
  cleanInterval_CustomTime: null | string
  cleanInterval_ShotCount: null | string
  cleanIntervalDisplay: null | string
  mainColor: string
  remarks: string
  currentlyMountedOn: string
}

export interface LiteratureType_Book{
    id: string
    createdAt: number
    lastModifiedAt: number
    images: string[]
    tags: string[]
    language: string
    title: string
    subtitle: string
    isbn: string
    publishingDate: string
    author: string
    publisher: string
    edition: string
    series: string
    volume: string
    pages: string
    format: string
    acquisitionDate_unix: number | null
    paidPrice: string
    boughtFrom: string
    marketValue: string
    remarks: string
}

export type ItemType =  | GunType 
                        | AmmoType 
                        | AccessoryType_Silencer 
                        | AccessoryType_Optic
                        | AccessoryType_Scope
                        | AccessoryType_LightLaser
                        | AccessoryType_Magazine
                        | AccessoryType_Misc
                        | PartType_ConversionKit
                        | PartType_Barrel
                        | LiteratureType_Book

export type CollectionType =  | "gunCollection" 
                              | "ammoCollection" 
                              | "accessoryCollection_Silencer" 
                              | "accessoryCollection_Optic"
                              | "accessoryCollection_Scope"
                              | "accessoryCollection_LightLaser"
                              | "accessoryCollection_Magazine"
                              | "accessoryCollection_Misc"
                              | "partCollection_ConversionKit"
                              | "partCollection_Barrel"
                              | "literatureCollection_Book"

export type Screens = "itemCollection"

interface DbId{
  db_id: number
}

export type ItemTypeWithDbId = ItemType & DbId

export interface MenuVisibility{
  sortBy: boolean
  filterBy: boolean
}

export interface ColorTheme{
  [key:string]:Color
}

export interface Color {
  primary: string
  onPrimary: string
  primaryContainer: string
  onPrimaryContainer: string
  secondary: string
  onSecondary: string
  secondaryContainer: string
  onSecondaryContainer: string
  tertiary: string
  onTertiary: string
  tertiaryContainer: string
  onTertiaryContainer: string
  error: string
  onError: string
  errorContainer: string
  onErrorContainer: string
  background: string
  onBackground: string
  surface: string
  onSurface: string
  surfaceVariant: string
  onSurfaceVariant: string
  outline: string
  outlineVariant: string
  shadow: string
  scrim: string
  inverseSurface: string
  inverseOnSurface: string
  inversePrimary: string
  elevation: Elevation
  surfaceDisabled: string
  onSurfaceDisabled: string
  backdrop: string
}

export interface Elevation {
  level0: string
  level1: string
  level2: string
  level3: string
  level4: string
  level5: string
}

export interface CommonStyles {
  allPageMargin: string
  allPageMarginIOS: number
  allTitleFontSize: string
  allSubtitleFontSize: string
  allTableFontSize: string
  imageGap: string
  tableVerticalMargin: string
  tableRowVerticalPadding: string
  tableCellPadding: string
  footerWidth: string
  footerFontSize: string
  footerTopBorder: string
  footerPaddingTop: string
  footerMarginTop: string
  tagPadding: string
  tagFontSize: string
  tagContainerGap: string
}

export type SortingTypesGun = | "alphabetical" 
                              | "createdAt" 
                              | "lastModifiedAt" 
                              | "caliber" 
                              | "paidPrice" 
                              | "marketValue"
                              | "acquisitionDate" 
                              | "lastCleanedAt" 
                              | "lastShotAt"

export type SortingTypesAmmo =  | "alphabetical" 
                                | "createdAt" 
                                | "lastModifiedAt" 
                                | "currentStock" 
                                | "lastTopUpAt"

export type SortingTypesAccessory_Silencer =  | "alphabetical" 
                                              | "createdAt" 
                                              | "lastModifiedAt" 
                                              | "paidPrice" 
                                              | "marketValue" 
                                              | "acquisitionDate" 
                                              | "lastCleanedAt" 
                                              | "lastShotAt" 
                                              | "decibelRating"

export type SortingTypesAccessory_Optic = | "alphabetical" 
                                          | "createdAt" 
                                          | "lastModifiedAt" 
                                          | "paidPrice" 
                                          | "marketValue" 
                                          | "acquisitionDate" 
                                          | "lastCleanedAt" 
                                          | "lastBatteryChangeAt" 

export type SortingTypesAccessory_Scope = | "alphabetical" 
                                          | "createdAt" 
                                          | "lastModifiedAt" 
                                          | "paidPrice" 
                                          | "marketValue" 
                                          | "acquisitionDate" 
                                          | "lastCleanedAt" 
                                          | "lastBatteryChangeAt" 

export type SortingTypesAccessory_LightLaser =  | "alphabetical" 
                                                | "createdAt" 
                                                | "lastModifiedAt" 
                                                | "paidPrice" 
                                                | "marketValue" 
                                                | "acquisitionDate" 
                                                | "lastBatteryChangeAt" 

export type SortingTypesAccessory_Magazine =  | "alphabetical" 
                                              | "createdAt" 
                                              | "lastModifiedAt" 
                                              | "paidPrice" 
                                              | "marketValue" 
                                              | "acquisitionDate" 
                                              | "lastCleanedAt" 
                                              | "lastShotAt" 
                                              | "capacity"

export type SortingTypesAccessory_Misc =  | "alphabetical" 
                                          | "createdAt" 
                                          | "lastModifiedAt" 
                                          | "paidPrice" 
                                          | "marketValue" 
                                          | "acquisitionDate" 

export type SortingTypesPart_ConversionKit =  | "alphabetical" 
                                              | "createdAt" 
                                              | "lastModifiedAt" 
                                              | "caliber" 
                                              | "paidPrice" 
                                              | "marketValue"
                                              | "acquisitionDate" 
                                              | "lastCleanedAt" 
                                              | "lastShotAt"

export type SortingTypesPart_Barrel = | "alphabetical" 
                                      | "createdAt" 
                                      | "lastModifiedAt" 
                                      | "paidPrice" 
                                      | "marketValue" 
                                      | "acquisitionDate" 
                                      | "lastCleanedAt" 
                                      | "lastShotAt"

export type SortingTypesLiterature_Book = | "alphabetical" 
                                          | "createdAt" 
                                          | "lastModifiedAt" 
                                          | "paidPrice" 
                                          | "marketValue" 
                                          | "acquisitionDate" 
                                          | "pages" 

export type SortingTypes =  | SortingTypesGun 
                            | SortingTypesAmmo 
                            | SortingTypesAccessory_Silencer
                            | SortingTypesAccessory_Optic
                            | SortingTypesAccessory_Scope
                            | SortingTypesAccessory_LightLaser
                            | SortingTypesAccessory_Magazine
                            | SortingTypesAccessory_Misc
                            | SortingTypesPart_ConversionKit
                            | SortingTypesPart_Barrel
                            | SortingTypesLiterature_Book

                            
export type Languages = | "de" 
                        | "en" 
                        | "fr" 
                        | "it" 
                        | "ch"

export type CaliberArray = {id: string, amount: string }

export type DBOperations =  | "save_arsenal_db" 
                            | "save_arsenal_csv" 
                            | "import_arsenal_db" 
                            | "import_arsenal_csv" 
                            | "import_custom_csv" 
                            | "import_legacy_db"
                           
export type StackParamList = {
  Home: undefined
  MainMenu: undefined
  itemCollection: {collectionType: CollectionType};
  item: undefined
  newItem: { clone: boolean }
  editItem: undefined
  QuickStock: undefined
  QuickShot: undefined
  QuickMount: {item: ItemType}
  EditAutocomplete: undefined
  Statistics: undefined
}

export interface Tag {
  db_id: number
  label: string
  color: string
  active: boolean
}

export interface AccessoryMount{
    db_id: number
    id: string
    accessoryId: string
    accessoryType: CollectionType
    parentGunId: string
    parentGunType: CollectionType
    parentAccessoryId: string
    parentAccessoryType: CollectionType
    parentPartId: string
    parentPartType: CollectionType
}

export interface PartMount{
    db_id: number
    id: string
    partId: string
    partType: CollectionType
    parentGunId: string
    parentGunType: CollectionType
    parentPartId: string
    parentPartType: CollectionType
}