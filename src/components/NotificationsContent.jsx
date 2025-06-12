// src/components/NotificationsContent.jsx
import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  Bell,
  CheckCircle,
  XCircle,
  Mail,
  Info,
  Trash2,
  Eye,
  EyeOff,
  Edit2,
} from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProfile } from "@/contexts/ProfileContext";
import InboxDialog from "@/utils/Inbox/Dialog";

export default function NotificationsContent({ session }) {
  const [notifications, setNotifications] = useState([]);
  const { profile } = useProfile()

  const [showCompose, setShowCompose] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState(null);

  // Helper: pick an icon based on notification type
  const getIconForNotificationType = (type) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "alert":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "message":
        return <Mail className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  useEffect(() => {
    if (!profile?.id) return;

    async function fetchNotifications() {
      const { data, error } = await supabase
        .from("notifications")
        .select(`
          *,
          sender:profiles!notifications_from_profile_id_fkey(
            id,
            first_name,
            last_name
          )
        `)
        .eq("profile_id", profile.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading notifications:", error.message);
        setNotifications([]);
      } else {
        setNotifications(data);
        console.log(data)
      }
    }

    fetchNotifications();
  }, [profile]);

  // Mark notification as read (and update state immediately)
  const handleMarkAsRead = async (id) => {
    // 1) Optimistically update local state first:
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

    // 2) Persist change to Supabase
    const { data, error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", id);
    console.log(data)
    if (error) {
      console.error("Error marking notification as read:", error.message);
    }
  };

  // Mark notification as unread (and update state immediately)
  const handleMarkAsUnread = async (id) => {
    // 1) Optimistically update local state
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: false } : n))
    );

    // 2) Persist change to Supabase
    const { data, error } = await supabase
      .from("notifications")
      .update({ read: false })
      .eq("id", id);
    console.log(data)

    if (error) {
      console.error("Error marking notification as unread:", error.message);
    }
  };

  // Delete notification (and update state immediately)
  const handleDelete = async (id) => {
    const prior = notifications;
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    const { error } = await supabase.from("notifications").delete().eq("id", id);
    if (error) setNotifications(prior);
  };

  const unreadCount = notifications?.filter((n) => !n?.read)?.length;

  const handleSend = async () => {
    if (!newSubject.trim() || !newMessage.trim()) return;
    setSubmitting(true);
    const { data, error } = await supabase
      .from("notifications")
      .insert([
        {
          profile_id: profile.id,
          subject: newSubject,
          message: newMessage,
          read: false,
        },
      ]);
    setSubmitting(false);
    if (!error && data?.length) {
      setNotifications((prev) => [data[0], ...prev]);
      setShowCompose(false);
      setNewSubject("");
      setNewMessage("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
        <p className="text-muted-foreground">
          Stay updated with your account activities
        </p>
      </div>

      {/* Cards for counts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">
              Total Notifications
            </CardTitle>
            <Bell className="h-4 w-4 text-blue-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications?.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-100">
              Unread Notifications
            </CardTitle>
            <Bell className="h-4 w-4 text-orange-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-100">
              Read Notifications
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notifications.length - unreadCount}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification List */}
      <Card className="border-none shadow-lg">
        <CardHeader className="border-b bg-gray-50/50">
          <CardTitle className="text-xl">Inbox</CardTitle>
          <CardDescription>Your recent activities and updates</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-900">No notifications yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => {
                    setSelectedNotif(notif);
                    setShowDetail(true);
                  }}
                  className={`flex items-center p-6 transition-all duration-200 hover:bg-gray-50/80 ${
                    notif.read 
                      ? "bg-white" 
                      : "bg-blue-50 border-l-4 border-blue-500 shadow-sm"
                  } cursor-pointer`}
                >
                  <div className={`mr-4 ${notif.read ? "text-gray-600" : "text-blue-600"}`}>
                    {getIconForNotificationType(notif.type)}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className={`font-semibold truncate ${
                      notif.read ? "text-gray-600" : "text-gray-900"
                    }`}>
                      {notif.subject}
                    </p>
                    <p className={`text-sm truncate ${
                      notif.read ? "text-gray-500" : "text-gray-700"
                    }`}>
                      {notif.message.slice(0, 60)}…
                    </p>
                  </div>
                  <div className="ml-4 flex space-x-2">
                    {notif.read ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsUnread(notif.id);
                        }}
                        className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                      >
                        <EyeOff className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsRead(notif.id);
                        }}
                        className="text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(notif.id);
                      }}
                      className="text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full"
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

      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="sm:max-w-2xl bg-white">
          {selectedNotif && (
            <>
              <DialogHeader className="border-b pb-4">
                <DialogTitle className="text-xl">{selectedNotif.subject}</DialogTitle>
                <DialogDescription className="text-sm text-gray-600">
                  From: {selectedNotif.sender.first_name} {selectedNotif.sender.last_name}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 p-6">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {selectedNotif.message}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(selectedNotif.created_at).toLocaleString()}
                </p>
              </div>
              <DialogFooter className="flex justify-end space-x-2 border-t pt-4">
                <Button variant="outline" onClick={() => setShowDetail(false)}>
                  Close
                </Button>
                {!selectedNotif.read && (
                  <Button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={() => {
                      handleMarkAsRead(selectedNotif.id);
                      setShowDetail(false);
                    }}
                  >
                    Mark as Read
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <InboxDialog 
        showCompose={showCompose} 
        setShowCompose={setShowCompose} 
        newSubject={newSubject} 
        setNewSubject={setNewSubject} 
        newMessage={newMessage} 
        setNewMessage={setNewMessage} 
        submitting={submitting} 
        handleSend={handleSend} 
      />
    </div>
  );
}