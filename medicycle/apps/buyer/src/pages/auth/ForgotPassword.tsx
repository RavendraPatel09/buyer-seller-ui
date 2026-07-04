import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { forgotPasswordSchema, type ForgotPasswordInput } from "../../lib/validations/auth.schema"
import { AuthLayout } from "../../layouts/AuthLayout"
import { Input } from "@medicycle/ui"
import { Button } from "@medicycle/ui"
import { Loader2, ArrowLeft, MailCheck } from "lucide-react"

export function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = async (_data: ForgotPasswordInput) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSuccess(true)
  }

  return (
    <AuthLayout title="Reset Password" subtitle="Enter your email to receive a reset link.">
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
              <label className="text-sm font-medium">Email address</label>
              <motion.div animate={errors.email ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
                <Input {...register("email")} type="email" placeholder="name@example.com" className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""} />
              </motion.div>
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <Button type="submit" className="w-full mt-6" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send reset link"}
            </Button>

            <div className="text-center mt-6 text-sm">
              <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to login
              </Link>
            </div>
          </motion.form>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-4">
              <MailCheck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Check your email</h3>
            <p className="text-muted-foreground">We've sent a password reset link to your email address.</p>
            <Button variant="outline" className="w-full" onClick={() => setIsSuccess(false)}>
              Try another email
            </Button>
            <div className="pt-4">
              <Link to="/login" className="text-sm text-primary hover:underline font-medium">Return to login</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  )
}
