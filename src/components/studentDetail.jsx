// src/components/StudentDetail.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertSuccess, AlertDestructive } from "@/components/ui/alert";
import { AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function StudentDetail({ session }) {
  const { id: studentId } = useParams();
  const navigate = useNavigate();
  const userId = session?.user?.id;

  const [isTeacher, setIsTeacher] = useState(null);
  const [loadingStudent, setLoadingStudent] = useState(true);
  const [student, setStudent] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: "", title: "", message: "" });

  // Message form state
  const [messageForm, setMessageForm] = useState({
    subject: "",
    message: "",
  });
  const [sendingMessage, setSendingMessage] = useState(false);

  // 1) Check user role (must be teacher)
  useEffect(() => {
    async function checkRole() {
      if (!userId) {
        navigate("/", { replace: true });
        return;
      }
      const { data, error } = await supabase
        .from("profiles")
        .select("is_teacher")
        .eq("id", userId)
        .single();

      if (error || !data || !data.is_teacher) {
        navigate("/", { replace: true });
      } else {
        setIsTeacher(true);
      }
    }
    checkRole();
  }, [userId, navigate]);

  // 2) Fetch student details once role confirmed
  useEffect(() => {
    if (isTeacher !== true) return;

    async function loadStudent() {
      setLoadingStudent(true);
      const { data, error } = await supabase
        .from("profiles_with_email")
        .select("id, first_name, last_name, email, location, date_of_birth, bio")
        .eq("id", studentId)
        .single();

      if (error || !data) {
        setStudent(null);
      } else {
        setStudent(data);
      }
      setLoadingStudent(false);
    }
    loadStudent();
  }, [isTeacher, studentId]);

  // Handle message form submit: create notification for student
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageForm.subject.trim() || !messageForm.message.trim()) {
      setAlert({
        show: true,
        type: "destructive",
        title: "Validation Error",
        message: "Both subject and message are required.",
      });
      return;
    }

    setSendingMessage(true);

    const senderName = session.user.user_metadata?.full_name || session.user.email;
    const notificationText =
      `Message from ${senderName}:\n\nSubject: ${messageForm.subject}\n\n${messageForm.message}`;

    const { error } = await supabase
      .from("notifications")
      .insert([
        {
          user_id: studentId,
          type: "teacher_message",
          message: notificationText,
          read: false,
        },
      ]);

    setSendingMessage(false);

    if (error) {
      return;
      setAlert({
        show: true,
        type: "destructive",
        title: "Error",
        message: "Unable to send message. Please try again.",
      });
    } else {
      setAlert({
        show: true,
        type: "success",
        title: "Message Sent",
        message: "Your message has been sent to the student.",
      });
      setMessageForm({ subject: "", message: "" });
      setTimeout(() => {
        setAlert({ show: false, type: "", title: "", message: "" });
      }, 5000);
    }
  };

  if (isTeacher === null || loadingStudent) {
    return <div className="text-gray-500">Loading…</div>;
  }

  if (!student) {
    return <div className="text-red-500">Student not found.</div>;
  }

  return (
    <div className="space-y-6 p-4">
      {alert.show && (
        <div className="fixed top-4 right-4 z-50 w-96">
          {alert.type === "success" ? (
            <AlertSuccess>
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </AlertSuccess>
          ) : (
            <AlertDestructive>
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </AlertDestructive>
          )}
        </div>
      )}

      {/* Student Details */}
      <Card className="shadow-lg rounded-lg py-6-tt">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <CardTitle className="text-white text-xl font-semibold">
            {student.first_name} {student.last_name}
          </CardTitle>
          <CardDescription className="text-indigo-200">
            {student.email}
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Location:</span>{" "}
              {student.location || "—"}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Date of Birth:</span>{" "}
              {student.date_of_birth
                ? new Date(student.date_of_birth).toLocaleDateString()
                : "—"}
            </p>
          </div>
          {student.bio && (
            <div>
              <h3 className="font-medium text-gray-800">Bio:</h3>
              <p className="text-gray-700 mt-1">{student.bio}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Message Form */}
      <Card className="shadow-md rounded-lg">
        <CardHeader className="p-6">
          <CardTitle className="text-lg font-semibold">
            Send Message to Student
          </CardTitle>
          <CardDescription className="text-gray-600">
            Compose a message and notify the student via in-app notification.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="subject" className="text-gray-700 font-medium">
                Subject
              </Label>
              <Input
                id="subject"
                value={messageForm.subject}
                onChange={(e) =>
                  setMessageForm((prev) => ({ ...prev, subject: e.target.value }))
                }
                placeholder="Enter subject…"
                className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 ${
                  !messageForm.subject.trim() && alert.show && alert.type === "destructive"
                    ? "border-red-500"
                    : ""
                }`}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="message" className="text-gray-700 font-medium">
                Message
              </Label>
              <Textarea
                id="message"
                value={messageForm.message}
                onChange={(e) =>
                  setMessageForm((prev) => ({ ...prev, message: e.target.value }))
                }
                placeholder="Type your message here…"
                className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 min-h-[120px] resize-none ${
                  !messageForm.message.trim() && alert.show && alert.type === "destructive"
                    ? "border-red-500"
                    : ""
                }`}
                required
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={sendingMessage}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              >
                {sendingMessage ? "Sending…" : "Send Message"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}