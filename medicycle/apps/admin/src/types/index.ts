export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'moderator';
  avatar?: string;
}

export interface AdminAuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller';
  status: 'active' | 'pending' | 'suspended' | 'banned';
  verified: boolean;
  registeredAt: string;
  lastActive: string;
  totalOrders: number;
  totalRevenue: number;
}

export interface MedicineListing {
  id: string;
  name: string;
  seller: string;
  sellerId: string;
  category: string;
  price: number;
  stock: number;
  status: 'pending_review' | 'approved' | 'rejected' | 'flagged';
  expiryDate: string;
  createdAt: string;
  reason?: string;
}

export interface Report {
  id: string;
  type: 'complaint' | 'fraud' | 'content';
  severity: 'low' | 'medium' | 'high' | 'critical';
  subject: string;
  description: string;
  reportedBy: string;
  reportedEntity: string;
  status: 'open' | 'investigating' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  target: string;
  details: string;
  timestamp: string;
  ip: string;
}

export interface DashboardKPI {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  totalOrders: number;
  pendingListings: number;
  openReports: number;
  flaggedContent: number;
  userGrowthPercent: number;
  revenueGrowthPercent: number;
}

export interface ChartDataPoint {
  name: string;
  revenue: number;
  users: number;
  uploads: number;
  messages: number;
}
