import * as React from "react"
import { cn } from "@medicycle/utils"

export function LineChart({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full h-64 bg-card rounded-xl border p-4 flex flex-col", className)}>
      <div className="mb-4">
        <h4 className="text-sm font-medium text-muted-foreground">Patient Activity</h4>
        <div className="text-2xl font-bold">12,453</div>
      </div>
      <div className="flex-1 relative w-full overflow-hidden mt-2">
        <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 L0,50 C50,60 100,20 150,30 C200,40 250,10 300,40 C350,70 400,20 400,20 L400,100 Z"
            fill="url(#gradient)"
          />
          <path
            d="M0,50 C50,60 100,20 150,30 C200,40 250,10 300,40 C350,70 400,20 400,20"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0px 0px 8px rgba(0, 229, 255, 0.5))' }}
          />
        </svg>
      </div>
    </div>
  )
}
