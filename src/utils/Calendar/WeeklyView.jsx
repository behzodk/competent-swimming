// src/utils/Calendar/WeeklyView.jsx

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, User, MapPin, Users, Calendar as CalendarIcon } from "lucide-react"
import { getWeekDates, handleDaySelect, formatTime } from "./utils"

export default function WeeklyView({
  currentDate,
  classes,
  setSelectedDate,
  setShowClassDetails,
}) {
  const weekDates = getWeekDates(currentDate)
  const todayKey = new Date().toDateString()

  // helper to find a class on a given date
  const findClass = (date) =>
    classes.find((cls) =>
      new Date(cls.start_time).toDateString() === date.toDateString()
    )

  return (
    <>
      {/* ── MOBILE: hide on md+ ── */}
      <div className="md:hidden">
        <Tabs defaultValue={new Date().getDay().toString()} className="w-full">
          <TabsList className="grid grid-cols-7 overflow-auto">
            {weekDates.map((date, idx) => {
              const isToday = date.toDateString() === todayKey
              return (
                <TabsTrigger
                  key={idx}
                  value={idx.toString()}
                  className={`flex flex-col items-center py-2 ${
                    isToday ? "text-blue-600 font-bold" : ""
                  }`}
                >
                  <span className="text-xs">
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </span>
                  <span className="text-sm">{date.getDate()}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {weekDates.map((date, idx) => {
            const cls = findClass(date)
            return (
              <TabsContent key={idx} value={idx.toString()} className="mt-4">
                <Card
                  className={`border-t-4 ${
                    cls ? "border-blue-500" : "border-gray-200"
                  }`}
                >
                  <CardHeader>
                    <CardTitle>
                      {date.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {cls ? (
                      <div
                        className="p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100"
                        onClick={() =>
                          handleDaySelect(
                            date,
                            classes,
                            setSelectedDate,
                            setShowClassDetails
                          )
                        }
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{cls.title}</h4>
                          <Badge className="bg-green-100 text-green-800">
                            Beginner
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatTime(cls.start_time)}
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {cls.teacher.first_name} {cls.teacher.last_name}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {cls.pool}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {cls.currentEnrollment}/{cls.maxCapacity}
                          </div>
                        </div>
                        <Button className="w-full mt-3" size="sm">
                          View Details
                        </Button>
                      </div>
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        <CalendarIcon className="mx-auto h-8 w-8 mb-2" />
                        No class scheduled
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>

      {/* ── DESKTOP: hide below md ── */}
      <div className="hidden md:block space-y-6">
        <div className="flex justify-between border-b pb-2">
          <h3 className="text-lg font-medium">
            {weekDates[0].toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}{" "}
            –{" "}
            {weekDates[6].toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </h3>
        </div>

        <div className="space-y-4">
          {weekDates.map((date, idx) => {
            const cls = findClass(date)
            const isToday = date.toDateString() === todayKey

            return (
              <Card
                key={idx}
                className={`transition-shadow hover:shadow-md ${
                  isToday ? "border-l-4 border-blue-500" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  <div
                    className={`p-4 md:w-1/5 md:border-r ${
                      isToday ? "bg-blue-50" : ""
                    }`}
                  >
                    <h4
                      className={`font-bold ${isToday ? "text-blue-600" : ""}`}
                    >
                      {date.toLocaleDateString("en-US", { weekday: "long" })}
                    </h4>
                    <p className="text-gray-600">{date.getDate()}</p>
                    <Badge variant="outline" className="mt-2">
                      {cls ? "1 Class" : "No Classes"}
                    </Badge>
                  </div>

                  <div className="flex-1 p-4">
                    {cls ? (
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h4 className="font-semibold">{cls.title}</h4>
                            <Badge className="bg-green-100 text-green-800">
                              Beginner
                            </Badge>
                            {cls.currentEnrollment >= cls.maxCapacity && (
                              <Badge variant="destructive">Full</Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" />{" "}
                              {formatTime(cls.start_time)}
                            </div>
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-2" />{" "}
                              {cls.teacher.first_name} {cls.teacher.last_name}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" /> {cls.pool}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-2" />{" "}
                              {cls.currentEnrollment}/{cls.maxCapacity} enrolled
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4 md:mt-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleDaySelect(
                                date,
                                classes,
                                setSelectedDate,
                                setShowClassDetails
                              )
                            }
                          >
                            View Details
                          </Button>
                          {cls.currentEnrollment < cls.maxCapacity && (
                            <Button size="sm">Book Class</Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-6 text-gray-500">
                        <CalendarIcon className="h-8 w-8 mr-2" />{" "}
                        No class scheduled
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </>
  )
}