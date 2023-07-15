import Sidebar from "@/components/sidebar"

export default async function ConversationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Sidebar />
      {children}
    </main>
  )
}
