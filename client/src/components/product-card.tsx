import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, MapPin } from "lucide-react";
import { useState } from "react";
import { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <Card className="product-card bg-white shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all">
      <div className="relative">
        <img 
          src={product.imageUrl || "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"} 
          alt={product.name}
          className="w-full h-48 object-cover" 
        />
        {product.isOrganic && (
          <Badge className="absolute top-4 left-4 bg-bright-green text-white">
            Organic
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-4 right-4 w-8 h-8 bg-white rounded-full hover:bg-gray-100 ${
            isFavorited ? 'text-red-500' : 'text-gray-600'
          }`}
          onClick={() => setIsFavorited(!isFavorited)}
        >
          <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">Farm Name</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-forest-green">
            ${product.price}/{product.unit}
          </span>
          <div className="flex items-center text-sm text-gray-600">
            <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
            <span>{product.rating}</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{product.location || "Location not specified"}</span>
        </div>
        <Button 
          className="w-full bg-forest-green text-white hover:bg-forest-green/90"
          onClick={onAddToCart}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
