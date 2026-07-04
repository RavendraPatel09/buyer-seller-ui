import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthLayout } from "../../layouts/AuthLayout"
import { OTPInput } from "../../components/auth/OTPInput"
import { Button } from "../../design-system/components/Button/Button"
import { Loader2, QrCode } from "lucide-react"

export function Setup2FA() {
  const [isLoading, setIsLoading] = useState(false)
  const [otp, setOtp] = useState("")
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    navigate("/verify-otp")
  }

  return (
    <AuthLayout title="Secure your account" subtitle="Set up Two-Factor Authentication (2FA) for added security.">
      <div className="space-y-6">
        <div className="flex justify-center py-4">
          <div className="p-4 bg-white rounded-xl shadow-lg border border-border/10">
            <QrCode className="w-48 h-48 text-black" />
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">Scan this QR code with your authenticator app (like Authy or Google Authenticator).</p>
          <p className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded">ASDF-1234-QWER-5678</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6 pt-4 border-t border-border/20">
          <div className="space-y-4">
            <label className="text-sm font-medium block text-center">Enter the 6-digit code from your app</label>
            <OTPInput value={otp} onChange={setOtp} length={6} />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading || otp.length < 6}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Verify and Enable 2FA"}
          </Button>
          
          <div className="text-center">
            <Button variant="ghost" type="button" onClick={() => navigate("/")} className="text-sm">
              Skip for now
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}
