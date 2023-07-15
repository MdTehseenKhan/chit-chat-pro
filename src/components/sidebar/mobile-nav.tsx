"use client"
import { useConversation } from "@/hooks"
import NavLinks from "./nav-links"

const MobileNav = () => {
  const { isOpen } = useConversation()

  if (isOpen) return null

  return (
    <div
      className="
        md:hidden
        w-full
        fixed
        bottom-0
        z-40
        flex
        gap-x-2
        items-center
        justify-around
        bg-white
        border-t-[1px]
        py-2
      "
    >
      <NavLinks />
    </div>
  )
}

export default MobileNav
