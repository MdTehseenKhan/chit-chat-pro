import { cn } from "@/lib/utils"
import { type MouseEventHandler } from "react"
import { type IconType } from "react-icons"

const AuthSocialButton = ({
  icon: Icon,
  onClick,
  disabled,
}: {
  icon: IconType
  onClick: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        `      
          inline-flex 
          justify-center
          px-4
          py-2
          bg-slate-200
          hover:bg-slate-300
          rounded-md
          ring-1
          ring-inset
          ring-slate-400
          transition
        `,
        disabled && "pointer-events-none opacity-50"
      )}
    >
      <Icon className="h-5 w-5" />
    </button>
  )
}

export default AuthSocialButton
