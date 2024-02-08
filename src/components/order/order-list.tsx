import { getOrders } from "@/actions/order"
import OrderCard from "@/components/order/order-card"

export default async function OrderList() {
  const orders = await getOrders()

  return (
    <section className="flex flex-col gap-2 px-4 overflow-y-scroll">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </section>
  )
}
