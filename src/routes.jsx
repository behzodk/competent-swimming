import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './components/auth/ForgotPassword'
import CustomLogin from './components/auth/CustomLogin'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/DashboardLayout'
import HomeContent from './components/HomeContent'
import StudentDetail from './components/studentDetail'
import TimetableContent from './components/TimetableContent'
import EditProfilePage from './components/EditProfilePage'
import BookClassContent from './components/bookingAddOn/BookClassContent'
import BookingsContent from './components/bookingAddOn/BookingsContent'
import NotificationsContent from './components/NotificationsContent'
import HelpSupportContent from './components/support/HelpSupportContent'
import StudentsContent from './components/StudentsContent'
import TeacherSlots from './components/TeacherSlots'
import ContactPage from './components/support/ContactPage'
import FaqPage from './components/support/FaqPage'
import SubscriptionsPage from './components/SubscriptionsPage'
import BookingPage from './components/bookingAddOn/BookingPage'
import FeedbackPage from './components/Feedback'
import BadgesAchievementsContent from './components/Badges'
import MyDependentsContent from './components/MyDependents'
import HolidaysClosuresPage from './utils/Contact/Holidays'
import LegalDocumentsPage from './components/Legal'
import InstructionsPage from './components/Instructions'
import VideoTutorials from './utils/Instructions/VideoTutorials'
import ReadingMaterials from './utils/Instructions/ReadingMaterials'
import LevelGuides from './utils/Instructions/LevelGuides'
import Faq from './utils/Instructions/Faq'
import AdditionalResources from './utils/Instructions/AdditionalResources'
import ViewProfile from './components/ViewProfile'

const Aroutes = ({ session }) => {

  return (
    <Routes>
    {/* 1) Password reset and forgot password routes (no layout) */}
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />

    {/* 2) If not signed in, show the login form */}
    {!session ? (
      <Route path="*" element={<CustomLogin />} />
    ) : (
      /* 3) If signed in, render protected routes under DashboardLayout */
      <Route
        path="/*"
        element={
          <ProtectedRoute session={session}>
            <DashboardLayout session={session} />
          </ProtectedRoute>
        }
      >
        {/* Dashboard routes */}
        <Route index element={<HomeContent />} />
        <Route path="timetable" element={<TimetableContent session={session} />} />
        <Route path="profile" element={<EditProfilePage session={session} />} />
        <Route path="book" element={<BookClassContent />} />
        <Route path="bookings" element={<BookingsContent />} />
        <Route path="notifications" element={<NotificationsContent session={session} />} />
        <Route path="support" element={<HelpSupportContent session={session} />} />
        <Route path="students" element={<StudentsContent session={session} />} />
        <Route path="students/:id" element={<StudentDetail session={session} />} />
        <Route path="slots" element={<TeacherSlots session={session} />} />
        <Route path="support/contact" element={<ContactPage session={session} />} />
        <Route path="support/faq" element={<FaqPage />} />
        <Route path="subscriptions" element={<SubscriptionsPage session={session} />} />
        <Route path="book/:slotId" element={<BookingPage session={session} />} />
        <Route path="feedbacks" element={<FeedbackPage session={session} />} />
        <Route path="badges" element={<BadgesAchievementsContent session={session} />} />
        <Route path="dependents" element={<MyDependentsContent session={session} />} />
        <Route path="support/holidays" element={<HolidaysClosuresPage />} />
        <Route path="support/legal" element={<LegalDocumentsPage />} />
        <Route path="instructions" element={<InstructionsPage />} />
        <Route path="instructions/video-tutorials" element={<VideoTutorials />} />
        <Route path="instructions/reading-materials" element={<ReadingMaterials />} />
        <Route path="instructions/level-guides" element={<LevelGuides />} />
        <Route path="instructions/faq" element={<Faq />} />
        <Route path="instructions/additional-resources" element={<AdditionalResources />} />
        <Route path="profile/view" element={<ViewProfile />} />
      </Route>
    )}

    {/* If session exists and user tries to navigate to a non-existent route, redirect to home */}
    {session && <Route path="*" element={<Navigate to="/" />} />}
  </Routes>
  )
}

export default Aroutes