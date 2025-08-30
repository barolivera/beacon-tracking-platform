import { createHash } from "crypto"

export interface BlockchainTransaction {
  id: string
  timestamp: Date
  action: string
  data: any
  previousHash: string
  hash: string
  signature: string
}

export interface BlockchainBlock {
  index: number
  timestamp: Date
  transactions: BlockchainTransaction[]
  previousHash: string
  hash: string
  nonce: number
}

export class BlockchainSimulator {
  private static instance: BlockchainSimulator
  private chain: BlockchainBlock[] = []
  private pendingTransactions: BlockchainTransaction[] = []
  private difficulty = 2 // Number of leading zeros required in hash

  static getInstance(): BlockchainSimulator {
    if (!BlockchainSimulator.instance) {
      BlockchainSimulator.instance = new BlockchainSimulator()
      BlockchainSimulator.instance.initializeChain()
    }
    return BlockchainSimulator.instance
  }

  private initializeChain() {
    // Create genesis block
    const genesisBlock: BlockchainBlock = {
      index: 0,
      timestamp: new Date("2024-01-01"),
      transactions: [],
      previousHash: "0",
      hash: this.calculateHash(0, new Date("2024-01-01"), [], "0", 0),
      nonce: 0,
    }
    this.chain = [genesisBlock]
  }

  private calculateHash(
    index: number,
    timestamp: Date,
    transactions: BlockchainTransaction[],
    previousHash: string,
    nonce: number,
  ): string {
    const data = `${index}${timestamp.toISOString()}${JSON.stringify(transactions)}${previousHash}${nonce}`
    return createHash("sha256").update(data).digest("hex")
  }

  private calculateTransactionHash(transaction: Omit<BlockchainTransaction, "hash" | "signature">): string {
    const data = `${transaction.id}${transaction.timestamp.toISOString()}${transaction.action}${JSON.stringify(transaction.data)}${transaction.previousHash}`
    return createHash("sha256").update(data).digest("hex")
  }

  private mineBlock(block: Omit<BlockchainBlock, "hash" | "nonce">): BlockchainBlock {
    let nonce = 0
    let hash = ""

    // Simple proof-of-work simulation
    do {
      nonce++
      hash = this.calculateHash(block.index, block.timestamp, block.transactions, block.previousHash, nonce)
    } while (!hash.startsWith("0".repeat(this.difficulty)))

    return { ...block, hash, nonce }
  }

  async addTransaction(action: string, data: any, performedBy: string): Promise<BlockchainTransaction> {
    const previousHash = this.chain.length > 0 ? this.chain[this.chain.length - 1].hash : "0"

    const transaction: Omit<BlockchainTransaction, "hash" | "signature"> = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      action,
      data: { ...data, performedBy },
      previousHash,
    }

    const hash = this.calculateTransactionHash(transaction)
    const signature = this.signTransaction(hash, performedBy)

    const completeTransaction: BlockchainTransaction = {
      ...transaction,
      hash,
      signature,
    }

    this.pendingTransactions.push(completeTransaction)

    // Auto-mine block when we have enough transactions (or immediately for demo)
    if (this.pendingTransactions.length >= 1) {
      await this.mineBlock()
    }

    return completeTransaction
  }

  private signTransaction(hash: string, performedBy: string): string {
    // Simulate digital signature
    const signatureData = `${hash}${performedBy}${Date.now()}`
    return createHash("sha256").update(signatureData).digest("hex").substr(0, 16)
  }

  private async mineBlock(): Promise<BlockchainBlock> {
    const previousBlock = this.chain[this.chain.length - 1]

    const newBlock = this.mineBlock({
      index: this.chain.length,
      timestamp: new Date(),
      transactions: [...this.pendingTransactions],
      previousHash: previousBlock.hash,
    })

    this.chain.push(newBlock)
    this.pendingTransactions = []

    return newBlock
  }

  getChain(): BlockchainBlock[] {
    return [...this.chain]
  }

  getTransactionById(transactionId: string): BlockchainTransaction | null {
    for (const block of this.chain) {
      const transaction = block.transactions.find((tx) => tx.id === transactionId)
      if (transaction) return transaction
    }
    return null
  }

  validateChain(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      // Validate current block hash
      const calculatedHash = this.calculateHash(
        currentBlock.index,
        currentBlock.timestamp,
        currentBlock.transactions,
        currentBlock.previousHash,
        currentBlock.nonce,
      )

      if (currentBlock.hash !== calculatedHash) {
        return false
      }

      // Validate link to previous block
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
    }
    return true
  }

  getBlockchainStats() {
    return {
      totalBlocks: this.chain.length,
      totalTransactions: this.chain.reduce((sum, block) => sum + block.transactions.length, 0),
      isValid: this.validateChain(),
      lastBlockHash: this.chain[this.chain.length - 1]?.hash || "0",
      difficulty: this.difficulty,
    }
  }
}

export const blockchainSimulator = BlockchainSimulator.getInstance()
