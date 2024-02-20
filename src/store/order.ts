import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { getOrderCount } from "@/actions/order"
import { Order, PaymentMethod, Product, ShipTransportation } from "@/lib/types"

type OrderState = {
  orderVisualId: number
  order: Omit<Order, "id" | "visualId" | "customer" | "createdAt">
}

type OrderActions = {
  actions: {
    createOrderVisualId: () => void
    addItem: (item: Product) => void
    removeItem: (id: Product["id"]) => void
    increaseItemQuantity: (id: Product["id"]) => void
    decreaseItemQuantity: (id: Product["id"]) => void
    changePaymentMethod: (paymentMethod: PaymentMethod) => void
    toggleNeedToBeShip: () => void
    addShipAddress: (shipAddress: Order["shipAddress"]) => void
    changeShipTransportation: (shipTransportation: ShipTransportation) => void
    reset: () => void
  }
}

const initialState: OrderState = {
  orderVisualId: 0,
  order: {
    paymentMethod: "cash",
    isNeedToBeShip: false,
    isShipped: false,
    shipAddress: "",
    shipTransportation: "car",
    items: [],
  },
}

const orderStore = create<OrderState & OrderActions>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        createOrderVisualId: async () => {
          const visualId = await getOrderCount()
          return set((state) => ({
            orderVisualId: state.orderVisualId
              ? state.orderVisualId
              : visualId + 1,
          }))
        },
        addItem: (item) =>
          set((state) => ({
            order: {
              ...state.order,
              items: [
                ...state.order.items,
                {
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: 1,
                  category: item.category,
                },
              ],
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
        toggleNeedToBeShip: () =>
          set((state) => ({
            order: {
              ...state.order,
              isNeedToBeShip: !state.order.isNeedToBeShip,
            },
          })),
        addShipAddress: (shipAddress) =>
          set((state) => ({ order: { ...state.order, shipAddress } })),
        changeShipTransportation: (shipTransportation) =>
          set((state) => ({ order: { ...state.order, shipTransportation } })),
        reset: () => set(() => ({ ...initialState })),
      },
    }),
    {
      name: "order-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        orderVisualId: state.orderVisualId,
        order: state.order,
      }),
    }
  )
)

export const useOrderVisualId = () => orderStore((state) => state.orderVisualId)
export const useOrder = () => orderStore((state) => state.order)
export const useOrderActions = () => orderStore((state) => state.actions)
