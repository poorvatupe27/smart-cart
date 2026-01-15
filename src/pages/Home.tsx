import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Sparkles, ShoppingCart, TrendingDown, Zap, Target } from "lucide-react";
import logo from "@/assets/logo.png";
import { PlatformLogosRow } from "@/components/PlatformLogos";
import { AIQuickActions } from "@/components/AIQuickActions";

export default function Home() {
  return (
    <div className="min-h-screen gradient-hero">
      {/* Hero Section */}
      <section className="container flex flex-col items-center px-4 pb-8 pt-8 text-center md:pt-12">
        <img 
          src={logo} 
          alt="ClearChoice" 
          className="mb-6 h-16 w-auto md:h-20 object-contain drop-shadow-sm" 
        />
        
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Compare smarter.{" "}
          <span className="text-primary">Spend less.</span>
        </h1>
        
        <p className="mb-8 max-w-md text-muted-foreground md:text-lg">
          Find the best grocery prices across Blinkit, Zepto, and Instamart in seconds.
        </p>

        {/* Main CTA Buttons */}
        <div className="flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:max-w-md">
          <Button asChild variant="hero" size="xl" className="flex-1">
            <Link to="/compare">
              <Search className="h-5 w-5" />
              Compare Products
            </Link>
          </Button>
          
          <Button asChild variant="hero-outline" size="xl" className="flex-1">
            <Link to="/ai">
              <Sparkles className="h-5 w-5" />
              AI Assistant
            </Link>
          </Button>
        </div>
      </section>

      {/* Platform Logos Section */}
      <section className="container px-4 py-6">
        <p className="mb-4 text-center text-sm text-muted-foreground">
          Trusted platforms we compare
        </p>
        <PlatformLogosRow />
      </section>

      {/* AI Quick Actions Section */}
      <section className="container px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            Try AI Shopping Goals
          </h2>
          <Link to="/ai" className="text-sm text-primary hover:underline">
            View all →
          </Link>
        </div>
        <AIQuickActions />
      </section>

      {/* Features Section */}
      <section className="container px-4 py-8">
        <h2 className="mb-6 text-center text-xl font-semibold text-foreground">
          How ClearChoice helps you
        </h2>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Search className="h-6 w-6" />}
            title="Product Discovery"
            description="Search across platforms and compare prices instantly"
          />
          <FeatureCard
            icon={<TrendingDown className="h-6 w-6" />}
            title="Price Comparison"
            description="See which platform offers the best deal for each item"
          />
          <FeatureCard
            icon={<ShoppingCart className="h-6 w-6" />}
            title="Cart Comparison"
            description="Compare your entire cart across all platforms"
          />
          <FeatureCard
            icon={<Target className="h-6 w-6" />}
            title="Goal-Based Shopping"
            description="Tell AI your goal - it builds the perfect basket"
            isAI
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6" />}
            title="Smart Optimization"
            description="AI suggests splitting orders to maximize savings"
            isAI
          />
          <FeatureCard
            icon={<Sparkles className="h-6 w-6" />}
            title="Intelligent Advice"
            description="Get explanations on why one option is better"
            isAI
          />
        </div>
      </section>

      {/* AI Highlight Section */}
      <section className="container px-4 py-8">
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-card to-accent/5 p-6 shadow-lg md:p-8">
          <div className="flex flex-col items-center text-center md:flex-row md:text-left md:gap-8">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground md:mb-0">
              <Sparkles className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-xl font-bold text-foreground">
                ClearChoice AI Assistant
              </h3>
              <p className="mb-4 text-muted-foreground">
                "I want to cook pasta for 4 people under ₹300" — Our AI understands 
                your goals and builds complete shopping baskets, optimized for your budget.
              </p>
              <Button asChild variant="hero" size="lg">
                <Link to="/ai">
                  Try AI Shopping
                  <Sparkles className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  isAI = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  isAI?: boolean;
}) {
  return (
    <Card className="relative overflow-hidden p-5 transition-all hover:shadow-md">
      {isAI && (
        <div className="absolute right-2 top-2">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
            AI
          </span>
        </div>
      )}
      <div className="mb-3 inline-flex rounded-xl bg-secondary p-2.5 text-primary">
        {icon}
      </div>
      <h3 className="mb-1 font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  );
}
