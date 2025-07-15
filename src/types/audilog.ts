
export interface AudilogRecord {
  uid: string;
  type: 'vendor' | 'customer';
  phoneNumber: string;
  productCount: number;
  productName: string;
  manufactureDate: string;
  expiryDate: string;
}

export interface Product {
  id: string;
  vendorUid: string;
  name: string;
  count: number;
  manufactureDate: string;
  expiryDate: string;
  vendorPhone: string;
}

export interface Purchase {
  customerUid: string;
  productId: string;
  quantity: number;
  timestamp: string;
}
