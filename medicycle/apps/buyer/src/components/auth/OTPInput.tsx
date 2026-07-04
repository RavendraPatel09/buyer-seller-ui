import React, { useRef } from "react"
import { cn } from "../../design-system/utils/cn"

interface OTPInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
}

export function OTPInput({ length = 6, value, onChange }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value
    if (/[^0-9]/.test(val)) return // only numbers

    const newValue = value.split("")
    newValue[index] = val.slice(-1)
    const combined = newValue.join("")
    onChange(combined)

    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length)
    onChange(pastedData)
    if (pastedData.length > 0) {
      inputRefs.current[Math.min(pastedData.length, length - 1)]?.focus()
    }
  }

  return (
    <div className="flex space-x-2 justify-center" onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={cn(
            "w-12 h-14 text-center text-xl font-bold rounded-lg border bg-transparent",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent transition-all",
            value[index] ? "border-primary/50 shadow-glow" : "border-input"
          )}
        />
      ))}
    </div>
  )
}
