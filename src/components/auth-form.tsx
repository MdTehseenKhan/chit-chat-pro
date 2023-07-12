"use client"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// Authentication
import axios from "axios"
import { signIn, useSession } from "next-auth/react"
import { toast } from "react-hot-toast"

// React Icons
import { BsGithub, BsGoogle } from "react-icons/bs"

// React Hook Form & Zod
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Shadcn/ui
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Custom Components
import { AuthSocialButton } from "@/components"

// Client-side validation with Zod
const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({
    message: "Please Enter a valid Email address.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
})

// @types
type Variant = "LOGIN" | "REGISTER"
type FormSchemaType = z.infer<typeof formSchema>

// Component
const AuthForm = () => {
  const router = useRouter()

  // States
  const [variant, setVariant] = useState<Variant>("LOGIN")
  const [loading, setLoading] = useState(false)

  // React Hook Form
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  // Actions
  const toggleVariant = useCallback(() => {
    form.reset()
    setVariant(variant === "LOGIN" ? "REGISTER" : "LOGIN")
  }, [variant])

  // Form Handlers
  const onSubmit = (data: FormSchemaType) => {
    setLoading(true)

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => {
          toast.success("Successfully Registered")
          signIn("credentials", data)
        })
        .catch((e) => {
          toast.error("Something went wrong!")
        })
        .finally(() => setLoading(false))
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) toast.error("Invalid Credentials")

          if (callback?.ok && !callback?.error) {
            toast.success("Successfully Logged in!")
            router.push("/users")
          }
        })
        .finally(() => setLoading(false))
    }
  }

  const socialAction = (actionType: string) => {
    setLoading(true)

    signIn(actionType, { redirect: false })
      .then((callback) => {
        console.log(callback)
        if (callback?.error) toast.error("Invalid Credentials")

        if (callback?.ok && !callback?.error) {
          toast.success("Successfully Logged in!")
          router.push("/users")
        }
      })
      .finally(() => setLoading(false))
  }

  // Session
  const session = useSession()

  useEffect(() => {
    if (session?.status === "authenticated") router.push("/users")
  }, [session?.status, router])

  return (
    <div
      className=" 
        mt-8 
        p-10 
        w-full 
        sm:shadow-md 
        sm:rounded-md 
        sm:bg-white 
        sm:max-w-md
      "
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="
            space-y-6
          "
        >
          {variant === "REGISTER" && (
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input placeholder="Your Name" className="w-full" disabled={loading} required {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>

                <FormControl>
                  <Input placeholder="Your Email" type="email" className="w-full" disabled={loading} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>

                <FormControl>
                  <Input placeholder="Your Password" type="password" className="w-full" disabled={loading} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit" disabled={loading}>
            {variant === "REGISTER" ? "Register" : "Login"}
          </Button>
        </form>
      </Form>

      <div className="mt-6 space-y-6 text-sm text-center">
        <div className="relative flex-center">
          <div className="absolute w-full border-t border-slate-300 z-[1]"></div>

          <span className="bg-white px-2 text-slate-500 z-[2]">Or continue with</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <AuthSocialButton icon={BsGithub} onClick={() => socialAction("github")} disabled={loading} />
          <AuthSocialButton icon={BsGoogle} onClick={() => socialAction("google")} disabled={loading} />
        </div>

        <div>
          {variant === "REGISTER" ? "Already have an account? " : "Don't have an account? "}
          <Button variant="link" className="p-0" onClick={toggleVariant} disabled={loading}>
            {variant === "REGISTER" ? "Login" : "Sign up"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
