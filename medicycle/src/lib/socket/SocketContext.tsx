import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { ChatMessage, Conversation, ChatUser } from '../types/chat';

// Mock Data
const MOCK_USERS: ChatUser[] = [
  { id: 'u1', name: 'Dr. Sarah Smith', isOnline: true },
  { id: 'u2', name: 'MediLife Supplies', isOnline: false, lastSeen: new Date(Date.now() - 3600000).toISOString() },
  { id: 'u3', name: 'PharmaCorp Inc.', isOnline: true },
];

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    participants: [MOCK_USERS[1]],
    unreadCount: 2,
    isPinned: true,
    updatedAt: new Date().toISOString(),
    lastMessage: {
      id: 'm1', conversationId: 'c1', senderId: 'u2', type: 'TEXT', status: 'DELIVERED',
      text: 'We can offer a 10% discount on bulk orders of Aspirin.',
      timestamp: new Date().toISOString()
    }
  },
  {
    id: 'c2',
    participants: [MOCK_USERS[2]],
    unreadCount: 0,
    isPinned: false,
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    lastMessage: {
      id: 'm2', conversationId: 'c2', senderId: 'me', type: 'TEXT', status: 'SEEN',
      text: 'Thank you. I will review the catalog.',
      timestamp: new Date(Date.now() - 86400000).toISOString()
    }
  }
];

const MOCK_MESSAGES: Record<string, ChatMessage[]> = {
  'c1': [
    {
      id: 'm0', conversationId: 'c1', senderId: 'me', type: 'TEXT', status: 'SEEN',
      text: 'Hi, are you open to negotiating the price for bulk Aspirin?',
      timestamp: new Date(Date.now() - 10000).toISOString()
    },
    {
      id: 'm1', conversationId: 'c1', senderId: 'u2', type: 'TEXT', status: 'DELIVERED',
      text: 'We can offer a 10% discount on bulk orders of Aspirin.',
      timestamp: new Date().toISOString()
    },
    {
      id: 'm_offer', conversationId: 'c1', senderId: 'u2', type: 'OFFER', status: 'DELIVERED',
      text: 'Offer received',
      timestamp: new Date().toISOString(),
      offerData: { medicineId: 'med-1', medicineName: 'Aspirin 500mg', proposedPrice: 45, originalPrice: 50, quantity: 100, status: 'PENDING' }
    }
  ],
  'c2': [
    {
      id: 'm2', conversationId: 'c2', senderId: 'me', type: 'TEXT', status: 'SEEN',
      text: 'Thank you. I will review the catalog.',
      timestamp: new Date(Date.now() - 86400000).toISOString()
    }
  ]
};

interface SocketContextType {
  conversations: Conversation[];
  messages: Record<string, ChatMessage[]>;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (conversationId: string, text: string, type?: ChatMessage['type'], offerData?: any) => void;
  markAsSeen: (conversationId: string) => void;
  isTyping: Record<string, boolean>; // conversationId -> isTyping
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(MOCK_MESSAGES);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState<Record<string, boolean>>({});

  const sendMessage = (conversationId: string, text: string, type: ChatMessage['type'] = 'TEXT', offerData?: any) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: 'me',
      text,
      type,
      status: 'SENT',
      timestamp: new Date().toISOString(),
      offerData
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMessage]
    }));

    setConversations(prev => prev.map(c => 
      c.id === conversationId ? { ...c, lastMessage: newMessage, updatedAt: newMessage.timestamp } : c
    ).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));

    // Simulate delivery and read receipts
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [conversationId]: prev[conversationId].map(m => m.id === newMessage.id ? { ...m, status: 'DELIVERED' } : m)
      }));
    }, 1000);

    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [conversationId]: prev[conversationId].map(m => m.id === newMessage.id ? { ...m, status: 'SEEN' } : m)
      }));
    }, 3000);
    
    // Simulate auto-reply from the other person
    setTimeout(() => {
      setIsTyping(prev => ({ ...prev, [conversationId]: true }));
      setTimeout(() => {
        setIsTyping(prev => ({ ...prev, [conversationId]: false }));
        const replyMsg: ChatMessage = {
          id: `reply-${Date.now()}`,
          conversationId,
          senderId: 'u2', // hardcoded to u2 for demo
          text: 'Thanks for reaching out! Let me check on that.',
          type: 'TEXT',
          status: 'DELIVERED',
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => ({
          ...prev,
          [conversationId]: [...(prev[conversationId] || []), replyMsg]
        }));
        setConversations(prev => prev.map(c => 
          c.id === conversationId ? { ...c, lastMessage: replyMsg, updatedAt: replyMsg.timestamp, unreadCount: activeConversationId === conversationId ? 0 : c.unreadCount + 1 } : c
        ).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
      }, 2000);
    }, 4000);
  };

  const markAsSeen = (conversationId: string) => {
    setConversations(prev => prev.map(c => 
      c.id === conversationId ? { ...c, unreadCount: 0 } : c
    ));
  };

  useEffect(() => {
    if (activeConversationId) {
      markAsSeen(activeConversationId);
    }
  }, [activeConversationId, messages]);

  return (
    <SocketContext.Provider value={{ conversations, messages, activeConversationId, setActiveConversationId, sendMessage, markAsSeen, isTyping }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
