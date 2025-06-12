import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const EditDpDialog = ({isEditOpen, setIsEditOpen, handleUpdate, editDependent, setEditDependent, updating, updateError}) => {
  return ( 
    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
            <DialogTitle>Edit Dependent</DialogTitle>
            <DialogDescription>Update details below</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdate} className="space-y-4 p-4">
            <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input
                id="first_name"
                value={editDependent.first_name}
                onChange={e => setEditDependent({ ...editDependent, first_name: e.target.value })}
                required
                />
            </div>
            <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                id="last_name"
                value={editDependent.last_name}
                onChange={e => setEditDependent({ ...editDependent, last_name: e.target.value })}
                required
                />
            </div>
            <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                id="dob"
                type="date"
                value={editDependent.date_of_birth.slice(0,10)}
                onChange={e => setEditDependent({ ...editDependent, date_of_birth: e.target.value })}
                required
                />
            </div>
            <div>
                <Label htmlFor="location">Location</Label>
                <Input
                id="location"
                value={editDependent.location}
                onChange={e => setEditDependent({ ...editDependent, location: e.target.value })}
                />
            </div>
            <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                id="phone"
                value={editDependent.phone}
                onChange={e => setEditDependent({ ...editDependent, phone: e.target.value })}
                />
            </div>
            {updateError && <p className="text-red-600">{updateError}</p>}
            <DialogFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
                </Button>
                <Button type="submit" disabled={updating} className='bg-black hover:bg-black/90 text-white'>
                {updating ? 'Saving…' : 'Save'}
                </Button>
            </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default EditDpDialog