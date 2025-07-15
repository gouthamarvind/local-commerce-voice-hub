
import React from 'react';
import { ProductGrid } from '../components/ProductGrid';
import { BackButton } from '../components/BackButton';
import { ShoppingBag } from 'lucide-react';

const AudilogCustomer: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Audilog</h1>
                <p className="text-sm text-muted-foreground">Customer Portal</p>
              </div>
            </div>
            <BackButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light text-foreground mb-2">
              Browse Products
            </h2>
            <p className="text-muted-foreground">
              Discover and purchase products from local vendors
            </p>
          </div>

          <ProductGrid />
        </div>
      </main>
    </div>
  );
};

export default AudilogCustomer;
