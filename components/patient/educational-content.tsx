"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Heart, Shield, AlertTriangle, Phone, ExternalLink } from "lucide-react"

export function EducationalContent() {
  const educationalTopics = [
    {
      id: 1,
      title: "Understanding Your Medication",
      description: "Learn how to read prescription labels and understand dosage instructions",
      category: "Basics",
      readTime: "5 min",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      id: 2,
      title: "Medication Safety Tips",
      description: "Important guidelines for storing and taking your medications safely",
      category: "Safety",
      readTime: "7 min",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      id: 3,
      title: "Side Effects and When to Worry",
      description: "Recognize normal side effects vs. serious reactions that need medical attention",
      category: "Health",
      readTime: "6 min",
      icon: <Heart className="h-5 w-5" />,
    },
    {
      id: 4,
      title: "Drug Interactions",
      description: "How different medications can interact and what to watch for",
      category: "Safety",
      readTime: "8 min",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
  ]

  const emergencyContacts = [
    {
      name: "Poison Control Center",
      number: "1-800-222-1222",
      description: "24/7 emergency assistance for poisoning or overdose",
    },
    {
      name: "Emergency Services",
      number: "911",
      description: "For life-threatening emergencies",
    },
    {
      name: "FDA MedWatch",
      number: "1-800-332-1088",
      description: "Report serious side effects or product problems",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Safety":
        return "bg-red-100 text-red-800"
      case "Health":
        return "bg-green-100 text-green-800"
      case "Basics":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Educational Articles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Educational Resources
          </CardTitle>
          <CardDescription>Learn more about medication safety and proper usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {educationalTopics.map((topic) => (
              <div key={topic.id} className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {topic.icon}
                    <h4 className="font-medium">{topic.title}</h4>
                  </div>
                  <Badge className={getCategoryColor(topic.category)}>{topic.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{topic.readTime} read</span>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Read More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Safety Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Quick Safety Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Before Taking Medication</h4>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Always verify the medication name and dosage</li>
                <li>• Check the expiration date</li>
                <li>• Read all warning labels</li>
                <li>• Inform your doctor of all medications you're taking</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Storage Guidelines</h4>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Store in original containers</li>
                <li>• Keep in cool, dry places unless specified</li>
                <li>• Keep away from children and pets</li>
                <li>• Don't share medications with others</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Emergency Contacts
          </CardTitle>
          <CardDescription>Important numbers to have when you need immediate help</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{contact.name}</h4>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    {contact.number}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">{contact.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
