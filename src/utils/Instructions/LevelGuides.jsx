import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ChevronRight, Star } from 'lucide-react'
import placeholder from '@/components/ui/image.png'

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

const LevelGuides = () => {
  return (
    <div>
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
    </div>
  )
}

export default LevelGuides