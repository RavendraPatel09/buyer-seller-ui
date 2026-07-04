import { adminAxios } from './adminAxios';
import type { 
  AdminUser, 
  PlatformUser, 
  MedicineListing, 
  Report, 
  AuditLogEntry, 
  DashboardKPI,
  ChartDataPoint
} from '../types';

// ── Auth ───────────────────────────────────────────────────────────────
export const authService = {
  login: async (email: string, password: string) => {
    // MOCK: In production, this calls the real admin auth endpoint
    await new Promise(r => setTimeout(r, 800));
    if (email === 'admin@medicycle.com' && password === 'admin123') {
      const mockUser: AdminUser = { id: 'adm-1', email, name: 'Admin', role: 'super_admin' };
      const mockToken = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4ifQ.mock';
      return { user: mockUser, token: mockToken };
    }
    throw new Error('Invalid credentials');
  },
  verify: async () => {
    await new Promise(r => setTimeout(r, 300));
    const token = localStorage.getItem('medicycle_admin_token');
    if (!token) throw new Error('No token');
    return { id: 'adm-1', email: 'admin@medicycle.com', name: 'Admin', role: 'super_admin' as const };
  },
  logout: async () => { localStorage.removeItem('medicycle_admin_token'); },
};

// ── Dashboard KPIs ─────────────────────────────────────────────────────
export const dashboardService = {
  getKPIs: async (): Promise<DashboardKPI> => {
    await new Promise(r => setTimeout(r, 400));
    return {
      totalUsers: 12492, activeUsers: 8741, totalRevenue: 1243000,
      totalOrders: 34201, pendingListings: 127, openReports: 48,
      flaggedContent: 15, userGrowthPercent: 14.2, revenueGrowthPercent: 8.4,
    };
  },
  getTrends: async (): Promise<ChartDataPoint[]> => {
    await new Promise(r => setTimeout(r, 500));
    return [
      { name: 'Jan', revenue: 84000, users: 1200, uploads: 340, messages: 8900 },
      { name: 'Feb', revenue: 92000, users: 1450, uploads: 410, messages: 9200 },
      { name: 'Mar', revenue: 78000, users: 1100, uploads: 290, messages: 7800 },
      { name: 'Apr', revenue: 110000, users: 1800, uploads: 520, messages: 11400 },
      { name: 'May', revenue: 125000, users: 2100, uploads: 610, messages: 12800 },
      { name: 'Jun', revenue: 140000, users: 2400, uploads: 690, messages: 14200 },
      { name: 'Jul', revenue: 158000, users: 2800, uploads: 780, messages: 15600 },
    ];
  },
};

// ── Users ──────────────────────────────────────────────────────────────
export const userService = {
  getAll: async (): Promise<PlatformUser[]> => {
    await new Promise(r => setTimeout(r, 500));
    return [
      { id: 'U-001', name: 'Dr. Sarah Smith', email: 'sarah@clinic.io', role: 'buyer', status: 'active', verified: true, registeredAt: '2023-06-12', lastActive: '2024-01-05', totalOrders: 84, totalRevenue: 12400 },
      { id: 'U-002', name: 'MediLife Supplies', email: 'info@medilife.com', role: 'seller', status: 'active', verified: true, registeredAt: '2023-07-01', lastActive: '2024-01-05', totalOrders: 210, totalRevenue: 48200 },
      { id: 'U-003', name: 'PharmaCorp Ltd', email: 'ops@pharmacorp.in', role: 'seller', status: 'pending', verified: false, registeredAt: '2024-01-02', lastActive: '2024-01-03', totalOrders: 0, totalRevenue: 0 },
      { id: 'U-004', name: 'John Doe', email: 'john@gmail.com', role: 'buyer', status: 'suspended', verified: true, registeredAt: '2023-09-15', lastActive: '2023-12-20', totalOrders: 12, totalRevenue: 890 },
      { id: 'U-005', name: 'QuickMeds Inc', email: 'admin@quickmeds.com', role: 'seller', status: 'active', verified: true, registeredAt: '2023-05-20', lastActive: '2024-01-04', totalOrders: 456, totalRevenue: 92100 },
      { id: 'U-006', name: 'CareFirst Pharma', email: 'hello@carefirst.io', role: 'seller', status: 'banned', verified: false, registeredAt: '2023-11-10', lastActive: '2023-12-01', totalOrders: 3, totalRevenue: 150 },
    ];
  },
  suspend: async (id: string) => { void id; await new Promise(r => setTimeout(r, 300)); },
  verify: async (id: string) => { void id; await new Promise(r => setTimeout(r, 300)); },
  delete: async (id: string) => { void id; await new Promise(r => setTimeout(r, 300)); },
};

// ── Medicine Listings ─────────────────────────────────────────────────
export const listingService = {
  getAll: async (): Promise<MedicineListing[]> => {
    await new Promise(r => setTimeout(r, 500));
    return [
      { id: 'M-001', name: 'Amoxicillin 500mg', seller: 'MediLife Supplies', sellerId: 'U-002', category: 'Antibiotics', price: 12.50, stock: 500, status: 'approved', expiryDate: '2025-06-15', createdAt: '2024-01-02' },
      { id: 'M-002', name: 'Paracetamol 650mg', seller: 'QuickMeds Inc', sellerId: 'U-005', category: 'Pain Relief', price: 4.20, stock: 2000, status: 'approved', expiryDate: '2025-12-01', createdAt: '2024-01-01' },
      { id: 'M-003', name: 'Cetrizine 10mg', seller: 'PharmaCorp Ltd', sellerId: 'U-003', category: 'Allergy', price: 6.00, stock: 150, status: 'pending_review', expiryDate: '2025-03-20', createdAt: '2024-01-03' },
      { id: 'M-004', name: 'Suspicious Compound X', seller: 'CareFirst Pharma', sellerId: 'U-006', category: 'Unknown', price: 99.99, stock: 10, status: 'flagged', expiryDate: '2024-02-01', createdAt: '2023-12-28', reason: 'Unverified manufacturer, suspicious pricing' },
      { id: 'M-005', name: 'Metformin 500mg', seller: 'MediLife Supplies', sellerId: 'U-002', category: 'Diabetes', price: 8.75, stock: 800, status: 'pending_review', expiryDate: '2025-09-10', createdAt: '2024-01-04' },
    ];
  },
  approve: async (id: string) => { void id; await new Promise(r => setTimeout(r, 300)); },
  reject: async (id: string, reason: string) => { void id; void reason; await new Promise(r => setTimeout(r, 300)); },
  flag: async (id: string, reason: string) => { void id; void reason; await new Promise(r => setTimeout(r, 300)); },
};

// ── Reports ───────────────────────────────────────────────────────────
export const reportService = {
  getAll: async (): Promise<Report[]> => {
    await new Promise(r => setTimeout(r, 400));
    return [
      { id: 'R-001', type: 'fraud', severity: 'critical', subject: 'Suspicious bulk price change', description: 'Seller changed prices on 50+ items by 300% overnight', reportedBy: 'System', reportedEntity: 'CareFirst Pharma', status: 'open', createdAt: '2024-01-05' },
      { id: 'R-002', type: 'complaint', severity: 'high', subject: 'Expired medicine received', description: 'Buyer reports receiving expired Amoxicillin batch', reportedBy: 'Dr. Sarah Smith', reportedEntity: 'MediLife Supplies', status: 'investigating', createdAt: '2024-01-04' },
      { id: 'R-003', type: 'content', severity: 'medium', subject: 'Inappropriate product images', description: 'Listing contains misleading product photos', reportedBy: 'System', reportedEntity: 'PharmaCorp Ltd', status: 'open', createdAt: '2024-01-03' },
      { id: 'R-004', type: 'fraud', severity: 'high', subject: 'Multiple failed login attempts', description: '48 failed login attempts from IP 192.168.1.1', reportedBy: 'System', reportedEntity: 'seller_29', status: 'open', createdAt: '2024-01-05' },
    ];
  },
  resolve: async (id: string) => { void id; await new Promise(r => setTimeout(r, 300)); },
  dismiss: async (id: string) => { void id; await new Promise(r => setTimeout(r, 300)); },
};

// ── Audit Log ─────────────────────────────────────────────────────────
export const auditService = {
  getLog: async (): Promise<AuditLogEntry[]> => {
    await new Promise(r => setTimeout(r, 400));
    return [
      { id: 'AL-001', adminId: 'adm-1', adminName: 'Admin', action: 'USER_SUSPENDED', target: 'John Doe (U-004)', details: 'Suspended for policy violation', timestamp: '2024-01-05T14:30:00Z', ip: '10.0.0.1' },
      { id: 'AL-002', adminId: 'adm-1', adminName: 'Admin', action: 'LISTING_FLAGGED', target: 'Suspicious Compound X (M-004)', details: 'Flagged for unverified manufacturer', timestamp: '2024-01-05T13:15:00Z', ip: '10.0.0.1' },
      { id: 'AL-003', adminId: 'adm-1', adminName: 'Admin', action: 'LISTING_APPROVED', target: 'Amoxicillin 500mg (M-001)', details: 'Verified and approved', timestamp: '2024-01-04T09:00:00Z', ip: '10.0.0.1' },
      { id: 'AL-004', adminId: 'adm-1', adminName: 'Admin', action: 'USER_VERIFIED', target: 'MediLife Supplies (U-002)', details: 'License verification complete', timestamp: '2024-01-03T11:45:00Z', ip: '10.0.0.1' },
      { id: 'AL-005', adminId: 'adm-1', adminName: 'Admin', action: 'REPORT_RESOLVED', target: 'Report R-005', details: 'False positive, dismissed', timestamp: '2024-01-02T16:20:00Z', ip: '10.0.0.1' },
    ];
  },
};

// Re-export the axios instance for custom queries
export { adminAxios };
