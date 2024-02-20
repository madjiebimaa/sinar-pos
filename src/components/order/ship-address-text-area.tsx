"use client"

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

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="shipAddress">Ship Address</Label>
      <Textarea
        id="shipAddress"
        placeholder="Type your ship address here."
        className="text-woodsmoke"
        value={shipAddress}
        onChange={(event) => orderActions.addShipAddress(event.target.value)}
      />
    </div>
  )
}
