"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { blockchainRegistry, type BatchRecord } from "@/lib/blockchain-registry"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Building2 } from "lucide-react"

interface AnalyticsData {
  totalBatches: number
  approvedBatches: number
  rejectedBatches: number
  pendingBatches: number
  approvalRate: number
  averageReviewTime: number
  topLaboratories: { name: string; count: number }[]
  monthlyTrends: { month: string; approved: number; rejected: number; pending: number }[]
  statusDistribution: { name: string; value: number; color: string }[]
}

const COLORS = {
  approved: "#16a34a",
  rejected: "#dc2626",
  pending: "#ca8a04",
  recalled: "#ea580c",
  blocked: "#6b7280",
}

export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    try {
      const allBatches = await blockchainRegistry.getAllBatches()
      const analyticsData = calculateAnalytics(allBatches)
      setAnalytics(analyticsData)
    } catch (error) {
      console.error("Failed to load analytics:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateAnalytics = (batches: BatchRecord[]): AnalyticsData => {
    const totalBatches = batches.length
    const approvedBatches = batches.filter((b) => b.status === "approved").length
    const rejectedBatches = batches.filter((b) => b.status === "rejected").length
    const pendingBatches = batches.filter((b) => b.status === "pending").length
    const approvalRate = totalBatches > 0 ? (approvedBatches / (approvedBatches + rejectedBatches)) * 100 : 0

    // Calculate top laboratories
    const labCounts = batches.reduce(
      (acc, batch) => {
        acc[batch.laboratoryName] = (acc[batch.laboratoryName] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const topLaboratories = Object.entries(labCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Mock monthly trends (in real app, this would be calculated from actual dates)
    const monthlyTrends = [
      { month: "Jan", approved: 8, rejected: 2, pending: 1 },
      { month: "Feb", approved: 12, rejected: 1, pending: 2 },
      { month: "Mar", approved: 15, rejected: 3, pending: 1 },
      { month: "Apr", approved: 10, rejected: 2, pending: 3 },
    ]

    // Status distribution for pie chart
    const statusDistribution = [
      { name: "Approved", value: approvedBatches, color: COLORS.approved },
      { name: "Rejected", value: rejectedBatches, color: COLORS.rejected },
      { name: "Pending", value: pendingBatches, color: COLORS.pending },
    ].filter((item) => item.value > 0)

    return {
      totalBatches,
      approvedBatches,
      rejectedBatches,
      pendingBatches,
      approvalRate,
      averageReviewTime: 2.5, // Mock data
      topLaboratories,
      monthlyTrends,
      statusDistribution,
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">Loading analytics...</div>
        </CardContent>
      </Card>
    )
  }

  if (!analytics) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">Failed to load analytics data</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Batches</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalBatches}</div>
            <p className="text-xs text-muted-foreground">All time registrations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{analytics.approvalRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {analytics.approvalRate > 80 ? (
                <span className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  Excellent rate
                </span>
              ) : (
                <span className="flex items-center gap-1 text-yellow-600">
                  <TrendingDown className="h-3 w-3" />
                  Needs attention
                </span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{analytics.pendingBatches}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Review Time</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageReviewTime}d</div>
            <p className="text-xs text-muted-foreground">Days per batch</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Batch Status Distribution</CardTitle>
            <CardDescription>Current status of all registered batches</CardDescription>
          </CardHeader>
          <CardContent className="font-mono leading-3 text-xs">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics.statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Review Trends</CardTitle>
            <CardDescription>Batch approvals and rejections over time</CardDescription>
          </CardHeader>
          <CardContent className="font-mono text-xs">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="approved" fill={COLORS.approved} name="Approved" />
                <Bar dataKey="rejected" fill={COLORS.rejected} name="Rejected" />
                <Bar dataKey="pending" fill={COLORS.pending} name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Laboratories */}
      <Card>
        <CardHeader>
          <CardTitle>Top Laboratories by Batch Count</CardTitle>
          <CardDescription>Most active pharmaceutical laboratories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.topLaboratories.map((lab, index) => (
              <div key={lab.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                    {index + 1}
                  </Badge>
                  <span className="font-medium">{lab.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{lab.count} batches</span>
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(lab.count / analytics.totalBatches) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
