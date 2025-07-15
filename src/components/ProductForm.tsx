
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useAudilog } from '../contexts/AudilogContext';
import { Package, Upload, X } from 'lucide-react';

export const ProductForm: React.FC = () => {
  const { addVendorProduct } = useAudilog();
  const [formData, setFormData] = useState({
    phoneNumber: '',
    productName: '',
    productDescription: '',
    productCount: '',
    manufactureDate: '',
    expiryDate: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phoneNumber || !formData.productName) {
      return;
    }

    // Convert image to base64 for storage
    let imageData = '';
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        imageData = reader.result as string;
        saveProduct(imageData);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      saveProduct('');
    }
  };

  const saveProduct = (imageData: string) => {
    const uid = addVendorProduct({
      phoneNumber: formData.phoneNumber,
      productName: formData.productName,
      productDescription: formData.productDescription,
      productImage: imageData,
      productCount: parseInt(formData.productCount) || 0,
      manufactureDate: formData.manufactureDate,
      expiryDate: formData.expiryDate
    });

    console.log('Product added with UID:', uid);

    // Reset form
    setFormData({
      phoneNumber: '',
      productName: '',
      productDescription: '',
      productCount: '',
      manufactureDate: '',
      expiryDate: ''
    });
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
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
            <Label htmlFor="productDescription" className="text-sm font-medium">Product Description</Label>
            <Textarea
              id="productDescription"
              placeholder="Describe your product..."
              value={formData.productDescription}
              onChange={(e) => handleChange('productDescription', e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productImage" className="text-sm font-medium">Product Image</Label>
            <div className="space-y-2">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="w-full h-32 object-cover rounded-md border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={removeImage}
                    className="absolute top-2 right-2 h-6 w-6 p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-4">
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <label htmlFor="productImage" className="cursor-pointer">
                      <span className="text-sm text-muted-foreground">Click to upload image</span>
                      <Input
                        id="productImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
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
