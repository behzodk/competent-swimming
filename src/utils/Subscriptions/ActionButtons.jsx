import React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar, Award, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ActionButtons = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={() => navigate('/timetable')}
          className="flex items-center bg-white hover:bg-gray-50"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Timetable
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate('/badges')}
          className="flex items-center bg-white hover:bg-gray-50"
        >
          <Award className="mr-2 h-4 w-4" />
          Badges
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate('/instructions')}
          className="flex items-center bg-white hover:bg-gray-50"
        >
          <FileText className="mr-2 h-4 w-4" />
          Instructions & Feedback
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate('/support/contact')}
          className="flex items-center bg-white hover:bg-gray-50"
        >
          Contact Support
        </Button>
    </div>
    </div>
  )
}

export default ActionButtons