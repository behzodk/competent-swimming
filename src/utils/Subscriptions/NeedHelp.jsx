import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Settings, AlertCircle, ArrowUpRight } from 'lucide-react'

const NeedHelp = () => {
  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                <Settings className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                <h4 className="text-sm font-medium">Account Settings</h4>
                <p className="text-sm text-gray-600">
                    Update your profile and preferences
                </p>
                <Button variant="link" size="sm">
                    Go to settings <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
                </div>
            </div>
            <Separator />
            <div className="flex items-start">
                <div className="bg-purple-100 rounded-full p-2 mr-3">
                <AlertCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                <h4 className="text-sm font-medium">Billing Questions</h4>
                <p className="text-sm text-gray-600">
                    Get help with billing and invoices
                </p>
                <Button variant="link" size="sm">
                    Contact billing support <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
                </div>
            </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default NeedHelp