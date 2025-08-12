import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import SearchFilter from "@/components/search-filter";
import ProductCard from "@/components/product-card";
import ToolCard from "@/components/tool-card";
import ChatWidget from "@/components/chat-widget";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Product, Tool } from "@shared/schema";
import { Apple, Carrot, Wrench, Sprout, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: searchQuery ? ['/api/products/search', { q: searchQuery }] : ['/api/products'],
  });

  const { data: tools = [] } = useQuery<Tool[]>({
    queryKey: ['/api/tools/available'],
  });

  const categories = [
    { icon: Apple, name: "Fresh Fruits", count: 348, color: "bg-forest-green" },
    { icon: Carrot, name: "Vegetables", count: 512, color: "bg-bright-green" },
    { icon: Wrench, name: "Farm Tools", count: 89, color: "bg-harvest-orange" },
    { icon: Sprout, name: "Seeds & Plants", count: 234, color: "bg-forest-green" },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category);
  };

  const handleLocationFilter = (location: string) => {
    setLocationFilter(location);
  };

  return (
    <div className="min-h-screen bg-light-green-bg">
      <Navigation />
      <HeroSection />
      <SearchFilter 
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
        onLocationFilter={handleLocationFilter}
      />
      
      {/* Featured Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 font-roboto">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="bg-white text-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="text-white h-8 w-8" />
                    </div>
                    <h3 className="font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} products</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold font-roboto">Fresh from Local Farms</h2>
            <Link href="/marketplace" className="text-forest-green font-semibold hover:underline">
              View all products
            </Link>
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found. Check back soon for fresh farm produce!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onAddToCart={() => console.log('Add to cart:', product.name)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tool Rental Section */}
      <section className="py-16 bg-light-green-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-roboto">Equipment Rental</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access professional farming equipment when you need it. From tractors to specialized tools.
            </p>
          </div>
          
          {tools.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No tools available for rent at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.slice(0, 3).map((tool) => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool}
                  onReserve={() => console.log('Reserve tool:', tool.name)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* AI Assistant CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-forest-green to-bright-green rounded-2xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-roboto">
                  Get AI-Powered Farming Guidance
                </h2>
                <p className="text-xl opacity-90 mb-6">
                  Chat with our AI assistant for instant answers to your farming questions, 
                  crop recommendations, and expert advice.
                </p>
                <Button className="bg-harvest-orange hover:bg-harvest-orange/90 text-white px-8 py-3 font-semibold">
                  Start Chatting
                </Button>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                  alt="Farmer using technology" 
                  className="rounded-xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-green-text text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Sprout className="text-bright-green h-8 w-8" />
                <span className="text-2xl font-bold font-roboto">FarmConnect</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Connecting farmers with markets, tools, and knowledge. Building a sustainable future for agriculture.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-bright-green">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-bright-green">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-bright-green">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-bright-green">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Marketplace</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/marketplace" className="hover:text-bright-green transition-colors">Browse Products</Link></li>
                <li><Link href="/profile" className="hover:text-bright-green transition-colors">Sell Your Produce</Link></li>
                <li><Link href="/tools" className="hover:text-bright-green transition-colors">Tool Rentals</Link></li>
                <li><a href="#" className="hover:text-bright-green transition-colors">Farmer Profiles</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-bright-green transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-bright-green transition-colors">AI Assistant</a></li>
                <li><a href="#" className="hover:text-bright-green transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-bright-green transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">&copy; 2024 FarmConnect. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-bright-green text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-bright-green text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-bright-green text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
