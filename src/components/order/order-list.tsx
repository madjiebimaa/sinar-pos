"use client"

import OrderCard from "@/components/order/order-card"

import { useOrder } from "@/store/order"

export default function OrderList() {
  const order = useOrder()

  return (
    <section className="flex flex-col gap-2 overflow-y-scroll">
      {order.items.map((item, index) => (
        <OrderCard key={item.id} item={item} order={index + 1} />
      ))}
    </section>
  )
}
