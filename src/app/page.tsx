import Image from "next/image"
import { AuthForm } from "@/components"

export default function Home() {
  return (
    <main className="w-full h-screen flex-center bg-slate-200">
      <div className="flex flex-col items-center gap-3">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={48}
          height={48}
          priority
          //
        />

        <h2 className="text-3xl font-extrabold tracking-tight text-primary">Welcome to Chit Chat App</h2>

        <AuthForm />
      </div>
    </main>
  )
}
