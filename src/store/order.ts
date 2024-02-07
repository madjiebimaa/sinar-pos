import { create } from "zustand"

import { Order, PaymentMethod, Product } from "@/lib/types"

type OrderState = {
  order: Order
  orders: Order[]
}

type OrderActions = {
  actions: {
    addItem: (item: Product) => void
    removeItem: (id: Product["id"]) => void
    increaseItemQuantity: (id: Product["id"]) => void
    decreaseItemQuantity: (id: Product["id"]) => void
    changePaymentMethod: (paymentMethod: PaymentMethod) => void
    addOrder: () => void
    deleteOrder: (id: Order["id"]) => void
    updateOrder: (id: Order["id"], fields: Omit<Order, "id">) => void
    toggleShipOrder: (id: Order["id"]) => void
  }
}

const initialState: OrderState = {
  order: {
    id: 1,
    items: [],
    paymentMethod: "cash",
    isShipped: false,
  },
  orders: [],
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
    addOrder: () =>
      set((state) => ({
        orders: [...state.orders, state.order],
        order: initialState.order,
      })),
    deleteOrder: (id) =>
      set((state) => ({
        orders: state.orders.filter((order) => order.id !== id),
      })),
    updateOrder: (id, fields) =>
      set((state) => ({
        orders: state.orders.map((order) => {
          if (order.id === id) {
            return {
              ...order,
              ...fields,
            }
          }

          return order
        }),
      })),
    toggleShipOrder: (id) =>
      set((state) => ({
        orders: state.orders.map((order) => {
          if (order.id === id) {
            return {
              ...order,
              isShipped: !order.isShipped,
            }
          }

          return order
        }),
      })),
  },
}))

export const useOrder = () => orderStore((state) => state.order)
export const useOrders = () => orderStore((state) => state.orders)
export const useOrderActions = () => orderStore((state) => state.actions)
