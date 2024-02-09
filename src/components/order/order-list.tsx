import OrderCard from "@/components/order/order-card"

import { getOrders } from "@/actions/order"

export default async function OrderList() {
  const orders = await getOrders()

  return (
    <section className="flex flex-1 flex-col md:block md:columns-2 lg:columns-3 gap-2 overflow-auto">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </section>
  )
}
