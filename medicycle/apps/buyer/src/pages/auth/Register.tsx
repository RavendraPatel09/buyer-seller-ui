import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { registerSchema, type RegisterInput } from "../../lib/validations/auth.schema"
import { AuthLayout } from "../../layouts/AuthLayout"
import { Input } from "@medicycle/ui"
import { Button } from "@medicycle/ui"
import { PasswordStrength } from "../../components/auth/PasswordStrength"
import { Loader2 } from "lucide-react"

export function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema)
  })

  const password = watch("password")

  const onSubmit = async (_data: RegisterInput) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    navigate("/setup-2fa")
  }

  return (
    <AuthLayout title="Create an account" subtitle="Join MediCycle to modernize your practice.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <motion.div animate={errors.fullName ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
            <Input {...register("fullName")} placeholder="Dr. Sarah Jenkins" className={errors.fullName ? "border-destructive focus-visible:ring-destructive" : ""} />
          </motion.div>
          {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email address</label>
          <motion.div animate={errors.email ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
            <Input {...register("email")} type="email" placeholder="name@example.com" className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""} />
          </motion.div>
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <motion.div animate={errors.password ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
            <Input {...register("password")} type="password" placeholder="••••••••" className={errors.password ? "border-destructive focus-visible:ring-destructive" : ""} />
          </motion.div>
          <PasswordStrength password={password} />
          {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Confirm Password</label>
          <motion.div animate={errors.confirmPassword ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
            <Input {...register("confirmPassword")} type="password" placeholder="••••••••" className={errors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""} />
          </motion.div>
          {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
        </div>

        <Button type="submit" className="w-full mt-6" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create account"}
        </Button>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
        </div>
      </form>
    </AuthLayout>
  )
}
