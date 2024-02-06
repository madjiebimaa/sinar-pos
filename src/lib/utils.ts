import { clsx, type ClassValue } from "clsx"
import { Bolt, Cuboid, Droplet, InspectionPanel, Zap } from "lucide-react"
import { twMerge } from "tailwind-merge"

import { Category, CategoryStyle, Order } from "@/lib/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const categories: Map<Category["name"], CategoryStyle> = new Map([
  [
    "Concrete and Masonry",
    {
      icon: Cuboid,
      textColor: "text-green-100",
      backgroundColor: "bg-green-100",
      borderColor: "border-green-100",
    },
  ],
  [
    "Fasteners and Hardware",
    {
      icon: Bolt,
      textColor: "text-cyan-100",
      backgroundColor: "bg-cyan-100",
      borderColor: "border-cyan-100",
    },
  ],
  [
    "Flooring Materials",
    {
      icon: InspectionPanel,
      textColor: "text-yellow-100",
      backgroundColor: "bg-yellow-100",
      borderColor: "border-yellow-100",
    },
  ],
  [
    "Plumbing Materials",
    {
      icon: Droplet,
      textColor: "text-blue-100",
      backgroundColor: "bg-blue-100",
      borderColor: "border-blue-100",
    },
  ],
  [
    "Electrical Supplies",
    {
      icon: Zap,
      textColor: "text-red-100",
      backgroundColor: "bg-red-100",
      borderColor: "border-red-100",
    },
  ],
])

export function getCategoryStyle(name: Category["name"]): CategoryStyle {
  return categories.get(name)!
}

export function getTotalCategoryItems(
  items: Order["items"],
  name: Category["name"]
): number {
  return items.reduce((accumulator, item) => {
    if (item.category.name === name) {
      return accumulator + item.quantity
    }

    return accumulator
  }, 0)
}

export function getOrderTotal(items: Order["items"]): number {
  return items.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity
  }, 0)
}
