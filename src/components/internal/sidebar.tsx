"use client"

import { BrickWall, X } from "lucide-react"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"
import { useIsSidebarOpen, useLayoutActions } from "@/store/layout"

export default function Sidebar() {
  const isSidebarOpen = useIsSidebarOpen()
  const layoutActions = useLayoutActions()

  return (
    <aside
      className={cn(
        "fixed z-20 flex shrink-0 flex-col h-screen w-[200px] bg-white transition-all duration-300",
        !isSidebarOpen && "-ml-[200px]"
      )}
    >
      <div className="flex justify-between items-center p-4">
        <div className="flex shrink-0 justify-center items-center">
          <BrickWall className="shrink-0 h-6 w-6 text-slate-950 mr-1" />
          <h1 className="font-bold text-lg text-slate-950">SinarPOS</h1>
        </div>
        <Button
          variant="ghost"
          className="shrink-0 h-fit w-fit p-0 hover:bg-transparent hover:opacity-50"
          onClick={() => layoutActions.toggleSidebarOpen()}
        >
          <X className="shrink-0 h-6 w-6 text-slate-950" />
        </Button>
      </div>
    </aside>
  )
}
