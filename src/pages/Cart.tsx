import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { useCart } from "@/contexts/CartContext";
import { PlatformComparison } from "@/components/PlatformComparison";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { platforms, getBestPrice, Platform } from "@/lib/mockData";
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

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
                        {item.product.unit} • From ₹{bestDeal.price}
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

          {/* Platform Comparison */}
          <div>
            <PlatformComparison />
            
            <div className="mt-6">
              <Button asChild variant="hero" size="lg" className="w-full">
                <Link to="/ai">
                  Optimize with AI
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Let AI find even better deals by splitting your order
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
