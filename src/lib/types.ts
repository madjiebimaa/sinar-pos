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

export type PaymentMethod = "cash" | "debit card" | "e-wallet"

export type Order = {
  id: string
  visualId: number
  items: OrderItem[]
  paymentMethod: PaymentMethod
  isShipped: boolean
}

export type CategorySnapshot = Category

export type ProductSnapshot = {
  id: Product["id"]
  name: Product["name"]
  price: Product["price"]
  categoryId: Product["category"]["id"]
}

export type OrderSnapshot = {
  id: Order["id"]
  visualId: Order["visualId"]
  items: {
    id: OrderItem["id"]
    quantity: OrderItem["quantity"]
  }[]
  paymentMethod: Order["paymentMethod"]
  isShipped: Order["isShipped"]
}
