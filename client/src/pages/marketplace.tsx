import Navigation from "@/components/navigation";
import SearchFilter from "@/components/search-filter";
import ProductCard from "@/components/product-card";
import ChatWidget from "@/components/chat-widget";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const { toast } = useToast();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: searchQuery 
      ? ['/api/products/search', { q: searchQuery }]
      : categoryFilter !== "all" 
        ? ['/api/products/category', categoryFilter]
        : ['/api/products'],
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category);
    setSearchQuery(""); // Clear search when filtering by category
  };

  const handleLocationFilter = (location: string) => {
    setLocationFilter(location);
  };

  const handleAddToCart = (productName: string) => {
    toast({
      title: "Added to Cart",
      description: `${productName} has been added to your cart.`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-green-bg">
        <Navigation />
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-green mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
        <ChatWidget />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-green-bg">
      <Navigation />
      
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h1 className="text-4xl font-bold text-center mb-4 font-roboto">Agricultural Marketplace</h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Discover fresh, local produce and farming supplies from verified farmers in your area.
          </p>
        </div>
        
        <SearchFilter 
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
          onLocationFilter={handleLocationFilter}
        />
      </div>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold font-roboto">
              {searchQuery ? `Search results for "${searchQuery}"` : 
               categoryFilter !== "all" ? `${categoryFilter} Products` : 
               'All Products'}
            </h2>
            <p className="text-gray-600">{products.length} products found</p>
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌾</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">No products found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? "Try adjusting your search terms or browsing all products."
                  : "No products are currently available in this category."}
              </p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("all");
                  setLocationFilter("all");
                }}
                className="text-forest-green font-semibold hover:underline"
              >
                View all products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onAddToCart={() => handleAddToCart(product.name)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <ChatWidget />
    </div>
  );
}
