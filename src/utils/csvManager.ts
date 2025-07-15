
import { AudilogRecord, Product } from '../types/audilog';

// In a real application, this would connect to a backend API
// For now, we'll simulate CSV operations with localStorage

const CSV_STORAGE_KEY = 'audilog_csv_data';

export const csvManager = {
  // Read all records from "CSV"
  readRecords(): AudilogRecord[] {
    const data = localStorage.getItem(CSV_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Write records to "CSV"
  writeRecords(records: AudilogRecord[]): void {
    localStorage.setItem(CSV_STORAGE_KEY, JSON.stringify(records));
  },

  // Add a new record
  addRecord(record: AudilogRecord): void {
    const records = this.readRecords();
    records.push(record);
    this.writeRecords(records);
  },

  // Update a record
  updateRecord(uid: string, updates: Partial<AudilogRecord>): void {
    const records = this.readRecords();
    const index = records.findIndex(r => r.uid === uid);
    if (index !== -1) {
      records[index] = { ...records[index], ...updates };
      this.writeRecords(records);
    }
  },

  // Get products available for purchase
  getAvailableProducts(): Product[] {
    const records = this.readRecords();
    return records
      .filter(r => r.type === 'vendor' && r.productCount > 0)
      .map(r => ({
        id: `${r.uid}-${r.productName}`,
        vendorUid: r.uid,
        name: r.productName,
        count: r.productCount,
        manufactureDate: r.manufactureDate,
        expiryDate: r.expiryDate,
        vendorPhone: r.phoneNumber
      }));
  },

  // Process a purchase
  processPurchase(customerUid: string, productId: string, quantity: number): boolean {
    const records = this.readRecords();
    const [vendorUid, productName] = productId.split('-');
    
    // Find vendor record
    const vendorIndex = records.findIndex(r => 
      r.uid === vendorUid && r.productName === productName && r.type === 'vendor'
    );
    
    if (vendorIndex === -1 || records[vendorIndex].productCount < quantity) {
      return false; // Insufficient stock
    }

    // Update vendor inventory
    records[vendorIndex].productCount -= quantity;

    // Add customer purchase record
    const customerRecord: AudilogRecord = {
      uid: customerUid,
      type: 'customer',
      phoneNumber: '', // Would be filled from customer data
      productCount: quantity,
      productName: productName,
      manufactureDate: records[vendorIndex].manufactureDate,
      expiryDate: records[vendorIndex].expiryDate
    };

    records.push(customerRecord);
    this.writeRecords(records);
    return true;
  }
};
