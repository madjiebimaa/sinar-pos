import OrderHeader from "@/components/order/order-header"
import OrderItemList from "@/components/order/order-item-list"
import OrderTotal from "@/components/order/order-total"
import PayButton from "@/components/order/pay-button"

export default function Page() {
  return (
    <main className="flex flex-col gap-4 min-h-screen max-h-screen p-4">
      <OrderHeader />
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
