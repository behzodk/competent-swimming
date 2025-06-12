import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Lock } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { LockedSection } from './LockedSection'

export const SkillsProgress = ({ selectedChild2, filteredSkills }) => {
  return (
    <Card className="border-0 shadow-md bg-white">
    <CardHeader className="pb-4">
      <CardTitle className="flex items-center gap-2 text-xl">
        <TrendingUp className="w-5 h-5 text-green-600" />
        Skills Progress
        {!selectedChild2?.has_subscription && <Lock className="w-4 h-4 text-orange-500 ml-auto" />}
      </CardTitle>
    </CardHeader>
    <CardContent>
      {selectedChild2?.has_subscription ? (
        <div className="space-y-4">
          {filteredSkills?.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">{skill?.category}</span>
                <span className="text-sm font-semibold text-gray-600">{skill?.level}%</span>
              </div>
              <Progress value={skill?.level} className="h-2 bg-green-100" />
            </div>
          ))}
        </div>
      ) : (
        <LockedSection
          title="Progress Tracking Locked"
          description="Subscribe to track detailed swimming skill progress and improvements"
          icon={TrendingUp}
        />
      )}
    </CardContent>
    </Card>
  )
}

export default SkillsProgress