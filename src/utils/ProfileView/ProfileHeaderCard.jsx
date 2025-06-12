import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Target, Clock, Star, Lock } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

export const ProfileHeaderCard = ({ selectedChild2, skills, levels, filteredSkills }) => {
  return (
    <Card className="mb-8 overflow-hidden border-0 shadow-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage src={selectedChild2?.profileImage || "/placeholder.svg"} alt={selectedChild2?.first_name} />
                <AvatarFallback className="text-2xl bg-blue-500">
                {selectedChild2?.first_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full p-2">
                <Star className="w-4 h-4" />
            </div>
            {!selectedChild2?.has_subscription && (
                <div className="absolute -top-2 -left-2 bg-orange-500 text-white rounded-full p-1.5">
                <Lock className="w-4 h-4" />
                </div>
            )}
            </div>
            <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold mb-2">{selectedChild2?.first_name} {selectedChild2?.last_name}</h2>
            <p className="text-blue-100 mb-4">
                Age {new Date(selectedChild2?.date_of_birth).getFullYear() - new Date().getFullYear()} • Level {selectedChild2?.has_subscription ? skills?.find((skill) => skill?.category === "level")?.level : "--"}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                {/* check if there is subscription first */}
                {selectedChild2?.has_subscription ? (
                    <span className="text-sm">{levels[skills?.find((skill) => skill?.category === "level")?.level]}</span>
                ) : (
                    <span className="text-sm">--</span>
                )}
                </div>
                <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {selectedChild2?.has_subscription ? (
                    <span className="text-sm">{selectedChild2?.classTime}</span>
                ) : (
                    <span className="text-sm">--</span>
                )}
                </div>
            </div>
            {selectedChild2?.has_subscription ? (
                <Badge className="mt-3 bg-green-500 hover:bg-green-600">
                Active Subscription: {selectedChild2?.subscription_type}
                </Badge>
            ) : (
                <Badge className="mt-3 bg-orange-500 hover:bg-orange-600">
                <Lock className="w-3 h-3 mr-1" />
                Subscription Required
                </Badge>
            )}
            </div>
            <div className="text-center">
            <div className="text-3xl font-bold mb-1">
                {/* check if there is subscription first */}
                {selectedChild2?.has_subscription ? (
                `${Math.round(filteredSkills?.reduce((acc, skill) => acc + skill?.level, 0) / filteredSkills?.length)}%`
                ) : (
                "--"
                )}
            </div>
            <p className="text-blue-100 text-sm">Overall Progress</p>
            <Progress
                value={selectedChild2?.has_subscription ? selectedChild2?.skillProgress : 0}
                className="w-24 mt-2 bg-white"
            />
            {!selectedChild2?.has_subscription && (
                <p className="text-xs text-blue-200 mt-1">Requires subscription</p>
            )}
            </div>
        </div>
        </CardContent>
    </Card>
  )
}

export default ProfileHeaderCard