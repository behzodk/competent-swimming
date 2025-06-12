import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User, MapPin, Users, Calendar as CalendarIcon, UserCheck } from "lucide-react"
import { getClassTypeColor } from "./utils"
import { Button } from "@/components/ui/button"
import { handleDaySelect, formatDate, computeDuration } from "./utils"

// Compare two Date objects by year/month/day only
function isSameDate(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

// Format ISO timestamp to HH:MM
function formatTime(iso) {
  const d = new Date(iso)
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
}

export const DailyView = ({currentDate,classes,setSelectedDate,setShowClassDetails}) => {
  const todayClasses = classes.filter((cls) => {
    const clsDate = new Date(cls.start_time)
    return isSameDate(clsDate, currentDate)
  })
  const todayClass = todayClasses[0]

  const openDetails = () => {
    if (todayClass) {
      const dateString = currentDate.toISOString().split("T")[0]
      setSelectedDate(dateString)
      setShowClassDetails(true)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold">{formatDate(currentDate)}</h3>
        <p className="text-sm text-gray-600">
          {todayClasses.length
            ? `${todayClasses.length} class${
                todayClasses.length > 1 ? "es" : ""
              } scheduled`
            : "No classes scheduled"}
        </p>
      </div>

      {!todayClass ? (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No classes scheduled
              </h3>
              <p className="mt-1 text-sm text-gray-500">Enjoy your rest day!</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="hover:shadow-md transition-shadow cursor-default">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <h4 className="text-xl font-semibold">{todayClass.title}</h4>
                  <Badge className="bg-green-100 text-green-800">
                    Beginner
                  </Badge>
                  {todayClass.currentEnrollment >= todayClass.maxCapacity && (
                    <Badge variant="destructive">Full</Badge>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {formatTime(todayClass.start_time)} (
                    {computeDuration(todayClass.start_time, todayClass.end_time)})
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {todayClass.teacher.first_name} {todayClass.teacher.last_name}
                  </div>
                  {todayClass.pool && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {todayClass.pool}
                    </div>
                  )}

                  <div className="flex items-center">
                    <UserCheck className="w-4 h-4 mr-2" />
                    <span
                      className={`${
                        todayClass.attendance_status === 'present'
                          ? 'text-green-600'
                          : todayClass.attendance_status === 'absent'
                          ? 'text-red-600'
                          : 'text-gray-500'
                      }`}>
                      {todayClass.attendance_status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Button variant="outline" size="sm" onClick={openDetails}>
                  View Details
                </Button>
                {todayClass.currentEnrollment < todayClass.maxCapacity && (
                  <Button size="sm">Book Class</Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default DailyView