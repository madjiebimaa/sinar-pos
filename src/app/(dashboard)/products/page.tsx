import CategoryList from "@/components/category/category-list"
import { CustomerCombobox } from "@/components/customer/customer-combobox"
import SearchInput from "@/components/internal/search-input"
import OrderButton from "@/components/order/order-button"
import OrderHeader from "@/components/order/order-header"
import OrderItemList from "@/components/order/order-item-list"
import OrderTotal from "@/components/order/order-total"
import PayButton from "@/components/order/pay-button"
import ProductList from "@/components/product/product-list"
import { Separator } from "@/components/ui/separator"

import { getCustomers } from "@/actions/customer"

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string
    category?: string
  }
}) {
  const query = searchParams?.query || ""
  const category = searchParams?.category || ""

  const customers = await getCustomers()

  return (
    <main className="flex h-full overflow-hidden">
      <section className="flex flex-1 flex-col gap-4 p-4 overflow-hidden">
        <section className="flex flex-col gap-4">
          <SearchInput placeholder="Search product..." />
          <CategoryList />
          <Separator className="bg-onyx" />
        </section>
        <div className="flex flex-col overflow-hidden">
          <ProductList filters={{ query, category }} />
        </div>
        <div className="z-10 sticky md:hidden bottom-0 left-0 right-0">
          <OrderButton />
        </div>
      </section>
      <section className="hidden md:flex flex-col gap-4 p-4 min-w-[320px] max-w-[320px]">
        <OrderHeader />
        <CustomerCombobox customers={customers} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <OrderItemList />
        </div>
        <OrderTotal />
        <div className="z-10 sticky bottom-0 left-0 right-0">
          <PayButton />
        </div>
      </section>
    </main>
  )
}
