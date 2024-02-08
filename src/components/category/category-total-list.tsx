import CategoryTotalBadge from "@/components/category/category-total-badge"

import { Category } from "@/lib/types"

interface CategoryTotalListProps {
  categories: {
    id: Category["id"]
    total: number
  }[]
}

export default function CategoryTotalList({
  categories,
}: CategoryTotalListProps) {
  return (
    <section className="flex flex-wrap items-center gap-2">
      {categories.map((category) => (
        <CategoryTotalBadge key={category.id} category={category} />
      ))}
    </section>
  )
}
