
import React from 'react';
import { ProductForm } from '../components/ProductForm';
import { Store } from 'lucide-react';

const AudilogVendor: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Audilog</h1>
              <p className="text-sm text-muted-foreground">Vendor Portal</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light text-foreground mb-2">
              Manage Your Products
            </h2>
            <p className="text-muted-foreground">
              Add products to your catalog and track inventory in real-time
            </p>
          </div>

          <ProductForm />
        </div>
      </main>
    </div>
  );
};

export default AudilogVendor;
