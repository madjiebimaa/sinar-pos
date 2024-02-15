"use client"

import { Truck } from "lucide-react"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { useOrderActions } from "@/store/order"

interface ShipSwitchProps {
  isNeedToBeShip: boolean
}

export default function ShipSwitch({ isNeedToBeShip }: ShipSwitchProps) {
  const orderActions = useOrderActions()

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="isNeedToBeShip"
        className="data-[state=unchecked]:bg-onyx data-[state=checked]:bg-white"
        checked={isNeedToBeShip}
        onCheckedChange={() => orderActions.toggleNeedToBeShip()}
      />
      <Label htmlFor="isNeedToBeShip">
        <Truck className="shrink-0 h-6 w-6" />
      </Label>
    </div>
  )
}
