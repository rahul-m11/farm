import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sprout, Search, Bell, User, Menu } from "lucide-react";
import AddProductModal from "@/components/add-product-modal";
import { useState } from "react";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/marketplace", label: "Marketplace" },
    { path: "/tools", label: "Tool Rental" },
    { path: "/profile", label: "Sell Products" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Sprout className="text-forest-green text-2xl" />
            <span className="text-xl font-bold text-forest-green font-roboto">FarmConnect</span>
          </Link>
          
          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`font-medium transition-colors ${
                  location === link.path 
                    ? 'text-forest-green' 
                    : 'text-dark-green-text hover:text-forest-green'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <AddProductModal />
            <Button variant="ghost" size="icon" className="text-dark-green-text hover:text-forest-green">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-dark-green-text hover:text-forest-green relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 bg-harvest-orange text-white text-xs h-4 w-4 flex items-center justify-center p-0">
                3
              </Badge>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-forest-green rounded-full flex items-center justify-center">
                <User className="text-white text-sm" />
              </div>
              <span className="hidden sm:inline text-sm font-medium">John Farmer</span>
            </div>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className={`font-medium px-2 py-1 transition-colors ${
                    location === link.path 
                      ? 'text-forest-green' 
                      : 'text-dark-green-text hover:text-forest-green'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
