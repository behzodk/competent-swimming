import { Button } from "@/components/ui/button"
import { CreditCard, Lock } from "lucide-react"

export const LockedSection = ({ title, description, icon: Icon }) => (
    <div className="text-center py-12 text-gray-500">
      <div className="relative inline-block mb-4">
        <Icon className="w-16 h-16 text-gray-300" />
        <div className="absolute -bottom-1 -right-1 bg-orange-500 text-white rounded-full p-1.5">
          <Lock className="w-3 h-3" />
        </div>
      </div>
      <p className="text-lg font-medium mb-2 text-gray-700">{title}</p>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
        <CreditCard className="w-4 h-4 mr-2" />
        Unlock with Subscription
      </Button>
    </div>
)