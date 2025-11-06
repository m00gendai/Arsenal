# Arsenal

React Native Application to manage a gun collection

# Create a new Collection

Zustand Stores
- set up a new Zustand store (use{Collection}Store)
- append to usePreferenceStore()

@interfaces.ts
- set up item types
- set up sortingTypes
- add collection to StackParamList

@configs.ts
- define required item fields
- define currency and number fields
- add collection to collectionExportDirectories
- add collection item to ScreenNames

@DataTemplates
- create a {item}DataTemplate
- create an empty{item}Object

@functions
- create a sorter function
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

@db/schema.ts
- define collection schema
- run migrations

@FilterMenu.tsx
- append filters

@Collections
- create new collection {Item}Collection folder
- create {Item}.tsx
- create {Item}Card.tsx
- create {Item}Collection.tsx
- create Edit{Item}.tsx
- create New{Item}.tsx

@BottomBards
- create new BottomBar_{Item}Collection.tsx

@App.tsx
- Handle new preferences in prepare()
- Add StackScreen
