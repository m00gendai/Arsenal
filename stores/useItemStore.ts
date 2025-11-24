import { create } from "zustand"
import { CollectionType, ItemType } from "../interfaces"

interface ItemStore {
    currentItem: ItemType | null
    setCurrentItem: (item: ItemType) => void
    currentCollection: CollectionType
    setCurrentCollection: (collection: CollectionType) => void
    nameFromId: string | null
    setNameFromId: (id: string) => void
    currentAccessory: ItemType | null
    setCurrentAccessory: (item: ItemType) => void
  }

  export const useItemStore = create<ItemStore>((set) => ({
    currentItem: null,
    setCurrentItem: (item: ItemType) => set((state) => ({currentItem: item})),
    currentCollection: "gunCollection",
    setCurrentCollection: (collection: CollectionType) => set((state) => ({currentCollection: collection})),
    nameFromId: null,
    setNameFromId: (id: string) => set((state) => ({nameFromId: id})),
    currentAccessory: null,
    setCurrentAccessory: (item: ItemType) => set((state) => ({currentAccessory: item})),
  }))