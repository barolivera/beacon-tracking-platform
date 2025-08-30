"use client"

import { useAuth } from "@/hooks/use-auth"
import { LoginForm } from "@/components/auth/login-form"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { LaboratoryDashboard } from "@/components/laboratory/laboratory-dashboard"
import { RegulatorDashboard } from "@/components/regulator/regulator-dashboard"
import { HospitalDashboard } from "@/components/hospital/hospital-dashboard"
import { PatientDashboard } from "@/components/patient/patient-dashboard"
import { Loader2 } from "lucide-react"

function DashboardContent() {
  const { user } = useAuth()

  if (!user) return null

  const dashboardTitles = {
    laboratory: "Laboratory Dashboard",
    regulator: "Regulatory Dashboard",
    hospital: "Hospital Dashboard",
    patient: "Patient Portal",
  }

  const renderRoleDashboard = () => {
    switch (user.role) {
      case "laboratory":
        return <LaboratoryDashboard />
      case "regulator":
        return <RegulatorDashboard />
      case "hospital":
        return <HospitalDashboard />
      case "patient":
        return <PatientDashboard />
      default:
        return null
    }
  }

  return <DashboardLayout title={dashboardTitles[user.role]}>{renderRoleDashboard()}</DashboardLayout>
}

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return isAuthenticated ? <DashboardContent /> : <LoginForm />
}
