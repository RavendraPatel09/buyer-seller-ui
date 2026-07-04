import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Medicine } from "../../lib/types/medicine";
import { Clock, ShieldCheck, Tag, Heart } from "lucide-react";
import { Card } from "@medicycle/ui";

interface MedicineCardProps {
  medicine: Medicine;
  index: number;
}

export function MedicineCard({ medicine, index }: MedicineCardProps) {
  const navigate = useNavigate();

  const isLowStock = medicine.stock > 0 && medicine.stock <= 10;
  const isOutOfStock = medicine.stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.05 }}
    >
      <Card 
        interactive 
        className="h-full flex flex-col group cursor-pointer border-border/60 hover:border-primary/30"
        onClick={() => navigate(`/marketplace/${medicine.id}`)}
      >
        {/* Image Section */}
        <div className="h-48 w-full relative overflow-hidden bg-muted rounded-t-[11px]">
          <img 
            src={medicine.imageUrl} 
            alt={medicine.name} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {medicine.originalPrice && (
              <span className="bg-destructive text-destructive-foreground px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase shadow-sm flex items-center">
                <Tag className="w-3 h-3 mr-1" /> Sale
              </span>
            )}
            {medicine.seller.isVerified && (
              <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase shadow-sm flex items-center">
                <ShieldCheck className="w-3 h-3 mr-1" /> Verified
              </span>
            )}
          </div>
          
          {/* Wishlist Button */}
          <button 
            className="absolute top-3 right-3 p-2 bg-background/50 backdrop-blur-md rounded-full text-white/80 hover:text-white hover:bg-destructive/80 transition-all active:scale-95"
            onClick={(e) => {
              e.stopPropagation();
              // handle wishlist
            }}
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-medium text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-sm">
              {medicine.category}
            </span>
            <div className="text-right">
              {isOutOfStock ? (
                <span className="text-destructive font-mono text-[10px] font-bold uppercase tracking-wider">Out of Stock</span>
              ) : isLowStock ? (
                <span className="text-warning font-mono text-[10px] font-bold uppercase tracking-wider">Only {medicine.stock} left</span>
              ) : (
                <span className="text-emerald-500 font-mono text-[10px] font-bold uppercase tracking-wider">In Stock</span>
              )}
            </div>
          </div>
          
          <h3 className="text-lg font-display font-semibold text-foreground mb-1.5 line-clamp-1 group-hover:text-primary transition-colors">
            {medicine.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
            {medicine.description}
          </p>
          
          <div className="mt-auto space-y-4">
            <div className="flex items-end gap-2">
              <span className="font-mono text-2xl font-bold text-foreground leading-none">
                ${medicine.price.toFixed(2)}
              </span>
              {medicine.originalPrice && (
                <span className="font-mono text-sm text-muted-foreground line-through mb-0.5">
                  ${medicine.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Meta Footer */}
            <div className="pt-4 border-t border-border/50 flex justify-between items-center text-xs text-muted-foreground font-medium">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> 
                <span className="font-mono">{new Date(medicine.expiryDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
              </span>
              <span className="truncate ml-4">{medicine.seller.name}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
