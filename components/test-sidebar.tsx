import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar"

export function TestSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>Test</SidebarHeader>
      <SidebarContent>Test Content</SidebarContent>
      <SidebarFooter>Test Footer</SidebarFooter>
    </Sidebar>
  )
}