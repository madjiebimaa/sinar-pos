import { useMediaQuery } from "@uidotdev/usehooks"
import { create } from "zustand"

type LayoutState = {
  isSidebarOpen: boolean
}

type LayoutActions = {
  actions: {
    openSidebar: () => void
    closeSidebar: () => void
  }
}

const initialState: LayoutState = {
  isSidebarOpen: false,
}

const layoutStore = create<LayoutState & LayoutActions>()((set) => ({
  ...initialState,
  actions: {
    openSidebar: () => set({ isSidebarOpen: true }),
    closeSidebar: () => set({ isSidebarOpen: false }),
  },
}))

export const useIsSidebarOpen = () =>
  layoutStore((state) => state.isSidebarOpen)
export const useLayoutActions = () => layoutStore((state) => state.actions)
