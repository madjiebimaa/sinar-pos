import CategoryList from "@/components/category/category-list"
import OrderButton from "@/components/order/order-button"
import ProductList from "@/components/product/product-list"
import ProductSearch from "@/components/product/product-search"
import { Separator } from "@/components/ui/separator"

export default function Page() {
  return (
    <main className="flex flex-col gap-4 p-4 overflow-hidden">
      <section className="flex flex-col gap-4">
        <ProductSearch />
        <CategoryList />
        <Separator className="bg-onyx" />
      </section>
      <div className="flex flex-col overflow-hidden">
        <ProductList />
      </div>
      <div className="z-10 sticky bottom-0 left-0 right-0">
        <OrderButton />
      </div>
    </main>
  )
}
