import { Home, LogOutIcon, MoveLeftIcon, SquarePlus } from "lucide-react";

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
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "../theme/mode-toogle";
import { Button } from "../ui/button";
import { useAuth } from "@/provider/AuthProvider";
import { toast } from "sonner";

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
    title: "Back to Main ",
    url: "/",
    icon: MoveLeftIcon,
  },
];

export function AppSidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="">
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
          <SidebarGroupContent>
            <SidebarMenu className="px-2 flex">
              <div className="my-4 space-x-4">
                {" "}
                <span>Toggle mode</span> <ModeToggle />
              </div>
              <div className="flex  gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    {user?.username
                      ? user.username.slice(0, 2).toUpperCase()
                      : "?"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="tracking-tighter text-black dark:text-white">
                    {user?.username}
                  </div>
                  <div className="text-xs tracking-tighter">{user?.email}</div>
                </div>
              </div>
              <Button
                onClick={async () => {
                  await logout();
                  toast.success("Logged out");
                  navigate("/");
                }}
                className=" mt-4"
              >
                Logout
                <LogOutIcon />
              </Button>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
