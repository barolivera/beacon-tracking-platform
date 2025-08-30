"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { blockchainRegistry, type BatchRecord } from "@/lib/blockchain-registry"
import { Search, Scan, CheckCircle, XCircle, AlertTriangle, Calendar, Building2, Hash } from "lucide-react"

interface BatchScannerProps {
  onBatchFound: (batch: BatchRecord) => void
}

export function BatchScanner({ onBatchFound }: BatchScannerProps) {
  const [batchId, setBatchId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [lastScannedBatch, setLastScannedBatch] = useState<BatchRecord | null>(null)

  const handleScan = async () => {
    if (!batchId.trim()) {
      setError("Please enter a batch ID")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const batch = await blockchainRegistry.getBatchByBatchId(batchId.trim())

      if (!batch) {
        setError("Batch not found. Please verify the batch ID and try again.")
        setLastScannedBatch(null)
        return
      }

      setLastScannedBatch(batch)
      onBatchFound(batch)
      setError("")
    } catch (err) {
      setError("Failed to verify batch. Please try again.")
      setLastScannedBatch(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleScan()
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejected":
      case "blocked":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "recalled":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
      case "blocked":
        return "bg-red-100 text-red-800"
      case "recalled":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scan className="h-5 w-5" />
            Drug Verification Scanner
          </CardTitle>
          <CardDescription>
            Scan or enter batch ID to verify drug authenticity and view complete traceability information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="batchId">Batch ID</Label>
            <div className="flex gap-2">
              <Input
                id="batchId"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter batch ID (e.g., PT-2024-001)"
                className="flex-1"
              />
              <Button onClick={handleScan} disabled={isLoading}>
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {lastScannedBatch && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Batch {lastScannedBatch.batchId} found and verified on blockchain</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Quick Verification Result */}
      {lastScannedBatch && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Verification Result</span>
              <div className="flex items-center gap-2">
                {getStatusIcon(lastScannedBatch.status)}
                <Badge className={getStatusColor(lastScannedBatch.status)}>
                  {lastScannedBatch.status.charAt(0).toUpperCase() + lastScannedBatch.status.slice(1)}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Product Information</h4>
                <div className="text-sm space-y-1">
                  <div>
                    <strong>Product:</strong> {lastScannedBatch.productName}
                  </div>
                  <div>
                    <strong>Formula:</strong> {lastScannedBatch.formula}
                  </div>
                  <div>
                    <strong>Batch ID:</strong> {lastScannedBatch.batchId}
                  </div>
                  <div>
                    <strong>Quantity:</strong> {lastScannedBatch.quantity.toLocaleString()} {lastScannedBatch.unit}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Manufacturing Details</h4>
                <div className="text-sm space-y-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>{lastScannedBatch.laboratoryName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Produced: {lastScannedBatch.productionDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Expires: {lastScannedBatch.expiryDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    <span className="font-mono text-xs">{lastScannedBatch.blockchainHash.substring(0, 16)}...</span>
                  </div>
                </div>
              </div>
            </div>

            {lastScannedBatch.status === "recalled" && (
              <Alert variant="destructive" className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>RECALL NOTICE:</strong> This batch has been recalled. Do not dispense this medication.
                  {lastScannedBatch.regulatorNotes && ` Reason: ${lastScannedBatch.regulatorNotes}`}
                </AlertDescription>
              </Alert>
            )}

            {lastScannedBatch.status === "rejected" && (
              <Alert variant="destructive" className="mt-4">
                <XCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>REJECTED BATCH:</strong> This batch was rejected by regulatory authorities.
                  {lastScannedBatch.regulatorNotes && ` Reason: ${lastScannedBatch.regulatorNotes}`}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
