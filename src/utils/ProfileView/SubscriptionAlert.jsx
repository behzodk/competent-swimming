import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CreditCard, AlertCircle } from "lucide-react"

export const SubscriptionAlert = ({ selectedChild2 }) => {
    if (selectedChild2?.has_subscription) return null

    return (
      <Alert className="mb-6 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 shadow-md">
        <AlertCircle className="h-5 w-5 text-orange-600" />
        <AlertDescription className="text-orange-900">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="font-semibold text-lg mb-1">Subscription Required</div>
              <span className="text-sm">
                <strong>{selectedChild2?.first_name} {selectedChild2?.last_name}</strong> needs an active subscription to access swimming classes, track
                progress, view achievements, and unlock all features.
              </span>
            </div>
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white shadow-md">
              <CreditCard className="w-4 h-4 mr-2" />
              Get Subscription
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    )
  }