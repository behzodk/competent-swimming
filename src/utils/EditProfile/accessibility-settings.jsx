import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Accessibility, Eye, Ear, Hand, Brain, Heart } from "lucide-react"

export function AccessibilitySettings() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Accessibility className="h-5 w-5" />
            Disability Information
          </CardTitle>
          <CardDescription>
            Help us provide better accommodations by sharing information about your accessibility needs. This
            information is confidential and optional.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-medium">
              Do you have any disabilities or conditions that may require accommodations?
            </Label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="visual" />
                <Label htmlFor="visual" className="flex items-center gap-2 text-sm">
                  <Eye className="h-4 w-4" />
                  Visual impairment
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="hearing" />
                <Label htmlFor="hearing" className="flex items-center gap-2 text-sm">
                  <Ear className="h-4 w-4" />
                  Hearing impairment
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="mobility" />
                <Label htmlFor="mobility" className="flex items-center gap-2 text-sm">
                  <Hand className="h-4 w-4" />
                  Mobility impairment
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="cognitive" />
                <Label htmlFor="cognitive" className="flex items-center gap-2 text-sm">
                  <Brain className="h-4 w-4" />
                  Cognitive disability
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="chronic" />
                <Label htmlFor="chronic" className="flex items-center gap-2 text-sm">
                  <Heart className="h-4 w-4" />
                  Chronic illness
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="other" />
                <Label htmlFor="other" className="text-sm">
                  Other
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accommodations">Specific Accommodations Needed</Label>
            <Textarea
              id="accommodations"
              placeholder="Please describe any specific accommodations or assistive technologies you use..."
              className="min-h-[120px]"
            />
            <p className="text-xs text-muted-foreground">
              Examples: Screen reader compatibility, keyboard navigation, high contrast mode, extended time limits, etc.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergency-contact">Emergency Contact (Optional)</Label>
            <Input id="emergency-contact" placeholder="Name and phone number" />
            <p className="text-xs text-muted-foreground">
              Someone we can contact in case of emergency or if you need assistance.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Information</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
