import { type NextRequest, NextResponse } from "next/server"
import { blockchainRegistry } from "@/lib/blockchain-registry"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const batch = await blockchainRegistry.getBatchById(params.id)

    if (!batch) {
      return NextResponse.json({ success: false, error: "Batch not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: batch,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch batch" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status, notes, apiKey } = body

    // Validate API key
    if (!apiKey || apiKey !== "demo_api_key") {
      return NextResponse.json({ success: false, error: "Invalid API key" }, { status: 401 })
    }

    const batch = await blockchainRegistry.updateBatchStatus(params.id, status, notes)

    if (!batch) {
      return NextResponse.json({ success: false, error: "Batch not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: batch,
      message: "Batch status updated successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update batch" }, { status: 500 })
  }
}
