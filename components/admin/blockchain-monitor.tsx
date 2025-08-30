"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { blockchainSimulator } from "@/lib/blockchain-simulation"
import { Blocks, Shield, Activity, Hash, CheckCircle, AlertTriangle } from "lucide-react"

export function BlockchainMonitor() {
  const [stats, setStats] = useState<any>(null)
  const [chain, setChain] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadBlockchainData()
  }, [])

  const loadBlockchainData = async () => {
    try {
      const blockchainStats = blockchainSimulator.getBlockchainStats()
      const blockchainChain = blockchainSimulator.getChain()

      setStats(blockchainStats)
      setChain(blockchainChain.slice(-10)) // Show last 10 blocks
    } catch (error) {
      console.error("Failed to load blockchain data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Blockchain Monitor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">Loading blockchain data...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Blockchain Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blocks</CardTitle>
            <Blocks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalBlocks || 0}</div>
            <p className="text-xs text-muted-foreground">Blockchain length</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalTransactions || 0}</div>
            <p className="text-xs text-muted-foreground">Total recorded</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chain Status</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {stats?.isValid ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-600" />
              )}
              <span className="text-lg font-bold">{stats?.isValid ? "Valid" : "Invalid"}</span>
            </div>
            <p className="text-xs text-muted-foreground">Integrity check</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Difficulty</CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.difficulty || 0}</div>
            <p className="text-xs text-muted-foreground">Mining difficulty</p>
          </CardContent>
        </Card>
      </div>

      {/* Chain Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Blockchain Status
          </CardTitle>
          <CardDescription>Real-time blockchain network status and integrity</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className={stats?.isValid ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
            <div className="flex items-center gap-2">
              {stats?.isValid ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={stats?.isValid ? "text-green-800" : "text-red-800"}>
                <strong>
                  {stats?.isValid ? "Blockchain is valid and secure" : "Blockchain integrity compromised"}
                </strong>
                <br />
                Last block hash: <code className="text-xs">{stats?.lastBlockHash?.substring(0, 16)}...</code>
              </AlertDescription>
            </div>
          </Alert>

          <div className="mt-4 flex gap-2">
            <Button onClick={loadBlockchainData} variant="outline">
              Refresh Status
            </Button>
            <Button variant="outline">Download Chain</Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Blocks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Blocks className="h-5 w-5" />
            Recent Blocks
          </CardTitle>
          <CardDescription>Latest blocks in the pharmaceutical traceability chain</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chain.map((block) => (
              <div key={block.index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Block #{block.index}</Badge>
                    <span className="text-sm text-muted-foreground">{block.timestamp.toLocaleString()}</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">{block.transactions.length} transactions</Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Hash:</strong>
                    <code className="ml-2 text-xs bg-muted px-2 py-1 rounded">{block.hash.substring(0, 32)}...</code>
                  </div>
                  <div>
                    <strong>Previous Hash:</strong>
                    <code className="ml-2 text-xs bg-muted px-2 py-1 rounded">
                      {block.previousHash.substring(0, 32)}...
                    </code>
                  </div>
                  <div>
                    <strong>Nonce:</strong> {block.nonce}
                  </div>
                </div>

                {block.transactions.length > 0 && (
                  <div className="mt-3">
                    <strong className="text-sm">Transactions:</strong>
                    <div className="mt-1 space-y-1">
                      {block.transactions.map((tx: any) => (
                        <div key={tx.id} className="text-xs bg-muted/50 p-2 rounded">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{tx.action}</span>
                            <code className="text-xs">{tx.id}</code>
                          </div>
                          {tx.data.batchId && <div className="text-muted-foreground">Batch: {tx.data.batchId}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
