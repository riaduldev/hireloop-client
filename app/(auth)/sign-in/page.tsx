"use client"

import Link from "next/link"
import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn } from "@/lib/auth-client"
import { GoogleIcon } from "@/components/icons/google"

export default function SignInPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errorMsg) setErrorMsg("")
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg("")
    setLoading(true)

    try {
      const { error } = await signIn.email({
        email: formData.email.trim(),
        password: formData.password,
        callbackURL: "/",
      })

      if (error) {
        setErrorMsg(error.message || "Could not sign in. Please try again.")
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

  async function handleGoogle() {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#05050a] px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#141418] p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="font-[family-name:var(--font-manrope)] text-3xl font-bold text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Sign in to your HireLoop account
          </p>
        </div>

        <Button
          type="button"
          onClick={handleGoogle}
          variant="outline"
          className="mb-6 flex h-11 w-full items-center justify-center gap-3 border-white/10 bg-[#0a0a0f] text-white hover:bg-white/5"
        >
          <GoogleIcon />
          Sign in with Google
        </Button>

        <div className="mb-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-xs uppercase text-white/40">or</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        {errorMsg && (
          <p className="mb-4 text-center text-sm text-red-500">{errorMsg}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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

          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-lg bg-[#5c53fe] text-white hover:bg-[#5c53fe]/90"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-white/60">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-[#5c53fe] hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  )
}
