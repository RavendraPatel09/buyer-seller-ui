import { cn } from "../../design-system/utils/cn"

export function PasswordStrength({ password }: { password?: string }) {
  const p = password || ""
  
  let score = 0
  if (p.length >= 8) score++
  if (/[A-Z]/.test(p)) score++
  if (/[a-z]/.test(p)) score++
  if (/[0-9]/.test(p)) score++
  if (/[^A-Za-z0-9]/.test(p)) score++

  const getStrengthLabel = () => {
    if (score <= 1) return { label: "Weak", color: "bg-destructive text-destructive" }
    if (score <= 3) return { label: "Fair", color: "bg-yellow-500 text-yellow-500" }
    return { label: "Strong", color: "bg-green-500 text-green-500" }
  }

  const { label, color } = getStrengthLabel()

  return (
    <div className="space-y-1.5 mt-2">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-muted-foreground">Password strength</span>
        <span className={cn(p.length === 0 ? "text-transparent" : color.split(" ")[1])}>
          {label}
        </span>
      </div>
      <div className="flex space-x-1 h-1.5">
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className={cn(
              "flex-1 rounded-full transition-all duration-300",
              p.length > 0 && index <= score ? color.split(" ")[0] : "bg-muted"
            )}
          />
        ))}
      </div>
    </div>
  )
}
