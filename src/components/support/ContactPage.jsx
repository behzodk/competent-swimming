import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { AlertSuccess, AlertDestructive, AlertTitle, AlertDescription } from "@/components/ui/alert";
import GeneralForm from "@/utils/Contact/generalForm";
import InstructorForm from "@/utils/Contact/instructorForm";
import { useProfile } from "@/contexts/ProfileContext";

export default function ContactPage({ session }) {
  const { profile, activeProfileId } = useProfile()
  const [teacherList, setTeacherList] = useState([]);
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
  });

  const [instructorContactForm, setInstructorContactForm] = useState({
    instructor: "",
    subject: "",
    message: "",
  });
  const [generalContactForm, setGeneralContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleGeneralSubmit = (e) => {
    e.preventDefault()
    setAlert({
      show: true,
      type: "success",
      title: "Message Sent",
      message: "Your message has been sent to Competent Swimming support. We will get back to you shortly."
    });
  }

  useEffect(() => {
    async function loadTeachers() {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, user_id, first_name, last_name")
        .eq("is_teacher", true)
        .order("first_name", { ascending: true });

      if (!error && Array.isArray(data)) {
        const mapped = data.map((t) => ({
          id: t.id,
          name: `${t.first_name} ${t.last_name}`,
        }));
        setTeacherList(mapped);
      } else {
        setTeacherList([]);
      }
      setLoadingTeachers(false);
    }
    loadTeachers();
  }, []);

  const handleInstructorSubmit = async (e) => {
    e.preventDefault();
  
    // 1) Basic validation
    if (
      !instructorContactForm.instructor ||
      !instructorContactForm.subject.trim() ||
      !instructorContactForm.message.trim()
    ) {
      setAlert({
        show: true,
        type: "destructive",
        title: "Validation Error",
        message: "Please select an instructor and fill out both subject + message.",
      });
      return;
    }
  
    // 2) Build payload
    console.log(activeProfileId)
    console.log(instructorContactForm.instructor)
    const senderProfileId = activeProfileId;
    const recipientProfileId = instructorContactForm.instructor;
    const { subject, message } = instructorContactForm;
  
    // 3) Insert the notification
    const { data, error } = await supabase
      .from("notifications")
      .insert([
        {
          profile_id: recipientProfileId,
          from_profile_id: senderProfileId,
          subject,
          message,
          type: "inquiry",
          read: false,
        },
      ]);
  
    if (error) {
      console.error("Failed to send inquiry:", error);
      setAlert({
        show: true,
        type: "destructive",
        title: "Error",
        message: "There was an error sending your inquiry. Please try again.",
      });
      return;
    }
  
    // 4) Success feedback
    setAlert({
      show: true,
      type: "success",
      title: "Success!",
      message: "Your message has been sent! The instructor will be notified.",
    });
  
    // clear form
    setInstructorContactForm({ instructor: "", subject: "", message: "" });
    setTimeout(() => {
      setAlert({ show: false, type: "", title: "", message: "" });
    }, 5000);
  };

  return (
    <div className="space-y-10 py-6">
      {alert.show && (
        <div className="fixed top-4 right-4 z-50 w-96">
          {alert.type === "success" && (
            <AlertSuccess>
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </AlertSuccess>
          )}
          {alert.type === "destructive" && (
            <AlertDestructive>
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </AlertDestructive>
          )}
        </div>
      )}

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Contact
        </h1>
        <p className="text-muted-foreground">
          Reach out to an instructor or our general support team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InstructorForm teacherList={teacherList} loadingTeachers={loadingTeachers} handleInstructorSubmit={handleInstructorSubmit} instructorContactForm={instructorContactForm} setInstructorContactForm={setInstructorContactForm} />
        <GeneralForm handleGeneralSubmit={handleGeneralSubmit} generalContactForm={generalContactForm} setGeneralContactForm={setGeneralContactForm} />
      </div>
    </div>
  );
}