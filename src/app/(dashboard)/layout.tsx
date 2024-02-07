import React from "react"

import Navbar from "@/components/internal/navbar"
import Overlay from "@/components/internal/overlay"
import Sidebar from "@/components/internal/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen max-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        {children}
        <Overlay />
      </div>
    </div>
  )
}
