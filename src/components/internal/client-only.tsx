"use client"

import { useIsClient } from "@uidotdev/usehooks"
import React from "react"

export default function ClientOnly({
  children,
}: {
  children: React.ReactNode
}) {
  const isClient = useIsClient()

  if (!isClient) {
    return null
  }

  return children
}
