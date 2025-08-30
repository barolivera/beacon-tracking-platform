"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { blockchainRegistry, type BatchRecord } from "@/lib/blockchain-registry"
import { CheckCircle, XCircle, Eye, Calendar, Hash, Building2, FlaskConical } from "lucide-react"

export function BatchReview() {
  const [pendingBatches, setPendingBatches] = useState<BatchRecord[]>([])
  const [selectedBatch, setSelectedBatch] = useState<BatchRecord | null>(null)
  const [reviewNotes, setReviewNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    loadPendingBatches()
  }, [])

  const loadPendingBatches = async () => {
    try {
      const allBatches = await blockchainRegistry.getAllBatches()
      const pending = allBatches.filter((batch) => batch.status === "pending")
      setPendingBatches(pending.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()))
    } catch (error) {
      console.error("Failed to load pending batches:", error)
    }
  }

  const handleReview = async (batchId: string, action: "approved" | "rejected") => {
    setIsLoading(true)
    setMessage("")

    try {
      await blockchainRegistry.updateBatchStatus(batchId, action, reviewNotes)
      setMessage(`Batch ${action} successfully`)
      setSelectedBatch(null)
      setReviewNotes("")
      await loadPendingBatches()
    } catch (error) {
      setMessage("Failed to update batch status")
    } finally {
      setIsLoading(false)
    }
  }

  if (pendingBatches.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Batch Review Queue</CardTitle>
          <CardDescription>No pending batches for review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            All batches have been reviewed. Check back later for new submissions.
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pending Batch Reviews ({pendingBatches.length})</CardTitle>
          <CardDescription>Review and approve pharmaceutical batch registrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingBatches.map((batch) => (
              <div key={batch.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{batch.batchId}</h3>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
                    </div>
                    <p className="text-sm font-medium">{batch.productName}</p>
                    <p className="text-xs text-muted-foreground font-mono">Formula: {batch.formula}</p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        <span className="font-mono">{batch.laboratoryName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span className="font-mono">Submitted: {batch.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" onClick={() => setSelectedBatch(batch)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Review
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm bg-muted/50 p-3 rounded">
                  <div className="font-mono">
                    <span className="font-medium">Production Date:</span>
                    <br />
                    {batch.productionDate.toLocaleDateString()}
                  </div>
                  <div className="font-mono">
                    <span className="font-medium">Quantity:</span>
                    <br />
                    {batch.quantity.toLocaleString()} {batch.unit}
                  </div>
                  <div className="font-mono">
                    <span className="font-medium">Quality Tests:</span>
                    <br />
                    {batch.qualityCertificates.length} completed
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Review Modal */}
      {selectedBatch && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5" />
              Review Batch: {selectedBatch.batchId}
            </CardTitle>
            <CardDescription>Detailed review and approval process</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Batch Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Batch Information</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Product:</strong> {selectedBatch.productName}
                  </div>
                  <div>
                    <strong>Formula:</strong> {selectedBatch.formula}
                  </div>
                  <div>
                    <strong>Laboratory:</strong> {selectedBatch.laboratoryName}
                  </div>
                  <div>
                    <strong>Production Date:</strong> {selectedBatch.productionDate.toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Expiry Date:</strong> {selectedBatch.expiryDate.toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Quantity:</strong> {selectedBatch.quantity.toLocaleString()} {selectedBatch.unit}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Blockchain Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    <span className="font-mono text-xs">{selectedBatch.blockchainHash}</span>
                  </div>
                  <div>
                    <strong>Created:</strong> {selectedBatch.createdAt.toLocaleString()}
                  </div>
                  <div>
                    <strong>Last Updated:</strong> {selectedBatch.updatedAt.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Certificates */}
            <div className="space-y-4">
              <h4 className="font-medium">Quality Certificates ({selectedBatch.qualityCertificates.length})</h4>
              {selectedBatch.qualityCertificates.length > 0 ? (
                <div className="space-y-2">
                  {selectedBatch.qualityCertificates.map((cert) => (
                    <div key={cert.id} className="border rounded p-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{cert.testType}</span>
                        <Badge
                          className={cert.result === "pass" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {cert.result.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground mt-1">
                        <div>Certified by: {cert.certifiedBy}</div>
                        <div>Date: {cert.testDate.toLocaleDateString()}</div>
                        {cert.notes && <div>Notes: {cert.notes}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground text-sm">No quality certificates submitted</div>
              )}
            </div>

            {/* Review Notes */}
            <div className="space-y-2">
              <Label htmlFor="reviewNotes">Review Notes</Label>
              <Textarea
                id="reviewNotes"
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="Enter your review comments, approval conditions, or rejection reasons..."
                rows={4}
              />
            </div>

            {message && (
              <Alert>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={() => handleReview(selectedBatch.id, "approved")}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Batch
              </Button>
              <Button
                onClick={() => handleReview(selectedBatch.id, "rejected")}
                disabled={isLoading}
                variant="destructive"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject Batch
              </Button>
              <Button
                onClick={() => {
                  setSelectedBatch(null)
                  setReviewNotes("")
                  setMessage("")
                }}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
