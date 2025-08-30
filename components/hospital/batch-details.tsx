"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { blockchainRegistry, type BatchRecord, type AuditLog } from "@/lib/blockchain-registry"
import { FileText, Shield, Truck, History, Download, CheckCircle, XCircle, Building2, Hash } from "lucide-react"

interface BatchDetailsProps {
  batch: BatchRecord | null
}

export function BatchDetails({ batch }: BatchDetailsProps) {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [isLoadingAudit, setIsLoadingAudit] = useState(false)

  useEffect(() => {
    if (batch) {
      loadAuditLogs(batch.batchId)
    }
  }, [batch])

  const loadAuditLogs = async (batchId: string) => {
    setIsLoadingAudit(true)
    try {
      const logs = await blockchainRegistry.getAuditLogs(batchId)
      setAuditLogs(logs)
    } catch (error) {
      console.error("Failed to load audit logs:", error)
    } finally {
      setIsLoadingAudit(false)
    }
  }

  if (!batch) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Batch Details</CardTitle>
          <CardDescription>Scan a batch ID to view detailed information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground font-mono">
            No batch selected. Use the scanner above to verify a drug batch.
          </div>
        </CardContent>
      </Card>
    )
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Batch Details: {batch.batchId}</span>
          <Badge className={getStatusColor(batch.status)}>
            {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
          </Badge>
        </CardTitle>
        <CardDescription>Complete traceability and verification information</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="quality">Quality</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Product Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium">Product:</span>
                    <span className="col-span-2">{batch.productName}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium">Formula:</span>
                    <span className="col-span-2 font-mono">{batch.formula}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium">Batch ID:</span>
                    <span className="col-span-2 font-mono">{batch.batchId}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium">Quantity:</span>
                    <span className="col-span-2">
                      {batch.quantity.toLocaleString()} {batch.unit}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Manufacturing Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium">Laboratory:</span>
                    <span className="col-span-2">{batch.laboratoryName}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium">Production:</span>
                    <span className="col-span-2">{batch.productionDate.toLocaleDateString()}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium">Expiry:</span>
                    <span className="col-span-2">{batch.expiryDate.toLocaleDateString()}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium">Status:</span>
                    <span className="col-span-2">
                      <Badge className={getStatusColor(batch.status)}>
                        {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                      </Badge>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Hash className="h-4 w-4" />
                Blockchain Verification
              </h4>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Blockchain Hash:</strong>
                  </div>
                  <div className="font-mono text-xs break-all bg-background p-2 rounded border">
                    {batch.blockchainHash}
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span>Created: {batch.createdAt.toLocaleString()}</span>
                    <span>Last Updated: {batch.updatedAt.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="quality" className="space-y-4">
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Quality Certificates ({batch.qualityCertificates.length})
              </h4>

              {batch.qualityCertificates.length > 0 ? (
                <div className="space-y-3">
                  {batch.qualityCertificates.map((cert) => (
                    <div key={cert.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{cert.testType}</h5>
                        <div className="flex items-center gap-2">
                          {cert.result === "pass" ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                          <Badge
                            className={
                              cert.result === "pass" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }
                          >
                            {cert.result.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>Certified by: {cert.certifiedBy}</div>
                        <div>Test Date: {cert.testDate.toLocaleDateString()}</div>
                        {cert.notes && <div>Notes: {cert.notes}</div>}
                        {cert.documentUrl && (
                          <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                            <Download className="h-4 w-4 mr-2" />
                            Download Certificate
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No quality certificates available for this batch
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-4">
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Distribution History ({batch.distributionLog.length})
              </h4>

              {batch.distributionLog.length > 0 ? (
                <div className="space-y-3">
                  {batch.distributionLog.map((entry) => (
                    <div key={entry.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{entry.recipientName}</h5>
                        <Badge
                          variant="outline"
                          className={
                            entry.status === "delivered"
                              ? "bg-green-50 text-green-700"
                              : entry.status === "in-transit"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-orange-50 text-orange-700"
                          }
                        >
                          {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>Type: {entry.recipientType.charAt(0).toUpperCase() + entry.recipientType.slice(1)}</div>
                        <div>Location: {entry.location}</div>
                        <div>Transfer Date: {entry.transferDate.toLocaleDateString()}</div>
                        <div>
                          Quantity: {entry.quantity.toLocaleString()} {batch.unit}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No distribution records available for this batch
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="audit" className="space-y-4">
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <History className="h-4 w-4" />
                Audit Trail
              </h4>

              {isLoadingAudit ? (
                <div className="text-center py-8 text-muted-foreground">Loading audit trail...</div>
              ) : auditLogs.length > 0 ? (
                <div className="space-y-3">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{log.action}</h5>
                        <span className="text-sm text-muted-foreground">{log.performedAt.toLocaleString()}</span>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>Performed by: {log.performedBy}</div>
                        <div>Details: {log.details}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No audit trail available for this batch</div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
