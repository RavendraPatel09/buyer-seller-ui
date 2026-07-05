import * as React from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@medicycle/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean
  interactive?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass, interactive, children, ...props }, ref) => {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
    const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })
    const spotlight = useMotionTemplate`radial-gradient(400px circle at ${springX}px ${springY}px, rgba(var(--glow-rgb), 0.12), transparent 80%)`

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive) return
      const rect = e.currentTarget.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      mouseX.set(e.currentTarget.offsetWidth / 2)
      mouseY.set(e.currentTarget.offsetHeight / 2)
    }

    const baseClasses = cn(
      "relative overflow-hidden rounded-[24px] border border-border bg-card text-card-foreground shadow-premium",
      glass && "glass-panel bg-transparent",
      className
    )

    if (interactive) {
      return (
        <motion.div
          ref={ref as any}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.03, y: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={cn(
            baseClasses,
            "transition-colors duration-200 hover:border-primary/40 hover:glow-sm group"
          )}
          {...props}
        >
          {/* Internal Glass Reflection */}
          <div className="absolute inset-0 rounded-[24px] pointer-events-none border border-white/5 z-20 mix-blend-overlay" />
          
          {/* Cursor-tracking spotlight */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: spotlight }}
          />
          <div className="relative z-10 h-full">{children}</div>
        </motion.div>
      )
    }

    return (
      <div
        ref={ref}
        className={baseClasses}
        {...props}
      >
        {/* Internal Glass Reflection */}
        <div className="absolute inset-0 rounded-[24px] pointer-events-none border border-white/5 z-20 mix-blend-overlay" />
        <div className="relative z-10 h-full">{children}</div>
      </div>
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6 lg:p-8", className)} {...props} />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-xl font-display font-bold leading-tight tracking-tight", className)} {...props} />
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-[15px] leading-relaxed text-muted-foreground", className)} {...props} />
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 lg:p-8 pt-0 lg:pt-0", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 lg:p-8 pt-0 lg:pt-0", className)} {...props} />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
