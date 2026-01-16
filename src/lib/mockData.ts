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
    minOrder: 149,
  },
  zepto: {
    id: "zepto",
    name: "Zepto",
    color: "platform-zepto",
    deliveryFee: 29,
    minOrder: 99,
  },
  instamart: {
    id: "instamart",
    name: "Swiggy Instamart",
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
  unitQty: number; // numeric quantity for unit price calculation
  unitType: "kg" | "g" | "L" | "ml" | "pcs" | "pack" | "dozen";
  prices: Record<Platform, number>;
}

// Helper to generate price with slight variance across platforms
function generatePrices(basePrice: number): Record<Platform, number> {
  const variance = () => Math.round((Math.random() * 0.15 - 0.075) * basePrice);
  return {
    blinkit: basePrice + variance(),
    zepto: basePrice + variance(),
    instamart: basePrice + variance(),
  };
}

// Generate product ID
let productIdCounter = 0;
function genId(): string {
  return String(++productIdCounter);
}

// Product templates with realistic grocery items
const productTemplates = [
  // Rice & Grains
  { name: "India Gate Basmati Rice", category: "Rice & Grains", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 165 },
  { name: "India Gate Basmati Rice", category: "Rice & Grains", unit: "5kg", unitQty: 5, unitType: "kg", basePrice: 725 },
  { name: "Daawat Rozana Basmati Rice", category: "Rice & Grains", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 95 },
  { name: "Daawat Rozana Basmati Rice", category: "Rice & Grains", unit: "5kg", unitQty: 5, unitType: "kg", basePrice: 425 },
  { name: "Fortune Everyday Basmati Rice", category: "Rice & Grains", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 85 },
  { name: "Fortune Everyday Basmati Rice", category: "Rice & Grains", unit: "5kg", unitQty: 5, unitType: "kg", basePrice: 385 },
  { name: "Kohinoor Super Basmati Rice", category: "Rice & Grains", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 195 },
  { name: "Kohinoor Super Basmati Rice", category: "Rice & Grains", unit: "5kg", unitQty: 5, unitType: "kg", basePrice: 895 },
  { name: "Tata Sampann Brown Rice", category: "Rice & Grains", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 135 },
  { name: "Sona Masoori Rice", category: "Rice & Grains", unit: "5kg", unitQty: 5, unitType: "kg", basePrice: 345 },
  { name: "Sona Masoori Rice", category: "Rice & Grains", unit: "10kg", unitQty: 10, unitType: "kg", basePrice: 645 },
  { name: "BB Royal Ponni Rice", category: "Rice & Grains", unit: "5kg", unitQty: 5, unitType: "kg", basePrice: 385 },
  
  // Atta & Flour
  { name: "Aashirvaad Whole Wheat Atta", category: "Atta & Flour", unit: "5kg", unitQty: 5, unitType: "kg", basePrice: 295 },
  { name: "Aashirvaad Whole Wheat Atta", category: "Atta & Flour", unit: "10kg", unitQty: 10, unitType: "kg", basePrice: 545 },
  { name: "Aashirvaad Multigrain Atta", category: "Atta & Flour", unit: "5kg", unitQty: 5, unitType: "kg", basePrice: 325 },
  { name: "Fortune Chakki Fresh Atta", category: "Atta & Flour", unit: "5kg", unitQty: 5, unitType: "kg", basePrice: 265 },
  { name: "Fortune Chakki Fresh Atta", category: "Atta & Flour", unit: "10kg", unitQty: 10, unitType: "kg", basePrice: 495 },
  { name: "Pillsbury Chakki Fresh Atta", category: "Atta & Flour", unit: "5kg", unitQty: 5, unitType: "kg", basePrice: 275 },
  { name: "Rajdhani Besan", category: "Atta & Flour", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 72 },
  { name: "Rajdhani Besan", category: "Atta & Flour", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 135 },
  { name: "Rajdhani Maida", category: "Atta & Flour", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 55 },
  { name: "Rajdhani Sooji", category: "Atta & Flour", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 42 },
  { name: "MTR Rava", category: "Atta & Flour", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 58 },
  { name: "Pillsbury Maida", category: "Atta & Flour", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 62 },
  
  // Cooking Oil
  { name: "Fortune Sunflower Oil", category: "Cooking Oil", unit: "1L", unitQty: 1, unitType: "L", basePrice: 175 },
  { name: "Fortune Sunflower Oil", category: "Cooking Oil", unit: "2L", unitQty: 2, unitType: "L", basePrice: 335 },
  { name: "Fortune Sunflower Oil", category: "Cooking Oil", unit: "5L", unitQty: 5, unitType: "L", basePrice: 795 },
  { name: "Saffola Gold Oil", category: "Cooking Oil", unit: "1L", unitQty: 1, unitType: "L", basePrice: 195 },
  { name: "Saffola Gold Oil", category: "Cooking Oil", unit: "2L", unitQty: 2, unitType: "L", basePrice: 375 },
  { name: "Saffola Total Oil", category: "Cooking Oil", unit: "1L", unitQty: 1, unitType: "L", basePrice: 185 },
  { name: "Nature Fresh Mustard Oil", category: "Cooking Oil", unit: "1L", unitQty: 1, unitType: "L", basePrice: 195 },
  { name: "Fortune Mustard Oil", category: "Cooking Oil", unit: "1L", unitQty: 1, unitType: "L", basePrice: 185 },
  { name: "Fortune Rice Bran Oil", category: "Cooking Oil", unit: "1L", unitQty: 1, unitType: "L", basePrice: 165 },
  { name: "Patanjali Groundnut Oil", category: "Cooking Oil", unit: "1L", unitQty: 1, unitType: "L", basePrice: 205 },
  { name: "Sundrop Heart Oil", category: "Cooking Oil", unit: "1L", unitQty: 1, unitType: "L", basePrice: 175 },
  { name: "Oleev Active Olive Oil", category: "Cooking Oil", unit: "1L", unitQty: 1, unitType: "L", basePrice: 545 },
  { name: "Borges Extra Virgin Olive Oil", category: "Cooking Oil", unit: "500ml", unitQty: 0.5, unitType: "L", basePrice: 475 },
  
  // Dal & Pulses
  { name: "Tata Sampann Toor Dal", category: "Dal & Pulses", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 175 },
  { name: "Tata Sampann Toor Dal", category: "Dal & Pulses", unit: "2kg", unitQty: 2, unitType: "kg", basePrice: 335 },
  { name: "Tata Sampann Chana Dal", category: "Dal & Pulses", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 145 },
  { name: "Tata Sampann Moong Dal", category: "Dal & Pulses", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 165 },
  { name: "Fortune Toor Dal", category: "Dal & Pulses", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 165 },
  { name: "Fortune Chana Dal", category: "Dal & Pulses", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 135 },
  { name: "BB Royal Urad Dal", category: "Dal & Pulses", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 92 },
  { name: "BB Royal Urad Dal", category: "Dal & Pulses", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 175 },
  { name: "BB Royal Masoor Dal", category: "Dal & Pulses", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 125 },
  { name: "Rajma Red", category: "Dal & Pulses", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 85 },
  { name: "Rajma Chitra", category: "Dal & Pulses", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 92 },
  { name: "Kabuli Chana", category: "Dal & Pulses", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 88 },
  { name: "Black Chana", category: "Dal & Pulses", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 72 },
  { name: "Lobia (Black Eyed Peas)", category: "Dal & Pulses", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 78 },
  
  // Spices & Masalas
  { name: "MDH Garam Masala", category: "Spices", unit: "100g", unitQty: 100, unitType: "g", basePrice: 95 },
  { name: "MDH Chana Masala", category: "Spices", unit: "100g", unitQty: 100, unitType: "g", basePrice: 65 },
  { name: "MDH Chicken Masala", category: "Spices", unit: "100g", unitQty: 100, unitType: "g", basePrice: 75 },
  { name: "Everest Garam Masala", category: "Spices", unit: "100g", unitQty: 100, unitType: "g", basePrice: 92 },
  { name: "Everest Sambhar Masala", category: "Spices", unit: "100g", unitQty: 100, unitType: "g", basePrice: 58 },
  { name: "Catch Red Chilli Powder", category: "Spices", unit: "200g", unitQty: 200, unitType: "g", basePrice: 78 },
  { name: "Catch Turmeric Powder", category: "Spices", unit: "200g", unitQty: 200, unitType: "g", basePrice: 65 },
  { name: "Catch Coriander Powder", category: "Spices", unit: "200g", unitQty: 200, unitType: "g", basePrice: 58 },
  { name: "Catch Cumin Powder", category: "Spices", unit: "100g", unitQty: 100, unitType: "g", basePrice: 72 },
  { name: "Tata Sampann Turmeric", category: "Spices", unit: "200g", unitQty: 200, unitType: "g", basePrice: 85 },
  { name: "Tata Sampann Red Chilli", category: "Spices", unit: "200g", unitQty: 200, unitType: "g", basePrice: 95 },
  { name: "Organic Tattva Cumin Seeds", category: "Spices", unit: "100g", unitQty: 100, unitType: "g", basePrice: 58 },
  { name: "Organic Tattva Mustard Seeds", category: "Spices", unit: "100g", unitQty: 100, unitType: "g", basePrice: 42 },
  { name: "Whole Black Pepper", category: "Spices", unit: "50g", unitQty: 50, unitType: "g", basePrice: 95 },
  { name: "Cinnamon Sticks", category: "Spices", unit: "50g", unitQty: 50, unitType: "g", basePrice: 65 },
  { name: "Bay Leaves", category: "Spices", unit: "25g", unitQty: 25, unitType: "g", basePrice: 35 },
  { name: "Cardamom Green", category: "Spices", unit: "25g", unitQty: 25, unitType: "g", basePrice: 125 },
  { name: "Cloves", category: "Spices", unit: "25g", unitQty: 25, unitType: "g", basePrice: 85 },
  
  // Salt & Sugar
  { name: "Tata Salt", category: "Essentials", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 28 },
  { name: "Tata Rock Salt", category: "Essentials", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 42 },
  { name: "Catch Black Salt", category: "Essentials", unit: "200g", unitQty: 200, unitType: "g", basePrice: 35 },
  { name: "Tata Sugar", category: "Essentials", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 48 },
  { name: "Tata Sugar", category: "Essentials", unit: "5kg", unitQty: 5, unitType: "kg", basePrice: 225 },
  { name: "Uttam Sugar", category: "Essentials", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 45 },
  { name: "Sugar Free Gold", category: "Essentials", unit: "100 pellets", unitQty: 100, unitType: "pcs", basePrice: 145 },
  { name: "Jaggery Powder", category: "Essentials", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 85 },
  
  // Dairy - Milk
  { name: "Amul Taaza Toned Milk", category: "Dairy", unit: "1L", unitQty: 1, unitType: "L", basePrice: 66 },
  { name: "Amul Gold Full Cream Milk", category: "Dairy", unit: "1L", unitQty: 1, unitType: "L", basePrice: 72 },
  { name: "Mother Dairy Toned Milk", category: "Dairy", unit: "1L", unitQty: 1, unitType: "L", basePrice: 64 },
  { name: "Mother Dairy Full Cream Milk", category: "Dairy", unit: "1L", unitQty: 1, unitType: "L", basePrice: 70 },
  { name: "Nestle A+ Toned Milk", category: "Dairy", unit: "1L", unitQty: 1, unitType: "L", basePrice: 68 },
  { name: "Amul Slim n Trim Milk", category: "Dairy", unit: "1L", unitQty: 1, unitType: "L", basePrice: 58 },
  
  // Dairy - Butter, Cheese, Paneer
  { name: "Amul Butter", category: "Dairy", unit: "100g", unitQty: 100, unitType: "g", basePrice: 58 },
  { name: "Amul Butter", category: "Dairy", unit: "500g", unitQty: 500, unitType: "g", basePrice: 275 },
  { name: "Britannia Butter", category: "Dairy", unit: "100g", unitQty: 100, unitType: "g", basePrice: 55 },
  { name: "Amul Cheese Slices", category: "Dairy", unit: "200g", unitQty: 200, unitType: "g", basePrice: 145 },
  { name: "Amul Cheese Cubes", category: "Dairy", unit: "200g", unitQty: 200, unitType: "g", basePrice: 135 },
  { name: "Britannia Cheese Slices", category: "Dairy", unit: "200g", unitQty: 200, unitType: "g", basePrice: 140 },
  { name: "Amul Fresh Paneer", category: "Dairy", unit: "200g", unitQty: 200, unitType: "g", basePrice: 95 },
  { name: "Amul Fresh Paneer", category: "Dairy", unit: "400g", unitQty: 400, unitType: "g", basePrice: 175 },
  { name: "Mother Dairy Paneer", category: "Dairy", unit: "200g", unitQty: 200, unitType: "g", basePrice: 92 },
  { name: "Amul Malai Paneer", category: "Dairy", unit: "200g", unitQty: 200, unitType: "g", basePrice: 115 },
  
  // Dairy - Curd & Yogurt
  { name: "Amul Masti Dahi", category: "Dairy", unit: "400g", unitQty: 400, unitType: "g", basePrice: 45 },
  { name: "Amul Masti Dahi", category: "Dairy", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 95 },
  { name: "Mother Dairy Dahi", category: "Dairy", unit: "400g", unitQty: 400, unitType: "g", basePrice: 42 },
  { name: "Nestle A+ Dahi", category: "Dairy", unit: "400g", unitQty: 400, unitType: "g", basePrice: 48 },
  { name: "Epigamia Greek Yogurt", category: "Dairy", unit: "90g", unitQty: 90, unitType: "g", basePrice: 55 },
  { name: "Amul Lassi Mango", category: "Dairy", unit: "200ml", unitQty: 0.2, unitType: "L", basePrice: 25 },
  { name: "Amul Buttermilk", category: "Dairy", unit: "200ml", unitQty: 0.2, unitType: "L", basePrice: 18 },
  
  // Dairy - Cream & Ghee
  { name: "Amul Fresh Cream", category: "Dairy", unit: "200ml", unitQty: 0.2, unitType: "L", basePrice: 65 },
  { name: "Amul Ghee", category: "Dairy", unit: "500ml", unitQty: 0.5, unitType: "L", basePrice: 295 },
  { name: "Amul Ghee", category: "Dairy", unit: "1L", unitQty: 1, unitType: "L", basePrice: 565 },
  { name: "Patanjali Cow Ghee", category: "Dairy", unit: "500ml", unitQty: 0.5, unitType: "L", basePrice: 325 },
  
  // Eggs & Poultry
  { name: "Farm Fresh White Eggs", category: "Eggs & Poultry", unit: "6 pcs", unitQty: 6, unitType: "pcs", basePrice: 42 },
  { name: "Farm Fresh White Eggs", category: "Eggs & Poultry", unit: "12 pcs", unitQty: 12, unitType: "pcs", basePrice: 78 },
  { name: "Farm Fresh White Eggs", category: "Eggs & Poultry", unit: "30 pcs", unitQty: 30, unitType: "pcs", basePrice: 185 },
  { name: "Brown Eggs Premium", category: "Eggs & Poultry", unit: "6 pcs", unitQty: 6, unitType: "pcs", basePrice: 55 },
  { name: "Brown Eggs Premium", category: "Eggs & Poultry", unit: "12 pcs", unitQty: 12, unitType: "pcs", basePrice: 105 },
  { name: "Free Range Eggs", category: "Eggs & Poultry", unit: "6 pcs", unitQty: 6, unitType: "pcs", basePrice: 75 },
  { name: "Chicken Breast Boneless", category: "Eggs & Poultry", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 225 },
  { name: "Chicken Breast Boneless", category: "Eggs & Poultry", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 425 },
  { name: "Chicken Curry Cut", category: "Eggs & Poultry", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 185 },
  { name: "Chicken Curry Cut", category: "Eggs & Poultry", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 345 },
  { name: "Chicken Drumsticks", category: "Eggs & Poultry", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 195 },
  { name: "Chicken Wings", category: "Eggs & Poultry", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 175 },
  { name: "Chicken Keema", category: "Eggs & Poultry", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 245 },
  { name: "Chicken Liver", category: "Eggs & Poultry", unit: "250g", unitQty: 0.25, unitType: "kg", basePrice: 85 },
  
  // Vegetables - Fresh
  { name: "Onion", category: "Vegetables", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 35 },
  { name: "Onion", category: "Vegetables", unit: "2kg", unitQty: 2, unitType: "kg", basePrice: 65 },
  { name: "Tomato", category: "Vegetables", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 24 },
  { name: "Tomato", category: "Vegetables", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 45 },
  { name: "Potato", category: "Vegetables", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 28 },
  { name: "Potato", category: "Vegetables", unit: "2kg", unitQty: 2, unitType: "kg", basePrice: 52 },
  { name: "Green Chilli", category: "Vegetables", unit: "100g", unitQty: 100, unitType: "g", basePrice: 12 },
  { name: "Ginger", category: "Vegetables", unit: "100g", unitQty: 100, unitType: "g", basePrice: 18 },
  { name: "Garlic", category: "Vegetables", unit: "100g", unitQty: 100, unitType: "g", basePrice: 25 },
  { name: "Garlic", category: "Vegetables", unit: "250g", unitQty: 250, unitType: "g", basePrice: 55 },
  { name: "Carrot", category: "Vegetables", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 35 },
  { name: "Carrot", category: "Vegetables", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 65 },
  { name: "Capsicum Green", category: "Vegetables", unit: "250g", unitQty: 0.25, unitType: "kg", basePrice: 35 },
  { name: "Capsicum Red", category: "Vegetables", unit: "250g", unitQty: 0.25, unitType: "kg", basePrice: 65 },
  { name: "Capsicum Yellow", category: "Vegetables", unit: "250g", unitQty: 0.25, unitType: "kg", basePrice: 68 },
  { name: "Cauliflower", category: "Vegetables", unit: "1 pc", unitQty: 1, unitType: "pcs", basePrice: 42 },
  { name: "Cabbage", category: "Vegetables", unit: "1 pc", unitQty: 1, unitType: "pcs", basePrice: 35 },
  { name: "Spinach (Palak)", category: "Vegetables", unit: "250g", unitQty: 0.25, unitType: "kg", basePrice: 25 },
  { name: "Coriander Leaves", category: "Vegetables", unit: "100g", unitQty: 100, unitType: "g", basePrice: 15 },
  { name: "Mint Leaves (Pudina)", category: "Vegetables", unit: "100g", unitQty: 100, unitType: "g", basePrice: 18 },
  { name: "Curry Leaves", category: "Vegetables", unit: "50g", unitQty: 50, unitType: "g", basePrice: 12 },
  { name: "Cucumber", category: "Vegetables", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 28 },
  { name: "Bitter Gourd (Karela)", category: "Vegetables", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 45 },
  { name: "Bottle Gourd (Lauki)", category: "Vegetables", unit: "1 pc", unitQty: 1, unitType: "pcs", basePrice: 38 },
  { name: "Lady Finger (Bhindi)", category: "Vegetables", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 55 },
  { name: "Brinjal (Baingan)", category: "Vegetables", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 42 },
  { name: "French Beans", category: "Vegetables", unit: "250g", unitQty: 0.25, unitType: "kg", basePrice: 35 },
  { name: "Green Peas Fresh", category: "Vegetables", unit: "250g", unitQty: 0.25, unitType: "kg", basePrice: 45 },
  { name: "Beetroot", category: "Vegetables", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 38 },
  { name: "Radish (Mooli)", category: "Vegetables", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 28 },
  { name: "Sweet Potato", category: "Vegetables", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 35 },
  { name: "Drumstick", category: "Vegetables", unit: "250g", unitQty: 0.25, unitType: "kg", basePrice: 42 },
  { name: "Lemon", category: "Vegetables", unit: "6 pcs", unitQty: 6, unitType: "pcs", basePrice: 25 },
  { name: "Coconut Fresh", category: "Vegetables", unit: "1 pc", unitQty: 1, unitType: "pcs", basePrice: 45 },
  { name: "Mushroom Button", category: "Vegetables", unit: "200g", unitQty: 200, unitType: "g", basePrice: 55 },
  { name: "Broccoli", category: "Vegetables", unit: "300g", unitQty: 300, unitType: "g", basePrice: 75 },
  { name: "Corn Sweet", category: "Vegetables", unit: "2 pcs", unitQty: 2, unitType: "pcs", basePrice: 45 },
  { name: "Zucchini", category: "Vegetables", unit: "250g", unitQty: 0.25, unitType: "kg", basePrice: 55 },
  { name: "Lettuce Iceberg", category: "Vegetables", unit: "1 pc", unitQty: 1, unitType: "pcs", basePrice: 65 },
  { name: "Spring Onion", category: "Vegetables", unit: "100g", unitQty: 100, unitType: "g", basePrice: 22 },
  
  // Fruits
  { name: "Apple Royal Gala", category: "Fruits", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 95 },
  { name: "Apple Royal Gala", category: "Fruits", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 180 },
  { name: "Apple Shimla", category: "Fruits", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 145 },
  { name: "Banana Robusta", category: "Fruits", unit: "1 dozen", unitQty: 12, unitType: "pcs", basePrice: 55 },
  { name: "Banana Elaichi", category: "Fruits", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 45 },
  { name: "Orange Nagpur", category: "Fruits", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 85 },
  { name: "Orange Imported", category: "Fruits", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 135 },
  { name: "Grapes Green Seedless", category: "Fruits", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 85 },
  { name: "Grapes Black", category: "Fruits", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 95 },
  { name: "Pomegranate", category: "Fruits", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 125 },
  { name: "Pomegranate", category: "Fruits", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 235 },
  { name: "Papaya", category: "Fruits", unit: "1 pc", unitQty: 1, unitType: "pcs", basePrice: 65 },
  { name: "Watermelon", category: "Fruits", unit: "1 pc", unitQty: 1, unitType: "pcs", basePrice: 55 },
  { name: "Muskmelon", category: "Fruits", unit: "1 pc", unitQty: 1, unitType: "pcs", basePrice: 48 },
  { name: "Pineapple", category: "Fruits", unit: "1 pc", unitQty: 1, unitType: "pcs", basePrice: 65 },
  { name: "Guava", category: "Fruits", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 45 },
  { name: "Sweet Lime (Mosambi)", category: "Fruits", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 75 },
  { name: "Pear Imported", category: "Fruits", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 125 },
  { name: "Kiwi Fruit", category: "Fruits", unit: "3 pcs", unitQty: 3, unitType: "pcs", basePrice: 115 },
  { name: "Strawberry", category: "Fruits", unit: "200g", unitQty: 200, unitType: "g", basePrice: 95 },
  { name: "Blueberry", category: "Fruits", unit: "125g", unitQty: 125, unitType: "g", basePrice: 245 },
  { name: "Mango Alphonso", category: "Fruits", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 450 },
  { name: "Mango Kesar", category: "Fruits", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 285 },
  { name: "Chikoo (Sapota)", category: "Fruits", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 55 },
  { name: "Custard Apple", category: "Fruits", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 95 },
  { name: "Dragon Fruit", category: "Fruits", unit: "1 pc", unitQty: 1, unitType: "pcs", basePrice: 85 },
  { name: "Avocado", category: "Fruits", unit: "1 pc", unitQty: 1, unitType: "pcs", basePrice: 95 },
  
  // Bakery
  { name: "Britannia White Bread", category: "Bakery", unit: "400g", unitQty: 400, unitType: "g", basePrice: 45 },
  { name: "Britannia Brown Bread", category: "Bakery", unit: "400g", unitQty: 400, unitType: "g", basePrice: 52 },
  { name: "Modern White Bread", category: "Bakery", unit: "400g", unitQty: 400, unitType: "g", basePrice: 42 },
  { name: "Harvest Gold Bread", category: "Bakery", unit: "450g", unitQty: 450, unitType: "g", basePrice: 48 },
  { name: "English Oven Multigrain Bread", category: "Bakery", unit: "400g", unitQty: 400, unitType: "g", basePrice: 65 },
  { name: "Britannia Milk Bread", category: "Bakery", unit: "400g", unitQty: 400, unitType: "g", basePrice: 48 },
  { name: "Pav (Dinner Rolls)", category: "Bakery", unit: "6 pcs", unitQty: 6, unitType: "pcs", basePrice: 35 },
  { name: "Burger Buns", category: "Bakery", unit: "4 pcs", unitQty: 4, unitType: "pcs", basePrice: 45 },
  { name: "Hot Dog Buns", category: "Bakery", unit: "4 pcs", unitQty: 4, unitType: "pcs", basePrice: 45 },
  { name: "Croissant Butter", category: "Bakery", unit: "2 pcs", unitQty: 2, unitType: "pcs", basePrice: 75 },
  { name: "Fruit Cake", category: "Bakery", unit: "200g", unitQty: 200, unitType: "g", basePrice: 95 },
  { name: "Chocolate Cake Slice", category: "Bakery", unit: "1 pc", unitQty: 1, unitType: "pcs", basePrice: 85 },
  { name: "Pizza Base", category: "Bakery", unit: "2 pcs", unitQty: 2, unitType: "pcs", basePrice: 55 },
  { name: "Garlic Bread", category: "Bakery", unit: "200g", unitQty: 200, unitType: "g", basePrice: 95 },
  
  // Snacks - Chips & Namkeen
  { name: "Lay's Classic Salted", category: "Snacks", unit: "52g", unitQty: 52, unitType: "g", basePrice: 20 },
  { name: "Lay's India Magic Masala", category: "Snacks", unit: "52g", unitQty: 52, unitType: "g", basePrice: 20 },
  { name: "Lay's Classic Salted", category: "Snacks", unit: "130g", unitQty: 130, unitType: "g", basePrice: 45 },
  { name: "Kurkure Masala Munch", category: "Snacks", unit: "90g", unitQty: 90, unitType: "g", basePrice: 20 },
  { name: "Kurkure Masala Munch", category: "Snacks", unit: "170g", unitQty: 170, unitType: "g", basePrice: 40 },
  { name: "Bingo Mad Angles", category: "Snacks", unit: "90g", unitQty: 90, unitType: "g", basePrice: 20 },
  { name: "Uncle Chipps", category: "Snacks", unit: "55g", unitQty: 55, unitType: "g", basePrice: 20 },
  { name: "Pringles Original", category: "Snacks", unit: "107g", unitQty: 107, unitType: "g", basePrice: 149 },
  { name: "Pringles Sour Cream", category: "Snacks", unit: "107g", unitQty: 107, unitType: "g", basePrice: 149 },
  { name: "Haldiram's Aloo Bhujia", category: "Snacks", unit: "200g", unitQty: 200, unitType: "g", basePrice: 72 },
  { name: "Haldiram's Aloo Bhujia", category: "Snacks", unit: "400g", unitQty: 400, unitType: "g", basePrice: 135 },
  { name: "Haldiram's Moong Dal", category: "Snacks", unit: "200g", unitQty: 200, unitType: "g", basePrice: 68 },
  { name: "Haldiram's Bhujia Sev", category: "Snacks", unit: "200g", unitQty: 200, unitType: "g", basePrice: 65 },
  { name: "Haldiram's Mixture", category: "Snacks", unit: "200g", unitQty: 200, unitType: "g", basePrice: 75 },
  { name: "Bikaji Bhujia", category: "Snacks", unit: "400g", unitQty: 400, unitType: "g", basePrice: 145 },
  { name: "Cornitos Nachos", category: "Snacks", unit: "150g", unitQty: 150, unitType: "g", basePrice: 99 },
  { name: "Doritos Nacho Cheese", category: "Snacks", unit: "150g", unitQty: 150, unitType: "g", basePrice: 85 },
  { name: "Popcorn Ready to Eat", category: "Snacks", unit: "90g", unitQty: 90, unitType: "g", basePrice: 45 },
  
  // Snacks - Biscuits
  { name: "Parle-G Gold", category: "Snacks", unit: "200g", unitQty: 200, unitType: "g", basePrice: 25 },
  { name: "Parle-G Gold", category: "Snacks", unit: "800g", unitQty: 800, unitType: "g", basePrice: 85 },
  { name: "Britannia Marie Gold", category: "Snacks", unit: "250g", unitQty: 250, unitType: "g", basePrice: 42 },
  { name: "Britannia Good Day Butter", category: "Snacks", unit: "150g", unitQty: 150, unitType: "g", basePrice: 35 },
  { name: "Britannia Good Day Cashew", category: "Snacks", unit: "200g", unitQty: 200, unitType: "g", basePrice: 45 },
  { name: "McVities Digestive", category: "Snacks", unit: "250g", unitQty: 250, unitType: "g", basePrice: 75 },
  { name: "Oreo Original", category: "Snacks", unit: "120g", unitQty: 120, unitType: "g", basePrice: 35 },
  { name: "Oreo Original", category: "Snacks", unit: "300g", unitQty: 300, unitType: "g", basePrice: 75 },
  { name: "Hide & Seek Fab", category: "Snacks", unit: "112g", unitQty: 112, unitType: "g", basePrice: 30 },
  { name: "Sunfeast Dark Fantasy", category: "Snacks", unit: "100g", unitQty: 100, unitType: "g", basePrice: 45 },
  { name: "Britannia Bourbon", category: "Snacks", unit: "150g", unitQty: 150, unitType: "g", basePrice: 35 },
  { name: "Britannia 50-50 Maska Chaska", category: "Snacks", unit: "150g", unitQty: 150, unitType: "g", basePrice: 25 },
  { name: "Monaco Salted Biscuits", category: "Snacks", unit: "200g", unitQty: 200, unitType: "g", basePrice: 35 },
  { name: "Krack Jack", category: "Snacks", unit: "200g", unitQty: 200, unitType: "g", basePrice: 30 },
  { name: "Nutri Choice Digestive", category: "Snacks", unit: "250g", unitQty: 250, unitType: "g", basePrice: 65 },
  
  // Instant Noodles & Pasta
  { name: "Maggi 2-Minute Noodles", category: "Instant Food", unit: "70g", unitQty: 70, unitType: "g", basePrice: 14 },
  { name: "Maggi 2-Minute Noodles", category: "Instant Food", unit: "Pack of 12", unitQty: 12, unitType: "pack", basePrice: 168 },
  { name: "Maggi Masala Noodles", category: "Instant Food", unit: "Pack of 4", unitQty: 4, unitType: "pack", basePrice: 56 },
  { name: "Yippee Noodles", category: "Instant Food", unit: "70g", unitQty: 70, unitType: "g", basePrice: 14 },
  { name: "Yippee Magic Masala", category: "Instant Food", unit: "Pack of 12", unitQty: 12, unitType: "pack", basePrice: 168 },
  { name: "Top Ramen Curry Noodles", category: "Instant Food", unit: "Pack of 4", unitQty: 4, unitType: "pack", basePrice: 85 },
  { name: "Ching's Hakka Noodles", category: "Instant Food", unit: "150g", unitQty: 150, unitType: "g", basePrice: 45 },
  { name: "Ching's Schezwan Noodles", category: "Instant Food", unit: "Pack of 4", unitQty: 4, unitType: "pack", basePrice: 75 },
  { name: "Wai Wai Noodles", category: "Instant Food", unit: "75g", unitQty: 75, unitType: "g", basePrice: 18 },
  { name: "Knorr Soupy Noodles", category: "Instant Food", unit: "Pack of 4", unitQty: 4, unitType: "pack", basePrice: 85 },
  { name: "Barilla Penne Pasta", category: "Instant Food", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 195 },
  { name: "Del Monte Pasta Penne", category: "Instant Food", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 145 },
  { name: "Bambino Macaroni", category: "Instant Food", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 75 },
  { name: "Vermicelli (Sevai)", category: "Instant Food", unit: "400g", unitQty: 400, unitType: "g", basePrice: 55 },
  { name: "Cup Noodles Masala", category: "Instant Food", unit: "70g", unitQty: 70, unitType: "g", basePrice: 55 },
  
  // Ready to Cook & Eat
  { name: "MTR Ready to Eat Rajma", category: "Ready to Eat", unit: "300g", unitQty: 300, unitType: "g", basePrice: 85 },
  { name: "MTR Ready to Eat Dal Makhani", category: "Ready to Eat", unit: "300g", unitQty: 300, unitType: "g", basePrice: 95 },
  { name: "MTR Ready to Eat Pav Bhaji", category: "Ready to Eat", unit: "300g", unitQty: 300, unitType: "g", basePrice: 85 },
  { name: "MTR Ready to Eat Palak Paneer", category: "Ready to Eat", unit: "300g", unitQty: 300, unitType: "g", basePrice: 115 },
  { name: "Haldiram's Minute Khana Dal Fry", category: "Ready to Eat", unit: "300g", unitQty: 300, unitType: "g", basePrice: 75 },
  { name: "MTR Breakfast Mix Upma", category: "Ready to Eat", unit: "200g", unitQty: 200, unitType: "g", basePrice: 55 },
  { name: "MTR Breakfast Mix Poha", category: "Ready to Eat", unit: "200g", unitQty: 200, unitType: "g", basePrice: 55 },
  { name: "MTR Dosa Mix", category: "Ready to Eat", unit: "200g", unitQty: 200, unitType: "g", basePrice: 65 },
  { name: "Gits Gulab Jamun Mix", category: "Ready to Eat", unit: "200g", unitQty: 200, unitType: "g", basePrice: 85 },
  { name: "Gits Dhokla Mix", category: "Ready to Eat", unit: "200g", unitQty: 200, unitType: "g", basePrice: 65 },
  { name: "ID Fresh Parotta", category: "Ready to Eat", unit: "5 pcs", unitQty: 5, unitType: "pcs", basePrice: 75 },
  { name: "ID Fresh Idli Batter", category: "Ready to Eat", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 85 },
  { name: "ID Fresh Dosa Batter", category: "Ready to Eat", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 85 },
  { name: "McCain French Fries", category: "Ready to Eat", unit: "420g", unitQty: 420, unitType: "g", basePrice: 155 },
  { name: "McCain Smiles", category: "Ready to Eat", unit: "415g", unitQty: 415, unitType: "g", basePrice: 175 },
  { name: "ITC Master Chef Aloo Tikki", category: "Ready to Eat", unit: "320g", unitQty: 320, unitType: "g", basePrice: 135 },
  { name: "Sumeru Samosa", category: "Ready to Eat", unit: "300g", unitQty: 300, unitType: "g", basePrice: 95 },
  
  // Beverages - Tea & Coffee
  { name: "Tata Tea Gold", category: "Beverages", unit: "250g", unitQty: 250, unitType: "g", basePrice: 135 },
  { name: "Tata Tea Gold", category: "Beverages", unit: "500g", unitQty: 500, unitType: "g", basePrice: 255 },
  { name: "Tata Tea Premium", category: "Beverages", unit: "500g", unitQty: 500, unitType: "g", basePrice: 195 },
  { name: "Red Label Tea", category: "Beverages", unit: "500g", unitQty: 500, unitType: "g", basePrice: 225 },
  { name: "Taj Mahal Tea", category: "Beverages", unit: "500g", unitQty: 500, unitType: "g", basePrice: 275 },
  { name: "Tetley Green Tea", category: "Beverages", unit: "25 bags", unitQty: 25, unitType: "pcs", basePrice: 165 },
  { name: "Lipton Green Tea", category: "Beverages", unit: "25 bags", unitQty: 25, unitType: "pcs", basePrice: 155 },
  { name: "Twinings Earl Grey", category: "Beverages", unit: "25 bags", unitQty: 25, unitType: "pcs", basePrice: 295 },
  { name: "Nescafe Classic", category: "Beverages", unit: "50g", unitQty: 50, unitType: "g", basePrice: 175 },
  { name: "Nescafe Classic", category: "Beverages", unit: "100g", unitQty: 100, unitType: "g", basePrice: 325 },
  { name: "Nescafe Gold", category: "Beverages", unit: "50g", unitQty: 50, unitType: "g", basePrice: 325 },
  { name: "Bru Instant Coffee", category: "Beverages", unit: "50g", unitQty: 50, unitType: "g", basePrice: 155 },
  { name: "Bru Instant Coffee", category: "Beverages", unit: "100g", unitQty: 100, unitType: "g", basePrice: 295 },
  { name: "Sunrise Coffee", category: "Beverages", unit: "100g", unitQty: 100, unitType: "g", basePrice: 245 },
  { name: "Continental Xtra", category: "Beverages", unit: "50g", unitQty: 50, unitType: "g", basePrice: 145 },
  
  // Beverages - Cold Drinks & Juices
  { name: "Coca Cola", category: "Beverages", unit: "750ml", unitQty: 0.75, unitType: "L", basePrice: 42 },
  { name: "Coca Cola", category: "Beverages", unit: "2L", unitQty: 2, unitType: "L", basePrice: 95 },
  { name: "Pepsi", category: "Beverages", unit: "750ml", unitQty: 0.75, unitType: "L", basePrice: 42 },
  { name: "Pepsi", category: "Beverages", unit: "2L", unitQty: 2, unitType: "L", basePrice: 95 },
  { name: "Sprite", category: "Beverages", unit: "750ml", unitQty: 0.75, unitType: "L", basePrice: 42 },
  { name: "Fanta Orange", category: "Beverages", unit: "750ml", unitQty: 0.75, unitType: "L", basePrice: 42 },
  { name: "Limca", category: "Beverages", unit: "750ml", unitQty: 0.75, unitType: "L", basePrice: 42 },
  { name: "Thums Up", category: "Beverages", unit: "750ml", unitQty: 0.75, unitType: "L", basePrice: 42 },
  { name: "Mountain Dew", category: "Beverages", unit: "750ml", unitQty: 0.75, unitType: "L", basePrice: 42 },
  { name: "7 Up", category: "Beverages", unit: "750ml", unitQty: 0.75, unitType: "L", basePrice: 42 },
  { name: "Real Fruit Power Mango", category: "Beverages", unit: "1L", unitQty: 1, unitType: "L", basePrice: 115 },
  { name: "Real Fruit Power Orange", category: "Beverages", unit: "1L", unitQty: 1, unitType: "L", basePrice: 115 },
  { name: "Real Fruit Power Mixed Fruit", category: "Beverages", unit: "1L", unitQty: 1, unitType: "L", basePrice: 115 },
  { name: "Tropicana Orange Juice", category: "Beverages", unit: "1L", unitQty: 1, unitType: "L", basePrice: 125 },
  { name: "Tropicana Apple Juice", category: "Beverages", unit: "1L", unitQty: 1, unitType: "L", basePrice: 125 },
  { name: "Paper Boat Aam Panna", category: "Beverages", unit: "200ml", unitQty: 0.2, unitType: "L", basePrice: 35 },
  { name: "Paper Boat Jaljeera", category: "Beverages", unit: "200ml", unitQty: 0.2, unitType: "L", basePrice: 35 },
  { name: "Frooti Mango", category: "Beverages", unit: "600ml", unitQty: 0.6, unitType: "L", basePrice: 35 },
  { name: "Maaza Mango", category: "Beverages", unit: "600ml", unitQty: 0.6, unitType: "L", basePrice: 35 },
  { name: "Slice Mango", category: "Beverages", unit: "600ml", unitQty: 0.6, unitType: "L", basePrice: 35 },
  { name: "Red Bull Energy Drink", category: "Beverages", unit: "250ml", unitQty: 0.25, unitType: "L", basePrice: 115 },
  { name: "Sting Energy Drink", category: "Beverages", unit: "250ml", unitQty: 0.25, unitType: "L", basePrice: 25 },
  { name: "Gatorade Sports Drink", category: "Beverages", unit: "500ml", unitQty: 0.5, unitType: "L", basePrice: 55 },
  
  // Beverages - Health Drinks
  { name: "Horlicks Classic Malt", category: "Beverages", unit: "500g", unitQty: 500, unitType: "g", basePrice: 285 },
  { name: "Horlicks Classic Malt", category: "Beverages", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 545 },
  { name: "Bournvita", category: "Beverages", unit: "500g", unitQty: 500, unitType: "g", basePrice: 235 },
  { name: "Bournvita", category: "Beverages", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 445 },
  { name: "Boost", category: "Beverages", unit: "500g", unitQty: 500, unitType: "g", basePrice: 245 },
  { name: "Complan Classic", category: "Beverages", unit: "500g", unitQty: 500, unitType: "g", basePrice: 335 },
  { name: "Protinex Original", category: "Beverages", unit: "400g", unitQty: 400, unitType: "g", basePrice: 475 },
  { name: "Ensure Vanilla", category: "Beverages", unit: "400g", unitQty: 400, unitType: "g", basePrice: 725 },
  
  // Sauces & Condiments
  { name: "Kissan Tomato Ketchup", category: "Sauces", unit: "500g", unitQty: 500, unitType: "g", basePrice: 115 },
  { name: "Kissan Tomato Ketchup", category: "Sauces", unit: "1kg", unitQty: 1, unitType: "kg", basePrice: 195 },
  { name: "Maggi Hot & Sweet Sauce", category: "Sauces", unit: "500g", unitQty: 500, unitType: "g", basePrice: 125 },
  { name: "Heinz Tomato Ketchup", category: "Sauces", unit: "450g", unitQty: 450, unitType: "g", basePrice: 165 },
  { name: "Ching's Red Chilli Sauce", category: "Sauces", unit: "200g", unitQty: 200, unitType: "g", basePrice: 65 },
  { name: "Ching's Green Chilli Sauce", category: "Sauces", unit: "200g", unitQty: 200, unitType: "g", basePrice: 65 },
  { name: "Ching's Schezwan Sauce", category: "Sauces", unit: "250g", unitQty: 250, unitType: "g", basePrice: 95 },
  { name: "Veeba Mayonnaise", category: "Sauces", unit: "250g", unitQty: 250, unitType: "g", basePrice: 115 },
  { name: "Hellmann's Mayonnaise", category: "Sauces", unit: "275g", unitQty: 275, unitType: "g", basePrice: 175 },
  { name: "Dr. Oetker Fun Foods Sandwich Spread", category: "Sauces", unit: "300g", unitQty: 300, unitType: "g", basePrice: 115 },
  { name: "Veeba Peri Peri Mayo", category: "Sauces", unit: "250g", unitQty: 250, unitType: "g", basePrice: 135 },
  { name: "Kissan Mixed Fruit Jam", category: "Sauces", unit: "500g", unitQty: 500, unitType: "g", basePrice: 175 },
  { name: "Kissan Orange Marmalade", category: "Sauces", unit: "500g", unitQty: 500, unitType: "g", basePrice: 185 },
  { name: "Nutella Hazelnut Spread", category: "Sauces", unit: "350g", unitQty: 350, unitType: "g", basePrice: 445 },
  { name: "Hersheys Chocolate Syrup", category: "Sauces", unit: "623g", unitQty: 623, unitType: "g", basePrice: 345 },
  { name: "Soy Sauce", category: "Sauces", unit: "200ml", unitQty: 0.2, unitType: "L", basePrice: 55 },
  { name: "Vinegar White", category: "Sauces", unit: "500ml", unitQty: 0.5, unitType: "L", basePrice: 45 },
  { name: "Apple Cider Vinegar", category: "Sauces", unit: "500ml", unitQty: 0.5, unitType: "L", basePrice: 225 },
  
  // Dry Fruits & Nuts
  { name: "Almonds California", category: "Dry Fruits", unit: "200g", unitQty: 200, unitType: "g", basePrice: 265 },
  { name: "Almonds California", category: "Dry Fruits", unit: "500g", unitQty: 500, unitType: "g", basePrice: 625 },
  { name: "Cashews Whole", category: "Dry Fruits", unit: "200g", unitQty: 200, unitType: "g", basePrice: 245 },
  { name: "Cashews Whole", category: "Dry Fruits", unit: "500g", unitQty: 500, unitType: "g", basePrice: 585 },
  { name: "Walnuts", category: "Dry Fruits", unit: "200g", unitQty: 200, unitType: "g", basePrice: 285 },
  { name: "Pistachios Roasted Salted", category: "Dry Fruits", unit: "200g", unitQty: 200, unitType: "g", basePrice: 345 },
  { name: "Raisins (Kishmish)", category: "Dry Fruits", unit: "200g", unitQty: 200, unitType: "g", basePrice: 115 },
  { name: "Raisins (Kishmish)", category: "Dry Fruits", unit: "500g", unitQty: 500, unitType: "g", basePrice: 265 },
  { name: "Dates (Khajoor)", category: "Dry Fruits", unit: "500g", unitQty: 500, unitType: "g", basePrice: 185 },
  { name: "Anjeer (Figs)", category: "Dry Fruits", unit: "200g", unitQty: 200, unitType: "g", basePrice: 225 },
  { name: "Mixed Dry Fruits", category: "Dry Fruits", unit: "200g", unitQty: 200, unitType: "g", basePrice: 285 },
  { name: "Peanuts Roasted", category: "Dry Fruits", unit: "200g", unitQty: 200, unitType: "g", basePrice: 65 },
  { name: "Pumpkin Seeds", category: "Dry Fruits", unit: "100g", unitQty: 100, unitType: "g", basePrice: 115 },
  { name: "Sunflower Seeds", category: "Dry Fruits", unit: "100g", unitQty: 100, unitType: "g", basePrice: 85 },
  { name: "Chia Seeds", category: "Dry Fruits", unit: "200g", unitQty: 200, unitType: "g", basePrice: 185 },
  { name: "Flax Seeds", category: "Dry Fruits", unit: "200g", unitQty: 200, unitType: "g", basePrice: 125 },
  
  // Frozen Foods
  { name: "Amul Ice Cream Vanilla", category: "Frozen", unit: "750ml", unitQty: 0.75, unitType: "L", basePrice: 185 },
  { name: "Amul Ice Cream Chocolate", category: "Frozen", unit: "750ml", unitQty: 0.75, unitType: "L", basePrice: 195 },
  { name: "Kwality Walls Cornetto", category: "Frozen", unit: "1 pc", unitQty: 1, unitType: "pcs", basePrice: 45 },
  { name: "Magnum Classic", category: "Frozen", unit: "1 pc", unitQty: 1, unitType: "pcs", basePrice: 95 },
  { name: "Frozen Green Peas", category: "Frozen", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 85 },
  { name: "Frozen Mixed Vegetables", category: "Frozen", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 95 },
  { name: "Frozen Sweet Corn", category: "Frozen", unit: "500g", unitQty: 0.5, unitType: "kg", basePrice: 85 },
  { name: "Frozen Paneer Tikka", category: "Frozen", unit: "280g", unitQty: 280, unitType: "g", basePrice: 195 },
  
  // Personal Care & Cleaning (Added for variety)
  { name: "Surf Excel Matic", category: "Household", unit: "2kg", unitQty: 2, unitType: "kg", basePrice: 395 },
  { name: "Ariel Matic", category: "Household", unit: "2kg", unitQty: 2, unitType: "kg", basePrice: 435 },
  { name: "Tide Plus", category: "Household", unit: "2kg", unitQty: 2, unitType: "kg", basePrice: 295 },
  { name: "Vim Dishwash Bar", category: "Household", unit: "500g", unitQty: 500, unitType: "g", basePrice: 55 },
  { name: "Vim Dishwash Gel", category: "Household", unit: "750ml", unitQty: 0.75, unitType: "L", basePrice: 155 },
  { name: "Lizol Floor Cleaner", category: "Household", unit: "975ml", unitQty: 0.975, unitType: "L", basePrice: 185 },
  { name: "Harpic Toilet Cleaner", category: "Household", unit: "500ml", unitQty: 0.5, unitType: "L", basePrice: 135 },
  { name: "Colin Glass Cleaner", category: "Household", unit: "500ml", unitQty: 0.5, unitType: "L", basePrice: 125 },
  { name: "Scotch Brite Scrub Pad", category: "Household", unit: "3 pcs", unitQty: 3, unitType: "pcs", basePrice: 55 },
  { name: "Garbage Bags Large", category: "Household", unit: "30 pcs", unitQty: 30, unitType: "pcs", basePrice: 95 },
  { name: "Tissue Paper Roll", category: "Household", unit: "4 rolls", unitQty: 4, unitType: "pack", basePrice: 185 },
  { name: "Aluminium Foil", category: "Household", unit: "9m", unitQty: 9, unitType: "pack", basePrice: 95 },
  { name: "Cling Wrap", category: "Household", unit: "30m", unitQty: 30, unitType: "pack", basePrice: 125 },
  
  // Baby & Kids
  { name: "Cerelac Wheat Apple", category: "Baby Care", unit: "300g", unitQty: 300, unitType: "g", basePrice: 285 },
  { name: "Nestle Lactogen 1", category: "Baby Care", unit: "400g", unitQty: 400, unitType: "g", basePrice: 485 },
  { name: "Pampers Diapers Medium", category: "Baby Care", unit: "66 pcs", unitQty: 66, unitType: "pcs", basePrice: 1095 },
  { name: "Huggies Wonder Pants", category: "Baby Care", unit: "50 pcs", unitQty: 50, unitType: "pcs", basePrice: 895 },
  { name: "Johnson Baby Soap", category: "Baby Care", unit: "150g", unitQty: 150, unitType: "g", basePrice: 95 },
  { name: "Johnson Baby Oil", category: "Baby Care", unit: "200ml", unitQty: 0.2, unitType: "L", basePrice: 225 },
  
  // Pet Food
  { name: "Pedigree Dog Food Chicken", category: "Pet Care", unit: "3kg", unitQty: 3, unitType: "kg", basePrice: 645 },
  { name: "Whiskas Cat Food Tuna", category: "Pet Care", unit: "1.2kg", unitQty: 1.2, unitType: "kg", basePrice: 495 },
  { name: "Drools Dog Food", category: "Pet Care", unit: "3kg", unitQty: 3, unitType: "kg", basePrice: 545 },
] as const;

// Generate all products with unique IDs and varied prices
export const products: Product[] = productTemplates.map((template) => ({
  id: genId(),
  name: template.name,
  category: template.category,
  image: getCategoryEmoji(template.category),
  unit: template.unit,
  unitQty: template.unitQty,
  unitType: template.unitType as Product["unitType"],
  prices: generatePrices(template.basePrice),
}));

function getCategoryEmoji(category: string): string {
  const emojiMap: Record<string, string> = {
    "Rice & Grains": "🍚",
    "Atta & Flour": "🌾",
    "Cooking Oil": "🫒",
    "Dal & Pulses": "🫘",
    "Spices": "🌶️",
    "Essentials": "🧂",
    "Dairy": "🥛",
    "Eggs & Poultry": "🍗",
    "Vegetables": "🥬",
    "Fruits": "🍎",
    "Bakery": "🍞",
    "Snacks": "🍪",
    "Instant Food": "🍜",
    "Ready to Eat": "🥘",
    "Beverages": "☕",
    "Sauces": "🥫",
    "Dry Fruits": "🥜",
    "Frozen": "🧊",
    "Household": "🧹",
    "Baby Care": "👶",
    "Pet Care": "🐕",
  };
  return emojiMap[category] || "📦";
}

export const categories = [
  "All",
  "Rice & Grains",
  "Atta & Flour",
  "Cooking Oil",
  "Dal & Pulses",
  "Spices",
  "Essentials",
  "Dairy",
  "Eggs & Poultry",
  "Vegetables",
  "Fruits",
  "Bakery",
  "Snacks",
  "Instant Food",
  "Ready to Eat",
  "Beverages",
  "Sauces",
  "Dry Fruits",
  "Frozen",
  "Household",
  "Baby Care",
  "Pet Care",
];

export interface CartItem {
  product: Product;
  quantity: number;
}

// ======= Unit Price Utilities =======

export function getUnitPrice(product: Product, platform: Platform): number {
  const price = product.prices[platform];
  return price / product.unitQty;
}

export function formatUnitPrice(product: Product, platform: Platform): string {
  const unitPrice = getUnitPrice(product, platform);
  const unitLabel = getUnitLabel(product.unitType);
  return `₹${Math.round(unitPrice)}/${unitLabel}`;
}

function getUnitLabel(unitType: Product["unitType"]): string {
  switch (unitType) {
    case "kg": return "kg";
    case "g": return "100g";
    case "L": return "L";
    case "ml": return "100ml";
    case "pcs": return "pc";
    case "pack": return "pack";
    case "dozen": return "dozen";
    default: return "unit";
  }
}

export function getBestPrice(product: Product): { platform: Platform; price: number } {
  const entries = Object.entries(product.prices) as [Platform, number][];
  const best = entries.reduce((min, curr) => (curr[1] < min[1] ? curr : min));
  return { platform: best[0], price: best[1] };
}

export function getBestUnitPrice(product: Product): { platform: Platform; unitPrice: number } {
  const entries = Object.entries(product.prices) as [Platform, number][];
  const best = entries.reduce((min, curr) => {
    const currUnitPrice = curr[1] / product.unitQty;
    const minUnitPrice = min[1] / product.unitQty;
    return currUnitPrice < minUnitPrice ? curr : min;
  });
  return { platform: best[0], unitPrice: best[1] / product.unitQty };
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
    blinkit: calculateCartTotal(cart, "blinkit") + platforms.blinkit.deliveryFee,
    zepto: calculateCartTotal(cart, "zepto") + platforms.zepto.deliveryFee,
    instamart: calculateCartTotal(cart, "instamart") + platforms.instamart.deliveryFee,
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

// ======= Smart Cart Split Algorithm =======

export interface SplitCartRecommendation {
  hasSplit: boolean;
  totalSavings: number;
  singlePlatformBest: {
    platform: Platform;
    total: number;
  };
  splitRecommendation?: {
    platform1: { platform: Platform; items: CartItem[]; subtotal: number };
    platform2: { platform: Platform; items: CartItem[]; subtotal: number };
    totalWithDelivery: number;
    explanation: string;
  };
}

export function getSmartSplitRecommendation(cart: CartItem[]): SplitCartRecommendation {
  if (cart.length < 2) {
    const savings = getCartSavings(cart);
    return {
      hasSplit: false,
      totalSavings: savings.savings,
      singlePlatformBest: {
        platform: savings.bestPlatform,
        total: savings.bestTotal,
      },
    };
  }

  const singlePlatformSavings = getCartSavings(cart);
  
  // Try splitting between each pair of platforms
  let bestSplit: SplitCartRecommendation["splitRecommendation"] | undefined;
  let bestSplitTotal = singlePlatformSavings.bestTotal;
  
  const platformPairs: [Platform, Platform][] = [
    ["blinkit", "zepto"],
    ["blinkit", "instamart"],
    ["zepto", "instamart"],
  ];

  for (const [p1, p2] of platformPairs) {
    // Assign each item to whichever platform is cheaper for it
    const p1Items: CartItem[] = [];
    const p2Items: CartItem[] = [];
    
    cart.forEach(item => {
      if (item.product.prices[p1] <= item.product.prices[p2]) {
        p1Items.push(item);
      } else {
        p2Items.push(item);
      }
    });

    // Calculate subtotals
    const p1Subtotal = calculateCartTotal(p1Items, p1);
    const p2Subtotal = calculateCartTotal(p2Items, p2);
    
    // Check minimum order requirements
    const p1MeetsMin = p1Subtotal >= platforms[p1].minOrder || p1Items.length === 0;
    const p2MeetsMin = p2Subtotal >= platforms[p2].minOrder || p2Items.length === 0;
    
    if (!p1MeetsMin || !p2MeetsMin) continue;
    if (p1Items.length === 0 || p2Items.length === 0) continue;
    
    // Calculate total with delivery fees
    const totalWithDelivery = 
      p1Subtotal + platforms[p1].deliveryFee + 
      p2Subtotal + platforms[p2].deliveryFee;
    
    if (totalWithDelivery < bestSplitTotal) {
      bestSplitTotal = totalWithDelivery;
      bestSplit = {
        platform1: { platform: p1, items: p1Items, subtotal: p1Subtotal },
        platform2: { platform: p2, items: p2Items, subtotal: p2Subtotal },
        totalWithDelivery,
        explanation: `Order ${p1Items.length} items from ${platforms[p1].name} and ${p2Items.length} items from ${platforms[p2].name} to save ₹${Math.round(singlePlatformSavings.bestTotal - totalWithDelivery)}.`,
      };
    }
  }

  if (bestSplit && bestSplitTotal < singlePlatformSavings.bestTotal) {
    return {
      hasSplit: true,
      totalSavings: singlePlatformSavings.bestTotal - bestSplitTotal,
      singlePlatformBest: {
        platform: singlePlatformSavings.bestPlatform,
        total: singlePlatformSavings.bestTotal,
      },
      splitRecommendation: bestSplit,
    };
  }

  return {
    hasSplit: false,
    totalSavings: singlePlatformSavings.savings,
    singlePlatformBest: {
      platform: singlePlatformSavings.bestPlatform,
      total: singlePlatformSavings.bestTotal,
    },
  };
}

// ======= Alternative Suggestions =======

export interface AlternativeProduct {
  original: Product;
  alternative: Product;
  platform: Platform;
  savings: number;
  reason: string;
}

export function findAlternatives(product: Product, currentPlatform: Platform): AlternativeProduct[] {
  const alternatives: AlternativeProduct[] = [];
  const currentPrice = product.prices[currentPlatform];
  
  // Find similar products in the same category
  const similarProducts = products.filter(p => 
    p.id !== product.id && 
    p.category === product.category &&
    p.unitType === product.unitType
  );

  for (const alt of similarProducts) {
    // Check each platform for cheaper options
    for (const platform of ["blinkit", "zepto", "instamart"] as Platform[]) {
      const altPrice = alt.prices[platform];
      const savings = currentPrice - altPrice;
      
      if (savings > 5) { // At least ₹5 savings
        alternatives.push({
          original: product,
          alternative: alt,
          platform,
          savings,
          reason: `${alt.name} on ${platforms[platform].name} is ₹${savings} cheaper`,
        });
      }
    }
  }

  // Sort by savings descending and take top 3
  return alternatives.sort((a, b) => b.savings - a.savings).slice(0, 3);
}

// ======= Search Function =======

export function searchProducts(query: string, category?: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => {
    const matchesQuery = p.name.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery);
    const matchesCategory = !category || category === "All" || p.category === category;
    return matchesQuery && matchesCategory;
  });
}

// Export product data as a string for AI context
export function getProductDataForAI(): string {
  const productList = products.slice(0, 100).map(p => {
    const bestPrice = getBestPrice(p);
    return `${p.name} (${p.unit}): Blinkit ₹${p.prices.blinkit}, Zepto ₹${p.prices.zepto}, Instamart ₹${p.prices.instamart} | Best: ${platforms[bestPrice.platform].name} ₹${bestPrice.price}`;
  }).join("\n");
  
  return productList;
}
