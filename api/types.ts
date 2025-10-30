// API Types and Interfaces

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  pagination?: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'guest' | 'receptionist' | 'housekeeping' | 'maintenance' | 'admin';
  avatar?: string;
  phone?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  preferences?: string[];
  idDocument?: string;
  totalStays: number;
  status: 'active' | 'checked-in' | 'checked-out';
  createdAt: string;
}

export interface Reservation {
  id: string;
  guestId: string;
  guestName: string;
  guestEmail: string;
  roomId: string;
  roomNumber: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'checked-in' | 'checked-out' | 'cancelled';
  totalAmount: number;
  currency: string;
  paymentStatus: 'paid' | 'pending' | 'partial';
  specialRequests?: string[];
  numberOfGuests: number;
  createdAt: string;
}

export interface Room {
  id: string;
  number: string;
  type: 'Standard' | 'Deluxe' | 'Suite' | 'Executive' | 'Penthouse';
  floor: number;
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance';
  occupants?: number;
  guestName?: string;
  cleaningStatus: 'clean' | 'dirty' | 'in-progress';
  lastCleaned?: string;
  amenities: string[];
  baseRate: number;
  currentRate: number;
}

export interface HousekeepingTask {
  id: string;
  roomNumber: string;
  type: 'Deep Clean' | 'Standard Clean' | 'Turndown Service' | 'Room Refresh';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  assignee?: string;
  assigneeName?: string;
  estimatedTime: number;
  startedAt?: string;
  completedAt?: string;
  notes?: string;
  createdAt: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  minimum: number;
  unit: string;
  status: 'good' | 'low' | 'critical';
  lastRestocked?: string;
  category: string;
}

export interface WorkOrder {
  id: string;
  roomNumber: string;
  issue: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  assignee?: string;
  assigneeName?: string;
  reportedBy: string;
  createdAt: string;
  completedAt?: string;
  estimatedCost?: number;
  actualCost?: number;
  category: 'HVAC' | 'Plumbing' | 'Electrical' | 'Furniture' | 'Other';
}

export interface Bill {
  id: string;
  guestId: string;
  reservationId: string;
  items: BillItem[];
  subtotal: number;
  tax: number;
  total: number;
  paid: number;
  balance: number;
  currency: string;
  status: 'unpaid' | 'partial' | 'paid';
}

export interface BillItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  date: string;
  category: string;
}

export interface Payment {
  id: string;
  billId: string;
  amount: number;
  method: 'credit_card' | 'cash' | 'bank_transfer';
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  cardDetails?: {
    last4: string;
    brand: string;
  };
  createdAt: string;
}

export interface DashboardStats {
  totalRevenue: number;
  occupancyRate: number;
  activeGuests: number;
  avgDailyRate: number;
  totalRooms: number;
  availableRooms: number;
  occupiedRooms: number;
  cleaningRooms: number;
  maintenanceRooms: number;
}
