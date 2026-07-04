import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@medicycle/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const spring = { type: "spring" as const, stiffness: 500, damping: 25 }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const inputId = id || React.useId()

    return (
      <div className="relative w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium mb-2 transition-colors duration-150",
              isFocused ? "text-primary" : "text-muted-foreground"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className={cn(
              "absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-150",
              isFocused ? "text-primary" : "text-muted-foreground"
            )}>
              {icon}
            </div>
          )}
          <motion.input
            id={inputId}
            type={type}
            ref={ref}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            animate={error ? { x: [0, -6, 6, -6, 6, 0] } : {}}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={cn(
              "flex h-12 w-full rounded-lg px-4 py-2 text-sm font-medium",
              "bg-card border border-border",
              "text-foreground placeholder:text-muted-foreground/60",
              "shadow-depth-1",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50",
              "focus:shadow-glow-sm",
              "disabled:cursor-not-allowed disabled:opacity-40",
              icon && "pl-10",
              error && "border-destructive focus:ring-destructive/30 focus:border-destructive/50",
              className
            )}
            {...props}
          />
          {/* Focus line indicator */}
          <motion.div
            className="absolute bottom-0 left-1/2 h-[2px] bg-primary rounded-full"
            initial={false}
            animate={{
              width: isFocused ? "calc(100% - 16px)" : "0%",
              x: isFocused ? "calc(-50% + 8px)" : "-50%",
              opacity: isFocused ? 1 : 0,
            }}
            transition={spring}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-destructive mt-1.5 font-medium"
          >
            {error}
          </motion.p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
