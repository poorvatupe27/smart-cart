import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { products, platforms, Platform } from "@/lib/mockData";
import { 
  Send, 
  Sparkles, 
  ShoppingCart, 
  Loader2,
  TrendingDown,
  SplitSquareVertical,
  Lightbulb,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestions?: AISuggestion[];
}

interface AISuggestion {
  type: "basket" | "split" | "tip";
  items?: { name: string; quantity: number; price: number; platform: Platform }[];
  savings?: number;
  explanation?: string;
}

const examplePrompts = [
  "I want to cook pasta for 4 people under ₹300",
  "Cheapest breakfast for the week",
  "Snacks for a house party of 10",
  "Healthy lunch options under ₹200",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): Message => {
    // Mock AI responses based on keywords
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("pasta") || lowerMessage.includes("cook")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: "Great choice! I've put together a pasta dinner basket for 4 people within your ₹300 budget. Here's my recommendation:",
        suggestions: [
          {
            type: "basket",
            items: [
              { name: "Pasta (500g)", quantity: 1, price: 85, platform: "zepto" },
              { name: "Tomato", quantity: 2, price: 40, platform: "instamart" },
              { name: "Onion", quantity: 1, price: 32, platform: "zepto" },
              { name: "Paneer", quantity: 1, price: 92, platform: "zepto" },
              { name: "Amul Butter", quantity: 1, price: 55, platform: "blinkit" },
            ],
            savings: 42,
            explanation: "By ordering pasta ingredients from Zepto and butter from Blinkit, you save ₹42 compared to ordering everything from one platform."
          },
          {
            type: "tip",
            explanation: "💡 Add garlic and herbs for authentic Italian flavor - they're cheapest on Instamart today!"
          }
        ]
      };
    }
    
    if (lowerMessage.includes("breakfast") || lowerMessage.includes("morning")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: "Here's a budget-friendly breakfast plan for the week! I've optimized across platforms:",
        suggestions: [
          {
            type: "basket",
            items: [
              { name: "Britannia Bread", quantity: 2, price: 84, platform: "zepto" },
              { name: "Eggs (12 pcs)", quantity: 2, price: 156, platform: "zepto" },
              { name: "Amul Butter", quantity: 1, price: 270, platform: "instamart" },
              { name: "Banana (1 dozen)", quantity: 2, price: 104, platform: "zepto" },
              { name: "Milk (1L)", quantity: 3, price: 198, platform: "blinkit" },
            ],
            savings: 67,
            explanation: "Split order strategy: Get bread, eggs, and bananas from Zepto, butter from Instamart, and milk from Blinkit."
          },
          {
            type: "split",
            explanation: "🎯 Smart Split: Order from Zepto (₹344) + Instamart (₹270) + Blinkit (₹198) = ₹812 total instead of ₹879 from single platform"
          }
        ]
      };
    }
    
    if (lowerMessage.includes("party") || lowerMessage.includes("snack")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: "Party time! 🎉 Here's a snack basket for 10 people optimized for savings:",
        suggestions: [
          {
            type: "basket",
            items: [
              { name: "Parle-G Biscuits", quantity: 3, price: 246, platform: "zepto" },
              { name: "Maggi Noodles (12pk)", quantity: 2, price: 336, platform: "blinkit" },
              { name: "Chips Variety", quantity: 4, price: 180, platform: "instamart" },
              { name: "Cold Drinks (2L)", quantity: 3, price: 255, platform: "zepto" },
            ],
            savings: 89,
            explanation: "Best deal: Biscuits & drinks from Zepto, noodles from Blinkit, and chips from Instamart saves you ₹89!"
          }
        ]
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      role: "assistant",
      content: "I can help you find the best deals! Try asking me things like:\n\n• 'Cook pasta for 4 under ₹300'\n• 'Cheapest weekly breakfast'\n• 'Party snacks for 10 people'\n\nI'll build optimized baskets and show you where to split orders for maximum savings!",
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const aiResponse = generateAIResponse(userMessage.content);
    setMessages((prev) => [...prev, aiResponse]);
    setIsLoading(false);
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <AppLayout>
      <div className="container flex h-[calc(100vh-160px)] flex-col px-4 py-4 md:h-[calc(100vh-120px)]">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AI Assistant</h1>
              <p className="text-sm text-muted-foreground">
                Goal-based shopping optimization
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pb-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="mb-6 rounded-2xl bg-primary/10 p-4">
                <Sparkles className="h-10 w-10 text-primary" />
              </div>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                What would you like to shop for?
              </h2>
              <p className="mb-6 text-sm text-muted-foreground max-w-xs">
                Describe your goal and I'll build an optimized basket across platforms
              </p>
              
              <div className="flex flex-wrap justify-center gap-2">
                {examplePrompts.map((prompt) => (
                  <Badge
                    key={prompt}
                    variant="secondary"
                    className="cursor-pointer py-2 px-3 hover:bg-primary/10 transition-colors"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    {prompt}
                  </Badge>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border"
                  )}
                >
                  <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                  
                  {message.suggestions && (
                    <div className="mt-3 space-y-3">
                      {message.suggestions.map((suggestion, idx) => (
                        <SuggestionCard key={idx} suggestion={suggestion} />
                      ))}
                    </div>
                  )}
                </div>
                
                {message.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="rounded-2xl border border-border bg-card px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Finding the best deals...
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-2 pt-4 border-t border-border">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Cook pasta for 4 under ₹300..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" variant="hero" disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </AppLayout>
  );
}

function SuggestionCard({ suggestion }: { suggestion: AISuggestion }) {
  if (suggestion.type === "tip" || suggestion.type === "split") {
    return (
      <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3 text-sm">
        {suggestion.type === "split" ? (
          <SplitSquareVertical className="h-4 w-4 shrink-0 text-primary mt-0.5" />
        ) : (
          <Lightbulb className="h-4 w-4 shrink-0 text-warning mt-0.5" />
        )}
        <p className="text-muted-foreground">{suggestion.explanation}</p>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden border-success/30 bg-success/5 p-0">
      <div className="border-b border-success/20 bg-success/10 px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-success" />
            <span className="font-medium text-success">Recommended Basket</span>
          </div>
          {suggestion.savings && (
            <Badge className="bg-success text-success-foreground">
              <TrendingDown className="mr-1 h-3 w-3" />
              Save ₹{suggestion.savings}
            </Badge>
          )}
        </div>
      </div>
      
      <div className="p-3 space-y-2">
        {suggestion.items?.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="text-foreground">{item.name}</span>
              <span className="text-muted-foreground">×{item.quantity}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">₹{item.price}</span>
              <Badge variant="outline" className="text-[10px] py-0">
                {platforms[item.platform].name}
              </Badge>
            </div>
          </div>
        ))}
        
        {suggestion.explanation && (
          <p className="mt-3 text-xs text-muted-foreground border-t border-border pt-3">
            {suggestion.explanation}
          </p>
        )}
        
        <Button variant="success" size="sm" className="w-full mt-2">
          <ShoppingCart className="h-4 w-4" />
          Add All to Cart
        </Button>
      </div>
    </Card>
  );
}
