import { useState } from "react"
import {
  FileText,
  Download,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  FileSignature,
  Shield,
  Calendar,
  File,
  FileIcon as FilePdf,
  FileImage,
  FileTextIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Mock data for documents
const uploadedDocuments = [
  {
    id: "1",
    title: "Swimming Class Schedule - Spring 2024",
    description: "Complete schedule for all swimming classes from March to June 2024",
    uploadDate: "2024-02-15",
    fileType: "pdf",
    fileSize: "1.2 MB",
    category: "Schedules",
    status: "active",
    url: "#",
  },
  {
    id: "2",
    title: "Parent Handbook",
    description: "Essential information for parents about swimming classes, policies, and procedures",
    uploadDate: "2024-01-10",
    fileType: "pdf",
    fileSize: "3.5 MB",
    category: "Handbooks",
    status: "active",
    url: "#",
  },
  {
    id: "3",
    title: "Pool Safety Guidelines",
    description: "Important safety guidelines for all swimming pool users",
    uploadDate: "2023-12-05",
    fileType: "pdf",
    fileSize: "850 KB",
    category: "Safety",
    status: "active",
    url: "#",
  },
  {
    id: "4",
    title: "Instructor Qualifications",
    description: "Information about our swimming instructors' certifications and qualifications",
    uploadDate: "2023-11-20",
    fileType: "pdf",
    fileSize: "1.8 MB",
    category: "Staff",
    status: "active",
    url: "#",
  },
  {
    id: "5",
    title: "Facility Map",
    description: "Map of the swimming facility including changing rooms, emergency exits, and meeting points",
    uploadDate: "2023-10-15",
    fileType: "jpg",
    fileSize: "2.3 MB",
    category: "Facility",
    status: "active",
    url: "#",
  },
]

const waivers = [
  {
    id: "1",
    title: "General Liability Waiver",
    description: "Standard liability waiver for all swimming class participants",
    required: true,
    lastUpdated: "2024-01-05",
    status: "signed",
    signedDate: "2024-01-10",
    expiryDate: "2025-01-10",
    url: "#",
  },
  {
    id: "2",
    title: "Medical Information Release",
    description: "Authorization to share medical information with instructors and emergency personnel",
    required: true,
    lastUpdated: "2023-12-15",
    status: "signed",
    signedDate: "2024-01-10",
    expiryDate: "2025-01-10",
    url: "#",
  },
  {
    id: "3",
    title: "Photo & Video Release",
    description: "Permission to use photos and videos of participants for promotional purposes",
    required: false,
    lastUpdated: "2023-11-20",
    status: "unsigned",
    signedDate: null,
    expiryDate: null,
    url: "#",
  },
  {
    id: "4",
    title: "COVID-19 Acknowledgment",
    description: "Acknowledgment of COVID-19 protocols and assumption of related risks",
    required: true,
    lastUpdated: "2024-02-01",
    status: "expired",
    signedDate: "2023-08-15",
    expiryDate: "2024-02-15",
    url: "#",
  },
]

const policies = [
  {
    id: "1",
    title: "Terms of Service",
    description: "General terms governing the use of our swimming class platform",
    lastUpdated: "2024-01-15",
    version: "3.2",
    url: "#",
  },
  {
    id: "2",
    title: "Privacy Policy",
    description: "How we collect, use, and protect your personal information",
    lastUpdated: "2023-12-10",
    version: "2.5",
    url: "#",
  },
  {
    id: "3",
    title: "Refund Policy",
    description: "Our policies regarding refunds for swimming classes and events",
    lastUpdated: "2023-11-05",
    version: "1.8",
    url: "#",
  },
  {
    id: "4",
    title: "Code of Conduct",
    description: "Expected behavior for all participants, parents, and staff",
    lastUpdated: "2023-10-20",
    version: "2.1",
    url: "#",
  },
]

const getFileIcon = (fileType) => {
  switch (fileType) {
    case "pdf":
      return <FilePdf className="w-8 h-8 text-red-500" />
    case "jpg":
    case "png":
    case "gif":
      return <FileImage className="w-8 h-8 text-blue-500" />
    case "doc":
    case "docx":
      return <FileTextIcon className="w-8 h-8 text-blue-700" />
    default:
      return <File className="w-8 h-8 text-gray-500" />
  }
}

const getStatusBadge = (status) => {
  switch (status) {
    case "signed":
      return (
        <Badge className="bg-green-100 text-green-800 border border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" /> Signed
        </Badge>
      )
    case "unsigned":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200">
          <AlertCircle className="w-3 h-3 mr-1" /> Action Required
        </Badge>
      )
    case "expired":
      return (
        <Badge className="bg-red-100 text-red-800 border border-red-200">
          <Clock className="w-3 h-3 mr-1" /> Expired
        </Badge>
      )
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 border border-gray-200">
          <FileText className="w-3 h-3 mr-1" /> Document
        </Badge>
      )
  }
}

export default function LegalDocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [isViewDocumentOpen, setIsViewDocumentOpen] = useState(false)
  const [isSignWaiverOpen, setIsSignWaiverOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const categories = ["All", "Schedules", "Handbooks", "Safety", "Staff", "Facility"]

  const filteredDocuments = uploadedDocuments.filter(
    (doc) =>
      (categoryFilter === "All" || doc.category === categoryFilter) &&
      (doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleViewDocument = (document) => {
    setSelectedDocument(document)
    setIsViewDocumentOpen(true)
  }

  const handleSignWaiver = (waiver) => {
    setSelectedDocument(waiver)
    setIsSignWaiverOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl ">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal & Documents</h1>
          <p className="text-gray-600">Access and manage all legal documents related to your swimming classes</p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="uploaded" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="uploaded" className="text-sm sm:text-base data-[state=active]:bg-white data-[state=active]:text-black">
              <FileText className="w-4 h-4 mr-2" />
              Uploaded Documents
            </TabsTrigger>
            <TabsTrigger value="waivers" className="text-sm sm:text-base data-[state=active]:bg-white data-[state=active]:text-black">
              <FileSignature className="w-4 h-4 mr-2" />
              Waivers & Agreements
            </TabsTrigger>
            <TabsTrigger value="policies" className="text-sm sm:text-base data-[state=active]:bg-white data-[state=active]:text-black">
              <Shield className="w-4 h-4 mr-2" />
              Terms & Policies
            </TabsTrigger>
          </TabsList>

          {/* Uploaded Documents Tab */}
          <TabsContent value="uploaded">
            <Card className="border-0 shadow-lg mb-8 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Uploaded Documents</CardTitle>
                <CardDescription>Access important documents uploaded by our administrators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1 bg-white">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search documents..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredDocuments.length > 0 ? (
                    filteredDocuments.map((document) => (
                      <Card
                        key={document.id}
                        className="border border-gray-200 hover:border-blue-200 transition-colors bg-white"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">{getFileIcon(document.fileType)}</div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 mb-1">{document.title}</h3>
                              <p className="text-sm text-gray-600 mb-2">{document.description}</p>
                              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                                <span className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {new Date(document.uploadDate).toLocaleDateString()}
                                </span>
                                <span className="flex items-center">
                                  <File className="w-3 h-3 mr-1" />
                                  {document.fileType.toUpperCase()} • {document.fileSize}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {document.category}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex-shrink-0 flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                onClick={() => handleViewDocument(document)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600 border-green-200 hover:bg-green-50"
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
                      <p className="text-lg font-medium mb-2">No documents found</p>
                      <p className="text-sm">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Waivers & Agreements Tab */}
          <TabsContent value="waivers">
            <Card className="border-0 shadow-lg mb-8 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Waivers & Agreements</CardTitle>
                <CardDescription>Review and sign required waivers and agreements for swimming classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {waivers.map((waiver) => (
                    <Card
                      key={waiver.id}
                      className={`border ${
                        waiver.status === "unsigned" && waiver.required
                          ? "border-yellow-300 bg-yellow-50"
                          : waiver.status === "expired"
                            ? "border-red-200 bg-red-50"
                            : "border-gray-200"
                      } hover:shadow-md transition-shadow`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <FileSignature
                              className={`w-8 h-8 ${
                                waiver.status === "unsigned" && waiver.required
                                  ? "text-yellow-500"
                                  : waiver.status === "expired"
                                    ? "text-red-500"
                                    : "text-blue-500"
                              }`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{waiver.title}</h3>
                              {waiver.required && (
                                <Badge className="bg-blue-100 text-blue-800 border border-blue-200">Required</Badge>
                              )}
                              {getStatusBadge(waiver.status)}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{waiver.description}</p>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                Last Updated: {new Date(waiver.lastUpdated).toLocaleDateString()}
                              </span>
                              {waiver.status === "signed" && (
                                <>
                                  <span className="flex items-center">
                                    <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                                    Signed: {new Date(waiver.signedDate).toLocaleDateString()}
                                  </span>
                                  <span className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    Expires: {new Date(waiver.expiryDate).toLocaleDateString()}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex-shrink-0 flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-blue-600 border-blue-200 hover:bg-blue-50"
                              onClick={() => handleViewDocument(waiver)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            {waiver.status === "unsigned" || waiver.status === "expired" ? (
                              <Button
                                size="sm"
                                className={`${
                                  waiver.status === "expired"
                                    ? "bg-red-600 hover:bg-red-700"
                                    : "bg-yellow-600 hover:bg-yellow-700"
                                } text-white`}
                                onClick={() => handleSignWaiver(waiver)}
                              >
                                <FileSignature className="w-4 h-4 mr-1" />
                                {waiver.status === "expired" ? "Renew" : "Sign"}
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600 border-green-200 hover:bg-green-50"
                              >
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Terms & Policies Tab */}
          <TabsContent value="policies">
            <Card className="border-0 shadow-lg mb-8 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Terms & Policies</CardTitle>
                <CardDescription>
                  Review our terms of service, privacy policies, and other important guidelines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {policies.map((policy) => (
                    <AccordionItem key={policy.id} value={policy.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3 text-left">
                          <Shield className="w-5 h-5 text-blue-600" />
                          <div>
                            <h3 className="font-semibold text-gray-900">{policy.title}</h3>
                            <p className="text-xs text-gray-500">
                              Version {policy.version} • Last updated{" "}
                              {new Date(policy.lastUpdated).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-2 pb-4">
                          <p className="text-sm text-gray-600 mb-4">{policy.description}</p>
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                            <p className="text-sm text-gray-700 mb-2">
                              This is a summary of our {policy.title.toLowerCase()}. For the full document, please click
                              the button below.
                            </p>
                            <p className="text-sm text-gray-700">
                              By using our platform, you agree to abide by these terms and policies.
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <Button
                              variant="outline"
                              className="text-blue-600 border-blue-200 hover:bg-blue-50"
                              onClick={() => handleViewDocument(policy)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Full Document
                            </Button>
                            <Button variant="outline" className="text-gray-600 border-gray-200 hover:bg-gray-50">
                              <Download className="w-4 h-4 mr-2" />
                              Download PDF
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* View Document Dialog */}
        <Dialog open={isViewDocumentOpen} onOpenChange={setIsViewDocumentOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedDocument?.title}</DialogTitle>
              <DialogDescription>
                {selectedDocument?.description}
                {selectedDocument?.version && <span> • Version {selectedDocument.version}</span>}
              </DialogDescription>
            </DialogHeader>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Document preview would appear here</p>
                <p className="text-sm text-gray-400 mt-2">This is a placeholder for the actual document content</p>
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between">
              <div className="text-xs text-gray-500 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {selectedDocument?.uploadDate || selectedDocument?.lastUpdated
                  ? `Last updated: ${new Date(
                      selectedDocument?.uploadDate || selectedDocument?.lastUpdated,
                    ).toLocaleDateString()}`
                  : ""}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setIsViewDocumentOpen(false)}>
                  Close
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Sign Waiver Dialog */}
        <Dialog open={isSignWaiverOpen} onOpenChange={setIsSignWaiverOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Sign {selectedDocument?.title}</DialogTitle>
              <DialogDescription>Please review the document carefully before signing</DialogDescription>
            </DialogHeader>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-h-[300px] overflow-y-auto">
              <h3 className="font-semibold mb-3">Sample Waiver Content</h3>
              <p className="text-sm text-gray-700 mb-3">
                This is a placeholder for the actual waiver content. In a real application, the full legal text would
                appear here for the user to review before signing.
              </p>
              <p className="text-sm text-gray-700 mb-3">
                The waiver would typically include sections covering assumption of risk, release of liability,
                indemnification, medical authorization, and other legal provisions relevant to swimming classes.
              </p>
              <p className="text-sm text-gray-700">
                By signing this document, you acknowledge that you have read and understood all terms and conditions,
                and agree to be bound by them.
              </p>
            </div>
            <div className="flex items-start space-x-2 mt-2">
              <Checkbox id="terms" checked={acceptedTerms} onCheckedChange={() => setAcceptedTerms(!acceptedTerms)} />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I have read and agree to the terms and conditions
                </Label>
                <p className="text-xs text-gray-500">This electronic signature is legally binding.</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSignWaiverOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" disabled={!acceptedTerms}>
                <FileSignature className="w-4 h-4 mr-2" />
                Sign Document
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
