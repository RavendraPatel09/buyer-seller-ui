import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, Activity, Users, FileText, AlertTriangle, 
  ClipboardList, Menu, LogOut, Download
} from "lucide-react";
import { cn } from "../../../design-system/utils/cn";
import { Button } from "../../../design-system/components/Button/Button";
import { ThemeToggle } from "../../../components/common/ThemeToggle";
import { useAdminAuth } from "../../store/authStore";
import { authService } from "../../api/adminService";

interface AdminShellProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { name: "Dashboard", path: "/", icon: Activity },
  { name: "Users", path: "/users", icon: Users },
  { name: "Medicines", path: "/medicines", icon: FileText },
  { name: "Reports & Fraud", path: "/reports", icon: AlertTriangle },
  { name: "Audit Log", path: "/audit", icon: ClipboardList },
];

export function AdminShell({ children }: AdminShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, clearAuth } = useAdminAuth();

  const handleLogout = async () => {
    await authService.logout();
    clearAuth();
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-background border-r border-border/50">
      {/* Branding */}
      <div className="p-6 flex items-center space-x-3 border-b border-border/30">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <ShieldCheck className="w-6 h-6 text-primary" />
        </div>
        <div>
          <span className="text-lg font-bold tracking-tight block leading-tight">MediCycle</span>
          <span className="text-[10px] font-semibold text-primary uppercase tracking-widest">Admin Console</span>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 px-3">
          Management
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = item.path === '/' 
            ? location.pathname === '/' 
            : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="admin-shell-active"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={cn("w-5 h-5 relative z-10", isActive && "fill-primary/20")} />
              <span className="font-medium text-sm relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* User & Logout */}
      <div className="p-4 border-t border-border/50 space-y-3">
        {user && (
          <div className="px-3 py-2 bg-muted/30 rounded-xl flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center font-bold text-primary text-xs">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium truncate">{user.name}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{user.role.replace('_', ' ')}</div>
            </div>
          </div>
        )}
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 shrink-0">
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
              className="fixed inset-y-0 left-0 w-72 z-50 lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 lg:h-20 bg-background/95 backdrop-blur-xl border-b border-border/50 sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center">
            <button 
              className="lg:hidden p-2 mr-4 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-bold tracking-tight hidden md:block">System Overview</h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button variant="outline" className="h-9 text-xs hidden sm:inline-flex">
              <Download className="w-4 h-4 mr-2" /> Export Reports
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
