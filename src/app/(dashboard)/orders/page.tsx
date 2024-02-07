import OrderList from "@/components/order/order-list"

export default function Page() {
  return (
    <main className="flex flex-col py-4 overflow-hidden">
      <section className="flex flex-col gap-4 overflow-hidden">
        <div className="flex justify-between items-center px-4">
          <h2 className="font-medium text-xl">Orders</h2>
        </div>
        <OrderList />
      </section>
    </main>
  )
}
