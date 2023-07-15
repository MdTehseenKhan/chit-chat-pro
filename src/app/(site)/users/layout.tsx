import { getCurrentUser } from "@/actions"

import Sidebar from "@/components/sidebar"

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser()

  return (
    <main className="2xl:container 2xl:mx-auto">
      <Sidebar />
      {children}
    </main>
  )
}
