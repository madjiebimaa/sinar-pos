"use client"

import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"

import useQuery from "@/hooks/use-query"
import { cn } from "@/lib/utils"

interface SearchInputProps extends React.ComponentPropsWithoutRef<"input"> {}

export default function SearchInput({
  placeholder = "Search...",
  className,
  ...props
}: SearchInputProps) {
  const { query, setQuery } = useQuery()

  return (
    <div className="relative max-w-[300px]">
      <Search className="absolute top-2 left-2 shrink-0 h-6 w-6 text-silver-chalice" />
      <Input
        id="search"
        type="search"
        autoComplete="off"
        className={cn(
          "pl-10 bg-onyx border-none placeholder:text-silver-chalice",
          className
        )}
        placeholder={placeholder}
        defaultValue={query}
        onChange={(event) => setQuery(event.target.value)}
        {...props}
      />
    </div>
  )
}
