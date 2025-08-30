"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BatchForm } from "./batch-form"
import { BatchList } from "./batch-list"
import { useAuth } from "@/hooks/use-auth"
import { FlaskConical, Package, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import type { BatchRecord } from "@/lib/blockchain-registry"

export function LaboratoryDashboard() {
  const { user } = useAuth()
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleBatchCreated = (batch: BatchRecord) => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Batches</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8</div>
            <p className="text-xs text-muted-foreground">67% approval rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">3</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5" />
            Laboratory Overview
          </CardTitle>
          <CardDescription>
            Welcome back, {user?.name}. Manage your pharmaceutical batch registrations and track their status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Recent Activity</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline" className="bg-green-50">
                    Approved
                  </Badge>
                  <span>PT-2024-001 approved by ANMAT</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline" className="bg-yellow-50">
                    Pending
                  </Badge>
                  <span>PT-2024-002 under review</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Quality Certificates</h4>
              <div className="text-sm text-muted-foreground">
                <p>• Purity tests completed: 15</p>
                <p>• Stability tests completed: 12</p>
                <p>• Pending certifications: 2</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Distribution Status</h4>
              <div className="text-sm text-muted-foreground">
                <p>• Active distributions: 5</p>
                <p>• Delivered batches: 8</p>
                <p>• In transit: 2</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Batch Registration Form */}
      <BatchForm onBatchCreated={handleBatchCreated} />

      {/* Batch List */}
      <BatchList refreshTrigger={refreshTrigger} />
    </div>
  )
}
