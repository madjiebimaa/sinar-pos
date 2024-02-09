"use client"

import { Trash } from "lucide-react"

import { Button } from "@/components/ui/button"

import { OrderItem } from "@/lib/types"
import { useOrderActions } from "@/store/order"

interface DeleteOrderItemButtonProps {
  item: OrderItem
}

export default function DeleteOrderItemButton({
  item,
}: DeleteOrderItemButtonProps) {
  const orderActions = useOrderActions()

  return (
    <Button
      variant="outline"
      className="absolute left-3 shrink-0 h-8 w-8 p-0 bg-onyx hover:bg-granite-gray border-silver-chalice transition-all duration-300 opacity-0 invisible group-hover/order-item-card:opacity-100 group-hover/order-item-card:visible"
      onClick={() => orderActions.removeItem(item.id)}
    >
      <Trash className="shrink-0 h-4 w-4 text-silver-chalice" />
    </Button>
  )
}
