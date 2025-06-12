import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Clock, User, MapPin } from 'lucide-react'
import { computeDuration, openGoogleCalendar } from './utils'
import { Button } from '@/components/ui/button'

const DialogView = ({ showClassDetails, setShowClassDetails, getSelectedClass }) => {
  const formatTime = (iso) => {
    const d = new Date(iso)
    return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
  }
  function isInThePast(isoTimestamp) {
    const start = new Date(isoTimestamp)
    const now   = new Date()
    return start < now
  }

  return (
    <div>
        <Dialog open={showClassDetails} onOpenChange={setShowClassDetails}>
          <DialogContent className="sm:max-w-lg bg-white">
            {(() => {
              const selectedClass = getSelectedClass()
              if (!selectedClass) return null

              return (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <span>{selectedClass.title}</span>
                      <Badge className="bg-green-100 text-green-800">
                        Beginner
                      </Badge>
                    </DialogTitle>
                    <DialogDescription>
                      {new Date(selectedClass.start_time).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium">Time</p>
                            <p className="text-sm text-gray-600">{formatTime(selectedClass.start_time)}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium">Instructor</p>
                            <p className="text-sm text-gray-600">{selectedClass.teacher.first_name} {selectedClass.teacher.last_name}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium">Location</p>
                            <p className="text-sm text-gray-600">{selectedClass.pool}</p>
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Duration</p>
                          <p className="text-sm text-gray-600">{computeDuration(selectedClass.start_time, selectedClass.end_time)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            Attendance Status
                          </p>
                          <p className="text-sm text-gray-600">
                            {selectedClass.attendance_status}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      {isInThePast(selectedClass.start_time) ? (
                        <Button disabled className="bg-blue-500 text-white flex-1">
                          This class has passed
                        </Button>
                      ) : (
                        <Button className="bg-blue-500 text-white flex-1" onClick={() => openGoogleCalendar({
                          title: selectedClass.title,
                          description: selectedClass.description,
                          location: selectedClass.pool,
                          start_iso: selectedClass.start_time,
                          end_iso: selectedClass.end_time,
                        })}>
                          Add to Calendar
                        </Button>
                      )}
                      <Button className="bg-red-500 text-white flex-1" variant="outline">Cancel Class</Button>
                    </div>
                  </div>
                </>
              )
            })()}
          </DialogContent>
        </Dialog>
    </div>
  )
}

export default DialogView