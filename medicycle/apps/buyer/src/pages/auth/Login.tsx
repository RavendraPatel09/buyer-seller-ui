import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { loginSchema, type LoginInput } from "../../lib/validations/auth.schema"
import { AuthLayout } from "../../layouts/AuthLayout"
import { Input } from "@medicycle/ui"
import { Button } from "@medicycle/ui"
import { Mail, Lock, CheckCircle2 } from "lucide-react"

export function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (_data: LoginInput) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSuccess(true)
    
    // Brief delay to show success animation before redirect
    setTimeout(() => navigate("/verify-otp"), 800)
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Enter your credentials to access your account.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="space-y-1 relative">
          <Input 
            {...register("email")} 
            type="email" 
            label="Email address"
            placeholder="name@example.com"
            icon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
          />
        </div>

        <div className="space-y-1 relative">
          <div className="flex justify-between items-center absolute top-0 right-0 z-10">
            <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline transition-all hover:opacity-80">
              Forgot password?
            </Link>
          </div>
          <Input 
            {...register("password")} 
            type="password"
            label="Password"
            placeholder="••••••••"
            icon={<Lock className="w-4 h-4" />}
            error={errors.password?.message}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 mt-2 group relative overflow-hidden" 
          disabled={isLoading || isSuccess}
          loading={isLoading}
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Authenticated</span>
              </motion.div>
            ) : !isLoading ? (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <span>Sign in securely</span>
                <svg width="12" height="12" viewBox="0 0 12 12" className="transition-transform group-hover:translate-x-1" fill="none">
                  <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </Button>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/register" className="text-foreground font-semibold hover:text-primary transition-colors hover:underline">
            Request access
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
