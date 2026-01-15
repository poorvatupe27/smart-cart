import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are ClearChoice AI, a smart shopping assistant that helps users find the best grocery deals across platforms like Blinkit, Zepto, and Instamart.

You have access to pricing data (mocked but realistic) for common grocery items. When users ask about products or shopping goals:

1. **Product Discovery**: Help users find specific products with prices across platforms
2. **Price Comparison**: Show which platform offers the best price for items
3. **Cart Optimization**: Suggest splitting orders across platforms to maximize savings
4. **Goal-Based Shopping**: Build complete shopping baskets for cooking goals or budgets
5. **Unit Price Intelligence**: Always calculate and show per-unit prices (e.g., ₹87/kg)

SAMPLE PRICING DATA (use these as realistic references):
- Basmati Rice 1kg: Blinkit ₹165, Zepto ₹158, Instamart ₹162
- Basmati Rice 5kg: Blinkit ₹435, Zepto ₹410, Instamart ₹425
- Amul Butter 500g: Blinkit ₹275, Zepto ₹280, Instamart ₹270
- Tata Salt 1kg: Blinkit ₹28, Zepto ₹27, Instamart ₹28
- Fortune Oil 1L: Blinkit ₹175, Zepto ₹169, Instamart ₹172
- Britannia Bread 400g: Blinkit ₹45, Zepto ₹42, Instamart ₹45
- Amul Milk 1L: Blinkit ₹66, Zepto ₹68, Instamart ₹66
- Onion 1kg: Blinkit ₹35, Zepto ₹32, Instamart ₹38
- Tomato 1kg: Blinkit ₹42, Zepto ₹45, Instamart ₹40
- Potato 1kg: Blinkit ₹28, Zepto ₹30, Instamart ₹27
- Eggs 12pcs: Blinkit ₹84, Zepto ₹78, Instamart ₹82
- Paneer 200g: Blinkit ₹95, Zepto ₹92, Instamart ₹98
- Chicken 500g: Blinkit ₹225, Zepto ₹215, Instamart ₹230
- Maggi 12pack: Blinkit ₹168, Zepto ₹175, Instamart ₹170
- Parle-G 800g: Blinkit ₹85, Zepto ₹82, Instamart ₹88
- Apple 1kg: Blinkit ₹180, Zepto ₹175, Instamart ₹185
- Banana 1dozen: Blinkit ₹55, Zepto ₹52, Instamart ₹58
- Pasta 500g: Blinkit ₹89, Zepto ₹85, Instamart ₹92
- Cheese 200g: Blinkit ₹145, Zepto ₹140, Instamart ₹150
- Curd 400g: Blinkit ₹45, Zepto ₹42, Instamart ₹44

RESPONSE GUIDELINES:
- Be concise but helpful
- Always mention the platform names (Blinkit, Zepto, Instamart)
- Show savings when relevant (e.g., "Save ₹23 by ordering from Zepto")
- For large quantities, always show per-unit price
- Suggest cart splitting when it makes sense
- Provide reasoning for your recommendations
- Use ₹ symbol for prices
- Be conversational and friendly

When you don't have exact data, provide realistic estimates based on the pricing patterns above.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
