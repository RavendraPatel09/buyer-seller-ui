import { useEffect, useRef } from "react";
import { format, isSameDay } from "date-fns";
import { Info, MoreVertical } from "lucide-react";
import { useSocket } from "../../lib/socket/SocketContext";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";

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
      <div className="flex-1 flex flex-col items-center justify-center bg-card/10 h-[calc(100vh-4rem)] hidden md:flex">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Info className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold">Your Messages</h3>
        <p className="text-muted-foreground">Select a conversation to start chatting.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-background relative w-full">
      {/* Header */}
      <div className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-md px-6 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
              {otherUser.name.charAt(0)}
            </div>
            {otherUser.isOnline && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />}
          </div>
          <div>
            <h3 className="font-semibold text-sm leading-none">{otherUser.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {typing ? <span className="text-primary font-medium italic">typing...</span> : otherUser.isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-muted transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6" ref={scrollRef}>
        {chatMessages.map((msg, idx) => {
          const prevMsg = chatMessages[idx - 1];
          const showDate = !prevMsg || !isSameDay(new Date(msg.timestamp), new Date(prevMsg.timestamp));

          return (
            <div key={msg.id}>
              {showDate && (
                <div className="flex justify-center my-6">
                  <span className="bg-muted text-muted-foreground text-xs font-medium px-3 py-1 rounded-full">
                    {format(new Date(msg.timestamp), "MMMM d, yyyy")}
                  </span>
                </div>
              )}
              <MessageBubble message={msg} />
            </div>
          );
        })}
        {typing && (
          <div className="flex mt-4 justify-start">
            <div className="bg-card border border-border/50 px-4 py-3 rounded-2xl rounded-bl-sm flex space-x-1 items-center h-[42px]">
              <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="shrink-0">
        <ChatInput conversationId={activeConversationId} />
      </div>
    </div>
  );
}
