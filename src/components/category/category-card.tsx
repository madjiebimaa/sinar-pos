"use client"

import { useMemo } from "react"

import { Card, CardContent } from "@/components/ui/card"

import { Category } from "@/lib/types"
import { cn, getCategoryIcon, getCategoryItemsTotal } from "@/lib/utils"
import { useOrder } from "@/store/order"

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const order = useOrder()
  const totalItems = useMemo(
    () => getCategoryItemsTotal(order.items, category.id),
    [order.items, category.id]
  )

  const Icon = getCategoryIcon(category.icon)

  return (
    <Card
      style={{ backgroundColor: category.color }}
      className={cn("border-none")}
    >
      <CardContent className="flex flex-col justify-between h-[130px] w-[130px] p-4">
        <Icon className="shrink-0 h-4 w-4 text-woodsmoke" />
        <div className="flex flex-col gap-1">
          <p className="font-medium text-sm text-woodsmoke">{category.name}</p>
          <span className="text-xs text-granite-gray">{totalItems} items</span>
        </div>
      </CardContent>
    </Card>
  )
}
