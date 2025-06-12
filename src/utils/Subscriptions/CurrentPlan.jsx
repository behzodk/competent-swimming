import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, CreditCard, Clock, User } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { supabase } from '@/lib/supabaseClient'

const CurrentPlan = ({ subscription, updateSubscriptionStatus }) => {
  const [instructorName, setInstructorName] = useState('');
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  // Fetch instructor name
  useEffect(() => {
    async function loadInstructor() {
      if (!subscription?.instructor) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', subscription.instructor)
        .single();
      if (!error && data) {
        setInstructorName(`${data.first_name} ${data.last_name}`);
      }
    }
    loadInstructor();
  }, [subscription]);

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  if (!subscription) {
    return (
      <div className="p-6 text-gray-600">
        You don't have an active subscription right now.
      </div>
    );
  }

  const nextBilling = subscription.end_date
    ? formatDate(subscription.end_date)
    : formatDate(
        new Date(
          new Date(subscription.start_date).setMonth(
            new Date(subscription.start_date).getMonth() + 1
          )
        )
      );

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">Current Plan</CardTitle>
              <CardDescription>Your subscription details and usage</CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-800">
              {subscription.status.charAt(0).toUpperCase() +
                subscription.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {subscription.plan.charAt(0).toUpperCase() +
                  subscription.plan.slice(1)}{' '}
                Plan
              </h3>
              <p className="text-gray-600 mt-1">
                £{subscription.price.toFixed(2)}/month
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button variant="outline" className="mr-3">
                Upgrade Plan
              </Button>
              <Button
                variant="destructive"
                onClick={() => setShowCancelDialog(true)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Cancel Plan
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Next billing date
                </p>
                <p className="text-sm text-gray-600">{nextBilling}</p>
              </div>
            </div>
            <div className="flex items-start">
              <CreditCard className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Payment method
                </p>
                <p className="text-sm text-gray-600">Visa ending in 4242</p>
                <Button variant="link" className="p-0 h-auto text-sm">
                  Update
                </Button>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Started on</p>
                <p className="text-sm text-gray-600">
                  {formatDate(subscription.start_date)}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <User className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Instructor</p>
                <p className="text-sm text-gray-600">
                  {instructorName || '—'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <DialogContent className="sm:max-w-md bg-white shadow-lg rounded-lg">
            <DialogHeader>
              <DialogTitle>Cancel Subscription</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel your subscription? You'll still have
                access until the end of your current billing period.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                Keep Subscription
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  updateSubscriptionStatus();
                  setShowCancelDialog(false);
                }}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Yes, Cancel Subscription
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </>
  )
}

export default CurrentPlan