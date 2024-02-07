"use client"

import { BrickWall, X } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"
import { useIsSidebarOpen, useLayoutActions } from "@/store/layout"

const links: { href: string; label: string }[] = [
  { href: "/products", label: "Products" },
  { href: "/orders", label: "Orders" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const isSidebarOpen = useIsSidebarOpen()
  const layoutActions = useLayoutActions()

  const goToPath = (href: string) => {
    router.push(href)
    layoutActions.toggleSidebarOpen()
  }

  return (
    <aside
      className={cn(
        "fixed z-20 flex shrink-0 flex-col gap-8 h-screen w-[200px] bg-woodsmoke transition-all duration-300",
        !isSidebarOpen && "-ml-[200px]"
      )}
    >
      <div className="flex justify-between items-center p-4">
        <Link
          href="/"
          className="flex shrink-0 justify-center items-center px-2 hover:opacity-50"
        >
          <BrickWall className="shrink-0 h-6 w-6 text-white mr-1" />
          <h1 className="font-bold text-xl text-white">SinarPOS</h1>
        </Link>
        <Button
          variant="ghost"
          className="shrink-0 h-fit w-fit p-0 hover:bg-transparent hover:opacity-50"
          onClick={() => layoutActions.toggleSidebarOpen()}
        >
          <X className="shrink-0 h-6 w-6 text-white" />
        </Button>
      </div>
      <section className="flex flex-col gap-2 p-4 w-5/6">
        {links.map((link) => (
          <Button
            key={link.href}
            variant="ghost"
            className={cn(
              "justify-start font-semibold text-white hover:text-white hover:bg-onyx",
              link.href === pathname && "bg-onyx hover:opacity-50"
            )}
            onClick={() => goToPath(link.href)}
          >
            {link.label}
          </Button>
        ))}
      </section>
    </aside>
  )
}
