"use client"
import { signOut } from "next-auth/react"

// shadcn/ui
import { Button } from "@/components/ui/button"

const Users = () => {
  return (
    <div>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  )
}

export default Users
