"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import { useOrder, useOrderActions } from "@/store/order"

export default function OrderButton() {
  const router = useRouter()
  const order = useOrder()
  const orderActions = useOrderActions()

  const handleClick = () => {
    if (order.items.length === 0) {
      toast("No Orders Yet", {
        description:
          "It looks like you haven't placed any orders yet. Not to worry!",
      })
    } else {
      orderActions.createOrderVisualId()
      router.push("/mobile/order")
    }
  }

  return (
    <Button
      className="w-full py-6 rounded-full font-bold text-woodsmoke bg-white hover:bg-white hover:opacity-50"
      onClick={handleClick}
    >
      Add to Order
    </Button>
  )
}
