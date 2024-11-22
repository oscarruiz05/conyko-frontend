import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/AppSidebar"
import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"

function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger className="mb-6" />
        <Outlet />
        <Toaster />
      </main>
    </SidebarProvider>
  )
}

export default Home