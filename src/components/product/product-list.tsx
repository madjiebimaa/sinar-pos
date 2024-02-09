import ProductCard from "@/components/product/product-card"

import { getProducts } from "@/actions/product"
import { Product } from "@/lib/types"

interface ProductListProps {
  query: string
}

export default async function ProductList({ query }: ProductListProps) {
  const products = await getProducts(query)

  return (
    <section className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-2 overflow-y-scroll">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}
