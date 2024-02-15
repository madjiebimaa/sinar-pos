"use client"

import { Check } from "lucide-react"

import { CommandItem } from "@/components/ui/command"

import { Customer } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useCustomerActions, useSelectedCustomer } from "@/store/customer"
import { useLayoutActions } from "@/store/layout"

interface CustomerComboboxItemProps {
  customer: Customer
}

export default function CustomerComboboxItem({
  customer,
}: CustomerComboboxItemProps) {
  const selectedCustomer = useSelectedCustomer()
  const customerActions = useCustomerActions()
  const layoutActions = useLayoutActions()

  const handleSelect = () => {
    customerActions.selectCustomer(customer)
    layoutActions.toggleCombobox()
  }

  return (
    <CommandItem
      key={customer.id}
      value={customer.name}
      onSelect={handleSelect}
      className="text-woodsmoke"
    >
      <Check
        className={cn(
          "mr-2 h-4 w-4",
          selectedCustomer && selectedCustomer.id === customer.id
            ? "opacity-100"
            : "opacity-0"
        )}
      />
      {customer.name}
    </CommandItem>
  )
}
