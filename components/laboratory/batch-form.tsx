"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/hooks/use-auth"
import { blockchainRegistry, type BatchRecord } from "@/lib/blockchain-registry"
import { Loader2, Plus } from "lucide-react"

interface BatchFormProps {
  onBatchCreated: (batch: BatchRecord) => void
}

export function BatchForm({ onBatchCreated }: BatchFormProps) {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    batchId: "",
    productName: "",
    formula: "",
    productionDate: "",
    expiryDate: "",
    quantity: "",
    unit: "tablets",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const batch = await blockchainRegistry.createBatch({
        batchId: formData.batchId,
        productName: formData.productName,
        formula: formData.formula,
        laboratoryId: user.organizationId!,
        laboratoryName: user.organizationName!,
        productionDate: new Date(formData.productionDate),
        expiryDate: new Date(formData.expiryDate),
        quantity: Number.parseInt(formData.quantity),
        unit: formData.unit,
        qualityCertificates: [],
        distributionLog: [],
      })

      setSuccess(
        `Batch ${batch.batchId} created successfully with blockchain hash: ${batch.blockchainHash.substring(0, 10)}...`,
      )
      onBatchCreated(batch)

      // Reset form
      setFormData({
        batchId: "",
        productName: "",
        formula: "",
        productionDate: "",
        expiryDate: "",
        quantity: "",
        unit: "tablets",
      })
    } catch (err) {
      setError("Failed to create batch. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Register New Batch
        </CardTitle>
        <CardDescription>Create a new pharmaceutical batch and register it on the blockchain</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="batchId">Batch ID *</Label>
              <Input
                id="batchId"
                value={formData.batchId}
                onChange={(e) => handleInputChange("batchId", e.target.value)}
                placeholder="e.g., PT-2024-003"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name *</Label>
              <Input
                id="productName"
                value={formData.productName}
                onChange={(e) => handleInputChange("productName", e.target.value)}
                placeholder="e.g., Amoxicillin 500mg"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="formula">Chemical Formula *</Label>
            <Input
              id="formula"
              value={formData.formula}
              onChange={(e) => handleInputChange("formula", e.target.value)}
              placeholder="e.g., C16H19N3O5S"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productionDate">Production Date *</Label>
              <Input
                id="productionDate"
                type="date"
                value={formData.productionDate}
                onChange={(e) => handleInputChange("productionDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date *</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                placeholder="e.g., 10000"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <select
                id="unit"
                value={formData.unit}
                onChange={(e) => handleInputChange("unit", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="tablets">Tablets</option>
                <option value="capsules">Capsules</option>
                <option value="ml">Milliliters</option>
                <option value="grams">Grams</option>
                <option value="units">Units</option>
              </select>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register Batch on Blockchain
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
