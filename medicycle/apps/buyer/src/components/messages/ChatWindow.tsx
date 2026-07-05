import { useEffect, useRef } from "react";
import { format, isSameDay } from "date-fns";
import { Info, MoreVertical, Phone, Video } from "lucide-react";
import { useSocket } from "../../lib/socket/SocketContext";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { Button } from "@medicycle/ui";
import { motion } from "framer-motion";

export function ChatWindow() {
  const { activeConversationId, conversations, messages, isTyping } = useSocket();
  const scrollRef = useRef<HTMLDivElement>(null);

  const conversation = conversations.find(c => c.id === activeConversationId);
  const otherUser = conversation?.participants.find(p => p.id !== 'me') || conversation?.participants[0];
  const chatMessages = activeConversationId ? messages[activeConversationId] || [] : [];
  const typing = activeConversationId ? isTyping[activeConversationId] : false;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, typing]);

  if (!activeConversationId || !otherUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background/50 h-[calc(100vh-6rem)] hidden md:flex rounded-3xl m-4 border border-border/50 glass-panel">
        <div className="w-20 h-20 glass-panel rounded-full flex items-center justify-center mb-6 shadow-glow-sm">
          <Info className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl font-display font-bold">Encrypted Messaging</h3>
        <p className="text-muted-foreground mt-2 max-w-sm text-center">Select a conversation from the left to start collaborating securely.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-6rem)] m-4 rounded-3xl overflow-hidden glass-panel border border-border/50 shadow-premium relative w-full">
      {/* Header */}
      <div className="h-20 border-b border-border/50 bg-background/60 backdrop-blur-xl px-8 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-lg border border-primary/20 shadow-glow-sm">
              {otherUser.name.charAt(0)}
            </div>
            {otherUser.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" />}
          </div>
          <div>
            <h3 className="font-display font-bold text-lg leading-none mb-1">{otherUser.name}</h3>
            <p className="text-[13px] text-muted-foreground">
              {typing ? <motion.span initial={{opacity:0}} animate={{opacity:1}} className="text-primary font-medium italic">typing...</motion.span> : otherUser.isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
            <Video className="w-5 h-5" />
          </Button>
          <div className="w-px h-6 bg-border mx-2" />
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[radial-gradient(ellipse_at_center,rgba(var(--glow-rgb),0.02)_0%,transparent_100%)]" ref={scrollRef}>
        {chatMessages.map((msg, idx) => {
          const prevMsg = chatMessages[idx - 1];
          const showDate = !prevMsg || !isSameDay(new Date(msg.timestamp), new Date(prevMsg.timestamp));

          return (
            <div key={msg.id}>
              {showDate && (
                <div className="flex justify-center my-8">
                  <span className="glass-panel-sm text-muted-foreground text-xs font-medium px-4 py-1.5 rounded-full tracking-wide uppercase">
                    {format(new Date(msg.timestamp), "MMMM d, yyyy")}
                  </span>
                </div>
              )}
              <MessageBubble message={msg} />
            </div>
          );
        })}
        {typing && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex mt-4 justify-start">
            <div className="glass-panel-sm border border-white/10 px-5 py-4 rounded-[20px] rounded-bl-sm flex space-x-1.5 items-center">
              <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="shrink-0 bg-background/60 backdrop-blur-xl border-t border-border/50">
        <ChatInput conversationId={activeConversationId} />
      </div>
    </div>
  );
}
