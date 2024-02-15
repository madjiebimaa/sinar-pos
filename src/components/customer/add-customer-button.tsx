"use client"

import { useCommandState } from "cmdk"

import { Button } from "@/components/ui/button"

import { addCustomer } from "@/actions/customer"
import { useCustomerActions } from "@/store/customer"
import { useLayoutActions } from "@/store/layout"

export default function AddCustomerButton() {
  const name = useCommandState((state) => state.search)
  const customerActions = useCustomerActions()
  const layoutActions = useLayoutActions()

  const handleClick = async () => {
    const customer = await addCustomer(name)
    customerActions.selectCustomer(customer)
    layoutActions.toggleCombobox()
  }

  return (
    <Button
      className="py-6 rounded-full font-bold text-white bg-woodsmoke hover:bg-woodsmoke hover:opacity-50"
      onClick={handleClick}
    >
      Add a new Customer
    </Button>
  )
}
