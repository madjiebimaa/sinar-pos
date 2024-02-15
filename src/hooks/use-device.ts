"use client"

import { useMediaQuery } from "@uidotdev/usehooks"

export type useDeviceReturnType = ReturnType<typeof useDevice>

export default function useDevice() {
  const isSmallDevice = useMediaQuery(
    "only screen and (min-width : 320px) and (max-width : 768px)"
  )
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 768px) and (max-width : 1024px)"
  )
  const isLargeDevice = useMediaQuery("only screen and (min-width : 1024px)")

  return { isSmallDevice, isMediumDevice, isLargeDevice }
}
