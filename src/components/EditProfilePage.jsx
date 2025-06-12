import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountSettings } from "@/utils/EditProfile/account-settings"
import { NotificationSettings } from "@/utils/EditProfile/notification-settings"
import { SecuritySettings } from "@/utils/EditProfile/security-settings"
import { SettingsHeader } from "@/utils/EditProfile/settings-header"
import { AccessibilitySettings } from "@/utils/EditProfile/accessibility-settings"


export default function Profile({ session }) {
  return (
    <div className="container max-w-screen-lg py-10">
      <SettingsHeader />
      <Tabs defaultValue="account" className="mt-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="account" className="data-[state=active]:bg-black data-[state=active]:text-white">Account</TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-black data-[state=active]:text-white">Notifications</TabsTrigger>
          <TabsTrigger value="accessibility" className="data-[state=active]:bg-black data-[state=active]:text-white">Accessibility</TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-black data-[state=active]:text-white">Security</TabsTrigger>
        </TabsList>
        <div className="mt-6">
          <TabsContent value="account" className="m-0">
            <AccountSettings session={session} />
          </TabsContent>
          <TabsContent value="notifications" className="m-0">
            <NotificationSettings />
          </TabsContent>
          <TabsContent value="accessibility" className="m-0">
            <AccessibilitySettings />
          </TabsContent>
          <TabsContent value="security" className="m-0">
            <SecuritySettings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
