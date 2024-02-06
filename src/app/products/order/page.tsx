import { Plus } from "lucide-react"
import Link from "next/link"

import OrderHeader from "@/components/order/order-header"
import OrderList from "@/components/order/order-list"
import OrderTotal from "@/components/order/order-total"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen max-h-screen">
      <OrderHeader />
      <div className="flex flex-col justify-between gap-4 h-[470px] p-4 overflow-hidden">
        <OrderList />
        <Button
          asChild
          variant="outline"
          className="w-full py-6 bg-woodsmoke text-white border-2 border-onyx"
        >
          <Link href="/products">
            <Plus className="shrink-0 h-4 w-4 mr-2" />
            <span className="font-medium">Add</span>
          </Link>
        </Button>
      </div>
      <OrderTotal />
      <section className="z-10 absolute bottom-0 left-0 right-0 p-4 bg-woodsmoke">
        <Button
          asChild
          className="w-full py-6 rounded-full font-medium bg-white text-woodsmoke"
        >
          <Link href="/products/order">To Pay</Link>
        </Button>
      </section>
    </main>
  )
}
