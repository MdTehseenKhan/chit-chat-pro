import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"

import { AuthContext } from "@/contexts"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chit Chat | A Chat Application",
  description: "...",
}

import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <Toaster />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
