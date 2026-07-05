import * as React from "react"
import { motion, type HTMLMotionProps, AnimatePresence } from "framer-motion"
import { cn } from "@medicycle/utils"
import { Loader2 } from "lucide-react"

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "glass"
  size?: "default" | "sm" | "lg" | "icon"
  loading?: boolean
}

const spring = { type: "spring" as const, stiffness: 500, damping: 25 }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", loading, children, disabled, ...props }, ref) => {
    
    const variants: Record<string, string> = {
      default: "bg-primary text-primary-foreground shadow-glow-sm hover:shadow-glow active:shadow-none font-semibold relative overflow-hidden group",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-depth-1",
      outline: "border border-border/80 bg-background/50 backdrop-blur-md hover:bg-accent hover:border-primary/50 text-foreground shadow-sm",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
      ghost: "text-muted-foreground hover:text-foreground hover:bg-accent",
      link: "text-primary underline-offset-4 hover:underline",
      glass: "glass-panel hover:glass-panel-heavy hover:border-primary/30 text-foreground transition-all duration-300",
    }
    
    const sizes: Record<string, string> = {
      default: "h-11 px-6 py-2.5 text-[15px]",
      sm: "h-9 px-4 text-sm",
      lg: "h-14 px-10 text-base font-bold",
      icon: "h-11 w-11",
    }

    const isDisabled = disabled || loading

    return (
      <motion.button
        ref={ref as any}
        whileHover={isDisabled ? undefined : { scale: 1.02, y: -2 }}
        whileTap={isDisabled ? undefined : { scale: 0.96, y: 0 }}
        transition={spring}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-[14px] font-medium tracking-tight",
          "ring-offset-background transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "cursor-pointer select-none",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {variant === "default" && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-50 mix-blend-overlay pointer-events-none" />
        )}
        
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.span
              key="loader"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <Loader2 className="h-5 w-5 animate-spin" />
            </motion.span>
          ) : null}
        </AnimatePresence>
        <span className={cn("inline-flex items-center gap-2 relative z-10", loading && "opacity-0")}>
          {children as React.ReactNode}
        </span>
      </motion.button>
    )
  }
)
Button.displayName = "Button"

export { Button }
