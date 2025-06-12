import React from "react"
import { handleDaySelect, formatTime } from "./utils"

// Compare two Date objects by year/month/day only
function isSameDate(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

export const MonthlyView = ({
  currentDate,
  classes,
  setSelectedDate,
  setShowClassDetails,
}) => {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1)
  // Compute start of week Monday
  const startDate = new Date(firstDay)
  const dow = firstDay.getDay() // 0=Sun,1=Mon...
  const mondayOffset = (dow + 6) % 7 // Mon=0, Sun=6
  startDate.setDate(firstDay.getDate() - mondayOffset)

  // build a 6×7 grid of days
  const days = []
  const dt = new Date(startDate)
  for (let i = 0; i < 42; i++) {
    days.push(new Date(dt))
    dt.setDate(dt.getDate() + 1)
  }

  const weekdays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold">
          {currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h3>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekdays.map((d) => (
          <div
            key={d}
            className="p-2 text-center font-medium text-gray-600 text-sm"
          >
            {d}
          </div>
        ))}

        {days.map((day, idx) => {
          // filter by actual start_time
          const dayKey = day.toLocaleDateString("en-CA"); // YYYY-MM-DD
          const dayClasses = classes.filter((cls) => {
            const clsKey = new Date(cls.start_time)
              .toLocaleDateString("en-CA");
            return clsKey === dayKey;
          });
          const dayClass = dayClasses[0]
          const isCurrentMonth = day.getMonth() === month
          const isToday = isSameDate(day, new Date())

          const onClick = dayClass
            ? () =>
                handleDaySelect(
                  day,
                  classes,
                  setSelectedDate,
                  setShowClassDetails
                )
            : undefined

          return (
            <div
              key={idx}
              className={`min-h-[80px] p-1 border rounded transition-colors ${
                isCurrentMonth ? "bg-white" : "bg-gray-50"
              } ${isToday ? "ring-2 ring-blue-500" : ""} ${
                dayClass ? "cursor-pointer hover:bg-gray-100" : ""
              }`}
              onClick={onClick}
            >
              <div
                className={`text-sm ${
                  isToday
                    ? "font-bold text-blue-600"
                    : isCurrentMonth
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}
              >
                {day.getDate()}
              </div>

              {dayClass && (
                <div className="mt-1 space-y-1">
                  <div className="text-xs text-gray-600">
                    {formatTime(dayClass.start_time)}
                  </div>
                  <div className="text-xs font-medium truncate">
                    {dayClass.title}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MonthlyView