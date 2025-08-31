"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DrugVerification } from "./drug-verification"
import { EducationalContent } from "./educational-content"
import { AdverseEventReport } from "./adverse-event-report"
import { useAuth } from "@/hooks/use-auth"
import { UserCircle, Shield, BookOpen, AlertTriangle, CheckCircle, Info } from "lucide-react"
import type { BatchRecord } from "@/lib/blockchain-registry"

export function PatientDashboard() {
  const { user } = useAuth()
  const [verifiedDrug, setVerifiedDrug] = useState<BatchRecord | null>(null)

  const handleDrugVerified = (batch: BatchRecord) => {
    setVerifiedDrug(batch)
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCircle className="h-5 w-5" />
            Patient Portal
          </CardTitle>
          <CardDescription>
            Welcome, {user?.name}. Verify your medications, access educational resources, and report any concerns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Your Safety
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-mono">
                  <Badge variant="outline" className="bg-green-50">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Secure
                  </Badge>
                  <span className="text-sm font-mono">Blockchain-verified medications</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline" className="bg-blue-50">
                    <Info className="h-3 w-3 mr-1" />
                    Protected
                  </Badge>
                  <span className="font-mono text-xs">Your privacy is protected</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">How It Works</h4>
              <div className="text-sm text-muted-foreground">
                <p className="text-sm font-mono">1. Enter your verification code</p>
                <p className="font-mono">2. View your medication details</p>
                <p className="font-mono">3. Access safety information</p>
                <p className="font-mono">4. Report any concerns</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Need Help?</h4>
              <div className="text-sm text-muted-foreground">
                <p className="font-mono">• Contact your healthcare provider</p>
                <p className="font-mono">• Call Poison Control: 1-800-222-1222</p>
                <p className="font-mono">• Emergency: 911</p>
                <p className="font-mono">• Read our educational resources</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="verify" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="verify" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Verify Medication
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Learn More
          </TabsTrigger>
          <TabsTrigger value="report" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Report Issue
          </TabsTrigger>
        </TabsList>

        <TabsContent value="verify" className="space-y-4">
          <DrugVerification onDrugVerified={handleDrugVerified} />
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <EducationalContent />
        </TabsContent>

        <TabsContent value="report" className="space-y-4">
          <AdverseEventReport />
        </TabsContent>
      </Tabs>
    </div>
  )
}
