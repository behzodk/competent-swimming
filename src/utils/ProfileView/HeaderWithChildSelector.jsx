import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Plus, Lock } from 'lucide-react'

export const HeaderWithChildSelector = ({ children2, selectedChildId2, setSelectedChildId2, isAddChildDialogOpen, setIsAddChildDialogOpen, newChildForm, setNewChildForm, handleAddChild }) => {
  return (
    <div>
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Child Profile</h1>
              <p className="text-gray-600">Track your child's swimming progress and achievements</p>
            </div>
            <div className="flex items-center gap-3">
              <Dialog className="bg-white" open={isAddChildDialogOpen} onOpenChange={setIsAddChildDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700 text-white shadow-md">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Child
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-white">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Plus className="w-5 h-5 text-green-600" />
                      Add New Child Profile
                    </DialogTitle>
                    <DialogDescription>
                      Create a new profile for your child to start tracking their swimming journey.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        value={newChildForm.name}
                        onChange={(e) => setNewChildForm({ ...newChildForm, name: e.target.value })}
                        className="col-span-3"
                        placeholder="Enter child's full name"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="age" className="text-right">
                        Age *
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        value={newChildForm.age}
                        onChange={(e) => setNewChildForm({ ...newChildForm, age: e.target.value })}
                        className="col-span-3"
                        placeholder="Enter age"
                        min="3"
                        max="18"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="emergency" className="text-right">
                        Emergency Contact
                      </Label>
                      <Input
                        id="emergency"
                        value={newChildForm.emergencyContact}
                        onChange={(e) => setNewChildForm({ ...newChildForm, emergencyContact: e.target.value })}
                        className="col-span-3"
                        placeholder="Phone number"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="medical" className="text-right pt-2">
                        Medical Notes
                      </Label>
                      <Textarea
                        id="medical"
                        value={newChildForm.medicalNotes}
                        onChange={(e) => setNewChildForm({ ...newChildForm, medicalNotes: e.target.value })}
                        className="col-span-3"
                        placeholder="Any medical conditions, allergies, or special requirements..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddChildDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddChild}
                      disabled={!newChildForm.name || !newChildForm.age}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Add Child
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <Select value={selectedChildId2} onValueChange={setSelectedChildId2}>
                  <SelectTrigger className="w-[200px] bg-white border-blue-200 focus:border-blue-400">
                    <SelectValue placeholder="Select child" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {children2?.map((child) => (
                      <SelectItem key={child.id} value={child.id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={child?.profileImage || "/placeholder.svg"} alt={child.first_name} />
                            <AvatarFallback>
                              {child?.first_name
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{child.first_name} {child.last_name}</span>
                          {!child.has_subscription && (
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              <Lock className="w-3 h-3 text-orange-500" />
                            </div>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default HeaderWithChildSelector