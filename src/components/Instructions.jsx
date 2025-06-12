import React from "react"

import { useState } from "react"
import {
  Play,
  FileText,
  Award,
  HelpCircle,
  ExternalLink,
  Search,
  Filter,
  Download,
  Eye,
  ChevronRight,
  Star,
  BookOpen,
  Video,
  LinkIcon,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ArrowUpRight,
} from "lucide-react"
import placeholder from "./ui/image.png"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

// Mock data for videos
const videoTutorials = [
  {
    id: "1",
    title: "Introduction to Swimming Classes",
    description: "An overview of our swimming program and what to expect in your first class",
    thumbnail: placeholder,
    duration: "5:24",
    category: "Getting Started",
    level: "All Levels",
    views: 1245,
    uploadDate: "2024-01-15",
    url: "https://example.com/video1",
  },
  {
    id: "2",
    title: "Basic Floating Techniques",
    description: "Learn the fundamentals of floating for beginners",
    thumbnail: placeholder,
    duration: "4:15",
    category: "Techniques",
    level: "Beginner",
    views: 982,
    uploadDate: "2024-01-20",
    url: "https://example.com/video2",
  },
  {
    id: "3",
    title: "Freestyle Swimming Stroke",
    description: "Detailed breakdown of the freestyle swimming technique",
    thumbnail: placeholder,
    duration: "8:37",
    category: "Techniques",
    level: "Intermediate",
    views: 1567,
    uploadDate: "2024-02-05",
    url: "https://example.com/video3",
  },
  {
    id: "4",
    title: "Water Safety Guidelines",
    description: "Important safety rules and procedures for all swimmers",
    thumbnail: placeholder,
    duration: "6:12",
    category: "Safety",
    level: "All Levels",
    views: 2103,
    uploadDate: "2024-02-10",
    url: "https://example.com/video4",
  },
  {
    id: "5",
    title: "Advanced Backstroke Techniques",
    description: "Improve your backstroke with these advanced tips",
    thumbnail: placeholder,
    duration: "7:45",
    category: "Techniques",
    level: "Advanced",
    views: 876,
    uploadDate: "2024-02-15",
    url: "https://example.com/video5",
  },
  {
    id: "6",
    title: "Using the Parent Dashboard",
    description: "A guide to navigating and using the parent dashboard features",
    thumbnail: placeholder,
    duration: "4:50",
    category: "Platform Guide",
    level: "All Levels",
    views: 654,
    uploadDate: "2024-02-20",
    url: "https://example.com/video6",
  },
]

// Mock data for reading materials
const readingMaterials = [
  {
    id: "1",
    title: "Parent Handbook",
    description: "Complete guide for parents with children in our swimming program",
    fileType: "pdf",
    fileSize: "2.4 MB",
    category: "Guides",
    pages: 24,
    uploadDate: "2024-01-10",
    url: "#",
  },
  {
    id: "2",
    title: "Swimming Terminology Glossary",
    description: "A comprehensive list of swimming terms and their definitions",
    fileType: "pdf",
    fileSize: "1.2 MB",
    category: "Reference",
    pages: 15,
    uploadDate: "2024-01-25",
    url: "#",
  },
  {
    id: "3",
    title: "Preparing for Your First Swim Class",
    description: "Tips and checklist for preparing your child for their first swimming lesson",
    fileType: "pdf",
    fileSize: "850 KB",
    category: "Guides",
    pages: 8,
    uploadDate: "2024-02-05",
    url: "#",
  },
  {
    id: "4",
    title: "Nutrition for Young Swimmers",
    description: "Dietary recommendations and meal ideas for children in swimming programs",
    fileType: "pdf",
    fileSize: "1.5 MB",
    category: "Health",
    pages: 18,
    uploadDate: "2024-02-15",
    url: "#",
  },
]

// Mock data for level guides
const levelGuides = [
  {
    id: "1",
    level: "Level 1: Water Explorers",
    ageRange: "3-5 years",
    description:
      "Introduction to water comfort and basic water safety. Children learn to enter and exit the pool safely, blow bubbles, and float with assistance.",
    skills: [
      "Water comfort and adjustment",
      "Submerging face in water",
      "Assisted floating on back and front",
      "Basic kicking with support",
      "Water safety awareness",
    ],
    prerequisites: "None",
    duration: "8 weeks",
    nextLevel: "Level 2: Water Adventurers",
    image: placeholder,
  },
  {
    id: "2",
    level: "Level 2: Water Adventurers",
    ageRange: "4-6 years",
    description:
      "Building water confidence and introducing independent movement. Children learn to float unassisted, glide short distances, and perform basic arm and leg movements.",
    skills: [
      "Independent floating on back and front",
      "Gliding with face in water",
      "Basic arm and leg coordination",
      "Retrieving objects in chest-deep water",
      "Independent water entry and exit",
    ],
    prerequisites: "Completion of Level 1 or equivalent skills assessment",
    duration: "8 weeks",
    nextLevel: "Level 3: Stroke Beginners",
    image: placeholder,
  },
  {
    id: "3",
    level: "Level 3: Stroke Beginners",
    ageRange: "5-7 years",
    description:
      "Introduction to basic swimming strokes and breathing techniques. Children learn freestyle and backstroke fundamentals and begin swimming short distances independently.",
    skills: [
      "Freestyle arm and leg movements",
      "Backstroke arm and leg movements",
      "Rhythmic breathing to the side",
      "Swimming 10-15 meters unassisted",
      "Treading water for 30 seconds",
    ],
    prerequisites: "Completion of Level 2 or equivalent skills assessment",
    duration: "10 weeks",
    nextLevel: "Level 4: Stroke Developers",
    image: placeholder,
  },
  {
    id: "4",
    level: "Level 4: Stroke Developers",
    ageRange: "6-9 years",
    description:
      "Refining freestyle and backstroke techniques and introducing breaststroke. Children focus on proper breathing, arm recovery, and increasing swimming distance.",
    skills: [
      "Refined freestyle with proper breathing",
      "Refined backstroke with proper arm recovery",
      "Introduction to breaststroke kick and arm movements",
      "Swimming 25 meters continuously",
      "Deep water comfort and safety",
    ],
    prerequisites: "Completion of Level 3 or equivalent skills assessment",
    duration: "10 weeks",
    nextLevel: "Level 5: Stroke Improvers",
    image: placeholder,
  },
  {
    id: "5",
    level: "Level 5: Stroke Improvers",
    ageRange: "7-10 years",
    description:
      "Improving stroke efficiency and introducing butterfly. Children work on endurance, technique refinement, and learn competitive swimming fundamentals.",
    skills: [
      "Efficient freestyle, backstroke, and breaststroke",
      "Introduction to butterfly kick and arm movements",
      "Flip turns and racing starts",
      "Swimming 50 meters continuously",
      "Basic competitive swimming rules",
    ],
    prerequisites: "Completion of Level 4 or equivalent skills assessment",
    duration: "12 weeks",
    nextLevel: "Level 6: Swim Team Prep",
    image: placeholder,
  },
]

// Mock data for FAQs
const faqs = [
  {
    id: "1",
    question: "What should my child bring to their first swimming lesson?",
    answer:
      "Your child should bring a swimsuit, towel, swim cap (optional but recommended), goggles (optional), and flip-flops or pool shoes. We also recommend bringing a water bottle and a small snack for after the lesson. Please ensure all items are labeled with your child's name.",
    category: "Getting Started",
  },
  {
    id: "2",
    question: "How do I know which level is right for my child?",
    answer:
      "If your child is new to our program, we recommend scheduling a skills assessment. Our instructors will evaluate your child's current abilities and recommend the appropriate level. You can book an assessment through the 'Assessments' section of your parent dashboard.",
    category: "Enrollment",
  },
  {
    id: "3",
    question: "What is your make-up class policy?",
    answer:
      "If you need to miss a class, please notify us at least 24 hours in advance through the parent dashboard. You are entitled to two make-up classes per session, which must be scheduled within the same session period. Make-up classes are subject to availability.",
    category: "Policies",
  },
  {
    id: "4",
    question: "How long does it typically take to advance to the next level?",
    answer:
      "Most levels are designed as 8-12 week programs, but advancement depends on individual progress. Some children may need to repeat a level to fully master the required skills. Our instructors provide regular progress updates and will recommend advancement when your child is ready.",
    category: "Progress",
  },
  {
    id: "5",
    question: "Is parent participation required during lessons?",
    answer:
      "Parent participation is required for our Parent & Tot classes (ages 6 months to 3 years). For all other levels, parents are welcome to observe from the designated viewing area but do not participate in the lessons directly.",
    category: "Classes",
  },
  {
    id: "6",
    question: "What safety measures are in place during swimming lessons?",
    answer:
      "All our instructors are certified in water safety and CPR. We maintain strict instructor-to-student ratios (1:3 for beginners, 1:5 for intermediate, 1:8 for advanced). Lifeguards are always on duty during lessons, and we conduct regular safety drills. Our facilities are inspected daily for safety compliance.",
    category: "Safety",
  },
  {
    id: "7",
    question: "How do I track my child's progress?",
    answer:
      "You can track your child's progress through the parent dashboard. Instructors update skill achievements after each class, and you'll receive a comprehensive progress report at the midpoint and end of each session. You can also schedule a brief meeting with your child's instructor if you have specific questions.",
    category: "Progress",
  },
  {
    id: "8",
    question: "What happens if my child is afraid of the water?",
    answer:
      "Fear of water is common and our instructors are trained to work with anxious swimmers. We use a gentle, progressive approach that builds confidence gradually. We never force children into uncomfortable situations. Please inform your instructor about specific concerns so they can tailor their approach accordingly.",
    category: "Classes",
  },
]

// Mock data for additional resources
const additionalResources = [
  {
    id: "1",
    title: "American Red Cross - Water Safety",
    description: "Comprehensive water safety resources and tips for parents and children",
    url: "https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/water-safety.html",
    category: "Safety",
    external: true,
  },
  {
    id: "2",
    title: "USA Swimming",
    description: "Official organization for competitive swimming in the United States",
    url: "https://www.usaswimming.org/",
    category: "Organizations",
    external: true,
  },
  {
    id: "3",
    title: "Swimming World Magazine",
    description: "News, techniques, and articles about swimming",
    url: "https://www.swimmingworldmagazine.com/",
    category: "News & Articles",
    external: true,
  },
  {
    id: "4",
    title: "CDC Healthy Swimming",
    description: "Guidelines for healthy and safe swimming practices",
    url: "https://www.cdc.gov/healthywater/swimming/",
    category: "Health & Safety",
    external: true,
  },
  {
    id: "5",
    title: "Swimming Technique Videos",
    description: "Our curated playlist of advanced swimming technique videos",
    url: "#",
    category: "Techniques",
    external: false,
  },
  {
    id: "6",
    title: "Local Swimming Events Calendar",
    description: "Upcoming swimming competitions and events in your area",
    url: "#",
    category: "Events",
    external: false,
  },
]

export default function InstructionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [videoFilter, setVideoFilter] = useState("All")
  const [readingFilter, setReadingFilter] = useState("All")
  const [faqFilter, setFaqFilter] = useState("All")
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentProgress, setCurrentProgress] = useState(0)


  const videoCategories = ["All", "Getting Started", "Techniques", "Safety", "Platform Guide"]
  const videoLevels = ["All Levels", "Beginner", "Intermediate", "Advanced"]
  const readingCategories = ["All", "Guides", "Reference", "Health"]
  const faqCategories = ["All", "Getting Started", "Enrollment", "Policies", "Progress", "Classes", "Safety"]

  const filteredVideos = videoTutorials.filter(
    (video) =>
      (videoFilter === "All" || video.category === videoFilter) &&
      (searchQuery === "" ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredReadingMaterials = readingMaterials.filter(
    (material) =>
      (readingFilter === "All" || material.category === readingFilter) &&
      (searchQuery === "" ||
        material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredFaqs = faqs.filter(
    (faq) =>
      (faqFilter === "All" || faq.category === faqFilter) &&
      (searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handlePlayVideo = (video) => {
    setSelectedVideo(video)
    setIsVideoDialogOpen(true)
    setIsPlaying(true)
    setCurrentProgress(0)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  // Simulate video progress
  const handleProgressUpdate = () => {
    if (isPlaying && currentProgress < 100) {
      const interval = setInterval(() => {
        setCurrentProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsPlaying(false)
            return 100
          }
          return prev + 1
        })
      }, 300) // Update every 300ms for demo purposes

      return () => clearInterval(interval)
    }
  }

  // Call the progress update function when isPlaying changes
  React.useEffect(() => {
    const cleanup = handleProgressUpdate()
    return cleanup
  }, [isPlaying])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Instructions & Resources</h1>
          <p className="text-gray-600">
            Access comprehensive guides, tutorials, and resources for our swimming program
          </p>
        </div>

        {/* Global Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search all resources..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-8">
            <TabsTrigger value="videos" className="text-xs sm:text-sm md:text-base data-[state=active]:bg-white data-[state=active]:text-black">
              <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Video</span> Tutorials
            </TabsTrigger>
            <TabsTrigger value="reading" className="text-xs sm:text-sm md:text-base data-[state=active]:bg-white data-[state=active]:text-black">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Reading</span> Materials
            </TabsTrigger>
            <TabsTrigger value="levels" className="text-xs sm:text-sm md:text-base data-[state=active]:bg-white data-[state=active]:text-black">
              <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Level</span> Guides
            </TabsTrigger>
            <TabsTrigger value="faq" className="text-xs sm:text-sm md:text-base data-[state=active]:bg-white data-[state=active]:text-black">
              <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="resources" className="text-xs sm:text-sm md:text-base data-[state=active]:bg-white data-[state=active]:text-black">
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Additional</span> Resources
            </TabsTrigger>
          </TabsList>

          {/* Video Tutorials Tab */}
          <TabsContent value="videos">
            <Card className="border-0 shadow-lg mb-8 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Video Tutorials</CardTitle>
                <CardDescription>Watch instructional videos on swimming techniques and platform usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <Select value={videoFilter} onValueChange={setVideoFilter}>
                      <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {videoCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {filteredVideos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVideos.map((video) => (
                      <Card
                        key={video.id}
                        className="border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all overflow-hidden"
                      >
                        <div className="relative">
                          <img
                            src={video.thumbnail || placeholder}
                            alt={video.title}
                            className="w-full h-[180px] object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Button
                              className="bg-blue-600 hover:bg-blue-700 rounded-full w-12 h-12 flex items-center justify-center"
                              onClick={() => handlePlayVideo(video)}
                            >
                              <Play className="w-5 h-5" />
                            </Button>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3
                            className="font-semibold text-gray-900 mb-1 cursor-pointer hover:text-blue-600"
                            onClick={() => handlePlayVideo(video)}
                          >
                            {video.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                            <Badge variant="outline" className="text-xs">
                              {video.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {video.level}
                            </Badge>
                            <span className="flex items-center">
                              <Eye className="w-3 h-3 mr-1" />
                              {video.views}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Video className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">No videos found</p>
                    <p className="text-sm">Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reading Materials Tab */}
          <TabsContent value="reading">
            <Card className="border-0 shadow-lg mb-8 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Reading Materials</CardTitle>
                <CardDescription>Access guides, manuals, and articles about swimming and our platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <Select value={readingFilter} onValueChange={setReadingFilter}>
                      <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {readingCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredReadingMaterials.length > 0 ? (
                    filteredReadingMaterials.map((material) => (
                      <Card
                        key={material.id}
                        className="border border-gray-200 hover:border-blue-200 transition-colors"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <FileText className="w-8 h-8 text-blue-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 mb-1">{material.title}</h3>
                              <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                                <span className="flex items-center">
                                  <FileText className="w-3 h-3 mr-1" />
                                  {material.fileType.toUpperCase()} • {material.fileSize}
                                </span>
                                <span className="flex items-center">
                                  <BookOpen className="w-3 h-3 mr-1" />
                                  {material.pages} pages
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {material.category}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-blue-600 border-blue-200 hover:bg-blue-50"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600 border-green-200 hover:bg-green-50 ml-2"
                              >
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium mb-2">No reading materials found</p>
                      <p className="text-sm">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Level Guides Tab */}
          <TabsContent value="levels">
            <Card className="border-0 shadow-lg mb-8 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Swimming Level Guides</CardTitle>
                <CardDescription>
                  Detailed information about each swimming level, skills, and requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {levelGuides.map((level) => (
                    <Card
                      key={level.id}
                      className="border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all"
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-1/4 flex-shrink-0">
                            <img
                              src={level.image || "/placeholder.svg"}
                              alt={level.level}
                              className="w-full h-auto rounded-lg shadow-md"
                            />
                            <div className="mt-4 space-y-2">
                              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                <h4 className="text-sm font-medium text-blue-800 mb-1">Age Range</h4>
                                <p className="text-sm text-blue-700">{level.ageRange}</p>
                              </div>
                              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                <h4 className="text-sm font-medium text-green-800 mb-1">Duration</h4>
                                <p className="text-sm text-green-700">{level.duration}</p>
                              </div>
                            </div>
                          </div>
                          <div className="md:w-3/4">
                            <h3 className="text-xl font-bold text-blue-800 mb-2">{level.level}</h3>
                            <p className="text-gray-700 mb-4">{level.description}</p>

                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                                <Star className="w-4 h-4 text-yellow-500 mr-2" />
                                Key Skills
                              </h4>
                              <ul className="list-disc pl-5 space-y-1">
                                {level.skills.map((skill, index) => (
                                  <li key={index} className="text-gray-700">
                                    {skill}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-900 mb-2">Prerequisites</h4>
                              <p className="text-gray-700">{level.prerequisites}</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                              <h4 className="font-semibold text-gray-900 mb-2">Next Level</h4>
                              <div className="flex items-center">
                                <ChevronRight className="w-5 h-5 text-blue-500 mr-2" />
                                <span className="text-blue-600">{level.nextLevel}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <Card className="border-0 shadow-lg mb-8 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to common questions about our swimming program</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <Select value={faqFilter} onValueChange={setFaqFilter}>
                      <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue placeholder="Filter by topic" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {faqCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-start gap-3 text-left">
                            <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                              <Badge variant="outline" className="text-xs mt-1">
                                {faq.category}
                              </Badge>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-8 pr-4 text-gray-700">{faq.answer}</div>
                        </AccordionContent>
                      </AccordionItem>
                    ))
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <HelpCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium mb-2">No FAQs found</p>
                      <p className="text-sm">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Additional Resources Tab */}
          <TabsContent value="resources">
            <Card className="border-0 shadow-lg mb-8 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Additional Resources</CardTitle>
                <CardDescription>
                  Explore helpful external resources and links related to swimming and water safety
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {additionalResources.map((resource) => (
                    <Card
                      key={resource.id}
                      className="border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            {resource.external ? (
                              <ExternalLink className="w-6 h-6 text-blue-500" />
                            ) : (
                              <LinkIcon className="w-6 h-6 text-green-500" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1 flex items-center">
                              {resource.title}
                              {resource.external && (
                                <ArrowUpRight className="w-3 h-3 text-gray-400 ml-1 inline-block" />
                              )}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {resource.category}
                              </Badge>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                asChild
                              >
                                <a
                                  href={resource.url}
                                  target={resource.external ? "_blank" : "_self"}
                                  rel={resource.external ? "noopener noreferrer" : ""}
                                >
                                  Visit
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Video Player Dialog */}
        <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
          <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-black">
            <div className="relative">
              {/* Video Player */}
              <div className="w-full aspect-video bg-black flex items-center justify-center">
                <Image
                  src={selectedVideo?.thumbnail || placeholder}
                  alt={selectedVideo?.title}
                  className="w-full h-full object-contain"
                />
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 rounded-full w-16 h-16 flex items-center justify-center"
                      onClick={togglePlayPause}
                    >
                      <Play className="w-6 h-6" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <div className="mb-2">
                  <Progress value={currentProgress} className="h-1 bg-gray-600" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={togglePlayPause}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleMute}>
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </Button>
                    <span className="text-white text-xs">
                      {Math.floor((currentProgress / 100) * Number.parseInt(selectedVideo?.duration || "0:00"))}s /{" "}
                      {selectedVideo?.duration}
                    </span>
                  </div>
                  <div>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                      <Maximize className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-4">
              <h2 className="text-xl font-semibold mb-1">{selectedVideo?.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{selectedVideo?.description}</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{selectedVideo?.category}</Badge>
                <Badge variant="outline">{selectedVideo?.level}</Badge>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
