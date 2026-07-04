import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { resetPasswordSchema, type ResetPasswordInput } from "../../lib/validations/auth.schema"
import { AuthLayout } from "../../layouts/AuthLayout"
import { Input } from "@medicycle/ui"
import { Button } from "@medicycle/ui"
import { PasswordStrength } from "../../components/auth/PasswordStrength"
import { Loader2, CheckCircle2 } from "lucide-react"

export function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema)
  })

  const password = watch("password")

  const onSubmit = async (_data: ResetPasswordInput) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSuccess(true)
    setTimeout(() => {
      navigate("/login")
    }, 2000)
  }

  return (
    <AuthLayout title="New Password" subtitle="Choose a strong new password for your account.">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleSubmit(onSubmit)} 
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">New Password</label>
              <motion.div animate={errors.password ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
                <Input {...register("password")} type="password" placeholder="••••••••" className={errors.password ? "border-destructive focus-visible:ring-destructive" : ""} />
              </motion.div>
              <PasswordStrength password={password} />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm New Password</label>
              <motion.div animate={errors.confirmPassword ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
                <Input {...register("confirmPassword")} type="password" placeholder="••••••••" className={errors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""} />
              </motion.div>
              {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
            </div>

            <Button type="submit" className="w-full mt-6" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Reset password"}
            </Button>
          </motion.form>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500 mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Password reset!</h3>
            <p className="text-muted-foreground">Your password has been successfully reset. Redirecting to login...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  )
}
