"use client"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { useRoutes } from "@/hooks"

const NavLinks = () => {
  const routes = useRoutes()

  return (
    <>
      {routes?.map(({ label, link, Icon, active, onClick }, i) => (
        <Button
          key={i + label}
          onClick={onClick}
          variant="ghost"
          size="icon"
          className={cn("w-full text-slate-500", active && "text-primary bg-secondary")}
          asChild
        >
          <Link href={link}>
            <Icon className="h-6 w-6 shrink-0" />
            <span className="sr-only">{label}</span>
          </Link>
        </Button>
      ))}
    </>
  )
}

export default NavLinks
