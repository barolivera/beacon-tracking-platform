import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DocumentationPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Blockchain Drug Traceability Platform</h1>
        <p className="text-muted-foreground text-lg">
          Comprehensive documentation for the pharmaceutical blockchain tracking system
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="roles">User Roles</TabsTrigger>
          <TabsTrigger value="api">API Reference</TabsTrigger>
          <TabsTrigger value="demo">Demo Accounts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
              <CardDescription>
                A comprehensive blockchain-based drug traceability platform for pharmaceutical supply chain management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Key Features</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Blockchain-based batch registration and tracking</li>
                  <li>Role-based access control for different stakeholders</li>
                  <li>Real-time verification and authenticity checking</li>
                  <li>Comprehensive audit trails and compliance reporting</li>
                  <li>Quality certificate management</li>
                  <li>Distribution tracking and logistics monitoring</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Next.js 14</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <Badge variant="secondary">Blockchain Simulation</Badge>
                  <Badge variant="secondary">REST API</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Workflow Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Laboratory Registration</h4>
                    <p className="text-sm text-muted-foreground">
                      Pharmaceutical labs register new drug batches with quality certificates
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Regulatory Review</h4>
                    <p className="text-sm text-muted-foreground">
                      ANMAT regulators review and approve/reject batch submissions
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Hospital Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      Hospitals verify drug authenticity before patient administration
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium">Patient Access</h4>
                    <p className="text-sm text-muted-foreground">
                      Patients can verify their medications and report adverse events
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  Laboratory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Register new drug batches</li>
                  <li>• Generate blockchain IDs</li>
                  <li>• Upload quality certificates</li>
                  <li>• Track batch status</li>
                  <li>• Receive regulatory notifications</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  Regulator (ANMAT)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Review pending batches</li>
                  <li>• Approve/reject submissions</li>
                  <li>• View analytics and reports</li>
                  <li>• Monitor compliance</li>
                  <li>• Audit trail access</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  Hospital
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Scan/verify batch IDs</li>
                  <li>• Check drug authenticity</li>
                  <li>• View distribution history</li>
                  <li>• Access quality certificates</li>
                  <li>• Generate patient codes</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  Patient
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Verify medication authenticity</li>
                  <li>• Access drug information</li>
                  <li>• Report adverse events</li>
                  <li>• View educational content</li>
                  <li>• Emergency contact access</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>RESTful API for external system integration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      GET
                    </Badge>
                    <code className="text-sm font-mono">/api/batches</code>
                  </div>
                  <p className="text-sm text-muted-foreground">Retrieve all drug batches with optional filtering</p>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      POST
                    </Badge>
                    <code className="text-sm font-mono">/api/batches</code>
                  </div>
                  <p className="text-sm text-muted-foreground">Create a new drug batch registration</p>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      GET
                    </Badge>
                    <code className="text-sm font-mono">/api/batches/[id]</code>
                  </div>
                  <p className="text-sm text-muted-foreground">Get detailed information for a specific batch</p>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      GET
                    </Badge>
                    <code className="text-sm font-mono">/api/verify</code>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Verify batch authenticity using batch ID or patient code
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Demo Accounts</CardTitle>
              <CardDescription>Use these accounts to explore different user roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    Laboratory Account
                  </h3>
                  <div className="space-y-1 text-sm font-mono">
                    <p>
                      <strong>Email:</strong> lab@pharmacorp.com
                    </p>
                    <p>
                      <strong>Password:</strong> lab123
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    Regulator Account
                  </h3>
                  <div className="space-y-1 text-sm font-mono">
                    <p>
                      <strong>Email:</strong> inspector@anmat.gov.ar
                    </p>
                    <p>
                      <strong>Password:</strong> anmat123
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    Hospital Account
                  </h3>
                  <div className="space-y-1 text-sm font-mono">
                    <p>
                      <strong>Email:</strong> pharmacy@hospital.com
                    </p>
                    <p>
                      <strong>Password:</strong> hospital123
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    Patient Account
                  </h3>
                  <div className="space-y-1 text-sm font-mono">
                    <p>
                      <strong>Email:</strong> patient@email.com
                    </p>
                    <p>
                      <strong>Password:</strong> patient123
                    </p>
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
