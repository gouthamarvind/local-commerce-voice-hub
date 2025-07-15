
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  seller: string;
  category: string;
  distance: number;
  tags: string[];
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  product: string;
  quantity: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  date: Date;
}

export type Language = 'en' | 'ta' | 'hi';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  location: string;
  setLocation: (loc: string) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  isVoiceRecording: boolean;
  setIsVoiceRecording: (recording: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [location, setLocation] = useState<string>('Chennai');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);

  // Initialize with sample data
  useEffect(() => {
    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'Fresh Tomatoes',
        price: 45,
        image: '/api/placeholder/200/200',
        seller: 'Kumar Vegetables',
        category: 'vegetables',
        distance: 0.5,
        tags: ['Fresh', 'Organic', 'Local'],
        description: 'Fresh locally grown tomatoes, picked this morning'
      },
      {
        id: '2',
        name: 'Handmade Pottery',
        price: 299,
        image: '/api/placeholder/200/200',
        seller: 'Chennai Crafts',
        category: 'handicrafts',
        distance: 2.3,
        tags: ['Handmade', 'Traditional', 'Offers'],
        description: 'Beautiful handcrafted pottery made by local artisans'
      },
      {
        id: '3',
        name: 'Coconut Oil',
        price: 150,
        image: '/api/placeholder/200/200',
        seller: 'Organic Store',
        category: 'food',
        distance: 1.8,
        tags: ['Organic', 'Pure', 'Local'],
        description: 'Cold-pressed coconut oil from Kerala coconuts'
      }
    ];

    const sampleOrders: Order[] = [
      {
        id: '1',
        customerName: 'Priya Sharma',
        product: 'Fresh Tomatoes',
        quantity: 2,
        total: 90,
        status: 'pending',
        date: new Date()
      },
      {
        id: '2',
        customerName: 'Raj Kumar',
        product: 'Handmade Pottery',
        quantity: 1,
        total: 299,
        status: 'confirmed',
        date: new Date(Date.now() - 86400000)
      }
    ];

    setProducts(sampleProducts);
    setOrders(sampleOrders);
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('localCommerce_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('localCommerce_cart', JSON.stringify(cart));
  }, [cart]);

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('localCommerce_language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('localCommerce_language', language);
  }, [language]);

  // Request geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode this to get city name
          console.log('Location detected:', position.coords);
          setLocation('Chennai'); // Default to Chennai as specified
        },
        (error) => {
          console.log('Geolocation error:', error);
          setLocation('Chennai'); // Default fallback
        }
      );
    }
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast('Added to cart', 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast('Removed from cart', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    showToast('Cart cleared', 'info');
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    // Create a custom toast notification
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
      type === 'success' ? 'bg-green-500 text-white' :
      type === 'error' ? 'bg-red-500 text-white' :
      'bg-primary text-primary-foreground'
    }`;
    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <span>${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-lg">&times;</button>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      toast.classList.add('translate-x-full');
      setTimeout(() => {
        if (toast.parentElement) {
          toast.parentElement.removeChild(toast);
        }
      }, 300);
    }, 3000);
  };

  const value: AppContextType = {
    language,
    setLanguage,
    location,
    setLocation,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    products,
    setProducts,
    orders,
    setOrders,
    showToast,
    isVoiceRecording,
    setIsVoiceRecording
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
