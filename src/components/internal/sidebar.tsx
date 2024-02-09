"use client"

import { useMediaQuery } from "@uidotdev/usehooks"
import { BrickWall, X } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

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
  const isLargeDevice = useMediaQuery("only screen and (min-width : 1024px)")
  const isSidebarOpen = useIsSidebarOpen()
  const layoutActions = useLayoutActions()

  const goToPath = (href: string) => {
    router.push(href)
    !isLargeDevice && layoutActions.closeSidebar()
  }

  useEffect(() => {
    if (isLargeDevice && !isSidebarOpen) {
      layoutActions.openSidebar()
    }
  }, [isLargeDevice, isSidebarOpen, layoutActions])

  return (
    <aside
      className={cn(
        "fixed lg:static z-20 flex shrink-0 flex-col gap-4 p-4 h-screen w-[200px] lg:w-[150px] bg-woodsmoke transition-all duration-300",
        !isSidebarOpen && "-ml-[200px]"
      )}
    >
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="flex shrink-0 justify-center items-center h-[40px] hover:opacity-50"
        >
          <BrickWall className="shrink-0 h-6 w-6 text-white mr-1" />
          <h1 className="font-bold text-xl text-white">SinarPOS</h1>
        </Link>
        <Button
          variant="ghost"
          className="lg:hidden shrink-0 h-fit w-fit p-0 hover:bg-transparent hover:opacity-50"
          onClick={() => layoutActions.closeSidebar()}
        >
          <X className="shrink-0 h-6 w-6 text-white" />
        </Button>
      </div>
      <section className="flex flex-col gap-2 w-5/6 lg:w-full">
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
