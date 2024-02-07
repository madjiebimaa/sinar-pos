"use client"

import { Edit, LucideIcon, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Order } from "@/lib/types"
import { useOrderActions } from "@/store/order"

interface OrderActionButtonsProps {
  order: Order
}

export default function OrderActionButtons({ order }: OrderActionButtonsProps) {
  const orderActions = useOrderActions()

  const buttonActions: { icon: LucideIcon; handleClick: () => void }[] = [
    {
      icon: Trash,
      handleClick: () => orderActions.deleteOrder(order.id),
    },
    {
      icon: Edit,
      handleClick: () =>
        orderActions.updateOrder(order.id, {
          isShipped: false,
          items: [],
          paymentMethod: "cash",
        }),
    },
  ]

  return (
    <div className="flex items-center md:justify-between gap-2 pt-4">
      {buttonActions.map(({ icon: Icon, handleClick }) => (
        <Button
          key={Icon.displayName}
          variant="outline"
          className="shrink-0 h-10 w-10 p-0 bg-transparent hover:bg-transparent border-silver-chalice hover:opacity-50"
          onClick={handleClick}
        >
          <Icon className="shrink-0 h-5 w-5 text-silver-chalice" />
        </Button>
      ))}
      <Button
        className="w-[120px] px-6 font-semibold text-white border bg-granite-gray hover:bg-granite-gray border-granite-gray hover:opacity-50"
        onClick={() => orderActions.toggleShipOrder(order.id)}
      >
        {order.isShipped ? "Ship" : "Shipped"}
      </Button>
    </div>
  )
}
