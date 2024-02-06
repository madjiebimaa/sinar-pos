import ProductCard from "@/components/product/product-card"

import { getProducts } from "@/actions/product"
import { Product } from "@/lib/types"

export default async function ProductList() {
  const products = await getProducts()

  return (
    <section className="grid grid-cols-1 gap-2 p-4 pb-[80px] flex-1 overflow-y-scroll ">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}
