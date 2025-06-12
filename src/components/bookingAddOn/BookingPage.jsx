// src/pages/BookingPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users } from 'lucide-react';

export default function BookingPage({ session }) {
  const { slotId } = useParams();
  const navigate = useNavigate();

  const [slot, setSlot] = useState(null);
  const [instructorName, setInstructorName] = useState('');
  const [loading, setLoading] = useState(true);

  // Payment form state
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchSlotDetails() {
      setLoading(true);

      // 1) Fetch the slot record (ensure it's unbooked)
      const { data: slotData, error: slotError } = await supabase
        .from('slots')
        .select('id, teacher_id, start_time, price, student_profile_id')
        .eq('id', slotId)
        .single();

      if (slotError || !slotData) {
        setLoading(false);
        return;
      }

      // 2) If already booked, redirect away
      if (slotData.student_profile_id) {
        navigate('/');
        return;
      }

      // 3) Fetch instructor profile by matching profiles.user_id → teacher_id
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('user_id', slotData.teacher_id)
        .single();

      const name = profileError
        ? 'Unknown Instructor'
        : `${profileData.first_name} ${profileData.last_name}`;

      setSlot(slotData);
      setInstructorName(name);
      setLoading(false);
    }

    fetchSlotDetails();
  }, [slotId, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage('');

    // Basic validation
    if (!cardNumber.trim() || !expiry.trim() || !cvc.trim()) {
      setErrorMessage('Please complete all payment fields.');
      return;
    }

    try {
      // 4) Look up current user's profile ID
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', session.user.id)
        .single();

      if (!userProfile) {
        setErrorMessage('User profile not found.');
        return;
      }

      // 5) Update slot to mark it booked
      await supabase
        .from('slots')
        .update({ student_profile_id: userProfile.id })
        .eq('id', slotId);

      // 6) Redirect to confirmation page
      navigate(`/confirmation/${slotId}`);
    } catch (err) {
      return;
      setErrorMessage('Booking failed. Please try again.');
    }
  }

  if (loading) {
    return <p className="text-gray-500 text-center mt-12">Loading slot details…</p>;
  }

  if (!slot) {
    return <p className="text-red-600 text-center mt-12">Slot not found.</p>;
  }

  const slotDate = new Date(slot.start_time);
  const formattedDate = slotDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = slotDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Complete Your Booking
          </h2>
          <p className="mt-2 text-gray-600">
            You're just a few steps away from securing your lesson
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ─────────────────────────────
              Left Column: Slot & Instructor
              ───────────────────────────── */}
          <div className="space-y-6">
            {/* Lesson Details Card */}
            <Card className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <h3 className="text-xl font-semibold text-white">Lesson Details</h3>
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{formattedDate}</p>
                    <p className="text-sm text-gray-500">{formattedTime}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Instructor</p>
                    <p className="text-lg font-semibold text-gray-900">{instructorName}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-md font-medium text-gray-700">Lesson Price</span>
                    <span className="text-2xl font-bold text-gray-900">£{slot.price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Extras or Info Card (optional) */}
            <Card className="bg-white shadow-sm rounded-lg">
              <CardHeader className="px-6 py-3 bg-gray-50">
                <CardTitle className="text-lg font-semibold">What's Included</CardTitle>
              </CardHeader>
              <CardContent className="px-6 py-4 space-y-3">
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="mt-1 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                      <svg
                        className="h-4 w-4 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">One-on-one instruction</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="mt-1 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                      <svg
                        className="h-4 w-4 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Personalized feedback</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="mt-1 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                      <svg
                        className="h-4 w-4 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Progress tracking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* ─────────────────────────────
              Right Column: Payment Form
              ───────────────────────────── */}
          <Card className="bg-white shadow-sm rounded-lg">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
              <h3 className="text-xl font-semibold text-white">Payment Details</h3>
            </div>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email (pre-filled & disabled) */}
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={session.user.email}
                    disabled
                    className="bg-gray-50 border-gray-200 cursor-not-allowed"
                  />
                </div>

                {/* Card Number */}
                <div className="space-y-1">
                  <Label htmlFor="card-number" className="text-sm font-medium text-gray-700">
                    Card Number
                  </Label>
                  <Input
                    id="card-number"
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                {/* Expiry & CVC side by side */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="expiry" className="text-sm font-medium text-gray-700">
                      Expiry (MM/YY)
                    </Label>
                    <Input
                      id="expiry"
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="cvc" className="text-sm font-medium text-gray-700">
                      CVC
                    </Label>
                    <Input
                      id="cvc"
                      type="text"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="123"
                      className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="flex items-center bg-red-50 border-l-4 border-red-400 p-3 rounded">
                    <svg
                      className="h-5 w-5 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="ml-3 text-sm text-red-700">{errorMessage}</p>
                  </div>
                )}

                {/* Confirm & Pay Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 text-lg font-semibold"
                >
                  Confirm & Pay £{slot.price}
                </Button>

                <p className="text-center text-sm text-gray-500">
                  Your payment is secure and encrypted.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}