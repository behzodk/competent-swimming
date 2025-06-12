
export const getWeekDates = (date) => {
  const week = []

  const mondayOffset = (date.getDay() + 6) % 7

  const startOfWeek = new Date(date)
  startOfWeek.setDate(date.getDate() - mondayOffset)

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek)
    day.setDate(startOfWeek.getDate() + i)
    week.push(day)
  }

  return week
}

export const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
}

export const navigateDate = (direction, currentDate, currentView, setCurrentDate) => {
    const newDate = new Date(currentDate)
    if (currentView === "daily") {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1))
    } else if (currentView === "weekly") {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7))
    } else {
      newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1))
    }
    setCurrentDate(newDate)
}

export const handleDaySelect = (date, sampleClasses, setSelectedDate, setShowClassDetails) => {
    const dateString = date.toISOString().split("T")[0]
    const dayClass = sampleClasses.find((cls) => 
      new Date(cls.start_time).toDateString() === new Date(dateString).toDateString())

    if (dayClass) {
      setSelectedDate(dateString)
      setShowClassDetails(true)
    }
}
export const getClassTypeColor = (type) => {
  switch (type) {
      case "beginner":
      case "kids-swimming":
      case "adaptive-swimming":
      return "bg-green-100 text-green-800"
      case "intermediate":
      case "stroke-improvement":
      return "bg-blue-100 text-blue-800"
      case "advanced":
      case "competitive-training":
      case "water-safety":
      return "bg-red-100 text-red-800"
      case "aqua-aerobics":
      case "senior-fitness":
      case "prenatal-aqua":
      case "deep-water-running":
      return "bg-purple-100 text-purple-800"
      case "water-polo":
      return "bg-orange-100 text-orange-800"
      case "synchronized-swimming":
      return "bg-pink-100 text-pink-800"
      case "private-lesson":
      return "bg-yellow-100 text-yellow-800"
      case "open-swim":
      case "lap-swimming":
      return "bg-cyan-100 text-cyan-800"
      default:
      return "bg-gray-100 text-gray-800"
  }
}

export const computeDuration = (startIso, endIso) => {
  const start = new Date(startIso)
  const end = new Date(endIso)
  let diff = end - start // milliseconds
  if (diff < 0) diff = 0

  const minutes = Math.floor(diff / 1000 / 60)
  const hrs = Math.floor(minutes / 60)
  const mins = minutes % 60

  const parts = []
  if (hrs > 0) parts.push(`${hrs}h`)
  if (mins > 0) parts.push(`${mins}m`)
  return parts.join(" ") || "0m"
}


export function openGoogleCalendar({ title, description, location, start_iso, end_iso }) {

  const formatForGoogle = (iso) =>
    new Date(iso)
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d+Z$/, 'Z')

  const dates = `${formatForGoogle(start_iso)}/${formatForGoogle(end_iso)}`
  const params = new URLSearchParams({
    action:      'TEMPLATE',
    text:        title,
    dates,
    details:    description,
    location,
    trp:        'false',
    sprop:      '',
  })

  window.open(
    `https://calendar.google.com/calendar/render?${params.toString()}`,
    '_blank',
    'noopener,noreferrer'
  )
}
export const formatTime = (iso) => {
  const d = new Date(iso)
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  })
}