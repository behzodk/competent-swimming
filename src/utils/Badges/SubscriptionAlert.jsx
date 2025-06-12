import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { CreditCard } from "lucide-react"

export const SubscriptionAlert = ({ selectedChild }) => {
    if (selectedChild.hasActiveSubscription) return null

    return (
      <Alert className="mb-8 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 shadow-lg">
        <AlertCircle className="h-5 w-5 text-orange-600" />
        <AlertDescription className="text-orange-900">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="font-semibold text-lg mb-1">Premium Feature - Subscription Required</div>
              <span className="text-sm">
                Unlock badges, achievements, and progress tracking for <strong>{selectedChild.name}</strong> with an
                active subscription.
              </span>
            </div>
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white shadow-md">
              <CreditCard className="w-4 h-4 mr-2" />
              Upgrade Now
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    )
  }