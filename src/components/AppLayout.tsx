import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { DesktopNav } from "./DesktopNav";
import { MobileHeader } from "./MobileHeader";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />
      <MobileHeader />
      <main className="pb-20 md:pb-8 md:pt-20">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
