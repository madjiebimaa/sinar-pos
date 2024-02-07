"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

import { useOrderActions } from "@/store/order"

export default function PayButton() {
  const router = useRouter()
  const orderActions = useOrderActions()

  const handleClick = () => {
    orderActions.addOrder()
    router.push("/products")
  }

  return (
    <Button
      className="w-full py-6 rounded-full font-medium bg-white hover:bg-white text-woodsmoke hover:opacity-50"
      onClick={handleClick}
    >
      To Pay
    </Button>
  )
}
