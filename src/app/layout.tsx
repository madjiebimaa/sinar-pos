import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sinar POS",
  description: `
    your go-to destination for cutting-edge point-of-sale solutions, seamlessly blending innovation and reliability to empower businesses of all sizes. 
    Our state-of-the-art POS systems streamline transactions, enhance customer experiences, and optimize operational efficiency.
  `,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
