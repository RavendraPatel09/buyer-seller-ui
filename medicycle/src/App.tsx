import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { LoadingScreen } from './components/common/LoadingScreen'

// Lazy load all pages for optimal code splitting
const Landing = lazy(() => import('./pages/Landing').then(m => ({ default: m.Landing })))
const Login = lazy(() => import('./pages/auth/Login').then(m => ({ default: m.Login })))
const Register = lazy(() => import('./pages/auth/Register').then(m => ({ default: m.Register })))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword').then(m => ({ default: m.ForgotPassword })))
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword').then(m => ({ default: m.ResetPassword })))
const VerifyOTP = lazy(() => import('./pages/auth/VerifyOTP').then(m => ({ default: m.VerifyOTP })))
const Setup2FA = lazy(() => import('./pages/auth/Setup2FA').then(m => ({ default: m.Setup2FA })))
const Marketplace = lazy(() => import('./pages/marketplace/Marketplace').then(m => ({ default: m.Marketplace })))
const MedicineDetails = lazy(() => import('./pages/marketplace/MedicineDetails').then(m => ({ default: m.MedicineDetails })))
const Messages = lazy(() => import('./pages/messages/Messages').then(m => ({ default: m.Messages })))
const DashboardOverview = lazy(() => import('./pages/dashboard/DashboardOverview').then(m => ({ default: m.DashboardOverview })))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })))

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/setup-2fa" element={<Setup2FA />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/marketplace/:id" element={<MedicineDetails />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App
