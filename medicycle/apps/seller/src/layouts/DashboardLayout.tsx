import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  MessageSquare, 
  Settings, 
  Bell, 
  Search,
  Menu,
  LogOut,
  Command
} from "lucide-react";
import { cn } from "@medicycle/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Inventory", path: "/dashboard/inventory", icon: Package },
  { name: "Orders", path: "/dashboard/orders", icon: ShoppingCart },
  { name: "Messages", path: "/messages", icon: MessageSquare },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const location = useLocation();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-background border-r border-border/50">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-border/50">
        <Link to="/dashboard" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="w-6 h-6 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L10 5H14L11 8L12 12L8 10L4 12L5 8L2 5H6L8 1Z" fill="currentColor" className="text-primary" />
            </svg>
          </div>
          <span className="font-display font-bold text-sm tracking-tight">MediCycle</span>
          <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-muted text-muted-foreground uppercase tracking-widest border border-border/50">
            Seller
          </span>
        </Link>
      </div>
      
      {/* Nav */}
      <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-mono font-medium text-muted-foreground uppercase tracking-widest mb-4 px-3">
          Main Menu
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = item.path === '/dashboard' 
            ? location.pathname === '/dashboard' 
            : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative text-sm font-medium",
                isActive 
                  ? "text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-card border border-transparent hover:border-border/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-primary rounded-lg shadow-glow-sm"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={cn("w-4 h-4 relative z-10", isActive && "text-primary-foreground")} />
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer Nav */}
      <div className="p-4 border-t border-border/50">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full group">
          <LogOut className="w-4 h-4 group-hover:text-destructive transition-colors" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex selection:bg-primary/30">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[260px] h-screen sticky top-0 shrink-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[260px] z-50 lg:hidden shadow-2xl border-r border-border"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-background/80 backdrop-blur-xl backdrop-saturate-150 border-b border-border/50 sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-card border border-transparent hover:border-border transition-all"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Command Palette trigger */}
            <button
              onClick={() => setSearchFocused(!searchFocused)}
              className="hidden md:flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-card/50 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all w-64"
            >
              <Search className="w-4 h-4" />
              <span className="flex-1 text-left">Search everything...</span>
              <kbd className="inline-flex h-5 items-center gap-0.5 rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground border border-border">
                <Command className="w-2.5 h-2.5" />K
              </kbd>
            </button>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
            <button className="relative w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card border border-transparent hover:border-border transition-all">
              <Bell className="w-4 h-4" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-primary rounded-full"
              />
            </button>
            <div className="w-8 h-8 ml-2 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-mono font-bold text-xs text-primary shadow-sm cursor-pointer hover:bg-primary/20 transition-colors">
              SP
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
