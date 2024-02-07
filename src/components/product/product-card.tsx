"use client"

import { MoveRight } from "lucide-react"
import { useMemo } from "react"

import ProductCardButtons from "@/components/product/product-card-buttons"
import { Card, CardContent } from "@/components/ui/card"

import { Product } from "@/lib/types"
import { cn, getCategoryStyle } from "@/lib/utils"
import { useOrder } from "@/store/order"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const order = useOrder()

  const orderItem = useMemo(
    () => order.items.find((item) => item.id === product.id),
    [order.items, product.id]
  )
  const { borderColor, backgroundColor } = getCategoryStyle(
    product.category.name
  )

  const isProductSelected = orderItem && orderItem.quantity > 0

  return (
    <Card
      className={cn(
        "bg-onyx border-y-0 border-r-0 border-l-8 transition-all duration-500",
        borderColor,
        isProductSelected && backgroundColor
      )}
    >
      <CardContent className="flex flex-col justify-between h-[120px] p-4">
        <section className="flex flex-col gap-2">
          <div
            className={cn(
              "flex items-center gap-1 text-silver-chalice",
              isProductSelected && "text-onyx"
            )}
          >
            <span className="font-light text-xs">Orders</span>
            <MoveRight className="shrink-0 h-4 w-4" />
            <span className="font-light text-xs">{product.category.name}</span>
          </div>
          <div className="flex flex-col">
            <p
              className={cn(
                "font-medium text-white truncate",
                isProductSelected && "text-woodsmoke"
              )}
            >
              {product.name}
            </p>
            <span
              className={cn(
                "text-sm text-silver-chalice",
                isProductSelected && "text-onyx"
              )}
            >
              ${product.price}
            </span>
          </div>
        </section>
        <ProductCardButtons orderItem={orderItem} product={product} />
      </CardContent>
    </Card>
  )
}
