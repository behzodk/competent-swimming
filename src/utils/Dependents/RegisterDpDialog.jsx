import React from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'

const RegisterDpDialog = ({isDialogOpen, setIsDialogOpen, handleAddDependent, newDependent, adding, formError, setNewDependent}) => {
    const navigate = useNavigate()
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1">
            <PlusCircle className="h-5 w-5" /> Register Dependent
        </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md bg-white rounded-lg shadow-lg">
        <DialogHeader>
            <DialogTitle>Register a Dependent</DialogTitle>
            <DialogDescription>
            Fill in the details to register a new dependent under your account.
            </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAddDependent} className="space-y-4 mt-4">
            <div className="space-y-1">
            <Label htmlFor="first_name">First Name</Label>
            <Input
                id="first_name"
                type="text"
                value={newDependent.first_name}
                onChange={e =>
                setNewDependent({ ...newDependent, first_name: e.target.value })
                }
                placeholder="e.g. John"
                autoFocus
                required
            />
            </div>
            <div className="space-y-1">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
                id="last_name"
                type="text"
                value={newDependent.last_name}
                onChange={e =>
                setNewDependent({ ...newDependent, last_name: e.target.value })
                }
                placeholder="e.g. Doe"
                required
            />
            </div>
            <div className="space-y-1">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
                id="dob"
                type="date"
                value={newDependent.date_of_birth}
                onChange={e =>
                setNewDependent({ ...newDependent, date_of_birth: e.target.value })
                }
                required
            />
            </div>
            <div className="space-y-1">
            <Label htmlFor="location">Location</Label>
            <Input
                id="location"
                type="text"
                value={newDependent.location}
                onChange={e =>
                setNewDependent({ ...newDependent, location: e.target.value })
                }
                placeholder="e.g. New York, NY"
            />
            </div>
            <div className="space-y-1">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
                id="phone"
                type="tel"
                value={newDependent.phone}
                onChange={e =>
                setNewDependent({ ...newDependent, phone: e.target.value })
                }
                placeholder="e.g. (555) 123-4567"
            />
            </div>

            {formError && <p className="text-red-600 text-sm">{formError}</p>}

            <div className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={adding} className="bg-black hover:bg-black/90 text-white">
                {adding ? 'Adding…' : 'Register'}
            </Button>
            </div>
        </form>
        </DialogContent>
    </Dialog>
  )
}

export default RegisterDpDialog