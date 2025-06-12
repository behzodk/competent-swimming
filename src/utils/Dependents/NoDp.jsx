import React from 'react'
import { UserIcon } from 'lucide-react'

const NoDp = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 border rounded-lg bg-gray-50">
        <UserIcon className="h-12 w-12 text-gray-400" />
        <h2 className="mt-4 text-xl font-semibold text-gray-700">No Dependents Found</h2>
        <p className="mt-2 text-gray-600">
        You don't have any dependents registered. Use "Register Dependent" above to add one.
        </p>
    </div>
  )
}

export default NoDp