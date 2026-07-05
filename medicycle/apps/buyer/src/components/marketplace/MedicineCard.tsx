import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import type { Medicine } from "../../lib/types/medicine";
import { Clock, ShieldCheck, Tag, Heart, ShoppingBag } from "lucide-react";
import { Card, Button } from "@medicycle/ui";

interface MedicineCardProps {
  medicine: Medicine;
  index: number;
}

export function MedicineCard({ medicine, index }: MedicineCardProps) {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useMotionTemplate`${springY}deg`;
  const rotateY = useMotionTemplate`${springX}deg`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width - 0.5) * 15; // Max 7.5 deg tilt
    const yPct = (mouseY / height - 0.5) * -15;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isLowStock = medicine.stock > 0 && medicine.stock <= 10;
  const isOutOfStock = medicine.stock === 0;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.05 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="perspective-1000"
    >
      <Card 
        glass
        interactive
        className="h-full flex flex-col group cursor-pointer border-border/60"
        onClick={() => navigate(`/marketplace/${medicine.id}`)}
      >
        <div style={{ transform: "translateZ(30px)" }} className="relative flex flex-col h-full">
          {/* Image Section */}
          <div className="h-56 w-full relative overflow-hidden bg-muted rounded-t-[23px]">
            <img 
              src={medicine.imageUrl} 
              alt={medicine.name} 
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2" style={{ transform: "translateZ(40px)" }}>
              {medicine.originalPrice && (
                <span className="bg-destructive/90 text-destructive-foreground px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase shadow-sm flex items-center backdrop-blur-md">
                  <Tag className="w-3.5 h-3.5 mr-1" /> Sale
                </span>
              )}
              {medicine.seller.isVerified && (
                <span className="bg-primary/90 text-primary-foreground px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase shadow-sm flex items-center backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified
                </span>
              )}
            </div>
            
            {/* Wishlist Button */}
            <button 
              className="absolute top-4 right-4 p-2.5 bg-background/40 backdrop-blur-md rounded-full text-white/90 hover:text-white hover:bg-destructive transition-all active:scale-95 border border-white/20 shadow-lg"
              style={{ transform: "translateZ(40px)" }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>

          {/* Content Section */}
          <div className="p-6 flex-1 flex flex-col" style={{ transform: "translateZ(20px)" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono font-semibold text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20">
                {medicine.category}
              </span>
              <div className="text-right flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full animate-pulse ${isOutOfStock ? 'bg-destructive' : isLowStock ? 'bg-warning' : 'bg-primary'}`} />
                {isOutOfStock ? (
                  <span className="text-destructive font-mono text-[10px] font-bold uppercase tracking-wider">Out of Stock</span>
                ) : isLowStock ? (
                  <span className="text-warning font-mono text-[10px] font-bold uppercase tracking-wider">{medicine.stock} left</span>
                ) : (
                  <span className="text-primary font-mono text-[10px] font-bold uppercase tracking-wider">In Stock</span>
                )}
              </div>
            </div>
            
            <h3 className="text-xl font-display font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
              {medicine.name}
            </h3>
            <p className="text-[14px] text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
              {medicine.description}
            </p>
            
            <div className="mt-auto space-y-5">
              <div className="flex items-end justify-between">
                <div className="flex items-end gap-2">
                  <span className="font-mono text-3xl font-bold text-foreground leading-none">
                    ${medicine.price.toFixed(2)}
                  </span>
                  {medicine.originalPrice && (
                    <span className="font-mono text-sm text-muted-foreground line-through mb-1">
                      ${medicine.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                
                {/* Quick Action */}
                <Button 
                  size="icon" 
                  variant="glass" 
                  className="rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <ShoppingBag className="w-4 h-4 text-primary" />
                </Button>
              </div>
              
              {/* Meta Footer */}
              <div className="pt-4 border-t border-border/50 flex justify-between items-center text-[12px] text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> 
                  <span className="font-mono">{new Date(medicine.expiryDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                </span>
                <span className="truncate ml-4 flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[8px] font-bold text-primary">
                    {medicine.seller.name.charAt(0)}
                  </span>
                  {medicine.seller.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
