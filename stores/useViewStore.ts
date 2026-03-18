import { create } from "zustand"

interface ViewStore {
    mainMenuOpen: boolean
    setMainMenuOpen: () => void

    lightBoxOpen: boolean
    setLightBoxOpen: () => void

    toastVisible: boolean
    setToastVisible: (data: boolean) => void

    dbModalVisible: boolean
    setDbModalVisible: () => void

    imageResizeVisible: boolean
    toggleImageResizeVisible: () => void

    loginGuardVisible: boolean
    toggleLoginGuardVisible: () => void

    importCSVVisible: boolean
    toggleImportCSVVisible: () => void

    importModalVisible: boolean
    toggleImportModalVisible: () => void

    exportModalVisible: boolean
    toggleExportModalVisible: () => void

    hideBottomSheet: boolean
    toggleHideBottomSheet: () => void
    setHideBottomSheet: (status: boolean) => void

    cardOptionsMenuVisible: boolean
    setCardOptionsMenuVisible: (status: boolean) => void

    cardOptionsMenuVisible_accessories: boolean
    setCardOptionsMenuVisible_accessories: (status: boolean) => void

    alohaSnackbarVisible: boolean
    setAlohaSnackbarVisible: (status: boolean) => void

    developerSettingsVisible: boolean
    setDeveloperSettingsVisible: (status: boolean) => void

    onboardingVisible: boolean
    setOnboardingVisible: (status: boolean) => void

    customShippingLabelVisible: boolean
    setCustomShippingLabelVisible: (status: boolean) => void

  }

  export const useViewStore = create<ViewStore>((set) => ({
    mainMenuOpen: false,
    setMainMenuOpen: () => set((state) => ({ mainMenuOpen: !state.mainMenuOpen })),
    
    hideBottomSheet: false,
    toggleHideBottomSheet: () => set((state) => ({hideBottomSheet: !state.hideBottomSheet})),
    setHideBottomSheet: (status: boolean) => set((state) => ({hideBottomSheet: status})),

    cardOptionsMenuVisible: false,
    setCardOptionsMenuVisible: (status: boolean) => set((state) => ({cardOptionsMenuVisible: status})),

    cardOptionsMenuVisible_accessories: false,
    setCardOptionsMenuVisible_accessories: (status: boolean) => set((state) => ({cardOptionsMenuVisible_accessories: status})),
    
    lightBoxOpen: false,
    setLightBoxOpen: () => set((state) => ({lightBoxOpen: !state.lightBoxOpen})),
    
    toastVisible: false,
    setToastVisible: (data: boolean) => set((state) => ({toastVisible: data})),
    
    dbModalVisible: false,
    setDbModalVisible: () => set((state) => ({dbModalVisible: !state.dbModalVisible})),
    
    imageResizeVisible: false,
    toggleImageResizeVisible: () => set((state) => ({imageResizeVisible: !state.imageResizeVisible})),
    
    loginGuardVisible: false,
    toggleLoginGuardVisible: () => set((state) => ({loginGuardVisible: !state.loginGuardVisible})),
    
    importCSVVisible: false,
    toggleImportCSVVisible: () => set((state) => ({importCSVVisible: !state.importCSVVisible})),
    
    importModalVisible: false,
    toggleImportModalVisible: () => set((state) => ({importModalVisible: !state.importModalVisible})),
    
    exportModalVisible: false,
    toggleExportModalVisible: () => set((state) => ({exportModalVisible: !state.exportModalVisible})),

    alohaSnackbarVisible: false,
    setAlohaSnackbarVisible: () => set((state) => ({alohaSnackbarVisible: !state.alohaSnackbarVisible})),

    developerSettingsVisible: false,
    setDeveloperSettingsVisible: () => set((state) => ({developerSettingsVisible: !state.developerSettingsVisible})),

    onboardingVisible: false,
    setOnboardingVisible: (status: boolean) => set({ onboardingVisible: status }),

    customShippingLabelVisible: false,
    setCustomShippingLabelVisible: (status: boolean) => set({ customShippingLabelVisible: status })
  }))