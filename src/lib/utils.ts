import { clsx, type ClassValue } from "clsx"
import {
  Bike,
  Bolt,
  BrickWall,
  Bus,
  Car,
  CircleDollarSign,
  CreditCard,
  Cuboid,
  Droplet,
  InspectionPanel,
  LucideIcon,
  PaintRoller,
  QrCode,
  Truck,
  Zap,
} from "lucide-react"
import { twMerge } from "tailwind-merge"

import { Category, Order } from "@/lib/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoryIcon(icon: string): LucideIcon {
  switch (icon) {
    case "InspectionPanel":
      return InspectionPanel
    case "Bolt":
      return Bolt
    case "Zap":
      return Zap
    case "Cuboid":
      return Cuboid
    case "PaintRoller":
      return PaintRoller
    case "Droplet":
      return Droplet
    default:
      return BrickWall
  }
}

export function getOrderPaymentMethodIcon(
  paymentMethod: Order["paymentMethod"]
): LucideIcon {
  switch (paymentMethod) {
    case "cash":
      return CircleDollarSign
    case "debit card":
      return CreditCard
    case "e-wallet":
      return QrCode
  }
}

export function getShipTransportationIcon(
  shipTransportation: Order["shipTransportation"]
): LucideIcon {
  switch (shipTransportation) {
    case "motorcycle":
      return Bike
    case "car":
      return Car
    case "bus":
      return Bus
    case "truck":
      return Truck
  }
}

export function getCategoryItemsTotal(
  items: Order["items"],
  id: Category["id"]
): number {
  return items.reduce((accumulator, item) => {
    if (item.categoryId === id) {
      return accumulator + item.quantity
    }

    return accumulator
  }, 0)
}

export function getCategoriesItemsTotal(
  items: Order["items"]
): { id: Category["id"]; total: number }[] {
  const map = new Map<Category["id"], number>()
  for (const item of items) {
    map.set(
      item.categoryId,
      map.has(item.categoryId)
        ? map.get(item.categoryId)! + item.quantity
        : item.quantity
    )
  }

  return Array.from(map, ([id, total]) => ({ id, total }))
}

export function getOrderTotal(items: Order["items"]): number {
  return items.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity
  }, 0)
}

export function rupiah(num: number): string {
  return (
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    })
      .format(num)
      .split(".")
      .slice(0, -1)
      .join(".") + "k"
  )
}
