
import { AudilogRecord, Product } from '../types/audilog';

// In a real application, this would connect to a backend API
// For now, we'll simulate CSV operations with localStorage
// CSV file would be located at: /data/audilog_records.csv in production

const CSV_STORAGE_KEY = 'audilog_csv_data';
const USED_UIDS_KEY = 'audilog_used_uids';

export const csvManager = {
  // Generate unique UID
  generateUniqueUid(type: 'vendor' | 'customer'): string {
    const usedUids = this.getUsedUids();
    const prefix = type === 'vendor' ? 'v' : 'c';
    let counter = 1;
    let uid = `${prefix}${counter}`;
    
    while (usedUids.includes(uid)) {
      counter++;
      uid = `${prefix}${counter}`;
    }
    
    // Store the new UID
    usedUids.push(uid);
    localStorage.setItem(USED_UIDS_KEY, JSON.stringify(usedUids));
    
    return uid;
  },

  // Get all used UIDs
  getUsedUids(): string[] {
    const data = localStorage.getItem(USED_UIDS_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Read all records from "CSV"
  readRecords(): AudilogRecord[] {
    const data = localStorage.getItem(CSV_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Write records to "CSV"
  writeRecords(records: AudilogRecord[]): void {
    localStorage.setItem(CSV_STORAGE_KEY, JSON.stringify(records));
  },

  // Add a new record with unique UID
  addRecord(record: Omit<AudilogRecord, 'uid'>): string {
    const uid = this.generateUniqueUid(record.type);
    const fullRecord: AudilogRecord = { ...record, uid };
    const records = this.readRecords();
    records.push(fullRecord);
    this.writeRecords(records);
    return uid;
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
        description: r.productDescription,
        image: r.productImage,
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
      productDescription: records[vendorIndex].productDescription,
      productImage: records[vendorIndex].productImage,
      manufactureDate: records[vendorIndex].manufactureDate,
      expiryDate: records[vendorIndex].expiryDate
    };

    records.push(customerRecord);
    this.writeRecords(records);
    return true;
  }
};
