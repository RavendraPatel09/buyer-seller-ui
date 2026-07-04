import { ShieldCheck, MessageCircle, Star } from "lucide-react";
import type { Seller } from "../../lib/types/medicine";
import { Button } from "../../design-system/components/Button/Button";

interface SellerCardProps {
  seller: Seller;
}

export function SellerCard({ seller }: SellerCardProps) {
  return (
    <div className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-primary font-bold text-lg">{seller.name.charAt(0)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">{seller.name}</h4>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span>{seller.rating.toFixed(1)} Rating</span>
          </div>
        </div>
        {seller.isVerified && (
          <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
        )}
      </div>
      
      <Button variant="outline" className="w-full" onClick={() => alert("Opening chat...")}>
        <MessageCircle className="w-4 h-4 mr-2" /> Chat with Seller
      </Button>
    </div>
  );
}
