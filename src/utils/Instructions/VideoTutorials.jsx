import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Filter, Play, Eye } from 'lucide-react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import placeholder from '@/components/ui/image.png'
import { Video, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'



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

const VideoTutorials = () => {
    const videoCategories = ["All", "Getting Started", "Techniques", "Safety", "Platform Guide"]
    const [videoFilter, setVideoFilter] = useState('All')
    const [searchQuery, setSearchQuery] = useState("")

   
    const filteredVideos = videoTutorials.filter(
        (video) =>
          (videoFilter === "All" || video.category === videoFilter) &&
          (searchQuery === "" ||
            video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            video.description.toLowerCase().includes(searchQuery.toLowerCase())),
      )

  return (
    <div>
        <Card className="border-0 shadow-lg mb-8 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Video Tutorials</CardTitle>
                <CardDescription>Watch instructional videos on swimming techniques and platform usage</CardDescription>
              </CardHeader>
              <div className="container mx-auto px-6">
                <div className="relative mb-8">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Search all resources..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
              </div>
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
    </div>
  )
}

export default VideoTutorials