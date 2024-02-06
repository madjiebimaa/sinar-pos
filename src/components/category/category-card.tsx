"use client"

import { useMemo } from "react"

import { Card, CardContent } from "@/components/ui/card"

import { Category } from "@/lib/types"
import { cn, getCategoryStyle, getTotalCategoryItems } from "@/lib/utils"
import { useOrder } from "@/store/order"

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const order = useOrder()

  const totalItems = useMemo(
    () => getTotalCategoryItems(order.items, category.name),
    [category.name, order.items]
  )
  const { icon: Icon, backgroundColor } = getCategoryStyle(category.name)

  return (
    <Card className={cn("border-none", backgroundColor)}>
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
