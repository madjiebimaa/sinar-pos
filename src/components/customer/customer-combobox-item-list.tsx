import CustomerComboboxItem from "@/components/customer/customer-combobox-item"
import { CommandGroup } from "@/components/ui/command"

import { Customer } from "@/lib/types"

interface CustomerComboboxItemListProps {
  customers: Customer[]
}

export default function CustomerComboboxItemList({
  customers,
}: CustomerComboboxItemListProps) {
  return (
    <CommandGroup className="overflow-y-auto my-2">
      {customers.map((customer) => (
        <CustomerComboboxItem key={customer.id} customer={customer} />
      ))}
    </CommandGroup>
  )
}
