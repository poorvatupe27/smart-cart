import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { useCart } from "@/contexts/CartContext";
import { PlatformComparison } from "@/components/PlatformComparison";
import { SmartCartSuggestions } from "@/components/SmartCartSuggestions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { platforms, getBestPrice, Platform, formatUnitPrice } from "@/lib/mockData";
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleRedirectCart = () => {
    toast.info("Cart redirect feature coming soon! This will open platform apps with your cart.");
  };

  if (cart.length === 0) {
    return (
      <AppLayout>
        <div className="container flex flex-col items-center justify-center px-4 py-16 text-center">
          <div className="mb-4 rounded-full bg-muted p-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-foreground">Your cart is empty</h2>
          <p className="mb-6 text-muted-foreground">
            Start adding products to compare prices
          </p>
          <Button asChild variant="hero">
            <Link to="/compare">
              Browse Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Your Cart</h1>
            <p className="text-muted-foreground">
              {cart.length} items
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={clearCart}>
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Cart Items */}
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground">Items</h2>
            {cart.map((item) => {
              const bestDeal = getBestPrice(item.product);
              const unitPriceInfo = formatUnitPrice(item.product, bestDeal.platform);
              return (
                <Card key={item.product.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-3xl">
                      {item.product.image}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.product.unit} • ₹{bestDeal.price}
                      </p>
                      <p className="text-xs text-primary font-medium">
                        {unitPriceInfo}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center rounded-lg border border-border">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Platform Comparison & Smart Suggestions */}
          <div className="space-y-6">
            <PlatformComparison />
            
            <SmartCartSuggestions />
            
            <div>
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={handleRedirectCart}
              >
                <ExternalLink className="h-4 w-4" />
                Redirect Cart
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Opens your optimized cart in the platform app
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
