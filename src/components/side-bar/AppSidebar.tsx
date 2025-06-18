import {
  Calendar,
  Home,
  HomeIcon,
  Search,
  Settings,
  SquarePlus,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { ModeToggle } from "../theme/mode-toogle";
// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard/home",
    icon: Home,
  },
  {
    title: "Create",
    url: "/dashboard/create",
    icon: SquarePlus,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Go Back",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="border">
          <SidebarGroupLabel className="text-sm text-black font-medium mb-4">
            linkly.io
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <>
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="  mt-auto mb-10">
          {/* <SidebarGroupLabel className="text-sm text-black font-medium mb-4">
            linkly.io
          </SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="px-2 flex">
              <div className="my-4">
                {" "}
                <ModeToggle />
              </div>
              <div className="flex  gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <div className="tracking-tighter text-black dark:text-white">
                    Arion Dutta
                  </div>
                  <div className="text-xs tracking-tighter">
                    ariondutta333@outlook.com
                  </div>
                </div>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
