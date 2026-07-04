import * as React from "react"
import { motion, type HTMLMotionProps, AnimatePresence } from "framer-motion"
import { cn } from "@medicycle/utils"
import { Loader2 } from "lucide-react"

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "glass"
  size?: "default" | "sm" | "lg" | "icon"
  loading?: boolean
}

const spring = { type: "spring" as const, stiffness: 400, damping: 17 }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", loading, children, disabled, ...props }, ref) => {
    
    const variants: Record<string, string> = {
      default: "bg-primary text-primary-foreground shadow-glow-sm hover:shadow-glow active:shadow-none font-semibold",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-border bg-transparent hover:bg-accent hover:border-primary/30 text-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "text-muted-foreground hover:text-foreground hover:bg-accent",
      link: "text-primary underline-offset-4 hover:underline",
      glass: "glass-panel-sm text-foreground hover:bg-white/5 dark:hover:bg-white/10",
    }
    
    const sizes: Record<string, string> = {
      default: "h-10 px-5 py-2 text-sm",
      sm: "h-8 px-3.5 text-xs",
      lg: "h-12 px-8 text-base",
      icon: "h-10 w-10",
    }

    const isDisabled = disabled || loading

    return (
      <motion.button
        ref={ref}
        whileHover={isDisabled ? undefined : { scale: 1.02 }}
        whileTap={isDisabled ? undefined : { scale: 0.97 }}
        transition={spring}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-tight",
          "ring-offset-background transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-40",
          "cursor-pointer select-none",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.span
              key="loader"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
            </motion.span>
          ) : null}
        </AnimatePresence>
        <span className={cn("inline-flex items-center gap-2", loading && "invisible")}>
          {children as React.ReactNode}
        </span>
      </motion.button>
    )
  }
)
Button.displayName = "Button"

export { Button }
