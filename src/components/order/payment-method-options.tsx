import { CircleDollarSign, CreditCard, LucideIcon, QrCode } from "lucide-react"

import PaymentMethodButton from "@/components/order/payment-method-button"

import { PaymentMethod } from "@/lib/types"

const paymentMethods: {
  value: PaymentMethod
  label: string
  icon: LucideIcon
}[] = [
  { value: "cash", label: "Cash", icon: CircleDollarSign },
  { value: "debit card", label: "Debit Card", icon: CreditCard },
  { value: "e-wallet", label: "E-Wallet", icon: QrCode },
]

export default function PaymentMethodOptions() {
  return (
    <section className="flex flex-col gap-2">
      <p className="text-sm text-silver-chalice">Payment Method</p>
      <div className="grid grid-cols-3 gap-2">
        {paymentMethods.map((paymentMethod) => (
          <PaymentMethodButton
            key={paymentMethod.value}
            paymentMethod={paymentMethod}
          />
        ))}
      </div>
    </section>
  )
}
