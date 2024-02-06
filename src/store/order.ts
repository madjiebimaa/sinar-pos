import { create } from "zustand"

import { Order, PaymentMethod, Product } from "@/lib/types"

type OrderState = {
  order: Order
}

type OrderActions = {
  actions: {
    addItem: (item: Product) => void
    removeItem: (id: Product["id"]) => void
    increaseItemQuantity: (id: Product["id"]) => void
    decreaseItemQuantity: (id: Product["id"]) => void
    changePaymentMethod: (paymentMethod: PaymentMethod) => void
  }
}

const initialState: OrderState = {
  order: {
    id: 1,
    items: [],
    paymentMethod: "cash",
  },
}

const orderStore = create<OrderState & OrderActions>()((set) => ({
  ...initialState,
  actions: {
    addItem: (item) =>
      set((state) => ({
        order: {
          ...state.order,
          items: [...state.order.items, { ...item, quantity: 1 }],
        },
      })),
    removeItem: (id) =>
      set((state) => ({
        order: {
          ...state.order,
          items: state.order.items.filter((item) => item.id !== id),
        },
      })),
    increaseItemQuantity: (id) =>
      set((state) => ({
        order: {
          ...state.order,
          items: state.order.items.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                quantity: item.quantity + 1,
              }
            }

            return item
          }),
        },
      })),
    decreaseItemQuantity: (id) =>
      set((state) => ({
        order: {
          ...state.order,
          items: state.order.items.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                quantity: item.quantity - 1,
              }
            }

            return item
          }),
        },
      })),
    changePaymentMethod: (paymentMethod) =>
      set((state) => ({ order: { ...state.order, paymentMethod } })),
  },
}))

export const useOrder = () => orderStore((state) => state.order)
export const useOrderActions = () => orderStore((state) => state.actions)
