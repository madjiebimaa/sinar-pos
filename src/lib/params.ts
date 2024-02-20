import { Order } from "@/lib/types"

export type GetProductsParams = {
  name?: string
  category?: string
}

export type AddOrderParams = Omit<Order, "id" | "createdAt">
