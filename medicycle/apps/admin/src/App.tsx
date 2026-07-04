import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { LoadingScreen } from '@medicycle/ui'
import { AdminRouteGuard } from './hooks/AdminRouteGuard'
const AdminLogin = lazy(() => import('./pages/AdminLogin').then(m => ({ default: m.AdminLogin })))
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })))
const AdminUsersPage = lazy(() => import('./pages/AdminUsersPage').then(m => ({ default: m.AdminUsersPage })))
const AdminMedicinesPage = lazy(() => import('./pages/AdminMedicinesPage').then(m => ({ default: m.AdminMedicinesPage })))
const AdminReportsPage = lazy(() => import('./pages/AdminReportsPage').then(m => ({ default: m.AdminReportsPage })))
const AdminAuditPage = lazy(() => import('./pages/AdminAuditPage').then(m => ({ default: m.AdminAuditPage })))
export function AdminApp() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/login" element={<AdminLogin />} />
            <Route element={<AdminRouteGuard />}>
              <Route path="/" element={<AdminDashboardPage />} />
              <Route path="/users" element={<AdminUsersPage />} />
              <Route path="/medicines" element={<AdminMedicinesPage />} />
              <Route path="/reports" element={<AdminReportsPage />} />
              <Route path="/audit" element={<AdminAuditPage />} />
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>
    </BrowserRouter>
  )
}
