"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import { addOrder } from "@/actions/order"
import { useOrder, useOrderActions, useOrderVisualId } from "@/store/order"

export default function PayButton() {
  const orderVisualId = useOrderVisualId()
  const order = useOrder()
  const orderActions = useOrderActions()

  const handleClick = async () => {
    if (order.items.length === 0) {
      toast("No Orders Yet", {
        description:
          "It looks like you haven't placed any orders yet. Not to worry!",
      })
    } else {
      await addOrder({ ...order, visualId: orderVisualId! })
      orderActions.reset()
      orderActions.createOrderVisualId()
    }
  }

  return (
    <Button
      className="w-full py-6 rounded-full font-medium bg-white hover:bg-white text-woodsmoke hover:opacity-50"
      onClick={handleClick}
    >
      To Pay
    </Button>
  )
}
