import React from "react"

import ClientOnly from "@/components/internal/client-only"
import Navbar from "@/components/internal/navbar"
import Overlay from "@/components/internal/overlay"
import Sidebar from "@/components/internal/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen max-h-screen overflow-hidden">
      <ClientOnly>
        <Sidebar />
      </ClientOnly>
      <div className="flex flex-col w-full">
        <Navbar />
        {children}
        <Overlay />
      </div>
    </div>
  )
}
