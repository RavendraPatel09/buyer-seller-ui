import axios from 'axios';
import type { Medicine, PaginatedResponse } from '../types/medicine';

export const api = axios.create({
  baseURL: '/api',
});

const generateMockMedicines = (count: number): Medicine[] => {
  const categories = ["Cardiology", "Neurology", "Oncology", "Pediatrics", "Dermatology", "General"];
  const manufacturers = ["PharmaCorp", "MediLife", "BioGen", "CureAll Inc."];
  
  return Array.from({ length: count }).map((_, i) => {
    const isDiscounted = Math.random() > 0.7;
    const price = Math.floor(Math.random() * 500) + 10;
    const daysToExpiry = Math.floor(Math.random() * 365) + 30;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + daysToExpiry);

    return {
      id: `med-${i}`,
      name: `Mock Medicine ${i + 1}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      manufacturer: manufacturers[Math.floor(Math.random() * manufacturers.length)],
      description: "Advanced formula for optimal clinical outcomes. Used extensively in modern treatments.",
      price: isDiscounted ? Math.floor(price * 0.8) : price,
      originalPrice: isDiscounted ? price : undefined,
      stock: Math.floor(Math.random() * 100),
      expiryDate: expiryDate.toISOString(),
      seller: {
        id: `seller-${i % 5}`,
        name: `Distributor ${i % 5}`,
        rating: 3.5 + Math.random() * 1.5,
        isVerified: Math.random() > 0.3,
      },
      imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
        "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80",
        "https://images.unsplash.com/photo-1550572017-edb7df006a8e?w=800&q=80"
      ],
      tags: Math.random() > 0.5 ? ["Prescription Required"] : ["OTC"],
      reviews: [
        {
          id: `rev-1-${i}`,
          authorName: "Dr. Sarah Smith",
          rating: 5,
          date: "2023-10-12",
          comment: "Excellent quality and reliable stock. Always arrives on time.",
          verifiedPurchase: true
        },
        {
          id: `rev-2-${i}`,
          authorName: "John D.",
          rating: 4,
          date: "2023-11-05",
          comment: "Good product, delivery took slightly longer than expected but acceptable.",
          verifiedPurchase: true
        }
      ]
    };
  });
};

const mockDB = generateMockMedicines(100);

// Mock Interceptor for Development
api.interceptors.request.use(async (config) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (config.url === '/medicines') {
    const pageParam = Number(config.params?.cursor || 0);
    const limit = Number(config.params?.limit || 12);
    const search = config.params?.search?.toLowerCase() || '';
    const category = config.params?.category;
    
    let filtered = mockDB.filter(med => 
      med.name.toLowerCase().includes(search) || 
      med.category.toLowerCase().includes(search)
    );

    if (category && category !== 'All') {
      filtered = filtered.filter(med => med.category === category);
    }

    const sort = config.params?.sort;
    if (sort === 'price_asc') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') filtered.sort((a, b) => b.price - a.price);

    const start = pageParam * limit;
    const end = start + limit;
    const data = filtered.slice(start, end);
    const nextCursor = end < filtered.length ? pageParam + 1 : undefined;

    config.adapter = async () => {
      return {
        data: { data, nextCursor, total: filtered.length } as PaginatedResponse<Medicine>,
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      } as any;
    };
    return config;
  }

  if (config.url?.startsWith('/medicines/') && !config.url.endsWith('/related')) {
    const id = config.url.split('/').pop();
    const medicine = mockDB.find(m => m.id === id);
    if (medicine) {
      config.adapter = async () => ({
        data: medicine,
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      } as any);
    } else {
      config.adapter = async () => ({
        data: { message: "Not found" },
        status: 404,
        statusText: 'Not Found',
        headers: {},
        config
      } as any);
    }
    return config;
  }

  if (config.url?.endsWith('/related')) {
    const id = config.url.split('/')[2];
    const currentMed = mockDB.find(m => m.id === id);
    let related = mockDB.filter(m => m.id !== id && m.category === currentMed?.category).slice(0, 3);
    if (related.length === 0) {
      related = mockDB.filter(m => m.id !== id).slice(0, 3);
    }
    config.adapter = async () => ({
      data: related,
      status: 200,
      statusText: 'OK',
      headers: {},
      config
    } as any);
    return config;
  }

  return config;
});

export const marketplaceApi = {
  getMedicines: async (params: { cursor?: number, limit?: number, search?: string, category?: string, sort?: string }) => {
    const response = await api.get<PaginatedResponse<Medicine>>('/medicines', { params });
    return response.data;
  },
  getMedicineById: async (id: string) => {
    const response = await api.get<Medicine>(`/medicines/${id}`);
    return response.data;
  },
  getRelatedMedicines: async (id: string) => {
    const response = await api.get<Medicine[]>(`/medicines/${id}/related`);
    return response.data;
  }
};
