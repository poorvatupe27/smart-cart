import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import logo from "@/assets/logo.png";
export function LoginScreen() {
  const {
    login
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const success = await login(email, password);
    if (!success) {
      setError("Please enter a valid email and password (min 4 characters)");
    }
    setLoading(false);
  };
  return <div className="flex min-h-screen flex-col items-center justify-center px-4 gradient-hero">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <img alt="ClearChoice" className="h-50 w-auto" src="/lovable-uploads/a2a11c37-6fb0-43fc-9ad9-d1ceac1b592c.png" />
          <p className="mt-4 text-center text-muted-foreground">
            Compare smarter. Spend less.
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-0 p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="pl-10" required />
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </>}
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Demo: Use any email & password (4+ chars)
          </p>
        </Card>
      </div>
    </div>;
}