import { Trophy, Lock, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"

export const LockedContent = () => (
    <div className="text-center py-20 text-gray-500">
      <div className="relative inline-block mb-6">
        <Trophy className="w-24 h-24 text-gray-300" />
        <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white rounded-full p-2">
          <Lock className="w-6 h-6" />
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-700">Badges & Achievements Locked</h3>
      <p className="text-lg text-gray-500 mb-6 max-w-md mx-auto">
        Subscribe to unlock achievement tracking, badges, and celebrate your child's swimming milestones.
      </p>
      <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg" size="lg">
        <CreditCard className="w-5 h-5 mr-2" />
        Get Full Access
      </Button>
    </div>
  )