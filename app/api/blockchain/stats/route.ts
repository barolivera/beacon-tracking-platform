import { NextResponse } from "next/server"
import { blockchainSimulator } from "@/lib/blockchain-simulation"
import { blockchainRegistry } from "@/lib/blockchain-registry"

export async function GET() {
  try {
    const blockchainStats = blockchainSimulator.getBlockchainStats()
    const allBatches = await blockchainRegistry.getAllBatches()

    const stats = {
      blockchain: blockchainStats,
      batches: {
        total: allBatches.length,
        approved: allBatches.filter((b) => b.status === "approved").length,
        pending: allBatches.filter((b) => b.status === "pending").length,
        rejected: allBatches.filter((b) => b.status === "rejected").length,
        recalled: allBatches.filter((b) => b.status === "recalled").length,
      },
      laboratories: {
        total: new Set(allBatches.map((b) => b.laboratoryId)).size,
        active: new Set(allBatches.filter((b) => b.status === "approved").map((b) => b.laboratoryId)).size,
      },
    }

    return NextResponse.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch blockchain stats" }, { status: 500 })
  }
}
