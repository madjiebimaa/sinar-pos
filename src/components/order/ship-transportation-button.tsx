"use client"

import { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import { ShipTransportation } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useOrder, useOrderActions } from "@/store/order"

interface ShipTransportationButtonProps {
  shipTransportation: {
    value: ShipTransportation
    icon: LucideIcon
  }
}

export default function ShipTransportationButton({
  shipTransportation: { value, icon: Icon },
}: ShipTransportationButtonProps) {
  const order = useOrder()
  const orderActions = useOrderActions()

  return (
    <div className="flex flex-col gap-2">
      <Button
        className={cn(
          "shrink-0 py-0 px-1 h-fit w-fit bg-onyx hover:bg-onyx hover:opacity-50 transition-colors duration-300",
          order.shipTransportation === value && "bg-white hover:bg-white"
        )}
        onClick={() => orderActions.changeShipTransportation(value)}
      >
        <Icon
          className={cn(
            "shrink-0 h-6 w-6 text-white transition-colors duration-300",
            order.shipTransportation === value && "text-woodsmoke"
          )}
        />
      </Button>
    </div>
  )
}
