"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { blockchainRegistry, type BatchRecord } from "@/lib/blockchain-registry"
import { Eye, Package, Calendar, Hash } from "lucide-react"

interface BatchListProps {
  refreshTrigger?: number
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  recalled: "bg-orange-100 text-orange-800",
  blocked: "bg-gray-100 text-gray-800",
}

export function BatchList({ refreshTrigger }: BatchListProps) {
  const { user } = useAuth()
  const [batches, setBatches] = useState<BatchRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadBatches()
  }, [user, refreshTrigger])

  const loadBatches = async () => {
    if (!user?.organizationId) return

    setIsLoading(true)
    try {
      const laboratoryBatches = await blockchainRegistry.getBatchesByLaboratory(user.organizationId)
      setBatches(laboratoryBatches.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()))
    } catch (error) {
      console.error("Failed to load batches:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Batches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">Loading batches...</div>
        </CardContent>
      </Card>
    )
  }

  if (batches.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Batches</CardTitle>
          <CardDescription>No batches registered yet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Register your first batch to get started with blockchain tracking.
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Your Batches ({batches.length})
        </CardTitle>
        <CardDescription>Manage and track your pharmaceutical batches</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {batches.map((batch) => (
            <div key={batch.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{batch.batchId}</h3>
                    <Badge className={statusColors[batch.status]}>
                      {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{batch.productName}</p>
                  <p className="text-xs text-muted-foreground">Formula: {batch.formula}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Produced: {batch.productionDate.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Quantity: {batch.quantity.toLocaleString()} {batch.unit}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-xs">{batch.blockchainHash.substring(0, 10)}...</span>
                </div>
              </div>

              {batch.status === "rejected" && batch.regulatorNotes && (
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <p className="text-sm text-red-800">
                    <strong>Rejection Reason:</strong> {batch.regulatorNotes}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Created: {batch.createdAt.toLocaleString()}</span>
                <span>Quality Tests: {batch.qualityCertificates.length}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
