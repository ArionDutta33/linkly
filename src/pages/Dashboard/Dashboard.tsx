import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/side-bar/AppSidebar";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {" "}
        {/* Flex between sidebar and main */}
        <AppSidebar />
        <main className="flex-1 p-4 overflow-y-auto">
          <SidebarTrigger />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
