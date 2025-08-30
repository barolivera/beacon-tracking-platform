import { type NextRequest, NextResponse } from "next/server"
import { blockchainRegistry } from "@/lib/blockchain-registry"
import { blockchainSimulator } from "@/lib/blockchain-simulation"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { batchId, verificationCode } = body

    if (!batchId && !verificationCode) {
      return NextResponse.json({ success: false, error: "Batch ID or verification code required" }, { status: 400 })
    }

    // Use batchId if provided, otherwise use verificationCode as batchId
    const searchId = batchId || verificationCode
    const batch = await blockchainRegistry.getBatchByBatchId(searchId)

    if (!batch) {
      return NextResponse.json({ success: false, error: "Batch not found", verified: false }, { status: 404 })
    }

    // Add verification transaction to blockchain
    await blockchainSimulator.addTransaction(
      "BATCH_VERIFIED",
      {
        batchId: batch.batchId,
        verifiedAt: new Date(),
        status: batch.status,
      },
      "Verification System",
    )

    const verificationResult = {
      verified: true,
      batch: {
        id: batch.id,
        batchId: batch.batchId,
        productName: batch.productName,
        formula: batch.formula,
        status: batch.status,
        laboratoryName: batch.laboratoryName,
        productionDate: batch.productionDate,
        expiryDate: batch.expiryDate,
        quantity: batch.quantity,
        unit: batch.unit,
        blockchainHash: batch.blockchainHash,
      },
      blockchain: {
        verified: blockchainSimulator.validateChain(),
        lastBlockHash: blockchainSimulator.getBlockchainStats().lastBlockHash,
      },
    }

    return NextResponse.json({
      success: true,
      data: verificationResult,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 })
  }
}
