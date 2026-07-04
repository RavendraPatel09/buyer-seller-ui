import { type ReactNode, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Search, Bell, ShoppingCart, User, Home, Package, Activity, Command } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@medicycle/utils"

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Package, label: "Marketplace", href: "/marketplace" },
  { icon: Activity, label: "Analytics", href: "/analytics" },
]

export function MainLayout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/30">
      {/* Top Navbar */}
      <header className="h-14 border-b border-border bg-background/80 backdrop-blur-xl backdrop-saturate-150 fixed top-0 w-full z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="w-6 h-6 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L10 5H14L11 8L12 12L8 10L4 12L5 8L2 5H6L8 1Z" fill="currentColor" className="text-primary" />
              </svg>
            </div>
            <span className="font-display font-bold text-sm">MediCycle</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "relative px-3 py-1.5 text-sm font-medium transition-colors rounded-md",
                    isActive 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-accent rounded-md"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Command palette hint */}
          <button
            onClick={() => setSearchFocused(!searchFocused)}
            className="hidden md:flex items-center gap-2 h-8 px-3 rounded-lg border border-border bg-card/50 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search...</span>
            <kbd className="hidden lg:inline-flex h-5 items-center gap-0.5 rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground border border-border">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </button>

          <div className="flex items-center gap-1 border-l border-border pl-3 ml-1">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors relative" aria-label="Notifications">
              <Bell className="w-4 h-4" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"
              />
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors relative" aria-label="Cart">
              <ShoppingCart className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-primary text-[9px] font-mono font-bold text-primary-foreground flex items-center justify-center rounded-full">
                3
              </span>
            </button>
            <button className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors" aria-label="Profile">
              <User className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mt-14 p-6 md:p-8 lg:p-10 max-w-[1400px] mx-auto w-full">
        {children}
      </main>
    </div>
  )
}
