import { AppLayout } from "@/components/AppLayout";
import { ProductSearch } from "@/components/ProductSearch";

export default function Compare() {
  return (
    <AppLayout>
      <div className="container px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Compare Products</h1>
          <p className="text-muted-foreground">
            Find the best prices across all platforms
          </p>
        </div>
        
        <ProductSearch />
      </div>
    </AppLayout>
  );
}
