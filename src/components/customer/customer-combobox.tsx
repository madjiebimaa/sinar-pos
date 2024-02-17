"use client"

import { ChevronsUpDown } from "lucide-react"

import AddCustomerButton from "@/components/customer/add-customer-button"
import CustomerComboboxItemList from "@/components/customer/customer-combobox-item-list"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandInput } from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Customer } from "@/lib/types"
import { useSelectedCustomer } from "@/store/customer"
import { useIsComboboxOpen, useLayoutActions } from "@/store/layout"

interface CustomerComboboxProps {
  customers: Customer[]
}

export function CustomerCombobox({ customers }: CustomerComboboxProps) {
  const selectedCustomer = useSelectedCustomer()
  const isComboboxOpen = useIsComboboxOpen()
  const layoutActions = useLayoutActions()

  return (
    <Popover open={isComboboxOpen} onOpenChange={layoutActions.toggleCombobox}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isComboboxOpen}
          className="justify-between text-woodsmoke"
        >
          {selectedCustomer ? selectedCustomer.name : "Select customer..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command className="max-h-[330px]">
          <CommandInput placeholder="Search customer..." className="" />
          <CommandEmpty>
            <AddCustomerButton />
          </CommandEmpty>
          <CustomerComboboxItemList customers={customers} />
        </Command>
      </PopoverContent>
    </Popover>
  )
}
