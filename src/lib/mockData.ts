// Mock data for ClearChoice grocery comparison app

export type Platform = "blinkit" | "zepto" | "instamart";

export interface PlatformInfo {
  id: Platform;
  name: string;
  color: string;
  deliveryFee: number;
  minOrder: number;
}

export const platforms: Record<Platform, PlatformInfo> = {
  blinkit: {
    id: "blinkit",
    name: "Blinkit",
    color: "platform-blinkit",
    deliveryFee: 25,
    minOrder: 199,
  },
  zepto: {
    id: "zepto",
    name: "Zepto",
    color: "platform-zepto",
    deliveryFee: 29,
    minOrder: 149,
  },
  instamart: {
    id: "instamart",
    name: "Instamart",
    color: "platform-instamart",
    deliveryFee: 20,
    minOrder: 199,
  },
};

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  unit: string;
  prices: Record<Platform, number>;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Amul Butter",
    category: "Dairy",
    image: "🧈",
    unit: "500g",
    prices: { blinkit: 275, zepto: 280, instamart: 270 },
  },
  {
    id: "2",
    name: "Tata Salt",
    category: "Essentials",
    image: "🧂",
    unit: "1kg",
    prices: { blinkit: 28, zepto: 27, instamart: 28 },
  },
  {
    id: "3",
    name: "Aashirvaad Atta",
    category: "Essentials",
    image: "🌾",
    unit: "5kg",
    prices: { blinkit: 295, zepto: 310, instamart: 299 },
  },
  {
    id: "4",
    name: "Fortune Sunflower Oil",
    category: "Essentials",
    image: "🫒",
    unit: "1L",
    prices: { blinkit: 175, zepto: 169, instamart: 172 },
  },
  {
    id: "5",
    name: "Britannia Bread",
    category: "Bakery",
    image: "🍞",
    unit: "400g",
    prices: { blinkit: 45, zepto: 42, instamart: 45 },
  },
  {
    id: "6",
    name: "Amul Milk",
    category: "Dairy",
    image: "🥛",
    unit: "1L",
    prices: { blinkit: 66, zepto: 68, instamart: 66 },
  },
  {
    id: "7",
    name: "Onion",
    category: "Vegetables",
    image: "🧅",
    unit: "1kg",
    prices: { blinkit: 35, zepto: 32, instamart: 38 },
  },
  {
    id: "8",
    name: "Tomato",
    category: "Vegetables",
    image: "🍅",
    unit: "1kg",
    prices: { blinkit: 42, zepto: 45, instamart: 40 },
  },
  {
    id: "9",
    name: "Potato",
    category: "Vegetables",
    image: "🥔",
    unit: "1kg",
    prices: { blinkit: 28, zepto: 30, instamart: 27 },
  },
  {
    id: "10",
    name: "Maggi Noodles",
    category: "Packaged",
    image: "🍜",
    unit: "Pack of 12",
    prices: { blinkit: 168, zepto: 175, instamart: 170 },
  },
  {
    id: "11",
    name: "Parle-G Biscuits",
    category: "Snacks",
    image: "🍪",
    unit: "800g",
    prices: { blinkit: 85, zepto: 82, instamart: 88 },
  },
  {
    id: "12",
    name: "Eggs",
    category: "Dairy",
    image: "🥚",
    unit: "12 pcs",
    prices: { blinkit: 84, zepto: 78, instamart: 82 },
  },
  {
    id: "13",
    name: "Banana",
    category: "Fruits",
    image: "🍌",
    unit: "1 dozen",
    prices: { blinkit: 55, zepto: 52, instamart: 58 },
  },
  {
    id: "14",
    name: "Apple",
    category: "Fruits",
    image: "🍎",
    unit: "1kg",
    prices: { blinkit: 180, zepto: 175, instamart: 185 },
  },
  {
    id: "15",
    name: "Chicken Breast",
    category: "Meat",
    image: "🍗",
    unit: "500g",
    prices: { blinkit: 225, zepto: 215, instamart: 230 },
  },
  {
    id: "16",
    name: "Paneer",
    category: "Dairy",
    image: "🧀",
    unit: "200g",
    prices: { blinkit: 95, zepto: 92, instamart: 98 },
  },
  {
    id: "17",
    name: "Basmati Rice",
    category: "Essentials",
    image: "🍚",
    unit: "1kg",
    prices: { blinkit: 165, zepto: 158, instamart: 162 },
  },
  {
    id: "18",
    name: "Curd",
    category: "Dairy",
    image: "🥣",
    unit: "400g",
    prices: { blinkit: 45, zepto: 42, instamart: 44 },
  },
];

export const categories = [
  "All",
  "Dairy",
  "Essentials",
  "Vegetables",
  "Fruits",
  "Packaged",
  "Snacks",
  "Meat",
  "Bakery",
];

export interface CartItem {
  product: Product;
  quantity: number;
}

export function getBestPrice(product: Product): { platform: Platform; price: number } {
  const entries = Object.entries(product.prices) as [Platform, number][];
  const best = entries.reduce((min, curr) => (curr[1] < min[1] ? curr : min));
  return { platform: best[0], price: best[1] };
}

export function calculateCartTotal(
  cart: CartItem[],
  platform: Platform
): number {
  return cart.reduce(
    (total, item) => total + item.product.prices[platform] * item.quantity,
    0
  );
}

export function getCartSavings(cart: CartItem[]): {
  bestPlatform: Platform;
  bestTotal: number;
  worstTotal: number;
  savings: number;
} {
  const platformTotals: Record<Platform, number> = {
    blinkit: calculateCartTotal(cart, "blinkit"),
    zepto: calculateCartTotal(cart, "zepto"),
    instamart: calculateCartTotal(cart, "instamart"),
  };

  const entries = Object.entries(platformTotals) as [Platform, number][];
  const best = entries.reduce((min, curr) => (curr[1] < min[1] ? curr : min));
  const worst = entries.reduce((max, curr) => (curr[1] > max[1] ? curr : max));

  return {
    bestPlatform: best[0],
    bestTotal: best[1],
    worstTotal: worst[1],
    savings: worst[1] - best[1],
  };
}
