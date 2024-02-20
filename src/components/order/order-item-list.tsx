"use client"

import OrderItemCard from "@/components/order/order-item-card"

import { useOrder } from "@/store/order"

export default function OrderItemList() {
  const order = useOrder()

  return (
    <section className="flex flex-col gap-2 overflow-y-auto">
      {order.items.map((item, index) => (
        <OrderItemCard key={item.id} item={item} serialNumber={index + 1} />
      ))}
    </section>
  )
}
