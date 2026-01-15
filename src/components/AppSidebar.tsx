import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  User, 
  CreditCard, 
  Gift, 
  Users, 
  ChevronLeft,
  ChevronRight,
  Crown,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { 
    id: "profile",
    label: "Profile", 
    icon: User, 
    description: "Your account details"
  },
  { 
    id: "subscription",
    label: "Subscription", 
    icon: Crown, 
    description: "Manage your plan"
  },
  { 
    id: "trial",
    label: "Free Trial", 
    icon: Sparkles, 
    description: "7 days remaining"
  },
  { 
    id: "refer",
    label: "Refer & Earn", 
    icon: Users, 
    description: "Get free months"
  },
];

interface AppSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function AppSidebar({ isOpen, onToggle }: AppSidebarProps) {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-card border-r border-border transition-all duration-300 ease-in-out",
          isOpen ? "w-72" : "w-0 md:w-16",
          "md:relative md:z-auto"
        )}
      >
        <div className={cn(
          "flex flex-col h-full overflow-hidden",
          isOpen ? "opacity-100" : "opacity-0 md:opacity-100"
        )}>
          {/* Toggle Button */}
          <div className="flex items-center justify-end p-3 border-b border-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8"
            >
              {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>

          {/* User Profile Summary */}
          {isOpen && user && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
              <Badge variant="secondary" className="mt-3 w-full justify-center">
                <Sparkles className="h-3 w-3 mr-1" />
                Free Trial Active
              </Badge>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto p-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 mb-1",
                  isOpen ? "px-4" : "px-2 justify-center",
                  activeSection === item.id && "bg-secondary"
                )}
                onClick={() => setActiveSection(activeSection === item.id ? null : item.id)}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {isOpen && (
                  <div className="flex-1 text-left">
                    <span className="text-sm font-medium">{item.label}</span>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                )}
              </Button>
            ))}
          </nav>

          {/* Section Content (when expanded) */}
          {isOpen && activeSection && (
            <div className="border-t border-border p-4">
              {activeSection === "profile" && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Profile Settings</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name</span>
                      <span className="text-foreground">{user?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span className="text-foreground truncate ml-2">{user?.email}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {activeSection === "subscription" && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Subscription Plans</h3>
                  <Card className="p-3 border-primary/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Pro Plan</span>
                      <Badge>₹199/mo</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Unlimited AI queries, advanced cart optimization</p>
                  </Card>
                  <Card className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Free</span>
                      <Badge variant="secondary">Current</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">5 AI queries/day, basic comparison</p>
                  </Card>
                </div>
              )}
              
              {activeSection === "trial" && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Free Trial Status</h3>
                  <div className="rounded-lg bg-success/10 p-3">
                    <p className="text-sm text-success font-medium">7 days remaining</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enjoy unlimited access to all features
                    </p>
                  </div>
                  <Button variant="hero" size="sm" className="w-full">
                    <Crown className="h-4 w-4" />
                    Upgrade to Pro
                  </Button>
                </div>
              )}
              
              {activeSection === "refer" && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Refer & Earn</h3>
                  <p className="text-sm text-muted-foreground">
                    Share ClearChoice with friends and get 1 month free for each referral!
                  </p>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs text-muted-foreground mb-1">Your referral code</p>
                    <p className="font-mono font-semibold text-foreground">CLEAR25</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Gift className="h-4 w-4" />
                    Share Invite Link
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
