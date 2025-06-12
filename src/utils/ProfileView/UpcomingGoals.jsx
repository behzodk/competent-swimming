import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Award, Lock, Trophy } from 'lucide-react'
import { LockedSection } from './LockedSection'

export const UpcomingGoals = ({ selectedChild2, goalBadges }) => {
  return (
    <Card className="border-0 shadow-md bg-white">
    <CardHeader className="pb-4">
      <CardTitle className="flex items-center gap-2 text-xl">
        <Award className="w-5 h-5 text-purple-600" />
        Upcoming Goals
        {!selectedChild2?.has_subscription && <Lock className="w-4 h-4 text-orange-500 ml-auto" />}
      </CardTitle>
    </CardHeader>
    <CardContent>
      {selectedChild2?.has_subscription ? (
        <div className="space-y-3">
          {goalBadges?.length > 0 ? (
            goalBadges?.map((goal, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700 leading-relaxed">{goal.title}</p>
            </div>
          ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">No Goals Yet</p>
              <p className="text-sm">Start swimming classes to set goals</p>
            </div>
          )}
        </div>
      ) : (
        <LockedSection
          title="Goals Locked"
          description="Subscribe to set and track personalized swimming goals"
          icon={Award}
        />
      )}
    </CardContent>
  </Card>
  )
}

export default UpcomingGoals