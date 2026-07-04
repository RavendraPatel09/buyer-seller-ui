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
      <div className="space-y-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Marketplace</h1>
            <p className="text-muted-foreground mt-1">Discover and procure medical supplies.</p>
          </div>
          <div className="w-full md:w-auto flex justify-end">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>

        <CategoryChips selected={category} onSelect={setCategory} />

        <div className="flex flex-col md:flex-row gap-8 pt-4">
          {/* Sidebar */}
          <FilterSidebar sort={sort} onSortChange={setSort} />

          {/* Main Grid */}
          <div className="flex-1 min-w-0">
            {status === "pending" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-[400px] rounded-3xl bg-card border border-border/50 animate-pulse" />
                ))}
              </div>
            ) : isEmpty ? (
              <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-border/50 rounded-3xl bg-card/20">
                <PackageOpen className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold">No items found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {medicines.map((medicine) => (
                  <MedicineCard key={medicine.id} medicine={medicine} />
                ))}
              </div>
            )}

            {/* Infinite Scroll Trigger */}
            <div ref={ref} className="h-20 flex items-center justify-center mt-8">
              {isFetchingNextPage && <Loader2 className="h-6 w-6 animate-spin text-primary" />}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
