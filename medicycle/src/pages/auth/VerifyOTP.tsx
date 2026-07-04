import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { AuthLayout } from "../../layouts/AuthLayout"
import { OTPInput } from "../../components/auth/OTPInput"
import { Button } from "../../design-system/components/Button/Button"
import { Loader2, ArrowLeft } from "lucide-react"

export function VerifyOTP() {
  const [isLoading, setIsLoading] = useState(false)
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length < 6) {
      setError("Please enter the 6-digit code.")
      return
    }
    setError("")
    setIsLoading(true)
    
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    navigate("/")
  }

  return (
    <AuthLayout title="2-Step Verification" subtitle="We sent a verification code to your mobile device.">
      <form onSubmit={onSubmit} className="space-y-8 mt-8">
        <div className="space-y-4">
          <motion.div animate={error ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
            <OTPInput value={otp} onChange={setOtp} length={6} />
          </motion.div>
          <AnimatePresence>
            {error && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-destructive text-center"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading || otp.length < 6}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Verify Code"}
        </Button>

        <div className="text-center text-sm">
          <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to login
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
