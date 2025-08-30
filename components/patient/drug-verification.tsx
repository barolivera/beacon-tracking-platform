"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { blockchainRegistry, type BatchRecord } from "@/lib/blockchain-registry"
import { Search, Shield, CheckCircle, XCircle, AlertTriangle, Calendar, Building2, Info } from "lucide-react"

interface DrugVerificationProps {
  onDrugVerified: (batch: BatchRecord) => void
}

export function DrugVerification({ onDrugVerified }: DrugVerificationProps) {
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [verifiedDrug, setVerifiedDrug] = useState<BatchRecord | null>(null)

  const handleVerify = async () => {
    if (!verificationCode.trim()) {
      setError("Please enter your verification code")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // In a real system, this would use a patient-specific code that maps to a batch
      // For demo purposes, we'll treat the code as a batch ID
      const batch = await blockchainRegistry.getBatchByBatchId(verificationCode.trim())

      if (!batch) {
        setError("Verification code not found. Please check the code provided by your healthcare provider.")
        setVerifiedDrug(null)
        return
      }

      setVerifiedDrug(batch)
      onDrugVerified(batch)
      setError("")
    } catch (err) {
      setError("Failed to verify medication. Please try again.")
      setVerifiedDrug(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleVerify()
    }
  }

  const getStatusMessage = (status: string) => {
    switch (status) {
      case "approved":
        return {
          message: "Your medication has been verified as authentic and safe.",
          color: "text-green-700",
          bgColor: "bg-green-50",
          icon: <CheckCircle className="h-5 w-5 text-green-600" />,
        }
      case "recalled":
        return {
          message: "IMPORTANT: This medication has been recalled. Contact your healthcare provider immediately.",
          color: "text-red-700",
          bgColor: "bg-red-50",
          icon: <XCircle className="h-5 w-5 text-red-600" />,
        }
      case "rejected":
        return {
          message: "This medication was not approved by regulatory authorities. Do not use this medication.",
          color: "text-red-700",
          bgColor: "bg-red-50",
          icon: <XCircle className="h-5 w-5 text-red-600" />,
        }
      default:
        return {
          message: "This medication is still under review by regulatory authorities.",
          color: "text-yellow-700",
          bgColor: "bg-yellow-50",
          icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
        }
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Verify Your Medication
          </CardTitle>
          <CardDescription>
            Enter the verification code provided by your healthcare provider to confirm your medication is authentic
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="verificationCode">Verification Code</Label>
            <div className="flex gap-2">
              <Input
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter code from your prescription or medication package"
                className="flex-1"
              />
              <Button onClick={handleVerify} disabled={isLoading}>
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Your verification code can be found on your prescription label, medication package, or provided by your
              healthcare provider.
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Verification Result */}
      {verifiedDrug && (
        <Card>
          <CardHeader>
            <CardTitle>Verification Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status Alert */}
            <Alert className={getStatusMessage(verifiedDrug.status).bgColor}>
              <div className="flex items-start gap-3">
                {getStatusMessage(verifiedDrug.status).icon}
                <div>
                  <AlertDescription className={getStatusMessage(verifiedDrug.status).color}>
                    <strong>{getStatusMessage(verifiedDrug.status).message}</strong>
                  </AlertDescription>
                </div>
              </div>
            </Alert>

            {/* Drug Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium">Your Medication</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Name:</span>
                    <div className="text-lg">{verifiedDrug.productName}</div>
                  </div>
                  <div>
                    <span className="font-medium">Batch Number:</span>
                    <div className="font-mono">{verifiedDrug.batchId}</div>
                  </div>
                  <div>
                    <span className="font-medium">Quantity:</span>
                    <div>
                      {verifiedDrug.quantity.toLocaleString()} {verifiedDrug.unit}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Manufacturing Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>{verifiedDrug.laboratoryName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Manufactured: {verifiedDrug.productionDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Expires: {verifiedDrug.expiryDate.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Information */}
            <div className="space-y-3">
              <h4 className="font-medium">Quality Assurance</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Quality tests completed: {verifiedDrug.qualityCertificates.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Blockchain verified and secure</span>
                </div>
              </div>
            </div>

            {/* Special Warnings */}
            {verifiedDrug.status === "recalled" && verifiedDrug.regulatorNotes && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Recall Information:</strong> {verifiedDrug.regulatorNotes}
                  <br />
                  <strong>Action Required:</strong> Stop using this medication immediately and contact your healthcare
                  provider.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
