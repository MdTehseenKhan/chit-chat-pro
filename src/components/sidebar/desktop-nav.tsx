"use client"
import { useState } from "react"

import NavLinks from "./nav-links"

const DesktopSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="
        hidden
        md:block
        fixed
        left-0
        inset-y-0
        w-16
        p-2
        overflow-y-auto
        bg-white
        border-r-[1px]
        z-40
      "
    >
      <nav
        className="
          flex
          flex-col
          justify-between
          items-center
          space-y-1
        "
      >
        <NavLinks />
      </nav>
    </div>
  )
}

export default DesktopSidebar
