import React from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const NoSubscriptionText = () => {
    const navigate = useNavigate();
  return (
    <div>
                  <div className="bg-white rounded-lg shadow-lg p-12 text-center max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                No Active Subscription
              </h2>
              <p className="text-gray-600 mb-6">
                Start your swimming journey today with our flexible subscription plans
              </p>
            </div>
            <div className="space-y-4">
              <Button
                onClick={() => navigate('/pricing')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium"
              >
                View Subscription Plans
              </Button>
              <p className="text-sm text-gray-500">
                Choose from our Basic, Premium, or Elite swimming class packages
              </p>
            </div>
          </div>
    </div>
  )
}

export default NoSubscriptionText