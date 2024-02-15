"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

export default function useQuery() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const query = searchParams.get("query") || ""

  const setQuery = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams)
    query ? params.set("query", query) : params.delete("query")
    router.replace(`${pathname}?${params.toString()}`)
  }, 300)

  return { query, setQuery }
}
