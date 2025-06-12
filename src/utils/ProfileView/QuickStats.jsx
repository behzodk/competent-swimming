import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Lock } from 'lucide-react'
import { LockedSection } from './LockedSection'

export const QuickStats = ({ selectedChild2, earnedBadges, skills, filteredSkills }) => {
  return (
    <Card className="border-0 shadow-md bg-white">
        <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            Quick Stats
            {!selectedChild2?.has_subscription && <Lock className="w-4 h-4 text-orange-500 ml-auto" />}
        </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
        {selectedChild2?.has_subscription ? (
            <>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">{earnedBadges?.length}</div>
                <p className="text-sm text-gray-600">Achievements Earned</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">{skills?.find((skill) => skill?.category === "level")?.level}</div>
                <p className="text-sm text-gray-600">Current Level</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                {Math.round(
                    filteredSkills?.reduce((acc, skill) => acc + skill?.level, 0) /
                    filteredSkills?.length,
                )}
                %
                </div>
                <p className="text-sm text-gray-600">Average Skill</p>
            </div>
            </>
        ) : (
            <LockedSection
            title="Stats Locked"
            description="Subscribe to view detailed statistics and performance metrics"
            icon={BarChart3}
            />
        )}
        </CardContent>
    </Card>
  )
}

export default QuickStats