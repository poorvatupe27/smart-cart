import { useState, ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { DesktopNav } from "./DesktopNav";
import { MobileHeader } from "./MobileHeader";
import { AppSidebar } from "./AppSidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex w-full">
      <AppSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col min-w-0">
        <DesktopNav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <MobileHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 pb-20 md:pb-8 md:pt-20">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
