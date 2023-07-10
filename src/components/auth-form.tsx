"use client"
import { useCallback, useState } from "react"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  name: z.string().min(2).max(25),
  email: z.string().email({
    message: "Please Enter a valid Email address.",
  }),
  password: z.string().min(4),
})

type Variant = "LOGIN" | "REGISTER"
type FormSchemaType = z.infer<typeof formSchema>

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN")

  const toggleVariant = useCallback(() => setVariant(variant === "LOGIN" ? "REGISTER" : "LOGIN"), [variant])

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: FormSchemaType) => {
    //
    console.log(data)
  }

  return (
    <div
      className=" 
        mt-8 
        p-5 
        w-full 
        sm:shadow 
        sm:rounded-md 
        sm:bg-white 
        sm:max-w-md
      "
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="
            space-y-3
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
                    <Input placeholder="Enter Name" className="w-full" {...field} />
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
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input placeholder="Enter Email" type="email" className="w-full" {...field} />
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
                  <Input placeholder="Enter Password" type="password" className="w-full" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            {variant === "REGISTER" ? "Sign up" : "Login"}
          </Button>
        </form>
      </Form>

      <div className="text-sm">
        {variant === "REGISTER" ? "Already have an account? " : "Don't have an account? "}
        <Button variant="link" className={cn("p-0")} onClick={toggleVariant}>
          {variant === "REGISTER" ? "Login" : "Sign up"}
        </Button>
      </div>
    </div>
  )
}

export default AuthForm
