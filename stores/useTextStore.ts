import { create } from "zustand"

interface TextStore {
    alohaSnackbarText: string
    setAlohaSnackbarText: (text: string) => void
  }

  export const useTextStore = create<TextStore>((set) => ({
    alohaSnackbarText: "",
    setAlohaSnackbarText: (text: string) => set((state) => ({alohaSnackbarText: text})),
   
  }))