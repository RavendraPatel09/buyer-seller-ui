import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { marketplaceApi } from "../../lib/api/marketplace";
import { MainLayout } from "../../layouts/MainLayout";
import { SearchBar } from "../../components/marketplace/SearchBar";
import { CategoryChips } from "../../components/marketplace/CategoryChips";
import { FilterSidebar } from "../../components/marketplace/FilterSidebar";
import { MedicineCard } from "../../components/marketplace/MedicineCard";
import { Loader2, PackageOpen } from "lucide-react";
import { motion } from "framer-motion";

export function Marketplace() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("relevance");

  const { ref, inView } = useInView();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['medicines', debouncedSearch, category, sort],
    queryFn: ({ pageParam = 0 }) => 
      marketplaceApi.getMedicines({ cursor: pageParam, search: debouncedSearch, category, sort }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const medicines = data?.pages.flatMap(page => page.data) || [];
  const isEmpty = status === "success" && medicines.length === 0;

  return (
    <MainLayout>
      <div className="space-y-8 pb-12">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Marketplace</h1>
            <p className="text-muted-foreground mt-2 max-w-md">Procure verified pharmaceutical supplies with zero friction.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full md:w-80"
          >
            <SearchBar value={search} onChange={setSearch} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
        >
          <CategoryChips selected={category} onSelect={setCategory} />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 pt-4">
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
            className="lg:w-64 shrink-0"
          >
            <FilterSidebar sort={sort} onSortChange={setSort} />
          </motion.div>

          {/* Main Grid */}
          <div className="flex-1 min-w-0">
            {status === "pending" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-[380px] rounded-2xl bg-card border border-border/50 animate-pulse relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                  </div>
                ))}
              </div>
            ) : isEmpty ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-border rounded-2xl bg-card/20"
              >
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-6">
                  <PackageOpen className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">No items found</h3>
                <p className="text-muted-foreground max-w-sm">Try adjusting your search criteria or removing some filters to see more results.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {medicines.map((medicine, index) => (
                  <MedicineCard key={medicine.id} medicine={medicine} index={index} />
                ))}
              </div>
            )}

            {/* Infinite Scroll Trigger */}
            <div ref={ref} className="h-24 flex items-center justify-center mt-8">
              {isFetchingNextPage && (
                <div className="flex items-center gap-3 text-muted-foreground font-medium text-sm">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  Loading more...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
