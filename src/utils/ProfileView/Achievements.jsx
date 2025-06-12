import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Lock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { LockedSection } from './LockedSection'

export const Achievements = ({ selectedChild2, earnedBadges }) => {
  return (
    <Card className="border-0 shadow-md bg-white">
        <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Recent Achievements
            {!selectedChild2?.has_subscription && <Lock className="w-4 h-4 text-orange-500 ml-auto" />}
        </CardTitle>
        </CardHeader>
        <CardContent>
        {selectedChild2?.has_subscription ? (
            earnedBadges?.length > 0 ? (
            <div className="space-y-3">
                {earnedBadges?.map((achievement, index) => (
                <div
                    key={index}
                    className="flex items-center gap-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                >
                    <div className="text-2xl">{achievement.emoji}</div>
                    <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{new Date(achievement.date_earned_or_estimated).toLocaleDateString()}</p>
                    </div>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    New
                    </Badge>
                </div>
                ))}
            </div>
            ) : (
            <div className="text-center py-8 text-gray-500">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">No Achievements Yet</p>
                <p className="text-sm">Start swimming classes to earn achievements</p>
            </div>
            )
        ) : (
            <LockedSection
            title="Achievements Locked"
            description="Subscribe to track and celebrate your child's swimming milestones"
            icon={Trophy}
            />
        )}
        </CardContent>
    </Card>
  )
}

export default Achievements