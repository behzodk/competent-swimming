// src/components/BookClassContent.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "../../lib/supabaseClient";

export default function BookClassContent() {
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [instructorsMap, setInstructorsMap] = useState({});
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");

  useEffect(() => {
    async function fetchAvailableSlotsAndInstructors() {
      setLoading(true);

      const tenHoursFromNow = new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString();

      // 1) Fetch all unbooked slots (student_profile_id IS NULL),
      //    only those starting more than 10 hours from now,
      //    ordered by newest first, and include price
      const { data: rawSlots, error: slotsError } = await supabase
        .from("slots")
        .select("id, teacher_id, start_time, price")
        .is("student_profile_id", null)
        .gt("start_time", tenHoursFromNow)
        .order("start_time", { ascending: false });

      if (slotsError) {

        setSlots([]);
        setInstructorsMap({});
        setLoading(false);
        return;
      }

      if (!rawSlots || rawSlots.length === 0) {
        setSlots([]);
        setInstructorsMap({});
        setLoading(false);
        return;
      }

      // 2) Extract unique teacher_ids (Auth UIDs) from those slots
      const uniqueTeacherIds = [
        ...new Set(rawSlots.map((row) => row.teacher_id)),
      ];

      // 3) Fetch matching profiles by their user_id = teacher_id
      const { data: rawProfiles, error: profilesError } = await supabase
        .from("profiles")
        .select("user_id, first_name, last_name")
        .in("user_id", uniqueTeacherIds);

      if (profilesError) {
        // Fallback: show “Unknown” if profiles fail
        const fallback = rawSlots.map((row) => ({
          id: row.id,
          time: row.start_time,
          price: row.price,
          instructor: "Unknown",
        }));
        setSlots(fallback);
        setInstructorsMap({});
        setLoading(false);
        return;
      }

      // 4) Build a map: Auth UID → “First Last”
      const map = {};
      rawProfiles.forEach((p) => {
        map[p.user_id] = `${p.first_name} ${p.last_name}`;
      });

      // 5) Normalize slots array by attaching instructor name and price
      const normalized = rawSlots.map((row) => ({
        id: row.id,
        time: row.start_time,
        instructor: map[row.teacher_id] ?? "Unknown",
        price: row.price ?? 30, // fallback to £30 if somehow null
      }));

      setSlots(normalized);
      setInstructorsMap(map);
      setLoading(false);
    }

    fetchAvailableSlotsAndInstructors();
  }, []);

  // Client-side filter by date & instructor
  const filtered = slots.filter((slot) => {
    const isoDate = slot.time.slice(0, 10); // “YYYY-MM-DD”
    const matchesDate = selectedDate ? isoDate === selectedDate : true;
    const matchesInstructor = selectedInstructor
      ? slot.instructor === selectedInstructor
      : true;
    return matchesDate && matchesInstructor;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Book a Slot</h1>
        <p className="text-muted-foreground">
          Pick an available one-on-one slot below.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Slots</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Filter by Date */}
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            {/* Filter by Instructor */}
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor</Label>
              <Select onValueChange={(val) => setSelectedInstructor(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any instructor" />
                </SelectTrigger>
                <SelectContent>
                  {
                    // Show a sorted, unique list of instructor names
                    Object.values(instructorsMap)
                      .sort()
                      .map((name) => (
                        <SelectItem value={name} key={name}>
                          {name}
                        </SelectItem>
                      ))
                  }
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Slot cards */}
      {loading ? (
        <p className="text-gray-500">Loading slots…</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-600">No matching slots available.</p>
      ) : (
        <div className="grid gap-4">
          {filtered.map((slot, idx) => {
            const cardColors = [
              "border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50",
              "border-green-200 bg-gradient-to-br from-green-50 to-emerald-50",
              "border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50",
              "border-orange-200 bg-gradient-to-br from-orange-50 to-red-50",
            ];
            const cardStyle = cardColors[idx % cardColors.length];

            return (
              <Card
                key={slot.id}
                className={`border-2 ${cardStyle} hover:shadow-lg transition-shadow duration-200`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {slot.instructor}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {new Date(slot.time).toLocaleDateString()}{" "}
                          {new Date(slot.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <span className="flex items-center">
                          <Users className="mr-1 h-4 w-4" />
                          Available
                        </span>
                      </div>
                      {/* Styled price “badge” */}
                      <div>
                        <span className="inline-block mt-1 rounded-full bg-indigo-100 px-3 py-1 text-lg font-semibold text-indigo-800">
                          £{slot.price}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <Button
                        onClick={() => navigate(`/book/${slot.id}`)}
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}