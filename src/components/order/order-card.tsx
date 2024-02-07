import OrderActionButtons from "@/components/order/order-action-buttons"
import OrderTable from "@/components/order/order-table"
import { Card, CardContent } from "@/components/ui/card"

import { Order } from "@/lib/types"
import { getOrderPaymentMethodIcon } from "@/lib/utils"

interface OrderCardProps {
  order: Order
}

export default function OrderCard({ order }: OrderCardProps) {
  const Icon = getOrderPaymentMethodIcon(order.paymentMethod)

  return (
    <Card className="bg-onyx border-none md:max-w-[230px]">
      <CardContent className="flex flex-col p-4">
        <div className="flex justify-between items-center gap-2 pb-4 border-b-4 border-dotted border-silver-chalice">
          <div className="flex items-center gap-1">
            <p className="text-silver-chalice">Order</p>
            <span className="text-white">#{order.id}</span>
          </div>
          <Icon className="shrink-0 h-5 w-5 text-silver-chalice" />
        </div>
        <OrderTable order={order} />
        <OrderActionButtons order={order} />
      </CardContent>
    </Card>
  )
}
