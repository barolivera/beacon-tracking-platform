import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { Roboto_Mono } from "next/font/google"
import { AuthProvider } from "@/hooks/use-auth"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-data",
})

export const metadata: Metadata = {
  title: "Drug Traceability Platform",
  description: "Blockchain-based pharmaceutical tracking system",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${dmSans.variable} ${robotoMono.variable}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
