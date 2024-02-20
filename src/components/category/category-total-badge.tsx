import { Badge } from "@/components/ui/badge"

import { Category } from "@/lib/types"
import { getCategoryIcon } from "@/lib/utils"

interface CategoryTotalBadgeProps {
  category: Category & { total: number }
}

export default async function CategoryTotalBadge({
  category,
}: CategoryTotalBadgeProps) {
  const Icon = getCategoryIcon(category.icon)

  return (
    <Badge
      style={{ backgroundColor: category.color }}
      className="shrink-0 gap-2 text-woodsmoke border-none rounded-md"
    >
      <Icon className="shrink-0 h-4 w-4" />
      <span className="font-semibold">{category.total}</span>
    </Badge>
  )
}
