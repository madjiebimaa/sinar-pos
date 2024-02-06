import Link from "next/link"

import CategoryList from "@/components/category/category-list"
import Navbar from "@/components/internal/navbar"
import Overlay from "@/components/internal/overlay"
import Sidebar from "@/components/internal/sidebar"
import ProductList from "@/components/product/product-list"
import ProductSearch from "@/components/product/product-search"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Page() {
  return (
    <div className="flex min-h-screen max-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
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
        </main>
        <div className="z-10 absolute bottom-0 left-0 right-0 p-4 bg-woodsmoke">
          <Button
            asChild
            className="w-full py-6 rounded-full bg-white hover:bg-white font-medium text-woodsmoke hover:opacity-50"
          >
            <Link href="/products/order">Add to Order</Link>
          </Button>
        </div>
        <Overlay />
      </div>
    </div>
  )
}
