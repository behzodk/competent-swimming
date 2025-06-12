import { useState, useEffect } from "react"
import {
  Calendar,
  CalendarDays,
  Clock,
  Home,
  Plus,
  Search,
  Settings,
  User,
  BookOpen,
  CheckCircle,
  XCircle,
  MapPin,
  Users,
  Bell, // Import Bell icon for Notifications
  Mail, // For notification type
  Info, // For notification type
  Trash2, // For delete action
  Eye, // For mark as read
  EyeOff // For mark as unread
} from "lucide-react"
import { supabase } from "../../supabaseClient"
import { useNavigate, Link } from "react-router-dom" // Ensure Link is imported
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Navigation items
const navItems = [
  {
    title: "Home",
    icon: Home,
    id: "home",
  },
  {
    title: "My Timetable",
    icon: CalendarDays,
    id: "timetable",
  },
  {
    title: "Book a Class",
    icon: BookOpen,
    id: "book",
  },
  {
    title: "My Bookings",
    icon: Calendar,
    id: "bookings",
  },
  {
    title: "Notifications", // New navigation item
    icon: Bell,
    id: "notifications",
  },
]

// Sample data (moved outside to be accessible by all content components)
const upcomingClasses = [
  { id: 1, name: "Yoga Flow", time: "09:00 AM", instructor: "Sarah Johnson", room: "Studio A" },
  { id: 2, name: "HIIT Training", time: "11:30 AM", instructor: "Mike Chen", room: "Gym 1" },
  { id: 3, name: "Pilates", time: "02:00 PM", instructor: "Emma Wilson", room: "Studio B" },
]

const weeklySchedule = [
  {
    day: "Monday",
    classes: [
      { time: "09:00", name: "Yoga Flow", instructor: "Sarah Johnson" },
      { time: "18:00", name: "CrossFit", instructor: "John Doe" },
    ],
  },
  {
    day: "Tuesday",
    classes: [
      { time: "07:00", name: "Morning Run", instructor: "Lisa Park" },
      { time: "19:00", name: "Zumba", instructor: "Maria Garcia" },
    ],
  },
  {
    day: "Wednesday",
    classes: [
      { time: "12:00", name: "Lunch Yoga", instructor: "Sarah Johnson" },
      { time: "17:30", name: "Boxing", instructor: "Tom Wilson" },
    ],
  },
]

const availableClasses = [
  {
    id: 1,
    name: "Yoga Flow",
    instructor: "Sarah Johnson",
    time: "09:00 AM",
    duration: "60 min",
    capacity: 20,
    booked: 15,
    price: "$25",
  },
  {
    id: 2,
    name: "HIIT Training",
    instructor: "Mike Chen",
    time: "11:30 AM",
    duration: "45 min",
    capacity: 15,
    booked: 12,
    price: "$30",
  },
  {
    id: 3,
    name: "Pilates",
    instructor: "Emma Wilson",
    time: "02:00 PM",
    duration: "50 min",
    capacity: 18,
    booked: 8,
    price: "$28",
  },
  {
    id: 4,
    name: "Spin Class",
    instructor: "David Lee",
    time: "06:00 PM",
    duration: "45 min",
    capacity: 25,
    booked: 20,
    price: "$22",
  },
]

const myBookings = [
  { id: 1, class: "Yoga Flow", date: "2024-01-15", time: "09:00 AM", instructor: "Sarah Johnson", status: "confirmed" },
  { id: 2, class: "HIIT Training", date: "2024-01-16", time: "11:30 AM", instructor: "Mike Chen", status: "confirmed" },
  { id: 3, class: "Pilates", date: "2024-01-18", time: "02:00 PM", instructor: "Emma Wilson", status: "pending" },
  { id: 4, class: "Spin Class", date: "2024-01-20", time: "06:00 PM", instructor: "David Lee", status: "cancelled" },
]

// Sample Notifications Data
const initialNotifications = [
  { id: 1, type: 'info', message: 'Your booking for Yoga Flow on Jan 15 is confirmed!', date: '2024-01-10', read: false },
  { id: 2, type: 'alert', message: 'HIIT Training on Jan 16 is almost full, book now!', date: '2024-01-12', read: false },
  { id: 3, type: 'message', message: 'New class: Aqua Aerobics added to the schedule!', date: '2024-01-14', read: true },
  { id: 4, type: 'info', message: 'Your profile details have been updated successfully.', date: '2024-01-05', read: true },
];


function AppSidebar({ activeTab, setActiveTab, session }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    // Check if there's an active session before attempting to sign out
    if (!session) {
      navigate('/', { replace: true }); // Redirect as the user is effectively logged out
      return;
    }

    const { error } = await supabase.auth.signOut()
    if (error) {
      return;
    } else {
      // Redirect back to the login/home page (or wherever you want)
      navigate('/', { replace: true })
    }
  }
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
  });
  const userId = session?.user?.id; // Use optional chaining for session.user

  useEffect(() => {
    async function loadProfile() {
      if (!userId) { // Ensure userId exists before fetching
        return;
      }
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, date_of_birth')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        return;
      } else if (data) {
        setProfile({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          date_of_birth: data.date_of_birth || '',
        });
      }
    }

    loadProfile();
  }, [userId]);

  return (
    <Sidebar className="bg-white sidebar-main" style={{ backgroundColor: "white !important" }}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                <Calendar className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  CompetentSwimming
                </span>
                <span className="text-xs">Dashboard</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton isActive={activeTab === item.id} onClick={() => setActiveTab(item.id)}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <User className="size-4 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{profile.first_name} {profile.last_name}</span>
                      <span className="text-xs text-muted-foreground max-w-[180px] truncate">{session?.user?.email}</span>
                    </div>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56 mb-2 border-2 border-gray-100 shadow-lg">
                <DropdownMenuLabel className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <User className="size-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{profile.first_name} {profile.last_name}</p>
                      <p className="text-sm text-gray-600 max-w-[135px] truncate">{session?.user?.email}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer">
                  <User className="mr-2 h-4 w-4 text-blue-600" />
                  <span>Edit Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 cursor-pointer">
                  <Settings className="mr-2 h-4 w-4 text-emerald-600" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 cursor-pointer text-red-600" onClick={handleLogout}>
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

function HomeContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
        <p className="text-muted-foreground">Here's what's happening with your fitness journey today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Classes This Week</CardTitle>
            <Calendar className="h-4 w-4 text-blue-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-blue-200">+2 from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-100">Hours Trained</CardTitle>
            <Clock className="h-4 w-4 text-emerald-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5</div>
            <p className="text-xs text-emerald-200">+1.2 from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">Calories Burned</CardTitle>
            <Users className="h-4 w-4 text-purple-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-purple-200">+180 from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-100">Streak</CardTitle>
            <CheckCircle className="h-4 w-4 text-orange-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 days</div>
            <p className="text-xs text-orange-200">Keep it up!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-2 border-green-100 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="text-green-900">Today's Classes</CardTitle>
            <CardDescription>Your upcoming fitness sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingClasses.map((classItem) => (
              <div
                key={classItem.id}
                className="flex items-center space-x-4 p-3 rounded-lg bg-white border border-green-200"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-none text-green-900">{classItem.name}</p>
                  <p className="text-sm text-green-600">
                    {classItem.instructor} • {classItem.room}
                  </p>
                </div>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                  {classItem.time}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-2 border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-indigo-900">Quick Actions</CardTitle>
            <CardDescription>Get started with these common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0">
              <Plus className="mr-2 h-4 w-4" />
              Book a New Class
            </Button>
            <Button className="w-full justify-start bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0">
              <Calendar className="mr-2 h-4 w-4" />
              View Full Schedule
            </Button>
            <Button className="w-full justify-start bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0">
              <User className="mr-2 h-4 w-4" />
              Update Profile
            </Button>
            {/* New Quick Action: Notifications */}
            <Link to="/notifications" className="block">
              <Button className="w-full justify-start bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0">
                <Bell className="mr-2 h-4 w-4" />
                View Notifications
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function TimetableContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Timetable</h1>
        <p className="text-muted-foreground">Your personalized weekly fitness schedule</p>
      </div>

      <div className="grid gap-4">
        {weeklySchedule.map((day, dayIndex) => {
          const dayColors = ["from-red-500 to-pink-500", "from-blue-500 to-indigo-500", "from-green-500 to-emerald-500"]
          return (
            <Card key={day.day} className="border-2 border-gray-100">
              <CardHeader
                className={`bg-gradient-to-r ${dayColors[dayIndex % dayColors.length]} text-white rounded-t-lg`}
              >
                <CardTitle className="text-lg">{day.day}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {day.classes.map((classItem, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border-2 border-gray-100 bg-gradient-to-r from-gray-50 to-white"
                    >
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0">
                          {classItem.time}
                        </Badge>
                        <div>
                          <p className="font-medium text-gray-900">{classItem.name}</p>
                          <p className="text-sm text-gray-600">{classItem.instructor}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0"
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function BookClassContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Book a Class</h1>
        <p className="text-muted-foreground">Find and book your next fitness session</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input type="date" id="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="class-type">Class Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select class type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yoga">Yoga</SelectItem>
                  <SelectItem value="hiit">HIIT</SelectItem>
                  <SelectItem value="pilates">Pilates</SelectItem>
                  <SelectItem value="spin">Spin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any instructor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="mike">Mike Chen</SelectItem>
                  <SelectItem value="emma">Emma Wilson</SelectItem>
                  <SelectItem value="david">David Lee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {availableClasses.map((classItem, index) => {
          const cardColors = [
            "border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50",
            "border-green-200 bg-gradient-to-br from-green-50 to-emerald-50",
            "border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50",
            "border-orange-200 bg-gradient-to-br from-orange-50 to-red-50",
          ]
          const buttonColors = [
            "from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
            "from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
            "from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
            "from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600",
          ]
          return (
            <Card key={classItem.id} className={`border-2 ${cardColors[index % cardColors.length]}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-900">{classItem.name}</h3>
                    <p className="text-sm text-gray-600">with {classItem.instructor}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {classItem.time} ({classItem.duration})
                      </span>
                      <span className="flex items-center">
                        <Users className="mr-1 h-4 w-4" />
                        {classItem.booked}/{classItem.capacity} spots
                      </span>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="text-2xl font-bold text-gray-900">{classItem.price}</div>
                    <Button
                      className={`w-full bg-gradient-to-r ${buttonColors[index % buttonColors.length]} text-white border-0`}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function BookingsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
        <p className="text-muted-foreground">Manage your upcoming and past class bookings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
          <CardDescription>View and manage your class reservations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.class}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.time}</TableCell>
                  <TableCell>{booking.instructor}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === "confirmed"
                          ? "default"
                          : booking.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {booking.status === "confirmed" && <CheckCircle className="mr-1 h-3 w-3" />}
                      {booking.status === "cancelled" && <XCircle className="mr-1 h-3 w-3" />}
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {booking.status === "confirmed" && (
                      <Button size="sm" variant="outline">
                        Cancel
                      </Button>
                    )}
                    {booking.status === "pending" && (
                      <Button size="sm" variant="outline">
                        Modify
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function NotificationsContent() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const getIconForNotificationType = (type) => {
    switch (type) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'alert':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'message':
        return <Mail className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAsUnread = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: false } : notif
    ));
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadNotificationsCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">Stay updated with your account activities</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Total Notifications</CardTitle>
            <Bell className="h-4 w-4 text-blue-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-100">Unread Notifications</CardTitle>
            <Bell className="h-4 w-4 text-orange-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadNotificationsCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-100">Read Notifications</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length - unreadNotificationsCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification List</CardTitle>
          <CardDescription>Your recent activities and updates</CardDescription>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg">No notifications yet.</p>
              <p className="text-sm">Check back later for updates!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200
                    ${notif.read ? 'bg-gray-50 border-gray-200' : 'bg-white border-blue-200 shadow-md'}`}
                >
                  <div className="flex-shrink-0 mr-4">
                    {getIconForNotificationType(notif.type)}
                  </div>
                  <div className="flex-grow">
                    <p className={`font-medium ${notif.read ? 'text-gray-600' : 'text-gray-900'}`}>
                      {notif.message}
                    </p>
                    <p className={`text-sm ${notif.read ? 'text-gray-500' : 'text-gray-600'}`}>
                      {notif.date}
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex space-x-2 ml-4">
                    {notif.read ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkAsUnread(notif.id)}
                        title="Mark as Unread"
                        className="text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                      >
                        <EyeOff className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkAsRead(notif.id)}
                        title="Mark as Read"
                        className="text-gray-500 hover:text-green-600 hover:bg-green-50"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteNotification(notif.id)}
                      title="Delete Notification"
                      className="text-gray-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


export default function Dashboard({ session }) {
  const [activeTab, setActiveTab] = useState("home")

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeContent />
      case "timetable":
        return <TimetableContent />
      case "book":
        return <BookClassContent />
      case "bookings":
        return <BookingsContent />
      case "notifications": // New case for notifications
        return <NotificationsContent />
      default:
        return <HomeContent />
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar session={session} activeTab={activeTab} setActiveTab={setActiveTab} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">{navItems.find((item) => item.id === activeTab)?.title || "Dashboard"}</h2>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-[200px] pl-8 md:w-[300px]" />
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">{renderContent()}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
