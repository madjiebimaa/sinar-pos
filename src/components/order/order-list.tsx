"use client"

import OrderCard from "@/components/order/order-card"

import { useOrders } from "@/store/order"

export default function OrderList() {
  const orders = useOrders()

  return (
    <section className="flex flex-col gap-2 px-4 overflow-y-scroll">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </section>
  )
}
