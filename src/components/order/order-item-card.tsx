import DeleteOrderItemButton from "@/components/order/delete-order-item-button"
import { Card, CardContent } from "@/components/ui/card"

import { OrderItem } from "@/lib/types"
import { rupiah } from "@/lib/utils"

interface OrderItemCardProps {
  item: OrderItem
  serialNumber: number
}

export default function OrderItemCard({
  item,
  serialNumber,
}: OrderItemCardProps) {
  return (
    <Card className="border-none bg-onyx">
      <CardContent className="group/order-item-card relative flex justify-between items-center p-4 gap-4">
        <div className="flex items-center gap-4 truncate">
          <DeleteOrderItemButton item={item} />
          <span className="flex justify-center items-center rounded-full bg-white h-6 w-6 p-2 text-xs">
            {serialNumber}
          </span>
          <div className="flex flex-col truncate">
            <p className="text-sm text-silver-chalice truncate">{item.name}</p>
            <span className="text-xs text-granite-gray">x{item.quantity}</span>
          </div>
        </div>
        <span className="flex justify-center items-center text-sm text-silver-chalice">
          {rupiah(item.price * item.quantity)}
        </span>
      </CardContent>
    </Card>
  )
}
