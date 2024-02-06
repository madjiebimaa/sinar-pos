"use client"

import { Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

import { Input } from "@/components/ui/input"

export default function ProductSearch() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const createQuery = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams)
    query ? params.set("query", query) : params.delete("query")
    router.replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className="relative">
      <Search className="absolute top-2 left-2 shrink-0 h-6 w-6 text-silver-chalice" />
      <Input
        type="text"
        placeholder="Search..."
        autoComplete="off"
        className="pl-10 bg-onyx border-none placeholder:text-silver-chalice"
        onChange={(event) => createQuery(event.target.value)}
      />
    </div>
  )
}
