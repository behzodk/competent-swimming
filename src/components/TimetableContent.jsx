// src/pages/CalendarView.jsx

import React, { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import DailyView from "../utils/Calendar/DailyView"
import WeeklyView from "../utils/Calendar/WeeklyView"
import MonthlyView from "../utils/Calendar/MonthlyView"
import DialogView from "../utils/Calendar/DialogView"
import { navigateDate } from "../utils/Calendar/utils"
import { supabase } from "@/lib/supabaseClient"
import { useProfile } from "@/contexts/ProfileContext"
import { useNavigate } from "react-router-dom"

export default function CalendarView({ session }) {
  const navigate = useNavigate()
  const { activeProfileId } = useProfile()

  const [currentView, setCurrentView] = useState("weekly")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [showClassDetails, setShowClassDetails] = useState(false)

  const [hasSubscription, setHasSubscription] = useState(true)
  const [checkingSubscription, setCheckingSubscription] = useState(false)

  const [classes, setClasses] = useState([])
  const [loadingClasses, setLoadingClasses] = useState(false)

  // check subscription for activeProfileId
  useEffect(() => {
    if (!activeProfileId) return
    setCheckingSubscription(true)
    supabase
      .from("subscriptions")
      .select("id", { head: true, count: "exact" })
      .eq("profile_id", activeProfileId)
      .eq("status", "active")
      .then(({ count }) => setHasSubscription((count || 0) > 0))
      .finally(() => setCheckingSubscription(false))
  }, [activeProfileId])

  // load classes for activeProfileId
  useEffect(() => {
    async function loadClasses() {
      if (!activeProfileId) {
        setClasses([])
        return
      }
      setLoadingClasses(true)
      const { data: subs } = await supabase
        .from("subscriptions")
        .select("id")
        .eq("profile_id", activeProfileId)
        .eq("status", "active")

      if (!subs?.length) {
        setClasses([])
        setLoadingClasses(false)
        return
      }

      const subIds = subs.map(s => s.id)
      const { data: clsData } = await supabase
        .from("classes")
        .select(`*, teacher:profiles!inner(first_name, last_name)`)
        .in("subscription_id", subIds)
        .order("start_time", { ascending: true })

      setClasses(clsData || [])
      setLoadingClasses(false)
    }
    loadClasses()
  }, [activeProfileId])

  const getSelectedClass = () => {
    if (!selectedDate) return null
    return classes.find(c => {
      const clsDate = new Date(c.start_time)
      const sel = new Date(selectedDate)
      return clsDate.toDateString() === sel.toDateString()
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <CardTitle className="text-xl">Class Schedule</CardTitle>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                navigateDate("prev", currentDate, currentView, setCurrentDate)
              }
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                navigateDate("next", currentDate, currentView, setCurrentDate)
              }
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex rounded-lg border p-1">
            {["daily", "weekly", "monthly"].map(view => (
              <Button
                key={view}
                variant={currentView === view ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView(view)}
                className={`capitalize ${
                  currentView === view ? "bg-black text-white" : ""
                }`}
              >
                {view}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {checkingSubscription ? (
          <p className="text-gray-500 mb-4">Checking subscription…</p>
        ) : !hasSubscription ? (
          <div className="text-center py-12">
            <p className="text-gray-700 mb-4">
              No active subscription for this profile.
            </p>
            <Button
              className="bg-black hover:bg-black/90 text-white"
              onClick={() => navigate("/subscriptions")}
            >
              Buy Subscription
            </Button>
          </div>
        ) : (
          <>
            {loadingClasses && (
              <p className="text-gray-500 mb-4">Loading classes…</p>
            )}

            {currentView === "daily" && (
              <DailyView
                currentDate={currentDate}
                classes={classes}
                setSelectedDate={setSelectedDate}
                setShowClassDetails={setShowClassDetails}
              />
            )}
            {currentView === "weekly" && (
              <WeeklyView
                currentDate={currentDate}
                classes={classes}
                setSelectedDate={setSelectedDate}
                setShowClassDetails={setShowClassDetails}
              />
            )}
            {currentView === "monthly" && (
              <MonthlyView
                currentDate={currentDate}
                classes={classes}
                setSelectedDate={setSelectedDate}
                setShowClassDetails={setShowClassDetails}
              />
            )}

            <DialogView
              showClassDetails={showClassDetails}
              setShowClassDetails={setShowClassDetails}
              getSelectedClass={getSelectedClass}
            />
          </>
        )}
      </CardContent>
    </Card>
  )
}