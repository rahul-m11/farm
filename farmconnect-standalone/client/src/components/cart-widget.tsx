import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { Product } from "@shared/schema";
import CheckoutModal from "./checkout-modal";

interface CartItem extends Product {
  quantity: number;
}

interface CartWidgetProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartWidget({ cartItems, onUpdateQuantity, onRemoveItem, onClearCart }: CartWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

  return (
    <div className="fixed top-20 right-6 z-40">
      {/* Cart Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-forest-green text-white w-14 h-14 rounded-full shadow-lg hover:bg-forest-green/90 transition-all relative"
        size="icon"
      >
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-harvest-orange text-white text-xs h-6 w-6 flex items-center justify-center p-0 rounded-full">
            {totalItems}
          </Badge>
        )}
      </Button>
      
      {/* Cart Panel */}
      {isOpen && (
        <Card className="absolute top-16 right-0 w-96 shadow-2xl border border-gray-200 max-h-96 overflow-hidden">
          {/* Cart Header */}
          <CardHeader className="bg-forest-green text-white p-4 flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg">Shopping Cart ({totalItems})</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-gray-200 h-6 w-6"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          {/* Cart Items */}
          <CardContent className="p-0">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Your cart is empty</p>
                <p className="text-sm text-gray-500">Add some fresh products to get started</p>
              </div>
            ) : (
              <div className="max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="border-b border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={item.imageUrl || "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=60&h=60&fit=crop"} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded" 
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">${item.price}/{item.unit}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-red-500 hover:text-red-700"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right mt-2">
                      <span className="text-sm font-semibold text-forest-green">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 bg-gray-50 border-t">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold">Total:</span>
                  <span className="text-lg font-bold text-forest-green">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <Button 
                  className="w-full bg-harvest-orange text-white hover:bg-harvest-orange/90"
                  onClick={() => setShowCheckout(true)}
                >
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        cartItems={cartItems}
        onClearCart={onClearCart}
      />
    </div>
  );
}