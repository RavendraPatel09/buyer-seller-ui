import { SlidersHorizontal, Check } from "lucide-react";
import { cn } from "@medicycle/utils";

interface FilterSidebarProps {
  sort: string;
  onSortChange: (sort: string) => void;
}

export function FilterSidebar({ sort, onSortChange }: FilterSidebarProps) {
  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
  ];

  return (
    <div className="w-full md:w-64 shrink-0 space-y-6">
      <div className="flex items-center space-x-2 pb-4 border-b border-border/50">
        <SlidersHorizontal className="h-5 w-5" />
        <h2 className="font-semibold text-lg">Filters</h2>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Sort By</h3>
        <div className="space-y-2">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onSortChange(opt.value)}
              className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-muted transition-colors text-sm"
            >
              <span className={cn(sort === opt.value ? "font-semibold text-primary" : "text-foreground")}>
                {opt.label}
              </span>
              {sort === opt.value && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Availability</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm cursor-pointer">
            <input type="checkbox" className="rounded border-border bg-background text-primary focus:ring-primary h-4 w-4" />
            <span>In Stock Only</span>
          </label>
          <label className="flex items-center space-x-2 text-sm cursor-pointer">
            <input type="checkbox" className="rounded border-border bg-background text-primary focus:ring-primary h-4 w-4" />
            <span>Verified Sellers Only</span>
          </label>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Price Range</h3>
        <div className="flex items-center space-x-2">
          <input type="number" placeholder="Min" className="w-full h-10 px-3 bg-card border border-border/50 rounded-lg text-sm focus:ring-primary focus:border-transparent outline-none" />
          <span>-</span>
          <input type="number" placeholder="Max" className="w-full h-10 px-3 bg-card border border-border/50 rounded-lg text-sm focus:ring-primary focus:border-transparent outline-none" />
        </div>
      </div>
    </div>
  );
}
