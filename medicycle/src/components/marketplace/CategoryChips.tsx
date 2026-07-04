import { cn } from "../../design-system/utils/cn";

const categories = ["All", "Cardiology", "Neurology", "Oncology", "Pediatrics", "Dermatology", "General"];

interface CategoryChipsProps {
  selected: string;
  onSelect: (cat: string) => void;
}

export function CategoryChips({ selected, onSelect }: CategoryChipsProps) {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border",
            selected === cat 
              ? "bg-primary text-primary-foreground border-primary shadow-glow" 
              : "bg-card/50 border-border/50 hover:border-primary/50 text-muted-foreground hover:text-foreground"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
