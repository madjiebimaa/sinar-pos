"use client"

import { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import { PaymentMethod } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useOrder, useOrderActions } from "@/store/order"

interface PaymentMethodButtonProps {
  paymentMethod: {
    value: PaymentMethod
    label: string
    icon: LucideIcon
  }
}

export default function PaymentMethodButton({
  paymentMethod: { value, label, icon: Icon },
}: PaymentMethodButtonProps) {
  const order = useOrder()
  const orderActions = useOrderActions()

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="outline"
        className={cn(
          "shrink-0 py-6 bg-woodsmoke border-onyx transition-colors duration-300",
          order.paymentMethod === value && "bg-white border-white"
        )}
        onClick={() => orderActions.changePaymentMethod(value)}
      >
        <Icon
          className={cn(
            "shrink-0 h-6 w-6 text-white transition-colors duration-300",
            order.paymentMethod === value && "text-woodsmoke"
          )}
        />
      </Button>
      <span className="text-xs text-silver-chalice text-center">{label}</span>
    </div>
  )
}
