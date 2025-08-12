import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar } from "lucide-react";
import { Tool } from "@shared/schema";

interface ToolCardProps {
  tool: Tool;
  onReserve?: () => void;
}

export default function ToolCard({ tool, onReserve }: ToolCardProps) {
  return (
    <Card className="bg-white shadow-lg overflow-hidden">
      <div className="relative">
        <img 
          src={tool.imageUrl || "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"} 
          alt={tool.name}
          className="w-full h-48 object-cover" 
        />
        <Badge className={`absolute top-4 left-4 ${tool.isAvailable ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {tool.isAvailable ? 'Available' : 'Reserved'}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
        <p className="text-gray-600 mb-4">{tool.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-forest-green">
            ${tool.dailyRate}/day
          </span>
          <div className="flex items-center text-sm text-gray-600">
            <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
            <span>{tool.rating} ({tool.reviewCount})</span>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{tool.location || "Location not specified"}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              Next available: {tool.nextAvailableDate 
                ? new Date(tool.nextAvailableDate).toLocaleDateString()
                : 'Today'
              }
            </span>
          </div>
        </div>
        <Button 
          className={`w-full font-semibold py-3 ${
            tool.isAvailable 
              ? 'bg-harvest-orange text-white hover:bg-harvest-orange/90' 
              : 'bg-gray-400 text-white cursor-not-allowed'
          }`}
          onClick={onReserve}
          disabled={!tool.isAvailable}
        >
          {tool.isAvailable ? 'Reserve Now' : 'Reserved'}
        </Button>
      </CardContent>
    </Card>
  );
}
