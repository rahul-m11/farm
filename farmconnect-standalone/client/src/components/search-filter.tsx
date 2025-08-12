import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string) => void;
  onLocationFilter: (location: string) => void;
}

export default function SearchFilter({ onSearch, onCategoryFilter, onLocationFilter }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <section className="bg-white py-8 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Search products, tools, or farmers..." 
              className="pl-12 pr-4 py-3 focus:ring-2 focus:ring-forest-green focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4 flex-wrap">
            <Select onValueChange={onCategoryFilter}>
              <SelectTrigger className="w-48 focus:ring-2 focus:ring-forest-green">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="fruits">Fresh Fruits</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="tools">Farming Tools</SelectItem>
                <SelectItem value="seeds">Seeds & Plants</SelectItem>
              </SelectContent>
            </Select>
            
            <Select onValueChange={onLocationFilter}>
              <SelectTrigger className="w-48 focus:ring-2 focus:ring-forest-green">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="california">California</SelectItem>
                <SelectItem value="texas">Texas</SelectItem>
                <SelectItem value="iowa">Iowa</SelectItem>
                <SelectItem value="nebraska">Nebraska</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              type="submit"
              className="bg-forest-green text-white hover:bg-forest-green/90 px-6 py-3"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
