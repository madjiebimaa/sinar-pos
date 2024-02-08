import { Badge } from "@/components/ui/badge"

import { getCategoryById } from "@/actions/category"
import { Category } from "@/lib/types"
import { getCategoryIcon } from "@/lib/utils"

interface CategoryTotalBadgeProps {
  category: {
    id: Category["id"]
    total: number
  }
}

export default async function CategoryTotalBadge({
  category,
}: CategoryTotalBadgeProps) {
  const categoryDetails = await getCategoryById(category.id)

  const Icon = getCategoryIcon(categoryDetails.icon)

  return (
    <Badge
      style={{ backgroundColor: categoryDetails.color }}
      className="shrink-0 gap-2 text-woodsmoke border-none rounded-md"
    >
      <Icon className="shrink-0 h-4 w-4" />
      <span className="font-semibold">{category.total}</span>
    </Badge>
  )
}
