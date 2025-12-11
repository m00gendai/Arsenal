# Arsenal

React Native Application to manage a gun collection.
Written in TypeScript using SQLite as its core with Drizzle as an ORM.

# Build Profiles

- DEV  (Development Build)
- PREV (Preview Build - apk)
- RC   (Release Candidate - aab)
- PROD (Production Build - aab/ipa)


# Project Structure

## assets
Contain static assets such as images

## components
Contains the React Native Components

### BottomBars
Contains the main Bottom Bar and the swipeable sections

### Dialogs
Contains Dialogs that need to be accessed by different components/functions and cannot be bound to one

### Hooks
Custom React Hooks (currently in the wrong hierarchy)

### ItemCollection
Contains the collection agnostic components for the CRUD operations

### MainMenu
Contains the components that make up the main menu

## db
Contains the db client and the schemas

## functions
Dedicated functions that are not classified as helper functions

## lib
Static templates and data structures

### DataTemplates
Structure and translation templates on which the collection items are based on

### Text
Text templates and translations

## stores
Zustand stores

## Other important files

- App.tsx is the main entry point and contains all the init logic and screen structure
- configs_DB.ts lists keys for legacy databases and for the preference database. Values should never be amended!
  The legacy database keys are needed if one updates from < V2.0.0 to < V2.0.0.
  The preference key is needed to retrieve app preferences.
  If one needs to reset preferences, instead of incrementing keys, use the Purge function in the Developer Settings in the App.
- confings.ts lists a variety of configurations, like which text fields trigger what dialogs, required fields per collection, sorting options etc
- interfaces.ts contains all interfaces in the global scope
- utils.js containa small helper functions


# Create a new Collection

Creating a new collection (category or category item) is done by updating the below relevant files or creating new ones.
The Screens themselves are agnostic to input, database queries are determined by screen params. This allows new collections to be added relatively comfortable
avoiding duplicate code, but it still requires carefulness to not forget an update.
Adhere to naming conventions already present.

@db/schema.ts
- define {collection}Collection schema
- define {collection}Tags tag schema
- run migrations

@interfaces.ts
- set up new {collection}Type
- append to ItemType 
- append to CollectionType
- set up new SortingTypes{Collection}
- append to SortingTypes

@lib/textTemplates.ts
- append to tabBarLabels
- append to sorting:Sorting if necessary

@configs.ts
- define requiredFields{Collection}
- append to currencyPrefixFields if necessary
- append to numberTextFields if necessary
- append to datePickerTriggerFields if necessary
- append to colorPickerTriggerFields if necessary
- append to caliberPickerTriggerFields if necessary
- append to intervalPickerTriggerFields if necessary
- append to mountedOnTriggerFields if necessary
- create cardActions{Collection}
- add collection to collectionExportDirectories
- append to respective screenNameParams{Collection}
- create new sortingOptions{Collection}

@stores/usePreferenceStore.ts
- append to genralSettings
- append to displaySettings
- append to sorterSettings
- append to filterState

@lib/DataTemplates
- create new {collection}DataTemplate
- create an empty{Collection}Object

@components/Hooks
- append to useItemTags()

@functions
- create new sort{Collection}Collection -> use singular, e.g. sirtGunCollection sortAccessoryCollection_silencer, sortReloadingCollection_casing
- append to determinators

@components/ItemCollection/Item_accessories
- create {collection}Data state
- append to getAccessoryData()/getPartData()
- append to DATA

@components/Dialogs/AccessoryMountDialog
- create db query for collection data
- append db query variable to getItemName()
- append List Item to component

@BottomBars (only for new collection category)
- create new BottomBar_{Collection}Collection.tsx
