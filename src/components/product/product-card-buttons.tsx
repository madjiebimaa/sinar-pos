"use client"

import { Minus, Plus } from "lucide-react"

import { Button, ButtonProps } from "@/components/ui/button"

import { OrderItem, Product } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useOrderActions } from "@/store/order"

interface ProductCardButtonsProps {
  orderItem?: OrderItem
  product: Product
}

export default function ProductCardButtons({
  orderItem,
  product,
}: ProductCardButtonsProps) {
  const orderActions = useOrderActions()

  const isProductSelected = orderItem && orderItem.quantity > 0

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

  const buttonStyles: ButtonProps = {
    variant: "outline",
    className: cn(
      "shrink-0 h-fit w-fit p-0 border-white text-white hover:text-white bg-transparent hover:bg-transparent hover:opacity-50",
      isProductSelected &&
        "border-woodsmoke text-woodsmoke hover:text-woodsmoke"
    ),
  }

  const buttonIconStyles = {
    className: "shrink-0 h-5 w-5",
  }

  return (
    <div className="flex justify-end items-center gap-3 p-2">
      <Button {...buttonStyles} onClick={handleDecreaseQuantity}>
        <Minus {...buttonIconStyles} />
      </Button>
      <span
        className={cn(
          "text-sm text-white text-center w-[20px]",
          isProductSelected && "text-woodsmoke"
        )}
      >
        {orderItem ? orderItem.quantity : 0}
      </span>
      <Button {...buttonStyles} onClick={handleIncreaseQuantity}>
        <Plus {...buttonIconStyles} />
      </Button>
    </div>
  )
}
