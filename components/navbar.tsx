"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
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

const navLinks = [
  { href: "/jobs", label: "Browse Jobs", active: (p: string) => p === "/" || p.startsWith("/jobs") },
  { href: "/companies", label: "Company", active: (p: string) => p.startsWith("/companies") },
  { href: "/pricing", label: "Pricing", active: (p: string) => p.startsWith("/pricing") },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 sm:px-8 md:px-20">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 rounded-[14px] border border-white/7 bg-[#141418] px-4 py-3 sm:px-6">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            priority
            className="h-8 w-auto sm:h-11"
          />
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-6 rounded-lg border border-white/7 bg-[#1a1a1f] px-6 py-2 md:flex">
          <div className="flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-base text-[#ededef] transition-colors hover:text-white",
                  link.active(pathname) && "font-bold underline underline-offset-4"
                )}
              >
                {link.label}
              </Link>
            ))} 
          </div>
          <Separator orientation="vertical" className="h-6 bg-white/10" />
          <div className="flex items-center gap-3">
            <Button
            nativeButton={false}
              render={<Link href="/sign-in" />}
              className="h-[38px] rounded-lg bg-white px-4 text-[#645bff] hover:bg-white/90"
            >
              Sign In
            </Button>
            <Button
            nativeButton={false}
              render={<Link href="/get-started" />}
              className="h-[52px] rounded-lg bg-[#5c53fe] px-6 text-[#ededef] hover:bg-[#5c53fe]/90"
            >
              Get Started
            </Button>
          </div>
        </nav>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="text-[#ededef] hover:bg-white/10" />}>
              <Menu className="size-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 border-white/7 bg-[#141418] text-[#ededef]"
            >
              <SheetHeader>
                <SheetTitle className="text-[#ededef]">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-lg px-3 py-2 text-base text-[#ededef] transition-colors hover:bg-white/5",
                      link.active(pathname) && "bg-white/5 font-bold"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Separator className="my-3 bg-white/10" />
                <Button
                nativeButton={false}
                  render={<Link href="/sign-in" />}
                  className="h-[38px] rounded-lg bg-white text-[#645bff] hover:bg-white/90"
                >
                  Sign In
                </Button>
                <Button
                nativeButton={false}
                  render={<Link href="/get-started" />}
                  className="h-[52px] rounded-lg bg-[#5c53fe] text-[#ededef] hover:bg-[#5c53fe]/90"
                >
                  Get Started
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
