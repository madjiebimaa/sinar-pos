import { Trash } from "lucide-react"

import { Button } from "@/components/ui/button"

import { deleteOrderById, shipOrderById } from "@/actions/order"
import { Order } from "@/lib/types"

interface OrderActionButtonsProps {
  order: Order
}

export default function OrderActionButtons({ order }: OrderActionButtonsProps) {
  const deleteOrder = deleteOrderById.bind(null, order.id)
  const shipOrder = shipOrderById.bind(null, order.id)

  return (
    <div className="flex items-center md:justify-between gap-2 pt-4">
      <form action={deleteOrder}>
        <Button
          type="submit"
          variant="outline"
          className="shrink-0 h-10 w-10 p-0 bg-transparent hover:bg-transparent border-silver-chalice hover:opacity-50"
        >
          <Trash className="shrink-0 h-5 w-5 text-silver-chalice" />
        </Button>
      </form>
      <form action={shipOrder}>
        <Button className="w-[120px] px-6 font-semibold text-white border bg-granite-gray hover:bg-granite-gray border-granite-gray hover:opacity-50">
          {order.isShipped ? "Shipped" : "Ship"}
        </Button>
      </form>
    </div>
  )
}
