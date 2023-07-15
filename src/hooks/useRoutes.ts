import { useMemo } from "react"
import { usePathname } from "next/navigation"

import { signOut } from "next-auth/react"

import { HiChat } from "react-icons/hi"
import { HiArrowLeftOnRectangle, HiUsers} from "react-icons/hi2"

import { useConversation } from "@/hooks"

const useRoutes = () => {
  const pathname = usePathname()

  const {conversationId } = useConversation()

  const routes = useMemo(() => [
    {
      label: 'Chat',
      link: "/conversations",
      Icon: HiChat,
      active: pathname === '/conversations' || !!conversationId
    },
    {
      label: 'Users',
      link: "/users",
      Icon: HiUsers,
      active: pathname === '/users'
    },
    {
      label: 'Logout',
      link: "#",
      onClick: () => signOut(),
      Icon: HiArrowLeftOnRectangle,
      active: pathname === '/conversations'
    }
  ], [pathname, conversationId])

  return routes
}

export default useRoutes