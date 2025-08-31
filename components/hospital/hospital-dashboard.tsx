"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BatchScanner } from "./batch-scanner"
import { BatchDetails } from "./batch-details"
import { useAuth } from "@/hooks/use-auth"
import { Hospital, Shield, Scan, CheckCircle, AlertTriangle, Clock } from "lucide-react"
import type { BatchRecord } from "@/lib/blockchain-registry"

export function HospitalDashboard() {
  const { user } = useAuth()
  const [selectedBatch, setSelectedBatch] = useState<BatchRecord | null>(null)

  const handleBatchFound = (batch: BatchRecord) => {
    setSelectedBatch(batch)
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scans Today</CardTitle>
            <Scan className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+12 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">45</div>
            <p className="text-xs text-muted-foreground">95.7% success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">2</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">0</div>
            <p className="text-xs text-muted-foreground">All verified</p>
          </CardContent>
        </Card>
      </div>

      {/* Hospital Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hospital className="h-5 w-5" />
            Hospital Verification Portal
          </CardTitle>
          <CardDescription>
            Welcome back, {user?.name}. Verify drug authenticity and ensure patient safety through blockchain
            verification.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security Status
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline" className="bg-green-50">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Secure
                  </Badge>
                  <span className="font-mono">Blockchain connection active</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline" className="bg-green-50">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                  <span className="font-mono">All systems operational</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Recent Activity</h4>
              <div className="text-sm text-muted-foreground">
                <p className="font-mono">• Last scan: PT-2024-001 (verified)</p>
                <p className="font-mono">• Quality checks: All passed</p>
                <p className="font-mono">• System uptime: 99.9%</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Quick Actions</h4>
              <div className="text-sm text-muted-foreground">
                <p className="font-mono">• Scan batch ID below</p>
                <p className="font-mono">• View detailed drug information</p>
                <p className="font-mono">• Access complete audit trail</p>
                <p className="font-mono">• Report any concerns</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Batch Scanner */}
      <BatchScanner onBatchFound={handleBatchFound} />

      {/* Batch Details */}
      <BatchDetails batch={selectedBatch} />
    </div>
  )
}
