import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="h-screen flex">
      <AppSidebar />
      <main className="w-full">
        {" "}
        <Header />
        <div className="bg-white mx-auto overflow-hidden p-4 md:p-6 2xl:p-10">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
