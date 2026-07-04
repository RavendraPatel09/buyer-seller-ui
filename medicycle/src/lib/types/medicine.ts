export interface Seller {
  id: string;
  name: string;
  rating: number;
  isVerified: boolean;
}

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Medicine {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  expiryDate: string;
  seller: Seller;
  imageUrl: string;
  galleryImages?: string[];
  tags: string[];
  reviews?: Review[];
}

export interface PaginatedResponse<T> {
  data: T[];
  nextCursor?: number;
  total: number;
}
