import { clsx, type ClassValue } from "clsx"
import { Bolt, Cuboid, Droplet, InspectionPanel, Zap } from "lucide-react"
import { twMerge } from "tailwind-merge"

import { Category, CategoryStyle } from "@/lib/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const categories: Map<Category["name"], CategoryStyle> = new Map([
  ["Concrete and Masonry", { icon: Cuboid, backgroundColor: "bg-green-100" }],
  ["Fasteners and Hardware", { icon: Bolt, backgroundColor: "bg-cyan-100" }],
  [
    "Flooring Materials",
    { icon: InspectionPanel, backgroundColor: "bg-yellow-100" },
  ],
  ["Plumbing Materials", { icon: Droplet, backgroundColor: "bg-blue-100" }],
  ["Electrical Supplies", { icon: Zap, backgroundColor: "bg-red-100" }],
])

export function getCategoryCardStyle(name: Category["name"]): CategoryStyle {
  return categories.get(name)!
}
