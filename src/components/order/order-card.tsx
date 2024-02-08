import { useMemo } from "react"

import CategoryTotalList from "@/components/category/category-total-list"
import OrderActionButtons from "@/components/order/order-action-buttons"
import OrderTable from "@/components/order/order-table"
import { Card, CardContent } from "@/components/ui/card"

import { Order } from "@/lib/types"
import { getCategoriesItemsTotal, getOrderPaymentMethodIcon } from "@/lib/utils"

interface OrderCardProps {
  order: Order
}

export default function OrderCard({ order }: OrderCardProps) {
  const categories = useMemo(
    () => getCategoriesItemsTotal(order.items),
    [order.items]
  )

  const Icon = getOrderPaymentMethodIcon(order.paymentMethod)

  return (
    <Card className="bg-onyx border-none md:max-w-[250px]">
      <CardContent className="flex flex-col p-4">
        <section className="flex flex-col gap-2 pb-4 border-b-4 border-dotted border-silver-chalice">
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-1">
              <p className="text-silver-chalice">Order</p>
              <span className="text-white">#{order.visualId}</span>
            </div>
            <Icon className="shrink-0 h-5 w-5 text-silver-chalice" />
          </div>
          <CategoryTotalList categories={categories} />
        </section>
        <OrderTable order={order} />
        <OrderActionButtons order={order} />
      </CardContent>
    </Card>
  )
}
