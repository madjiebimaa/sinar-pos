"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import { addOrder } from "@/actions/order"
import { useCustomerActions, useSelectedCustomer } from "@/store/customer"
import { useOrder, useOrderActions, useOrderVisualId } from "@/store/order"

export default function PayButton() {
  const orderVisualId = useOrderVisualId()
  const order = useOrder()
  const selectedCustomer = useSelectedCustomer()
  const orderActions = useOrderActions()
  const customerActions = useCustomerActions()

  const handleClick = async () => {
    if (order.items.length === 0) {
      toast("No Orders Yet", {
        description:
          "It looks like you haven't placed any orders yet. Not to worry!",
      })
    } else {
      await addOrder({
        ...order,
        visualId: orderVisualId!,
        customer: selectedCustomer,
      })
      
      orderActions.reset()
      customerActions.reset()
      orderActions.createOrderVisualId()
    }
  }

  return (
    <Button
      className="w-full py-6 rounded-full font-bold text-woodsmoke bg-white hover:bg-white hover:opacity-50"
      onClick={handleClick}
    >
      To Pay
    </Button>
  )
}
