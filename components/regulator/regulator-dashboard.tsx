"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BatchReview } from "./batch-review"
import { AnalyticsDashboard } from "./analytics-dashboard"
import { useAuth } from "@/hooks/use-auth"
import { Shield, FileCheck, BarChart3, Bell, AlertTriangle, CheckCircle } from "lucide-react"

export function RegulatorDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            ANMAT Regulatory Dashboard
          </CardTitle>
          <CardDescription>
            Welcome back, {user?.name}. Monitor pharmaceutical batch compliance and ensure drug safety across the
            network.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Recent Alerts
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline" className="bg-yellow-50">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                  <span>3 batches awaiting review</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline" className="bg-green-50">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Approved
                  </Badge>
                  <span>PT-2024-001 approved today</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">System Status</h4>
              <div className="text-sm text-muted-foreground">
                <p>• Blockchain network: Online</p>
                <p>• Connected laboratories: 5</p>
                <p>• Active hospitals: 12</p>
                <p>• System uptime: 99.9%</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Compliance Overview</h4>
              <div className="text-sm text-muted-foreground">
                <p>• Quality standards: Met</p>
                <p>• Audit trail: Complete</p>
                <p>• Data integrity: Verified</p>
                <p>• Regulatory compliance: 100%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="review" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="review" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            Batch Review
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Compliance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="review" className="space-y-4">
          <BatchReview />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Monitoring</CardTitle>
              <CardDescription>Monitor regulatory compliance across all pharmaceutical operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Regulatory Standards</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">GMP Compliance</span>
                      <Badge className="bg-green-100 text-green-800">100%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Quality Assurance</span>
                      <Badge className="bg-green-100 text-green-800">98%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Documentation</span>
                      <Badge className="bg-green-100 text-green-800">100%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Traceability</span>
                      <Badge className="bg-green-100 text-green-800">100%</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Audit Trail</h4>
                  <div className="space-y-2 text-sm">
                    <div className="border rounded p-2">
                      <div className="font-medium">Recent Audit: PT-2024-001</div>
                      <div className="text-muted-foreground">Approved by Carlos Rodriguez</div>
                      <div className="text-xs text-muted-foreground">2 hours ago</div>
                    </div>
                    <div className="border rounded p-2">
                      <div className="font-medium">Quality Review: PT-2024-002</div>
                      <div className="text-muted-foreground">Pending quality certificates</div>
                      <div className="text-xs text-muted-foreground">1 day ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
