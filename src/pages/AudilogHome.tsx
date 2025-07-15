
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Store, ShoppingBag, Database } from 'lucide-react';
import GoogleTranslate from '../components/GoogleTranslate';

const AudilogHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-end mb-4">
          <GoogleTranslate />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Database className="w-4 h-4" />
              Audio Message Tracking System
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extralight text-foreground mb-6 tracking-tight">
              Audilog
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Clean, minimal interface for tracking audio messages from IVR systems. 
              Manage vendors and customers with real-time CSV data synchronization.
            </p>
          </div>

          {/* Portal Selection */}
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card 
              className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 hover:border-primary/20"
              onClick={() => navigate('/vendor')}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <Store className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">Vendor Portal</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Add and manage your product catalog. Track inventory in real-time as customers make purchases.
                </p>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Access Vendor Portal
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 hover:border-accent/20"
              onClick={() => navigate('/customer')}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <ShoppingBag className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">Customer Portal</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Browse available products from all vendors. Make purchases that update inventory instantly.
                </p>
                <Button variant="outline" className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  Browse Products
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Feature Highlights */}
          <div className="mt-16 pt-16 border-t border-border/50">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Database className="w-6 h-6 text-muted-foreground" />
                </div>
                <h4 className="font-medium text-foreground mb-2">CSV Integration</h4>
                <p className="text-sm text-muted-foreground">Real-time data synchronization with CSV files for AI agent connectivity</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Store className="w-6 h-6 text-muted-foreground" />
                </div>
                <h4 className="font-medium text-foreground mb-2">Vendor Management</h4>
                <p className="text-sm text-muted-foreground">Simple product listing with inventory tracking and date management</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-6 h-6 text-muted-foreground" />
                </div>
                <h4 className="font-medium text-foreground mb-2">Customer Portal</h4>
                <p className="text-sm text-muted-foreground">Clean product browsing with instant purchase capabilities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudilogHome;
