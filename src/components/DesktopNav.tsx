import { Link, useLocation } from "react-router-dom";
import { Home, Search, ShoppingCart, Sparkles, LogOut, Menu } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/compare", icon: Search, label: "Compare" },
  { path: "/cart", icon: ShoppingCart, label: "Cart" },
  { path: "/ai", icon: Sparkles, label: "AI Assistant" },
];

interface DesktopNavProps {
  onMenuClick?: () => void;
}

export function DesktopNav({ onMenuClick }: DesktopNavProps) {
  const location = useLocation();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="fixed left-0 right-0 top-0 z-40 hidden border-b border-border bg-card/95 backdrop-blur-lg md:block">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <Button variant="ghost" size="icon" onClick={onMenuClick}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="ClearChoice" className="h-8 w-auto object-contain" />
          </Link>
        </div>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            const showBadge = item.path === "/cart" && totalItems > 0;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
                {showBadge && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <span className="text-sm text-muted-foreground">
                Hi, {user.name}
              </span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
