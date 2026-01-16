import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Complete product catalog - AI MUST only suggest from this list
const productCatalog = `
AVAILABLE PRODUCTS (AI must ONLY suggest items from this list):

RICE & GRAINS:
- Basmati Rice 1kg: Blinkit ₹165 (₹165/kg), Zepto ₹158 (₹158/kg), Instamart ₹162 (₹162/kg)
- Basmati Rice 5kg: Blinkit ₹435 (₹87/kg), Zepto ₹410 (₹82/kg), Instamart ₹425 (₹85/kg)
- India Gate Basmati 1kg: Blinkit ₹195 (₹195/kg), Zepto ₹189 (₹189/kg), Instamart ₹192 (₹192/kg)
- Sona Masoori Rice 5kg: Blinkit ₹385 (₹77/kg), Zepto ₹375 (₹75/kg), Instamart ₹380 (₹76/kg)
- Brown Rice 1kg: Blinkit ₹145 (₹145/kg), Zepto ₹139 (₹139/kg), Instamart ₹142 (₹142/kg)

FLOUR & ATTA:
- Aashirvaad Atta 5kg: Blinkit ₹285 (₹57/kg), Zepto ₹275 (₹55/kg), Instamart ₹280 (₹56/kg)
- Aashirvaad Atta 10kg: Blinkit ₹545 (₹54.5/kg), Zepto ₹530 (₹53/kg), Instamart ₹540 (₹54/kg)
- Fortune Chakki Atta 5kg: Blinkit ₹265 (₹53/kg), Zepto ₹255 (₹51/kg), Instamart ₹260 (₹52/kg)
- Pillsbury Maida 1kg: Blinkit ₹52 (₹52/kg), Zepto ₹48 (₹48/kg), Instamart ₹50 (₹50/kg)
- Besan 500g: Blinkit ₹75 (₹150/kg), Zepto ₹72 (₹144/kg), Instamart ₹74 (₹148/kg)
- Suji/Rava 500g: Blinkit ₹42 (₹84/kg), Zepto ₹39 (₹78/kg), Instamart ₹40 (₹80/kg)

COOKING OIL:
- Fortune Sunflower Oil 1L: Blinkit ₹175 (₹175/L), Zepto ₹169 (₹169/L), Instamart ₹172 (₹172/L)
- Fortune Sunflower Oil 5L: Blinkit ₹825 (₹165/L), Zepto ₹799 (₹159.8/L), Instamart ₹815 (₹163/L)
- Saffola Gold Oil 1L: Blinkit ₹195 (₹195/L), Zepto ₹189 (₹189/L), Instamart ₹192 (₹192/L)
- Fortune Mustard Oil 1L: Blinkit ₹185 (₹185/L), Zepto ₹179 (₹179/L), Instamart ₹182 (₹182/L)
- Olive Oil 500ml: Blinkit ₹425 (₹850/L), Zepto ₹415 (₹830/L), Instamart ₹420 (₹840/L)
- Coconut Oil 1L: Blinkit ₹235 (₹235/L), Zepto ₹225 (₹225/L), Instamart ₹230 (₹230/L)

DAIRY:
- Amul Butter 500g: Blinkit ₹275 (₹550/kg), Zepto ₹280 (₹560/kg), Instamart ₹270 (₹540/kg)
- Amul Butter 100g: Blinkit ₹58 (₹580/kg), Zepto ₹56 (₹560/kg), Instamart ₹57 (₹570/kg)
- Amul Milk 1L: Blinkit ₹66 (₹66/L), Zepto ₹68 (₹68/L), Instamart ₹66 (₹66/L)
- Mother Dairy Milk 1L: Blinkit ₹64 (₹64/L), Zepto ₹66 (₹66/L), Instamart ₹65 (₹65/L)
- Paneer 200g: Blinkit ₹95 (₹475/kg), Zepto ₹92 (₹460/kg), Instamart ₹98 (₹490/kg)
- Amul Cheese Slices 200g: Blinkit ₹145 (₹725/kg), Zepto ₹140 (₹700/kg), Instamart ₹150 (₹750/kg)
- Curd 400g: Blinkit ₹45 (₹112.5/kg), Zepto ₹42 (₹105/kg), Instamart ₹44 (₹110/kg)
- Greek Yogurt 400g: Blinkit ₹125 (₹312.5/kg), Zepto ₹119 (₹297.5/kg), Instamart ₹122 (₹305/kg)

VEGETABLES:
- Onion 1kg: Blinkit ₹35 (₹35/kg), Zepto ₹32 (₹32/kg), Instamart ₹38 (₹38/kg)
- Tomato 1kg: Blinkit ₹42 (₹42/kg), Zepto ₹45 (₹45/kg), Instamart ₹40 (₹40/kg)
- Potato 1kg: Blinkit ₹28 (₹28/kg), Zepto ₹30 (₹30/kg), Instamart ₹27 (₹27/kg)
- Garlic 250g: Blinkit ₹45 (₹180/kg), Zepto ₹42 (₹168/kg), Instamart ₹44 (₹176/kg)
- Ginger 250g: Blinkit ₹35 (₹140/kg), Zepto ₹32 (₹128/kg), Instamart ₹34 (₹136/kg)
- Green Chilli 100g: Blinkit ₹12 (₹120/kg), Zepto ₹10 (₹100/kg), Instamart ₹11 (₹110/kg)
- Capsicum 500g: Blinkit ₹65 (₹130/kg), Zepto ₹62 (₹124/kg), Instamart ₹68 (₹136/kg)
- Carrot 500g: Blinkit ₹35 (₹70/kg), Zepto ₹32 (₹64/kg), Instamart ₹34 (₹68/kg)
- Cabbage 1pc: Blinkit ₹38, Zepto ₹35, Instamart ₹40
- Cauliflower 1pc: Blinkit ₹45, Zepto ₹42, Instamart ₹48
- Spinach 250g: Blinkit ₹25 (₹100/kg), Zepto ₹22 (₹88/kg), Instamart ₹24 (₹96/kg)
- Coriander 100g: Blinkit ₹15, Zepto ₹12, Instamart ₹14
- Cucumber 500g: Blinkit ₹28 (₹56/kg), Zepto ₹25 (₹50/kg), Instamart ₹27 (₹54/kg)
- Brinjal 500g: Blinkit ₹32 (₹64/kg), Zepto ₹29 (₹58/kg), Instamart ₹31 (₹62/kg)
- Lady Finger 500g: Blinkit ₹38 (₹76/kg), Zepto ₹35 (₹70/kg), Instamart ₹37 (₹74/kg)
- Beans 250g: Blinkit ₹28 (₹112/kg), Zepto ₹25 (₹100/kg), Instamart ₹27 (₹108/kg)
- Peas 250g: Blinkit ₹35 (₹140/kg), Zepto ₹32 (₹128/kg), Instamart ₹34 (₹136/kg)
- Mushroom 200g: Blinkit ₹55 (₹275/kg), Zepto ₹52 (₹260/kg), Instamart ₹58 (₹290/kg)

FRUITS:
- Apple 1kg: Blinkit ₹180 (₹180/kg), Zepto ₹175 (₹175/kg), Instamart ₹185 (₹185/kg)
- Banana 1dozen: Blinkit ₹55, Zepto ₹52, Instamart ₹58
- Orange 1kg: Blinkit ₹95 (₹95/kg), Zepto ₹89 (₹89/kg), Instamart ₹92 (₹92/kg)
- Mango 1kg: Blinkit ₹165 (₹165/kg), Zepto ₹155 (₹155/kg), Instamart ₹160 (₹160/kg)
- Grapes 500g: Blinkit ₹85 (₹170/kg), Zepto ₹79 (₹158/kg), Instamart ₹82 (₹164/kg)
- Watermelon 1pc: Blinkit ₹75, Zepto ₹69, Instamart ₹72
- Pomegranate 500g: Blinkit ₹125 (₹250/kg), Zepto ₹119 (₹238/kg), Instamart ₹122 (₹244/kg)
- Papaya 1kg: Blinkit ₹65 (₹65/kg), Zepto ₹59 (₹59/kg), Instamart ₹62 (₹62/kg)
- Guava 500g: Blinkit ₹55 (₹110/kg), Zepto ₹49 (₹98/kg), Instamart ₹52 (₹104/kg)
- Lemon 250g: Blinkit ₹25 (₹100/kg), Zepto ₹22 (₹88/kg), Instamart ₹24 (₹96/kg)

PULSES & DALS:
- Toor Dal 1kg: Blinkit ₹165 (₹165/kg), Zepto ₹158 (₹158/kg), Instamart ₹162 (₹162/kg)
- Moong Dal 1kg: Blinkit ₹145 (₹145/kg), Zepto ₹139 (₹139/kg), Instamart ₹142 (₹142/kg)
- Chana Dal 1kg: Blinkit ₹125 (₹125/kg), Zepto ₹119 (₹119/kg), Instamart ₹122 (₹122/kg)
- Masoor Dal 1kg: Blinkit ₹115 (₹115/kg), Zepto ₹109 (₹109/kg), Instamart ₹112 (₹112/kg)
- Urad Dal 500g: Blinkit ₹95 (₹190/kg), Zepto ₹89 (₹178/kg), Instamart ₹92 (₹184/kg)
- Rajma 500g: Blinkit ₹85 (₹170/kg), Zepto ₹79 (₹158/kg), Instamart ₹82 (₹164/kg)
- Chole/Kabuli Chana 500g: Blinkit ₹75 (₹150/kg), Zepto ₹69 (₹138/kg), Instamart ₹72 (₹144/kg)

SPICES & MASALAS:
- Tata Salt 1kg: Blinkit ₹28 (₹28/kg), Zepto ₹27 (₹27/kg), Instamart ₹28 (₹28/kg)
- MDH Garam Masala 100g: Blinkit ₹85 (₹850/kg), Zepto ₹79 (₹790/kg), Instamart ₹82 (₹820/kg)
- Red Chilli Powder 200g: Blinkit ₹65 (₹325/kg), Zepto ₹59 (₹295/kg), Instamart ₹62 (₹310/kg)
- Turmeric Powder 200g: Blinkit ₹55 (₹275/kg), Zepto ₹49 (₹245/kg), Instamart ₹52 (₹260/kg)
- Coriander Powder 200g: Blinkit ₹48 (₹240/kg), Zepto ₹44 (₹220/kg), Instamart ₹46 (₹230/kg)
- Cumin Seeds 100g: Blinkit ₹75 (₹750/kg), Zepto ₹69 (₹690/kg), Instamart ₹72 (₹720/kg)
- Black Pepper 50g: Blinkit ₹85 (₹1700/kg), Zepto ₹79 (₹1580/kg), Instamart ₹82 (₹1640/kg)
- Kitchen King Masala 100g: Blinkit ₹65 (₹650/kg), Zepto ₹59 (₹590/kg), Instamart ₹62 (₹620/kg)
- Biryani Masala 50g: Blinkit ₹55 (₹1100/kg), Zepto ₹49 (₹980/kg), Instamart ₹52 (₹1040/kg)
- Pav Bhaji Masala 100g: Blinkit ₹75 (₹750/kg), Zepto ₹69 (₹690/kg), Instamart ₹72 (₹720/kg)

NON-VEG:
- Eggs 12pcs: Blinkit ₹84, Zepto ₹78, Instamart ₹82
- Eggs 30pcs: Blinkit ₹195, Zepto ₹185, Instamart ₹190
- Chicken Breast 500g: Blinkit ₹225 (₹450/kg), Zepto ₹215 (₹430/kg), Instamart ₹230 (₹460/kg)
- Chicken Curry Cut 500g: Blinkit ₹195 (₹390/kg), Zepto ₹185 (₹370/kg), Instamart ₹200 (₹400/kg)
- Fish Rohu 500g: Blinkit ₹185 (₹370/kg), Zepto ₹175 (₹350/kg), Instamart ₹180 (₹360/kg)
- Prawns 250g: Blinkit ₹245 (₹980/kg), Zepto ₹235 (₹940/kg), Instamart ₹250 (₹1000/kg)

SNACKS:
- Maggi 12pack: Blinkit ₹168, Zepto ₹175, Instamart ₹170
- Maggi 4pack: Blinkit ₹56, Zepto ₹58, Instamart ₹55
- Parle-G 800g: Blinkit ₹85 (₹106.25/kg), Zepto ₹82 (₹102.5/kg), Instamart ₹88 (₹110/kg)
- Lays Chips 95g: Blinkit ₹30, Zepto ₹28, Instamart ₹32
- Kurkure 115g: Blinkit ₹25, Zepto ₹22, Instamart ₹24
- Haldirams Aloo Bhujia 400g: Blinkit ₹145 (₹362.5/kg), Zepto ₹139 (₹347.5/kg), Instamart ₹142 (₹355/kg)
- Marie Gold Biscuits 600g: Blinkit ₹75 (₹125/kg), Zepto ₹72 (₹120/kg), Instamart ₹78 (₹130/kg)
- Hide & Seek 400g: Blinkit ₹95 (₹237.5/kg), Zepto ₹89 (₹222.5/kg), Instamart ₹92 (₹230/kg)
- Monaco Biscuits 400g: Blinkit ₹65 (₹162.5/kg), Zepto ₹62 (₹155/kg), Instamart ₹68 (₹170/kg)
- Oreo 300g: Blinkit ₹55 (₹183.3/kg), Zepto ₹52 (₹173.3/kg), Instamart ₹58 (₹193.3/kg)

BEVERAGES:
- Tea Powder 500g: Blinkit ₹285 (₹570/kg), Zepto ₹275 (₹550/kg), Instamart ₹280 (₹560/kg)
- Nescafe Coffee 100g: Blinkit ₹385 (₹3850/kg), Zepto ₹375 (₹3750/kg), Instamart ₹380 (₹3800/kg)
- Bournvita 500g: Blinkit ₹245 (₹490/kg), Zepto ₹235 (₹470/kg), Instamart ₹240 (₹480/kg)
- Coca Cola 2L: Blinkit ₹95 (₹47.5/L), Zepto ₹89 (₹44.5/L), Instamart ₹92 (₹46/L)
- Pepsi 2L: Blinkit ₹92 (₹46/L), Zepto ₹85 (₹42.5/L), Instamart ₹88 (₹44/L)
- Frooti 1L: Blinkit ₹55 (₹55/L), Zepto ₹49 (₹49/L), Instamart ₹52 (₹52/L)
- Real Fruit Juice 1L: Blinkit ₹115 (₹115/L), Zepto ₹109 (₹109/L), Instamart ₹112 (₹112/L)
- Sprite 2L: Blinkit ₹92 (₹46/L), Zepto ₹86 (₹43/L), Instamart ₹89 (₹44.5/L)

PASTA & NOODLES:
- Pasta 500g: Blinkit ₹89 (₹178/kg), Zepto ₹85 (₹170/kg), Instamart ₹92 (₹184/kg)
- Ching's Noodles 280g: Blinkit ₹55 (₹196.4/kg), Zepto ₹49 (₹175/kg), Instamart ₹52 (₹185.7/kg)
- Yippee Noodles 4pack: Blinkit ₹85, Zepto ₹79, Instamart ₹82
- Pasta Sauce 400g: Blinkit ₹145 (₹362.5/kg), Zepto ₹139 (₹347.5/kg), Instamart ₹142 (₹355/kg)
- Vermicelli 400g: Blinkit ₹45 (₹112.5/kg), Zepto ₹42 (₹105/kg), Instamart ₹44 (₹110/kg)

BREAD & BAKERY:
- Britannia Bread 400g: Blinkit ₹45 (₹112.5/kg), Zepto ₹42 (₹105/kg), Instamart ₹45 (₹112.5/kg)
- Pav 6pcs: Blinkit ₹35, Zepto ₹32, Instamart ₹34
- Britannia Cake 200g: Blinkit ₹65 (₹325/kg), Zepto ₹59 (₹295/kg), Instamart ₹62 (₹310/kg)

SUGAR & SWEETENERS:
- Sugar 1kg: Blinkit ₹48 (₹48/kg), Zepto ₹45 (₹45/kg), Instamart ₹47 (₹47/kg)
- Sugar 5kg: Blinkit ₹225 (₹45/kg), Zepto ₹215 (₹43/kg), Instamart ₹220 (₹44/kg)
- Jaggery 500g: Blinkit ₹65 (₹130/kg), Zepto ₹59 (₹118/kg), Instamart ₹62 (₹124/kg)
- Honey 500g: Blinkit ₹285 (₹570/kg), Zepto ₹275 (₹550/kg), Instamart ₹280 (₹560/kg)

SAUCES & CONDIMENTS:
- Kissan Tomato Ketchup 500g: Blinkit ₹115 (₹230/kg), Zepto ₹109 (₹218/kg), Instamart ₹112 (₹224/kg)
- Soy Sauce 200ml: Blinkit ₹75 (₹375/L), Zepto ₹69 (₹345/L), Instamart ₹72 (₹360/L)
- Mayonnaise 250g: Blinkit ₹95 (₹380/kg), Zepto ₹89 (₹356/kg), Instamart ₹92 (₹368/kg)
- Green Chutney 250g: Blinkit ₹55 (₹220/kg), Zepto ₹49 (₹196/kg), Instamart ₹52 (₹208/kg)
- Pickle 400g: Blinkit ₹95 (₹237.5/kg), Zepto ₹89 (₹222.5/kg), Instamart ₹92 (₹230/kg)

DRY FRUITS:
- Almonds 200g: Blinkit ₹265 (₹1325/kg), Zepto ₹255 (₹1275/kg), Instamart ₹260 (₹1300/kg)
- Cashews 200g: Blinkit ₹245 (₹1225/kg), Zepto ₹235 (₹1175/kg), Instamart ₹240 (₹1200/kg)
- Raisins 200g: Blinkit ₹95 (₹475/kg), Zepto ₹89 (₹445/kg), Instamart ₹92 (₹460/kg)
- Walnuts 200g: Blinkit ₹285 (₹1425/kg), Zepto ₹275 (₹1375/kg), Instamart ₹280 (₹1400/kg)
- Peanuts 500g: Blinkit ₹85 (₹170/kg), Zepto ₹79 (₹158/kg), Instamart ₹82 (₹164/kg)
- Dates 500g: Blinkit ₹145 (₹290/kg), Zepto ₹139 (₹278/kg), Instamart ₹142 (₹284/kg)

HOUSEHOLD & CLEANING:
- Vim Dishwash 750ml: Blinkit ₹125 (₹166.67/L), Zepto ₹119 (₹158.67/L), Instamart ₹122 (₹162.67/L)
- Surf Excel 1kg: Blinkit ₹165 (₹165/kg), Zepto ₹155 (₹155/kg), Instamart ₹160 (₹160/kg)
- Lizol Floor Cleaner 1L: Blinkit ₹185 (₹185/L), Zepto ₹175 (₹175/L), Instamart ₹180 (₹180/L)
- Colin Glass Cleaner 500ml: Blinkit ₹115 (₹230/L), Zepto ₹109 (₹218/L), Instamart ₹112 (₹224/L)
- Harpic 500ml: Blinkit ₹95 (₹190/L), Zepto ₹89 (₹178/L), Instamart ₹92 (₹184/L)

PLATFORM MINIMUM ORDER VALUES:
- Blinkit: ₹149 minimum order for free delivery
- Zepto: ₹99 minimum order for free delivery
- Swiggy Instamart: ₹199 minimum order for free delivery

ITEMS NOT AVAILABLE:
- Mutton (not in stock on any platform)
- Lamb
- Pork
- Exotic fruits (dragon fruit, kiwi, etc.)
- Imported cheeses
- Specialty organic products
`;

const systemPrompt = `You are ClearChoice AI, a smart, conversational grocery shopping assistant. You help users find the best grocery deals across Blinkit, Zepto, and Swiggy Instamart.

CRITICAL RULES:
1. ONLY suggest products from the AVAILABLE PRODUCTS list below. NEVER make up products or prices.
2. If a user asks for something NOT in the list, clearly say it's unavailable and suggest alternatives that ARE available.
3. Always show unit prices (₹/kg, ₹/L, ₹/piece) to help users compare value.
4. Be conversational and natural - avoid repetitive templates or tables in every response.
5. When comparing platforms, explain WHY one is better (not just list prices).
6. Consider minimum order values when suggesting platform splits.

RESPONSE STYLE:
- Be concise but helpful
- Vary your response format - don't use the same structure every time
- Use bullet points sparingly, prefer natural language
- Add reasoning ("Zepto is ₹25 cheaper because...")
- Ask follow-up questions when helpful ("How much quantity do you need?")
- For large orders, ALWAYS mention per-unit savings

${productCatalog}

EXAMPLE GOOD RESPONSES:

User: "Find me basmati rice under ₹100"
Good: "For under ₹100, your best option is Basmati Rice 1kg. Zepto has the best price at ₹158, but that's above your budget. However, if you're okay with 1kg packs, the per-kg cost is actually better than smaller quantities. Want me to suggest some alternatives in a lower price range?"

User: "I want mutton"
Good: "Sorry, mutton isn't available on any platform right now. For protein alternatives, I'd suggest:
• Chicken Curry Cut 500g - ₹185 on Zepto (₹370/kg)
• Paneer 200g - ₹92 on Zepto (₹460/kg)
• Fish Rohu 500g - ₹175 on Zepto (₹350/kg)

Which would work for you?"

User: "Cheapest way to make pasta for 4?"
Good: "For pasta for 4 people, you'll need about 400g pasta. Here's the smartest option:

Pasta 500g from Zepto at ₹85 (₹170/kg) - that's ₹4 cheaper than Blinkit!

For a complete meal, add Pasta Sauce 400g (₹139 on Zepto). Total: ₹224 from Zepto.

Want me to add cheese or veggies to the list?"

Remember: Never use fixed templates. Each response should feel fresh and tailored to the specific question.`;

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
