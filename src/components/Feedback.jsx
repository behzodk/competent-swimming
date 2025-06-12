import { useState, useEffect } from "react"
import {
  MessageSquare,
  Lock,
  CreditCard,
  AlertCircle,
  Calendar,
  TrendingUp,
  Target,
  Star,
  CheckCircle,
  Lightbulb,
  Award,
  Clock,
} from "lucide-react"
import { useProfile } from "../contexts/profileContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import Loader from "@/components/Loader"
import { supabase } from "../lib/supabaseClient"

// Mock data for children with feedback
const childrenData = [
  {
    id: "1",
    name: "Emma Johnson",
    age: 8,
    profileImage: "/placeholder.svg?height=200&width=200",
    hasActiveSubscription: true,
    subscriptionType: "Premium Monthly",
    instructor: "Coach Sarah",
    lastUpdated: "2024-03-15",
    overallRating: 4.5,
    feedback: [
      {
        id: "1",
        type: "instructor_comment",
        title: "Weekly Progress Review",
        content:
          "Emma has shown remarkable improvement in her freestyle technique this week. Her breathing rhythm has become much more consistent, and she's maintaining better body position in the water. I'm particularly impressed with her dedication during practice sessions.",
        instructor: "Coach Sarah",
        date: "2024-03-15",
        category: "Progress",
        priority: "high",
        skills: ["Freestyle", "Breathing", "Body Position"],
      },
      {
        id: "2",
        type: "strength",
        title: "Key Strengths",
        content:
          "Emma demonstrates excellent water confidence and shows great enthusiasm for learning new techniques. Her listening skills are outstanding, and she follows instructions very well. She's also developing good endurance for her age group.",
        instructor: "Coach Sarah",
        date: "2024-03-15",
        category: "Strengths",
        priority: "medium",
        skills: ["Water Confidence", "Listening", "Endurance"],
      },
      {
        id: "3",
        type: "improvement",
        title: "Areas for Development",
        content:
          "Focus on improving backstroke arm coordination. Emma tends to rush her arm movements, which affects her efficiency. We'll work on slowing down the stroke and emphasizing proper catch and pull phases.",
        instructor: "Coach Sarah",
        date: "2024-03-12",
        category: "Improvement",
        priority: "medium",
        skills: ["Backstroke", "Arm Coordination"],
      },
      {
        id: "4",
        type: "goal",
        title: "Next Goals",
        content:
          "Emma is ready to work towards swimming 25 meters of freestyle without stopping. We'll also introduce butterfly kick basics to prepare for future stroke development. Continue building endurance through fun games and activities.",
        instructor: "Coach Sarah",
        date: "2024-03-15",
        category: "Goals",
        priority: "high",
        skills: ["Distance Swimming", "Butterfly Kick", "Endurance"],
      },
      {
        id: "5",
        type: "achievement",
        title: "Recent Achievement",
        content:
          "Congratulations to Emma for successfully completing her first 15-meter freestyle swim! This is a significant milestone that shows her growing confidence and improved technique. Well done!",
        instructor: "Coach Sarah",
        date: "2024-03-10",
        category: "Achievement",
        priority: "high",
        skills: ["Freestyle", "Distance"],
      },
    ],
    skillAssessments: [
      { skill: "Freestyle", rating: 4, progress: 85, lastAssessed: "2024-03-15" },
      { skill: "Backstroke", rating: 3, progress: 65, lastAssessed: "2024-03-12" },
      { skill: "Breaststroke", rating: 3, progress: 60, lastAssessed: "2024-03-08" },
      { skill: "Water Safety", rating: 5, progress: 95, lastAssessed: "2024-03-15" },
      { skill: "Endurance", rating: 4, progress: 75, lastAssessed: "2024-03-15" },
    ],
  },
  {
    id: "2",
    name: "Lucas Johnson",
    age: 6,
    profileImage: "/placeholder.svg?height=200&width=200",
    hasActiveSubscription: false,
    subscriptionType: null,
    instructor: "Coach Mike",
    lastUpdated: "2024-03-10",
    overallRating: 3.5,
    feedback: [
      {
        id: "1",
        type: "instructor_comment",
        title: "Getting Comfortable",
        content:
          "Lucas is making steady progress with water comfort. He's becoming more confident putting his face in the water and is starting to enjoy floating exercises.",
        instructor: "Coach Mike",
        date: "2024-03-10",
        category: "Progress",
        priority: "medium",
        skills: ["Water Comfort", "Floating"],
      },
    ],
    skillAssessments: [
      { skill: "Water Comfort", rating: 4, progress: 80, lastAssessed: "2024-03-10" },
      { skill: "Floating", rating: 3, progress: 60, lastAssessed: "2024-03-08" },
      { skill: "Kicking", rating: 2, progress: 40, lastAssessed: "2024-03-05" },
    ],
  },
]

const feedbackTypeConfig = {
  progress: {
    icon: MessageSquare,
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-800",
  },
  strength: {
    icon: Star,
    color: "bg-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-800",
  },
  improvement: {
    icon: TrendingUp,
    color: "bg-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-800",
  },
  goal: {
    icon: Target,
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-800",
  },
  achievement: {
    icon: Award,
    color: "bg-yellow-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-800",
  },
}

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
}

export default function FeedbackPage() {
  const { profile } = useProfile()
  const [subscription, setSubscription] = useState(null)
  const [instructor, setInstructor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [feedbacks, setFeedbacks] = useState([])
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    const getSubscription = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('profile_id', profile?.id)
        .single()
      if (error) {
      }
      setSubscription(data)
      setLoading(false)
    }
    getSubscription()
  }, [profile])

  useEffect(() => {
    const getInstructor = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', subscription?.instructor)
        .single()
      if (error) {
      }
      setInstructor(data)
      setLoading(false)
    }
    getInstructor()
  }, [subscription])

  useEffect(() => {
    const getFeedbacks = async () => {
      const { data, error } = await supabase
        .from('feedbacks_extended')
        .select('*')
        .eq('to_profile_id', profile?.id)
      if (error) {
      }
      setLastUpdated(data[0].created_at)
      setFeedbacks(data)
    }
    getFeedbacks()
  }, [profile])

  const [selectedChildId, setSelectedChildId] = useState(childrenData[0].id)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const selectedChild = childrenData.find((child) => child.id === selectedChildId) || childrenData[0]

  const categories = ["All", "Progress", "Strengths", "Improvement", "Goals", "Achievement"]

  const filteredFeedbacks = 
  selectedCategory === "All"
      ? feedbacks || []
      : (feedbacks || []).filter((feedback) => feedback.category?.toLowerCase() === selectedCategory?.toLowerCase())

  const SubscriptionAlert = () => {
    if (loading) return <Loader />
    if (selectedChild.hasActiveSubscription) return null
    
    return (
      <Alert className="mb-8 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 shadow-lg">
        <AlertCircle className="h-5 w-5 text-orange-600" />
        <AlertDescription className="text-orange-900">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="font-semibold text-lg mb-1">Premium Feature - Subscription Required</div>
              <span className="text-sm">
                Access detailed instructor feedback and progress assessments for <strong>{selectedChild.name}</strong>{" "}
                with an active subscription.
              </span>
            </div>
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white shadow-md">
              <CreditCard className="w-4 h-4 mr-2" />
              Upgrade Now
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  const LockedContent = () => {
    if (loading) return <Loader />

    return (
    <div className="text-center py-20 text-gray-500">
      <div className="relative inline-block mb-6">
        <MessageSquare className="w-24 h-24 text-gray-300" />
        <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white rounded-full p-2">
          <Lock className="w-6 h-6" />
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-700">Feedback Access Locked</h3>
      <p className="text-lg text-gray-500 mb-6 max-w-md mx-auto">
        Subscribe to receive detailed instructor feedback, progress assessments, and personalized recommendations for
        your child's swimming development.
      </p>
      <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg" size="lg">
        <CreditCard className="w-5 h-5 mr-2" />
        Get Full Access
      </Button>
    </div>
  )
}

  if (!selectedChild.hasActiveSubscription && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Instructor Feedback</h1>
                <p className="text-gray-600">
                  Personalized feedback and progress assessments from swimming instructors
                </p>
              </div>
            </div>
          </div>

          <SubscriptionAlert />
          <LockedContent />
        </div>
      </div>
    )
  }
  if (loading) return <Loader />
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Instructor Feedback</h1>
              <p className="text-gray-600">Personalized feedback and progress assessments from swimming instructors</p>
            </div>
          </div>
        </div>

        {/* Overview Card */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                <AvatarImage src={selectedChild.profileImage || "/placeholder.svg"} alt={selectedChild.name} />
                <AvatarFallback className="text-xl bg-blue-500">
                  {profile?.first_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    }
                </AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl font-bold mb-2">{profile?.first_name} {profile?.last_name}</h2>
                <p className="text-blue-100 mb-2">Instructor: {instructor?.first_name} {instructor?.last_name}</p>
                <div className="flex items-center gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      Last updated: {new Date(lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "border-blue-200 text-blue-600 hover:bg-blue-50"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feedback Content */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {filteredFeedbacks.length > 0 ? (
                filteredFeedbacks.map((feedback) => {
                  const config = feedbackTypeConfig[feedback?.category?.toLowerCase()]
                  const IconComponent = config.icon

                  return (
                    <Card
                      key={feedback.id}
                      className={`border-2 ${config.borderColor} ${config.bgColor} shadow-md hover:shadow-lg transition-shadow`}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full ${config.color} flex items-center justify-center text-white`}
                            >
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div>
                              <CardTitle className={`text-lg ${config.textColor}`}>{feedback.title}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-gray-600">{feedback.from_first_name} {feedback.from_last_name}</span>
                                <span className="text-sm text-gray-400">•</span>
                                <span className="text-sm text-gray-600">
                                  {new Date(feedback.created_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed mb-4">{feedback.text}</p>
                        {feedback.tags && feedback.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {feedback.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className={`text-xs ${Math.random() > 0.5 ? "bg-blue-500 text-white" : "bg-green-500 text-white"}`}>
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">No feedback in this category</p>
                  <p className="text-sm">Check back later for updates from your instructor</p>
                </div>
              )}
            </div>
          </div>

          {/* Skill Assessments Sidebar */}
          <div>
            <Card className="border-0 shadow-lg mb-6">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  Skill Assessments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedChild.skillAssessments?.map((assessment, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{assessment.skill}</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < assessment.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Progress</span>
                        <span>{assessment.progress}%</span>
                      </div>
                      <Progress value={assessment.progress} className="h-2" />
                      <p className="text-xs text-gray-500">
                        Last assessed: {new Date(assessment.lastAssessed).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message Instructor
                </Button>
                <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50" size="lg">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-green-200 text-green-600 hover:bg-green-50"
                  size="lg"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Progress Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    )
}