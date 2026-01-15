import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { 
  ChefHat, 
  Wallet, 
  PartyPopper, 
  Heart,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const quickActions = [
  {
    id: "cook",
    icon: ChefHat,
    title: "Cook Something",
    description: "Build a recipe basket",
    prompt: "I want to cook pasta for 4 people under ₹300",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    id: "budget",
    icon: Wallet,
    title: "Budget Shopping",
    description: "Weekly groceries on budget",
    prompt: "Cheapest breakfast for the week under ₹500",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    id: "party",
    icon: PartyPopper,
    title: "Party Planning",
    description: "Snacks for gatherings",
    prompt: "Snacks for a house party of 10 people",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    id: "healthy",
    icon: Heart,
    title: "Healthy Eating",
    description: "Nutritious meal planning",
    prompt: "Healthy lunch options for 1 week",
    color: "bg-rose-500/10 text-rose-600",
  },
];

interface AIQuickActionsProps {
  onSelectPrompt?: (prompt: string) => void;
  compact?: boolean;
}

export function AIQuickActions({ onSelectPrompt, compact = false }: AIQuickActionsProps) {
  return (
    <div className={cn(
      "grid gap-3",
      compact ? "grid-cols-2" : "grid-cols-2 md:grid-cols-4"
    )}>
      {quickActions.map((action) => {
        const Icon = action.icon;
        
        if (onSelectPrompt) {
          return (
            <Card
              key={action.id}
              className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-primary/30 group"
              onClick={() => onSelectPrompt(action.prompt)}
            >
              <div className={cn("inline-flex rounded-xl p-2.5 mb-3", action.color)}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{action.title}</h3>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </Card>
          );
        }
        
        return (
          <Link key={action.id} to={`/ai?prompt=${encodeURIComponent(action.prompt)}`}>
            <Card className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-primary/30 group h-full">
              <div className={cn("inline-flex rounded-xl p-2.5 mb-3", action.color)}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1 flex items-center gap-1">
                {action.title}
                <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
