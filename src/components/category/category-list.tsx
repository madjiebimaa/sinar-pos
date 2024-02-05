import CategoryCard from "@/components/category/category-card"

import { getCategories } from "@/actions/category"

export default async function CategoryList() {
  const categories = await getCategories()

  return (
    <section className="flex flex-nowrap items-center gap-2 overflow-x-scroll pl-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </section>
  )
}
