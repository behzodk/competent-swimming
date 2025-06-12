import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ExternalLink, LinkIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'

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

const AdditionalResources = () => {
  return (
    <div>
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
    </div>
  )
}

export default AdditionalResources