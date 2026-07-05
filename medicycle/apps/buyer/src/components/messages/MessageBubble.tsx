import { motion } from "framer-motion";
import { format } from "date-fns";
import { Check, CheckCheck } from "lucide-react";
import { cn } from "@medicycle/utils";
import type { ChatMessage } from "../../lib/types/chat";
import { OfferCard } from "./OfferCard";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isMe = message.senderId === 'me';
  const isOffer = message.type === 'OFFER';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn("flex w-full mt-4", isMe ? "justify-end" : "justify-start")}
    >
      <div className={cn("flex flex-col max-w-[75%]", isMe ? "items-end" : "items-start")}>
        
        {!isOffer ? (
          <div className={cn(
            "relative px-5 py-3 rounded-[20px] shadow-sm break-words border",
            isMe 
              ? "bg-primary text-primary-foreground rounded-br-sm border-primary/20 shadow-glow-sm" 
              : "glass-panel-sm border-white/10 text-foreground rounded-bl-sm"
          )}>
            <p className="text-[15px] leading-relaxed">{message.text}</p>
          </div>
        ) : (
          message.offerData && <OfferCard offer={message.offerData} isMe={isMe} />
        )}

        <div className={cn("flex items-center text-[11px] font-mono text-muted-foreground mt-2 space-x-1", isMe && "flex-row-reverse space-x-reverse")}>
          <span>{format(new Date(message.timestamp), "HH:mm")}</span>
          {isMe && (
            <span className="ml-1.5">
              {message.status === 'SENT' && <Check className="w-3.5 h-3.5 text-muted-foreground" />}
              {message.status === 'DELIVERED' && <CheckCheck className="w-3.5 h-3.5 text-muted-foreground" />}
              {message.status === 'SEEN' && <CheckCheck className="w-3.5 h-3.5 text-primary drop-shadow-[0_0_2px_rgba(var(--glow-rgb),0.5)]" />}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
