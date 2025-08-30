import { type NextRequest, NextResponse } from "next/server"

// Mock notification system
interface Notification {
  id: string
  userId: string
  userRole: string
  type: "batch_approved" | "batch_rejected" | "batch_recalled" | "quality_alert" | "system_alert"
  title: string
  message: string
  data?: any
  read: boolean
  createdAt: Date
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    userId: "lab-001",
    userRole: "laboratory",
    type: "batch_approved",
    title: "Batch Approved",
    message: "Your batch PT-2024-001 has been approved by ANMAT",
    data: { batchId: "PT-2024-001" },
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "2",
    userId: "anmat-001",
    userRole: "regulator",
    type: "quality_alert",
    title: "Quality Alert",
    message: "New batch PT-2024-003 requires quality review",
    data: { batchId: "PT-2024-003" },
    read: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
  {
    id: "3",
    userId: "hosp-001",
    userRole: "hospital",
    type: "batch_recalled",
    title: "Batch Recall Notice",
    message: "Batch PT-2024-005 has been recalled - immediate action required",
    data: { batchId: "PT-2024-005" },
    read: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const userRole = searchParams.get("userRole")
    const unreadOnly = searchParams.get("unreadOnly") === "true"

    let notifications = [...mockNotifications]

    // Filter by user
    if (userId) {
      notifications = notifications.filter((n) => n.userId === userId)
    }

    // Filter by role
    if (userRole) {
      notifications = notifications.filter((n) => n.userRole === userRole)
    }

    // Filter unread only
    if (unreadOnly) {
      notifications = notifications.filter((n) => !n.read)
    }

    // Sort by creation date (newest first)
    notifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    return NextResponse.json({
      success: true,
      data: notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch notifications" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, userRole, type, title, message, data } = body

    const notification: Notification = {
      id: Date.now().toString(),
      userId,
      userRole,
      type,
      title,
      message,
      data,
      read: false,
      createdAt: new Date(),
    }

    mockNotifications.push(notification)

    return NextResponse.json({
      success: true,
      data: notification,
      message: "Notification created successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create notification" }, { status: 500 })
  }
}
