"use client"

import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GoogleIcon } from "@/components/icons/google"
import { signUp } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
    const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)


function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errorMsg) setErrorMsg("")
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg("")
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Password and confirm password do not match.")
      return
    }
    if (formData.password.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.")
      return
    }
    setLoading(true)
    
    try {
      const {error } = await signUp.email({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        callbackURL: "/",
      })

      if (error) {
        setErrorMsg(error.message || "Could not create account. Please try again.")
        return
      }

      router.push("/")
      router.refresh()
    } catch {
      setErrorMsg("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }

  }

  function handleGoogle() {
    console.log("Google sign up clicked")
  }

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#05050a] px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#141418] p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="font-[family-name:var(--font-manrope)] text-3xl font-bold text-white">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Join HireLoop and start your journey
          </p>
        </div>

        <Button
          type="button"
          onClick={handleGoogle}
          variant="outline"
          className="mb-6 flex h-11 w-full items-center justify-center gap-3 border-white/10 bg-[#0a0a0f] text-white hover:bg-white/5"
        >
          <GoogleIcon />
          Sign up with Google
        </Button>

        <div className="mb-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-xs uppercase text-white/40">or</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm text-white/80">
              Full name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="h-11 border-white/10 bg-[#0a0a0f] text-white placeholder:text-white/40 focus-visible:ring-[#5c53fe]/50"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-white/80">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-11 border-white/10 bg-[#0a0a0f] text-white placeholder:text-white/40 focus-visible:ring-[#5c53fe]/50"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-white/80">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="h-11 border-white/10 bg-[#0a0a0f] text-white placeholder:text-white/40 focus-visible:ring-[#5c53fe]/50"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm text-white/80">
              Confirm password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="h-11 border-white/10 bg-[#0a0a0f] text-white placeholder:text-white/40 focus-visible:ring-[#5c53fe]/50"
            />
          </div>

          <Button
            type="submit"
            className="h-11 w-full rounded-lg bg-[#5c53fe] text-white hover:bg-[#5c53fe]/90"
          >
            Sign Up
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-white/60">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-[#5c53fe] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
