"use client"

import { Minus, MoveRight, Plus } from "lucide-react"
import { useMemo } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { Product } from "@/lib/types"
import { cn, getCategoryStyle } from "@/lib/utils"
import { useOrder, useOrderActions } from "@/store/order"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const order = useOrder()
  const orderActions = useOrderActions()

  const orderItem = useMemo(
    () => order.items.find((item) => item.id === product.id),
    [order.items, product.id]
  )
  const { borderColor, backgroundColor } = getCategoryStyle(
    product.category.name
  )

  const handleDecreaseQuantity = () => {
    if (orderItem) {
      if (orderItem.quantity > 1) {
        orderActions.decreaseItemQuantity(orderItem.id)
      } else {
        orderActions.removeItem(orderItem.id)
      }
    }
  }

  const handleIncreaseQuantity = () => {
    if (orderItem) {
      orderActions.increaseItemQuantity(orderItem.id)
    } else {
      orderActions.addItem(product)
    }
  }

  return (
    <Card
      className={cn(
        "border-y-0 border-r-0 border-l-8 border-l-slate-950 transition-all duration-500",
        borderColor,
        orderItem && orderItem.quantity > 0 && backgroundColor
      )}
    >
      <CardContent className="flex flex-col justify-between h-[120px] p-2">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-1">
            <span className="font-light text-xs text-slate-600">Orders</span>
            <MoveRight className="shrink-0 h-4 w-4 text-slate-600" />
            <span className="font-light text-xs text-slate-600">
              {product.category.name}
            </span>
          </div>
          <div className="flex flex-col">
            <p className="font-medium truncate">{product.name}</p>
            <span className="text-sm text-slate-600">${product.price}</span>
          </div>
        </div>
        <div className="flex justify-end items-center space-x-3 p-2">
          <Button
            variant="outline"
            className="shrink-0 h-fit w-fit p-0 border-slate-950 bg-transparent hover:bg-transparent hover:opacity-50"
            onClick={handleDecreaseQuantity}
          >
            <Minus className="shrink-0 h-5 w-5 text-slate-950" />
          </Button>
          <span className="text-sm text-slate-950 text-center w-[20px]">
            {orderItem ? orderItem.quantity : 0}
          </span>
          <Button
            variant="outline"
            className="shrink-0 h-fit w-fit p-0 border-slate-950 bg-transparent hover:bg-transparent hover:opacity-50"
            onClick={handleIncreaseQuantity}
          >
            <Plus className="shrink-0 h-5 w-5 text-slate-950" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
