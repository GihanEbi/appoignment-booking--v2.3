"use client";
import { Calendar, Home, Inbox, LogOut, Search, Settings } from "lucide-react";

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
import { removeToken } from "@/utils/auth-utils";
import { useRouter } from "next/navigation";

// Menu items.
const items = [
  {
    title: "My Details",
    url: "/user/my_details",
    icon: Home,
  },
  {
    title: "All Appointments",
    url: "/user/appointments/all_appointments",
    icon: Calendar,
  },
  {
    title: "Ongoing Appointments",
    url: "/user/appointments/ongoing_appointments",
    icon: Calendar,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const handleSignOut = () => {
    removeToken(); 
    router.push("/"); 
  };
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-xl mb-10 mt-3">
            Appointment Booking
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="text-md font-semibold">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="mt-auto items-end justify-end">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleSignOut}
                className="flex items-center mb-4"
              >
                <LogOut  className="text-red-500"/>
                <span className="text-md font-semibold text-red-600">
                  Sign Out
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
