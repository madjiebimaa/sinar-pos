import { LucideIcon } from "lucide-react"

export type Category = {
  id: string
  name: string
}

export type CategoryStyle = {
  icon: LucideIcon
  textColor: string
  backgroundColor: string
  borderColor: string
}

export type Product = {
  id: string
  name: string
  price: number

  category: Category
}

export type OrderItem = Product & {
  quantity: number
}

export type Order = {
  id: number
  items: OrderItem[]
}
