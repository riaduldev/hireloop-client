import { Geist, Geist_Mono, Manrope, Space_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/home/navbar"
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner"

export const metadata = {
  viewport: "width=device-width, initial-scale=1.0",
}


const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const manrope = Manrope({subsets:['latin'],variable:'--font-manrope'})

const spaceMono = Space_Mono({subsets:['latin'],weight:['400','700'],variable:'--font-space-mono'})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable, manrope.variable, spaceMono.variable)}
    >
      <body suppressHydrationWarning>
        <ThemeProvider>
          <Navbar />
          {children}
          <Toaster
          position="top-right"
          richColors
          closeButton
        />
        </ThemeProvider>
      </body>
    </html>
  )
}
