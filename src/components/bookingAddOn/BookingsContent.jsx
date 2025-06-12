// src/components/BookingsContent.jsx
import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Sample data (moved here as it's specific to BookingsContent)
const myBookings = [
  { id: 1, class: "Yoga Flow", date: "2024-01-15", time: "09:00 AM", instructor: "Sarah Johnson", status: "confirmed" },
  { id: 2, class: "HIIT Training", date: "2024-01-16", time: "11:30 AM", instructor: "Mike Chen", status: "confirmed" },
  { id: 3, class: "Pilates", date: "2024-01-18", time: "02:00 PM", instructor: "Emma Wilson", status: "pending" },
  { id: 4, class: "Spin Class", date: "2024-01-20", time: "06:00 PM", instructor: "David Lee", status: "cancelled" },
];

export default function BookingsContent() {
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
  );
}
