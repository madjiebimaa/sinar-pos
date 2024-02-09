"use client"

import { useMemo } from "react"

import { Card, CardContent } from "@/components/ui/card"

import { Category } from "@/lib/types"
import { cn, getCategoryIcon, getCategoryItemsTotal } from "@/lib/utils"
import { useOrder } from "@/store/order"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const order = useOrder()
  const totalItems = useMemo(
    () => getCategoryItemsTotal(order.items, category.id),
    [order.items, category.id]
  )

  const Icon = getCategoryIcon(category.icon)
  const isCategoryCardActive = searchParams.get("category") === category.name

  const handleClick = () => {
    const params = new URLSearchParams(searchParams)
    params.get("category") === category.name
      ? params.delete("category")
      : params.set("category", category.name)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Card
      style={{
        backgroundColor: isCategoryCardActive ? "#292c2d" : category.color,
      }}
      className="border-none cursor-pointer transition-opacity hover:opacity-50"
      onClick={handleClick}
    >
      <CardContent className="flex flex-col justify-between h-[130px] w-[130px] p-4">
        <Icon
          className={cn(
            "shrink-0 h-5 w-5 text-woodsmoke",
            isCategoryCardActive && "text-white"
          )}
        />
        <div className="flex flex-col gap-1">
          <p
            className={cn(
              "font-medium text-sm text-woodsmoke",
              isCategoryCardActive && "text-white"
            )}
          >
            {category.name}
          </p>
          <span className="text-xs text-granite-gray">{totalItems} items</span>
        </div>
      </CardContent>
    </Card>
  )
}
