import { create } from "zustand"

type LayoutState = {
  isSidebarOpen: boolean
}

type LayoutActions = {
  actions: {
    toggleSidebarOpen: () => void
  }
}

const initialState: LayoutState = {
  isSidebarOpen: false,
}

const layoutStore = create<LayoutState & LayoutActions>()((set) => ({
  ...initialState,
  actions: {
    toggleSidebarOpen: () =>
      set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  },
}))

export const useIsSidebarOpen = () =>
  layoutStore((state) => state.isSidebarOpen)
export const useLayoutActions = () => layoutStore((state) => state.actions)
