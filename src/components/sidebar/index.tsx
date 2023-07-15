"use client"
import { ScrollArea } from "@/components/ui/scroll-area"

import DesktopNav from "./desktop-nav"
import MobileNav from "./mobile-nav"

const Sidebar = () => {
  return (
    <div className="fixed h-full">
      <DesktopNav />

      <MobileNav />

      <ScrollArea
        className="
          ml-16 
          w-80 
          h-full 
          bg-white
          pt-4
        "
      >
        This is a Sidebar <br />
      </ScrollArea>
    </div>
  )
}

export default Sidebar
