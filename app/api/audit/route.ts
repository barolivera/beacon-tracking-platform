import { type NextRequest, NextResponse } from "next/server"
import { blockchainRegistry } from "@/lib/blockchain-registry"
import { blockchainSimulator } from "@/lib/blockchain-simulation"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const batchId = searchParams.get("batchId")
    const limit = Number.parseInt(searchParams.get("limit") || "100")

    // Get audit logs from registry
    const auditLogs = await blockchainRegistry.getAuditLogs(batchId || undefined)

    // Get blockchain transactions
    const blockchain = blockchainSimulator.getChain()
    const blockchainTransactions = blockchain.flatMap((block) =>
      block.transactions.filter((tx) => !batchId || tx.data.batchId === batchId),
    )

    const combinedAudit = [
      ...auditLogs.map((log) => ({
        id: log.id,
        type: "registry",
        action: log.action,
        details: log.details,
        performedBy: log.performedBy,
        performedAt: log.performedAt,
        batchId: log.batchId,
      })),
      ...blockchainTransactions.map((tx) => ({
        id: tx.id,
        type: "blockchain",
        action: tx.action,
        details: JSON.stringify(tx.data),
        performedBy: tx.data.performedBy || "System",
        performedAt: tx.timestamp,
        batchId: tx.data.batchId,
        hash: tx.hash,
        signature: tx.signature,
      })),
    ]

    // Sort by date (newest first) and apply limit
    combinedAudit.sort((a, b) => b.performedAt.getTime() - a.performedAt.getTime())
    const limitedAudit = combinedAudit.slice(0, limit)

    return NextResponse.json({
      success: true,
      data: limitedAudit,
      total: combinedAudit.length,
      blockchain: {
        isValid: blockchainSimulator.validateChain(),
        totalBlocks: blockchain.length,
        totalTransactions: blockchainTransactions.length,
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch audit trail" }, { status: 500 })
  }
}
