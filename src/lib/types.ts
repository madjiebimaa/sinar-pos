import { Timestamp } from "firebase/firestore"

export type Category = {
  id: string
  name: string
  icon: string
  color: string
}

export type Product = {
  id: string
  name: string
  price: number
  category: Category
}

export type OrderItem = {
  id: Product["id"]
  name: Product["name"]
  price: Product["price"]
  categoryId: Product["category"]["id"]
  quantity: number
}

export type Customer = {
  id: string
  name: string
}

export type PaymentMethod = "cash" | "debit card" | "e-wallet"

export type Order = {
  id: string
  visualId: number
  paymentMethod: PaymentMethod
  isNeedToBeShip: boolean
  isShipped: boolean
  createdAt: Date

  items: OrderItem[]
  customer: Customer | null
}

export type CategorySnapshot = Category

export type ProductSnapshot = Omit<Product, "category"> & {
  categoryId: Product["category"]["id"]
}

export type OrderSnapshot = Omit<Order, "items" | "customer" | "createdAt"> & {
  items: {
    id: OrderItem["id"]
    quantity: OrderItem["quantity"]
  }[]
  customerId: Customer["id"]
  createdAt: Timestamp
}
