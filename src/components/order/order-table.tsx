import { useMemo } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Order } from "@/lib/types"
import { cn, getOrderTotal, rupiah } from "@/lib/utils"

interface OrderTableProps {
  order: Order
}

export default function OrderTable({ order }: OrderTableProps) {
  const total = useMemo(() => getOrderTotal(order.items), [order.items])

  const rowHeadStyles = {
    className: "h-fit p-2 font-semibold text-silver-chalice",
  }

  const rowCellStyles = {
    className: "p-2 text-white",
  }

  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow className="border-none hover:bg-transparent">
          <TableHead className={cn(rowHeadStyles.className, "pl-0 text-left")}>
            QT
          </TableHead>
          <TableHead className={cn(rowHeadStyles.className)}>Items</TableHead>
          <TableHead className={cn(rowHeadStyles.className, "pr-0 text-right")}>
            Price
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {order.items.map((item) => (
          <TableRow key={item.id} className="border-none hover:bg-transparent">
            <TableCell
              className={cn(rowCellStyles.className, "pl-1 text-left")}
            >
              {item.quantity}
            </TableCell>
            <TableCell className={cn(rowCellStyles.className)}>
              {item.name}
            </TableCell>
            <TableCell
              className={cn(rowCellStyles.className, "pr-0 text-right")}
            >
              {rupiah(item.price)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="bg-transparent border-none">
        <TableRow className="border-none hover:bg-transparent">
          <TableCell
            colSpan={2}
            className={cn(
              rowCellStyles.className,
              "pl-0 font-semibold text-silver-chalice text-left"
            )}
          >
            Total
          </TableCell>
          <TableCell
            className={cn(
              rowCellStyles.className,
              "pr-0 font-semibold text-right"
            )}
          >
            {rupiah(total)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
