
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AudilogRecord, Product } from '../types/audilog';
import { csvManager } from '../utils/csvManager';

interface AudilogContextType {
  records: AudilogRecord[];
  products: Product[];
  refreshData: () => void;
  addVendorProduct: (vendorData: Omit<AudilogRecord, 'type' | 'uid'>) => string;
  purchaseProduct: (customerUid: string, productId: string, quantity: number) => boolean;
}

const AudilogContext = createContext<AudilogContextType | undefined>(undefined);

export const AudilogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [records, setRecords] = useState<AudilogRecord[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const refreshData = () => {
    const newRecords = csvManager.readRecords();
    const newProducts = csvManager.getAvailableProducts();
    setRecords(newRecords);
    setProducts(newProducts);
  };

  const addVendorProduct = (vendorData: Omit<AudilogRecord, 'type' | 'uid'>): string => {
    const uid = csvManager.addRecord({
      ...vendorData,
      type: 'vendor'
    });
    refreshData();
    return uid;
  };

  const purchaseProduct = (customerUid: string, productId: string, quantity: number): boolean => {
    const success = csvManager.processPurchase(customerUid, productId, quantity);
    if (success) {
      refreshData();
    }
    return success;
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <AudilogContext.Provider value={{
      records,
      products,
      refreshData,
      addVendorProduct,
      purchaseProduct
    }}>
      {children}
    </AudilogContext.Provider>
  );
};

export const useAudilog = () => {
  const context = useContext(AudilogContext);
  if (context === undefined) {
    throw new Error('useAudilog must be used within an AudilogProvider');
  }
  return context;
};
