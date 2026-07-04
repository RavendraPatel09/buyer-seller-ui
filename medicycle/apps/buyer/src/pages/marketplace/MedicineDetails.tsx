import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { marketplaceApi } from "../../lib/api/marketplace";
import { MainLayout } from "../../layouts/MainLayout";
import { ImageGallery } from "../../components/marketplace/ImageGallery";
import { SellerCard } from "../../components/marketplace/SellerCard";
import { AnimatedTabs } from "../../components/marketplace/AnimatedTabs";
import { ReviewList } from "../../components/marketplace/ReviewList";
import { MedicineCard } from "../../components/marketplace/MedicineCard";
import { Button } from "../../design-system/components/Button/Button";
import { ArrowLeft, Heart, ShoppingCart, Clock, ShieldCheck, Tag } from "lucide-react";

export function MedicineDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: medicine, isLoading } = useQuery({
    queryKey: ['medicine', id],
    queryFn: () => marketplaceApi.getMedicineById(id!),
    enabled: !!id,
  });

  const { data: relatedMedicines } = useQuery({
    queryKey: ['relatedMedicines', id],
    queryFn: () => marketplaceApi.getRelatedMedicines(id!),
    enabled: !!id,
  });

  if (isLoading || !medicine) {
    return (
      <MainLayout>
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-32 bg-card rounded-md" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-card rounded-3xl" />
            <div className="space-y-6">
              <div className="h-10 w-2/3 bg-card rounded-md" />
              <div className="h-4 w-full bg-card rounded-md" />
              <div className="h-24 w-full bg-card rounded-2xl" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  const isLowStock = medicine.stock > 0 && medicine.stock <= 10;
  const isOutOfStock = medicine.stock === 0;

  const tabs = [
    {
      id: "description",
      label: "Description",
      content: (
        <div className="text-foreground/80 leading-relaxed space-y-4">
          <p>{medicine.description}</p>
          <p>Carefully formulated by <strong>{medicine.manufacturer}</strong> to ensure maximum efficacy. Always consult with a healthcare professional before beginning any new treatment.</p>
        </div>
      )
    },
    {
      id: "specifications",
      label: "Specifications",
      content: (
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-muted-foreground">Manufacturer</div>
          <div className="font-medium">{medicine.manufacturer}</div>
          <div className="text-muted-foreground">Category</div>
          <div className="font-medium">{medicine.category}</div>
          <div className="text-muted-foreground">Expiry Date</div>
          <div className="font-medium">{new Date(medicine.expiryDate).toLocaleDateString()}</div>
          <div className="text-muted-foreground">Tags</div>
          <div className="font-medium flex gap-2 flex-wrap">
            {medicine.tags.map(t => <span key={t} className="bg-muted px-2 py-1 rounded-md text-xs">{t}</span>)}
          </div>
        </div>
      )
    },
    {
      id: "reviews",
      label: `Reviews (${medicine.reviews?.length || 0})`,
      content: <ReviewList reviews={medicine.reviews || []} />
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-8 pb-16">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Marketplace
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Images */}
          <div>
            <ImageGallery images={medicine.galleryImages || [medicine.imageUrl]} />
          </div>

          {/* Right Column: Info & Actions */}
          <div className="flex flex-col space-y-8">
            <div>
              <div className="text-sm font-bold text-primary uppercase tracking-widest mb-2">{medicine.category}</div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">{medicine.name}</h1>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {medicine.originalPrice && (
                  <span className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-xs font-bold flex items-center">
                    <Tag className="w-3 h-3 mr-1" /> Sale
                  </span>
                )}
                {medicine.tags.map(tag => (
                  <span key={tag} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-end gap-4 mb-6">
                <div className="text-5xl font-black">${medicine.price}</div>
                {medicine.originalPrice && (
                  <div className="text-xl text-muted-foreground line-through mb-1">${medicine.originalPrice}</div>
                )}
              </div>

              <p className="text-muted-foreground text-lg mb-8">
                {medicine.description}
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button className="flex-1 text-lg py-6" disabled={isOutOfStock}>
                    <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                  </Button>
                  <Button variant="outline" className="px-6">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="text-center text-sm">
                  {isOutOfStock ? (
                    <span className="text-destructive font-bold flex items-center justify-center">
                      <Clock className="w-4 h-4 mr-1" /> Out of Stock
                    </span>
                  ) : isLowStock ? (
                    <span className="text-yellow-500 font-bold flex items-center justify-center">
                      <Clock className="w-4 h-4 mr-1" /> Hurry, only {medicine.stock} left in stock!
                    </span>
                  ) : (
                    <span className="text-green-500 font-bold flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 mr-1" /> In Stock and ready to ship
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-border/50 pt-8">
              <h3 className="font-semibold text-lg mb-4">Sold By</h3>
              <SellerCard seller={medicine.seller} />
            </div>

            <div className="border-t border-border/50 pt-8 flex-1">
              <AnimatedTabs tabs={tabs} />
            </div>
          </div>
        </div>

        {/* Related Medicines */}
        {relatedMedicines && relatedMedicines.length > 0 && (
          <div className="pt-16 border-t border-border/50">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Similar Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedMedicines.map((med) => (
                <MedicineCard key={med.id} medicine={med} />
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
