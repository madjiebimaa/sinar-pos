import { CustomerCombobox } from "@/components/customer/customer-combobox"
import OrderHeader from "@/components/order/order-header"
import OrderItemList from "@/components/order/order-item-list"
import OrderTotal from "@/components/order/order-total"
import PayButton from "@/components/order/pay-button"

import { getCustomers } from "@/actions/customer"

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string }
}) {
  const query = searchParams?.query || ""
  const customers = await getCustomers({ name: query })

  return (
    <main className="flex flex-col gap-4 min-h-screen max-h-screen p-4">
      <OrderHeader />
      <CustomerCombobox customers={customers} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <OrderItemList />
      </div>
      <OrderTotal />
      <div className="z-10 sticky bottom-0 left-0 right-0">
        <PayButton />
      </div>
    </main>
  )
}
