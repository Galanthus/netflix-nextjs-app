import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

import { NextAuthProvider } from "./components/NextAuthProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Netflix App",
  description: "Netflix App built with Next.js and TypeScript"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
