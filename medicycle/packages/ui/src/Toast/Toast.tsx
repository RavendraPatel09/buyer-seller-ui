import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@medicycle/utils"
import { X } from "lucide-react"

export interface ToastProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "destructive" | "success" | "glass"
  title?: string
  description?: string
  onClose?: () => void
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = "default", title, description, onClose, ...props }, ref) => {
    const variants = {
      default: "bg-background text-foreground border-border",
      destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
      success: "border-green-500 bg-green-500/10 text-green-500",
      glass: "glass-panel text-foreground",
    }
    
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={cn(
          "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
          variants[variant],
          className
        )}
        {...props}
      >
        <div className="flex flex-col space-y-1">
          {title && <div className="text-sm font-semibold">{title}</div>}
          {description && <div className="text-sm opacity-90">{description}</div>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </motion.div>
    )
  }
)
Toast.displayName = "Toast"

export { Toast }
