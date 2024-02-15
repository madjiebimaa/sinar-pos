import { LucideIcon, Truck } from "lucide-react"

import { Order } from "@/lib/types"
import { getOrderPaymentMethodIcon } from "@/lib/utils"

interface OrderCardIconsProps {
  order: Order
}

export default function OrderCardIcons({ order }: OrderCardIconsProps) {
  const orderIcons: { icon: LucideIcon; isVisible: boolean }[] = [
    {
      icon: getOrderPaymentMethodIcon(order.paymentMethod),
      isVisible: true,
    },
    {
      icon: Truck,
      isVisible: order.isNeedToBeShip,
    },
  ]

  return (
    <section className="flex items-center gap-2">
      {orderIcons.map(
        ({ icon: Icon, isVisible }) =>
          isVisible && (
            <Icon
              key={Icon.displayName}
              className="shrink-0 h-5 w-5 text-silver-chalice"
            />
          )
      )}
    </section>
  )
}
