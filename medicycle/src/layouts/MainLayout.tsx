import { type ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { HeartPulse, Search, Bell, ShoppingCart, User, Home, Package, Activity } from "lucide-react"
import { cn } from "../design-system/utils/cn"

export function MainLayout({ children }: { children: ReactNode }) {
  const location = useLocation()
  
  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Package, label: "Marketplace", href: "/marketplace" },
    { icon: Activity, label: "Analytics", href: "/analytics" },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/30">
      {/* Top Navbar */}
      <header className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-md fixed top-0 w-full z-50 px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
          <HeartPulse className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">MediCycle</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  location.pathname === item.href 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4 border-l border-border/50 pl-6">
            <button className="text-muted-foreground hover:text-foreground transition-colors"><Search className="h-5 w-5" /></button>
            <button className="text-muted-foreground hover:text-foreground transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-destructive rounded-full" />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center rounded-full">3</span>
            </button>
            <button className="h-8 w-8 rounded-full bg-muted flex items-center justify-center border border-border/50 hover:border-primary transition-colors">
              <User className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 mt-16 p-6 md:p-10 max-w-[1600px] mx-auto w-full">
        {children}
      </main>
    </div>
  )
}
