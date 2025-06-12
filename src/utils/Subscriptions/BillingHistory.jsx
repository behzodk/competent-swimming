import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, CreditCard } from 'lucide-react'

const BillingHistory = () => {
  const invoices = [
    { id: 'INV-2025-006', date: 'June 15, 2025', amount: '£29.00', status: 'Paid' },
    { id: 'INV-2025-005', date: 'May 15, 2025', amount: '£29.00', status: 'Paid' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Payment History</CardTitle>
        <CardDescription>Your recent swimming class payments</CardDescription>
      </CardHeader>
      <CardContent>
        {invoices.length > 0 ? (
          <div className="space-y-4">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-100 p-2">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Monthly Swimming Classes</p>
                    <p className="text-sm text-gray-600">{inv.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-sm font-medium text-gray-900">{inv.amount}</p>
                  <Badge
                    className={`${
                      inv.status === 'Paid'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-yellow-50 text-yellow-700'
                    } px-2 py-1 rounded-full`}
                  >
                    {inv.status}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <span className="sr-only">Download</span>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="rounded-full bg-gray-100 p-3 w-12 h-12 mx-auto mb-4">
              <CreditCard className="h-6 w-6 text-gray-600 mx-auto" />
            </div>
            <p className="text-gray-600">No payment history available</p>
            <p className="text-sm text-gray-500 mt-1">Your payment history will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default BillingHistory