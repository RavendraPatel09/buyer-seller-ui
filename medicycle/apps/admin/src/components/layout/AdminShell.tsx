import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, Activity, Users, FileText, AlertTriangle, 
  ClipboardList, Menu, LogOut, Download, Search, Command
} from "lucide-react";
import { cn } from "@medicycle/utils";
import { Button } from "@medicycle/ui";
import { ThemeToggleWrapped as ThemeToggle } from "./ThemeToggleWrapper";
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
  const [searchFocused, setSearchFocused] = useState(false);
  const location = useLocation();
  const { user, clearAuth } = useAdminAuth();

  const handleLogout = async () => {
    await authService.logout();
    clearAuth();
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-background border-r border-border/50">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-border/50">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="w-6 h-6 rounded-md bg-destructive/10 border border-destructive/20 flex items-center justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-destructive" />
          </div>
          <span className="font-display font-bold text-sm tracking-tight">MediCycle</span>
          <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-destructive/10 text-destructive uppercase tracking-widest border border-destructive/20">
            Admin
          </span>
        </Link>
      </div>
      
      {/* Nav */}
      <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-mono font-medium text-muted-foreground uppercase tracking-widest mb-4 px-3">
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
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative text-sm font-medium",
                isActive 
                  ? "text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-card border border-transparent hover:border-border/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="admin-sidebar-active"
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
      <div className="p-4 border-t border-border/50 space-y-3">
        {user && (
          <div className="px-3 py-2.5 bg-card border border-border/50 rounded-lg flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xs">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium truncate">{user.name}</div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{user.role.replace('_', ' ')}</div>
            </div>
          </div>
        )}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full group border border-transparent hover:border-destructive/20"
        >
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
            <h2 className="text-sm font-display font-bold tracking-tight hidden md:block text-muted-foreground">System Overview</h2>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Command Palette trigger */}
            <button
              onClick={() => setSearchFocused(!searchFocused)}
              className="hidden md:flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-card/50 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all w-64"
            >
              <Search className="w-4 h-4" />
              <span className="flex-1 text-left">Search records...</span>
              <kbd className="inline-flex h-5 items-center gap-0.5 rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground border border-border">
                <Command className="w-2.5 h-2.5" />K
              </kbd>
            </button>

            <ThemeToggle />
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
              <Download className="w-4 h-4" /> Export
            </Button>
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
