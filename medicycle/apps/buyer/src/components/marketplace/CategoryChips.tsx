import { motion } from "framer-motion";
import { cn } from "@medicycle/utils";

const categories = ["All", "Cardiology", "Neurology", "Oncology", "Pediatrics", "Dermatology", "General"];

interface CategoryChipsProps {
  selected: string;
  onSelect: (cat: string) => void;
}

export function CategoryChips({ selected, onSelect }: CategoryChipsProps) {
  return (
    <div className="flex items-center space-x-1.5 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
      {categories.map(cat => {
        const isSelected = selected === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={cn(
              "relative px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              isSelected 
                ? "text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground bg-card/30 hover:bg-card border border-border/50"
            )}
          >
            {isSelected && (
              <motion.div
                layoutId="category-chip"
                className="absolute inset-0 bg-primary rounded-full shadow-glow-sm"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        )
      })}
    </div>
  );
}
