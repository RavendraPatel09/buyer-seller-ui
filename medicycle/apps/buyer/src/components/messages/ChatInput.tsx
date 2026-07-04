import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, Paperclip, Mic, Send, Image as ImageIcon, FileText } from "lucide-react";
import Picker, { Theme } from "emoji-picker-react";
import { useSocket } from "../../lib/socket/SocketContext";

interface ChatInputProps {
  conversationId: string;
}

export function ChatInput({ conversationId }: ChatInputProps) {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttach, setShowAttach] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { sendMessage } = useSocket();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(conversationId, text);
    setText("");
    setShowEmoji(false);
  };

  const onEmojiClick = (emojiObject: any) => {
    setText(prev => prev + emojiObject.emoji);
  };

  return (
    <div className="p-4 bg-background border-t border-border/50">
      <AnimatePresence>
        {showEmoji && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-20 left-4 z-50 shadow-2xl"
          >
            <Picker onEmojiClick={onEmojiClick} theme={Theme.DARK} />
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSend} className="flex items-end gap-2 bg-card p-2 rounded-3xl border border-border/50 focus-within:border-primary/50 transition-colors shadow-sm relative">
        <div className="flex gap-1 shrink-0">
          <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-muted">
            <Smile className="w-5 h-5" />
          </button>
          <div className="relative">
            <button type="button" onClick={() => setShowAttach(!showAttach)} className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-muted">
              <Paperclip className="w-5 h-5" />
            </button>
            <AnimatePresence>
              {showAttach && (
                <motion.div initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 10 }} className="absolute bottom-12 left-0 bg-card border border-border/50 rounded-2xl shadow-xl p-2 flex flex-col gap-1 w-40 z-50">
                  <button type="button" className="flex items-center text-sm p-2 hover:bg-muted rounded-xl transition-colors"><ImageIcon className="w-4 h-4 mr-2 text-blue-500" /> Photo</button>
                  <button type="button" className="flex items-center text-sm p-2 hover:bg-muted rounded-xl transition-colors"><FileText className="w-4 h-4 mr-2 text-green-500" /> Document</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 px-2 py-2.5 text-sm"
        />

        <div className="shrink-0">
          {text.trim() ? (
            <button type="submit" className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-md">
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          ) : (
            <button type="button" className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-muted">
              <Mic className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
