
import React from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const CartPreview: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useApp();
  const [isOpen, setIsOpen] = React.useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (totalItems === 0) return null;

  return (
    <>
      {/* Cart Badge */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full p-3 shadow-lg z-40 transition-all duration-200"
        aria-label="View cart"
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        </div>
      </button>

      {/* Cart Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-t-lg md:rounded-lg w-full max-w-md max-h-[80vh] overflow-hidden animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 max-h-96 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-3 py-3 border-b last:border-b-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.seller}</p>
                    <p className="text-sm font-semibold text-primary">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 hover:bg-gray-100 rounded-full text-red-500"
                    aria-label="Remove item"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total: ₹{totalPrice}</span>
              </div>
              <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg transition-colors duration-200">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
