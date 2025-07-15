
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useAudilog } from '../contexts/AudilogContext';
import { ShoppingCart, Calendar, Phone } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { products, purchaseProduct } = useAudilog();
  const [customerUid, setCustomerUid] = useState('');

  const handlePurchase = (productId: string, availableCount: number) => {
    if (!customerUid) {
      alert('Please enter your customer ID');
      return;
    }

    const quantity = 1; // For simplicity, purchasing 1 item at a time
    const success = purchaseProduct(customerUid, productId, quantity);
    
    if (!success) {
      alert('Purchase failed. Insufficient stock.');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString();
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-muted-foreground mb-2">No Products Available</h3>
        <p className="text-sm text-muted-foreground">Products added by vendors will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="w-full max-w-xs">
          <Input
            placeholder="Enter Customer ID (c1, c2, c3...)"
            value={customerUid}
            onChange={(e) => setCustomerUid(e.target.value)}
            className="text-center h-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">{product.name}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{product.vendorPhone}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available:</span>
                  <span className="font-medium">{product.count} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vendor:</span>
                  <span className="font-medium">{product.vendorUid}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>Mfg: {formatDate(product.manufactureDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>Exp: {formatDate(product.expiryDate)}</span>
                </div>
              </div>

              <Button
                onClick={() => handlePurchase(product.id, product.count)}
                disabled={!customerUid || product.count === 0}
                className="w-full h-9"
                size="sm"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Purchase
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
