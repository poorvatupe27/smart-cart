import { useCart } from "@/contexts/CartContext";
import { calculateCartTotal, platforms, Platform, getCartSavings } from "@/lib/mockData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingDown, Package } from "lucide-react";
import { cn } from "@/lib/utils";

export function PlatformComparison() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return null;
  }

  const { bestPlatform, savings } = getCartSavings(cart);

  const platformData = (Object.keys(platforms) as Platform[]).map((platform) => ({
    ...platforms[platform],
    total: calculateCartTotal(cart, platform) + platforms[platform].deliveryFee,
    isBest: platform === bestPlatform,
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Platform Comparison</h2>
        {savings > 0 && (
          <Badge className="gap-1 bg-success text-success-foreground">
            <TrendingDown className="h-3 w-3" />
            Save ₹{savings}
          </Badge>
        )}
      </div>

      <div className="grid gap-3">
        {platformData
          .sort((a, b) => a.total - b.total)
          .map((platform, index) => (
            <Card
              key={platform.id}
              className={cn(
                "relative overflow-hidden p-4 transition-all",
                platform.isBest
                  ? "border-2 border-success bg-success/5 shadow-md"
                  : "border border-border"
              )}
            >
              {platform.isBest && (
                <div className="absolute right-0 top-0 rounded-bl-lg bg-success px-2 py-1">
                  <Trophy className="h-4 w-4 text-success-foreground" />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold",
                      platform.isBest
                        ? "bg-success text-success-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{platform.name}</p>
                    <p className="text-xs text-muted-foreground">
                      +₹{platform.deliveryFee} delivery
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={cn(
                    "text-xl font-bold",
                    platform.isBest ? "text-success" : "text-foreground"
                  )}>
                    ₹{platform.total}
                  </p>
                  {platform.isBest && (
                    <p className="text-xs font-medium text-success">Best Price</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
      </div>

      <Card className="border-dashed bg-muted/50 p-4">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Package className="h-5 w-5" />
          <p>
            <span className="font-medium text-foreground">{cart.length} items</span> in your cart • 
            Prices include delivery fees
          </p>
        </div>
      </Card>
    </div>
  );
}
