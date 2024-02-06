"use client"

import { CircleDollarSign, CreditCard, LucideIcon, QrCode } from "lucide-react"
import { useMemo } from "react"

import PaymentMethodButton from "@/components/order/payment-method-button"

import { PaymentMethod } from "@/lib/types"
import { getOrderTotal } from "@/lib/utils"
import { useOrder } from "@/store/order"

const paymentMethods: {
  value: PaymentMethod
  label: string
  icon: LucideIcon
}[] = [
  { value: "cash", label: "Cash", icon: CircleDollarSign },
  { value: "debit card", label: "Debit Card", icon: CreditCard },
  { value: "e-wallet", label: "E-Wallet", icon: QrCode },
]

export default function OrderTotal() {
  const order = useOrder()
  const total = useMemo(() => getOrderTotal(order.items), [order.items])

  return (
    <section className="flex flex-col p-4 gap-8">
      <div className="flex justify-between items-center pt-2 border-t-4 border-dotted border-silver-chalice">
        <p>Total</p>
        <span className="font-semibold">${total}</span>
      </div>
      <section className="flex flex-col gap-2">
        <p className="text-sm text-silver-chalice">Payment Method</p>
        <section className="grid grid-cols-3 gap-2">
          {paymentMethods.map((paymentMethod) => (
            <PaymentMethodButton
              key={paymentMethod.value}
              paymentMethod={paymentMethod}
            />
          ))}
        </section>
      </section>
    </section>
  )
}
