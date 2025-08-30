import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Key, Database } from "lucide-react"

export default function ApiDocsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">API Documentation</h1>
        <p className="text-muted-foreground">
          Integrate with the Blockchain Drug Traceability Platform using our REST API
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                API Overview
              </CardTitle>
              <CardDescription>
                RESTful API for pharmaceutical batch management and blockchain verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Base URL</h4>
                  <code className="block bg-muted p-2 rounded text-sm">https://your-domain.com/api</code>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Content Type</h4>
                  <code className="block bg-muted p-2 rounded text-sm">application/json</code>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Supported Operations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="border rounded p-3">
                    <Badge className="mb-2">Batch Management</Badge>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Create new batches</li>
                      <li>• Update batch status</li>
                      <li>• Query batch information</li>
                      <li>• Batch verification</li>
                    </ul>
                  </div>
                  <div className="border rounded p-3">
                    <Badge className="mb-2">Blockchain</Badge>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Blockchain statistics</li>
                      <li>• Transaction history</li>
                      <li>• Audit trail access</li>
                      <li>• Chain validation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="authentication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Authentication
              </CardTitle>
              <CardDescription>Secure your API requests with proper authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium">API Key Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Include your API key in the request body for all authenticated endpoints.
                </p>
                <div className="bg-muted p-4 rounded">
                  <code className="text-sm">
                    {`{
  "apiKey": "your_api_key_here",
  "batchId": "PT-2024-001",
  ...
}`}
                  </code>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Demo API Key</h4>
                <p className="text-sm text-muted-foreground">For testing purposes, use the following API key:</p>
                <code className="block bg-muted p-2 rounded text-sm">demo_api_key</code>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-4">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>GET /api/batches</CardTitle>
                <CardDescription>Retrieve batch information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium">Query Parameters</h5>
                    <div className="mt-2 space-y-2 text-sm">
                      <div>
                        <code>laboratoryId</code> - Filter by laboratory ID
                      </div>
                      <div>
                        <code>status</code> - Filter by batch status
                      </div>
                      <div>
                        <code>limit</code> - Limit number of results (default: 50)
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium">Example Response</h5>
                    <div className="bg-muted p-3 rounded mt-2">
                      <code className="text-xs">
                        {`{
  "success": true,
  "data": [...],
  "total": 25,
  "blockchain": {...}
}`}
                      </code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>POST /api/batches</CardTitle>
                <CardDescription>Create a new batch</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium">Required Fields</h5>
                    <div className="mt-2 space-y-2 text-sm">
                      <div>
                        <code>batchId</code> - Unique batch identifier
                      </div>
                      <div>
                        <code>productName</code> - Product name
                      </div>
                      <div>
                        <code>laboratoryId</code> - Laboratory identifier
                      </div>
                      <div>
                        <code>apiKey</code> - Authentication key
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>POST /api/verify</CardTitle>
                <CardDescription>Verify batch authenticity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium">Request Body</h5>
                    <div className="bg-muted p-3 rounded mt-2">
                      <code className="text-xs">
                        {`{
  "batchId": "PT-2024-001"
}`}
                      </code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Integration Examples
              </CardTitle>
              <CardDescription>Code examples for common integration scenarios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-medium">JavaScript/Node.js</h4>
                <div className="bg-muted p-4 rounded">
                  <code className="text-sm whitespace-pre">
                    {`// Create a new batch
const response = await fetch('/api/batches', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    batchId: 'PT-2024-001',
    productName: 'Amoxicillin 500mg',
    laboratoryId: 'lab-001',
    laboratoryName: 'PharmaTech Labs',
    apiKey: 'demo_api_key'
  })
});

const result = await response.json();
console.log(result);`}
                  </code>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Python</h4>
                <div className="bg-muted p-4 rounded">
                  <code className="text-sm whitespace-pre">
                    {`import requests

# Verify a batch
response = requests.post('/api/verify', json={
    'batchId': 'PT-2024-001'
})

if response.status_code == 200:
    data = response.json()
    print(f"Verified: {data['data']['verified']}")
else:
    print("Verification failed")`}
                  </code>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">cURL</h4>
                <div className="bg-muted p-4 rounded">
                  <code className="text-sm whitespace-pre">
                    {`# Get blockchain statistics
curl -X GET "https://your-domain.com/api/blockchain/stats" \\
  -H "Content-Type: application/json"`}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
