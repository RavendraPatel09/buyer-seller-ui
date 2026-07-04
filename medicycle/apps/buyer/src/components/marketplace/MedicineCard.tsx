import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import type { Medicine } from "../../lib/types/medicine";
import { Clock, ShieldCheck, Tag, Heart } from "lucide-react";

interface MedicineCardProps {
  medicine: Medicine;
  layout?: "grid" | "list";
}

export function MedicineCard({ medicine, layout = "grid" }: MedicineCardProps) {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useMotionTemplate`${springY}deg`;
  const rotateY = useMotionTemplate`${springX}deg`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || layout === "list") return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width - 0.5) * 15;
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
      onClick={() => navigate(`/marketplace/${medicine.id}`)}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent perspective-1000 group cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl rounded-3xl" />
      
      <div className="relative bg-card backdrop-blur-xl border border-white/5 rounded-2xl h-full flex flex-col overflow-hidden shadow-xl" style={{ transform: 'translateZ(30px)' }}>
        
        {/* Image Section */}
        <div className="h-48 w-full relative overflow-hidden bg-muted">
          <img src={medicine.imageUrl} alt={medicine.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {medicine.originalPrice && (
              <span className="bg-destructive/90 text-destructive-foreground px-2 py-1 rounded-md text-xs font-bold shadow-sm flex items-center">
                <Tag className="w-3 h-3 mr-1" /> Sale
              </span>
            )}
            {medicine.seller.isVerified && (
              <span className="bg-primary/90 text-primary-foreground px-2 py-1 rounded-md text-xs font-bold shadow-sm flex items-center">
                <ShieldCheck className="w-3 h-3 mr-1" /> Verified
              </span>
            )}
          </div>
          
          {/* Wishlist Button */}
          <button className="absolute top-4 right-4 p-2 bg-background/50 backdrop-blur-md rounded-full text-muted-foreground hover:text-red-500 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">{medicine.category}</div>
          <h3 className="text-xl font-bold text-foreground mb-1 line-clamp-1">{medicine.name}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{medicine.description}</p>
          
          <div className="mt-auto space-y-4">
            {/* Price & Stock */}
            <div className="flex justify-between items-end">
              <div>
                {medicine.originalPrice && (
                  <div className="text-xs text-muted-foreground line-through">${medicine.originalPrice}</div>
                )}
                <div className="text-2xl font-black text-foreground">${medicine.price}</div>
              </div>
              <div className="text-right">
                {isOutOfStock ? (
                  <span className="text-destructive font-semibold text-sm">Out of Stock</span>
                ) : isLowStock ? (
                  <span className="text-yellow-500 font-semibold text-sm">Only {medicine.stock} left!</span>
                ) : (
                  <span className="text-green-500 font-semibold text-sm">In Stock</span>
                )}
              </div>
            </div>
            
            {/* Meta */}
            <div className="pt-4 border-t border-border/50 flex justify-between items-center text-xs text-muted-foreground">
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" /> Exp: {new Date(medicine.expiryDate).toLocaleDateString()}
              </span>
              <span>By {medicine.seller.name}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
