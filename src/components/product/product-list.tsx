import ProductCard from "@/components/product/product-card"

import { getProducts } from "@/actions/product"
import { Product } from "@/lib/types"

export default async function ProductList() {
  const products = await getProducts()

  return (
    <section className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-y-scroll">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}
