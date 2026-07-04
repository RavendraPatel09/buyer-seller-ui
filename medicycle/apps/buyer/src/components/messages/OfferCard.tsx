import { Check, X, FileText } from "lucide-react";
import { Button } from "../../design-system/components/Button/Button";
import type { OfferData } from "../../lib/types/chat";

interface OfferCardProps {
  offer: OfferData;
  isMe: boolean;
}

export function OfferCard({ offer, isMe }: OfferCardProps) {
  return (
    <div className="bg-card/90 backdrop-blur-md rounded-2xl p-4 border border-border/50 shadow-sm w-full max-w-sm mt-2 text-foreground">
      <div className="flex items-center space-x-3 mb-4">
        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h4 className="font-semibold text-sm">Custom Offer</h4>
          <p className="text-xs text-muted-foreground">{offer.medicineName}</p>
        </div>
      </div>
      
      <div className="space-y-2 mb-4 bg-muted/50 p-3 rounded-xl text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Original Price:</span>
          <span className="line-through">${offer.originalPrice}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Proposed Price:</span>
          <span className="text-primary">${offer.proposedPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Quantity:</span>
          <span>{offer.quantity} units</span>
        </div>
        <div className="flex justify-between border-t border-border/50 pt-2 font-bold">
          <span>Total:</span>
          <span>${offer.proposedPrice * offer.quantity}</span>
        </div>
      </div>

      {!isMe && offer.status === 'PENDING' ? (
        <div className="flex space-x-2 mt-2">
          <Button variant="outline" className="flex-1 text-xs border-destructive text-destructive hover:bg-destructive hover:text-white h-9">
            <X className="w-4 h-4 mr-1" /> Decline
          </Button>
          <Button className="flex-1 text-xs h-9">
            <Check className="w-4 h-4 mr-1" /> Accept
          </Button>
        </div>
      ) : (
        <div className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-2 py-1 bg-muted rounded-md">
          {offer.status}
        </div>
      )}
    </div>
  );
}
