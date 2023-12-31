import Image from "next/image"

import AuthForm from "./components/auth-form"

export default function Home() {
  return (
    <main className="w-full min-h-screen flex-center bg-slate-200">
      <div className="flex flex-col items-center gap-3 py-10">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={64}
          height={64}
          priority
          //
        />

        <h2 className="text-4xl font-extrabold tracking-tight text-primary px-5 text-center">
          Welcome to Chit Chat Pro
        </h2>

        <div className="px-5 w-full">
          <AuthForm />
        </div>
      </div>
    </main>
  )
}
