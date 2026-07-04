import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      initial={false}
      animate={{ width: isFocused ? '100%' : '100%', maxWidth: isFocused ? '600px' : '400px' }}
      className="relative flex items-center"
    >
      <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search inventory (e.g., Aspirin)..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full h-12 pl-12 pr-4 bg-card/50 backdrop-blur-md border border-border/50 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
      />
    </motion.div>
  );
}
