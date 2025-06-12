import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Choose what emails you want to receive.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between py-4 border-b">
            <div className="space-y-1">
              <Label htmlFor="marketing" className="text-base font-medium">
                Marketing emails
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about new products, features, and more.
              </p>
            </div>
            <Switch 
              id="marketing" 
              defaultChecked 
              className="data-[state=checked]:bg-black data-[state=checked]:[&>span]:bg-white data-[state=unchecked]:[&>span]:bg-gray-400"
            />
          </div>

          <div className="flex items-start justify-between py-4 border-b">
            <div className="space-y-1">
              <Label htmlFor="social" className="text-base font-medium">
                Social notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications for new followers, likes, and comments.
              </p>
            </div>
            <Switch 
              id="social" 
              defaultChecked 
              className="data-[state=checked]:bg-black data-[state=checked]:[&>span]:bg-white data-[state=unchecked]:[&>span]:bg-gray-400"
            />
          </div>

          <div className="flex items-start justify-between py-4">
            <div className="space-y-1">
              <Label htmlFor="security" className="text-base font-medium">
                Security emails
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about your account activity and security.
              </p>
            </div>
            <Switch 
              id="security" 
              defaultChecked 
              className="data-[state=checked]:bg-black data-[state=checked]:[&>span]:bg-white data-[state=unchecked]:[&>span]:bg-gray-400"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Save preferences</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>Configure how and when you receive push notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="push-everything" className="flex flex-col space-y-1">
              <span>Everything</span>
              <span className="font-normal text-xs text-muted-foreground">Get notified for all activity.</span>
            </Label>
            <Switch id="push-everything" />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="push-mentions" className="flex flex-col space-y-1">
              <span>Mentions</span>
              <span className="font-normal text-xs text-muted-foreground">Get notified when you're mentioned.</span>
            </Label>
            <Switch id="push-mentions" defaultChecked />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="push-messages" className="flex flex-col space-y-1">
              <span>Direct messages</span>
              <span className="font-normal text-xs text-muted-foreground">
                Get notified when you receive a direct message.
              </span>
            </Label>
            <Switch id="push-messages" defaultChecked />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Save preferences</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
