import { profilesData } from "@/utils/Badges/ProfileData"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Lock } from "lucide-react"
import placeholder from "@/components/ui/image.png"

export const NoSubscriptionHeader = ({ selectedChildId, setSelectedChildId }) => {
  return (
    <div className="mb-8">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Badges & Achievements</h1>
        <p className="text-gray-600">Celebrate your child's swimming journey and milestones</p>
      </div>
    </div>
    </div>
  )
}

export default NoSubscriptionHeader