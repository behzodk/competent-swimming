// src/components/HomeContent.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  Plus,
  User,
  Bell, // For Notifications Quick Action
  LayoutDashboard, // For Dashboard Quick Action
  Settings, // For Settings Quick Action
  CheckCircle,
  Users,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Sample data (moved here as it's specific to HomeContent)
const upcomingClasses = [
  { id: 1, name: "Yoga Flow", time: "09:00 AM", instructor: "Sarah Johnson", room: "Studio A" },
  { id: 2, name: "HIIT Training", time: "11:30 AM", instructor: "Mike Chen", room: "Gym 1" },
  { id: 3, name: "Pilates", time: "02:00 PM", instructor: "Emma Wilson", room: "Studio B" },
];
function FAQItem({ question, answer }) {
  return (
    <details className="group bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <summary className="flex items-center justify-between cursor-pointer text-gray-800 hover:text-indigo-600 transition-colors">
        <span className="font-medium">{question}</span>
        <ChevronDown className="w-5 h-5 text-gray-500 group-open:hidden" />
        <ChevronUp className="w-5 h-5 text-indigo-600 hidden group-open:block" />
      </summary>
      <p className="mt-3 text-gray-600">{answer}</p>
    </details>
  );
}

export default function HomeContent({ session }) {
  const faqs = [
    {
      question: "How do I book a new class?",
      answer:
        "Click the “Book a New Class” button in the Quick Actions section; then select your preferred class, date, and instructor to complete your booking.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes—go to “My Bookings” from the sidebar, find the reservation you want to cancel, and click “Cancel.” You’ll receive a confirmation right away.",
    },
    {
      question: "How do I update my profile?",
      answer:
        "Click “Update Profile” in Quick Actions or select your avatar in the sidebar and choose “Edit Profile.” You can then change your details, upload a picture, and save.",
    },
    {
      question: "What if I’m running late for a class?",
      answer:
        "Please contact us directly at least 15 minutes before class start time. We’ll do our best to accommodate late arrivals or reschedule your session.",
    },
    {
      question: "What is your refund policy?",
      answer:
        "You can request a full refund up to 24 hours before your class start time. Simply visit “My Bookings” and click “Request Refund.” After that window, we offer a credit toward another class within 30 days.",
    },
    {
      question: "Do you offer membership plans or packages?",
      answer:
        "Yes—we have drop-in rates, 5-class packages, and monthly memberships. Visit our “Membership” page (linked in the sidebar) or speak to the front desk for specific pricing and benefits.",
    },
    {
      question: "What happens if I miss a scheduled class?",
      answer:
        "If you miss a class without cancelling 12 hours before, it will be marked as a “no-show” and cannot be refunded. Canceling at least 12 hours in advance will automatically free up your spot and you won’t be charged.",
    },

  ];
  return (
    <div className="space-y-6">
            {/* ── Video Introduction ── */}
            <div className="mx-auto max-w-4xl">
        <Card className="overflow-hidden rounded-lg shadow-lg bg-black">
          <div className="aspect-video">
            {/* Replace the src below with your own video URL or YouTube embed */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/eU3n-Ylqd1U?si=QDvJ5CCa370KOGZp"
              title="Welcome Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Card>
      </div>
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
            <Link to="/book" className="block"> {/* Updated to use Link */}
              <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0">
                <Plus className="mr-2 h-4 w-4" />
                Book a New Class
              </Button>
            </Link>
            <Link to="/timetable" className="block"> {/* Updated to use Link */}
              <Button className="w-full justify-start bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0">
                <Calendar className="mr-2 h-4 w-4" />
                View Full Schedule
              </Button>
            </Link>
            <Link to="/profile" className="block"> {/* Updated to use Link */}
              <Button className="w-full justify-start bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0">
                <User className="mr-2 h-4 w-4" />
                Update Profile
              </Button>
            </Link>
            {/* New Quick Action: Notifications */}
            <Link to="/notifications" className="block">
              <Button className="w-full justify-start bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0">
                <Bell className="mr-2 h-4 w-4" />
                View Notifications
              </Button>
            </Link>
            <Link to="/support" className="block">
              <Button className="w-full justify-start bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0">
                <HelpCircle className="mr-2 h-4 w-4" />
                Get Help
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <div className="pt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}