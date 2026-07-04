import { Search, Pin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useSocket } from "../../lib/socket/SocketContext";
import { cn } from "../../design-system/utils/cn";

export function ChatSidebar() {
  const { conversations, activeConversationId, setActiveConversationId, isTyping } = useSocket();

  return (
    <div className="w-full md:w-80 border-r border-border/50 bg-background flex flex-col h-[calc(100vh-4rem)]">
      <div className="p-4 border-b border-border/50">
        <h2 className="text-xl font-bold tracking-tight mb-4">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search chats..." 
            className="w-full bg-card/50 border border-border/50 rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {conversations.map((conv) => {
            const otherUser = conv.participants.find(p => p.id !== 'me') || conv.participants[0];
            const isActive = activeConversationId === conv.id;
            const typing = isTyping[conv.id];

            return (
              <motion.button
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={conv.id}
                onClick={() => setActiveConversationId(conv.id)}
                className={cn(
                  "w-full text-left p-4 border-b border-border/10 flex items-start space-x-3 hover:bg-muted/50 transition-colors relative",
                  isActive && "bg-muted"
                )}
              >
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />}
                
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {otherUser.name.charAt(0)}
                  </div>
                  {otherUser.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-semibold text-sm truncate flex items-center">
                      {otherUser.name}
                      {conv.isPinned && <Pin className="w-3 h-3 ml-1 text-muted-foreground" />}
                    </h4>
                    {conv.lastMessage && (
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">
                        {formatDistanceToNow(new Date(conv.lastMessage.timestamp), { addSuffix: true })}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground truncate pr-2">
                      {typing ? (
                        <span className="text-primary italic text-xs font-medium">typing...</span>
                      ) : conv.lastMessage?.type === 'OFFER' ? (
                        <span className="italic">Sent an offer</span>
                      ) : (
                        conv.lastMessage?.text || 'No messages yet'
                      )}
                    </p>
                    {conv.unreadCount > 0 && (
                      <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
