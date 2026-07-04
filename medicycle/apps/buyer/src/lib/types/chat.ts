export type MessageStatus = 'SENT' | 'DELIVERED' | 'SEEN';

export type MessageType = 'TEXT' | 'IMAGE' | 'OFFER' | 'VOICE';

export interface OfferData {
  medicineId: string;
  medicineName: string;
  proposedPrice: number;
  originalPrice: number;
  quantity: number;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  type: MessageType;
  status: MessageStatus;
  timestamp: string; // ISO string
  mediaUrl?: string; // For images/voice
  offerData?: OfferData;
}

export interface ChatUser {
  id: string;
  name: string;
  avatarUrl?: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface Conversation {
  id: string;
  participants: ChatUser[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  isPinned: boolean;
  updatedAt: string;
}
