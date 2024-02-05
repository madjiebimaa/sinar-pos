"use client"

import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLayoutActions } from "@/store/layout"

export default function Navbar() {
  const layoutActions = useLayoutActions()

  return (
    <nav className="flex items-center justify-between p-4">
      <Button
        variant="ghost"
        className="shrink-0 h-fit w-fit p-0 hover:bg-transparent hover:opacity-50"
        onClick={() => layoutActions.toggleSidebarOpen()}
      >
        <Menu className="shrink-0 h-6 w-6 text-slate-950" />
      </Button>
    </nav>
  )
}
