"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"

import {
  Home,
  Users,
  Building2,
  BriefcaseBusiness,
  Folder,
  Settings,
  ShieldCheck,
  UserPlus,
  FileText,
  CreditCard,
  BarChart3,
  Cog,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { useSession } from "@/lib/auth-client"

// Role type
export type DashboardRole = "seeker" | "recruiter" | "admin"

// Menu item type
type MenuItem = {
  name: string
  url: string
  icon: LucideIcon
}

// Seeker menu
const seekerMenu: MenuItem[] = [
  {
    name: "Dashboard",
    url: "/dashboard/seeker",
    icon: Home,
  },
  {
    name: "Saved Jobs",
    url: "/dashboard/seeker/saved",
    icon: Folder,
  },
  {
    name: "My Applications",
    url: "/dashboard/seeker/applications",
    icon: FileText,
  },
  {
    name: "Subscription & Billing",
    url: "/dashboard/seeker/billing",
    icon: CreditCard,
  },
  {
    name: "Settings",
    url: "/dashboard/seeker/settings",
    icon: Settings,
  },
]

// Recruiter menu
const recruiterMenu: MenuItem[] = [
  {
    name: "Dashboard",
    url: "/dashboard/recruiter",
    icon: Home,
  },
  {
    name: "My Company",
    url: "/dashboard/recruiter/company",
    icon: Building2,
  },
  {
    name: "Manage Jobs",
    url: "/dashboard/recruiter/jobs",
    icon: BriefcaseBusiness,
  },
  {
    name: "Add Job",
    url: "/dashboard/recruiter/jobs/new",
    icon: UserPlus,
  },
  {
    name: "View Applicants",
    url: "/dashboard/recruiter/applicants",
    icon: Users,
  },
  {
    name: "Subscription & Billing",
    url: "/dashboard/recruiter/billing",
    icon: CreditCard,
  },
  {
    name: "Settings",
    url: "/dashboard/recruiter/settings",
    icon: Settings,
  },
]

// Admin menu
const adminMenu: MenuItem[] = [
  {
    name: "Dashboard",
    url: "/dashboard/admin",
    icon: Home,
  },
  {
    name: "Manage Users",
    url: "/dashboard/admin/users",
    icon: Users,
  },
  {
    name: "Manage Companies",
    url: "/dashboard/admin/companies",
    icon: Building2,
  },
  {
    name: "Manage Jobs",
    url: "/dashboard/admin/jobs",
    icon: BriefcaseBusiness,
  },
  {
    name: "Payments",
    url: "/dashboard/admin/payments",
    icon: CreditCard,
  },
  {
    name: "Analytics",
    url: "/dashboard/admin/analytics",
    icon: BarChart3,
  },
  {
    name: "Admin Settings",
    url: "/dashboard/admin/settings",
    icon: Cog,
  },
]

// Role menus
const menuByRole: Record<DashboardRole, MenuItem[]> = {
  seeker: seekerMenu,
  recruiter: recruiterMenu,
  admin: adminMenu,
}

// Role labels
const roleLabels: Record<DashboardRole, string> = {
  seeker: "Job Seeker",
  recruiter: "Recruiter",
  admin: "Administrator",
}

export function DashboardSidebar({
  role,
}: {
  role?: DashboardRole
}) {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()
  const { data: session, isPending } = useSession()

  // Get role from props or session
  const sessionRole = session?.user?.role

  const currentRole =
    role ??
    (sessionRole === "seeker" ||
    sessionRole === "recruiter" ||
    sessionRole === "admin"
      ? sessionRole
      : undefined)

  // Loading state
  if (isPending && !role) {
    return (
      <Sidebar collapsible="icon">
        <SidebarHeader className="border-b p-4">
          <h2 className="text-xl font-bold">HireLoop</h2>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <p className="px-4 py-6 text-sm text-muted-foreground">
              Loading dashboard...
            </p>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
  }

  // Role not assigned
  if (!currentRole) {
    return (
      <Sidebar collapsible="icon">
        <SidebarHeader className="border-b p-4">
          <h2 className="text-xl font-bold">HireLoop</h2>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <p className="px-4 py-6 text-sm text-muted-foreground">
              Your account role is not assigned.
            </p>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
  }

  const menuItems = menuByRole[currentRole]
  const dashboardUrl = `/dashboard/${currentRole}`

  // Find the single most specific matching route (prevents /jobs and /jobs/new both highlighting)
  const activeUrl =
    menuItems
      .filter(
        (item) =>
          pathname === item.url ||
          (item.url !== dashboardUrl && pathname.startsWith(`${item.url}/`))
      )
      .sort((a, b) => b.url.length - a.url.length)[0]?.url ?? ""

  return (
    <Sidebar collapsible="icon">
      {/* Sidebar Header */}
      <SidebarHeader className="border-b p-4">
        <Link
          href={dashboardUrl}
          onClick={() => setOpenMobile(false)}
          className="flex items-center gap-2.5"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <BriefcaseBusiness className="size-5" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold tracking-tight">
              HireLoop
            </h2>

            <p className="truncate text-xs text-muted-foreground">
              {roleLabels[currentRole]}
            </p>
          </div>
        </Link>
      </SidebarHeader>

      {/* Sidebar Menu */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>

          <SidebarMenu>
            {menuItems.map((item) => {
              const isActive = item.url === activeUrl
              const Icon = item.icon

              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    render={
                      <Link
                        href={item.url}
                        onClick={() => setOpenMobile(false)}
                      />
                    }
                    isActive={isActive}
                    tooltip={item.name}
                    className="transition-colors data-[active=true]:bg-emerald-500/15 data-[active=true]:font-semibold data-[active=true]:text-emerald-600 dark:data-[active=true]:text-emerald-400"
                  >
                    <Icon className="size-4 shrink-0" />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="border-t p-3">
        <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
          <ShieldCheck className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              {roleLabels[currentRole]}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              HireLoop Workspace
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}