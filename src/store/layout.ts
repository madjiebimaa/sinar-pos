import { create } from "zustand"

type LayoutState = {
  isSidebarOpen: boolean
  isComboboxOpen: boolean
}

type LayoutActions = {
  actions: {
    openSidebar: () => void
    closeSidebar: () => void
    toggleCombobox: () => void
  }
}

const initialState: LayoutState = {
  isSidebarOpen: false,
  isComboboxOpen: false,
}

const layoutStore = create<LayoutState & LayoutActions>()((set) => ({
  ...initialState,
  actions: {
    openSidebar: () => set({ isSidebarOpen: true }),
    closeSidebar: () => set({ isSidebarOpen: false }),
    toggleCombobox: () =>
      set((state) => ({ isComboboxOpen: !state.isComboboxOpen })),
  },
}))

export const useIsSidebarOpen = () =>
  layoutStore((state) => state.isSidebarOpen)
export const useIsComboboxOpen = () =>
  layoutStore((state) => state.isComboboxOpen)
export const useLayoutActions = () => layoutStore((state) => state.actions)
