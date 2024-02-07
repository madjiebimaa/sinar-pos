import CategoryList from "@/components/category/category-list"
import OrderButton from "@/components/order/order-button"
import ProductList from "@/components/product/product-list"
import ProductSearch from "@/components/product/product-search"
import { Separator } from "@/components/ui/separator"

export default function Page() {
  return (
    <main className="flex flex-col py-4 overflow-hidden pb-[80px]">
      <section className="flex flex-col gap-4">
        <div className="px-4">
          <ProductSearch />
        </div>
        <div className="pl-4">
          <CategoryList />
        </div>
        <div className="px-4">
          <Separator className="bg-onyx" />
        </div>
      </section>
      <div className="flex flex-col gap-2 p-4 overflow-hidden">
        <ProductList />
      </div>
      <div className="z-10 absolute bottom-0 left-0 right-0 p-4 bg-woodsmoke">
        <OrderButton />
      </div>
    </main>
  )
}
