import ProductCard from "@/components/product/product-card"

import { getProducts } from "@/actions/product"
import { Product } from "@/lib/types"

interface ProductListProps {
  filters: {
    query: string
    category: string
  }
}

export default async function ProductList({
  filters: { query, category },
}: ProductListProps) {
  const products = await getProducts({
    name: query,
    category: category,
  })

  return (
    <section className="flex-1 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 overflow-y-auto">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}
