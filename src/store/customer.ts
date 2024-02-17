import { create } from "zustand"

import { Customer } from "@/lib/types"

type CustomerState = {
  selectedCustomer: Customer | null
}

type CustomerActions = {
  actions: {
    selectCustomer: (customer: Customer) => void
    reset: () => void
  }
}

const initialState: CustomerState = {
  selectedCustomer: null,
}

const customerStore = create<CustomerState & CustomerActions>()((set) => ({
  ...initialState,
  actions: {
    selectCustomer: (customer) =>
      set((state) => ({
        selectedCustomer:
          state.selectedCustomer && state.selectedCustomer.id === customer.id
            ? null
            : customer,
      })),
    reset: () => set({ ...initialState }),
  },
}))

export const useSelectedCustomer = () =>
  customerStore((state) => state.selectedCustomer)
export const useCustomerActions = () => customerStore((state) => state.actions)
