"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Send, CheckCircle, Phone, ExternalLink } from "lucide-react"

export function AdverseEventReport() {
  const [formData, setFormData] = useState({
    medicationName: "",
    batchNumber: "",
    symptoms: "",
    severity: "",
    startDate: "",
    contactInfo: "",
    additionalInfo: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSubmitted(true)
    setIsSubmitting(false)
  }

  const severityOptions = [
    { value: "mild", label: "Mild", color: "bg-green-100 text-green-800" },
    { value: "moderate", label: "Moderate", color: "bg-yellow-100 text-yellow-800" },
    { value: "severe", label: "Severe", color: "bg-red-100 text-red-800" },
    { value: "life-threatening", label: "Life-threatening", color: "bg-red-100 text-red-800" },
  ]

  if (submitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Report Submitted Successfully
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Thank you for reporting this adverse event. Your report has been submitted to the appropriate authorities
              and will help improve medication safety for everyone.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <h4 className="font-medium">What happens next?</h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Your report will be reviewed by medical professionals</li>
              <li>• If needed, you may be contacted for additional information</li>
              <li>• The information will be used to monitor medication safety</li>
              <li>• Serious reports are forwarded to regulatory authorities</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">If you need immediate medical attention:</h4>
            <div className="flex gap-2">
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Call 911
              </Button>
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Poison Control: 1-800-222-1222
              </Button>
            </div>
          </div>

          <Button
            onClick={() => {
              setSubmitted(false)
              setFormData({
                medicationName: "",
                batchNumber: "",
                symptoms: "",
                severity: "",
                startDate: "",
                contactInfo: "",
                additionalInfo: "",
              })
            }}
            variant="outline"
          >
            Submit Another Report
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Report Adverse Event
        </CardTitle>
        <CardDescription>
          Help improve medication safety by reporting any side effects or problems you experienced
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Emergency:</strong> If you are experiencing a life-threatening reaction, call 911 immediately. This
            form is for non-emergency reporting only.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="medicationName">Medication Name *</Label>
              <Input
                id="medicationName"
                value={formData.medicationName}
                onChange={(e) => handleInputChange("medicationName", e.target.value)}
                placeholder="e.g., Amoxicillin 500mg"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="batchNumber">Batch Number (if available)</Label>
              <Input
                id="batchNumber"
                value={formData.batchNumber}
                onChange={(e) => handleInputChange("batchNumber", e.target.value)}
                placeholder="e.g., PT-2024-001"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="symptoms">Symptoms or Problems Experienced *</Label>
            <Textarea
              id="symptoms"
              value={formData.symptoms}
              onChange={(e) => handleInputChange("symptoms", e.target.value)}
              placeholder="Describe the symptoms, side effects, or problems you experienced..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Severity Level *</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {severityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleInputChange("severity", option.value)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                    formData.severity === option.value
                      ? `${option.color} border-current`
                      : "border-border hover:bg-muted"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">When did symptoms start?</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactInfo">Contact Information (optional)</Label>
              <Input
                id="contactInfo"
                value={formData.contactInfo}
                onChange={(e) => handleInputChange("contactInfo", e.target.value)}
                placeholder="Phone or email for follow-up"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              value={formData.additionalInfo}
              onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
              placeholder="Any other relevant information (other medications, medical conditions, etc.)"
              rows={3}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
            <Button type="button" variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              FDA MedWatch
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
