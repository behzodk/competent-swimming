import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DeleteAccountDialog } from "@/utils/EditProfile/delete-account-dialog"
import { useProfile } from "@/contexts/ProfileContext"
import Loader from "../../components/Loader"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

export function AccountSettings({ session }) {
  const { profile } = useProfile()
  const [loading, setLoading] = useState(true)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [firstName, setFirstName] = useState(profile?.first_name)
  const [lastName, setLastName] = useState(profile?.last_name)
  const [phone, setPhone] = useState(profile?.phone)
  const [email, setEmail] = useState(session?.user?.email)

  useEffect(() => {
    setLoading(true)
    setFirstName(profile?.first_name)
    setLastName(profile?.last_name)
    setPhone(profile?.phone)
    setEmail(session?.user?.email)
    setLoading(false)
  }, [profile, session])

  return (
    loading ? <div className="flex justify-center items-center h-full">
      <Loader />
    </div> :
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="email">Email</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-white text-black">
                    <p>To change your email, please contact our support team</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input disabled id="email" type="email" placeholder="john.doe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="123-456-7890" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Save changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Once you delete your account, there is no going back. This action is not reversible.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowDeleteDialog(true)}>
            Delete Account
          </Button>
        </CardFooter>
      </Card>

      <DeleteAccountDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog} />
    </div>
  )
}
