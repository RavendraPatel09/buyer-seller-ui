import * as React from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { cn } from "@medicycle/utils"

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  showProgress?: boolean
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, children, showProgress = true, ...props }, ref) => {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    })

    return (
      <nav
        ref={ref}
        className={cn(
          "flex items-center justify-between px-6 lg:px-10",
          "glass-panel border-x-0 border-t-0",
          "fixed top-0 w-full z-50",
          "h-20 lg:h-24", // Increased height
          "transition-all duration-300",
          className
        )}
        {...props}
      >
        {children}

        {/* Scroll Progress Indicator */}
        {showProgress && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left"
            style={{ scaleX }}
          />
        )}
      </nav>
    )
  }
)
Navbar.displayName = "Navbar"

export { Navbar }
