import { Card, CardContent } from "@/components/ui/card"

import { OrderItem } from "@/lib/types"

interface OrderCardProps {
  item: OrderItem
  order: number
}

export default function OrderCard({ item, order }: OrderCardProps) {
  return (
    <Card className="border-none bg-onyx">
      <CardContent className="flex justify-between items-center p-4 gap-4">
        <div className="flex items-center gap-2 truncate">
          <span className="flex justify-center items-center rounded-full bg-white h-6 w-6 p-2 text-xs">
            {order}
          </span>
          <div className="flex flex-col truncate">
            <p className="text-sm text-silver-chalice truncate">{item.name}</p>
            <span className="text-xs text-granite-gray">x{item.quantity}</span>
          </div>
        </div>
        <span className="flex justify-center items-center text-sm text-silver-chalice">
          ${item.price * item.quantity}
        </span>
      </CardContent>
    </Card>
  )
}
