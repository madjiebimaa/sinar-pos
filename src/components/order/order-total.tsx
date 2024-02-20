"use client"

import { useMemo } from "react"

import PaymentMethodOptions from "@/components/order/payment-method-options"
import ShipAddressTextArea from "@/components/order/ship-address-text-area"
import ShipSwitch from "@/components/order/ship-switch"
import ShipTransportationOptions from "@/components/order/ship-transportation-options"

import { getOrderTotal, rupiah } from "@/lib/utils"
import { useOrder } from "@/store/order"

export default function OrderTotal() {
  const order = useOrder()
  const total = useMemo(() => getOrderTotal(order.items), [order.items])

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-center pt-4 border-t-4 border-dotted border-silver-chalice">
        <p>Total</p>
        <span className="font-semibold">{total !== 0 && rupiah(total)}</span>
      </div>
      <div className="flex justify-between items-center">
        <ShipSwitch isNeedToBeShip={order.isNeedToBeShip} />
        {order.isNeedToBeShip && <ShipTransportationOptions />}
      </div>
      <ShipAddressTextArea shipAddress={order.shipAddress} />
      <PaymentMethodOptions />
    </section>
  )
}
