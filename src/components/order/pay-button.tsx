"use client"

import { Button } from "@/components/ui/button"

import { addOrder } from "@/actions/order"
import { useOrder, useOrderActions, useOrderVisualId } from "@/store/order"

export default function PayButton() {
  const orderVisualId = useOrderVisualId()
  const order = useOrder()
  const orderActions = useOrderActions()

  const handleClick = async () => {
    await addOrder({ ...order, visualId: orderVisualId! })
    orderActions.reset()
    orderActions.createOrderVisualId()
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
