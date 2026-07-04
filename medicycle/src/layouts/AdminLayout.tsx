import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  Users, 
  Activity, 
  FileText, 
  AlertTriangle,
  Menu,
  LogOut,
  Download
} from "lucide-react";
import { cn } from "../design-system/utils/cn";
import { Button } from "../design-system/components/Button/Button";
import { ThemeToggle } from "../components/common/ThemeToggle";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { name: "Dashboard", path: "/admin", icon: Activity },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Medicines", path: "/admin/medicines", icon: FileText },
  { name: "Fraud & Moderation", path: "/admin/fraud", icon: AlertTriangle },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-background border-r border-border/50">
      <div className="p-6 flex items-center space-x-3">
        <ShieldAlert className="w-8 h-8 text-primary" />
        <span className="text-xl font-bold tracking-tight">Admin Console</span>
      </div>
      
      <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
          Management
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = item.path === '/admin' 
            ? location.pathname === '/admin' 
            : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="admin-sidebar-active-bg"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={cn("w-5 h-5 relative z-10", isActive && "fill-primary/20")} />
              <span className="font-medium relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border/50">
        <button className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="hidden lg:block w-72 h-screen sticky top-0 shrink-0">
        <SidebarContent />
      </aside>

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
              className="fixed inset-y-0 left-0 w-72 z-50 lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 lg:h-20 bg-background/95 backdrop-blur-xl border-b border-border/50 sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center">
            <button 
              className="lg:hidden p-2 mr-4 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold tracking-tight hidden md:block">System Overview</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" className="h-9 text-xs">
              <Download className="w-4 h-4 mr-2" /> Export Reports
            </Button>
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center font-bold text-primary shadow-sm cursor-pointer">
              AD
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
