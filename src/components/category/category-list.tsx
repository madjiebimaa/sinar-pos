import CategoryCard from "@/components/category/category-card"

import { getCategories } from "@/actions/category"

export default async function CategoryList() {
  const categories = await getCategories()

  return (
    <section className="flex md:grid md:grid-cols-3 flex-nowrap items-center gap-2 overflow-x-scroll">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </section>
  )
}
