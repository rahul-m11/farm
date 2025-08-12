import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Product } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Phone, Mail, MapPin, User, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartItem extends Product {
  quantity: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
}

interface Seller {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  farmName: string;
}

export default function CheckoutModal({ isOpen, onClose, cartItems, onClearCart }: CheckoutModalProps) {
  const [selectedPayment, setSelectedPayment] = useState<string>("gpay");
  const { toast } = useToast();

  // Get unique sellers from cart items
  const uniqueSellerIds = Array.from(new Set(cartItems.map(item => item.farmerId)));

  const { data: sellers = [] } = useQuery<Seller[]>({
    queryKey: ['/api/users', uniqueSellerIds],
    enabled: isOpen && uniqueSellerIds.length > 0,
  });

  const totalAmount = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

  const handleGooglePayCheckout = () => {
    // Create a summary of items and sellers
    const orderSummary = cartItems.map(item => {
      const seller = sellers.find(s => s.id === item.farmerId);
      return `${item.quantity}x ${item.name} - $${(parseFloat(item.price) * item.quantity).toFixed(2)} (from ${seller?.farmName || 'Unknown Farm'})`;
    }).join('\n');

    const sellerContacts = sellers.map(seller => 
      `${seller.farmName}: ${seller.fullName} - ${seller.phoneNumber} - ${seller.email}`
    ).join('\n');

    // Generate Google Pay URL with payment details
    const gpayUrl = `https://pay.google.com/send/home?amount=${totalAmount.toFixed(2)}&currency=USD&message=FarmConnect Order - ${encodeURIComponent(orderSummary)}`;

    // Show seller contact information
    toast({
      title: "Seller Contact Information",
      description: `Please contact the seller(s) to arrange delivery:\n\n${sellerContacts}`,
      duration: 10000,
    });

    // Open Google Pay in new tab
    window.open(gpayUrl, '_blank');

    // Clear cart and close modal
    onClearCart();
    onClose();

    toast({
      title: "Payment Initiated",
      description: "Opening Google Pay. Please complete your payment and contact the sellers directly.",
    });
  };

  const groupedItems = cartItems.reduce((acc, item) => {
    const farmerId = item.farmerId;
    if (!acc[farmerId]) {
      acc[farmerId] = [];
    }
    acc[farmerId].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Checkout - FarmConnect</DialogTitle>
          <DialogDescription>
            Review your order and complete payment using Google Pay. You'll receive seller contact information to arrange delivery.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(groupedItems).map(([farmerId, items]) => {
                const seller = sellers.find(s => s.id === farmerId);
                const sellerTotal = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

                return (
                  <div key={farmerId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-forest-green" />
                        <span className="font-semibold">{seller?.farmName || 'Unknown Farm'}</span>
                      </div>
                      <Badge variant="outline">${sellerTotal.toFixed(2)}</Badge>
                    </div>

                    {/* Seller Contact Info */}
                    <div className="text-sm text-gray-600 mb-3 space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-3 w-3" />
                        <span>{seller?.email || 'Contact unavailable'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-3 w-3" />
                        <span>{seller?.phoneNumber || 'Contact unavailable'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-3 w-3" />
                        <span>{seller?.location || 'Location not specified'}</span>
                      </div>
                    </div>

                    {/* Items from this seller */}
                    <div className="space-y-2">
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.quantity}x {item.name}</span>
                          <span>${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              <Separator />
              
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-forest-green">${totalAmount.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="gpay"
                    checked={selectedPayment === "gpay"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="text-forest-green"
                  />
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">G</span>
                    </div>
                    <span className="font-medium">Google Pay</span>
                  </div>
                </label>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> After payment, you'll need to contact each seller directly to arrange delivery or pickup. 
                  Their contact information is shown above.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              className="bg-forest-green text-white hover:bg-forest-green/90"
              onClick={handleGooglePayCheckout}
              disabled={cartItems.length === 0}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Pay with Google Pay
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}