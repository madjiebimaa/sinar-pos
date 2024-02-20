import { Bike, Bus, Car, LucideIcon, Truck } from "lucide-react"

import ShipTransportationButton from "@/components/order/ship-transportation-button"

import { ShipTransportation } from "@/lib/types"

const shipTransportations: {
  value: ShipTransportation
  icon: LucideIcon
}[] = [
  { value: "motorcycle", icon: Bike },
  { value: "car", icon: Car },
  { value: "bus", icon: Bus },
  { value: "truck", icon: Truck },
]

export default function ShipTransportationOptions() {
  return (
    <div className="grid grid-cols-4 gap-2">
      {shipTransportations.map((shipTransportation) => (
        <ShipTransportationButton
          key={shipTransportation.value}
          shipTransportation={shipTransportation}
        />
      ))}
    </div>
  )
}
