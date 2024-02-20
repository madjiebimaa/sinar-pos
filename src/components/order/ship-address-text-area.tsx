"use client"

import { useDebouncedCallback } from "use-debounce"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { useOrderActions } from "@/store/order"

interface ShipAddressTextAreaProps {
  shipAddress: string
}

export default function ShipAddressTextArea({
  shipAddress,
}: ShipAddressTextAreaProps) {
  const orderActions = useOrderActions()

  const setShipAddress = useDebouncedCallback((shipAddress: string) => {
    orderActions.addShipAddress(shipAddress)
  }, 300)

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="shipAddress">Ship Address</Label>
      <Textarea
        id="shipAddress"
        placeholder="Type your ship address here."
        className="text-woodsmoke"
        defaultValue={shipAddress}
        onChange={(event) => setShipAddress(event.target.value)}
      />
    </div>
  )
}
