import { Product, getBestPrice, Platform, platforms, formatUnitPrice } from "@/lib/mockData";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  showComparison?: boolean;
}

export function ProductCard({ product, showComparison = false }: ProductCardProps) {
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);
  const bestDeal = getBestPrice(product);
  const unitPriceInfo = formatUnitPrice(product, bestDeal.platform);

  return (
    <Card className="group relative overflow-hidden border border-border/50 bg-card p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-md">
      {/* Best deal badge */}
      <div className="absolute right-2 top-2">
        <Badge variant="secondary" className="gap-1 bg-success/10 text-success">
          <TrendingDown className="h-3 w-3" />
          {platforms[bestDeal.platform].name}
        </Badge>
      </div>

      {/* Product image */}
      <div className="mb-3 flex h-16 items-center justify-center text-4xl">
        {product.image}
      </div>

      {/* Product info */}
      <div className="space-y-1">
        <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground">
          {product.unit}
        </p>
      </div>

      {/* Price comparison */}
      {showComparison ? (
        <div className="mt-3 space-y-1.5">
          {(Object.entries(product.prices) as [Platform, number][]).map(([platform, price]) => {
            const platformUnitPrice = formatUnitPrice(product, platform);
            return (
              <div
                key={platform}
                className={cn(
                  "flex items-center justify-between rounded-lg px-2 py-1 text-xs",
                  platform === bestDeal.platform
                    ? "bg-success/10 font-semibold text-success"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <span>{platforms[platform].name}</span>
                <div className="text-right">
                  <span>₹{price}</span>
                  <span className="ml-1 text-[10px] opacity-75">({platformUnitPrice})</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              ₹{bestDeal.price}
            </span>
            {bestDeal.price < Math.max(...Object.values(product.prices)) && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{Math.max(...Object.values(product.prices))}
              </span>
            )}
          </div>
          <p className="text-xs text-primary font-medium mt-0.5">
            {unitPriceInfo}
          </p>
        </div>
      )}

      {/* Add to cart */}
      <div className="mt-4">
        {quantity === 0 ? (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => addToCart(product)}
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        ) : (
          <div className="flex items-center justify-between rounded-lg border border-primary bg-secondary p-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => updateQuantity(product.id, quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-sm font-semibold">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => updateQuantity(product.id, quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
