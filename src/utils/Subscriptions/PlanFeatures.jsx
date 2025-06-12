import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PlanFeatures = () => {
  return (
    <div>
        <Card>
            <CardHeader>
            <CardTitle className="text-xl">Plan Features</CardTitle>
            <CardDescription>What's included</CardDescription>
            </CardHeader>
            <CardContent>
            <ul className="space-y-3">
                {[
                'Personalized training plan',
                'Access to technique video library',
                'Nutrition and fitness guide',
                'Monthly progress assessment',
                'Priority booking for pool lanes',
                ].map((feature) => (
                <li key={feature} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                </li>
                ))}
            </ul>
            </CardContent>
            <CardFooter className="pt-4">
            <Button variant="outline" className="w-full">
                Compare All Plans
            </Button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default PlanFeatures