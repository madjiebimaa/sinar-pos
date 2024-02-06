"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

import { useOrder } from "@/store/order"

export default function OrderHeader() {
  const order = useOrder()
  const router = useRouter()

  return (
    <section className="relative flex items-center p-4">
      <Button
        variant="ghost"
        className="z-10 shrink-0 h-fit w-fit p-0 hover:bg-transparent hover:opacity-50"
        onClick={() => router.back()}
      >
        <ArrowLeft className="shrink-0 h-6 w-6 text-white" />
      </Button>
      <div className="absolute left-0 right-0 mx-auto text-center">
        <p className="text-white">Order #{order.id}</p>
      </div>
    </section>
  )
}
