"use client";
import { Calendar, Home, LogOut } from "lucide-react";

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
// 1. Import usePathname and Link
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "My Details",
    url: "/user/my_details",
    icon: Home,
  },
  {
    title: "Ongoing Appointments",
    url: "/user/appointments/ongoing_appointments",
    icon: Calendar,
  },
  {
    title: "Pending Appointments",
    url: "/user/appointments/pending_appointments",
    icon: Calendar,
  },
  {
    title: "Cancelled Appointments",
    url: "/user/appointments/cancelled_appointments",
    icon: Calendar,
  },
];

export function AppSidebar() {
  const router = useRouter();
  // 2. Get the current pathname
  const pathname = usePathname();

  const handleSignOut = () => {
    removeToken();
    router.push("/");
  };
  return (
    <Sidebar className="max-w-[290px] border-r border-gray-200 bg-white transition-[width] duration-200 ease-linear">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-xl mb-10 mt-3">
            <div className="flex gap-2 items-center">
              <Image alt="logo" src="/logo.jpeg" width={30} height={30} />
              <span className="hidden md:inline">Easy Appointment</span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                // 3. Check if the current item is active
                // We use startsWith to handle nested routes correctly
                // e.g., /user/appointments/ongoing_appointments/123 should still highlight the parent menu item.
                const isActive = pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {/* 4. Use Next.js Link and apply conditional classes */}
                      <Link
                        href={item.url}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all mb-2
                          ${
                            isActive
                              ? "bg-blue-100 text-blue-700" // Active styles
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900" // Inactive styles
                          }
                        `}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="mt-auto items-end justify-end">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}