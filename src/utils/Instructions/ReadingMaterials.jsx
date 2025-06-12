import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Filter, FileText, BookOpen, Download, Eye, Search } from 'lucide-react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'




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

const ReadingMaterials = () => {
  const [readingFilter, setReadingFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const readingCategories = ["All", "Guides", "Reference", "Health"]
  const filteredReadingMaterials = readingMaterials.filter(
        (material) =>
        (readingFilter === "All" || material.category === readingFilter) &&
        (searchQuery === "" ||
            material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            material.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )
  return (
    <div>
        <Card className="border-0 shadow-lg mb-8 bg-white">
            <CardHeader className="pb-4">
            <CardTitle className="text-xl">Reading Materials</CardTitle>
            <CardDescription>Access guides, manuals, and articles about swimming and our platform</CardDescription>
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
    </div>
  )
}

export default ReadingMaterials