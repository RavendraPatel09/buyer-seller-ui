// Shared types across the MediCycle ecosystem
export interface Medicine {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  seller: string;
  sellerId: string;
  stock: number;
  expiryDate: string;
  manufacturer: string;
  image: string;
  verified: boolean;
  rating: number;
  reviews: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'admin';
  avatar?: string;
}
