import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  ArrowRight, 
  Sparkles,
  Split,
  Package
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { 
  getSmartSplitRecommendation, 
  findAlternatives,
  platforms,
  SplitCartRecommendation,
  AlternativeProduct
} from "@/lib/mockData";
import { cn } from "@/lib/utils";

export function SmartCartSuggestions() {
  const { cart, addToCart, removeFromCart } = useCart();

  if (cart.length < 2) return null;

  const splitRec = getSmartSplitRecommendation(cart);
  
  // Find alternatives for cart items
  const alternatives: AlternativeProduct[] = [];
  cart.forEach(item => {
    const alts = findAlternatives(item.product, "blinkit");
    alternatives.push(...alts.slice(0, 1)); // Take 1 alternative per item
  });

  if (!splitRec.hasSplit && alternatives.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Split Cart Recommendation */}
      {splitRec.hasSplit && splitRec.splitRecommendation && (
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-background p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Split className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground">Smart Split Suggestion</h3>
                <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-0">
                  Save ₹{Math.round(splitRec.totalSavings)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {splitRec.splitRecommendation.explanation}
              </p>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="rounded-lg bg-card border border-border p-2.5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Package className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs font-medium text-foreground">
                      {platforms[splitRec.splitRecommendation.platform1.platform].name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {splitRec.splitRecommendation.platform1.items.length} items • ₹{splitRec.splitRecommendation.platform1.subtotal}
                  </p>
                </div>
                <div className="rounded-lg bg-card border border-border p-2.5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Package className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs font-medium text-foreground">
                      {platforms[splitRec.splitRecommendation.platform2.platform].name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {splitRec.splitRecommendation.platform2.items.length} items • ₹{splitRec.splitRecommendation.platform2.subtotal}
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Total: ₹{splitRec.splitRecommendation.totalWithDelivery} (incl. delivery fees)
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Alternative Product Suggestions */}
      {alternatives.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-foreground">Cheaper Alternatives Available</h3>
          </div>
          <div className="space-y-2">
            {alternatives.slice(0, 2).map((alt, i) => (
              <div 
                key={i}
                className="flex items-center justify-between rounded-lg bg-secondary/50 p-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {alt.alternative.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {platforms[alt.platform].name} • {alt.alternative.unit}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-0 text-xs">
                    -₹{alt.savings}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="h-7 text-xs"
                    onClick={() => {
                      addToCart(alt.alternative);
                    }}
                  >
                    Switch
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
