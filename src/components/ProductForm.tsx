
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAudilog } from '../contexts/AudilogContext';
import { Package } from 'lucide-react';

export const ProductForm: React.FC = () => {
  const { addVendorProduct } = useAudilog();
  const [formData, setFormData] = useState({
    uid: '',
    phoneNumber: '',
    productName: '',
    productCount: '',
    manufactureDate: '',
    expiryDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.uid || !formData.phoneNumber || !formData.productName) {
      return;
    }

    addVendorProduct({
      uid: formData.uid,
      phoneNumber: formData.phoneNumber,
      productName: formData.productName,
      productCount: parseInt(formData.productCount) || 0,
      manufactureDate: formData.manufactureDate,
      expiryDate: formData.expiryDate
    });

    // Reset form
    setFormData({
      uid: '',
      phoneNumber: '',
      productName: '',
      productCount: '',
      manufactureDate: '',
      expiryDate: ''
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Package className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-xl font-medium">Add Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="uid" className="text-sm font-medium">Vendor ID</Label>
            <Input
              id="uid"
              placeholder="v1, v2, v3..."
              value={formData.uid}
              onChange={(e) => handleChange('uid', e.target.value)}
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productName" className="text-sm font-medium">Product Name</Label>
            <Input
              id="productName"
              placeholder="Enter product name"
              value={formData.productName}
              onChange={(e) => handleChange('productName', e.target.value)}
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productCount" className="text-sm font-medium">Quantity</Label>
            <Input
              id="productCount"
              type="number"
              min="0"
              placeholder="0"
              value={formData.productCount}
              onChange={(e) => handleChange('productCount', e.target.value)}
              className="h-10"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="manufactureDate" className="text-sm font-medium">Mfg Date</Label>
              <Input
                id="manufactureDate"
                type="date"
                value={formData.manufactureDate}
                onChange={(e) => handleChange('manufactureDate', e.target.value)}
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate" className="text-sm font-medium">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleChange('expiryDate', e.target.value)}
                className="h-10"
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-10 mt-6">
            Add Product
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
