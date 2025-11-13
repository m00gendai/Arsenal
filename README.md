# Arsenal

React Native Application to manage a gun collection

# Create a new Collection

Creating a new collection (category or category item) is done by updating the below relevant files or creating new ones.
The Screens themselves are agnostic to input, database queries are determined by screen params. This allows new collections to be added relatively comfortable
avoiding duplicate code, but it still requires carefulness to not forget an update.

@db/schema.ts
- define {collection}Collection schema -> use singular, e.g. gunCollection, accessoryCollection_silencer, reloadingCollection_casing etc
- define {collection}Tags tag schema -> use singular, e.g. gunTags, accessory_silencerTags, reloading_casingTags etc
- run migrations

@interfaces.ts
- set up new {collection}Type
- append to ItemType 
- append to CollectionType -> use schema name, e.g. gunCollection, accessoryCollection_silencer, reloadingCollection_casing etc
- set up new SortingTypes{Collection}
- append to SortingTypes

@configs.ts
- define requiredFields{Collection} -> use singular, e.g requiredFieldsGun, requiredFieldsAccessory_silencer, requiredFieldsReloading_casing etx
- append to currencyPrefixFields if necessary
- append to numberTextFields if necessary
- append to datePickerTriggerFields if necessary
- append to colorPickerTriggerFields if necessary
- append to caliberPickerTriggerFields if necessary
- append to intervalPickerTriggerFields if necessary
- add collection to collectionExportDirectories
- append to respective screenNameParams{Collection} -> use schema name, e.g. gunCollection, accessoryCollection_silencer, reloadingCollection_casing etc
- create new sortingOptions{Collection} -> use singular, e.g. sortingOptionsGun, sortingOptionsAccessory_silencer, sortingOptionsReloading_casing

@usePreferenceStore()
- append to genralSettings
- append to displaySettings
- append to sorterSettings
- append to filterState

@DataTemplates
- create new {collection}DataTemplate -> use singular, e.g. gunDataTemplate, accessoryDataTemplate_silencer, reloadingDataTemplate_casing
- create an empty{Collection}Object -> use singular, e.g. emptyGunObject, emptyAccessoryObject_silencer, emptyReloadingObject_casing

@Hooks
- append to useItemTags()

@functions
- create new sort{Collection}Collection -> use singular, e.g. sirtGunCollection sortAccessoryCollection_silencer, sortReloadingCollection_casing
- append to determinators
- @saveDatabase.ts
-- append to getSchema()
- @exportArsenalCSV.ts
-- append to conditional
- @importDatabase.ts
-- handle item import
- @importArsenalCSV.ts
-- handle item import

@CSVImportModal.tsx
- handle item import

@FilterMenu.tsx
- append filters

@BottomBars
- create new BottomBar_{Collection}Collection.tsx -> use singular, e.g BottomBar_GunCollection, BottomBar_AccessoryCollection, BottomBar_ReloadingCollection

@App.tsx
- Handle new preferences in prepare()
