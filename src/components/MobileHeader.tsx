import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

interface MobileHeaderProps {
  onMenuClick?: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  const location = useLocation();
  const { totalItems } = useCart();

  // Don't show on home page for mobile
  if (location.pathname === "/") {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-card/95 px-4 py-3 backdrop-blur-lg md:hidden">
      <div className="flex items-center gap-2">
        {onMenuClick && (
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="h-8 w-8">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="ClearChoice" className="h-8 w-auto" />
        </Link>
      </div>
      
      <Link to="/cart" className="relative">
        <ShoppingCart className="h-6 w-6 text-foreground" />
        {totalItems > 0 && (
          <span className="absolute -right-2 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
      </Link>
    </header>
  );
}
