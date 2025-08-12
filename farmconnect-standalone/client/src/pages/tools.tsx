import Navigation from "@/components/navigation";
import ToolCard from "@/components/tool-card";
import ChatWidget from "@/components/chat-widget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Tool } from "@shared/schema";
import { Search, Filter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Tools() {
  const [searchQuery, setSearchQuery] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tools = [], isLoading } = useQuery<Tool[]>({
    queryKey: availabilityFilter === "available" ? ['/api/tools/available'] : ['/api/tools'],
  });

  const reserveToolMutation = useMutation({
    mutationFn: async (toolId: string) => {
      const response = await apiRequest('POST', '/api/rentals', {
        toolId,
        renterId: 'user-1', // This would come from auth context
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
        totalCost: "150.00", // This would be calculated based on daily rate
        status: "pending",
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tools'] });
      toast({
        title: "Reservation Submitted",
        description: "Your tool reservation request has been submitted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Reservation Failed",
        description: "There was an error processing your reservation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const filteredTools = tools.filter(tool => {
    const matchesSearch = !searchQuery || 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAvailability = availabilityFilter === "all" || 
      (availabilityFilter === "available" && tool.isAvailable) ||
      (availabilityFilter === "reserved" && !tool.isAvailable);
    
    return matchesSearch && matchesAvailability;
  });

  const handleReserveTool = (toolId: string) => {
    reserveToolMutation.mutate(toolId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-green-bg">
        <Navigation />
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-green mx-auto mb-4"></div>
            <p className="text-gray-600">Loading tools...</p>
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
          <h1 className="text-4xl font-bold text-center mb-4 font-roboto">Equipment Rental</h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Access professional farming equipment when you need it. From tractors to specialized tools.
          </p>
        </div>
        
        {/* Search and Filter */}
        <section className="bg-white py-8 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  type="text" 
                  placeholder="Search tools and equipment..." 
                  className="pl-12 pr-4 py-3 focus:ring-2 focus:ring-forest-green focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-4 flex-wrap">
                <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                  <SelectTrigger className="w-48 focus:ring-2 focus:ring-forest-green">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tools</SelectItem>
                    <SelectItem value="available">Available Now</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  className="bg-forest-green text-white hover:bg-forest-green/90 px-6 py-3"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Tools Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold font-roboto">
              {searchQuery ? `Search results for "${searchQuery}"` : 'Available Equipment'}
            </h2>
            <p className="text-gray-600">{filteredTools.length} tools found</p>
          </div>
          
          {filteredTools.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚜</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">No tools found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? "Try adjusting your search terms or browsing all tools."
                  : "No tools are currently available."}
              </p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setAvailabilityFilter("all");
                }}
                className="text-forest-green font-semibold hover:underline"
              >
                View all tools
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTools.map((tool) => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool}
                  onReserve={() => handleReserveTool(tool.id)}
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
