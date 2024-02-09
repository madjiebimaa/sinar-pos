"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"

import { useOrderActions, useOrderVisualId } from "@/store/order"

export default function OrderHeader() {
  const orderVisualId = useOrderVisualId()
  const router = useRouter()
  const orderActions = useOrderActions()

  useEffect(() => {
    orderActions.createOrderVisualId()
  }, [orderActions])

  return (
    <section className="relative flex items-center">
      <Button
        variant="ghost"
        className="shrink-0 h-fit w-fit p-0 hover:bg-transparent hover:opacity-50"
        onClick={() => router.back()}
      >
        <ArrowLeft className="shrink-0 h-6 w-6 text-white" />
      </Button>
      <div className="absolute left-0 right-0 w-fit mx-auto text-center">
        <p className="text-white">
          Order {orderVisualId !== 0 && `#${orderVisualId}`}
        </p>
      </div>
    </section>
  )
}
