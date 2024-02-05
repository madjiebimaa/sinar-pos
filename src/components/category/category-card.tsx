import { Card, CardContent } from "@/components/ui/card"

import { Category } from "@/lib/types"
import { cn, getCategoryCardStyle } from "@/lib/utils"

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { icon: Icon, backgroundColor } = getCategoryCardStyle(category.name)

  return (
    <Card className={cn("border-none", backgroundColor)}>
      <CardContent className="flex flex-col justify-between h-[120px] w-[150px] p-4">
        <Icon className="shrink-0 h-4 w-4" />
        <div className="flex flex-col">
          <p className="font-medium text-sm">{category.name}</p>
        </div>
      </CardContent>
    </Card>
  )
}
