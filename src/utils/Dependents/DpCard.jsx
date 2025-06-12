import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { UserIcon, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const DpCard = ({dep, handleDeleteDependent, openEdit}) => {
  return (
    <Card key={dep.id} className='shadow hover:shadow-lg transition-shadow bg-white border border-gray-200'>
        <CardHeader>
        <CardTitle>{dep.first_name} {dep.last_name}</CardTitle>
        </CardHeader>
        <CardContent>
        <p><strong>DOB:</strong> {new Date(dep.date_of_birth).toLocaleDateString()}</p>
        {dep.location && <p><strong>Location:</strong> {dep.location}</p>}
        {dep.phone && <p><strong>Phone:</strong> {dep.phone}</p>}
        </CardContent>
        <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => openEdit(dep)}>
            Edit
        </Button>
        <Button variant="destructive" className='bg-red-600 hover:bg-red-700' size="sm" onClick={() => handleDelete(dep.id)}>
            Remove
        </Button>
        </CardFooter>
    </Card>
  )
}

export default DpCard