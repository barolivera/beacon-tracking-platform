import { type NextRequest, NextResponse } from "next/server"
import { blockchainRegistry } from "@/lib/blockchain-registry"
import { blockchainSimulator } from "@/lib/blockchain-simulation"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const laboratoryId = searchParams.get("laboratoryId")
    const status = searchParams.get("status")
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    let batches = await blockchainRegistry.getAllBatches()

    // Filter by laboratory if specified
    if (laboratoryId) {
      batches = batches.filter((batch) => batch.laboratoryId === laboratoryId)
    }

    // Filter by status if specified
    if (status) {
      batches = batches.filter((batch) => batch.status === status)
    }

    // Apply limit
    batches = batches.slice(0, limit)

    return NextResponse.json({
      success: true,
      data: batches,
      total: batches.length,
      blockchain: blockchainSimulator.getBlockchainStats(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch batches" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      batchId,
      productName,
      formula,
      laboratoryId,
      laboratoryName,
      productionDate,
      expiryDate,
      quantity,
      unit,
      apiKey,
    } = body

    // Validate API key (in real implementation)
    if (!apiKey || apiKey !== "demo_api_key") {
      return NextResponse.json({ success: false, error: "Invalid API key" }, { status: 401 })
    }

    // Validate required fields
    if (!batchId || !productName || !laboratoryId) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Create batch
    const batch = await blockchainRegistry.createBatch({
      batchId,
      productName,
      formula,
      laboratoryId,
      laboratoryName,
      productionDate: new Date(productionDate),
      expiryDate: new Date(expiryDate),
      quantity,
      unit,
      qualityCertificates: [],
      distributionLog: [],
    })

    // Add to blockchain
    await blockchainSimulator.addTransaction(
      "BATCH_CREATED",
      {
        batchId: batch.batchId,
        productName: batch.productName,
        laboratoryId: batch.laboratoryId,
      },
      laboratoryName,
    )

    return NextResponse.json({
      success: true,
      data: batch,
      message: "Batch created successfully and recorded on blockchain",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create batch" }, { status: 500 })
  }
}
