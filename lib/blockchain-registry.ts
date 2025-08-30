export interface BatchRecord {
  id: string
  batchId: string // Unique batch identifier
  productName: string
  formula: string
  laboratoryId: string
  laboratoryName: string
  productionDate: Date
  expiryDate: Date
  quantity: number
  unit: string
  status: "pending" | "approved" | "rejected" | "recalled" | "blocked"
  qualityCertificates: QualityCertificate[]
  distributionLog: DistributionEntry[]
  blockchainHash: string
  createdAt: Date
  updatedAt: Date
  regulatorNotes?: string
}

export interface QualityCertificate {
  id: string
  testType: string
  result: "pass" | "fail"
  testDate: Date
  certifiedBy: string
  documentUrl?: string
  notes?: string
}

export interface DistributionEntry {
  id: string
  recipientType: "hospital" | "pharmacy" | "distributor"
  recipientId: string
  recipientName: string
  location: string
  transferDate: Date
  quantity: number
  status: "in-transit" | "delivered" | "returned"
}

export interface AuditLog {
  id: string
  batchId: string
  action: string
  performedBy: string
  performedAt: Date
  details: string
  ipAddress?: string
}

export interface DrugBatch {
  id: string
  blockchainId: string
  drugName: string
  manufacturer: string
  batchNumber: string
  manufacturingDate: string
  expiryDate: string
  quantity: number
  status: "pending" | "approved" | "rejected" | "recalled"
  qrCode: string
  patientCode: string
  qualityCertificate: {
    certificateId: string
    testDate: string
    results: string
    approvedBy: string
  }
  distributionLog: Array<{
    timestamp: string
    location: string
    action: string
    handler: string
  }>
  auditTrail: Array<{
    timestamp: string
    action: string
    user: string
    details: string
  }>
}

// Mock blockchain registry service
export class BlockchainRegistry {
  private static instance: BlockchainRegistry
  private batches: Map<string, BatchRecord> = new Map()
  private drugBatches: Map<string, DrugBatch> = new Map()
  private auditLogs: AuditLog[] = []

  static getInstance(): BlockchainRegistry {
    if (!BlockchainRegistry.instance) {
      BlockchainRegistry.instance = new BlockchainRegistry()
      BlockchainRegistry.instance.initializeMockData()
    }
    return BlockchainRegistry.instance
  }

  private initializeMockData() {
    const mockBatches: BatchRecord[] = [
      {
        id: "1",
        batchId: "PT-2024-001",
        productName: "Amoxicillin 500mg",
        formula: "C16H19N3O5S",
        laboratoryId: "lab-001",
        laboratoryName: "PharmaTech Labs",
        productionDate: new Date("2024-01-15"),
        expiryDate: new Date("2026-01-15"),
        quantity: 10000,
        unit: "tablets",
        status: "approved",
        qualityCertificates: [
          {
            id: "qc-1",
            testType: "Purity Test",
            result: "pass",
            testDate: new Date("2024-01-16"),
            certifiedBy: "Dr. Sarah Chen",
            notes: "Purity: 99.8%",
          },
          {
            id: "qc-2",
            testType: "Stability Test",
            result: "pass",
            testDate: new Date("2024-01-17"),
            certifiedBy: "Dr. Sarah Chen",
            notes: "Stable under normal conditions",
          },
        ],
        distributionLog: [
          {
            id: "dist-1",
            recipientType: "hospital",
            recipientId: "hosp-001",
            recipientName: "Central Medical Center",
            location: "Buenos Aires, Argentina",
            transferDate: new Date("2024-01-20"),
            quantity: 2000,
            status: "delivered",
          },
        ],
        blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-20"),
      },
      {
        id: "2",
        batchId: "PT-2024-002",
        productName: "Ibuprofen 400mg",
        formula: "C13H18O2",
        laboratoryId: "lab-001",
        laboratoryName: "PharmaTech Labs",
        productionDate: new Date("2024-02-01"),
        expiryDate: new Date("2026-02-01"),
        quantity: 15000,
        unit: "tablets",
        status: "pending",
        qualityCertificates: [
          {
            id: "qc-3",
            testType: "Purity Test",
            result: "pass",
            testDate: new Date("2024-02-02"),
            certifiedBy: "Dr. Sarah Chen",
            notes: "Purity: 99.5%",
          },
        ],
        distributionLog: [],
        blockchainHash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234",
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-02-02"),
      },
    ]

    mockBatches.forEach((batch) => this.batches.set(batch.id, batch))

    // Initialize drug batches with sample data
    const sampleBatches = [
      {
        id: "DB1",
        blockchainId: "0xabcdef1234567890abcdef1234567890abcdef12",
        drugName: "Paracetamol",
        manufacturer: "MediCorp",
        batchNumber: "MC-2024-001",
        manufacturingDate: "2024-03-01",
        expiryDate: "2026-03-01",
        quantity: 5000,
        status: "pending",
        qrCode: "QR1234567890",
        patientCode: "PC1234567890",
        qualityCertificate: {
          certificateId: "QC1",
          testDate: "2024-03-02",
          results: "pass",
          approvedBy: "Dr. John Doe",
        },
        distributionLog: [],
        auditTrail: [],
      },
      {
        id: "DB2",
        blockchainId: "0xabcdef1234567890abcdef1234567890abcdef13",
        drugName: "Aspirin",
        manufacturer: "HealthCo",
        batchNumber: "HC-2024-001",
        manufacturingDate: "2024-04-01",
        expiryDate: "2026-04-01",
        quantity: 7000,
        status: "approved",
        qrCode: "QR0987654321",
        patientCode: "PC0987654321",
        qualityCertificate: {
          certificateId: "QC2",
          testDate: "2024-04-02",
          results: "pass",
          approvedBy: "Dr. Jane Smith",
        },
        distributionLog: [],
        auditTrail: [],
      },
    ]

    sampleBatches.forEach((batch) => this.drugBatches.set(batch.id, batch))
  }

  async createBatch(
    batchData: Omit<BatchRecord, "id" | "blockchainHash" | "createdAt" | "updatedAt" | "status">,
  ): Promise<BatchRecord> {
    const id = Date.now().toString()
    const blockchainHash = `0x${Math.random().toString(16).substr(2, 40)}`

    const batch: BatchRecord = {
      ...batchData,
      id,
      blockchainHash,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.batches.set(id, batch)

    // Add audit log
    this.auditLogs.push({
      id: Date.now().toString(),
      batchId: batch.batchId,
      action: "Batch Created",
      performedBy: batchData.laboratoryName,
      performedAt: new Date(),
      details: `New batch ${batch.batchId} created for ${batch.productName}`,
    })

    return batch
  }

  async getBatchesByLaboratory(laboratoryId: string): Promise<BatchRecord[]> {
    return Array.from(this.batches.values()).filter((batch) => batch.laboratoryId === laboratoryId)
  }

  async getBatchById(id: string): Promise<BatchRecord | null> {
    return this.batches.get(id) || null
  }

  async getBatchByBatchId(batchId: string): Promise<BatchRecord | null> {
    return Array.from(this.batches.values()).find((batch) => batch.batchId === batchId) || null
  }

  async updateBatchStatus(id: string, status: BatchRecord["status"], notes?: string): Promise<BatchRecord | null> {
    const batch = this.batches.get(id)
    if (!batch) return null

    batch.status = status
    batch.updatedAt = new Date()
    if (notes) batch.regulatorNotes = notes

    this.batches.set(id, batch)

    // Add audit log
    this.auditLogs.push({
      id: Date.now().toString(),
      batchId: batch.batchId,
      action: "Status Updated",
      performedBy: "System",
      performedAt: new Date(),
      details: `Status changed to ${status}${notes ? `: ${notes}` : ""}`,
    })

    return batch
  }

  async getAllBatches(): Promise<BatchRecord[]> {
    return Array.from(this.batches.values())
  }

  async getAuditLogs(batchId?: string): Promise<AuditLog[]> {
    if (batchId) {
      return this.auditLogs.filter((log) => log.batchId === batchId)
    }
    return this.auditLogs
  }

  async createDrugBatch(batchData: Omit<DrugBatch, "id" | "blockchainId">): Promise<DrugBatch> {
    const id = `BTC-${Date.now()}`
    const blockchainId = `0x${Math.random().toString(16).substr(2, 40)}`

    const batch: DrugBatch = {
      ...batchData,
      id,
      blockchainId,
      status: "pending",
    }

    this.drugBatches.set(id, batch)
    return batch
  }

  async getDrugBatchById(id: string): Promise<DrugBatch | null> {
    return this.drugBatches.get(id) || null
  }

  async getDrugBatchByBatchNumber(batchNumber: string): Promise<DrugBatch | null> {
    return Array.from(this.drugBatches.values()).find((batch) => batch.batchNumber === batchNumber) || null
  }

  async getDrugBatchByPatientCode(patientCode: string): Promise<DrugBatch | null> {
    return Array.from(this.drugBatches.values()).find((batch) => batch.patientCode === patientCode) || null
  }

  async getAllDrugBatches(): Promise<DrugBatch[]> {
    return Array.from(this.drugBatches.values())
  }

  async updateDrugBatchStatus(id: string, status: DrugBatch["status"], notes?: string): Promise<DrugBatch | null> {
    const batch = this.drugBatches.get(id)
    if (!batch) return null

    batch.status = status

    // Add audit trail entry
    batch.auditTrail.push({
      timestamp: new Date().toISOString(),
      action: `Status Updated to ${status}`,
      user: "system",
      details: notes || `Batch status changed to ${status}`,
    })

    this.drugBatches.set(id, batch)
    return batch
  }

  async getDrugBatchesByStatus(status: DrugBatch["status"]): Promise<DrugBatch[]> {
    return Array.from(this.drugBatches.values()).filter((batch) => batch.status === status)
  }
}

export const blockchainRegistry = BlockchainRegistry.getInstance()
