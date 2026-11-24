"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { authClient } from "@/lib/auth-client"

const navLinks = [
  {
    href: "/jobs",
    label: "Browse Jobs",
    active: (p: string) => p === "/" || p.startsWith("/jobs"),
  },
  {
    href: "/companies",
    label: "Company",
    active: (p: string) => p.startsWith("/companies"),
  },
  {
    href: "/pricing",
    label: "Pricing",
    active: (p: string) => p.startsWith("/pricing"),
  },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = authClient.useSession()

  const handleSignOut = async () => {
    try {
      await authClient.signOut()

      router.push("/sign-in")
      router.refresh()
    } catch (error) {
      console.error("Sign out failed:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-black px-3 pt-3 sm:px-6 sm:pt-4 lg:px-10 xl:px-20">
      <div className="mx-auto flex w-full max-w-[1280px] min-w-0 items-center justify-between gap-3 rounded-[14px] border border-white/7 bg-[#141418] px-3 py-3 sm:px-5 lg:px-6">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="HireLoop"
            width={160}
            height={40}
            priority
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden min-w-0 items-center gap-4 rounded-lg border border-white/7 bg-[#1a1a1f] px-4 py-2 lg:flex xl:gap-6 xl:px-6">
          <div className="flex items-center gap-4 xl:gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm whitespace-nowrap text-[#ededef] transition-colors hover:text-white xl:text-base",
                  link.active(pathname) &&
                    "font-bold underline underline-offset-4"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Separator orientation="vertical" className="h-6 bg-white/10" />

          <div className="flex shrink-0 items-center gap-3">
            {session?.user ? (
              <>
                <span className="max-w-[120px] truncate text-sm text-[#ededef] text-white xl:max-w-[160px]">
                  {session.user.name}
                </span>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-md px-3 py-2 text-sm font-medium text-blue-500 transition-colors duration-300 hover:bg-blue-600 hover:text-white xl:px-4"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Button
                  nativeButton={false}
                  render={<Link href="/sign-in" />}
                  className="h-9 rounded-lg bg-white px-3 text-sm whitespace-nowrap text-[#645bff] hover:bg-white/90"
                >
                  Sign In
                </Button>

                <Button
                  nativeButton={false}
                  render={<Link href="/sign-up" />}
                  className="h-9 rounded-lg bg-[#5c53fe] px-3 text-sm whitespace-nowrap text-[#ededef] hover:bg-[#5c53fe]/90 xl:px-5"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile and Tablet Navbar */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-10 text-[#ededef] hover:bg-white/10"
                />
              }
            >
              <Menu className="size-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[85vw] max-w-[360px] border-white/7 bg-[#141418] text-[#ededef]"
            >
              <SheetHeader>
                <SheetTitle className="text-[#ededef]">Menu</SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-2 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-lg px-3 py-3 text-base text-[#ededef] transition-colors hover:bg-white/5",
                      link.active(pathname) && "bg-white/5 font-bold"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

                <Separator className="my-3 bg-white/10" />

                {session?.user ? (
                  <>
                    <span className="truncate px-3 py-2 text-sm text-white/70">
                      {session.user.name}
                    </span>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full rounded-md px-4 py-3 text-left font-medium text-blue-500 transition-colors duration-300 hover:bg-blue-600 hover:text-white"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Button
                      nativeButton={false}
                      render={<Link href="/sign-in" />}
                      className="h-11 w-full rounded-lg bg-white text-[#645bff] hover:bg-white/90"
                    >
                      Sign In
                    </Button>

                    <Button
                      nativeButton={false}
                      render={<Link href="/sign-up" />}
                      className="h-11 w-full rounded-lg bg-[#5c53fe] text-[#ededef] hover:bg-[#5c53fe]/90"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
