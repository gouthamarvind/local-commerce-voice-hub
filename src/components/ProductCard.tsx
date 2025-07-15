
import React from 'react';
import { MapPin, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../contexts/AppContext';
import { useApp } from '../contexts/AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 group">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          {product.tags.map(tag => (
            <span 
              key={tag} 
              className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl font-bold text-primary">₹{product.price}</div>
          <div className="flex items-center text-sm text-gray-500">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span>4.5</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            <div className="font-medium">{product.seller}</div>
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {product.distance} km away
            </div>
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};
