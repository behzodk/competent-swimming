import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'
import { LockedSection } from './LockedSection'

export const CurrentClassInfo = ({ selectedChild2, skills, levels, instructor }) => {
  return (
    <Card className="border-0 shadow-md bg-white">
        <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
            <Calendar className="w-5 h-5 text-blue-600" />
            Current Class Details
        </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
        {selectedChild2?.has_subscription ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
                <div>
                <label className="text-sm font-medium text-gray-500">Class Name</label>
                <p className="text-lg font-semibold text-gray-900">{levels[skills?.find((skill) => skill?.category === "level")?.level]}</p>
                </div>
                <div>
                <label className="text-sm font-medium text-gray-500">Instructor</label>
                <p className="text-lg font-semibold text-gray-900">{instructor?.first_name} {instructor?.last_name}</p>
                </div>
            </div>
            <div className="space-y-3">
                <div>
                <label className="text-sm font-medium text-gray-500">Schedule</label>
                <p className="text-lg font-semibold text-gray-900">{selectedChild2?.classTime}</p>
                </div>
                <div>
                <label className="text-sm font-medium text-gray-500">Next Level</label>
                <p className="text-lg font-semibold text-gray-900">{levels[skills?.find((skill) => skill?.category === "level")?.level + 1]}</p>
                </div>
            </div>
            </div>
        ) : (
            <LockedSection
            title="Class Details Locked"
            description="Subscribe to view class information and enroll in swimming lessons"
            icon={Calendar}
            />
        )}
        </CardContent>
    </Card>

  )
}

export default CurrentClassInfo