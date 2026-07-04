import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@medicycle/utils"

const Navbar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    const { scrollY } = useScroll()
    const height = useTransform(scrollY, [0, 80], [72, 56])
    const bgOpacity = useTransform(scrollY, [0, 80], [0.5, 0.85])
    const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.5])

    return (
      <motion.nav
        ref={ref}
        style={{
          height,
          backgroundColor: `hsl(var(--background) / ${bgOpacity.get()})`,
        }}
        className={cn(
          "flex items-center justify-between px-6 lg:px-8",
          "backdrop-blur-xl backdrop-saturate-150",
          "fixed top-0 w-full z-50",
          "transition-shadow duration-300",
          className
        )}
        {...props}
      >
        {/* Hairline border that fades in on scroll */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-border"
          style={{ opacity: borderOpacity }}
        />
        {children}
      </motion.nav>
    )
  }
)
Navbar.displayName = "Navbar"

export { Navbar }
