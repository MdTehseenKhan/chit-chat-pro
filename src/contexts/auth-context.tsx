"use client"

import { SessionProvider } from "next-auth/react"

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthContext
