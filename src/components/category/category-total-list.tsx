import { useMemo } from "react"

import CategoryTotalBadge from "@/components/category/category-total-badge"

import { Order } from "@/lib/types"
import { getCategoriesItemsTotal } from "@/lib/utils"

interface CategoryTotalListProps {
  items: Order["items"]
}

export default function CategoryTotalList({ items }: CategoryTotalListProps) {
  const categories = useMemo(() => getCategoriesItemsTotal(items), [items])

  return (
    <section className="flex flex-wrap items-center gap-2">
      {categories.map((category) => (
        <CategoryTotalBadge key={category.id} category={category} />
      ))}
    </section>
  )
}
